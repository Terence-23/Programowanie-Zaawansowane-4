from flask import Flask, render_template, request, redirect, url_for
from random import randint
from markupsafe import escape
import sqlite3
import hashlib

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/profile/<user>')
def profile(user):
    return render_template("profile.html", user=user)
@app.route('/info', methods=['GET'])
def info():
    return render_template("info.html", args=[(i, request.args[i]) for i in request.args])


@app.route("/user/<id>")
def user(id):
    return render_template('user.html', id=id)

@app.route('/users')
def users():
    cur = sqlite3.connect("webapp_server").cursor()
    res = cur.execute('Select * from users')
    data = res.fetchall()

    table = "</tr><tr>".join((f"<td>{"</td><td>".join(str(c) for c in r)}</td>" for r in data))

    return f"<table border=1><tr><th>id</th><th>name</th><th>email</th><th>password</th></tr><tr>{table}</table>"

@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method != 'POST':
        return render_template('login.html')
    if valid_login(request.form['user'], request.form['pass']):
        return redirect(f'/profile/{escape(request.form['user'])}')
    else:
        return render_template('login.html', error='Bad password')

def valid_login(email, password, *args, **kwargs):

    con = sqlite3.connect("webapp_server")
    cur = con.cursor()
    cur.execute(f"SELECT password FROM users where email='{escape(email)}'") 
    pwd = cur.fetchone()[0]
    con.close()
    return True if pwd == hashlib.sha256(str.encode(password)).hexdigest() else False

@app.route('/register', methods=['GET', 'POST'])
def register():

    if request.method != 'POST':
        return render_template('register.html')
    
    con = sqlite3.connect("webapp_server")
    cur = con.cursor()
    user = (request.form['name'] , request.form['user'], hashlib.sha256(str.encode(request.form['pass'])).hexdigest())
    cur.execute(f'''
    Insert into users (name, email, password)
    values (?, ?, ?)''', user)

    con.commit()
    con.close()
    
    return redirect(f'/profile/{escape(request.form['user'])}')
    
