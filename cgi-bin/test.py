#!/usr/bin/env python
import os
import cgi

if 'QUERY_STRING' in os.environ:
    query = cgi.parse_qs(os.environ['QUERY_STRING'])
else:
    query = {}

FILE = "/data.txt"
data = open(FILE, "r")
lines = data.readlines()
data.close()

MONEY = int(lines[0])
POPULATION = int(lines[1])
TEMPLE = int(lines[2])
TEMPLES = []
for posts in lines[3:3+TEMPLE]:
   TEMPLES.append([int(pos) for pos in posts.split(" ")])
GRID = []
for posts in lines[3+TEMPLE:]:
   GRID.append([int(pos) for pos in posts.split(" ")])

x = int(query["x"][0])
y = int(query["y"][0])

TEMPLE += 1
TEMPLES.append([x, y])

data = open(FILE, "w")
strTEMPLES = [str(posts[0])+" "+str(posts[1]) for posts in TEMPLES]
strGRID = []
for posts in GRID:
   strGRID.append(" ".join([str(pos) for pos in posts]))
data.write("\n".join([str(MONEY), str(POPULATION), str(TEMPLE)] + strTEMPLES + strGRID))
data.close()

print "Content-Type: text/html\n\n"
print x, y

data.close()
