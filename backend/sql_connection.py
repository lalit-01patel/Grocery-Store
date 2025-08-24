import mysql.connector

__conn = None


def get_sql_connection():
    print("Opening mysql connection")
    global __conn

    if __conn is None:
        __conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Lalit@123",
            database="grocery_store"
        )
    return __conn
