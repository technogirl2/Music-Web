from flask import Flask, redirect, url_for, render_template

app = Flask(__name__)
@app.route("/")
def home():
    return render_template("Ed.html")

@app.route("/game")
def game():
    return render_template("Game.html")




if __name__ == "__main__":
    app.run(debug=True, port=8000)
