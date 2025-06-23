from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'nsoutsourceinfotech_db'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    if not name or not email:
        return jsonify({'status': 'error', 'message': 'Name and Email are required.'}), 400

    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)', (name, email, message))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'status': 'success', 'message': 'Message received! We will get back to you soon.'})

if __name__ == '__main__':
    app.run(debug=True)
