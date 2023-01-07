-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `schedulings` DROP FOREIGN KEY `schedulings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_userId_fkey`;

-- DropForeignKey
ALTER TABLE `time_intervals` DROP FOREIGN KEY `time_intervals_userId_fkey`;

-- AlterTable
ALTER TABLE `schedulings` MODIFY `observations` TEXT NULL;

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_userId_fkey` TO `accounts_userId_idx`;

-- RenameIndex
ALTER TABLE `schedulings` RENAME INDEX `schedulings_userId_fkey` TO `schedulings_userId_idx`;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `sessions_userId_fkey` TO `sessions_userId_idx`;

-- RenameIndex
ALTER TABLE `time_intervals` RENAME INDEX `time_intervals_userId_fkey` TO `time_intervals_userId_idx`;
