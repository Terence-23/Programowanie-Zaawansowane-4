import sqlite3


DB_CON = sqlite3.connect("webapp_server")
cur = DB_CON.cursor()

cur.execute('''create table users (
    id integer primary key autoincrement, 
    name, 
    email, 
    password
)''')