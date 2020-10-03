BEGIN TRANSACTION;

CREATE TABLE "employee" (
	"id" INT NOT NULL,
	"employee_number" INT NOT NULL,
	"name" TEXT NOT NULL,
	"password_hash" TEXT NOT NULL,
	"is_admin" BOOLEAN NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE "pay_period" (
	"id" SERIAL NOT NULL,
	"date" DATE NOT NULL,
	"employee_id" INT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("employee_id") REFERENCES "employee"("id")
);
CREATE TABLE "job" (
	"id" INT NOT NULL,
	"name" TEXT NOT NULL,
	"hour_type" INT NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE "shift" (
	"id" SERIAL NOT NULL,
	"date" DATE NOT NULL,
	"description" TEXT NOT NULL,
	"hours" INT NOT NULL,
	"banked_hours" INT NOT NULL,
	"night_shift" BOOLEAN NOT NULL,
	"job_id" INT NOT NULL,
	"pay_period_id" INT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("job_id") REFERENCES "job"("id"),
	FOREIGN KEY("pay_period_id") REFERENCES "pay_period"("id")
);

COMMIT;
