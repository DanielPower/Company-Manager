BEGIN TRANSACTION;

CREATE TABLE "employee" (
	"id" INT NOT NULL,
	"name" TEXT NOT NULL,
	"passwordHash" TEXT NOT NULL,
	"isAdmin" BOOLEAN NOT NULL,
	"startDate" DATE NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE "payPeriod" (
	"id" SERIAL NOT NULL,
	"date" DATE NOT NULL,
	"employeeId" INT NOT NULL,
	"isSubmitted" BOOLEAN DEFAULT FALSE,
	PRIMARY KEY("id"),
	FOREIGN KEY("employeeId") REFERENCES "employee"("id")
);
CREATE TABLE "job" (
	"id" INT NOT NULL,
	"name" TEXT NOT NULL,
	"hourType" INT NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE "shift" (
	"id" SERIAL NOT NULL,
	"date" DATE NOT NULL,
	"description" TEXT NOT NULL,
	"hoursWorked" INT NOT NULL,
	"hoursBanked" INT NOT NULL,
	"nightShift" BOOLEAN NOT NULL,
	"jobId" INT NOT NULL,
	"payPeriodId" INT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("jobId") REFERENCES "job"("id"),
	FOREIGN KEY("payPeriodId") REFERENCES "payPeriod"("id")
);

COMMIT;
