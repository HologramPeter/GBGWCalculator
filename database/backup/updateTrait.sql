UPDATE PartTraitList
SET type1 = 1
WHERE description1 like '%EXskillの威力%％上昇%';

UPDATE PartTraitList
SET type2 = 1
WHERE description2 like '%強化EXskill効果時間%';

-- EXskillの威力30％上昇
--1	ExSkill威力增加
--2	射擊威力
--3	格鬥威力
--4	强格鬥威力
--5	特殊射擊威力
--6	射擊會心率
--7	格鬥會心率
--8	退縮
--9	射擊威力減少
--10	格鬥威力減少
--11	ExSkill威力減少
--12	ExSkill冷卻減少
--13	ExSkill初始充能
--14	效果上升
--15	效果時間上升
--16	其他