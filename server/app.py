from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/profile')
def profile():
    return render_template("profile.html")
@app.route('/info')
def info():
    return render_template("info.html")

