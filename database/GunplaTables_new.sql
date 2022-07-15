-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 04, 2022 at 02:57 AM
-- Server version: 10.5.12-MariaDB
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `id16162796_gunpla_levelupdate`
--

-- --------------------------------------------------------

--
-- Table structure for table `AlteredType`
--

CREATE TABLE `AlteredType` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `AlteredType`
--

INSERT INTO `AlteredType` (`id`, `name`) VALUES
(0, ''),
(1, '【改造】'),
(2, '【BIG改造】');

-- --------------------------------------------------------

--
-- Table structure for table `Attribute`
--

CREATE TABLE `Attribute` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `src` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Attribute`
--

INSERT INTO `Attribute` (`id`, `name`, `src`) VALUES
(1, 'T', 'assets/vectors/02-attribute-technique.svg'),
(2, 'P', 'assets/vectors/01-attribute-power.svg'),
(3, 'S', 'assets/vectors/03-attribute-speed.svg');

-- --------------------------------------------------------

--
-- Table structure for table `DamageType`
--

CREATE TABLE `DamageType` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `DamageType`
--

INSERT INTO `DamageType` (`id`, `name`) VALUES
(1, '物理'),
(2, '鐳射');

-- --------------------------------------------------------

--
-- Stand-in structure for view `GunplaParts`
-- (See below for the actual view)
--
CREATE TABLE `GunplaParts` (
`id` int(11)
,`arm` int(11)
,`mel` int(11)
,`sht` int(11)
,`mdf` int(11)
,`sdf` int(11)
,`bmr` int(11)
,`phr` int(11)
,`name` longtext
,`description1` mediumtext
,`attribute` int(11)
,`word1` int(11)
,`word2` int(11)
,`subType` varchar(11)
,`rarity` int(11)
,`level` int(11)
,`partType` int(11)
,`altered` int(11)
,`model` longtext
);

-- --------------------------------------------------------

--
-- Table structure for table `GunType`
--

CREATE TABLE `GunType` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `src` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `GunType`
--

INSERT INTO `GunType` (`id`, `name`, `src`) VALUES
(1, '槍', 'assets/images/gun/01-rifle.svg'),
(2, '長槍', 'assets/images/gun/02-machine-gun.svg'),
(3, '雙槍', 'assets/images/gun/03-long-rifle.svg'),
(4, '機槍', 'assets/images/gun/04-gatling-gun.svg'),
(5, '火箭炮', 'assets/images/gun/05-bazooka.svg'),
(6, '格林機槍', 'assets/images/gun/06-twin-rifle.svg');

-- --------------------------------------------------------

--
-- Table structure for table `JobType`
--

CREATE TABLE `JobType` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `src` longtext CHARACTER SET utf8 DEFAULT NULL,
  `arm` double DEFAULT NULL,
  `mel` double DEFAULT NULL,
  `sht` double DEFAULT NULL,
  `bmr` double DEFAULT NULL,
  `phr` double DEFAULT NULL,
  `mdf` double DEFAULT NULL,
  `sdf` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `JobType`
--

INSERT INTO `JobType` (`id`, `name`, `src`, `arm`, `mel`, `sht`, `bmr`, `phr`, `mdf`, `sdf`) VALUES
(1, 'All-Rounder', 'assets/images/job/01-all-rounder.svg', 0, 0, 0, 0, 0, 0, 0),
(2, 'Long-Shooter', 'assets/images/job/02-defender.svg', 0, 0, 0.1, 0, 0, 0, 0),
(3, 'Out-Fighter', 'assets/images/job/03-in-fighter.svg', 0, 0.1, 0, 0, 0, 0, 0),
(4, 'Middle-Shooter', 'assets/images/job/04-out-fighter.svg', 0, 0, 0.1, 0, 0, 0, 0),
(5, 'Defender', 'assets/images/job/05-middle-shooter.svg', 0.05, 0, 0, 0.05, 0.05, 0, 0),
(6, 'In-Fighter', 'assets/images/job/06-long-shooter.svg', 0, 0.1, 0, 0, 0, 0, 0),
(7, 'Supporter', 'assets/images/job/07-supporter.svg', 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `PageCounter`
--

CREATE TABLE `PageCounter` (
  `lang` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `counter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `PageCounter`
--

INSERT INTO `PageCounter` (`lang`, `counter`) VALUES
('hk', 6181),
('tw', 11206),
('en', 1405),
('cal', 2139);

-- --------------------------------------------------------

--
-- Table structure for table `PartDamageList`
--

CREATE TABLE `PartDamageList` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartGunList`
--

CREATE TABLE `PartGunList` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartJobList`
--

