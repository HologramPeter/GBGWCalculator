import urllib.request
from bs4 import BeautifulSoup, SoupStrainer
import pandas as pd
import re
import datetime


########### Settings ############
today = datetime.date.today().strftime("%d-%m-%Y_")
TXT_FILE_PATH = "../UPDATE/"+today+"Extract.txt"

COUNTER_FILE_PATH = "counter.txt"
UPDATE_LOG_PATH = "update_log.txt"
CSV_PATH = "links.csv"
DEFAULT_JOB = 7

########### Constants ############

attr_dict={
    "Technique":1,
    "Power":2,
    "Speed":3
}

word_dict={
    "主人公機":1,
    "量産機":2,
    "エース専用機":3,
    "水陸両用":4,
    "指揮官機":5,
    "接近戦":6,
    "中距離戦":7,
    "遠距離戦":8,
    "高機動":9,
    "高火力":10,
    "重装甲":11,
    "可変":12,
    "ガンダムタイプ":13,
    "モビルファイター":14,
    "支援機":15,
    "連邦":16,
    "ジオン":17,
    "ザクタイプ":18,
    "ジムタイプ":19,
    "宇宙適正":20,
    "砂漠適正":21,
    "寒冷地適正":22,
    "森林適正":23,
    "市街地適正":24,
    "基地適正":25,
    "電脳適正":26
}

skill_dict={
    '物理射撃':1,
    'ビーム射撃':2,
    '物理格闘':3,
    'ビーム格闘':4,
    '強化':5,
    '覚醒':6,
    '弱体化':7,
    '回復':8,
}

weapon_dict={
    "物理": 1,
    "ビーム": 2
}

job_dict={
    'Long-Shooter':1,
    'Out-Fighter':2,
    'Middle-Shooter':3,
    'Defender':4,
    'In-Fighter':5,
    'Supporter':6
}

PREFIX = "https://wiki.dengekionline.com"

########### Utilities ############

def query(table,val):
    q = "INSERT INTO " + table + " (" + ','.join(str(x) for x in val.keys()) + ") VALUES (" +','.join(str(y) for y in val.values())+");" 
    write(q)
    write("\n")

def write(text):
    txt_file.write(text)
    #print(text)

def HeadertoContent(soup,header):
    return soup.find("th",text=header).find_parent("tr").find("td").text

def processTrait(skill,max_num):
    mo = re.search(r'(\d+)\D+$', skill)
    if mo != None:
        start = mo.start(1)
        end = start + len(mo.group(1))

        description = skill[:start] + max_num + skill[end:]

    return description

########### Functions ############

def main():
    df = pd.read_csv(CSV_PATH)
    
    for item in df.iloc:
        print(item["part"])
        extract_PartType(item)


def extract_PartType(item):
    global counter, log, update_log_file

    page = urllib.request.urlopen(PREFIX+item["link"])
    soup = BeautifulSoup(page.read(), 'html.parser')

    partList = []
    pointers = soup.find_all('h4')
    for pointer in pointers:
        if pointer.text.find("NEW") == -1:
            break
        partList += pointer.find_next_sibling('div').find("table").find_all('a')

    for part in partList:
        try:
            link = part.get("href")
            if log.find(link)==-1:
                extract_part(link, item, counter)
                update_log_file.write(link+'\n')
                write("\n\n")
                counter += 1
            else:
                print('item exist')
        except:
            raise Exception(counter, part.get("href"))

def extract_part(link, item, _id):

    page = urllib.request.urlopen(PREFIX+link)
    soup = BeautifulSoup(page.read(), 'html.parser')

    parsePartList(soup, item, link, _id)
    parsePartStatList(soup, item, _id)
    parsePartSkillList(soup, item, _id)
    parsePartTraitList(soup, item, _id)

    if item["sword"] != 0:
        val = {
            "id": _id,
            "type": item["sword"]
        }
        query("PartSwordList",val)

    if item["gun"] != 0:
        val = {
            "id": _id,
            "type": item["gun"]
        }
        query("PartGunList",val)

    if item["part"] in [6,7]:
        weapon_type = weapon_dict[HeadertoContent(soup,"タイプ")]
        val = {
            "id": _id,
            "type": weapon_type
        }
        query("PartDamageList",val)
    
    if item["part"] == 9:
        pilot_job = job_dict.get(HeadertoContent(soup,"ジョブライセンス"))
        if pilot_job == None:
            pilot_job = DEFAULT_JOB
        description = "'"+HeadertoContent(soup,"AI特性")+"'"
        val = {
            "id": _id,
            "type": pilot_job,
            "description": description
        }
        query("PartJobList",val)

#######################

