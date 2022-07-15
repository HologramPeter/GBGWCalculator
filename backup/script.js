var attrs=[
  'arm','mel','sht','mdf','sdf','bmr','phr'
];

var rarity_color={
  1: "black",
  2: "green",
  3: "blue",
  4: "rgb(255, 0, 255)",
  5: "rgb(182, 134, 0)",
  6: "red"
};
var attr_img={
  'T':"assets/vectors/02-attribute-technique.svg",
  'P':"assets/vectors/01-attribute-power.svg",
  'S':"assets/vectors/03-attribute-speed.svg",
  0:""
};
var type_list={
  1: "head",
  2: "body",
  3: "arms",
  4: "legs",
  5: "back",
  6: "sword",
  7: "gun",
  8: "shield",
  9: "pilot"
};


var gun_img={
  1:'assets/vectors/41-long-range-rifle.svg',
  2:'assets/vectors/43-long-range-long-rifle.svg',
  3:'assets/vectors/46-long-range-twin-rifle.svg',
  4:'assets/vectors/42-long-range-machine-gun.svg',
  5:'assets/vectors/45-long-range-bazooka.svg',
  6:'assets/vectors/44-long-range-gatling-gun.svg',
  0:'assets/vectors/41-long-range-rifle.svg'
}

var sword_img={
  1:'assets/vectors/34-short-range-saber.svg',
  2:'assets/vectors/36-short-range-dual-sabers.svg',
  3:'assets/vectors/33-short-range-axe.svg',
  4:'assets/vectors/37-short-range-blade.svg',
  5:'assets/vectors/38-short-range-lance.svg',
  6:'assets/vectors/35-short-range-module.svg',
  7:'assets/vectors/39-short-range-whip.svg',
  8:'assets/vectors/40-short-range-twin-blade.svg',
  0:'assets/vectors/34-short-range-saber.svg'
}

var pilot_img={
  '1':'assets/vectors/24-job-long-shooter.svg',
  '2':'assets/vectors/22-job-out-fighter.svg',
  '3':'assets/vectors/23-job-middle-shooter.svg',
  '4':'assets/vectors/20-job-defender.svg',
  '5':'assets/vectors/21-job-in-fighter.svg',
  '6':'assets/vectors/25-job-supporter.svg',
  0:'assets/vectors/19-job-all-rounder.svg'
}

var pilot_job={
  1: 'Long-Shooter',
  2: 'Out-Fighter',
  3: 'Middle-Shooter',
  4: 'Defender',
  5: 'In-Fighter',
  6: 'Supporter'    
}


var database;
var collection;
var multiplierlist;
var Filters={0:null};

fetchDatabase();
fetchMultiplier();

//**************** trivial ****************

function $(_){
  return document.getElementById(_);
}

function __(_,str=''){
  return _||str
}

function isEmpty(ob){
  for(var i in ob){ if(i!="") return false;}
 return true;
}

function getElement(myclass){
  return document.getElementsByClassName(myclass)[0];
}

function getChild(element, myclass){
  return element.getElementsByClassName(myclass)[0];
}

function getChilds(element, myclass, myclass2=0){
  children=[]
  children.push(...element.getElementsByClassName(myclass));
  children.push(...element.getElementsByClassName(myclass2));
  return children;
}


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
  var needCal = true;
  var toggle = true;
  var partName = e.parentElement.parentElement.id;
  var partToToggle = []
  
  for(var part of document.getElementsByClassName("part")){
    if (part.style.display === "flex"){
      if (needCal) calculate(part.parentElement.id);
      part.style.display="none";
      getChild(part.parentElement,'edit').textContent = "Edit";
      needCal = false;
      if(part.id.includes(partName)) toggle=false;
    }
    if(part.id.includes(partName)) partToToggle.push(part);
  }
  
  if (toggle){
    for(var part of partToToggle) part.style.display="flex";
    e.textContent = "Confirm";
  }

  removeActive();
}

