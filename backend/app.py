
import sqlite3

from flask import Flask, jsonify, request, g
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
DATABASE = "codes.db"

def get_db():
    if 'db' not in g:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        g.db = conn
    return g.db

@app.teardown_appcontext
def close_db(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200

@app.route("/codes/search", methods=["GET"])
def search_codes():
    query = request.args.get("query", "").strip()
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    db = get_db()
    cursor = db.execute("SELECT code, description, chapter FROM codes WHERE code LIKE ? OR description LIKE ?", (f"%{query}%", f"%{query}%"))
    rows = cursor.fetchall()
    results = [{"code": row["code"], "description": row["description"], "chapter": row["chapter"]} for row in rows]
    return jsonify(results), 200

@app.route("/codes/<code>", methods=["GET"])
def get_code(code):
    db = get_db()
    cursor = db.execute("SELECT code, description, chapter FROM codes WHERE code = ?", (code,))
    row = cursor.fetchone()
    if row is None:
        return jsonify({"error": "Code not found"}), 404
    result = {"code": row["code"], "description": row["description"], "chapter": row["chapter"]}
    return jsonify(result), 200
    
if __name__ == "__main__":
    app.run(debug=True)
