-- CreateTable
CREATE TABLE `FunctionTest` (
    `id` VARCHAR(191) NOT NULL,
    `functionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FunctionTest_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FunctionTest` ADD CONSTRAINT `FunctionTest_functionId_fkey` FOREIGN KEY (`functionId`) REFERENCES `Function`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
