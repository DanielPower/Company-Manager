BEGIN TRANSACTION;

ALTER TABLE "pay_period"
  DROP COLUMN "is_submitted";

COMMIT;
