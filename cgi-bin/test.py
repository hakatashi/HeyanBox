#!/usr/bin/env python
import cgi
import cgitb; cgitb.enable()

html = '''Content-type: text/html\n
<html>
<body><h1>
%d
</h1></body>
</html>
'''

form = cgi.FieldStorage()
pos = [form["x"].value, form["y"].value]

hoge = int(pos[0])+int(pos[1])

print html % hoge

'''
if not (form.has_key("x") and form.has_key("y")):
    print "<H1>Error</H1>"
    print "Please fill in the name and addr fields."
    return
'''
