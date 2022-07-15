from bs4 import BeautifulSoup, SoupStrainer
import re, datetime
import urllib.parse
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

########### Settings ############
today = datetime.date.today().strftime("%d-%m-%Y_")
TRANSLATE_FILE_PATH = "../UPDATE/"+today+"Translate.txt"

BUFFER_PATH = "buffer.txt"

URL = "https://gbgwcalculator.000webhostapp.com/PartsTable/?lang=hk"

########### utilities ############

def getTableHTML():
    option = webdriver.ChromeOptions()
    option.add_argument('--disable-blink-features=AutomationControlled')
    option.add_experimental_option("excludeSwitches", ['enable-automation'])
    browser = webdriver.Chrome(ChromeDriverManager().install(), options=option)
    browser.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    browser.get(URL)
    sleep(3)
    html = browser.page_source

    browser.quit()

    #buffer = open(BUFFER_PATH,'w',encoding="utf8")
    #buffer.write(html)

    # buffer = open(BUFFER_PATH,'r',encoding="utf8")
    # html = buffer.read()

    # buffer.close()

    return html

def query_skill(link, name, description):
    q = "UPDATE PartList, PartSkillList SET PartSkillList.name = " + name + ", PartSkillList.description = " + description\
    + " WHERE PartSkillList.id = PartList.id AND PartList.link = " + link + ";"
    write(q)

def query_trait(link, traits):
    if len(traits) == 1:
        q = "UPDATE PartList, PartTraitList SET PartTraitList.description1 = " + "'"+traits[0]+"'"\
        + " WHERE PartTraitList.id = PartList.id AND PartList.link = " + link + ";"
    else:
        q = "UPDATE PartList, PartTraitList SET PartTraitList.description1 = " + "'"+traits[0]+"'"\
        + ", PartTraitList.description2 = " + "'"+traits[1]+"'"\
        + " WHERE PartTraitList.id = PartList.id AND PartList.link = " + link + ";"
    write(q)

def query_name(link, name):
    q = "UPDATE PartList SET PartList.translated = 1, PartList.name = " + name\
    + " WHERE PartList.link = " + link + ";"
    write(q)

def write(text):
    global txt
    txt.write(text+'\n')
               
########### functions ############

def main():
    soup = BeautifulSoup(getTableHTML(), 'html.parser')
    rows = soup.find(id="chart1").find_all('tr')
    for row in rows[1:]:
        parseParts(row.find_all('td'))
        
        
                

def parseParts(cells):
    for i in range(0,5):
        try:
            text = cells[3].contents[i].text.lower()
        except:
            text = ""
            
        if text.find("new!!") != -1:
        # if True:
            try:
                StartParse(cells)
            except:
                pass
            return

def StartParse(cells):
    link = cells[2].find('a').get('href').replace("https://wiki.dengekionline.com","")
    link = "'"+urllib.parse.quote(link)+"'"

    try:
        name = "'"+cells[3].contents[0].text.split(u'\u3000')[1].replace(' New!!','')+"'"
    except:
        name = "'"+cells[3].contents[1].text+"'"
    
    print("new item "+name)

    query_name(link, name)
    
    cell = cells[13].contents
    if len(cell) > 1:
        parseSkill(link, cell)
    else:
        parseTrait(link, cells[13].text, cells[14].text)


def parseTrait(link,cell1, cell2):
    traits = [cell1.replace('\n2','\t2').replace('\n',''), cell2.replace('\n2','\t2').replace('\n','')]
    query_trait(link, traits)

def parseSkill(link, cell):
    name = "'[" +cell[1].text + "]'"
    description =  "'"+cell[5].strip()+"'"
    query_skill(link, name, description)

txt = open(TRANSLATE_FILE_PATH, 'w' , encoding='utf8')
main()
txt.close()

"""
td:
0.b = type
0.font[0] = wtype
0.font[1] = subtype
if + ignore / add to name

1.font = model_name
2 = link
len(3.firstline) = rarity
3.b = name
3.font = jname
4 xxx
5-11 = stat
12 words
13.font[0] extype
13.font[1] exname 
13.font[2] exjname 
13 description 


"""