"""app.py

Simple Flask backend for the EcoSmart City demo.

What it does:
- Serves the frontend (index.html, style.css, app.js) from the same folder
- Provides demo API endpoints for issues

Run:
  python app.py
Then open:
  http://127.0.0.1:5000
"""

from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder=".", static_url_path="")

# Имитация базы данных
issues = [
    {"id": 1, "type": "Overflow", "status": "In Progress"},
    {"id": 2, "type": "Chemicals", "status": "Resolved"}
]

@app.route("/")
def home():
    # Serve the frontend file
    return send_from_directory(".", "index.html")


@app.after_request
def add_cors_headers(response):
    # Helps when the frontend is served from the same Flask app.
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

@app.route('/api/issues', methods=['GET'])
def get_issues():
    return jsonify(issues)

@app.route('/api/report', methods=['POST'])
def report_issue():
    data = request.json
    new_issue = {
        "id": len(issues) + 1,
        "type": data.get('type'),
        "status": "Reported"
    }
    issues.append(new_issue)
    return jsonify({"message": "Issue reported successfully!", "id": new_issue['id']}), 201

if __name__ == '__main__':
    app.run(debug=True)