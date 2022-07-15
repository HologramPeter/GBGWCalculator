'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * wrapper for a Slot
 */
var Slot = function () {
    function Slot() {
        _classCallCheck(this, Slot);

        this.mainPart = new Part();
        this.subPart = new Part();
        this.selectedWords = [0, 1];
        this.description = 'mainPart';
    }

    //---------------- set methods ----get-----------------------
    //#region 


    _createClass(Slot, [{
        key: 'setPart',
        value: function setPart(slotType, part) {
            this[slotType] = part;
        }
    }, {
        key: 'deletePart',
        value: function deletePart(slotType) {
            this[slotType] = new Part();
        }
        //#endregion

        //--------------- save/load methods ------------------
        //#region 

    }, {
        key: 'pack',
        value: function pack() {
            return {
                'mainPart': this.mainPart.pack(),
                'subPart': this.subPart.pack(),
                'words': this.selectedWords,
                'description': this.description
            };
        }
        //#endregion

        //--------------- Attribute methods ------------------
        //#region

    }, {
        key: 'getAttributeType',
        value: function getAttributeType(slotType) {
            if (slotType === 'total') return this.mainPart.getAttributeType();
            return this[slotType].getAttributeType();
        }
        //#endregion

        //--------------- Word methods ------------------
        //#region 

    }, {
        key: 'setWords',
        value: function setWords(wordIndexes) {
            if (wordIndexes.length != 2) throw 'wrong number of words';
            this.selectedWords[0] = parseInt(wordIndexes[0]);
            this.selectedWords[1] = parseInt(wordIndexes[1]);
        }
    }, {
        key: 'getWord',
        value: function getWord(slotType, index) {
            return this[slotType].getWord(index);
        }
    }, {
        key: 'getWords',
        value: function getWords(slotType) {
            if (slotType === 'total') return this.getSelectedWords();
            return [this[slotType].getWord(0), this[slotType].getWord(1)];
        }
    }, {
        key: 'getSelectedWords',
        value: function getSelectedWords() {
            var words = [];
            if (this.selectedWords.includes(0)) {
                words.push(this.mainPart.getWord(0));
            }
            if (this.selectedWords.includes(1)) {
                words.push(this.mainPart.getWord(1));
            }
            if (this.selectedWords.includes(2)) {
                words.push(this.subPart.getWord(0));
            }
            if (this.selectedWords.includes(3)) {
                words.push(this.subPart.getWord(1));
            }
            return words;
        }

        //#endregion

        //--------------- Description methods ------------------
        //#region 

    }, {
        key: 'setDescription',
        value: function setDescription(slotType) {
            this.description = slotType;
        }
    }, {
        key: 'getSelectedDescription',
        value: function getSelectedDescription() {
            return this[this.description].getDescription();
        }
    }, {
        key: 'getDescription',
        value: function getDescription(slotType) {
            if (slotType === 'total') return this.getSelectedDescription();
            return this[slotType].getDescription();
        }
    }, {
        key: 'getName',
        value: function getName(slotType) {
            return this[slotType].getName();
        }
    }, {
        key: 'getRarity',
        value: function getRarity(slotType) {
            return this[slotType].getRarity();
        }
    }, {
        key: 'getPartSubSlot',
        value: function getPartSubSlot() {
            return this.mainPart.getPartSubSlot();
        }
        //#endregion

        //--------------- PartType methods ------------------
        //#region

    }, {
        key: 'getPartType',
        value: function getPartType(slotType) {
            if (slotType === 'total') return this.mainPart.getPartType();
            return this[slotType].getPartType();
        }

        //#endregion

        //--------------- Calculation methods ------------------
        //#region

    }, {
        key: 'getRawStats',
        value: function getRawStats(slotType) {
            return this.getStats(slotType, this.mainPart, this.subPart);
        }

        /**
         * @returns [mainPartStats, subPartStats]
         */

    }, {
        key: 'getPreviewStats',
        value: function getPreviewStats(previewPart, slotType) {
            if (slotType === 'mainPart') {
                return [this.getStats('mainPart', previewPart, this.subPart), this.getStats('subPart', previewPart, this.subPart)];
            } else {
                return [this.getStats('mainPart', this.mainPart, previewPart), this.getStats('subPart', this.mainPart, previewPart)];
            }
        }
    }, {
        key: 'getStats',
        value: function getStats(slotType, mainPart, subPart) {
            var mainStats = mainPart.getRawStats();
            if (slotType === "mainPart") return mainStats;

            var subStats = subPart.getRawStats();
            var multiplier = this.getMultiplier(mainPart, subPart) * this.getSubSlotMultiplier(mainPart, subPart);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Stats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var stat = _step.value;

                    subStats[stat] = Math.round(subStats[stat] * multiplier);
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

            if (slotType === "subPart") return subStats;

            var stats = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Stats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var stat = _step2.value;

                    stats[stat] = mainStats[stat] + subStats[stat];
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
        key: 'getMultiplier',
        value: function getMultiplier(mainPart, subPart) {
            if (mainPart.isNull() || subPart.isNull()) return 0;

            var multiplier = 0.05;

            if (mainPart.altered == 2 && subPart.altered != 2) multiplier += 0.2;else if (subPart.altered == 2 && mainPart.altered != 2) multiplier += 0.2;

            if (mainPart.modelName != '' & mainPart.modelName === subPart.modelName) {
                multiplier += 0.3;
            } else {
                var mainPartWords = [mainPart.getWord(1), mainPart.getWord(2)];
                if (mainPartWords.includes(subPart.getWord(1))) multiplier += 0.1;
                if (mainPartWords.includes(subPart.getWord(2))) multiplier += 0.1;
            }

            return multiplier;
        }
    }, {
        key: 'getSubSlotMultiplier',
        value: function getSubSlotMultiplier(mainPart, subPart) {
            if (mainPart.getPartSubSlot() != '') {
                if (subPart.getPartSubSlot() != '') return 1;else return 2;
            } else {
                if (subPart.getPartSubSlot() != '') return 0.5;else return 1;
            }
        }

        //#endregion

    }]);

    return Slot;
}();