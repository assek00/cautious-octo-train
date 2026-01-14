# app.py
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Имитация базы данных
issues = [
    {"id": 1, "type": "Overflow", "status": "In Progress"},
    {"id": 2, "type": "Chemicals", "status": "Resolved"}
]

@app.route('/')
def home():
    return "Waste Management API is Running"

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
