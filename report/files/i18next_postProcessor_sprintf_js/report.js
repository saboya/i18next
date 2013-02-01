__report = {
  "info": {
    "file": "src/i18next.postProcessor.sprintf.js",
    "fileShort": "i18next.postProcessor.sprintf.js",
    "fileSafe": "i18next_postProcessor_sprintf_js",
    "link": "files/i18next_postProcessor_sprintf_js/index.html"
  },
  "complexity": {
    "aggregate": {
      "line": 2,
      "complexity": {
        "sloc": {
          "physical": 135,
          "logical": 135
        },
        "cyclomatic": 42,
        "halstead": {
          "operators": {
            "distinct": 33,
            "total": 360,
            "identifiers": [
              "__stripped__"
            ]
          },
          "operands": {
            "distinct": 106,
            "total": 402,
            "identifiers": [
              "__stripped__"
            ]
          },
          "length": 762,
          "vocabulary": 139,
          "difficulty": 62.575471698113205,
          "volume": 5424.6330974153125,
          "effort": 339448.9748599601,
          "bugs": 1.8082110324717708,
          "time": 18858.276381108895
        }
      }
    },
    "functions": [
      {
        "name": "<anonymous>",
        "line": 2,
        "complexity": {
          "sloc": {
            "physical": 118,
            "logical": 7
          },
          "cyclomatic": 1,
          "halstead": {
            "operators": {
              "distinct": 6,
              "total": 15,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 7,
              "total": 14,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 29,
            "vocabulary": 13,
            "difficulty": 6,
            "volume": 107.31275182609167,
            "effort": 643.87651095655,
            "bugs": 0.03577091727536389,
            "time": 35.770917275363885
          }
        }
      },
      {
        "name": "get_type",
        "line": 3,
        "complexity": {
          "sloc": {
            "physical": 3,
            "logical": 1
          },
          "cyclomatic": 1,
          "halstead": {
            "operators": {
              "distinct": 4,
              "total": 10,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 9,
              "total": 10,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 20,
            "vocabulary": 13,
            "difficulty": 2.2222222222222223,
            "volume": 74.00879436282185,
            "effort": 164.46398747293745,
            "bugs": 0.024669598120940616,
            "time": 9.136888192940969
          }
        }
      },
      {
        "name": "str_repeat",
        "line": 6,
        "complexity": {
          "sloc": {
            "physical": 4,
            "logical": 3
          },
          "cyclomatic": 2,
          "halstead": {
            "operators": {
              "distinct": 9,
              "total": 11,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 7,
              "total": 12,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 23,
            "vocabulary": 16,
            "difficulty": 7.7142857142857135,
            "volume": 92,
            "effort": 709.7142857142857,
            "bugs": 0.030666666666666665,
            "time": 39.42857142857142
          }
        }
      },
      {
        "name": "str_format",
        "line": 11,
        "complexity": {
          "sloc": {
            "physical": 6,
            "logical": 3
          },
          "cyclomatic": 2,
          "halstead": {
            "operators": {
              "distinct": 6,
              "total": 20,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 9,
              "total": 22,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 42,
            "vocabulary": 15,
            "difficulty": 7.333333333333334,
            "volume": 164.0894050155578,
            "effort": 1203.3223034474238,
            "bugs": 0.05469646833851926,
            "time": 66.85123908041243
          }
        }
      },
      {
        "name": "str_format.format",
        "line": 18,
        "complexity": {
          "sloc": {
            "physical": 49,
            "logical": 68
          },
          "cyclomatic": 27,
          "halstead": {
            "operators": {
              "distinct": 24,
              "total": 174,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 66,
              "total": 205,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 379,
            "vocabulary": 90,
            "difficulty": 37.27272727272727,
            "volume": 2460.412323508947,
            "effort": 91706.2775126062,
            "bugs": 0.8201374411696489,
            "time": 5094.793195144789
          }
        }
      },
      {
        "name": "str_format.parse",
        "line": 70,
        "complexity": {
          "sloc": {
            "physical": 47,
            "logical": 39
          },
          "cyclomatic": 11,
          "halstead": {
            "operators": {
              "distinct": 13,
              "total": 93,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 28,
              "total": 98,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 191,
            "vocabulary": 41,
            "difficulty": 22.75,
            "volume": 1023.292432882054,
            "effort": 23279.90284806673,
            "bugs": 0.3410974776273513,
            "time": 1293.3279360037072
          }
        }
      },
      {
        "name": "vsprintf",
        "line": 121,
        "complexity": {
          "sloc": {
            "physical": 4,
            "logical": 2
          },
          "cyclomatic": 1,
          "halstead": {
            "operators": {
              "distinct": 3,
              "total": 5,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 6,
              "total": 9,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 14,
            "vocabulary": 9,
            "difficulty": 2.25,
            "volume": 44.37895002019238,
            "effort": 99.85263754543286,
            "bugs": 0.014792983340064125,
            "time": 5.547368752524047
          }
        }
      },
      {
        "name": "<anonymous>",
        "line": 126,
        "complexity": {
          "sloc": {
            "physical": 11,
            "logical": 8
          },
          "cyclomatic": 4,
          "halstead": {
            "operators": {
              "distinct": 8,
              "total": 23,
              "identifiers": [
                "__stripped__"
              ]
            },
            "operands": {
              "distinct": 11,
              "total": 25,
              "identifiers": [
                "__stripped__"
              ]
            },
            "length": 48,
            "vocabulary": 19,
            "difficulty": 9.090909090909092,
            "volume": 203.9005206452921,
            "effort": 1853.6410967753827,
            "bugs": 0.06796684021509736,
            "time": 102.98006093196571
          }
        }
      }
    ],
    "maintainability": 92.4155281932762,
    "module": "i18next.postProcessor.sprintf.js"
  },
  "jshint": {
    "messages": []
  }
}