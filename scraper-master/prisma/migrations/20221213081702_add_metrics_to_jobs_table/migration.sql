-- AlterTable
ALTER TABLE `Job` ADD COLUMN `clientEnd` DATETIME(3) NULL,
    ADD COLUMN `clientStart` DATETIME(3) NULL,
    ADD COLUMN `serverEnd` DATETIME(3) NULL,
    ADD COLUMN `serverStart` DATETIME(3) NULL;