def parsePartList(soup, item, link, _id):
    altered = item["altered"]
    partType = item["part"]
    link = "'"+link+"'"
    name = "'"+soup.find(id="page-main-title").text+"'"

    if (name.find('BIG') != -1):
	    altered = 2

    if item["part"]==9:
        model = "''"
    else:
        model = "'"+HeadertoContent(soup,"型番")+"'"

    rarity = len(HeadertoContent(soup,"レアリティ"))

    attribute = attr_dict[HeadertoContent(soup,"属性")]

    try:
        words = soup.find(text="ワードタグ").find_next("table").find_all("th")
    except:
        words = soup.find(text="ワードタグ  ").find_next("table").find_all("th")
    word1 = word_dict[words[0].text]
    word2 = word_dict[words[1].text]

    val = {
            "id": _id,
            "link": link,
            "name": name,
            "model": model,
            "altered": altered,
            "rarity": rarity,
            "attribute": attribute,
            "partType": partType,
            "word1": word1,
            "word2": word2
        }
    query("PartList", val)

def parsePartStatList(soup, item, _id):
    levels = ["99","90","80"]
    
    stats = []
    if item['part'] == 9:
        rows = soup.find(id="content_1001_2").find_next("table").find_all("tr")
        stats.append(rows[-1].find_all("td"))
        stats.append(rows[-2].find_all("td"))
        stats.append(rows[-3].find_all("td"))
    else:
        stats.append(soup.find(text="99＋証").find_parent("tr").find_all("td"))
        stats.append(soup.find(text="90＋証").find_parent("tr").find_all("td"))
        stats.append(soup.find(text="80＋証").find_parent("tr").find_all("td"))

    for i in range(3):
        stat = stats[i]
        level = levels[i]
        arm = stat[1].text
        mel = stat[2].text
        sht = stat[3].text
        mdf = stat[4].text
        sdf = stat[5].text
        bmr = stat[6].text
        phr = stat[7].text

        val = {
                "id": _id,
                "level": level,
                "arm": arm,
                "mel": mel,
                "sht": sht,
                "mdf": mdf,
                "sdf": sdf,
                "bmr": bmr,
                "phr": phr
            }
        query("PartStatList", val)

def parsePartSkillList(soup, item, _id):
    # ExSkill
    pointer = soup.find(id="content_1001_3").find_next_sibling()
    if pointer.text in ["※現在、EXskillありません。", "予期せぬエラー"]:
        return

    name = "'"+pointer.find("th",text="名称").find_parent("tr").find("td").text+"'"
    _type = skill_dict[pointer.find("th",text="カテゴリ").find_parent("tr").find("td").text]
    
    pointer = pointer.find_next_sibling()
    max_row_tds = pointer.find_all("tr")[-1].find_all("td")
    
    description=""

    if _type in [4,5]: #has mag
        description += " 彈數："+max_row_tds[3].text 

    if _type in [1,2,3,4]: # has damage
        description += " 貫通："+max_row_tds[1].text
        description += " 威力："+max_row_tds[2].text
    description += " 冷卻：" + max_row_tds[-1].text # cooldown

    description = "'" + description +"'"

    val = {
            "id": _id,
            "type": _type,
            "name": name,
            "description": description
        }
    query("PartSkillList", val)

def parsePartTraitList(soup, item, _id):
    # Trait
    pointer = soup.find(id="content_1001_4").find_next_sibling()
    if pointer.text in ["※現在、パーツ特性はありません。", "予期せぬエラー"]:
        return
    
    val = {"id": _id}
    if item["altered"] == 0:
        skill = pointer.find("td").text
        pointer = pointer.find_next_sibling()
        max_num = pointer.find_all("td")[-1].text
        val['description1'] = "'"+processTrait(skill,max_num)+"'"
    else:
        pointer = pointer.find_next_sibling()
        skill = pointer.find("td").text
        pointer = pointer.find_next_sibling()
        max_num = pointer.find_all("td")[-1].text
        val['description1'] = "'"+processTrait(skill,max_num)+"'"

        pointer = pointer.find_next_sibling()
        pointer = pointer.find_next_sibling()
        skill = pointer.find("td").text
        pointer = pointer.find_next_sibling()
        max_num = pointer.find_all("td")[-1].text
        val['description2'] = "'"+processTrait(skill,max_num)+"'"

    query("PartTraitList", val)

#######################

update_log_file = open(UPDATE_LOG_PATH, "r", encoding='utf8')
log = update_log_file.read()
update_log_file.close()

counter_file = open(COUNTER_FILE_PATH, "r", encoding='utf8')
counter = int(counter_file.read())
counter_file.close()

update_log_file = open(UPDATE_LOG_PATH, "a", encoding='utf8')
txt_file = open(TXT_FILE_PATH, "a", encoding='utf8')

main()

update_log_file.close()
txt_file.close()


counter_file = open(COUNTER_FILE_PATH, "w", encoding='utf8')
counter_file.write(str(counter))
counter_file.close()
