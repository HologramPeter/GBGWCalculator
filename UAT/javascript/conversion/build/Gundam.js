'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PreGears = ['bodyGear', 'rarmGear', 'larmGear'];
var PostGears = ['rlegGear'];

var Gundam = function () {
    function Gundam() {
        _classCallCheck(this, Gundam);

        this.classname = 'Gundam';

        this.head = new Slot();
        this.body = new Slot();
        this.arms = new Slot();
        this.legs = new Slot();
        this.back = new Slot();
        this.sword = new Slot();
        this.gun = new Slot();
        this.shield = new Slot();
        this.pilot = new Slot();

        this.bodyGear = new BodyGear();
        this.larmGear = new LarmGear();
        this.rarmGear = new RarmGear();
        this.rlegGear = new RlegGear();

        this.gearBonus = 0.15;
    }

    //--------------- part methods ------------------
    //#region 

    _createClass(Gundam, [{
        key: 'setPart',
        value: function setPart(part, slotType) {
            if (part.isNull()) return;
            var slot = part.getPartSlot();
            if (!this[slot] instanceof Slot) throw 'slot occupied';
            this[slot].setPart(slotType, part);

            if (slotType === 'mainPart') {
                //replace subslot
                var subSlot = part.getPartSubSlot();
                if (subSlot) this[subslot] = slot; //referencing slot
            }
        }
    }, {
        key: 'deletePart',
        value: function deletePart(slot, slotType) {
            if (slotType === "mainPart") {
                //restore subslot
                var subSlot = this[slot].getPartSubSlot();
                if (subSlot) this[subslot] = new Slot();
            }
            this[slot].deletePart(slotType);
        }
        //#endregion


        //--------------- save/load methods ------------------
        //#region

    }, {
        key: 'serialize',
        value: function serialize() {
            return JSON.stringify(this.pack());
        }
    }, {
        key: 'unserialize',
        value: function unserialize(str) {
            // try {
            var gundamObj = JSON.parse(str);
            this.unpack(gundamObj);
            // } catch (error) {
            //     console.trace();
            //     alert('error in unpacking');
            // }
        }
    }, {
        key: 'pack',
        value: function pack() {
            var gundamObj = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var slot = _step.value;

                    if (!this[slot] instanceof Slot) gundamObj[slot] = null;else gundamObj[slot] = this[slot].pack();
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Gears[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var slot = _step2.value;

                    gundamObj[slot] = this[slot].pack();
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

            gundamObj['gearBonus'] = this.gearBonus;

            return gundamObj;
        }
    }, {
        key: 'unpack',
        value: function unpack(gundamObj) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Parts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var slot = _step3.value;
                    var _arr = ['mainPart', 'subPart'];

                    for (var _i = 0; _i < _arr.length; _i++) {
                        var slotType = _arr[_i];
                        if (gundamObj[slot] != null) {
                            var part_data = null;
                            if (gundamObj[slot][slotType] != null) {
                                part_data = Database[gundamObj[slot][slotType]];
                            }
                            this.setPart(new Part(part_data, false), slotType);
                        }
                    }
                    this.setWords(slot, gundamObj[slot]['words']);
                    this.setDescription(slot, gundamObj[slot]['description']);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Gears[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var slot = _step4.value;

                    this.setGear(slot, gundamObj[slot]);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this.gearBonus = gundamObj['gearBonus'];
        }
        //#endregion

        //--------------- Attribute methods ------------------
        //#region

    }, {
        key: 'getAttributeType',
        value: function getAttributeType(slot, slotType) {
            return this[slot].getAttributeType(slotType);
        }
    }, {
        key: 'getAttributeTypes',
        value: function getAttributeTypes() {
            var attributes = {};
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = Parts[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var slot = _step5.value;

                    if (!this[slot] instanceof Slot) slot = this[slot];
                    var attribute = this[slot].getAttributeType('total');
                    attributes[attribute] = (attributes[attribute] || 0) + 1;
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return attributes;
        }
    }, {
        key: 'getActiveAttributeType',
        value: function getActiveAttributeType() {
            var attributes = this.getAttributeTypes();
            var activeAttributes = Object.keys(attributeTypes).reduce(function (activeAttributes, key) {
                if (attributes[key] >= 5 && key != "") activeAttributes[key] = attributes[key];
                return activeAttributes;
            }, {});
            return Object.keys(activeAttributes)[0];
        }

        //#endregion


        //--------------- Word methods ------------------
        //#region 

    }, {
        key: 'setWords',
        value: function setWords(slot, wordIndexes) {
            this[slot].setWords(wordIndexes);
        }
    }, {
        key: 'getWords',
        value: function getWords(slot, slotType) {
            return this[slot].getWords(slotType);
        }
    }, {
        key: 'getActiveWords',
        value: function getActiveWords() {
            var words = {};
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = Parts[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var slot = _step6.value;

                    if (!this[slot] instanceof Slot) slot = this[this[slot]];
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = this.getWords(slot, 'total')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var word = _step7.value;

                            words[word] = (words[word] || 0) + 1;
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            var activeWords = Object.keys(words).reduce(function (activeWords, key) {
                if (words[key] >= 5 && key != '' && key != 'null') activeWords[key] = words[key];
                return activeWords;
            }, {});

            return Object.keys(activeWords);
        }

        //#endregion

        //--------------- Description methods ------------------
        //#region 

    }, {
        key: 'setDescription',
        value: function setDescription(slot, slotType) {
            this[slot].setDescription(slotType);
        }
    }, {
        key: 'getDescription',
        value: function getDescription(slot, slotType) {
            return this[slot].getDescription(slotType);
        }
    }, {
        key: 'getJobType',
        value: function getJobType() {
            return this['pilot'].getPartType('total');
        }
    }, {
        key: 'getName',
        value: function getName(slot, slotType) {
            return this[slot].getName(slotType);
        }
    }, {
        key: 'getRarity',
        value: function getRarity(slot, slotType) {
            return this[slot].getRarity(slotType);
        }
        //#endregion

        //--------------- PartType methods ------------------
        //#region

    }, {
        key: 'getPartType',
        value: function getPartType(slot, slotType) {
            return this[slot].getPartType(slotType);
        }
        //#endregion

        //--------------- Calculation methods ------------------
        //#region

    }, {
        key: 'getPartRawStats',
        value: function getPartRawStats(slot, slotType) {
            return this[slot].getRawStats(slotType);
        }
    }, {
        key: 'getGearRawStats',
        value: function getGearRawStats(slot) {
            if (PreGears.includes(slot)) return this[slot].getRawStats(this.getPreSubTotalStats(), this.getGearMultiplier());else return this[slot].getRawStats(this.getSubTotalStats(), this.getActiveWords(), this.getGearMultiplier());
        }
    }, {
        key: 'getPreviewStats',
        value: function getPreviewStats(previewPart, slotType) {
            var slot = previewPart.getPartSlot();
            return this[slot].getPreviewStats(previewPart, slotType);
        }
    }, {
        key: 'getPreSubTotalStats',
        value: function getPreSubTotalStats() {
            var stats = {};

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = Parts[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var slot = _step8.value;

                    var part_stats = this.getPartRawStats(slot, 'total');
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;

                    try {
                        for (var _iterator9 = Stats[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var stat = _step9.value;

                            stats[stat] = (stats[stat] || 0) + part_stats[stat];
                        }
                    } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                _iterator9.return();
                            }
                        } finally {
                            if (_didIteratorError9) {
                                throw _iteratorError9;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return stats;
        }
    }, {
        key: 'getSubTotalStats',
        value: function getSubTotalStats() {
            var preSubTotalStats = this.getPreSubTotalStats();
            var preGearStats = this.getTotalPreGearStats(preSubTotalStats);

            var stats = {};
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = Stats[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var stat = _step10.value;

                    stats[stat] = preSubTotalStats[stat] + preGearStats[stat];
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            return stats;
        }
    }, {
        key: 'getTotalStats',
        value: function getTotalStats() {
            var subTotalStats = this.getSubTotalStats();
            //post gear
            var postGearStats = this.getTotalPostGearStats(subTotalStats);

            //word
            var wordMultiplier = this.getWordsMultiplier();
            var jobMultiplier = this.getJobMultiplier();
            var stats = {};
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = Stats[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var stat = _step11.value;

                    var stat_t = Math.round(subTotalStats[stat] * (wordMultiplier[stat] || 1) + postGearStats[stat]);
                    stats[stat] = Math.round(stat_t * (jobMultiplier[stat] || 1));
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return stats;
        }
    }, {
        key: 'getPreGearStats',
        value: function getPreGearStats(slot, preSubTotalStats) {
            return this[slot].getRawStats(preSubTotalStats, this.getGearMultiplier());
        }
    }, {
        key: 'getPostGearStats',
        value: function getPostGearStats(slot, subtotalStats) {
            var activeWords = this.getActiveWords();
            return this[slot].getRawStats(subtotalStats, activeWords, this.getGearMultiplier());
        }
    }, {
        key: 'getTotalPreGearStats',
        value: function getTotalPreGearStats(subtotalStats) {
            var stats = {};
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = PreGears[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var slot = _step12.value;

                    var gearStats = this.getPreGearStats(slot, subtotalStats);
                    var _iteratorNormalCompletion13 = true;
                    var _didIteratorError13 = false;
                    var _iteratorError13 = undefined;

                    try {
                        for (var _iterator13 = Stats[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                            var stat = _step13.value;

                            stats[stat] = (stats[stat] || 0) + gearStats[stat];
                        }
                    } catch (err) {
                        _didIteratorError13 = true;
                        _iteratorError13 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                _iterator13.return();
                            }
                        } finally {
                            if (_didIteratorError13) {
                                throw _iteratorError13;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }

            return stats;
        }
    }, {
        key: 'getTotalPostGearStats',
        value: function getTotalPostGearStats(subtotalStats) {
            var stats = {};
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
                for (var _iterator14 = PostGears[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                    var slot = _step14.value;

                    var gearStats = this.getPostGearStats(slot, subtotalStats);
                    var _iteratorNormalCompletion15 = true;
                    var _didIteratorError15 = false;
                    var _iteratorError15 = undefined;

                    try {
                        for (var _iterator15 = Stats[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                            var stat = _step15.value;

                            stats[stat] = (stats[stat] || 0) + gearStats[stat];
                        }
                    } catch (err) {
                        _didIteratorError15 = true;
                        _iteratorError15 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                _iterator15.return();
                            }
                        } finally {
                            if (_didIteratorError15) {
                                throw _iteratorError15;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError14 = true;
                _iteratorError14 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                        _iterator14.return();
                    }
                } finally {
                    if (_didIteratorError14) {
                        throw _iteratorError14;
                    }
                }
            }

            return stats;
        }
    }, {
        key: 'getWordsMultiplier',
        value: function getWordsMultiplier() {
            var activeWords = this.getActiveWords();
            var multiplier = {};
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
                for (var _iterator16 = MultiplierList[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var item = _step16.value;

                    if (activeWords.includes(item.name)) {
                        var _iteratorNormalCompletion17 = true;
                        var _didIteratorError17 = false;
                        var _iteratorError17 = undefined;

                        try {
                            for (var _iterator17 = Stats[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                                var stat = _step17.value;
                                multiplier[stat] = (multiplier[stat] || 1) + parseFloat(item[stat]);
                            }
                        } catch (err) {
                            _didIteratorError17 = true;
                            _iteratorError17 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion17 && _iterator17.return) {
                                    _iterator17.return();
                                }
                            } finally {
                                if (_didIteratorError17) {
                                    throw _iteratorError17;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
                        _iterator16.return();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }

            return multiplier;
        }
    }, {
        key: 'getJobMultiplier',
        value: function getJobMultiplier() {
            var job = JobName[this.getJobType()];
            var multiplier = {};
            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
                for (var _iterator18 = MultiplierList[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                    var item = _step18.value;

                    if (job === item.name) {
                        var _iteratorNormalCompletion19 = true;
                        var _didIteratorError19 = false;
                        var _iteratorError19 = undefined;

                        try {
                            for (var _iterator19 = Stats[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                var stat = _step19.value;
                                multiplier[stat] = 1 + parseFloat(item[stat]);
                            }
                        } catch (err) {
                            _didIteratorError19 = true;
                            _iteratorError19 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                                    _iterator19.return();
                                }
                            } finally {
                                if (_didIteratorError19) {
                                    throw _iteratorError19;
                                }
                            }
                        }

                        break;
                    }
                }
            } catch (err) {
                _didIteratorError18 = true;
                _iteratorError18 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion18 && _iterator18.return) {
                        _iterator18.return();
                    }
                } finally {
                    if (_didIteratorError18) {
                        throw _iteratorError18;
                    }
                }
            }

            return multiplier;
        }
        //#endregion

        //--------------- gear methods ------------------
        //#region 

    }, {
        key: 'setGear',
        value: function setGear(slot, gearValues) {
            this[slot].setGear(gearValues);
        }
    }, {
        key: 'deleteGear',
        value: function deleteGear(slot) {
            this[slot].setGear();
        }
    }, {
        key: 'setGearBonus',
        value: function setGearBonus(gearBonus) {
            this.gearBonus = gearBonus;
        }
    }, {
        key: 'getGearMultiplier',
        value: function getGearMultiplier() {
            return 1 + this.gearBonus;
        }
        //#endregion

    }]);

    return Gundam;
}();