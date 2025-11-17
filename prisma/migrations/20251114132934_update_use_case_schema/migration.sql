/*
  Warnings:

  - You are about to drop the column `pdf_download_url` on the `use_cases` table. All the data in the column will be lost.
  - Added the required column `badge` to the `use_cases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stats` to the `use_cases` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `benefits` on the `use_cases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "use_cases" DROP COLUMN "pdf_download_url",
ADD COLUMN     "badge" TEXT NOT NULL,
ADD COLUMN     "cta_subtitle" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "hero_subtitle" TEXT,
ADD COLUMN     "stats" JSONB NOT NULL,
ADD COLUMN     "use_case_param" TEXT,
DROP COLUMN "benefits",
ADD COLUMN     "benefits" JSONB NOT NULL,
ALTER COLUMN "hero_image" DROP NOT NULL;
