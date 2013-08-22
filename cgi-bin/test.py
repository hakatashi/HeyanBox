#!/usr/bin/env python
import cgi
 
form = cgi.FieldStorage()
x = form["x"].value
y = form["y"].value
 
print '''Content-type: text/html\n
<html>
<body><h1>'''

print x+", "+y

print '''</h1></body>
</html>
'''