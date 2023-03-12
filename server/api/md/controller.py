from flask import jsonify
import os
def getMarkdownContent():
    path = os.getcwd() + "/md/md.md"
    print("path")
    print(path)
    print("--------------xx-------------")
    with open(path, "r") as f:
        content = f.read()
    return jsonify({"content": content}), 200