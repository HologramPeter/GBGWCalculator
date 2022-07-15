<META HTTP-EQUIV="Pragma" CONTENT="private">
<META HTTP-EQUIV="Cache-Control" CONTENT="private, max-age=5400, pre-check=5400">
<META HTTP-EQUIV="Expires" CONTENT="<?php echo date(DATE_RFC822,strtotime("1 day")); ?>">

<?php

//default language
$default_lang = "hk";

if (!isset($_GET["lang"])) $lang = $default_lang;
else $lang = $_GET["lang"];

echo file_get_contents("data/".$lang."_var.html");
echo file_get_contents("data/".$lang.".html");
echo file_get_contents("plugin/".$lang."_special_view.html");

?>