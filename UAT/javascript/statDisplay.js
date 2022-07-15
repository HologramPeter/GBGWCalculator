"use strict";

var gundam = new Gundam();

function displayAll() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var slot = _step.value;

      displaySlot(slot);
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

      displayGear(slot);
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

  displayTotal();
}

function selectPart() {
  var part_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var slot = getElement("active").getAttribute('slot');
  var slotType = getElement("active").getAttribute('slotType');

  if (part_data === null) {
    gundam.deletePart(slot, slotType);
  } else {
    var part = new Part(part_data);
    gundam.setPart(part, slotType);
  }

  displaySlot(slot);

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = UpdateRequiredGears[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var gearSlot = _step3.value;

      displayGear(gearSlot);
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

  displayTotal();
}

function previewPart(part_data) {
  var part = new Part(part_data);
  var slot = getElement("active").getAttribute('slot');
  var slotType = getElement("active").getAttribute('slotType');

  var mainFieldValues;
  var subFieldValues;

  var fieldValues = gundam.getPreviewStats(part, slotType);
  if (slotType === 'mainPart') {
    mainFieldValues = addToPreviewFieldValues(part, slot, fieldValues[0]);
    subFieldValues = addToFieldValues(slot, 'subPart', fieldValues[1]);
  } else {
    mainFieldValues = addToFieldValues(slot, 'mainPart', fieldValues[0]);
    subFieldValues = addToPreviewFieldValues(part, slot, fieldValues[1]);
  }

  var slotElement = getElement("active").parentElement;
  var mainElement = getChild(slotElement, 'main');
  var subElement = getChild(slotElement, 'sub');

  displayField(mainElement, mainFieldValues);
  displayField(subElement, subFieldValues);
}

function refreshSlot() {
  var slot = getElement("active").getAttribute('slot');

  var slotElement = getElement("active").parentElement;
  var mainElement = getChild(slotElement, 'main');
  var subElement = getChild(slotElement, 'sub');

  displayField(mainElement, getFieldValues(slot, 'mainPart'));
  displayField(subElement, getFieldValues(slot, 'subPart'));
}

function displaySlot(slot) {
  var slotElement = $(slot).parentElement;
  var totalElement = getChild(slotElement, 'total');
  var mainElement = getChild(slotElement, 'main');
  var subElement = getChild(slotElement, 'sub');

  displayField(totalElement, getFieldValues(slot, 'total'));

  displayField(mainElement, getFieldValues(slot, 'mainPart'));

  displayField(subElement, getFieldValues(slot, 'subPart'));
}

function getFieldValues(slot, slotType) {
  var fieldValues = gundam.getPartRawStats(slot, slotType);
  return addToFieldValues(slot, slotType, fieldValues);
}

function addToFieldValues(slot, slotType, fieldValues) {
  var words = gundam.getWords(slot, slotType);
  fieldValues['word1'] = words[0] || '';
  fieldValues['word2'] = words[1] || '';
  fieldValues['description'] = gundam.getDescription(slot, slotType) || '';
  fieldValues['attribute'] = AttributeImage[gundam.getAttributeType(slot, slotType) || 0];

  if (slot === "gun") fieldValues['icon'] = GunImage[gundam.getPartType(slot, slotType) || 0];
  if (slot === "sword") fieldValues['icon'] = SwordImage[gundam.getPartType(slot, slotType) || 0];
  if (slot === "pilot") fieldValues['icon'] = JobImage[gundam.getPartType(slot, slotType) || 0];

  // need add rarity
  if (slotType != "total") {
    fieldValues['name'] = gundam.getName(slot, slotType) || '';
    fieldValues['rarity'] = RarityColor[gundam.getRarity(slot, slotType) || 0];
  }
  return fieldValues;
}

function addToPreviewFieldValues(part, slot, fieldValues) {
  fieldValues['word1'] = part.getWord(0) || '';
  fieldValues['word2'] = part.getWord(1) || '';
  fieldValues['description'] = part.getDescription() || '';
  fieldValues['attribute'] = AttributeImage[part.getAttributeType() || 0];

  if (slot === "gun") fieldValues['icon'] = GunImage[part.getPartType() || 0];
  if (slot === "sword") fieldValues['icon'] = SwordImage[part.getPartType() || 0];

  fieldValues['name'] = part.getName() || '';
  fieldValues['rarity'] = RarityColor[part.getRarity() || 0];

  return fieldValues;
}

function displayField(element, fieldValues) {
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = Fields[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var field = _step4.value;

      getChild(element, field).innerHTML = fieldValues[field] || '';
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

  if (fieldValues['icon'] != undefined && fieldValues['icon'] != null) {
    getChild(element, 'icon').setAttribute('src', fieldValues['icon']);
  }

  if (fieldValues['attribute'] != undefined && fieldValues['attribute'] != null) {
    getChild(element, 'attribute').setAttribute('src', fieldValues['attribute']);
    if (fieldValues['attribute'] != '') getChild(element, 'attribute').style.display = 'block';else getChild(element, 'attribute').style.display = 'none';
  }
  if (fieldValues['name'] != undefined && fieldValues['name'] != null) {
    getChild(element, 'name').value = fieldValues['name'];
    getChild(element, 'name').style.color = fieldValues['rarity'];
  }
}

function setGear(select_element) {
  var slot = select_element.getAttribute('slot');
  var gearValue = select_element.value;

  gundam.setGear(slot, gearValue);

  displayGear(slot);
}

function displayGear(slot) {
  var element = $(slot);
  var stats = gundam.getGearRawStats(slot);

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = Stats[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var field = _step5.value;

      getChild(element, field).innerHTML = stats[field] || '';
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

  displayTotal();
}

function displayTotal() {
  var fieldValues = gundam.getTotalStats();

  var totalElement = $('total');

  getChild(totalElement, 'job').setAttribute('src', JobImage[gundam.getJobType() || 0]);

  var count = gundam.getAttributeTypes();
  var _arr = ['T', 'P', 'S'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var attribute = _arr[_i];
    getChild(totalElement, attribute).innerHTML = count[attribute] || 0;
  }

  var activewords = gundam.getActiveWords();
  getChild(totalElement, 'activeword1').innerHTML = activewords[0] || '';
  getChild(totalElement, 'activeword2').innerHTML = activewords[1] || '';
  getChild(totalElement, 'activeword3').innerHTML = activewords[2] || '';

  var sum = 0;
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = Stats[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var field = _step6.value;

      var value = fieldValues[field] || 0;
      sum += value;
      getChild(totalElement, field).innerHTML = value;
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

  getChild(totalElement, 'totalStat').innerHTML = sum;
}

function setWords(element) {
  var wordElements = document.getElementsByName(element.name);
  var index = [];
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = wordElements[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var wordElement = _step7.value;

      if (wordElement.checked) index.push(wordElement.value);
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

  if (index.length === 2) {
    var slot = element.getAttribute('slot');
    gundam.setWords(slot, index);
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = wordElements[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var wordElement = _step8.value;

        wordElement.parentElement.style.backgroundColor = '';
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

    displaySlot(slot);
    displayTotal();
  } else {
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = wordElements[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var wordElement = _step9.value;

        wordElement.parentElement.style.backgroundColor = 'red';
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
}

function setDescription(element) {
  var slot = element.getAttribute('slot');
  var descriptionElements = document.getElementsByName(element.name);
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = descriptionElements[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var descriptionElement = _step10.value;

      if (descriptionElement.checked) {
        gundam.setDescription(slot, descriptionElement.value);
      }
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

  displaySlot(slot);
}