CREATE TYPE "InterestType" AS ENUM ('SIMPLE', 'COMPOUND');
CREATE TYPE "CompoundingFrequency" AS ENUM ('MONTHLY', 'QUARTERLY', 'SEMIANNUAL', 'ANNUAL');

ALTER TABLE "simulations"
  ADD COLUMN "interestType" "InterestType" NOT NULL DEFAULT 'COMPOUND',
  ADD COLUMN "compoundingFrequency" "CompoundingFrequency" NOT NULL DEFAULT 'MONTHLY';

ALTER TABLE "simulations"
  DROP CONSTRAINT IF EXISTS "simulations_interestRate_check",
  DROP CONSTRAINT IF EXISTS "simulations_profit_check";
