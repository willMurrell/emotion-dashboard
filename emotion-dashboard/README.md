# Emotion Dashboard

Welcome to the Emotion Dashboard (Needs a better name) prototype. This documentation is an overview to hopefully help anyone who is trying to pick up where I left off.  There are markdown files in this folder containing all the methods and their comments and such.

Currently the website is also hosted online (through Render connected to the github repository) [right here](https://emotion-dashboard.onrender.com/home/)

Although I expect if anyone ends up working on this it will have been taken offline by then...

# How it works

The very broad overview is that this is a webapp running off Node JS, using Pug templates for the html.

To start the webapp locally: npm run start

The backend is pretty crude, and starts by turning xlsx files of each student's entries into CSV and then JSON files. If I had the time (or desire) I would redo the back end. All the data is added to maps and things and is then sent from the back end to the big, ugly javascript file called "populate.js". This file does populate the page, but also does literally everything else.  Each Pug page will call a "starter" method in populate.js.  That method will then call all the other methods that need to be called for that page.

# Unfinished Things

- The submission of blogs goes nowhere.  Needs to be integrated into the backend.  However this is probably best done by redoing the whole backend, so everything is nice and compatible!
- Self Report is hard coded.
- Self Report is not added to Student Blog page

- The blogs should display the most recent week's blog not always Week 1
- Hyperlinks of the graphs to take you to the course/team/student they are displaying
- Hyperlink / breadcrumbs on the titles of the pages.
- Maybe a little bit of style changes to the line graphs.  They don't scale overly well.

# Node JS tells me these are the dependencies!
-  body-parser@1.20.1
- browserify@17.0.0
-  chart.js@3.9.1
-  convert-csv-to-json@1.4.0
-  csv-stringify@6.2.1
-  express@4.18.2
-  json-2-csv@3.18.0
-  nodemon@2.0.20
-  papaparse@5.3.2
- path@0.12.7
- plotly.js-dist@2.16.2
- pug@3.0.2
- request@2.88.2
- xlsx@0.18.5
