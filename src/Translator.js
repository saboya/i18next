import * as utils from './utils';
import baseLogger from './logger';
import EventEmitter from './EventEmitter';
import postProcessor from './postProcessor';
import * as compat from './compatibility/v1';

class Translator extends EventEmitter {
  constructor(services, options = {}) {
    super();

    if (services.resourceStore) this.resourceStore = services.resourceStore;
    if (services.languageUtils) this.languageUtils = services.languageUtils;
    if (services.pluralResolver) this.pluralResolver = services.pluralResolver;
    if (services.interpolator) this.interpolator = services.interpolator;
    if (services.backendConnector) this.backendConnector = services.backendConnector;
    this.options = options;
    this.logger = baseLogger.create('translator');
  }

  changeLanguage(lng) {
    if (lng) this.language = lng;
  }

  exists(key, options = { interpolation: {} }) {
    if (this.options.compatibilityAPI === 'v1') {
      options = compat.convertTOptions(options);
    }

    return this.resolve(key, options) !== undefined;
  }

  translate(keys, options = {}) {
    if (options !== undefined && typeof options !== 'object') {
      options = this.options.overloadTranslationOptionHandler(arguments);
    } else {
      options = options || {};
    }

    if (this.options.compatibilityAPI === 'v1') {
      options = compat.convertTOptions(options);
    }

    // non valid keys handling
    if (keys === undefined || keys === null || keys === '') return '';
    if (typeof keys === 'number') keys = String(keys);
    if (typeof keys === 'string') keys = [keys];
    let key = keys[keys.length - 1];

    // return key on CIMode
    let lng = options.lng || this.language;
    if (lng && lng.toLowerCase() === 'cimode') return key;

    // separators
    let nsSeparator = options.nsSeparator || this.options.nsSeparator || ':';
    let keySeparator = options.keySeparator || this.options.keySeparator || '.';

    // get namespace(s)
    let namespaces = options.ns || this.options.defaultNS;
    if (key.indexOf(nsSeparator) > -1) {
      const parts = key.split(nsSeparator);
      namespaces = parts[0];
      key = parts[1];
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];
    let namespace = namespaces[namespaces.length - 1];

    // resolve from store
    let res = this.resolve(keys, options);

    let resType = Object.prototype.toString.apply(res);
    let noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    let joinArrays = options.joinArrays !== undefined ?  options.joinArrays : this.options.joinArrays;

    // object
    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options): `key '${key} (${this.language})' returned an object instead of string.`;
      }

      let copy = (resType === '[object Array]') ? [] : {}; // apply child translation on a copy

      for (let m in res) {
        copy[m] = this.translate(`${key}${keySeparator}${m}`, {...{joinArrays: false}, ...options});
      }
      res = copy;
    }
    // array special treatment
    else if (joinArrays && resType === '[object Array]') {
      res = res.join(joinArrays);
    }
    // string, empty or null
    else {
      let usedDefault = false,
          usedKey = false;

      // fallback value
      if (!this.isValidLookup(res) && options.defaultValue) {
        usedDefault = true;
        res = options.defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }

      // save missing
      if (usedKey || usedDefault) {
        this.logger.log('missingKey', lng, namespace, key, res);

        if (this.options.saveMissing) {
          var lngs = [];
          if (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0]) {
            for (let i = 0; i < this.options.fallbackLng.length; i++) {
              lngs.push(this.options.fallbackLng[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {//(this.options.saveMissingTo === 'current' || (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0] === false) ) {
            lngs.push(options.lng || this.language);
          }

          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(lngs, namespace, key, res);
          } else if (this.backendConnector && this.backendConnector.saveMissing) {
            this.backendConnector.saveMissing(lngs, namespace, key, res);
          }

          this.emit('missingKey', lngs, namespace, key, res);
        }
      }

      // extend
      res = this.extendTranslation(res, key, options);

      // append namespace if still key
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}:${key}`;

      // parseMissingKeyHandler
      if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
    }

    // return
    return res;
  }

  extendTranslation(res, key, options) {
    if (options.interpolation) this.interpolator.init(options);
    // nesting
    res = this.interpolator.nest(res, (...args) => { return this.translate.apply(this, args); }, options);

    // interpolate
    let data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
    if (this.options.interpolation.defaultVariables) data = utils.defaults(data, this.options.interpolation.defaultVariables);
    res = this.interpolator.interpolate(res, data);
    if (options.interpolation) this.interpolator.reset();

    // post process
    let postProcess = options.postProcess || this.options.postProcess;
    let postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

    if (res !== undefined && postProcessorNames && postProcessorNames.length) res = postProcessor.handle(postProcessorNames, res, key, options, this);

    return res;
  }

  resolve(keys, options = {}) {
    let found;

    if (typeof keys === 'string') keys = [keys];

    // forEach possible key
    keys.forEach(key => {
      if (this.isValidLookup(found)) return;

      let namespaces = options.ns || this.options.defaultNS;
      let nsSeparator = options.nsSeparator || this.options.nsSeparator || ':';
      if (key.indexOf(nsSeparator) > -1) {
        const parts = key.split(nsSeparator);
        namespaces = parts[0];
        key = parts[1];
      }
      if (typeof namespaces === 'string') namespaces = [namespaces];
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);

      let needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      let needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

      let codes = this.languageUtils.toResolveHierarchy(options.lng || this.language);
      if (options.lngs) codes = options.lngs;

      namespaces.forEach(ns => {
        if (this.isValidLookup(found)) return;

        codes.forEach(code => {
          if (this.isValidLookup(found)) return;

          let finalKey = key;
          let finalKeys = [finalKey];

          // get key for context if needed
          if (needsContextHandling) finalKeys.push(finalKey += `_${options.context}`);

          // get key for plural if needed
          if (needsPluralHandling) finalKeys.push(finalKey += this.pluralResolver.getSuffix(code, options.count));

          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
          let possibleKey;
          while(possibleKey = finalKeys.pop()) {
            if (this.isValidLookup(found)) continue;
            found = this.getResource(code, ns, possibleKey, options);
          }
        });
      });
    });

    return found;
  }

  isValidLookup(res) {
    return res !== undefined &&
           !(!this.options.returnNull && res === null) &&
           !(!this.options.returnEmptyString && res === '');
  }

  getResource(code, ns, key, options = {}) {
    return this.resourceStore.getResource(code, ns, key, options);
  }
}


export default Translator;
