-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('Public', 'Private', 'Unlisted');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Entertainment', 'Education', 'ScienceandTechnology', 'Music', 'Gaming');

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'Public',
    "Category" "Category" NOT NULL,
    "tags" TEXT[],
    "ageRestriction" BOOLEAN NOT NULL DEFAULT false,
    "monetization" BOOLEAN NOT NULL DEFAULT false,
    "premiere" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
