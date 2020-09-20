#!/usr/bin/env python3
import psycopg2
import yaml
import sys


def reset_database():
    choice = input(
        "Are you sure you want to reset the database? All data will be lost. [y/N]: "
    )
    if choice.upper() == "Y":
        print("Clearing database")
        db = get_db(name="postgres")
        db.autocommit = True
        cursor = db.cursor()
        database_name = "companymanager"
        cursor.execute(f"""DROP DATABASE IF EXISTS "{database_name}";""")
        cursor.execute(f"""CREATE DATABASE "{database_name}";""")
        db.close()
        print("Performing initial migration")
        db = get_db()
        migrations = get_migrations()
        for migration in migrations:
            run_upgrade(db, migration)
        set_current_migration(db, migrations[-1]["name"])
        db.close()


def upgrade_database():
    db = get_db()
    migrations = get_migrations()
    current_migration_index = get_current_migration_index(db, migrations)
    for migration in migrations[current_migration_index + 1:]:
        run_upgrade(db, migration)
    set_current_migration(db, migrations[-1]["name"])
    db.close()


def downgrade_database():
    db = get_db()
    migrations = get_migrations()
    current_migration_index = get_current_migration_index(db, migrations)
    if current_migration_index != 0:
        run_downgrade(db, migrations[current_migration_index])
        set_current_migration(db, migrations[current_migration_index - 1]["name"])
    db.close()


def get_db(
    host="localhost",
    user="postgres",
    password="password",
    name="companymanager",
):
    return psycopg2.connect(
        f"host={host} user={user} password={password} dbname={name}"
    )


def get_migrations():
    with open("./migrations.yaml", "r") as file:
        return yaml.load(file, Loader=yaml.SafeLoader)


def get_current_migration_name(db):
    cursor = db.cursor()
    cursor.execute('SELECT "name" FROM "_migration" LIMIT 1')
    return cursor.fetchone()[0]


def get_current_migration_index(db, migrations):
    current_migration_name = get_current_migration_name(db)
    for index, migration in enumerate(migrations):
        if migration["name"] == current_migration_name:
            return index


def run_upgrade(db, migration):
    cursor = db.cursor()
    name = migration["name"]
    print(f"running upgrade: {name}")
    with open(f"./{name}/upgrade.sql", "r") as file:
        cursor.execute(file.read())


def run_downgrade(db, migration):
    cursor = db.cursor()
    name = migration["name"]
    print(f"running downgrade: {name}")
    with open(f"./{name}/downgrade.sql", "r") as file:
        cursor.execute(file.read())


def set_current_migration(db, name):
    cursor = db.cursor()
    cursor.execute(
        f"""
        DROP TABLE IF EXISTS "_migration";
        CREATE TABLE "_migration" (
            "name"  TEXT NOT NULL
        );
        INSERT INTO "_migration" VALUES('{name}')
        """
    )


if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "reset":
            reset_database()
            sys.exit()
        elif sys.argv[1] == "upgrade":
            upgrade_database()
            sys.exit()
        elif sys.argv[1] == "downgrade":
            downgrade_database()
            sys.exit()
    print("Expected an argument, one of: upgrade, downgrade, reset")
