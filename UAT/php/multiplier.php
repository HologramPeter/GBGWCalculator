<?php

$con = mysqli_connect('localhost','id16162796_gunpla','Exia->00Gundam','id16162796_gunplapartlist');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"id16162796_gunplapartlist");

$outp = array();

$sql="
	SELECT * FROM PilotType;
";

$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_assoc($result))
{
    $outp[] = $row;
}

$sql="
	SELECT * FROM Wordtag;
";

$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_assoc($result))
{
    $outp[] = $row;
}



echo json_encode($outp)

?>