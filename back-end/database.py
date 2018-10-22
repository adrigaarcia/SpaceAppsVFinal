#!/usr/bin/env python

import sqlite3



conn = sqlite3.connect('launch.db')
c = conn.cursor()

# Create table
def crear():
	c.execute('''CREATE TABLE launches
	             (id INTEGER PRIMARY KEY, name TEXT, fecha date, url text, latitude real, longitude real, location text, rocket text)''')

# Insert a row of data


def introducir(nombre, fecha, url, latitud, longitud, location, cohete):
	c.execute('''INSERT INTO launches(name, fecha, url, latitude, longitude, location, rocket) VALUES (?,?,?,?,?,?,?)''', (nombre, fecha, url, float(latitud), float(longitud), location, cohete,))
	conn.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.

def cerrar():
	conn.close()