/* depreciated
// function toggle(part,e,needCal){
//   if (part.style.display==="flex"){
//     if (needCal) calculate(part.parentElement.id);
//     part.style.display="none";
//     e.textContent = "Edit";
//     return false;
//   }else{
//     part.style.display="flex";
//     e.textContent = "Confirm";
//     return needCal;
//   }
// }
*/


//**************** database ****************

function fetchDatabase() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      database = JSON.parse(this.responseText);
    }
    $("loadingdata").style.display="None";
    var temp_div = document.getElementsByTagName("div");
    temp_div[temp_div.length-2].style.display="None";
  };
  xmlhttp.open("GET","parts.php",true);
  xmlhttp.send();
}

function fetchMultiplier() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      multiplierlist = JSON.parse(this.responseText);
    }
    $("loadingmultiplier").style.display="None";
  };
  xmlhttp.open("GET","/multiplier.php",true);
  xmlhttp.send();
}


//**************** collection ****************


function DisplayPart(){
  redrawTable();
  searchFunction();
}

function selectFromDatabase(partType, sub=null){
  collection = database.filter(function (entry) {
    if (entry.type != partType) return false;
    if (sub!=null) if (!sub(entry)) return false;
    for (filter of getFilters()){
      if (filter!=null) if(!filter(entry)) return false;
    }
    return true;
  });
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

function redrawTable(){
  var active_element = getElement("active");
  if (active_element===null) return;
  var type = active_element.parentElement.id;
  var type_name = type_list[type];

  if (active_element.id.includes("sub") && (type === '6' || type === '7')){
    var main_part = JSON.parse($(type_name).getAttribute("main-data"));
    selectFromDatabase(type, function(entry){return entry.subType===main_part.subType});
  }else{
    selectFromDatabase(type);
  }

  sortCollection();
  
  $("collection").innerHTML="";
  for (var part of collection){
    var row = document.createElement("tr");
    var cell = document.createElement("div");
    var textnode = document.createTextNode(part.name);
    cell.setAttribute("data", JSON.stringify(part));
    cell.setAttribute("onclick", "selectPart(this.getAttribute('data'))");
    cell.setAttribute("onmouseover", "previewPart(this.getAttribute('data'))");
    cell.setAttribute("onmouseout", "refreshPart()");
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
  collection.sort(SortOrder(field));
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
  updateActive(partName_element.parentElement.parentElement);
  resetSubTypeFilter();
  DisplayPart();
}

function selectPart(data){
  setPartData(data);
}

function removePart(){
  setPartData();
}

function previewPart(data){
  var active_element = getElement("active");
  var type_name = type_list[active_element.parentElement.id];
  var part = JSON.parse(data);

  if (active_element.id.includes("sub")){
    var main_part = JSON.parse($(type_name).getAttribute("main-data"));
    setFields(active_element, part, getBonus(main_part,part));
  }else{
    setFields(active_element, part);
  }
}

function refreshPart(){
  var active_element = getElement("active");
  var type_name = type_list[active_element.parentElement.id];
  refreshPart_type(type_name);
}

function refreshPart_type(type_name){
  var main_part = JSON.parse($(type_name).getAttribute("main-data"));
  var sub_part = JSON.parse($(type_name).getAttribute("sub-data"));
  setFields($("main-"+type_name),main_part);
  setFields($("sub-"+type_name),sub_part, getBonus(main_part,sub_part));
}

function setPartData(data=null){
  var active_element = getElement("active");
  var type_name = type_list[active_element.parentElement.id];

  if (active_element.id.includes("main")){
    $(type_name).setAttribute("main-data",data);
    if (data===null){
      $(type_name).setAttribute("sub-data",data);
    }

  }else if (active_element.id.includes("sub")){
    $(type_name).setAttribute("sub-data",data);
  }
  
  refreshPart_type(type_name);
}

function setFields(slot, part, bonus=1){
  var type = slot.parentElement.id;
  if(part != null){

    for (attr of attrs){
      getChild(slot, attr).textContent = Math.round(part[attr]*bonus);
    }

    for (attr of ['word1','word2']){
      getChild(slot, attr).value = part[attr];
      getChild(slot, attr+"lbl").textContent = part[attr];
    }
    
    var d = part['description1']+';   '+part['description2'];
    getChild(slot, 'description').value = d;
    getChild(slot, 'descriptionlbl').innerHTML = d;

    getChild(slot, 'name').value = part['name'];
    getChild(slot, 'name').style.color = rarity_color[part['rarity']];

    getChild(slot, 'attribute').setAttribute("src",attr_img[part['attribute']]);
    getChild(slot, 'attribute').style.display="block";

    if (type === '6'){ // sword
      getChild(slot, 'icon').setAttribute('src', sword_img[part['subType']]);
    }else if (type === '7'){ // gun
      getChild(slot, 'icon').setAttribute('src', gun_img[part['subType']]);
    }
    // }else if (type === '9'){ // pilot
    //   $('job').setAttribute('src', pilot_img[part['subType']]);
    //   $('job').setAttribute('alt', part['subType']);
    // }

  }else{
    for (attr of attrs){
      getChild(slot, attr).textContent = '';
    }

    for (attr of ['description','word1','word2']){
      getChild(slot, attr).value = '';
      getChild(slot, attr+"lbl").innerHTML = '';
    }

    getChild(slot, 'name').value = '';
    getChild(slot, 'name').style.color = rarity_color[0];

    getChild(slot, 'attribute').setAttribute("src",attr_img[0]);
    getChild(slot, 'attribute').style.display="none";

    if (type === '6'){ // sword
      getChild(slot, 'icon').setAttribute('src', sword_img[0]);
    }else if (type === '7'){ // gun
      getChild(slot, 'icon').setAttribute('src', gun_img[0]);
    }else if (type === '9'){ // pilot
      $('job').setAttribute('src', pilot_img[0]);
      $('job').setAttribute('alt', '');
    }
  }
}

//**************** calculation ****************

function subTotal(attr){
  return (parseInt($('sub'+attr).value)||0)
}

function calculate(part_type){
  var slot = $(type_list[part_type])
  var main_part = JSON.parse(slot.getAttribute("main-data"));
  var sub_part = JSON.parse(slot.getAttribute("sub-data"));

  //check validity
  if (sub_part!=null){
    if (sub_part.subType !='' & main_part.subType != sub_part.subType & part_type != '9'){
      alert("Please 2 weapons of the same type");
      throw 'WrongWeapon';
    }
  }


  var words = getChilds(slot.parentElement,"word1","word2");
  var count = 0;
  var selectedwords = [];
  for (var word of words){
    if (word.checked){
      count++;
      selectedwords.push(word);
    }
  }
  if (count != 2){
    alert("You have selected " + count + " words. Please select 2.");
    throw 'InvalidWordSelection';
  }else if(selectedwords[0].value!='' & selectedwords[0].value === selectedwords[1].value){
    alert("Please select 2 different words.");
    throw 'InvalidWordSelection';
  }

  var descriptions = getChilds(slot.parentElement,"description");
  var count = 0;
  var selectedEx;
  for (var description of descriptions){
    if (description.checked){
      count++;
      selectedEx=description;
    } 
  }
  if (count != 1){
    alert("Please select exactly 1 trait/Exskill.");
    throw 'InvalidtraitSelection';
  }

  //calculate part
  if (main_part === null){
    for (var attr of attrs){
      getChild(slot,'_'+attr).textContent = "";
    }
    getChild(slot,"_word1").textContent = "";
    getChild(slot,"_word2").textContent = "";
    getChild(slot,"_description").textContent = "";
  
    getChild(slot, '_attribute').setAttribute("src","");
    getChild(slot, '_attribute').setAttribute("alt","");
    getChild(slot, '_attribute').style.display="none";

    if(part_type === '6'){
      getChild(slot, '_icon').setAttribute("src",sword_img[0]);
    }
    if(part_type === '7'){
      getChild(slot, '_icon').setAttribute("src",gun_img[0]);
    }
    if(part_type === '9'){
      $('job').setAttribute("src",pilot_img[0]);
      $('job').setAttribute("alt","");
    }
  }else{
    if(sub_part === null){
      for (var attr of attrs){
        getChild(slot,'_'+attr).textContent = main_part[attr];
      }
    }else{
      var multiplier = getBonus(main_part, sub_part)
    
      for (var attr of attrs){
        var s = parseInt(main_part[attr])+multiplier*parseInt(sub_part[attr]);
        getChild(slot,'_'+attr).textContent = Math.round(s);
      }
    }
      
    getChild(slot,"_word1").textContent = selectedwords[0].value;
    getChild(slot,"_word2").textContent = selectedwords[1].value;
    getChild(slot,"_description").textContent = selectedEx.value;
  
    getChild(slot, '_attribute').setAttribute("src",attr_img[__(main_part['attribute'])]);
    getChild(slot, '_attribute').setAttribute("alt",__(main_part['attribute']));
    getChild(slot, '_attribute').style.display="block";
  
    if(part_type === '6'){
      getChild(slot, '_icon').setAttribute("src",sword_img[main_part['subType']]);
    }
    if(part_type === '7'){
      getChild(slot, '_icon').setAttribute("src",gun_img[main_part['subType']]);
    }
    if(part_type === '9'){
      $('job').setAttribute("src",pilot_img[main_part['subType']]);
      $('job').setAttribute("alt",main_part['subType']);
    }
  }
  

  update_gunpla();

  // count and update attribute

  // count, update word and activate boost
  // activate job boost

  //subtotal

  //activate gear boost

  //total
}

function update_gunpla(){
  var multiplier = getMultiplier();

  for (var attr of attrs){
    var s = 0;
    for (var part of document.getElementsByClassName('_'+attr)){
      s += (parseFloat(part.textContent)||0);
    }
    $('sub'+attr).value = Math.round(s*multiplier[attr]);
  }

  update_gear();
  post_update_gunpla();
}

function post_update_gunpla(){
  var sum = 0;
  for (var attr of attrs){
    var s = 0;
    for (var part of document.getElementsByClassName(attr+'_')){
      s += (parseFloat(part.textContent)||0);
    }
    $('total'+attr).textContent = s + subTotal(attr);
    sum += s + subTotal(attr);
  }
  $('totalsum').textContent=sum;
}

function update_gear(){
  update_gear_larm();
  update_gear_rleg();
}

function update_gear_body(){
  var attr_dict = splitGearValue('gear-body-select');
  if (isEmpty(attr_dict)) return;

  for (var attr of attrs){
    if (Object.keys(attr_dict).includes(attr)){
      getChild($('gear-body'), attr+'_').textContent = attr_dict[attr];
    }else{
      getChild($('gear-body'), attr+'_').textContent = '';
    }
  }
}

function update_gear_larm(){
  var attr_dict = splitGearValue('gear-larm-select');
  if (isEmpty(attr_dict)) return;
  var s = 0;
  
  for (var attr of Object.keys(attr_dict)){
    if (!attr_dict[attr].includes('-')){
      s += subTotal(attr)*parseFloat(attr_dict[attr]);
    }
    getChild($('gear-larm'), attr+'_').textContent = '';
  }


  for (var attr of Object.keys(attr_dict)){
    if (attr_dict[attr].includes('-')){
      getChild($('gear-larm'), attr+'_').textContent = Math.round(s);
    }
  }
}

function update_gear_rarm(){
  var attr_dict = splitGearValue('gear-rarm-select');
  if (isEmpty(attr_dict)) return;
  for (var attr of attrs){
    if (Object.keys(attr_dict).includes(attr)){
      getChild($('gear-rarm'), attr+'_').textContent = attr_dict[attr];
    }else{
      getChild($('gear-rarm'), attr+'_').textContent = '';
    }
  }
}

function update_gear_rleg(){
  var attr_dict = splitGearValue('gear-rleg-select');
  if (isEmpty(attr_dict)) return;
  for (var attr of attrs){
    if (Object.keys(attr_dict).includes(attr)){
      getChild($('gear-rleg'), attr+'_').textContent = attr_dict[attr];
    }else{
      getChild($('gear-rleg'), attr+'_').textContent = '';
    }
  }
  var word, bonus, active=false;
  var value = attr_dict["_"].split('$');
  word = value[0];
  bonus = parseFloat(value[1]);

  for(i of [1,2,3]){
    if ($('activeword'+i).textContent === word){
      active = true;
      break;
    }
  }

  if (active){
    for(var item of multiplierlist){
      if (item.name === word){
        for(var attr of attrs){
          getChild($('gear-rleg'), attr+'_').textContent =
            parseInt(getChild($('gear-rleg'), attr+'_').textContent||0)
            + Math.round(subTotal(attr)*parseFloat(item[attr])*bonus);
        }
        break;
      }
    }
  }

}

function splitGearValue(gear_name){
  var dict = {};
  var attr_list = $(gear_name).value.split(' ');
  for (var item of attr_list){
    var i = item.split('#')
    dict[i[0]]=i[1];
  }
  return dict;
}

function occurance(list){
  var o = {};

  for (var cell of list) {
    if (cell.value!='' && cell.checked) o[cell.value] = (o[cell.value] || 0) + 1 ;
  }
  return o
}

function altoccurance(list){
  var o = {};

  for (var cell of list) {
    if (cell.alt!='') o[cell.alt] = (o[cell.alt] || 0) + 1 ;
  }
  return o
}

function active(list){
  var count = occurance(list)

  var activefield = Object.keys(count).reduce(function (activefield, key) {
    if (count[key] >= 5) activefield[key] = count[key];
    return activefield;
  }, {});

  return activefield;
}

function getBonus(main_part, sub_part){
  if (sub_part===null) return 0;
  if (main_part===null) return 0;
  
  var bonus=0.05;

  if (main_part.modelName != '' & main_part.modelName === sub_part.modelName){
    bonus+=0.3
  }else{
    if ([main_part.word1,main_part.word2].includes(sub_part.word1)) bonus+=0.1;
    if ([main_part.word1,main_part.word2].includes(sub_part.word2)) bonus+=0.1;
  }

  if([main_part.altered,sub_part.altered].includes('2') & main_part.altered != sub_part.altered){
    bonus+=0.2;
  }
  return bonus;
}

function getMultiplier(){
  var multiplier = {}
  for(var attr of attrs){multiplier[attr] = 1};

  var attribute_list = altoccurance(document.getElementsByClassName('_attribute'));
  var active_word_list = Object.keys(active(document.getElementsByName('word')));
  var job = pilot_job[$('job').getAttribute('alt')];
  //changedisplay

  for (var a of ["T","P","S"]) $(a).textContent = (attribute_list[a]||0);

  for(i of [1,2,3]) $('activeword'+i).textContent = (active_word_list[i-1]||'');
  
  
  //calculate
  for(var item of multiplierlist){
    if (active_word_list.includes(item.name) || job === item.name){
      for(var attr of attrs) multiplier[attr] = multiplier[attr]+parseFloat(item[attr]);
    }
  }

  return multiplier
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

// document.ready(function(){

//     $("myInput").on("keyup", function() {
//       var value = $(this).val().toLowerCase();
//       $("#myTable tr").filter(function() {
//         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//       });
//     });
    
//     $('select').on('change', function() {
//         var value = $(this).val().toLowerCase();
//         $("myTable").filter(function() {
//           $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         });
//     });


//   });

  