from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
import os

# local imports
from search.controller import getSearch

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.environ.get('ALLOW_ORIGIN')}})

@app.route('/api/search', methods=['POST', 'GET'])
def search():
   return getSearch()

if __name__ == '__main__':
    app.run(debug=True)
        


