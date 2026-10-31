-- CreateEnum
CREATE TYPE "AssetCategory" AS ENUM ('STOCKS', 'BONDS', 'MUTUAL_FUNDS', 'REAL_ESTATE', 'CRYPTO', 'FIXED_INCOME');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" "AssetCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedAnnualRate" DECIMAL(6,2) NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'AOA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulations" (
    "id" UUID NOT NULL,
    "initialCapital" DECIMAL(14,2) NOT NULL,
    "duration" INTEGER NOT NULL,
    "interestRate" DECIMAL(6,2) NOT NULL,
    "finalAmount" DECIMAL(16,2) NOT NULL,
    "profit" DECIMAL(16,2) NOT NULL,
    "assetId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assets_name_key" ON "assets"("name");

-- CreateIndex
CREATE INDEX "assets_category_idx" ON "assets"("category");

-- CreateIndex
CREATE INDEX "assets_riskLevel_idx" ON "assets"("riskLevel");

-- CreateIndex
CREATE INDEX "simulations_assetId_idx" ON "simulations"("assetId");

-- CreateIndex
CREATE INDEX "simulations_createdAt_idx" ON "simulations"("createdAt");

-- AddForeignKey
ALTER TABLE "simulations" ADD CONSTRAINT "simulations_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CheckConstraints
ALTER TABLE "assets"
    ADD CONSTRAINT "assets_estimatedAnnualRate_check" CHECK ("estimatedAnnualRate" >= 0),
    ADD CONSTRAINT "assets_currency_check" CHECK ("currency" ~ '^[A-Z]{3}$');

ALTER TABLE "simulations"
    ADD CONSTRAINT "simulations_initialCapital_check" CHECK ("initialCapital" > 0),
    ADD CONSTRAINT "simulations_initialCapital_max_check" CHECK ("initialCapital" <= 1000000000),
    ADD CONSTRAINT "simulations_duration_check" CHECK ("duration" > 0),
    ADD CONSTRAINT "simulations_duration_max_check" CHECK ("duration" <= 1200),
    ADD CONSTRAINT "simulations_interestRate_check" CHECK ("interestRate" >= 0),
    ADD CONSTRAINT "simulations_interestRate_max_check" CHECK ("interestRate" <= 100),
    ADD CONSTRAINT "simulations_finalAmount_check" CHECK ("finalAmount" >= 0),
    ADD CONSTRAINT "simulations_profit_check" CHECK ("profit" >= 0),
    ADD CONSTRAINT "simulations_profit_consistency_check" CHECK ("profit" = "finalAmount" - "initialCapital");
