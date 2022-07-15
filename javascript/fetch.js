//**************** database ****************

var fetchjobs = 2;
function finish(){
    fetchjobs = fetchjobs - 1;
    if (fetchjobs<=0){
        while(true){
            $("loadingdata").style.display="None";
            break;
        }
        
        var temp_div = document.getElementsByTagName("div");
        temp_div[temp_div.length-2].style.display="None";
    }
}

var Database;
function fetchDatabase() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        Database = JSON.parse(this.responseText);
        finish();
      }
      
    };
    var timestamp=new Date();
    xmlhttp.open("GET","php/parts.php?timestamp="+timestamp.toISOString().substring(0,13),true);
    xmlhttp.send();
  }

var MultiplierList;
function fetchMultiplier() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            MultiplierList = JSON.parse(this.responseText);
            finish();
        }
    };
    xmlhttp.open("GET","php/multiplier.php",true);
    xmlhttp.send();
}

function fetch(){
    fetchDatabase();
    fetchMultiplier();
}
