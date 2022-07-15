'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gears = ['bodyGear', 'rarmGear', 'larmGear', 'rlegGear'];
/**
 * gear calculation logic
 */

var Gear = function () {
    function Gear() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, Gear);

        this.classname = 'Gear';
        this.setGear(value);
    }

    _createClass(Gear, [{
        key: 'pack',
        value: function pack() {
            return this.value;
        }
    }, {
        key: 'setGear',
        value: function setGear(value) {
            if (value === '') value = null;
            if (value === null) this.details = null;else this.details = this.splitGearValue(value);
            this.value = value;
        }
    }, {
        key: 'splitGearValue',
        value: function splitGearValue(value) {
            var dict = {};
            var stat_list = value.split(' ');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = stat_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var i = item.split('#');
                    dict[i[0]] = i[1].split('$');
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

            return dict;
        }
    }, {
        key: 'getStats',
        value: function getStats() {
            var stats = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Stats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var stat = _step2.value;

                    stats[stat] = 0;
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
    }]);

    return Gear;
}();

var BodyGear = function (_Gear) {
    _inherits(BodyGear, _Gear);

    function BodyGear(value) {
        _classCallCheck(this, BodyGear);

        var _this = _possibleConstructorReturn(this, (BodyGear.__proto__ || Object.getPrototypeOf(BodyGear)).call(this, value));

        _this.classname = 'BodyGear';
        return _this;
    }

    _createClass(BodyGear, [{
        key: 'getRawStats',
        value: function getRawStats(subTotalStats, gearMultiplier) {
            if (this.details === null) return this.getStats();

            var stats = {};
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Stats[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var stat = _step3.value;

                    stats[stat] = Math.round((this.details[stat] || 0) * gearMultiplier);
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

            return stats;
        }
    }]);

    return BodyGear;
}(Gear);

var LarmGear = function (_Gear2) {
    _inherits(LarmGear, _Gear2);

    function LarmGear(value) {
        _classCallCheck(this, LarmGear);

        var _this2 = _possibleConstructorReturn(this, (LarmGear.__proto__ || Object.getPrototypeOf(LarmGear)).call(this, value));

        _this2.classname = 'LarmGear';
        return _this2;
    }

    _createClass(LarmGear, [{
        key: 'getRawStats',
        value: function getRawStats(subTotalStats, gearMultiplier) {
            if (this.details === null) return this.getStats();

            var stats = this.getStats();

            var s = 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Object.keys(this.details)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var stat = _step4.value;

                    if (!this.details[stat][0].includes('-')) {
                        s += subTotalStats[stat] * Math.round(parseFloat(this.details[stat][0]) * gearMultiplier) / 100;
                    }
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

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = Object.keys(this.details)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var stat = _step5.value;

                    if (this.details[stat][0].includes('-')) {
                        stats[stat] = Math.round(s);
                    }
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

            return stats;
        }
    }]);

    return LarmGear;
}(Gear);

var RarmGear = function (_Gear3) {
    _inherits(RarmGear, _Gear3);

    function RarmGear(value) {
        _classCallCheck(this, RarmGear);

        var _this3 = _possibleConstructorReturn(this, (RarmGear.__proto__ || Object.getPrototypeOf(RarmGear)).call(this, value));

        _this3.classname = 'RarmGear';
        return _this3;
    }

    _createClass(RarmGear, [{
        key: 'getRawStats',
        value: function getRawStats(subTotalStats, gearMultiplier) {
            if (this.details === null) return this.getStats();

            var stats = {};
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = Stats[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var stat = _step6.value;

                    stats[stat] = Math.round((this.details[stat] || 0) * gearMultiplier);
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

            return stats;
        }
    }]);

    return RarmGear;
}(Gear);

var RlegGear = function (_Gear4) {
    _inherits(RlegGear, _Gear4);

    function RlegGear() {
        _classCallCheck(this, RlegGear);

        var _this4 = _possibleConstructorReturn(this, (RlegGear.__proto__ || Object.getPrototypeOf(RlegGear)).call(this));

        _this4.classname = 'RlegGear';
        return _this4;
    }

    _createClass(RlegGear, [{
        key: 'getRawStats',
        value: function getRawStats(subTotalAndGearStats, activeWords, gearMultiplier) {
            if (this.details === null) return this.getStats();

            var word = this.details['_'][0];
            var bonus = this.details['_'][1];
            if (!activeWords.includes(word)) return this.getStats();

            var wordMultiplier;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = MultiplierList[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var item = _step7.value;

                    if (item.name === word) {
                        wordMultiplier = item;
                        break;
                    }
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

            var stats = {};
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = Stats[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var stat = _step8.value;

                    var mult = Math.round(wordMultiplier[stat] * parseFloat(bonus) * gearMultiplier) / 100;
                    var add = Math.round((this.details[stat] || 0) * gearMultiplier);
                    stats[stat] = Math.round(subTotalAndGearStats[stat] * mult + add);
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
    }]);

    return RlegGear;
}(Gear);