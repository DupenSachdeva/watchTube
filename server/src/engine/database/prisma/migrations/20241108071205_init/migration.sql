-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channelId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "channelName" TEXT NOT NULL,
    "channelDescription" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_channelId_key" ON "User"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelName_key" ON "Channel"("channelName");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_userId_key" ON "Channel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_userId_key" ON "Channel"("id", "userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
