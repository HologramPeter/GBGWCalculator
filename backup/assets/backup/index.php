<html>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
        
    <title>GBGW Calculator</title>
        
    <body>
        <div id='titlebar'>
            <span id='title'>GBGW Calculator</span>
            <span id='author'>By Hologram</span>
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

                    <div class=''>耐久</div>
                    <div class=''>格鬥攻擊</div>
                    <div class=''>射擊攻擊</div>
                    <div class=''>格鬥防禦</div>
                    <div class=''>射擊防禦</div>
                    <div class=''>鐳射耐性</div>
                    <div class=''>物理耐性</div>

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
					<div id='".($counter)."' class = 'container'>
						<div id='".($key)."' class='total row'>
							<div><img class='_icon' src='assets/vectors/".($value)."' alt='".($key)."'></div>

							<div class='wordContainer'>
								<div class='_word1'></div>
								<div class='_word2'></div>
							</div>

							<div class='scroll'>
								<div class='_description'></div>
							</div>

							<div class='_arm'></div>
							<div class='_mel'></div>
							<div class='_sht'></div>
							<div class='_mdf'></div>
							<div class='_sdf'></div>
							<div class='_bmr'></div>
							<div class='_phr'></div>

							<div class='nameContainer'>
								<img class='_attribute'/>
								<button class='edit' onclick='toggleSub(this)'>Edit</button>
							</div>
						</div>
						
						<div id='main-".($key)."' class='main part row'>
							<div><img class='icon' src='assets/vectors/".($value)."' alt='".($key)."'></div>

							<div class='wordContainer'>
								<div>
									<input class='word1' type='checkbox' id='".($counter*4)."' name='word' checked='true'>
									<label class='word1lbl' for='w".($counter*4)."'></label>
								</div>
								<div>
									<input class='word2' type='checkbox' id='w".($counter*4+1)."' name='word' checked='true' value=''>
									<label class='word2lbl' for='w".($counter*4+1)."'></label>
								</div>
							</div>

							<div class='scroll'>
								<input class='description' type='checkbox' id='d".($counter*2)."' name='description' checked='true' value=''>
								<label class='descriptionlbl' for='d".($counter*2)."'></label>
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
								<input class='name' type='text' readonly onclick='PartSelection(this)'>
							</div>
						</div>

						<div id='sub-".($key)."' class='sub part row'>
							<div><img class='icon' src='assets/vectors/".($value)."' alt='".($key)."'></div>

							<div class='wordContainer'>
								<div>
									<input class='word1' type='checkbox' id='w".($counter*4+2)."' name='word'>
									<label class='word1lbl' for='w".($counter*4+2)."'></label>
								</div>
								<div>
									<input class='word2' type='checkbox' id='w".($counter*4+3)."' name='word'>
									<label class='word2lbl' for='w".($counter*4+3)."'></label>
								</div>
							</div>

							<div class='scroll'>
								<input class='description' type='checkbox' id='d".($counter*2+1)."' name='description'>
								<label class='descriptionlbl' for='d".($counter*2+1)."'></label>
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
								<input class='name' type='text' readonly onclick='PartSelection(this)'>
							</div>
						</div>
					</div>
					";
					$counter += 1;
				};
				?>

                <div id="total" class="header row">
                    <div>Total GWPR</div>

                    <div class='wordContainer'>
                        <div id='activeword1'></div>
                        <div id='activeword2'></div>
                        <div id='activeword3'></div>
                    </div>

                    <div class="descriptionHeader">
                        <div style="text-align: center;"><img id="job" src="assets/vectors/19-job-all-rounder.svg" alt=""></div>
                    </div>
                    
                    <input id='subarm' value='' style='display:none;'>
                    <input id='submel' value='' style='display:none;'>
                    <input id='subsht' value='' style='display:none;'>
                    <input id='submdf' value='' style='display:none;'>
                    <input id='subsdf' value='' style='display:none;'>
                    <input id='subbmr' value='' style='display:none;'>
                    <input id='subphr' value='' style='display:none;'>

                    <div id='totalarm'></div>
                    <div id='totalmel'></div>
                    <div id='totalsht'></div>
                    <div id='totalmdf'></div>
                    <div id='totalsdf'></div>
                    <div id='totalbmr'></div>
                    <div id='totalphr'></div>

                    <div class='nameContainer'>
                        <div class='attribute' style="display:block;">
                            <img class ="countimg" src="assets/vectors/02-attribute-technique.svg" alt="T"><span id="T"></span>
                            <img class ="countimg" src="assets/vectors/01-attribute-power.svg" alt="P"><span id="P"></span>
                            <img class ="countimg" src="assets/vectors/03-attribute-speed.svg" alt="S"><span id="S"></span>
                        </div>
                        <div id='totalsum'></div>
                    </div>
                </div>

                <div id="gear-body" class="total row">
                    <div><img src="assets/vectors/47-gear-body.svg" alt="gear body"></div>

                    <div class='wordContainer'></div>

                    <div class='scroll'></div>
                    
                    <div class='arm_'></div>
                    <div class='mel_'></div>
                    <div class='sht_'></div>
                    <div class='mdf_'></div>
                    <div class='sdf_'></div>
                    <div class='bmr_'></div>
                    <div class='phr_'></div>

                    <div class='nameContainer'>
                        <select id='gear-body-select' onchange="update_gear_body(); post_update_gunpla();">
                            <option selected value=''>-選擇-</option>
                            <option value="arm#1500">耐久+1500</option>
                            <option value="mel#1500">格鬥攻擊+1500</option>
                            <option value="sht#1500">射擊攻擊+1500</option>
                            <option value="mdf#1500">格鬥防禦+1500</option>
                            <option value="sdf#1500">射擊防禦+1500</option>
                            <option value="bmr#1500">鐳射耐性+1500</option>
                            <option value="phr#1500">物理耐性+1500</option>
                            <option value="mel#1000 sht#1000">雙攻擊+1000</option>
                        </select>
                    </div>
                </div>

                <div id="gear-larm" class="total row">
                    <div><img src="assets/vectors/49-gear-arm-left.svg" alt="left arm"></div>

                    <div class='wordContainer'></div>

                    <div class='scroll'></div>
                    
                    <div class='arm_'></div>
                    <div class='mel_'></div>
                    <div class='sht_'></div>
                    <div class='mdf_'></div>
                    <div class='sdf_'></div>
                    <div class='bmr_'></div>
                    <div class='phr_'></div>

                    <div class='nameContainer'>
                        <select id='gear-larm-select' onchange="update_gear_larm(); post_update_gunpla();">
                            <option selected value=''>-選擇-</option>    
                            <option value="mdf#0.3 mel#-1">格鬥轉換</option>
                            <option value="sdf#0.3 sht#-1">射擊轉換</option>
                            <option value="bmr#0.25 phr#0.25 mel#-1 sht#-1">耐性轉換</option>
                        </select>
                    </div>
                </div>

                <div id="gear-rarm" class="total row">
                    <div><img src="assets/vectors/48-gear-arm-right.svg" alt="right arm"></div>

                    <div class='wordContainer'></div>

                    <div class='scroll'></div>
                    
                    <div class='arm_'></div>
                    <div class='mel_'></div>
                    <div class='sht_'></div>
                    <div class='mdf_'></div>
                    <div class='sdf_'></div>
                    <div class='bmr_'></div>
                    <div class='phr_'></div>

                    <div class='nameContainer'>
                        <select id='gear-rarm-select' onchange="update_gear_rarm(); post_update_gunpla();">
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

                <!-- <button onclick="generatecode()">Copy Code</button> -->
            </div>


            <div id="gunplaParts">
                <input id="search" type="text" onkeyup="searchFunction()" placeholder="Search for parts.." title="Type in a name">
                <div id="tableContainer">
                    <table id="collection" cellspacing="0" cellpadding="0">
                    </table>
                </div>
                <button onclick="removePart()">Remove</button>
            </div>
        </div>
    </body>
</html>