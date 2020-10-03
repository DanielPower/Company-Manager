BEGIN TRANSACTION;

ALTER TABLE "employee"
  ADD COLUMN "employee_number" INT;
UPDATE "employee"
  SET employee_number = "employee".id;
ALTER TABLE "employee"
  ALTER COLUMN "employee_number"
  SET NOT NULL;

COMMIT;
