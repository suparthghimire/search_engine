from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api', methods=['POST', 'GET'])
def api():
    if request.method == 'POST':
        data = request.get_json()
        return jsonify(data)
    elif request.method == 'GET':
        data = request.args
        return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
        


