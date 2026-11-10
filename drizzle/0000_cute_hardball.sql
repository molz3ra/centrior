CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`workspace_id` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`institution_name` text NOT NULL,
	`initial_balance_cents` integer DEFAULT 0 NOT NULL,
	`color` text DEFAULT '#3b82f6' NOT NULL,
	`credit_limit_cents` integer,
	`closing_day` integer,
	`due_day` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`workspace_id` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`action` text NOT NULL,
	`payload` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`workspace_id` text NOT NULL,
	`category_id` text NOT NULL,
	`month` integer NOT NULL,
	`year` integer NOT NULL,
	`target_amount_cents` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`workspace_id` text NOT NULL,
	`parent_id` text,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`icon` text DEFAULT 'tag' NOT NULL,
	`color` text DEFAULT '#64748b' NOT NULL,
	`is_system` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`workspace_id` text NOT NULL,
	`account_id` text NOT NULL,
	`category_id` text,
	`type` text NOT NULL,
	`status` text DEFAULT 'COMPLETED' NOT NULL,
	`amount_cents` integer NOT NULL,
	`description` text NOT NULL,
	`date` integer NOT NULL,
	`installment_group` text,
	`installment_index` integer,
	`installments_count` integer,
	`invoice_date` integer,
	`dedup_hash` text,
	`notes` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`workspace_id`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text DEFAULT 'PERSONAL' NOT NULL,
	`currency` text DEFAULT 'BRL' NOT NULL,
	`is_demo` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
