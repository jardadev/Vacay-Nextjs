/*
  Warnings:

  - You are about to drop the `_Favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Favorites" DROP CONSTRAINT "_Favorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites" DROP CONSTRAINT "_Favorites_B_fkey";

-- DropTable
DROP TABLE "_Favorites";

-- CreateTable
CREATE TABLE "FavoritesOnHome" (
    "homeId" TEXT NOT NULL,
    "favoritedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavoritesOnHome_pkey" PRIMARY KEY ("homeId","favoritedById")
);

-- AddForeignKey
ALTER TABLE "FavoritesOnHome" ADD CONSTRAINT "FavoritesOnHome_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritesOnHome" ADD CONSTRAINT "FavoritesOnHome_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
