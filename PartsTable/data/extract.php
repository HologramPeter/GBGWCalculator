<?php

//###########################           Settings         #################################

//google sheet id
//testing id： '1yRGYxv_ImhS_KvYa_A_Lnj28-g7WqNf-1B42EQ990I0'
$googlesheetID = '1yRGYxv_ImhS_KvYa_A_Lnj28-g7WqNf-1B42EQ990I0';


//language => name, gid of tab
$langList = [
	"hk" => ["香港繁體","1568796214"],
	"tw" => ["台灣繁體","1712178179"],
	"en" => ["English","736062533"]
];

//#########################################################################################

foreach ($langList as $lang=>$info){
	ob_start();
	extract_data($lang, $info, $langList, $googlesheetID);
	file_put_contents($lang.'.html', ob_get_contents());
	ob_end_clean();

	ob_start();
	extract_option($lang, $info, $langList, $googlesheetID);
	file_put_contents($lang.'_var.html', ob_get_contents());
	ob_end_clean();
}

echo "success";

function extract_data($lang, $info, $langList, $googlesheetID){
	$gid = $info[1];
	$table = file_get_contents("https://docs.google.com/spreadsheets/d/".$googlesheetID."/export?gid=".$gid."&format=csv");
	$rows = explode(chr(13),$table);

	$header_row = str_getcsv(array_shift($rows));
	array_shift($rows); //width
	array_shift($rows); //option
	array_shift($rows); //N/A

	###########
	echo "
	<html>
		<script src='https://code.jquery.com/jquery-3.5.1.js'></script>
		<script type='text/javascript' src='https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js'></script>
		<script type='text/javascript' src='https://cdn.datatables.net/fixedheader/3.1.8/js/dataTables.fixedHeader.min.js'></script>
		<script type='text/javascript' src='plugin/jquery.multi-select.js'></script>

		<script src='tableScript.js'></script>

		<link rel='stylesheet' type='text/css' href='https://cdn.datatables.net/v/dt/dt-1.10.24/datatables.min.css'/>
		<link rel='stylesheet' type='text/css' href='https://cdn.datatables.net/fixedheader/3.1.8/css/fixedHeader.dataTables.min.css'/>
		
		<link rel='stylesheet' type='text/css' href='plugin/example-styles.css'>
		<link rel='stylesheet' href='langStyle.css'>
		<link rel='stylesheet' href='tableStyle.css'>
		
		<title>GBGW Parts Table</title>
			
		<body class='".$lang."'>
			<div id = 'title'>
				<div class = 'header'>GBM " . (($lang == 'en') ? "Parts Table" : "零件表") . "</div>
				<div class = 'container'>
					" . (($lang == 'en') ? "Visitor count:" : "瀏覽次數：") . "<span id='counter-display'></span>
					<a href='/'>戰力計算器</a>

	";
	###########

	// language switch
	foreach ($langList as $link=>$info){
		echo "<a href='?lang=".$link."'>".$info[0]."</a>";
	}

	###########
	echo"
			</div>
		</div>

		<div id='filterContainer'></div>
	";
	###########


	//table
	echo "<table id='chart1' class = 'cell-border compact stripe ".$lang."-table'>";

	echo "<thead><tr>";
	foreach ($header_row as $cell){
		echo "<th>".$cell."</th>";
	}
	echo "</tr></thead>";
	
	// echo "<tbody>";
	// foreach($rows as $row) {
	// 	echo "<tr>";
	// 	foreach (str_getcsv($row) as $cell){
	// 		echo "<td>".$cell."</td>";
	// 	}
	// 	echo "</tr>";
	// }
	// echo "</tbody>";

	echo "</table>";

	###########
	echo"
		<div id='placeholder' class = 'navContainer'></div>
		</body>
	</html>
	";
	###########
}

function extract_option($lang, $info, $langList, $googlesheetID){
	$gid = $info[1];
	$table = file_get_contents("https://docs.google.com/spreadsheets/d/".$googlesheetID."/export?gid=".$gid."&format=csv");
	$table = str_replace(chr(10), '', $table);
	$table = str_replace("'", " ", $table);
	$rows = explode(chr(13),$table);

	$header_row = str_getcsv(array_shift($rows));
	$width_row = str_getcsv(array_shift($rows));
	$option_row = str_getcsv(array_shift($rows));
	array_shift($rows); // N/A
	###########

	$options = array();
	for($x = 0; $x < sizeof($width_row); $x+=1){
		$width = trim($width_row[$x]); 	

		if ($width=="") $visible = 'false';
		else $visible = 'true';

		$filter = trim($option_row[$x]);
		if($filter=="sort") $orderable = 'true';
		else $orderable = 'false';
		
		$options[] = "{'visible':".$visible.",'width':'".$width."','orderable':".$orderable."}";
	}

	$searchColumns = array();
	$andColumns = array();
	$exactColumns = array();

	for($x = 0; $x < sizeof($option_row); $x+=1){
		$filter = trim($option_row[$x]);

		if ($filter!="" && $filter!="sort"){
			$searchColumns[] = $x;
		}

		if($filter=="FilterAnd"){
			$andColumns[] = $x;
		}else if($filter=="FilterExact"){
			$exactColumns[] = $x;
		}
	}

	$filters = array();
	foreach ($searchColumns as $x){
		$filters[$x] = array();
	}

	echo "
	<script>
	var phpData = [ 
	";

	foreach($rows as $row) {
		$cells = str_getcsv($row);
		echo "[";
		foreach($cells as $cell){
			echo "'".preg_quote($cell, "'")."',";
		}
		echo "],\n";
		foreach($searchColumns as $x){
			foreach (explode(",",$cells[$x]) as $value){
				$filters[$x][trim($value)] = 1;
			}
		}
	}

	echo "];
	var phpColumnOptions = [".implode (",", $options)."];
	var phpFilterColumns = [".implode (",", $searchColumns)."];
	var phpAndColumns = [".implode (",", $andColumns)."];
	var phpExactColumns = [".implode (",", $exactColumns)."];
	var phpColumnValues = {
	";

	foreach ($filters as $x => $values){
		echo $x.":[";

		foreach ($values as $name => $set){
			if ($name != "#N/A" and $name != "") echo "'".$name."',";
		}
		echo "],";
	}

	echo"
	};
	</script>
	";
}

?>