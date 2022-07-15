# File name: Gunpla.sql
# Creation date: 02/24/2021
# Created by SQLite to MySQL 2.1 [Demo]
# --------------------------------------------------
# More conversion tools at http://www.convert-in.com

SET NAMES utf8;

#
# Table structure for table 'Attribute'
#

DROP TABLE IF EXISTS `Attribute` CASCADE;
CREATE TABLE `Attribute` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `src` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'Attribute'
#

LOCK TABLES `Attribute` WRITE;
INSERT IGNORE INTO `Attribute`(`id`, `name`, `src`) VALUES(1, 'T', 'assets/vectors/02-attribute-technique.svg'), (2, 'P', 'assets/vectors/01-attribute-power.svg'), (3, 'S', 'assets/vectors/03-attribute-speed.svg');
UNLOCK TABLES;

#
# Table structure for table 'DamageType'
#

DROP TABLE IF EXISTS `DamageType` CASCADE;
CREATE TABLE `DamageType` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'DamageType'
#

LOCK TABLES `DamageType` WRITE;
INSERT IGNORE INTO `DamageType`(`id`, `name`) VALUES(1, '物理'), (2, '鐳射');
UNLOCK TABLES;

#
# Table structure for table 'GunType'
#

DROP TABLE IF EXISTS `GunType` CASCADE;
CREATE TABLE `GunType` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `src` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'GunType'
#

LOCK TABLES `GunType` WRITE;
INSERT IGNORE INTO `GunType`(`id`, `name`, `src`) VALUES(1, '槍', 'assets/images/gun/01-rifle.svg'), (2, '長槍', 'assets/images/gun/02-machine-gun.svg'), (3, '雙槍', 'assets/images/gun/03-long-rifle.svg'), (4, '機槍', 'assets/images/gun/04-gatling-gun.svg'), (5, '火箭炮', 'assets/images/gun/05-bazooka.svg'), (6, '格林機槍', 'assets/images/gun/06-twin-rifle.svg');
UNLOCK TABLES;

#
# Table structure for table 'JobType'
#

DROP TABLE IF EXISTS `JobType` CASCADE;
CREATE TABLE `JobType` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `src` LONGTEXT CHARACTER SET utf8,
  `arm` DOUBLE,
  `mel` DOUBLE,
  `sht` DOUBLE,
  `bmr` DOUBLE,
  `phr` DOUBLE,
  `mdf` DOUBLE,
  `sdf` DOUBLE
) ENGINE=InnoDB;

#
# Dumping data for table 'JobType'
#

LOCK TABLES `JobType` WRITE;
INSERT IGNORE INTO `JobType`(`id`, `name`, `src`, `arm`, `mel`, `sht`, `bmr`, `phr`, `mdf`, `sdf`) VALUES(1, 'All-Rounder', 'assets/images/job/01-all-rounder.svg', 0, 0, 0, 0, 0, 0, 0), (2, 'Long-Shooter', 'assets/images/job/02-defender.svg', 0, 0, 1.0000000000000001e-01, 0, 0, 0, 0), (3, 'Out-Fighter', 'assets/images/job/03-in-fighter.svg', 0, 1.0000000000000001e-01, 0, 0, 0, 0, 0), (4, 'Middle-Shooter', 'assets/images/job/04-out-fighter.svg', 0, 0, 1.0000000000000001e-01, 0, 0, 0, 0), (5, 'Defender', 'assets/images/job/05-middle-shooter.svg', 5.0000000000000003e-02, 0, 0, 5.0000000000000003e-02, 5.0000000000000003e-02, 0, 0), (6, 'In-Fighter', 'assets/images/job/06-long-shooter.svg', 0, 1.0000000000000001e-01, 0, 0, 0, 0, 0), (7, 'Supporter', 'assets/images/job/07-supporter.svg', 0, 0, 0, 0, 0, 0, 0);
UNLOCK TABLES;

#
# Table structure for table 'PartDamageList'
#

DROP TABLE IF EXISTS `PartDamageList` CASCADE;
CREATE TABLE `PartDamageList` (
  `id` INT,
  `type` INT
) ENGINE=InnoDB;

#
# Dumping data for table 'PartDamageList'
#

LOCK TABLES `PartDamageList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartGunList'
#

DROP TABLE IF EXISTS `PartGunList` CASCADE;
CREATE TABLE `PartGunList` (
  `id` INT,
  `type` INT
) ENGINE=InnoDB;

#
# Dumping data for table 'PartGunList'
#

LOCK TABLES `PartGunList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartJobList'
#

DROP TABLE IF EXISTS `PartJobList` CASCADE;
CREATE TABLE `PartJobList` (
  `id` INT,
  `type` INT
) ENGINE=InnoDB;

#
# Dumping data for table 'PartJobList'
#

