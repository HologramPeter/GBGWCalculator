<?php

$con = mysqli_connect('localhost','id16162796_hologrampeter','Exia->00Gundam','id16162796_gunpla_levelupdate');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"id16162796_gunpla_levelupdate");

$sql="
SELECT PS.id, PS.arm, PS.mel, PS.sht, PS.mdf, PS.sdf, PS.bmr, PS.phr,
CONCAT('Lv',PS.level,' ',(CASE WHEN P.altered = 1 THEN '[改造]' WHEN P.altered = 2 THEN '[BIG改造]' ELSE '' END), P.name) as name,
ATTR.name as attribute,
COALESCE(CONCAT(EX.name,' ', EX.description), T.description1) as description1, T.description2 as description2,
COALESCE(ST.type,GT.type,PT.type,'') as 'subType',
W1.name As word1, W2.name AS word2,

P.rarity, P.partType as slot, P.altered, COALESCE(P.model,'') AS modelName

FROM PartStatList AS PS
	INNER JOIN PartList AS P on P.id = PS.id
	
	INNER JOIN Attribute AS ATTR ON ATTR.id = P.attribute
	INNER JOIN Wordtag AS W1 ON P.word1 = W1.id
	INNER JOIN Wordtag AS W2 ON P.word2 = W2.id
	
	LEFT JOIN PartSkillList AS EX ON EX.id = P.id
	LEFT JOIN PartTraitList AS T ON T.id = P.id
	
	LEFT JOIN PartSwordList AS ST ON ST.id = P.id
	
	LEFT JOIN PartGunList AS GT ON GT.id = P.id

	LEFT JOIN PartJobList AS PT ON PT.id = P.id
;
";

$result = mysqli_query($con,$sql);

$outp = array();
while($row =mysqli_fetch_assoc($result))
{
    $outp[$row['id']] = $row;
}

echo json_encode($outp);

//counter

$sql="
  UPDATE PageCounter SET counter = counter+1 WHERE lang='cal';
";

mysqli_query($con,$sql);

?>