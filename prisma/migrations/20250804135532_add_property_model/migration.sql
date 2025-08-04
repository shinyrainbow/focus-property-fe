-- CreateEnum
CREATE TYPE "public"."ListingType" AS ENUM ('sale', 'rent');

-- CreateEnum
CREATE TYPE "public"."PropertyStatus" AS ENUM ('available', 'pending', 'sold', 'rented');

-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('condo', 'house', 'land', 'townhouse');

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "listingType" "public"."ListingType" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "location" TEXT NOT NULL,
    "propertyType" "public"."PropertyType" NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "floor" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "status" "public"."PropertyStatus" NOT NULL DEFAULT 'available',
    "views" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
