var Parts=['head','body','arms','legs','back','sword','gun','shield','pilot'];
var Gears=['bodyGear','rarmGear','larmGear','rlegGear'];
var PreGears=['bodyGear','larmGear','rarmGear'];
var PostGears=['rlegGear'];


//display
var Fields = ['arm','mel','sht','mdf','sdf','bmr','phr', 'description', 'word1', 'word2'];
var UpdateRequiredGears = ['larmGear','rlegGear'];

// ########## display variables ###########

var RarityColor={
    0: 'black',
    1: 'black',
    2: 'green',
    3: 'blue',
    4: 'rgb(255, 0, 255)',
    5: 'rgb(182, 134, 0)',
    6: 'red',
};

var AttributeImage={
    0:'',
    'T':'assets/vectors/02-attribute-technique.svg',
    'P':'assets/vectors/01-attribute-power.svg',
    'S':'assets/vectors/03-attribute-speed.svg',
};


var GunImage={
    0:'assets/vectors/41-long-range-rifle.svg',
    1:'assets/vectors/41-long-range-rifle.svg',
    2:'assets/vectors/43-long-range-long-rifle.svg',
    3:'assets/vectors/46-long-range-twin-rifle.svg',
    4:'assets/vectors/42-long-range-machine-gun.svg',
    5:'assets/vectors/45-long-range-bazooka.svg',
    6:'assets/vectors/44-long-range-gatling-gun.svg',
}

var SwordImage={
    0:'assets/vectors/34-short-range-saber.svg',
    1:'assets/vectors/34-short-range-saber.svg',
    2:'assets/vectors/36-short-range-dual-sabers.svg',
    3:'assets/vectors/33-short-range-axe.svg',
    4:'assets/vectors/37-short-range-blade.svg',
    5:'assets/vectors/38-short-range-lance.svg',
    6:'assets/vectors/35-short-range-module.svg',
    7:'assets/vectors/39-short-range-whip.svg',
    8:'assets/vectors/40-short-range-twin-blade.svg',
}

var JobImage={
    7:'assets/vectors/19-job-all-rounder.svg',
    0:'assets/vectors/19-job-all-rounder.svg',
    1:'assets/vectors/24-job-long-shooter.svg',
    2:'assets/vectors/22-job-out-fighter.svg',
    3:'assets/vectors/23-job-middle-shooter.svg',
    4:'assets/vectors/20-job-defender.svg',
    5:'assets/vectors/21-job-in-fighter.svg',
    6:'assets/vectors/25-job-supporter.svg',
}

var JobName={
    7: 'All-Rounder',
    0: 'All-Rounder',
    1: 'Long-Shooter',
    2: 'Out-Fighter',
    3: 'Middle-Shooter',
    4: 'Defender',
    5: 'In-Fighter',
    6: 'Supporter', 
}