CREATE TABLE `PartJobList` (
  `id` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `description` longtext CHARACTER SET utf16 COLLATE utf16_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartList`
--

CREATE TABLE `PartList` (
  `id` int(11) NOT NULL,
  `link` longtext CHARACTER SET utf8 DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `model` longtext CHARACTER SET utf8 DEFAULT NULL,
  `altered` int(11) DEFAULT NULL,
  `rarity` int(11) DEFAULT NULL,
  `partType` int(11) DEFAULT NULL,
  `attribute` int(11) DEFAULT NULL,
  `word1` int(11) DEFAULT NULL,
  `word2` int(11) DEFAULT NULL,
  `translated` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartSkillList`
--

CREATE TABLE `PartSkillList` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `description` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartStatList`
--

CREATE TABLE `PartStatList` (
  `id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `arm` int(11) DEFAULT NULL,
  `mel` int(11) DEFAULT NULL,
  `sht` int(11) DEFAULT NULL,
  `bmr` int(11) DEFAULT NULL,
  `phr` int(11) DEFAULT NULL,
  `mdf` int(11) DEFAULT NULL,
  `sdf` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartSwordList`
--

CREATE TABLE `PartSwordList` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartTraitList`
--

CREATE TABLE `PartTraitList` (
  `id` int(11) NOT NULL,
  `type1` int(11) DEFAULT NULL,
  `description1` longtext CHARACTER SET utf8 DEFAULT NULL,
  `type2` int(11) DEFAULT NULL,
  `description2` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PartType`
--

CREATE TABLE `PartType` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `src` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `PartType`
--

INSERT INTO `PartType` (`id`, `name`, `src`) VALUES
(1, '頭部', 'assets/images/part/01-head.svg'),
(2, '身體', 'assets/images/part/02-body.svg'),
(3, '手部', 'assets/images/part/03-arms.svg'),
(4, '腳部', 'assets/images/part/04-legs.svg'),
(5, '背部', 'assets/images/part/05-back.svg'),
(6, '格鬥武器', 'assets/images/part/06-sword.svg'),
(7, '射擊武器', 'assets/images/part/07-gun.svg'),
(8, '盾牌', 'assets/images/part/08-shield.svg'),
(9, '駕駛員', 'assets/images/part/09-pilot.svg');

-- --------------------------------------------------------

--
-- Table structure for table `Rarity`
--

CREATE TABLE `Rarity` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `color` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Rarity`
--

INSERT INTO `Rarity` (`id`, `name`, `color`) VALUES
(1, '★', 'rgb(0, 0, 0)'),
(2, '★★', 'rgb(0, 128, 0)'),
(3, '★★★', 'rgb(0, 0, 255)'),
(4, '★★★★', 'rgb(255, 0, 255)'),
(5, '★★★★★', 'rgb(182, 134, 0)'),
(6, '★★★★★★', 'rgb(255, 0, 0)');

-- --------------------------------------------------------

--
-- Table structure for table `SkillType`
--

CREATE TABLE `SkillType` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `src` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SkillType`
--

INSERT INTO `SkillType` (`id`, `name`, `src`) VALUES
(1, '物理射擊', 'assets/images/skill/01-beam-shot.svg'),
(2, '鐳射射擊', 'assets/images/skill/02-physical-shot.svg'),
(3, '物理格鬥', 'assets/images/skill/03-beam-melee.svg'),
(4, '鐳射格鬥', 'assets/images/skill/04-physical-melee.svg'),
(5, '能力提升', 'assets/images/skill/05-buff.svg'),
(6, '覺醒', 'assets/images/skill/06-awakening.svg'),
(7, '能力下降', 'assets/images/skill/07-debuff.svg'),
(8, '回復', 'assets/images/skill/08-recovery.svg');

-- --------------------------------------------------------

--
-- Table structure for table `SwordType`
--

CREATE TABLE `SwordType` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `src` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SwordType`
--

INSERT INTO `SwordType` (`id`, `name`, `src`) VALUES
(1, '劍', 'assets/images/sword/01-axe.svg'),
(2, '雙刀', 'assets/images/sword/02-saber.svg'),
(3, '斧', 'assets/images/sword/03-module.svg'),
(4, '大劍', 'assets/images/sword/04-dual-sabers.svg'),
(5, '矛', 'assets/images/sword/05-blade.svg'),
(6, '模組', 'assets/images/sword/06-lance.svg'),
(7, '鞭', 'assets/images/sword/07-whip.svg'),
(8, '雙刃', 'assets/images/sword/08-twin-blade.svg');

-- --------------------------------------------------------

--
-- Table structure for table `TraitType`
--

CREATE TABLE `TraitType` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `TraitType`
--

INSERT INTO `TraitType` (`id`, `name`) VALUES
(1, 'ExSkill'),
(2, '射擊威力'),
(3, '格鬥威力'),
(4, '强格鬥威力'),
(5, '特殊射擊威力'),
(6, '射擊會心率'),
(7, '格鬥會心率'),
(8, '退縮'),
(9, '射擊威力減少'),
(10, '格鬥威力減少'),
(11, 'ExSkill威力減少'),
(12, 'ExSkill冷卻減少'),
(13, 'ExSkill初始充能'),
(14, '效果上升'),
(15, '效果時間上升'),
(16, '其他');

-- --------------------------------------------------------

--
-- Table structure for table `Wordtag`
--

CREATE TABLE `Wordtag` (
  `id` int(11) DEFAULT NULL,
  `name` longtext CHARACTER SET utf8 DEFAULT NULL,
  `arm` double DEFAULT NULL,
  `mel` double DEFAULT NULL,
  `sht` double DEFAULT NULL,
  `bmr` double DEFAULT NULL,
  `phr` double DEFAULT NULL,
  `mdf` double DEFAULT NULL,
  `sdf` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Wordtag`
--

INSERT INTO `Wordtag` (`id`, `name`, `arm`, `mel`, `sht`, `bmr`, `phr`, `mdf`, `sdf`) VALUES
(1, '主角機', 0.05, 0.1, 0, 0, 0, 0, 0),
(2, '量產機', 0.15, 0, 0, 0, 0, 0, 0),
(3, '王牌專用機', 0, 0, 0.1, 0, 0.05, 0, 0),
(4, '水陸兩用', 0, 0.05, 0, 0, 0, 0.1, 0),
(5, '指揮官機', 0, 0, 0.1, 0, 0, 0.05, 0),
(6, '近身戰', 0.05, 0.05, 0, 0.05, 0, 0, 0),
(7, '中距離戰', 0, 0, 0.05, 0, 0, 0.05, 0.05),
(8, '遠距離戰', 0, 0, 0.05, 0, 0.05, 0.05, 0),
(9, '高機動', 0, 0.05, 0, 0, 0.05, 0.05, 0),
(10, '高火力', 0.05, 0.05, 0.05, 0, 0, 0, 0),
(11, '重裝甲', 0, 0, 0.05, 0.05, 0.05, 0, 0),
(12, '可變', 0, 0.05, 0, 0, 0.1, 0, 0),
(13, '鋼彈系', 0.05, 0, 0.05, 0, 0, 0, 0.05),
(14, 'MF', 0, 0.1, 0, 0.05, 0, 0, 0),
(15, '支援機', 0, 0, 0.05, 0, 0, 0, 0.1),
(16, '聯邦', 0, 0.05, 0.05, 0, 0.05, 0, 0),
(17, '吉翁', 0, 0.05, 0, 0.1, 0, 0, 0),
(18, '薩克系', 0.05, 0.05, 0, 0, 0, 0, 0.05),
(19, '吉姆系', 0, 0, 0.05, 0.05, 0, 0, 0.05),
(20, '宇宙適性', 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03),
(21, '沙漠適性', 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03),
(22, '寒帶適性', 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03),
(23, '森林適性', 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03),
(24, '市區適性', 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03),
(25, '基地適性', 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03),
(26, '電腦適性', 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03),
(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure for view `GunplaParts`
--
DROP TABLE IF EXISTS `GunplaParts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`id16162796_hologrampeter`@`%` SQL SECURITY DEFINER VIEW `GunplaParts`  AS  select `PS`.`id` AS `id`,`PS`.`arm` AS `arm`,`PS`.`mel` AS `mel`,`PS`.`sht` AS `sht`,`PS`.`mdf` AS `mdf`,`PS`.`sdf` AS `sdf`,`PS`.`bmr` AS `bmr`,`PS`.`phr` AS `phr`,concat('Lv',`PS`.`level`,' ',`AT`.`name`,`P`.`name`) AS `name`,coalesce(concat(`EX`.`name`,' ',`EX`.`description`),concat(`T`.`description1`,char(10),coalesce(`T`.`description2`,''))) AS `description1`,`P`.`attribute` AS `attribute`,`P`.`word1` AS `word1`,`P`.`word2` AS `word2`,coalesce(`ST`.`type`,`GT`.`type`,`JT`.`type`,'') AS `subType`,`P`.`rarity` AS `rarity`,`PS`.`level` AS `level`,`P`.`partType` AS `partType`,`P`.`altered` AS `altered`,`P`.`model` AS `model` from (((((((`PartStatList` `PS` join `PartList` `P` on(`P`.`id` = `PS`.`id`)) join `AlteredType` `AT` on(`P`.`altered` = `AT`.`id`)) left join `PartSkillList` `EX` on(`EX`.`id` = `P`.`id`)) left join `PartTraitList` `T` on(`T`.`id` = `P`.`id`)) left join `PartSwordList` `ST` on(`ST`.`id` = `P`.`id`)) left join `PartGunList` `GT` on(`GT`.`id` = `P`.`id`)) left join `PartJobList` `JT` on(`JT`.`id` = `P`.`id`)) where `P`.`translated` = 1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `PartDamageList`
--
ALTER TABLE `PartDamageList`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`);

--
-- Indexes for table `PartGunList`
--
ALTER TABLE `PartGunList`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `PartList`
--
ALTER TABLE `PartList`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `PartSkillList`
--
ALTER TABLE `PartSkillList`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PartStatList`
--
ALTER TABLE `PartStatList`
  ADD PRIMARY KEY (`id`,`level`);

--
-- Indexes for table `PartSwordList`
--
ALTER TABLE `PartSwordList`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PartTraitList`
--
ALTER TABLE `PartTraitList`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Rarity`
--
ALTER TABLE `Rarity`
  ADD PRIMARY KEY (`id`);
COMMIT;
