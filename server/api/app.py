from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
import os

# local imports
from search.controller import getSearch
from md.controller import getMarkdownContent

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.environ.get('ALLOW_ORIGIN')}})

@app.route('/api/search', methods=['GET'])
def search():
   return getSearch()
@app.route('/api/markdown', methods=['GET'])
def md():
   return getMarkdownContent()

if __name__ == '__main__':
    app.run(debug=True)
        


