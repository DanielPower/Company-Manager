BEGIN TRANSACTION;

ALTER TABLE "employee"
  DROP COLUMN "employee_number";

COMMIT;
