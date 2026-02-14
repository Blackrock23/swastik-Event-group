from flask import Flask, render_template, request, redirect
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# Create database table
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    return render_template("login.html")

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email', '')
    password = request.form.get('password', '')

    # Basic validation
    if not email or not password:
        return "All fields are required!", 400

    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        cursor.execute("SELECT password FROM users WHERE email = ?", (email,))
        result = cursor.fetchone()
        conn.close()

        if result and check_password_hash(result[0], password):
            return "Login Successful!"
        else:
            return "Invalid email or password!", 401
    except sqlite3.Error as e:
        return f"Database error: {str(e)}", 500

@app.route('/register', methods=['POST'])
def register():
    email = request.form.get('email', '')
    password = request.form.get('password', '')

    # Basic validation
    if not email or not password:
        return "All fields are required!", 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)",
                       (email, hashed_password))

        conn.commit()
        conn.close()

        return "User Registered Successfully!", 201
    except sqlite3.IntegrityError:
        return "Email already exists!", 409
    except sqlite3.Error as e:
        return f"Database error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
