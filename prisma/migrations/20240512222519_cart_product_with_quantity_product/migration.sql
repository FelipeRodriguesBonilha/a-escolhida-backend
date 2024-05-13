/*
  Warnings:

  - Added the required column `quantity_product` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "quantity_product" INTEGER NOT NULL;
