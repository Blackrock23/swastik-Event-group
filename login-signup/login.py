from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# Get the directory where this script is located
basedir = os.path.dirname(os.path.abspath(__file__))

# Create database table
def init_db():
    db_path = os.path.join(basedir, 'database.db')
    conn = sqlite3.connect(db_path)
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

# Initialize database
init_db()

# Route to serve login page
@app.route('/login')
def login_page():
    return render_template('login.html')

# Route to serve signup page
@app.route('/signup')
def signup_page():
    return render_template('signup.html')

# Login API endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '')
    password = data.get('password', '')

    # Basic validation
    if not email or not password:
        return jsonify({'success': False, 'message': 'All fields are required!'}), 400

    try:
        db_path = os.path.join(basedir, 'database.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute("SELECT password FROM users WHERE email = ?", (email,))
        result = cursor.fetchone()
        conn.close()

        if result and check_password_hash(result[0], password):
            return jsonify({'success': True, 'message': 'Login Successful!'})
        else:
            return jsonify({'success': False, 'message': 'Invalid email or password!'}), 401
    except sqlite3.Error as e:
        return jsonify({'success': False, 'message': f'Database error: {str(e)}'}), 500

# Register API endpoint
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email', '')
    password = data.get('password', '')

    # Basic validation
    if not email or not password:
        return jsonify({'success': False, 'message': 'All fields are required!'}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    try:
        db_path = os.path.join(basedir, 'database.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)",
                       (email, hashed_password))

        conn.commit()
        conn.close()

        return jsonify({'success': True, 'message': 'User Registered Successfully!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'message': 'Email already exists!'}), 409
    except sqlite3.Error as e:
        return jsonify({'success': False, 'message': f'Database error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
