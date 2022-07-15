var gundam = new Gundam();


function displayAll(){
  for (var slot of Parts){
    displaySlot(slot);
  }
  for (var slot of Gears){
    displayGear(slot);
  }
  displayTotal();
}

function selectPart(part_data=null){
    var slot = getElement("active").getAttribute('slot');
    var slotType = getElement("active").getAttribute('slotType');

    if(part_data===null){
      gundam.deletePart(slot, slotType);
    }else{
      var part = new Part(part_data);
      gundam.setPart(part, slotType);
    }

    displaySlot(slot);

    for(var gearSlot of UpdateRequiredGears){
      displayGear(gearSlot);
    }

    displayTotal();
}

function previewPart(part_data){
    var part = new Part(part_data);
    var slot = getElement("active").getAttribute('slot');
    var slotType = getElement("active").getAttribute('slotType');


    var mainFieldValues;
    var subFieldValues;

    var fieldValues = gundam.getPreviewStats(part, slotType);
    if (slotType === 'mainPart'){
      mainFieldValues = addToPreviewFieldValues(part, slot, fieldValues[0]);
      subFieldValues = addToFieldValues(slot, 'subPart', fieldValues[1]);
    }else{
      mainFieldValues = addToFieldValues(slot, 'mainPart', fieldValues[0]);
      subFieldValues = addToPreviewFieldValues(part, slot, fieldValues[1]);
    }
    
    
    var slotElement = getElement("active").parentElement;
    var mainElement = getChild(slotElement,'main');
    var subElement = getChild(slotElement,'sub');


    displayField(
      mainElement,
      mainFieldValues
      );
    displayField(
      subElement,
      subFieldValues
      );
}

function refreshSlot(){
  var slot = getElement("active").getAttribute('slot');
  
  var slotElement = getElement("active").parentElement;
  var mainElement = getChild(slotElement,'main');
  var subElement = getChild(slotElement,'sub');
  
  displayField(
      mainElement,
      getFieldValues(slot, 'mainPart')
      );
  displayField(
    subElement,
    getFieldValues(slot, 'subPart')
    );
}


function displaySlot(slot){
  var slotElement = $(slot).parentElement;
  var totalElement = getChild(slotElement,'total');
  var mainElement = getChild(slotElement,'main');
  var subElement = getChild(slotElement,'sub');

  displayField(
    totalElement,
    getFieldValues(slot, 'total')
  );

  displayField(
    mainElement,
    getFieldValues(slot, 'mainPart')
    );
  
  displayField(
    subElement,
    getFieldValues(slot, 'subPart')
    );
}



function getFieldValues(slot, slotType){
    var fieldValues = gundam.getPartRawStats(slot, slotType);
    return addToFieldValues(slot, slotType, fieldValues);
}

function addToFieldValues(slot, slotType, fieldValues){
    var words = gundam.getWords(slot, slotType);
    fieldValues['word1'] = words[0]||'';
    fieldValues['word2'] = words[1]||'';
    fieldValues['description'] = gundam.getDescription(slot, slotType)||'';
    fieldValues['attribute'] = AttributeImage[gundam.getAttributeType(slot, slotType)||0];

    if (slot === "gun") fieldValues['icon']  = GunImage[gundam.getPartType(slot, slotType)||0];
    if (slot === "sword") fieldValues['icon'] = SwordImage[gundam.getPartType(slot, slotType)||0];
    if (slot === "pilot") fieldValues['icon']  = JobImage[gundam.getPartType(slot, slotType)||0];

    // need add rarity
    if (slotType != "total"){
      fieldValues['name'] = gundam.getName(slot, slotType)||'';
      fieldValues['rarity']  = RarityColor[gundam.getRarity(slot, slotType)||0];
    }
    return fieldValues;
}


function addToPreviewFieldValues(part, slot, fieldValues){
  fieldValues['word1'] = part.getWord(0)||'';
  fieldValues['word2'] = part.getWord(1)||'';
  fieldValues['description'] = part.getDescription()||'';
  fieldValues['attribute'] = AttributeImage[part.getAttributeType()||0];

  if (slot === "gun") fieldValues['icon']  = GunImage[part.getPartType()||0]
  if (slot === "sword") fieldValues['icon'] = SwordImage[part.getPartType()||0]
  
  fieldValues['name'] = part.getName()||'';
  fieldValues['rarity']  = RarityColor[part.getRarity()||0];

  return fieldValues;
}


function displayField(element, fieldValues){
  for (var field of Fields){
    getChild(element, field).innerHTML = fieldValues[field]||'';
  }

  if (fieldValues['icon'] != undefined && fieldValues['icon'] != null){
    getChild(element, 'icon').setAttribute('src', fieldValues['icon']);
  }

  if (fieldValues['attribute'] != undefined && fieldValues['attribute'] != null){
    getChild(element, 'attribute').setAttribute('src', fieldValues['attribute']);
    if (fieldValues['attribute'] != '')
      getChild(element, 'attribute').style.display = 'block';
    else
      getChild(element, 'attribute').style.display = 'none';
  }
  if (fieldValues['name'] != undefined && fieldValues['name'] != null){
    getChild(element, 'name').value = fieldValues['name'];
    getChild(element, 'name').style.color = fieldValues['rarity'];
  }
}

function setGear(select_element){
  var slot = select_element.getAttribute('slot');
  var gearValue = select_element.value;

  gundam.setGear(slot, gearValue);

  displayGear(slot);
}

function displayGear(slot){
  var element = $(slot);
  var stats = gundam.getGearRawStats(slot);

  for (var field of Stats){
    getChild(element, field).innerHTML = stats[field]||'';
  }

  displayTotal();
}


function displayTotal(){
    var fieldValues = gundam.getTotalStats();
    
    var totalElement = $('total');

    getChild(totalElement, 'job').setAttribute('src',JobImage[gundam.getJobType()||0]);
    
    var count = gundam.getAttributeTypes();
    for (var attribute of ['T','P','S']){
      getChild(totalElement, attribute).innerHTML = count[attribute]||0;
    }
    
    var activewords = gundam.getActiveWords();
    getChild(totalElement, 'activeword1').innerHTML = activewords[0] || '';
    getChild(totalElement, 'activeword2').innerHTML = activewords[1] || '';
    getChild(totalElement, 'activeword3').innerHTML = activewords[2] || '';
    
    var sum = 0;
    for (var field of Stats){
      var value = fieldValues[field]||0;
      sum += value;
      getChild(totalElement, field).innerHTML = value;
    }
    getChild(totalElement, 'totalStat').innerHTML = sum;
}


function setWords(element){
  var wordElements = document.getElementsByName(element.name);
  var index=[];
  for (var wordElement of wordElements){
    if(wordElement.checked) index.push(wordElement.value);
  }
  if (index.length===2){
    var slot = element.getAttribute('slot');
    gundam.setWords(slot,index)
    for (var wordElement of wordElements){
      wordElement.parentElement.style.backgroundColor = '';
    }
    displaySlot(slot);
    displayTotal();
  }else{
    for (var wordElement of wordElements){
      wordElement.parentElement.style.backgroundColor = 'red';
    }
  }
}

function setDescription(element){
  var slot = element.getAttribute('slot');
  var descriptionElements = document.getElementsByName(element.name);
  for (var descriptionElement of descriptionElements){
    if(descriptionElement.checked){
      gundam.setDescription(slot,descriptionElement.value);
    }
  }
  displaySlot(slot);
}
