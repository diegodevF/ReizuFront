CREATE TABLE `account` (
  `accountId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `verificationTokenExpiration` datetime DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `bio` text,
  `active` tinyint NOT NULL DEFAULT '0',
  `age` int DEFAULT NULL,
  `donationLink` varchar(255) DEFAULT NULL,
  `available` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `commission` tinyint NOT NULL DEFAULT '0',
  `profileImgUrl` varchar(255) DEFAULT NULL,
  `bannerImgUrl` varchar(255) DEFAULT NULL,
  `drawingStyle` varchar(255) DEFAULT NULL,
  `willDraw` varchar(255) DEFAULT NULL,
  `notDraw` varchar(255) DEFAULT NULL,
  `currentColor` varchar(255) DEFAULT NULL,
  `currentLevel` int DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `coinsCoinsId` int DEFAULT NULL,
  `subscriptionSubscriptionId` int DEFAULT NULL,
  PRIMARY KEY (`accountId`),
  UNIQUE KEY `IDX_41dfcb70af895ddf9a53094515` (`username`),
  UNIQUE KEY `IDX_4c8f96ccf523e9a3faefd5bdd4` (`email`),
  UNIQUE KEY `IDX_db3a4c34ed09e0f4ac2d1e7ea4` (`reset_password_token`),
  UNIQUE KEY `REL_a282ccb5fbede340b9e95ef3f7` (`coinsCoinsId`),
  UNIQUE KEY `REL_6d99c4288239bae27b0c5fa8d8` (`subscriptionSubscriptionId`),
  CONSTRAINT `FK_6d99c4288239bae27b0c5fa8d87` FOREIGN KEY (`subscriptionSubscriptionId`) REFERENCES `subscription` (`subscriptionId`) ON DELETE SET NULL,
  CONSTRAINT `FK_a282ccb5fbede340b9e95ef3f74` FOREIGN KEY (`coinsCoinsId`) REFERENCES `coins` (`coinsId`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `achievement` (
  `achievementId` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `achievementType` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `coinsReward` int NOT NULL,
  `maxCount` int DEFAULT NULL,
  `workWorkId` int DEFAULT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`achievementId`),
  KEY `FK_34cc61c64f9f5c7abab9b964340` (`workWorkId`),
  KEY `FK_d9401afa06b8ef2cceed6720af9` (`chapterChapterId`),
  CONSTRAINT `FK_34cc61c64f9f5c7abab9b964340` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE SET NULL,
  CONSTRAINT `FK_d9401afa06b8ef2cceed6720af9` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `achievement_account` (
  `achievementAccountId` int NOT NULL AUTO_INCREMENT,
  `completed` tinyint NOT NULL,
  `dateOfCompletion` datetime DEFAULT NULL,
  `lastVisitDate` datetime DEFAULT NULL,
  `counter` int NOT NULL DEFAULT '0',
  `hours` int NOT NULL DEFAULT '0',
  `minutes` int NOT NULL DEFAULT '0',
  `seconds` int NOT NULL DEFAULT '0',
  `coins` int NOT NULL DEFAULT '0',
  `accountAccountId` int DEFAULT NULL,
  `achievementAchievementId` int DEFAULT NULL,
  PRIMARY KEY (`achievementAccountId`),
  KEY `FK_f656dff939a5efe0381c62a8160` (`accountAccountId`),
  KEY `FK_2434c71f502541bed45a96da8a4` (`achievementAchievementId`),
  CONSTRAINT `FK_2434c71f502541bed45a96da8a4` FOREIGN KEY (`achievementAchievementId`) REFERENCES `achievement` (`achievementId`) ON DELETE CASCADE,
  CONSTRAINT `FK_f656dff939a5efe0381c62a8160` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `announcement` (
  `announcementId` int NOT NULL AUTO_INCREMENT,
  `bannerUrl` varchar(255) DEFAULT NULL,
  `startDateFirstHalfYear` varchar(255) DEFAULT NULL,
  `endDateFirstHalfYear` varchar(255) DEFAULT NULL,
  `winnerAnnouncementDateFirstHalfYear` varchar(255) DEFAULT NULL,
  `startDateSecondHalfYear` varchar(255) DEFAULT NULL,
  `endDateSecondHalfYear` varchar(255) DEFAULT NULL,
  `winnerAnnouncementDateSecondHalfYear` varchar(255) DEFAULT NULL,
  `oneShotPrize` varchar(255) DEFAULT NULL,
  `storyPrize` varchar(255) DEFAULT NULL,
  `firstPlacePrize` varchar(255) DEFAULT NULL,
  `secondPlacePrize` varchar(255) DEFAULT NULL,
  `thirdPlacePrize` varchar(255) DEFAULT NULL,
  `isFirstHalfYear` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`announcementId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `banner` (
  `bannerId` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) NOT NULL,
  `order` int DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bannerId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `buy_coins` (
  `buyCoinsId` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`buyCoinsId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `chapter` (
  `chapterId` int NOT NULL AUTO_INCREMENT,
  `numberChapter` int DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `chapterPdfUrl` varchar(255) DEFAULT NULL,
  `dateOfPublish` datetime DEFAULT NULL,
  `chapterName` varchar(255) DEFAULT NULL,
  `unlockable` tinyint NOT NULL DEFAULT '0',
  `approved` tinyint NOT NULL DEFAULT '1',
  `adminControl` tinyint NOT NULL DEFAULT '0',
  `publish` tinyint NOT NULL DEFAULT '0',
  `workWorkId` int DEFAULT NULL,
  PRIMARY KEY (`chapterId`),
  KEY `FK_b50d0e93081e0605f0fb894b343` (`workWorkId`),
  CONSTRAINT `FK_b50d0e93081e0605f0fb894b343` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `chapter_img` (
  `chapterImgId` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) NOT NULL,
  `order` int NOT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`chapterImgId`),
  KEY `FK_9d3638830597f9808925a2e7a21` (`chapterChapterId`),
  CONSTRAINT `FK_9d3638830597f9808925a2e7a21` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1738 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `coins` (
  `coinsId` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  PRIMARY KEY (`coinsId`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `color` (
  `colorId` int NOT NULL AUTO_INCREMENT,
  `color` varchar(255) NOT NULL,
  `levelLevelId` int DEFAULT NULL,
  PRIMARY KEY (`colorId`),
  KEY `FK_68505c05a2860a3b56cfece975a` (`levelLevelId`),
  CONSTRAINT `FK_68505c05a2860a3b56cfece975a` FOREIGN KEY (`levelLevelId`) REFERENCES `level` (`levelId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `comment` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `commentType` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `accountAccountId` int DEFAULT NULL,
  `workWorkId` int DEFAULT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `FK_f0aabd4a4e2053d568f89df94d0` (`accountAccountId`),
  KEY `FK_15b372aaa82d76ff371ec0281e8` (`workWorkId`),
  KEY `FK_1868a1e227e673d8e899a4de2d2` (`chapterChapterId`),
  CONSTRAINT `FK_15b372aaa82d76ff371ec0281e8` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE,
  CONSTRAINT `FK_1868a1e227e673d8e899a4de2d2` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE CASCADE,
  CONSTRAINT `FK_f0aabd4a4e2053d568f89df94d0` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `comment_like` (
  `commentLikeId` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `accountAccountId` int DEFAULT NULL,
  `commentCommentId` int DEFAULT NULL,
  PRIMARY KEY (`commentLikeId`),
  KEY `FK_180d2b8c440544e190e1ee60ced` (`accountAccountId`),
  KEY `FK_1be1ddf57e90887d9b803bb65d0` (`commentCommentId`),
  CONSTRAINT `FK_180d2b8c440544e190e1ee60ced` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE,
  CONSTRAINT `FK_1be1ddf57e90887d9b803bb65d0` FOREIGN KEY (`commentCommentId`) REFERENCES `comment` (`commentId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `commission` (
  `commissionId` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) DEFAULT NULL,
  `commissionName` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `accountAccountId` int DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`commissionId`),
  KEY `FK_27bb11f13ff32f9fee65879421f` (`accountAccountId`),
  CONSTRAINT `FK_27bb11f13ff32f9fee65879421f` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `day` (
  `dayId` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`dayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `favorite` (
  `favoriteId` int NOT NULL AUTO_INCREMENT,
  `favoriteType` varchar(255) NOT NULL,
  `accountAccountId` int DEFAULT NULL,
  `authorAccountAccountId` int DEFAULT NULL,
  `workWorkId` int DEFAULT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`favoriteId`),
  KEY `FK_6e9622c6a3be469417fe610f56e` (`accountAccountId`),
  KEY `FK_75ff5e0493fe95a324af3616038` (`authorAccountAccountId`),
  KEY `FK_59241d6eff95b0cdd248631a61f` (`workWorkId`),
  KEY `FK_d7225b0d849a14ba03254fae9cb` (`chapterChapterId`),
  CONSTRAINT `FK_59241d6eff95b0cdd248631a61f` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE,
  CONSTRAINT `FK_6e9622c6a3be469417fe610f56e` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE,
  CONSTRAINT `FK_75ff5e0493fe95a324af3616038` FOREIGN KEY (`authorAccountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE,
  CONSTRAINT `FK_d7225b0d849a14ba03254fae9cb` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `genre` (
  `genreId` int NOT NULL AUTO_INCREMENT,
  `genreName` varchar(255) NOT NULL,
  PRIMARY KEY (`genreId`),
  UNIQUE KEY `IDX_6aa8d966d5b9f3c9c49f5c27e7` (`genreName`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `illustration` (
  `illustrationId` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) NOT NULL,
  `accountAccountId` int DEFAULT NULL,
  PRIMARY KEY (`illustrationId`),
  KEY `FK_98fb3c70565f481ed2aa995494d` (`accountAccountId`),
  CONSTRAINT `FK_98fb3c70565f481ed2aa995494d` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `level` (
  `levelId` int NOT NULL AUTO_INCREMENT,
  `level` int NOT NULL,
  `maxCounterComments` int NOT NULL,
  `maxCounterViews` int NOT NULL,
  `marcoImageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`levelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `level_account` (
  `levelAccountId` int NOT NULL AUTO_INCREMENT,
  `counterComment` int NOT NULL DEFAULT '0',
  `counterView` int NOT NULL DEFAULT '0',
  `completed` tinyint NOT NULL DEFAULT '0',
  `accountAccountId` int DEFAULT NULL,
  `levelLevelId` int DEFAULT NULL,
  PRIMARY KEY (`levelAccountId`),
  KEY `FK_4fb75b99a53f3db1738809effd2` (`accountAccountId`),
  KEY `FK_d5e2ebe15f39a103f59d6138643` (`levelLevelId`),
  CONSTRAINT `FK_4fb75b99a53f3db1738809effd2` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE SET NULL,
  CONSTRAINT `FK_d5e2ebe15f39a103f59d6138643` FOREIGN KEY (`levelLevelId`) REFERENCES `level` (`levelId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `magazine` (
  `magazineId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` text,
  `frequency` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `logoUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`magazineId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `magazine_volume` (
  `magazineVolumeId` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `volumeNumber` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `magazineMagazineId` int DEFAULT NULL,
  PRIMARY KEY (`magazineVolumeId`),
  KEY `FK_d563997d1de3fd81520f6b0773e` (`magazineMagazineId`),
  CONSTRAINT `FK_d563997d1de3fd81520f6b0773e` FOREIGN KEY (`magazineMagazineId`) REFERENCES `magazine` (`magazineId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `message` (
  `messageId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `mission` (
  `missionId` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `coinsReward` int NOT NULL,
  `frequency` varchar(255) NOT NULL,
  `multiply` tinyint NOT NULL DEFAULT '0',
  `forAuthor` tinyint NOT NULL DEFAULT '0',
  `workWorkId` int DEFAULT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`missionId`),
  KEY `FK_a476f4a9f78d0dd078fd715bcac` (`workWorkId`),
  KEY `FK_28f3f3ad3cbff52ed9e8005e25a` (`chapterChapterId`),
  CONSTRAINT `FK_28f3f3ad3cbff52ed9e8005e25a` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE SET NULL,
  CONSTRAINT `FK_a476f4a9f78d0dd078fd715bcac` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `mission_account` (
  `missionAccountId` int NOT NULL AUTO_INCREMENT,
  `completed` tinyint NOT NULL DEFAULT '0',
  `dateOfCompletion` datetime DEFAULT NULL,
  `homePageCounter` int NOT NULL DEFAULT '0',
  `lastVisitDate` datetime DEFAULT NULL,
  `hours` int NOT NULL DEFAULT '0',
  `minutes` int NOT NULL DEFAULT '0',
  `seconds` int NOT NULL DEFAULT '0',
  `accountAccountId` int DEFAULT NULL,
  `missionMissionId` int DEFAULT NULL,
  PRIMARY KEY (`missionAccountId`),
  KEY `FK_76f3e90aab8479625b18a1444f4` (`accountAccountId`),
  KEY `FK_759eabe863303c892c02466fb30` (`missionMissionId`),
  CONSTRAINT `FK_759eabe863303c892c02466fb30` FOREIGN KEY (`missionMissionId`) REFERENCES `mission` (`missionId`) ON DELETE CASCADE,
  CONSTRAINT `FK_76f3e90aab8479625b18a1444f4` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `notification` (
  `notificationId` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `message` text NOT NULL,
  `read` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `accountAccountId` int DEFAULT NULL,
  `workWorkId` int DEFAULT NULL,
  PRIMARY KEY (`notificationId`),
  KEY `FK_a7985adc045a8c7675d75634fca` (`accountAccountId`),
  KEY `FK_520c0aea2b287491e056bda6e5f` (`workWorkId`),
  CONSTRAINT `FK_520c0aea2b287491e056bda6e5f` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE,
  CONSTRAINT `FK_a7985adc045a8c7675d75634fca` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `product` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `coinsAmount` int NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `rating` (
  `ratingId` int NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `ratingType` varchar(255) NOT NULL,
  `accountAccountId` int DEFAULT NULL,
  `workWorkId` int DEFAULT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`ratingId`),
  KEY `FK_a2fa3160f18ba96dc83f5689223` (`accountAccountId`),
  KEY `FK_7f5ad81aa357c9fdd4143ea4657` (`workWorkId`),
  KEY `FK_339a84a4238f604e519210934ed` (`chapterChapterId`),
  CONSTRAINT `FK_339a84a4238f604e519210934ed` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE CASCADE,
  CONSTRAINT `FK_7f5ad81aa357c9fdd4143ea4657` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE,
  CONSTRAINT `FK_a2fa3160f18ba96dc83f5689223` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `role` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `IDX_a6142dcc61f5f3fb2d6899fa26` (`roleName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `role_account` (
  `roleAccountId` int NOT NULL AUTO_INCREMENT,
  `accountAccountId` int DEFAULT NULL,
  `roleRoleId` int DEFAULT NULL,
  PRIMARY KEY (`roleAccountId`),
  KEY `FK_fcf169dadeebbe590b758af60e5` (`accountAccountId`),
  KEY `FK_95ec9911f39a22dd8ab08b6b1f5` (`roleRoleId`),
  CONSTRAINT `FK_95ec9911f39a22dd8ab08b6b1f5` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE,
  CONSTRAINT `FK_fcf169dadeebbe590b758af60e5` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `subscription` (
  `subscriptionId` int NOT NULL AUTO_INCREMENT,
  `stripeCustomerId` varchar(255) DEFAULT NULL,
  `stripePriceId` varchar(255) DEFAULT NULL,
  `subscriptionType` varchar(255) DEFAULT NULL,
  `stripeSubscriptionId` varchar(255) DEFAULT NULL,
  `lastStripeEventId` varchar(255) DEFAULT NULL,
  `subscriptionStatus` varchar(255) DEFAULT NULL,
  `subscriptionCreatedAt` datetime DEFAULT NULL,
  `subscriptionCurrentPeriodEnd` datetime DEFAULT NULL,
  `lastPaymentDate` datetime DEFAULT NULL,
  `nextPaymentDate` datetime DEFAULT NULL,
  `defaultPaymentMethodLast` varchar(255) DEFAULT NULL,
  `defaultPaymentMethodBrand` varchar(255) DEFAULT NULL,
  `defaultPaymentMethodExpDate` varchar(255) DEFAULT NULL,
  `markedForCancellation` tinyint NOT NULL DEFAULT '0',
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`subscriptionId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `unlock_chapter` (
  `unlockChapterId` int NOT NULL AUTO_INCREMENT,
  `accountAccountId` int DEFAULT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`unlockChapterId`),
  KEY `FK_7f9662eba92901a98509c225a9a` (`accountAccountId`),
  KEY `FK_2a1417bd79f5f308bf62caee09e` (`chapterChapterId`),
  CONSTRAINT `FK_2a1417bd79f5f308bf62caee09e` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE CASCADE,
  CONSTRAINT `FK_7f9662eba92901a98509c225a9a` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `view` (
  `viewId` int NOT NULL AUTO_INCREMENT,
  `viewType` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `accountAccountId` int DEFAULT NULL,
  `workWorkId` int DEFAULT NULL,
  `chapterChapterId` int DEFAULT NULL,
  PRIMARY KEY (`viewId`),
  KEY `FK_4112bdbdc4e33feb31343728ecf` (`accountAccountId`),
  KEY `FK_f25fb30a8b2785d86196487ab77` (`workWorkId`),
  KEY `FK_0f9c511fda4f468d84977772f98` (`chapterChapterId`),
  CONSTRAINT `FK_0f9c511fda4f468d84977772f98` FOREIGN KEY (`chapterChapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE CASCADE,
  CONSTRAINT `FK_4112bdbdc4e33feb31343728ecf` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE,
  CONSTRAINT `FK_f25fb30a8b2785d86196487ab77` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=410 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `volume_img` (
  `volumeImgId` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) NOT NULL,
  `order` int NOT NULL,
  `magazineVolumeMagazineVolumeId` int DEFAULT NULL,
  PRIMARY KEY (`volumeImgId`),
  KEY `FK_09a17ecec184460a38ddc8dbbd6` (`magazineVolumeMagazineVolumeId`),
  CONSTRAINT `FK_09a17ecec184460a38ddc8dbbd6` FOREIGN KEY (`magazineVolumeMagazineVolumeId`) REFERENCES `magazine_volume` (`magazineVolumeId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `work` (
  `workId` int NOT NULL AUTO_INCREMENT,
  `workName` varchar(255) NOT NULL,
  `synopsis` text NOT NULL,
  `workType` varchar(255) NOT NULL,
  `workState` varchar(255) NOT NULL,
  `workFrequency` varchar(255) NOT NULL,
  `workFormat` varchar(255) NOT NULL,
  `workOrientation` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `bannerUrl` varchar(255) NOT NULL,
  `approved` tinyint NOT NULL DEFAULT '0',
  `mature` tinyint NOT NULL DEFAULT '0',
  `exclusive` tinyint NOT NULL DEFAULT '0',
  `unlockable` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `dayDayId` int DEFAULT NULL,
  PRIMARY KEY (`workId`),
  UNIQUE KEY `IDX_acebf476f8aa24526003ee1c81` (`workName`),
  KEY `FK_5f643b6c26d7127b2f663f1c395` (`dayDayId`),
  CONSTRAINT `FK_5f643b6c26d7127b2f663f1c395` FOREIGN KEY (`dayDayId`) REFERENCES `day` (`dayId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `work_account` (
  `workAccountId` int NOT NULL AUTO_INCREMENT,
  `workWorkId` int DEFAULT NULL,
  `accountAccountId` int DEFAULT NULL,
  PRIMARY KEY (`workAccountId`),
  KEY `FK_52b259b39e282a0fbba3d91998d` (`workWorkId`),
  KEY `FK_e0344c060e0a51c51b87ae0b29c` (`accountAccountId`),
  CONSTRAINT `FK_52b259b39e282a0fbba3d91998d` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE,
  CONSTRAINT `FK_e0344c060e0a51c51b87ae0b29c` FOREIGN KEY (`accountAccountId`) REFERENCES `account` (`accountId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4  ;

CREATE TABLE `work_genre` (
  `workGenreId` int NOT NULL AUTO_INCREMENT,
  `workWorkId` int DEFAULT NULL,
  `genreGenreId` int DEFAULT NULL,
  PRIMARY KEY (`workGenreId`),
  KEY `FK_ed91242873878f5da04de5fd2be` (`workWorkId`),
  KEY `FK_e2dfadf8352a8b4632686cf15ab` (`genreGenreId`),
  CONSTRAINT `FK_e2dfadf8352a8b4632686cf15ab` FOREIGN KEY (`genreGenreId`) REFERENCES `genre` (`genreId`) ON DELETE CASCADE,
  CONSTRAINT `FK_ed91242873878f5da04de5fd2be` FOREIGN KEY (`workWorkId`) REFERENCES `work` (`workId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4  ;