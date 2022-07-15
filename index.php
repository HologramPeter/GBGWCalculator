<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <script src="javascript/variables.js" charset="utf-8"></script>
        <script src="javascript/fetch.js" charset="utf-8"></script>

        <script src="javascript/Gear.js" charset="utf-8"></script>
        <script src="javascript/Part.js" charset="utf-8"></script>
        <script src="javascript/Slot.js" charset="utf-8"></script>
        <script src="javascript/Gundam.js" charset="utf-8"></script>

        <script src="javascript/statDisplay.js" charset="utf-8"></script>
        <script src="javascript/saveLoad.js" charset="utf-8"></script>
        <script src="script.js" charset="utf-8"></script>
            
        <title>GBGW Calculator</title>
    </head>
    <body>
        <div id='titlebar'>
            <div>
                <span id='title'>GBGW Calculator</span>
                <span id='author'>By Hologram </span>
                <span>[本網站已於2021年9月停止更新，謝謝各位支持！]</span>
            </div>

            <div>
                <span id='loadingdata' style='color:red;'>Loading Data</span>
            </div>

            <div class = "container">
                <span>零件表：</span>
                <a href="PartsTable/?lang=hk">香港繁體</a>
                <a href="PartsTable/?lang=tw">台灣繁體</a>
                <a href="PartsTable/?lang=en">English</a>
            </div>
        </div>
        <div id="searchBar">
            <div>
                <div>類型</div>
                <select id = 'subType' onchange='updateFilter(this)'>
                    <option selected value=''>-選擇-</option>
                    <option class='lazy sword-option hidden' value="1">劍</option>
                    <option class='lazy sword-option hidden' value="2">雙刀</option>
                    <option class='lazy sword-option hidden' value="3">斧</option>
                    <option class='lazy sword-option hidden' value="4">大劍</option>
                    <option class='lazy sword-option hidden' value="5">矛</option>
                    <option class='lazy sword-option hidden' value="6">模組</option>
                    <option class='lazy sword-option hidden' value="7">鞭</option>
                    <option class='lazy sword-option hidden' value="8">雙刃</option>
                    <option class='lazy gun-option   hidden' value="1">槍</option>
                    <option class='lazy gun-option   hidden' value="2">長槍</option>
                    <option class='lazy gun-option   hidden' value="3">雙槍</option>
                    <option class='lazy gun-option   hidden' value="4">機槍</option>
                    <option class='lazy gun-option   hidden' value="5">火箭炮</option>
                    <option class='lazy gun-option   hidden' value="6">格林機槍</option>
                    <option class='lazy pilot-option hidden' value="1">Long-Shooter</option>
                    <option class='lazy pilot-option hidden' value="2">Out-Fighter</option>
                    <option class='lazy pilot-option hidden' value="3">Middle-Shooter</option>
                    <option class='lazy pilot-option hidden' value="4">Defender</option>
                    <option class='lazy pilot-option hidden' value="5">In-Fighter</option>
                    <option class='lazy pilot-option hidden' value="6">Supporter</option>
                    <option class='lazy pilot-option hidden' value="7">All-Rounder</option>
                </select>
            </div>

            <div>
                <div>詞彙</div>
                <select id = 'wordFilter1' onchange='updateWordFilter()'>
                    <option selected value=''>-選擇-</option>
                    <option value="主角機">主角機</option>
                    <option value="量產機">量產機</option>
                    <option value="王牌專用機">王牌專用機</option>
                    <option value="水陸兩用">水陸兩用</option>
                    <option value="指揮官機">指揮官機</option>
                    <option value="近身戰">近身戰</option>
                    <option value="中距離戰">中距離戰</option>
                    <option value="遠距離戰">遠距離戰</option>
                    <option value="高機動">高機動</option>
                    <option value="高火力">高火力</option>
                    <option value="重裝甲">重裝甲</option>
                    <option value="可變">可變</option>
                    <option value="鋼彈系">鋼彈系</option>
                    <option value="MF">MF</option>
                    <option value="支援機">支援機</option>
                    <option value="聯邦">聯邦</option>
                    <option value="吉翁">吉翁</option>
                    <option value="薩克系">薩克系</option>
                    <option value="吉姆系">吉姆系</option>
                    <option value="宇宙適性">宇宙適性</option>
                    <option value="沙漠適性">沙漠適性</option>
                    <option value="寒帶適性">寒帶適性</option>
                    <option value="森林適性">森林適性</option>
                    <option value="市區適性">市區適性</option>
                    <option value="基地適性">基地適性</option>
                    <option value="電腦適性">電腦適性</option>
                </select>
            </div>
            <div>
                <div>AND（</div>
            </div>
            <div>
                <div>詞彙</div>
                <select id = 'wordFilter2' onchange='updateWordFilter()'>
                    <option selected value='' >-選擇-</option>
                    <option value="主角機">主角機</option>
                    <option value="量產機">量產機</option>
                    <option value="王牌專用機">王牌專用機</option>
                    <option value="水陸兩用">水陸兩用</option>
                    <option value="指揮官機">指揮官機</option>
                    <option value="近身戰">近身戰</option>
                    <option value="中距離戰">中距離戰</option>
                    <option value="遠距離戰">遠距離戰</option>
                    <option value="高機動">高機動</option>
                    <option value="高火力">高火力</option>
                    <option value="重裝甲">重裝甲</option>
                    <option value="可變">可變</option>
                    <option value="鋼彈系">鋼彈系</option>
                    <option value="MF">MF</option>
                    <option value="支援機">支援機</option>
                    <option value="聯邦">聯邦</option>
                    <option value="吉翁">吉翁</option>
                    <option value="薩克系">薩克系</option>
                    <option value="吉姆系">吉姆系</option>
                    <option value="宇宙適性">宇宙適性</option>
                    <option value="沙漠適性">沙漠適性</option>
                    <option value="寒帶適性">寒帶適性</option>
                    <option value="森林適性">森林適性</option>
                    <option value="市區適性">市區適性</option>
                    <option value="基地適性">基地適性</option>
                    <option value="電腦適性">電腦適性</option>
                </select>
            </div>
            <div>
                <div>OR</div>
            </div>
            <div>
                <div>詞彙</div>
                <select id = 'wordFilter3' onchange='updateWordFilter()'>
                    <option  selected value='' >-選擇-</option>
                    <option value="主角機">主角機</option>
                    <option value="量產機">量產機</option>
                    <option value="王牌專用機">王牌專用機</option>
                    <option value="水陸兩用">水陸兩用</option>
                    <option value="指揮官機">指揮官機</option>
                    <option value="近身戰">近身戰</option>
                    <option value="中距離戰">中距離戰</option>
                    <option value="遠距離戰">遠距離戰</option>
                    <option value="高機動">高機動</option>
                    <option value="高火力">高火力</option>
                    <option value="重裝甲">重裝甲</option>
                    <option value="可變">可變</option>
                    <option value="鋼彈系">鋼彈系</option>
                    <option value="MF">MF</option>
                    <option value="支援機">支援機</option>
                    <option value="聯邦">聯邦</option>
                    <option value="吉翁">吉翁</option>
                    <option value="薩克系">薩克系</option>
                    <option value="吉姆系">吉姆系</option>
                    <option value="宇宙適性">宇宙適性</option>
                    <option value="沙漠適性">沙漠適性</option>
                    <option value="寒帶適性">寒帶適性</option>
                    <option value="森林適性">森林適性</option>
                    <option value="市區適性">市區適性</option>
                    <option value="基地適性">基地適性</option>
                    <option value="電腦適性">電腦適性</option>
                </select>
            </div>
            <div>
                <div>）</div>
            </div>
            <div>
                <div>屬性</div>
                <select id = 'attribute' onchange='updateFilter(this)'>
                    <option selected value='' >-選擇-</option>
                    <option value="T">T</option>
                    <option value="P">P</option>
                    <option value="S">S</option>
                </select>
            </div>
            <div style='width: 100px'>
                <div>Exskill</div>
                <select id = 'skillType' onchange='updateFilter(this)'>
                    <option selected value='' >-選擇-</option>
                    <option value="1">物理射擊</option>
                    <option value="2">鐳射射擊</option>
                    <option value="3">物理格鬥</option>
                    <option value="4">鐳射格鬥</option>
                    <option value="5">能力提升</option>
                    <option value="6">覺醒</option>
                    <option value="7">能力下降</option>
                    <option value="8">回復</option>
                </select>
            </div>

            <div>
                <div>改造</div>
                <select id = 'altered' onchange='updateFilter(this)'>
                    <option selected value=''>-選擇-</option>
                    <option value="0">未改造</option>
                    <option value="1">已改造</option>
                    <option value="2">BIG改造</option>
                </select>
            </div>

            <div>
                <div>稀有度</div>
                <select id = 'rarity' onchange='updateFilter(this)'>
                    <option  selected value='' >-選擇-</option>
                    <option class="r6" value="6">★★★★★★</option>
                    <option class="r5" value="5">★★★★★</option>
                    <option class="r4" value="4">★★★★</option>
                    <option class="r3" value="3">★★★</option>
                    <option class="r2" value="2">★★</option>
                    <option class="r1" value="1">★</option>
                </select>
            </div>
            <div>
                <div>排序（高至低）</div>
                <select id = "orderBy" onchange="redrawTable()">
                    <option value="arm">耐久</option>    
                    <option value="mel">格鬥攻擊</option>    
                    <option value="sht">射擊攻擊</option>    
                    <option value="mdf">格鬥防禦</option>    
                    <option value="sdf">射擊防禦</option>    
                    <option value="bmr">鐳射耐性</option>  
                    <option value="phr">物理耐性</option>  
                </select>
            </div>
        </div>

        <div>
            <div id="gunpla">
                <div class="header row">
                    <div class=''>部件</div>

                    <div class='wordContainer'>詞彙</div>

                    <div class='descriptionHeader'>ExSkill/特性</div>

                    <div class='arm'>耐久</div>
                    <div class='mel'>格鬥攻擊</div>
                    <div class='sht'>射擊攻擊</div>
                    <div class='mdf'>格鬥防禦</div>
                    <div class='sdf'>射擊防禦</div>
                    <div class='bmr'>鐳射耐性</div>
                    <div class='phr'>物理耐性</div>

                    <div class='nameContainer'>零件</div>
                </div>

                <?php 

				$counter = 1;

				$arr=[
					'head' => '26-slot-head.svg',
					'body' => '27-slot-body.svg',
					'arms' => '28-slot-arms.svg',
					'legs' => '29-slot-legs.svg',
					'back' => '30-slot-back.svg',
					"sword" => '34-short-range-saber.svg',
					"gun" => '41-long-range-rifle.svg',
					'shield' => '31-slot-shield.svg',
					'pilot' => '32-slot-pilot.svg'
				];

				foreach($arr as $key => $value){
					echo "
					<div id='".($counter)."' slot='".($key)."' class = 'container'>
						<div id='".($key)."' slot='".($key)."' slotType='total' class='total row'>
							<div><img class='icon' src='assets/vectors/".($value)."' alt='".($key)."'></div>

							<div class='wordContainer'>
								<div class='word1'></div>
								<div class='word2'></div>
							</div>

							<div class='scroll'>
								<div class='description'></div>
							</div>

							<div class='arm'></div>
							<div class='mel'></div>
							<div class='sht'></div>
							<div class='mdf'></div>
							<div class='sdf'></div>
							<div class='bmr'></div>
							<div class='phr'></div>

							<div class='nameContainer'>
								<img class='attribute'/>
								<button class='edit' onclick='toggleSub(this)'>Edit</button>
							</div>
						</div>
						
						<div slot='".($key)."' slotType='mainPart' class='main part row'>
							<div><img class='icon' src='assets/vectors/".($value)."' alt='".($key)."'></div>

							<div class='wordContainer'>
								<div>
									<input class='word1box' type='checkbox' id='".($counter*4)."' name='".($key)."Words'  slot = '".($key)."' value = '0' checked='true' onchange='setWords(this)'>
									<label class='word1' for='w".($counter*4)."'></label>
								</div>
								<div>
									<input class='word2box' type='checkbox' id='w".($counter*4+1)."' name='".($key)."Words'  slot = '".($key)."' value = '1' checked='true' onchange='setWords(this)'>
									<label class='word2' for='w".($counter*4+1)."'></label>
								</div>
							</div>

							<div class='scroll'>
								<input class='descriptionbox' type='radio' id='d".($counter*2)."' name='".($key)."Description' slot = '".($key)."'  value ='mainPart' checked='true'  onclick='setDescription(this)'>
								<label class='description' for='d".($counter*2)."'></label>
							</div>

							<div class='arm'></div>
							<div class='mel'></div>
							<div class='sht'></div>
							<div class='mdf'></div>
							<div class='sdf'></div>
							<div class='bmr'></div>
							<div class='phr'></div>

							<div class='nameContainer'>
								<img class='attribute'/>
								<input class='name' type='text' readonly onclick='PartSelection(this.parentElement.parentElement)'>
							</div>
						</div>

						<div slot='".($key)."' slotType='subPart' class='sub part row'>
							<div><img class='icon' src='assets/vectors/".($value)."' alt='".($key)."'></div>

							<div class='wordContainer'>
								<div>
									<input class='word1box' type='checkbox' id='w".($counter*4+2)."' name='".($key)."Words' slot = '".($key)."' value = '2' onchange='setWords(this)'>
									<label class='word1' for='w".($counter*4+2)."'></label>
								</div>
								<div>
									<input class='word2box' type='checkbox' id='w".($counter*4+3)."' name='".($key)."Words' slot = '".($key)."' value = '3' onchange='setWords(this)'>
									<label class='word2' for='w".($counter*4+3)."'></label>
								</div>
							</div>

							<div class='scroll'>
								<input class='descriptionbox' type='radio' id='d".($counter*2+1)."' name='".($key)."Description' slot = '".($key)."' value ='subPart' onchange='setDescription(this)'>
								<label class='description' for='d".($counter*2+1)."'></label>
							</div>

							<div class='arm'></div>
							<div class='mel'></div>
							<div class='sht'></div>
							<div class='mdf'></div>
							<div class='sdf'></div>
							<div class='bmr'></div>
							<div class='phr'></div>

							<div class='nameContainer'>
								<img class='attribute'/>
								<input class='name' type='text' readonly onclick='PartSelection(this.parentElement.parentElement)'>
							</div>
						</div>
					</div>
					";
					$counter += 1;
				};
				?>

                <div id='total' slot='total' class="header row">
                    <div>Total CWPR</div>

                    <div class='wordContainer'>
                        <div class='activeword1'></div>
                        <div class='activeword2'></div>
                        <div class='activeword3'></div>
                    </div>

                    <div class="descriptionHeader">
                        <div style="text-align: center;"><img class="job" src="assets/vectors/19-job-all-rounder.svg" alt=""></div>
                    </div>

                    <div class='arm'></div>
                    <div class='mel'></div>
                    <div class='sht'></div>
                    <div class='mdf'></div>
                    <div class='sdf'></div>
                    <div class='bmr'></div>
                    <div class='phr'></div>

                    <div class='nameContainer'>
                        <div class='attribute' style="display:block;">
                            <img class ="countimg" src="assets/vectors/02-attribute-technique.svg" alt="T"><span class="T"></span>
                            <img class ="countimg" src="assets/vectors/01-attribute-power.svg" alt="P"><span class="P"></span>
                            <img class ="countimg" src="assets/vectors/03-attribute-speed.svg" alt="S"><span class="S"></span>
                        </div>
                        <div class='totalStat'></div>
                    </div>
                </div>

                <div id='bodyGear' class="total row">
                    <div><img src="assets/vectors/47-gear-body.svg" alt="gear body"></div>

                    <div class='wordContainer'></div>

                    <div class='scroll'></div>
                    
                    <div class='arm'></div>
                    <div class='mel'></div>
                    <div class='sht'></div>
                    <div class='mdf'></div>
                    <div class='sdf'></div>
                    <div class='bmr'></div>
                    <div class='phr'></div>

                    <div class='nameContainer'>
                        <select id='gear-body-select' slot='bodyGear' onchange="setGear(this)">
                            <option selected value=''>-選擇-</option>
                            <option value="arm#2000">耐久+2000</option>
                            <option value="mel#2000">格鬥攻擊+2000</option>
                            <option value="sht#2000">射擊攻擊+2000</option>
                            <option value="mdf#2000">格鬥防禦+2000</option>
                            <option value="sdf#2000">射擊防禦+2000</option>
                            <option value="bmr#2000">鐳射耐性+2000</option>
                            <option value="phr#2000">物理耐性+2000</option>
                            <option value="mel#1500 sht#1500">雙攻擊+1500</option>
                        </select>
                    </div>
                </div>

                <div id='larmGear' class="total row">
                    <div><img src="assets/vectors/49-gear-arm-left.svg" alt="left arm"></div>

                    <div class='wordContainer'></div>

                    <div class='scroll'></div>
                    
                    <div class='arm'></div>
                    <div class='mel'></div>
                    <div class='sht'></div>
                    <div class='mdf'></div>
                    <div class='sdf'></div>
                    <div class='bmr'></div>
                    <div class='phr'></div>

                    <div class='nameContainer'>
                        <select id='gear-larm-select' slot='larmGear' onchange="setGear(this)">
                            <option selected value=''>-選擇-</option>    
                            <option value="mdf#30 mel#-1">格鬥轉換</option>
                            <option value="sdf#30 sht#-1">射擊轉換</option>
                            <option value="bmr#25 phr#25 mel#-1 sht#-1">耐性轉換</option>
                        </select>
                    </div>
                </div>

                <div id='rarmGear' class="total row">
                    <div><img src="assets/vectors/48-gear-arm-right.svg" alt="right arm"></div>

                    <div class='wordContainer'></div>

                    <div class='scroll'></div>
                    
                    <div class='arm'></div>
                    <div class='mel'></div>
                    <div class='sht'></div>
                    <div class='mdf'></div>
                    <div class='sdf'></div>
                    <div class='bmr'></div>
                    <div class='phr'></div>

                    <div class='nameContainer'>
                        <select id='gear-rarm-select' slot='rarmGear' onchange="setGear(this)">
                            <option selected value=''>-選擇-</option>
                            <option value="mel#1500">Defender</option>
                            <option value="mel#1500">In-Fighter</option>
                            <option value="mel#1500">Mid-Fighter</option>
                            <option value="sht#1500">Mid-Shooter</option>
                            <option value="sht#1500">Long-Shooter</option>
                            <option value="sht#1500">Supporter</option>
                        </select>
                    </div>
                </div>

                <div id="rlegGear" class="total row">
                    <div><img src="assets/vectors/50-gear-leg-right.svg" alt="right leg"></div>

                    <div class='wordContainer'></div>

                    <div class='scroll'></div>
                    
                    <div class='arm'></div>
                    <div class='mel'></div>
                    <div class='sht'></div>
                    <div class='mdf'></div>
                    <div class='sdf'></div>
                    <div class='bmr'></div>
                    <div class='phr'></div>

                    <div class='nameContainer'>
                        <select id='gear-rleg-select' slot='rlegGear' onchange="setGear(this)">
                            <option selected value=''>-選擇-</option>
                            <option value="_#主角機$100 phr#2000 bmr#2000">主角機</option>
                            <option value="_#量產機$150 mdf#2000 sdf#2000">量產機</option>
                            <option value="_#王牌專用機$100 phr#2000 bmr#2000">王牌專用機</option>
                            <option value="_#水陸兩用$200 mel#2000 sht#2000">水陸兩用</option>
                            <option value="_#指揮官機$150 mdf#2000 sdf#2000">指揮官機</option>
                            <option value="_#近身戰$100 phr#2000 bmr#2000">近身戰</option>
                            <option value="_#中距離戰$200 mel#2000 sht#2000">中距離戰</option>
                            <option value="_#遠距離戰$200 mel#2000 sht#2000">遠距離戰</option>
                            <option value="_#高機動$150 mdf#2000 sdf#2000">高機動</option>
                            <option value="_#高火力$100 phr#2000 bmr#2000">高火力</option>
                            <option value="_#重裝甲$200 mel#2000 sht#2000">重裝甲</option>
                            <option value="_#可變$200 mel#2000 sht#2000">可變</option>
                            <option value="_#高達系$150 mdf#2000 sdf#2000">鋼彈系</option>
                            <option value="_#MF$150 mdf#2000 sdf#2000">MF</option>
                            <option value="_#支援機$200 mel#2000 sht#2000">支援機</option>
                            <option value="_#聯邦$150 mdf#2000 sdf#2000">聯邦</option>
                            <option value="_#自護$200 mel#2000 sht#2000">吉翁</option>
                            <option value="_#渣古系$200 mel#2000 sht#2000">薩克系</option>
                            <option value="_#吉姆系$200 mel#2000 sht#2000">吉姆系</option>
                            <option value="_#宇宙適性$200 mdf#2000 sdf#2000">宇宙適性</option>
                            <option value="_#沙漠適性$200 mel#2000 sht#2000">沙漠適性</option>
                            <option value="_#寒帶適性$200 mel#2000 sht#2000">寒帶適性</option>
                            <option value="_#森林適性$200 mel#2000 sht#2000">森林適性</option>
                            <option value="_#市區適性$200 mel#2000 sht#2000">市區適性</option>
                            <option value="_#基地適性$200 mel#2000 sht#2000">基地適性</option>
                            <option value="_#電腦適性$200 mdf#2000 sdf#2000">電腦適性</option>
                        </select>
                    </div>
                </div>
                <!-- <button onclick="generatecode()">Copy Code</button> -->
            </div>


            <div id="gunplaParts">
                <input id="search" type="text" onkeyup="searchFunction()" placeholder="Search for parts.." title="Type in a name">
                <div id="tableContainer">
                    <table id="collection" cellspacing="0" cellpadding="0">
                    </table>
                </div>
                <br>
                <button onclick="selectPart()">刪除部件</button>
                <br>
                <br>
                <select id='save' onchange='displaySaveTime()'>
                            <option selected value=''>-選擇-</option>
                            <option value="gundam1">機體-1</option>
                            <option value="gundam2">機體-2</option>
                            <option value="gundam3">機體-3</option>
                </select>
                <button onclick="saveCookie()">儲存</button>
                <button onclick="loadCookie()">讀取</button>
                <button onclick="copyCode()">複製代碼</button>
                <br>
                <div id='lastSaveTime'></div>
                <br>
                <input id='saveLoadText' type="text" value="">
                <button onclick="loadText()">讀取代碼</button>
            </div>
        </div>
        <div id="placeholder"></div>
    </body>
</html>