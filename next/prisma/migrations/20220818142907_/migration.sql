/*
  Warnings:

  - Added the required column `args` to the `FunctionTest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expect` to the `FunctionTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FunctionTest` ADD COLUMN `args` VARCHAR(191) NOT NULL,
    ADD COLUMN `expect` VARCHAR(191) NOT NULL;
