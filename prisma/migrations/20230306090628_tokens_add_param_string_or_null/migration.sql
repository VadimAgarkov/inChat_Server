-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "access_token" DROP NOT NULL,
ALTER COLUMN "refresh_token" DROP NOT NULL;
