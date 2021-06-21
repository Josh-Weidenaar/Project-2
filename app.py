
from flask import Flask, jsonify, render_template
import pymongo
from flask_pymongo import PyMongo
from bson import json_util
import json

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/beard_db"
mongo = PyMongo(app)

@app.route("/api/data/all")
def returndata():
    documents = mongo.db.book_gender.find()
    dict_db = {}
    test_list = []
    for document in documents:
        test_list.append(document)
    dict_db['values'] = test_list
    return json.loads(json_util.dumps(dict_db))

if __name__ == "__main__":
    app.run(debug=True)