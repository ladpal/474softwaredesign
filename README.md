# stackBarChart
This javascript function creates a stacked bar chart from a .csv file

## Instructions
Create a root folder and place an empty HTML file named 'index.html'.
Inside root, create folder 'js' and place stackBarChart.js inside.

In the head of index.html, refer to stackBarChart.js as 
`<script type="text/javascript" src="./js/stackBarChart.js"></script>`

and the d3 library as 
`<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>`


Inside the body of index.html, create script tags and create an instance
of stackBarChart with the following call

var foo = new stackBarChart();

## stackBarChart.FileGlobal(filepath)
Function to specify the name and location of the .csv file to populate
the chart.

filepath: Full filepath of .csv file as a string. Filepath is relative to
the index.html file. For example, a .csv file in the 'js' folder would be

foo.FileGlobal("./js/bar.csv");

The .csv file must satisfy the following conditions:

* Every row of data is equal to a whole bar in the chart, each individual
  value in the column corresponds to the length of the "sub-bar."
 
* All values are numerical, with the exception of the first row. 
  The first row should consist of text that describes the meaning of the columns
  Otherwise, non-numerical columns may be removed. 

* No missing values

Files may be modified or created from different file formats so long as they
conform to standard .csv formatting `https://en.wikipedia.org/wiki/Comma-separated_values#Example`

## stackBarChart.createGraph()
Displays a stacked bar chart of the .csv data on an empty HTML page.
Nothing will be displayed in the event of an improperly formatted or 
improperly referred .csv file.

foo.fileGlobal(bar) must have been previously called.

Function must be called after values changed from the default to appear
on the screen.

## stackBarChart.Width(num)
Specifies the width of the chart. 500 by default.

num: New width for the chart, in pixels. 

## stackBarChart.Height(num)
Specifies the height of the chart. 500 by default.

num: New height for the chart, in pixels. 

## stackBarChart.Padding(num)
Specifies the amount of padding between bars. 0.1 by deault.

num: New amount of padding between bars, in pixels.