LOCK TABLES `PartJobList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartList'
#

DROP TABLE IF EXISTS `PartList` CASCADE;
CREATE TABLE `PartList` (
  `id` INT NOT NULL,
  `link` LONGTEXT CHARACTER SET utf8,
  `name` LONGTEXT CHARACTER SET utf8,
  `model` LONGTEXT CHARACTER SET utf8,
  `altered` INT,
  `rarity` INT,
  `partType` INT,
  `extraPartType` INT,
  `word1` INT,
  `word2` INT,
  `translated` INT DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

#
# Dumping data for table 'PartList'
#

LOCK TABLES `PartList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartSkillList'
#

DROP TABLE IF EXISTS `PartSkillList` CASCADE;
CREATE TABLE `PartSkillList` (
  `id` INT,
  `type` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `description` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'PartSkillList'
#

LOCK TABLES `PartSkillList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartStatList'
#

DROP TABLE IF EXISTS `PartStatList` CASCADE;
CREATE TABLE `PartStatList` (
  `id` INT,
  `level` INT,
  `arm` INT,
  `mel` INT,
  `sht` INT,
  `mdf` INT,
  `sdf` INT,
  `bmr` INT,
  `phr` INT
) ENGINE=InnoDB;

#
# Dumping data for table 'PartStatList'
#

LOCK TABLES `PartStatList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartSwordList'
#

DROP TABLE IF EXISTS `PartSwordList` CASCADE;
CREATE TABLE `PartSwordList` (
  `id` INT,
  `type` INT
) ENGINE=InnoDB;

#
# Dumping data for table 'PartSwordList'
#

LOCK TABLES `PartSwordList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartTraitList'
#

DROP TABLE IF EXISTS `PartTraitList` CASCADE;
CREATE TABLE `PartTraitList` (
  `id` INT,
  `type1` INT,
  `description1` LONGTEXT CHARACTER SET utf8,
  `type2` INT,
  `description2` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'PartTraitList'
#

LOCK TABLES `PartTraitList` WRITE;
UNLOCK TABLES;

#
# Table structure for table 'PartType'
#

DROP TABLE IF EXISTS `PartType` CASCADE;
CREATE TABLE `PartType` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `src` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'PartType'
#

LOCK TABLES `PartType` WRITE;
INSERT IGNORE INTO `PartType`(`id`, `name`, `src`) VALUES(1, '頭部', 'assets/images/part/01-head.svg'), (2, '身體', 'assets/images/part/02-body.svg'), (3, '手部', 'assets/images/part/03-arms.svg'), (4, '腳部', 'assets/images/part/04-legs.svg'), (5, '背部', 'assets/images/part/05-back.svg'), (6, '格鬥武器', 'assets/images/part/06-sword.svg'), (7, '射擊武器', 'assets/images/part/07-gun.svg'), (8, '盾牌', 'assets/images/part/08-shield.svg'), (9, '駕駛員', 'assets/images/part/09-pilot.svg');
UNLOCK TABLES;

#
# Table structure for table 'SkillType'
#

DROP TABLE IF EXISTS `SkillType` CASCADE;
CREATE TABLE `SkillType` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `src` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'SkillType'
#

LOCK TABLES `SkillType` WRITE;
INSERT IGNORE INTO `SkillType`(`id`, `name`, `src`) VALUES(1, '物理射擊', 'assets/images/skill/01-beam-shot.svg'), (2, '鐳射射擊', 'assets/images/skill/02-physical-shot.svg'), (3, '物理格鬥', 'assets/images/skill/03-beam-melee.svg'), (4, '鐳射格鬥', 'assets/images/skill/04-physical-melee.svg'), (5, '能力提升', 'assets/images/skill/05-buff.svg'), (6, '覺醒', 'assets/images/skill/06-awakening.svg'), (7, '能力下降', 'assets/images/skill/07-debuff.svg'), (8, '回復', 'assets/images/skill/08-recovery.svg');
UNLOCK TABLES;

#
# Table structure for table 'SwordType'
#

DROP TABLE IF EXISTS `SwordType` CASCADE;
CREATE TABLE `SwordType` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `src` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'SwordType'
#

LOCK TABLES `SwordType` WRITE;
INSERT IGNORE INTO `SwordType`(`id`, `name`, `src`) VALUES(1, '劍', 'assets/images/sword/01-axe.svg'), (2, '雙刀', 'assets/images/sword/02-saber.svg'), (3, '斧', 'assets/images/sword/03-module.svg'), (4, '大劍', 'assets/images/sword/04-dual-sabers.svg'), (5, '矛', 'assets/images/sword/05-blade.svg'), (6, '模組', 'assets/images/sword/06-lance.svg'), (7, '鞭', 'assets/images/sword/07-whip.svg'), (8, '雙刃', 'assets/images/sword/08-twin-blade.svg');
UNLOCK TABLES;

#
# Table structure for table 'TraitType'
#

DROP TABLE IF EXISTS `TraitType` CASCADE;
CREATE TABLE `TraitType` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8
) ENGINE=InnoDB;

#
# Dumping data for table 'TraitType'
#

LOCK TABLES `TraitType` WRITE;
INSERT IGNORE INTO `TraitType`(`id`, `name`) VALUES(1, 'ExSkill'), (2, '射擊威力'), (3, '格鬥威力'), (4, '强格鬥威力'), (5, '特殊射擊威力'), (6, '射擊會心率'), (7, '格鬥會心率'), (8, '退縮'), (9, '射擊威力減少'), (10, '格鬥威力減少'), (11, 'ExSkill威力減少'), (12, 'ExSkill冷卻減少'), (13, 'ExSkill初始充能'), (14, '效果上升'), (15, '效果時間上升'), (16, '其他');
UNLOCK TABLES;

#
# Table structure for table 'Wordtag'
#

DROP TABLE IF EXISTS `Wordtag` CASCADE;
CREATE TABLE `Wordtag` (
  `id` INT,
  `name` LONGTEXT CHARACTER SET utf8,
  `arm` DOUBLE,
  `mel` DOUBLE,
  `sht` DOUBLE,
  `bmr` DOUBLE,
  `phr` DOUBLE,
  `mdf` DOUBLE,
  `sdf` DOUBLE
) ENGINE=InnoDB;

#
# Dumping data for table 'Wordtag'
#

LOCK TABLES `Wordtag` WRITE;
INSERT IGNORE INTO `Wordtag`(`id`, `name`, `arm`, `mel`, `sht`, `bmr`, `phr`, `mdf`, `sdf`) VALUES(1, '主角機', 5.0000000000000003e-02, 1.0000000000000001e-01, 0, 0, 0, 0, 0), (2, '量產機', 1.4999999999999999e-01, 0, 0, 0, 0, 0, 0), (3, '王牌專用機', 0, 0, 1.0000000000000001e-01, 0, 5.0000000000000003e-02, 0, 0), (4, '水陸兩用', 0, 5.0000000000000003e-02, 0, 0, 0, 1.0000000000000001e-01, 0), (5, '指揮官機', 0, 0, 1.0000000000000001e-01, 0, 0, 5.0000000000000003e-02, 0), (6, '近身戰', 5.0000000000000003e-02, 5.0000000000000003e-02, 0, 5.0000000000000003e-02, 0, 0, 0), (7, '中距離戰', 0, 0, 5.0000000000000003e-02, 0, 0, 5.0000000000000003e-02, 5.0000000000000003e-02), (8, '遠距離戰', 0, 0, 5.0000000000000003e-02, 0, 5.0000000000000003e-02, 5.0000000000000003e-02, 0), (9, '高機動', 0, 5.0000000000000003e-02, 0, 0, 5.0000000000000003e-02, 5.0000000000000003e-02, 0), (10, '高火力', 5.0000000000000003e-02, 5.0000000000000003e-02, 5.0000000000000003e-02, 0, 0, 0, 0), (11, '重裝甲', 0, 0, 5.0000000000000003e-02, 5.0000000000000003e-02, 5.0000000000000003e-02, 0, 0), (12, '可變', 0, 5.0000000000000003e-02, 0, 0, 1.0000000000000001e-01, 0, 0), (13, '鋼彈系', 5.0000000000000003e-02, 0, 5.0000000000000003e-02, 0, 0, 0, 5.0000000000000003e-02), (14, 'MF', 0, 1.0000000000000001e-01, 0, 5.0000000000000003e-02, 0, 0, 0), (15, '支援機', 0, 0, 5.0000000000000003e-02, 0, 0, 0, 1.0000000000000001e-01), (16, '聯邦', 0, 5.0000000000000003e-02, 5.0000000000000003e-02, 0, 5.0000000000000003e-02, 0, 0), (17, '吉翁', 0, 5.0000000000000003e-02, 0, 1.0000000000000001e-01, 0, 0, 0), (18, '薩克系', 5.0000000000000003e-02, 5.0000000000000003e-02, 0, 0, 0, 0, 5.0000000000000003e-02), (19, '吉姆系', 0, 0, 5.0000000000000003e-02, 5.0000000000000003e-02, 0, 0, 5.0000000000000003e-02), (20, '宇宙適性', 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02), (21, '沙漠適性', 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02), (22, '寒帶適性', 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02), (23, '森林適性', 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02), (24, '市區適性', 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02), (25, '基地適性', 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02), (26, '電腦適性', 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02, 2.9999999999999999e-02), (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
UNLOCK TABLES;
