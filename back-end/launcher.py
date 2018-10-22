"""
Modulo de los lanzamientos de cohetes
"""

from flask import Flask, jsonify
from flask_restful import reqparse, abort, Api, Resource
from datetime import datetime
from database import *
import requests
import json
import sqlite3


app = Flask(__name__)
api = Api(app)

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def abort_if_launcher_doesnt_exist(launcher_id):
    if launcher_id not in LAUNCHER:
        abort(404, message="Launcher {} doesn't exist".format(launcher_id))

parser = reqparse.RequestParser()
parser.add_argument('task')

# Todo
# shows a single todo item and lets you delete a todo item
class Launcher(Resource):
    def get(self, launcher_id):
        abort_if_launcher_doesnt_exist(launcher_id)
        return LAUNCHER[launcher_id]

# TodoList
# shows a list of all todos, and lets you POST to add new tasks
class LauncherList(Resource):
    def get(self):

            conn = sqlite3.connect('launch.db')
            c = conn.cursor()
            result = c.execute('''SELECT * FROM launches WHERE fecha >= date('now') ORDER BY fecha LIMIT 100''')

            items = []

            for launch in result:
                items.append({'id' : launch[0],'name' : launch[1],'date' : launch[2],'url' : launch[3],'rocket' : launch[7],'coordinates' : [launch[4],launch[5]],'location' : launch[6]})

            conn.close()

            resp = jsonify({'items': items})
            resp.headers["Access-Control-Allow-Origin"] = "*"
            resp.headers["Access-Control-Allow-Headers"] = "*"



            return resp

##
## Actually setup the Api resource routing here
##
api.add_resource(LauncherList, '/launcher')
api.add_resource(Launcher, '/launcher/<string:launcher_id>')


if __name__ == '__main__':
    app.run(debug=True)
