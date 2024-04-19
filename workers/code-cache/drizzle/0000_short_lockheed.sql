CREATE TABLE codecache (
	`github_permalink` text PRIMARY KEY NOT NULL,
	`code` text,
	`used_in_latest_docs` int NOT NULL,
	`updated_at` DATETIME
);
