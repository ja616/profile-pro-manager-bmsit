from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

def init_mysql(app):
    print("🔧 Connecting to DB with:")
    print("HOST:", os.getenv("DB_HOST"))
    print("USER:", os.getenv("DB_USER"))
    print("PASS:", os.getenv("DB_PASSWORD"))
    print("DB:", os.getenv("DB_NAME"))

    app.config['MYSQL_HOST'] = os.getenv("DB_HOST")
    app.config['MYSQL_USER'] = os.getenv("DB_USER")
    app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
    app.config['MYSQL_DB'] = os.getenv("DB_NAME")

    mysql = MySQL(app)
    return mysql
