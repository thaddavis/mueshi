-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_genres" (
    "userId" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "user_genres_pkey" PRIMARY KEY ("userId","genreId")
);

-- CreateIndex
CREATE INDEX "UserIndex" ON "user_genres"("userId");

-- CreateIndex
CREATE INDEX "GenreIndex" ON "user_genres"("genreId");

-- AddForeignKey
ALTER TABLE "user_genres" ADD CONSTRAINT "user_genres_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_genres" ADD CONSTRAINT "user_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
