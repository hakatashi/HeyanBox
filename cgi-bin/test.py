#!/usr/bin/env python
import os
import cgi

if 'QUERY_STRING' in os.environ:
    query = cgi.parse_qs(os.environ['QUERY_STRING'])
else:
    query = {}

print "Content-Type: text/html\n\n"
print int(query["x"][0])+int(query["y"][0])