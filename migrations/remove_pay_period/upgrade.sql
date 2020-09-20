BEGIN TRANSACTION;

ALTER TABLE "shift"
    ADD COLUMN "employee_id" INT NOT NULL;
UPDATE "shift"
    SET employee_id = "pay_period".employee_id
    FROM "pay_period"
    WHERE "pay_period".id = "shift".pay_period_id; 
ALTER TABLE "shift"
    DROP COLUMN "pay_period_id";
DROP TABLE "pay_period";

COMMIT;
