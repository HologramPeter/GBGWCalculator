var Filters={0:null};
var Collection;

let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

document.addEventListener('DOMContentLoaded', function() {
  fetch();
});

//**************** visual ****************

function updateActive(element){
  removeActive();
  element.classList.add('active');
}

function removeActive(){
  if (getElement('active') != null){
    getElement('active').classList.remove('active');
  }
  $("collection").innerHTML="";
}

function toggleSub(e) {
  var toggle = true;
  var partName = e.parentElement.parentElement.id;
  var partToToggle = [];
  
  for(var part of document.getElementsByClassName("part")){
    if (part.style.display === "flex"){
      part.style.display="none";
      getChild(part.parentElement,'edit').textContent = "Edit";
      if(part.getAttribute('slot') === partName) toggle=false;
    }
    if(part.getAttribute('slot') === partName) partToToggle.push(part);
  }
  
  if (toggle){
    for(var part of partToToggle) part.style.display="flex";
    e.textContent = "Confirm";
  }

  removeActive();
}

//**************** collection ****************


function DisplayPart(){
  redrawTable();
  searchFunction();
}

function selectFromDatabase(partType, sub=null){
  Collection = [];
  for (var key in Database){
    var entry = Database[key];
    if (entry.slot != partType) continue;
    if (sub!=null) if (!sub(entry)) continue;
    var passed = true;
    for (filter of getFilters()){
      if (filter!=null) if(!filter(entry)){
        passed = false;
        break;
      };
    }
    if (passed) Collection.push(entry);
  }
}

function updateFilter(e){
  if (e.value === '') Filters[e.id] = null;
  else Filters[e.id] = function(entry){return e.value===entry[e.id]};
  DisplayPart();
}

function getFilters(){
  return Object.values(Filters);
}

function compare(entry,b,de){
  if (b==='') return de;
  return b===entry['word1'] || b===entry['word2'];
}

function updateTraitFilter(){
  var traitType = $('traitType').value;
  if (traitType === '') Filters['traitType'] = null;
  else{
    Filters['traitType'] = function(entry){
      return traitType===entry['traitType1'] || traitType===entry['traitType2'];
    };
  }
  DisplayPart();
}

function updateWordFilter(){
  var word_and = $('wordFilter1').value;
  var word_or1 = $('wordFilter2').value;
  var word_or2 = $('wordFilter3').value;

  if (word_or1 === '' && word_or2 === ''){
    if (word_and==='') Filters['word'] = null;
    else Filters['word'] = function(entry){return compare(entry, word_and, true)};
  }else{
    Filters['word'] = function(entry){
      return (compare(entry, word_and, true) && (compare(entry, word_or1, false)||compare(entry, word_or2, false)))
    };
  }
  DisplayPart();
}

function resetSubTypeFilter(){
  var active_element = getElement("active");
  var type = active_element.parentElement.id;
  var options = [];
  if(type === '6'){
    options = document.getElementsByClassName('sword-option')
  }
  else if(type === '7'){
    options = document.getElementsByClassName('gun-option')
  }
  else if(type === '9'){
    options = document.getElementsByClassName('pilot-option')
  }

  for(var option of document.getElementsByClassName('lazy')){
    option.classList.add('hidden');
  }

  for(var option of options){
    option.classList.remove('hidden');
  }
  

  $('subType').selectedIndex = 0;

  updateFilter($('subType'));
}

function redrawTable(){
  var active_element = getElement("active");
  if (active_element===null) return;
  var type = active_element.parentElement.id;

  if (active_element.getAttribute('slotType') ==="subPart" && (type === '6' || type === '7')){ //TODO
    var subType = gundam.getPartType(active_element.getAttribute('slot'),'mainPart');
    selectFromDatabase(type, function(entry){return entry.subType===subType});
  }else{
    selectFromDatabase(type);
  }

  sortCollection();
  
  $("collection").innerHTML="";
  for (var part of Collection){
    var row = document.createElement("tr");
    var cell = document.createElement("div");
    var textnode = document.createTextNode(part.name);
    cell.setAttribute("data", JSON.stringify(part));
    cell.addEventListener(touchEvent, function(){
      selectPart(this.getAttribute('data'));
    });
    cell.setAttribute("onmouseover", "previewPart(this.getAttribute('data'))");
    cell.setAttribute("onmouseout", "refreshSlot()");
    if (part.altered != '0'){
      cell.classList.add('altered');
    }
    cell.classList.add('r'+part.rarity);

    cell.appendChild(textnode);
    row.appendChild(cell);
    $("collection").appendChild(row);
  }
}

function sortCollection(){
  var field = $("orderBy").value;
  Collection.sort(SortOrder(field));
}

function SortOrder(prop) {    
  return function(a, b) {    
      inta = parseInt(a[prop])
      intb = parseInt(b[prop])
      if (inta > intb) {    
          return -1;    
      } else if (inta < intb) {    
          return 1;    
      }    
      return 0;    
  }    
}
 



//**************** selection ****************

function PartSelection(partName_element){
  updateActive(partName_element);
  resetSubTypeFilter();
  DisplayPart();
}




//**************** imported ****************

function searchFunction() {
  var input, filter, table, div, td, i, txtValue;
  input = $("search");
  filter = input.value.toUpperCase();
  table = $("collection");
  div = table.getElementsByTagName("div");
  for (i = 0; i < div.length; i++) {
      txtValue = div[i].textContent || div[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
  }
} 


// not implemented
/*
  //fetchFilterOptions();

  // function fetchWordOptions(){
  //   fetchWordOptions();
  //   fetchTraitOptions();
  // }

  // function fetchTraitOptions(){
  //   var xmlhttp = new XMLHttpRequest();
  //     xmlhttp.onreadystatechange = function() {
  //       if (this.readyState == 4 && this.status == 200) {
  //          $('traitType') = JSON.parse(this.responseText);
  //       }
  //     };
  //     xmlhttp.open("GET","options.php?q=TraitType",true);
  //     xmlhttp.send();
  // }

  // function fetchSkillOptions(){
  //   var xmlhttp = new XMLHttpRequest();
  //     xmlhttp.onreadystatechange = function() {
  //       if (this.readyState == 4 && this.status == 200) {
  //          $('skillType') = JSON.parse(this.responseText);
  //       }
  //     };
  //     xmlhttp.open("GET","options.php?q=ExSkillType",true);
  //     xmlhttp.send();
  // }

  // function fetchWordOptions(){
  //   var xmlhttp = new XMLHttpRequest();
  //     xmlhttp.onreadystatechange = function() {
  //       if (this.readyState == 4 && this.status == 200) {
  //          wordOptions = JSON.parse(this.responseText);
  //          $('wordFilter1') = wordOptions;
  //          $('wordFilter2') = wordOptions;
  //          $('wordFilter3') = wordOptions;
  //       }
  //     };
  //     xmlhttp.open("GET","options.php?q=Wordtag",true);
  //     xmlhttp.send();
  // }
*/
