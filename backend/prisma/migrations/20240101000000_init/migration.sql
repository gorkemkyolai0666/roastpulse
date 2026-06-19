-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'roaster', 'sales', 'quality');

-- CreateEnum
CREATE TYPE "CuppingType" AS ENUM ('quality_check', 'sample_tasting', 'training', 'wholesale_visit');

-- CreateEnum
CREATE TYPE "CuppingStatus" AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('quoted', 'confirmed', 'roasting', 'packed', 'shipped', 'cancelled');

-- CreateEnum
CREATE TYPE "RoastLevel" AS ENUM ('light', 'medium', 'medium_dark', 'dark');

-- CreateEnum
CREATE TYPE "BeanOrigin" AS ENUM ('ethiopia', 'colombia', 'brazil', 'kenya', 'guatemala', 'indonesia', 'turkey', 'other');

-- CreateEnum
CREATE TYPE "ProcessingMethod" AS ENUM ('washed', 'natural', 'honey', 'anaerobic', 'other');

-- CreateTable
CREATE TABLE "Roastery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "district" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "taxNo" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roastery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'roaster',
    "specialty" TEXT NOT NULL DEFAULT '',
    "roasteryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "roasteryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupping" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 45,
    "type" "CuppingType" NOT NULL DEFAULT 'sample_tasting',
    "status" "CuppingStatus" NOT NULL DEFAULT 'scheduled',
    "notes" TEXT NOT NULL DEFAULT '',
    "roasterName" TEXT NOT NULL DEFAULT '',
    "customerId" TEXT NOT NULL,
    "roasteryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cupping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL DEFAULT '',
    "weightKg" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "roastLevel" "RoastLevel" NOT NULL DEFAULT 'medium',
    "status" "OrderStatus" NOT NULL DEFAULT 'quoted',
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "notes" TEXT NOT NULL DEFAULT '',
    "customerId" TEXT NOT NULL,
    "roastProfileId" TEXT,
    "roasteryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoastProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT NOT NULL DEFAULT '',
    "variety" TEXT NOT NULL DEFAULT '',
    "roastLevel" "RoastLevel" NOT NULL DEFAULT 'medium',
    "chargeTemp" INTEGER NOT NULL DEFAULT 200,
    "dropTemp" INTEGER NOT NULL DEFAULT 215,
    "durationMin" INTEGER NOT NULL DEFAULT 12,
    "description" TEXT NOT NULL DEFAULT '',
    "roasteryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoastProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GreenBean" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin" "BeanOrigin" NOT NULL DEFAULT 'other',
    "processing" "ProcessingMethod" NOT NULL DEFAULT 'washed',
    "stockKg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unitCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "supplier" TEXT NOT NULL DEFAULT '',
    "harvestYear" INTEGER NOT NULL DEFAULT 2024,
    "notes" TEXT NOT NULL DEFAULT '',
    "roasteryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GreenBean_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roasteryId_fkey" FOREIGN KEY ("roasteryId") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_roasteryId_fkey" FOREIGN KEY ("roasteryId") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cupping" ADD CONSTRAINT "Cupping_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cupping" ADD CONSTRAINT "Cupping_roasteryId_fkey" FOREIGN KEY ("roasteryId") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_roastProfileId_fkey" FOREIGN KEY ("roastProfileId") REFERENCES "RoastProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_roasteryId_fkey" FOREIGN KEY ("roasteryId") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoastProfile" ADD CONSTRAINT "RoastProfile_roasteryId_fkey" FOREIGN KEY ("roasteryId") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GreenBean" ADD CONSTRAINT "GreenBean_roasteryId_fkey" FOREIGN KEY ("roasteryId") REFERENCES "Roastery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

