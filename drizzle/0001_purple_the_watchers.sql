CREATE TABLE `contactRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','read','responded') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`donorName` varchar(255),
	`donorEmail` varchar(320),
	`donorPhone` varchar(20),
	`amount` decimal(12,2) NOT NULL,
	`paymentMethod` enum('instapay','vodafone_cash','etisalat_cash','orange_cash','bank_transfer','other') NOT NULL,
	`status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` enum('international_relief','bride_preparation','holiday_clothing','orphan_sponsorship','charitable_complexes','palm_planting') NOT NULL,
	`imageUrl` varchar(512),
	`targetAmount` decimal(12,2),
	`collectedAmount` decimal(12,2) DEFAULT '0',
	`beneficiaryCount` int DEFAULT 0,
	`status` enum('active','completed','paused') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentCount` int NOT NULL DEFAULT 51,
	`studentTarget` int NOT NULL DEFAULT 100,
	`orphanCount` int NOT NULL DEFAULT 0,
	`orphanTarget` int NOT NULL DEFAULT 500,
	`familyCount` int NOT NULL DEFAULT 0,
	`familyTarget` int NOT NULL DEFAULT 1000,
	`totalBeneficiaries` int NOT NULL DEFAULT 0,
	`totalBeneficiariesTarget` int NOT NULL DEFAULT 2000,
	`totalDonations` decimal(12,2) NOT NULL DEFAULT '0',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `statistics_id` PRIMARY KEY(`id`)
);
