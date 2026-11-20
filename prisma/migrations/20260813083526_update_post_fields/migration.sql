/*
  Warnings:

  - You are about to drop the column `excerpt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - Added the required column `heading` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `excerpt`,
    DROP COLUMN `title`,
    ADD COLUMN `heading` VARCHAR(191) NOT NULL,
    ADD COLUMN `subHeading` TEXT NULL;
