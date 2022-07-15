<META HTTP-EQUIV="Pragma" CONTENT="private">
<META HTTP-EQUIV="Cache-Control" CONTENT="private, max-age=5400, pre-check=5400">
<META HTTP-EQUIV="Expires" CONTENT="<?php echo date(DATE_RFC822,strtotime("1 day")); ?>">

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-CSV85F37KS"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CSV85F37KS');
</script>

<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->

<?php

//default language
$default_lang = "hk";

if (!isset($_GET["lang"])) $lang = $default_lang;
else $lang = $_GET["lang"];

//counter
$con = mysqli_connect('localhost','id16162796_hologrampeter','Exia->00Gundam','id16162796_gunpla_levelupdate');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"id16162796_gunpla_levelupdate");

$sql="
  UPDATE PageCounter SET counter = counter+1 WHERE lang='" .$lang. "';
";
mysqli_query($con,$sql);


$sql="
  SELECT counter FROM PageCounter WHERE lang='" .$lang. "';
";
$result = mysqli_query($con,$sql);
$count = mysqli_fetch_assoc($result)['counter'];
echo "<div id='counter' style='display:none'>".$count."</div> <span>[本網站已於2021年9月停止更新]</span>";

echo file_get_contents("data/".$lang."_var.html");
echo file_get_contents("data/".$lang.".html");
echo file_get_contents("plugin/".$lang."_special_view.html");

?>