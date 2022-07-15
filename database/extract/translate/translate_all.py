from bs4 import BeautifulSoup, SoupStrainer
import re, datetime, os
import urllib.request
import urllib.parse
########### Settings ############

TRANSLATE_FILE_PATH = "translate/ALL.txt"

PATHS = ["translate/html","translate/html2"]

########### utilities ############

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
    for i in PATHS:
        for file_name in os.listdir(i):
            if file_name.endswith("html"):
                print(file_name)
                page = open(i+"/"+file_name, "r", encoding="utf8")
                soup = BeautifulSoup(page.read(), 'html.parser')

                rows = soup.find(id="chart1").find_all('tr')
                for row in rows[1:]:
                    parseParts(row.find_all('td'))
                    

def parseParts(cells):
    link = cells[2].find('a').get('href').replace("https://wiki.dengekionline.com","")
    link = "'"+urllib.parse.quote(link)+"'"
    name = "'"+cells[3].contents[2].text+"'"

    query_name(link, name)

    cell = cells[13].contents
    if len(cell) > 1:
        parseSkill(link, cell)
    else:
        cell = cells[14].text
        parseTrait(link, cell)


def parseTrait(link,cell):
    traits = cell.replace('\n2','\t2').replace('\n','').split('\t')
    query_trait(link, traits)

def parseSkill(link, cell):
    name = "'[" +cell[1].text + "]'"
    description =  "'"+cell[6].strip()+"'"
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