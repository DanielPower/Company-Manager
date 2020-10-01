BEGIN TRANSACTION;

ALTER TABLE "employee"
		ADD COLUMN "start_date" DATE;
UPDATE "employee"
		SET "start_date" = '2020-01-01';
ALTER TABLE "employee"
		ALTER COLUMN "start_date"
		SET NOT NULL;

COMMIT;
