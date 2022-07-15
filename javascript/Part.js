'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stats = ['arm', 'mel', 'sht', 'mdf', 'sdf', 'bmr', 'phr'];
/**
 * wrapper for a part in form of an array
 */

var Part = function () {
    function Part() {
        var partInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var parse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, Part);

        this.classname = 'Part';
        if (parse) this.partInfo = JSON.parse(partInfo);else this.partInfo = partInfo;
    }

    //--------------- save/load methods ------------------
    //#region


    _createClass(Part, [{
        key: 'pack',
        value: function pack() {
            if (this.isNull()) return null;
            return this.partInfo['id'];
        }
        //#endregion

        //--------------- Attribute methods ------------------
        //#region 

    }, {
        key: 'getAttributeType',
        value: function getAttributeType() {
            if (this.isNull()) return null;
            return this.partInfo['attribute'];
        }
        //#endregion

        //--------------- Word methods ------------------
        //#region 

    }, {
        key: 'getWord',
        value: function getWord(index) {
            if (this.isNull()) return null;
            if (parseInt(index) === 1) return this.partInfo['word1'];else return this.partInfo['word2'];
        }

        //#endregion

        //--------------- Description methods ------------------
        //#region 

    }, {
        key: 'getDescription',
        value: function getDescription() {
            if (this.isNull()) return null;
            return this.partInfo['description1'] + "\n" + this.partInfo['description2'];
        }
    }, {
        key: 'getName',
        value: function getName() {
            if (this.isNull()) return null;
            return this.partInfo['name'];
        }
    }, {
        key: 'getRarity',
        value: function getRarity() {
            if (this.isNull()) return null;
            return this.partInfo['rarity'];
        }

        //#endregion

        //--------------- PartType methods ------------------
        //#region 

    }, {
        key: 'getPartType',
        value: function getPartType() {
            if (this.isNull()) return null;
            return this.partInfo['subType'];
        }
        //#endregion

        //--------------- Calculation methods ------------------
        //#region

    }, {
        key: 'getStats',
        value: function getStats() {
            var stats = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Stats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var stat = _step.value;

                    stats[stat] = 0;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return stats;
        }
    }, {
        key: 'getRawStats',
        value: function getRawStats() {
            if (this.isNull()) return this.getStats();
            var stats = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Stats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var stat = _step2.value;

                    stats[stat] = parseInt(this.partInfo[stat]);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return stats;
        }
    }, {
        key: 'getAltered',
        value: function getAltered() {
            if (this.isNull()) return 0;
            return this.partInfo['altered'];
        }
    }, {
        key: 'getModel',
        value: function getModel() {
            if (this.isNull()) return null;
            return this.partInfo['model'];
        }
        //#endregion


        //---------------- Part Slot methods ---------------------------
        //#region 

    }, {
        key: 'getPartSlot',
        value: function getPartSlot() {
            if (this.isNull()) return null;
            return typeList[this.partInfo['slot']];
        }
    }, {
        key: 'getPartSubSlot',
        value: function getPartSubSlot() {
            if (this.isNull()) return null;
            return this.partInfo['subSlot'];
        }
        //#endregion

    }, {
        key: 'isNull',
        value: function isNull() {
            return this.partInfo === null;
        }
    }]);

    return Part;
}();