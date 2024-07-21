-- CreateTable
CREATE TABLE "user_interests" (
    "userId" TEXT NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "user_interests_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "interest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "interest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserInterestIndex" ON "user_interests"("userId");

-- CreateIndex
CREATE INDEX "InterestIndex" ON "user_interests"("interestId");

-- CreateIndex
CREATE UNIQUE INDEX "interest_name_key" ON "interest"("name");

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