var typeList={
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
  

//**************** trivial ****************

function $(_){
    return document.getElementById(_);
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
  





/*
// multiplier
MultiplierList = [{"id":"1","name":"Long-Shooter","arm":"0","mel":"0","sht":"0.1","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"2","name":"Out-Fighter","arm":"0","mel":"0.1","sht":"0","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"3","name":"Middle-Shooter","arm":"0","mel":"0","sht":"0.1","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"4","name":"Defender","arm":"0.05","mel":"0","sht":"0","bmr":"0","phr":"0","mdf":"0.05","sdf":"0.05"},
{"id":"5","name":"In-Fighter","arm":"0","mel":"0.1","sht":"0","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"6","name":"Supporter","arm":"0","mel":"0","sht":"0","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"7","name":"All-Rounder","arm":"0","mel":"0","sht":"0","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"1","name":"\u4e3b\u89d2\u6a5f","arm":"0","mel":"0.1","sht":"0","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"2","name":"\u91cf\u7522\u6a5f","arm":"0","mel":"0","sht":"0","bmr":"0","phr":"0","mdf":"0","sdf":"0"},
{"id":"3","name":"\u738b\u724c\u5c08\u7528\u6a5f","arm":"0","mel":"0","sht":"0.1","bmr":"0","phr":"0.05","mdf":"0","sdf":"0"},
{"id":"4","name":"\u6c34\u9678\u5169\u7528","arm":"0","mel":"0.05","sht":"0","bmr":"0","phr":"0","mdf":"0.1","sdf":"0"},{"id":"5","name":"\u6307\u63ee\u5b98\u6a5f","arm":"0","mel":"0","sht":"0.1","bmr":"0","phr":"0","mdf":"0.05","sdf":"0"},{"id":"6","name":"\u8fd1\u8eab\u6230","arm":"0","mel":"0.05","sht":"0","bmr":"0.05","phr":"0","mdf":"0","sdf":"0"},{"id":"7","name":"\u4e2d\u8ddd\u96e2\u6230","arm":"0","mel":"0","sht":"0.05","bmr":"0","phr":"0","mdf":"0.05","sdf":"0.05"},{"id":"8","name":"\u9060\u8ddd\u96e2\u6230","arm":"0","mel":"0","sht":"0.05","bmr":"0","phr":"0.05","mdf":"0.05","sdf":"0"},{"id":"9","name":"\u9ad8\u6a5f\u52d5","arm":"0","mel":"0.05","sht":"0","bmr":"0","phr":"0.05","mdf":"0.05","sdf":"0"},{"id":"10","name":"\u9ad8\u706b\u529b","arm":"0","mel":"0.05","sht":"0.05","bmr":"0","phr":"0","mdf":"0","sdf":"0"},{"id":"11","name":"\u91cd\u88dd\u7532","arm":"0","mel":"0","sht":"0.05","bmr":"0.05","phr":"0.05","mdf":"0","sdf":"0"},{"id":"12","name":"\u53ef\u8b8a","arm":"0","mel":"0.05","sht":"0","bmr":"0","phr":"0.1","mdf":"0","sdf":"0"},{"id":"13","name":"\u92fc\u5f48\u7cfb","arm":"0","mel":"0","sht":"0.05","bmr":"0","phr":"0","mdf":"0","sdf":"0.05"},{"id":"14","name":"MF","arm":"0","mel":"0.1","sht":"0","bmr":"0.05","phr":"0","mdf":"0","sdf":"0"},{"id":"15","name":"\u652f\u63f4\u6a5f","arm":"0","mel":"0","sht":"0.05","bmr":"0","phr":"0","mdf":"0","sdf":"0.1"},{"id":"16","name":"\u806f\u90a6","arm":"0","mel":"0.05","sht":"0.05","bmr":"0","phr":"0.05","mdf":"0","sdf":"0"},{"id":"17","name":"\u5409\u7fc1","arm":"0","mel":"0.05","sht":"0","bmr":"0.1","phr":"0","mdf":"0","sdf":"0"},{"id":"18","name":"\u85a9\u514b\u7cfb","arm":"0","mel":"0.05","sht":"0","bmr":"0","phr":"0","mdf":"0","sdf":"0.05"},{"id":"19","name":"\u5409\u59c6\u7cfb","arm":"0","mel":"0","sht":"0.05","bmr":"0.05","phr":"0","mdf":"0","sdf":"0.05"},{"id":"20","name":"\u5b87\u5b99\u9069\u6027","arm":"0","mel":"0.03","sht":"0.03","bmr":"0.03","phr":"0.03","mdf":"0.03","sdf":"0.03"},{"id":"21","name":"\u6c99\u6f20\u9069\u6027","arm":"0","mel":"0.03","sht":"0.03","bmr":"0.03","phr":"0.03","mdf":"0.03","sdf":"0.03"},{"id":"22","name":"\u5bd2\u5e36\u9069\u6027","arm":"0","mel":"0.03","sht":"0.03","bmr":"0.03","phr":"0.03","mdf":"0.03","sdf":"0.03"},{"id":"23","name":"\u68ee\u6797\u9069\u6027","arm":"0","mel":"0.03","sht":"0.03","bmr":"0.03","phr":"0.03","mdf":"0.03","sdf":"0.03"},{"id":"24","name":"\u5e02\u5340\u9069\u6027","arm":"0","mel":"0.03","sht":"0.03","bmr":"0.03","phr":"0.03","mdf":"0.03","sdf":"0.03"},{"id":"25","name":"\u57fa\u5730\u9069\u6027","arm":"0","mel":"0.03","sht":"0.03","bmr":"0.03","phr":"0.03","mdf":"0.03","sdf":"0.03"},{"id":"26","name":"\u96fb\u8166\u9069\u6027","arm":"0","mel":"0.03","sht":"0.03","bmr":"0.03","phr":"0.03","mdf":"0.03","sdf":"0.03"}]
*/