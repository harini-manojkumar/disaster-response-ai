import sqlite3

from pathlib import Path


# ==========================================
# PROJECT ROOT
# ==========================================

PROJECT_ROOT = Path(
    __file__
).resolve().parents[2]


DB_PATH = (
    PROJECT_ROOT
    / "data"
    / "disaster_reports.db"
)


# ==========================================
# INITIALIZE DATABASE
# ==========================================

def init_database():

    DB_PATH.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    connection = sqlite3.connect(
        DB_PATH
    )

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reports (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            emergency_type TEXT NOT NULL,

            description TEXT NOT NULL,

            latitude REAL,

            longitude REAL,

            people_affected INTEGER,

            risk_score INTEGER DEFAULT 0,

            priority TEXT DEFAULT 'PENDING',

            synced INTEGER DEFAULT 0,

            created_at TIMESTAMP
                DEFAULT CURRENT_TIMESTAMP

        )
    """)

    connection.commit()

    connection.close()


# ==========================================
# SAVE REPORT
# ==========================================

def save_report(
    emergency_type,
    description,
    latitude,
    longitude,
    people_affected
):

    init_database()

    connection = sqlite3.connect(
        DB_PATH
    )

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO reports
        (
            emergency_type,
            description,
            latitude,
            longitude,
            people_affected
        )

        VALUES (?, ?, ?, ?, ?)
    """, (

        emergency_type,

        description,

        latitude,

        longitude,

        people_affected

    ))

    connection.commit()

    report_id = cursor.lastrowid

    connection.close()

    return report_id


# ==========================================
# GET LOCAL REPORTS
# ==========================================

def get_reports():

    init_database()

    connection = sqlite3.connect(
        DB_PATH
    )

    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            emergency_type,
            description,
            latitude,
            longitude,
            people_affected,
            risk_score,
            priority,
            synced,
            created_at

        FROM reports

        ORDER BY created_at DESC
    """)

    reports = cursor.fetchall()

    connection.close()

    return reports

#initialize database when this module is loades
init_database()