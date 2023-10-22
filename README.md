# group-project-3
## Data Visualisation Victoria Road Accidents 2006 to 2020
### Project Team 9: Jack Hastings, Eric Tran, Akbar Fadillah and Katharine Tamas

In this scenario, our team has built an interactive web application, displaying various maps and charts representing Victorian road accidents from 2006 to 2020. This involved the creation of an ETL (Extract, Transform, Load) Pipeline. Crash Data was sourced from the DataVIC website (https://discover.data.vic.gov.au/dataset/crash-stats-data-extract) in the form of CSV files. The CSV files were cleaned and exploratory analysis was performed in Jupyter Notebook. An Entity Relationship Diagram (ERD) was created, along with a table schema, before uploading the data into a Postgres database. Python Flash-powered APIs were created. Finally, the web application was built using HTML, CSS and Javascript coding.


![image](https://github.com/Nisloen/group-project-3/assets/132874272/d54fce98-c748-449d-b8ba-8685e8452649)



**Repository Folders and Contents:**
- Cleaned_Datasets:
  - accident_cleaned.csv
  - atmospheric_cond_cleaned.csv
  - master_accident_cleaned.csv
  - node_cleaned.csv
  - person_cleaned.csv
  - road_surface_cond_cleaned.csv
  - vehicle_cleaned.csv
- Cleaning_Scripts:
  - accident_cleaned.ipynb
  - accident_master_cleaned.ipynb
  - atmospheric_cond_cleaned.ipynb
  - node_cleaned.ipynb
  - person_cleaned.ipynb
  - road_surface_cond_cleaned.ipynb
  - vehicle_cleaned.ipynb
- Datasets:
  - ACCIDENT.csv
  - ATMOSPHERIC_COND.csv
  - NODE.csv
  - PERSON.csv
  - ROAD_SURFACE_COND.csv
  - VEHICLE.csv
- ERD:
  - QuickDBD-VIC ROAD ACCIDENTS DATA 1_1_2006 to 1_11_2020.pdf
  - QuickDBD-VIC ROAD ACCIDENTS DATA 1_1_2006 to 1_11_2020.png
- Exploratory_Analysis_Output:
  - all_age_barchart.png
  - all_age_horizontal_barchart.png
  - fatal_age_barchart.png
  - fatal_region_piechart.png
  - fatal_urban_piechart.png
  - nonfatal_age_barchart.png
  - nonfatal_region_piechart.png
  - nonfatal_urban_piechart.png
  - road_accidents_linechart.png
  - road_accidents_map_DEG_URBAN_NAME.png
  - road_accidents_map_REGION_NAME.png
- Exploratory_Analysis_Scripts:
  - Charts_Road_Fatalities.ipynb
  - Map_Road_Fatalities.ipynb
- Other:
  - crashstats_user_guide_and_appendices.pdf
- Presentation:
  -  Victoria Car Accident - Group 9 Project 3 Presentation.pptx
- static:
  - images:
    - car-crash.png
    - Driving-road-in-Victoria.jpeg
  - chartsfilter.js
  - cluster.js
  - linecharts.js
  - mapcircles.js
  - style.css
- api.py
- index.html
- to_sql.py


## Table of Contents

- [About](#about)
    - [Part 1: Clean Data and Perform Exploratory Analysis](#part-1-clean-data-and-perform-exploratory-analysis)
    - [Part 2: Create the Project Database and Import Data](#part-2-create-the-project-database-and-import-data)
    - [Part 3: Create the Flask Powered API](#part-3-create-the-flask-powered-api)
    - [Part 4: Create the Web Application](#part-4-create-the-web-application)
- [Getting Started](#getting-started)
- [Installing](#installing)
- [Contributing](#contributing)
- [Sources](#sources)


## About
### Part 1: Clean Data and Perform Exploratory Analysis

At the beginning, we used Jupyter Notebook to import six CSV files, that were cleaned, manipulated and merged to create three dataframes. The dataframes were then exported into csv files. Exploratory Analysis was performed to gain an understanding of the data and possible charts and maps to display on the final web application. The key insights we discovered were:
1. With the exception of 2020, the number of road accidents per year has remained fairly constant since 2006, indicating that more needs to be done to improve road safety.
2. March is the worst month generally for road accidents, fatal and non fatal.
3. The majority of fatal road accidents occur in:
    - rural victoria: 2,144 or 53.15%,
    - 100+ speed zone, 
    - 30-39 yr olds: 592,
    - Saturday or Sunday (depending on the year).
4. The majority of non-fatal road accidents occur in:
    - urban settings: 326,757 or 67.31%
    - 60 speed zone, 
    - 30-39 yr olds: 84,047
    - on a weekday.

**Resource Files We Used:**
  - ACCIDENT.csv
  - ATMOSPHERIC_COND.csv
  - NODE.csv
  - PERSON.csv
  - ROAD_SURFACE_COND.csv
  - VEHICLE.csv

**Our Jupyter Notebook Python Cleaning Scripts:**
  - accident_cleaned.ipynb
  - accident_master_cleaned.ipynb
  - atmospheric_cond_cleaned.ipynb
  - node_cleaned.ipynb
  - person_cleaned.ipynb
  - road_surface_cond_cleaned.ipynb
  - vehicle_cleaned.ipynb

**Cleaned Files We Created:**
  - accident_cleaned.csv
  - atmospheric_cond_cleaned.csv
  - master_accident_cleaned.csv
  - node_cleaned.csv
  - person_cleaned.csv
  - road_surface_cond_cleaned.csv
  - vehicle_cleaned.csv

**Our Exploratory Analysis Scripts**:
  - Charts_Road_Fatalities.ipynb
  - Map_Road_Fatalities.ipynb
    
**Exploratory Analysis Images Created**:
  - all_age_barchart.png
  - all_age_horizontal_barchart.png
  - fatal_age_barchart.png
  - fatal_region_piechart.png
  - fatal_urban_piechart.png
  - nonfatal_age_barchart.png
  - nonfatal_region_piechart.png
  - nonfatal_urban_piechart.png
  - road_accidents_linechart.png
  - road_accidents_map_DEG_URBAN_NAME.png
  - road_accidents_map_REGION_NAME.png

**Tools/Libraries We Imported:**
   - pandas library: for data manipulation and analysis
   - pathlib library: to create and manipulate file and directory paths easily
   - matplotlib library: to create plots including line and bar charts
   - geopandas library: to create maps and visualise geopspatial data
   - shapely.geometry library: to represent specific locations on the Earth's surface (using longitude and latitude in this case)


### Part 2: Create the Project Database and Import Data

In this section, using QuickDBD, we sketched an ERD to form a table schema of the three CSV files we created in Part 1 above. We identified the dependencies between each table (primary and foreign keys), their relationships (one-one/one-many, many-one) and the relevant datatypes for each column. We created a SQL database (project_db) in Postgres through pgAdmin. CSV files generated in Part 1 were imported into relevant tables using using python SQLAlchemy in Visual Studio Code (to_sql.py). In order to create the connection between python and postgres, we installed psycopg2 (PostgreSQL adapter).

**ERD Diagram:**
 - ERD Diagram: QuickDBD-VIC ROAD ACCIDENTS DATA 1_1_2006 to 1_11_2020.png
![QuickDBD-VIC ROAD ACCIDENTS DATA 1_1_2006 to 1_11_2020](https://github.com/Nisloen/group-project-3/assets/132874272/30eae2a9-fd5c-4002-a01e-f80679369893)

**Resource Files We Used:**
  - master_accident_cleaned.csv
  - person_cleaned.csv
  - vehicle_cleaned.csv

**Our Python Script:**
  - To create and load data to SQL Database: to_sql.py

**Tables loaded into project_db:**

![image](https://github.com/Nisloen/group-project-3/assets/132874272/31351c90-83e8-4d41-865e-1d6c0c2aa638)


**Tools/Libraries We Imported:**
   - pandas library: for data manipulation and analysis
   - sqlalchemy library: provides the SQL toolkit and Object-Relational Mapper (ORM) functionality. The create_engine function is to create a database engine to connect with the database in order to interact with the database, and perform operations such as SQL queries

### Part 3: Create the Flask Powered API
We then created an API with 2 routes http://127.0.0.1:5000/api/v1.0/accident and http://127.0.0.1:5000/api/v1.0/counts using flask in python that uses the data in the database project_db. In order for the API to run, the version of SQLalchemy had to be 1.4.39.

**Our Python Script:**
  - To create API: api.py

**Tools/Libraries We Imported:**
   - pandas library: for data manipulation and analysis
   - sqlalchemy library: provides the SQL toolkit and Object-Relational Mapper (ORM) functionality. The create_engine function is to create a database engine to connect with the database in order to interact with the database, and perform operations such as SQL queries
   - flask library: to create API and convert the data in SQL database to json format

### Part 4: Create the Web Application
Utilising javascript, html and css coding, we created the road accident web application. A separate javascript file was created for each of the four visualisations ie. cluster map, map by locality type, bar chart and line chart. Each of the javascript files call on a route from the API created in Part 3 to source the json formatted road accident data. Functions were created to then manipulate the data in order to create the different visualisations. The html file called on modules and libraries in order to create the visualisations, set the main layout of the webpage and links to the javascript files and the style.css file. The style.css file contained styling for different elements of the webpage eg. borders, shading, font size, height and width etc.

**Our Javascript Files:**
  - Horizontal Barchart with filters by measure and year: chartsfilter.js
    - javascript libraries used: Plotly.js, D3.js
  - Cluster Map of road accidents by location: cluster.js
    - javascript libraries used: Leaflet.js, D3.js
    - OpenStreetMap used for map layer
  - Linechart of road accidents by year split to fatal and nonfatal accidents: linecharts.js
    - library used: Highcharts.js
  - Map of location of road accidents, colour coded by locality type: mapcircles.js
    - javascript libraries used: Leaflet.js, D3.js
    - OpenStreetMap used for map layer

**Our Style Script:**
  - style.css

**Our HTML Script:**
  - index.html


## Getting Started

**Programs/software we used:**
 - Visual Studio Code: used for python coding.
 - Microsoft Excel: to view csv files. Should be available by default on all PCs.
 - QuickDBD: to sketch an ERD of the tables for the data contained in the csv files. (http://www.quickdatabasediagrams.com/) No need to register, diagram can be generated on the website for free.
 - PostgreSQL: is a relational database management system (RDBMS). An RDBMS consists of tables and their predefined relationships. Postgres stores the data. Refer to "Installing" section below.
 - pgAdmin: The pgAdmin tool functions as the window into the database. It's where queries are written, run and then the results of running them are reviewed. pgAdmin provides access to that data. Refer to "Installing" section below.
 - Chrome: to view APIs and final web application.

**To get webpage running:**
 - Open api.py in Visual Studio Code
 - Navigate to folder location of api.py in terminal
 - Type: python api.py
 - Open index.html in Chrome to view website

**To activate dev environment:**
- Open Anaconda Prompt
- Activate dev environment, type 'conda activate dev'

## Installing

**Installation PostgreSQL & pgAdmin:**
 - In your browser, go to Download PostgreSQLLinks: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads.
 - Select the download option for your operating system and the latest version 14.x of PostgreSQL.
 - After downloading the latest version of PostgreSQL 14.x, double-click the postgresql-14.7-2-windows-x64.exe file. Note: The exact file version may be slightly different.
 - Go through the Setup Wizard and install PostgreSQL. Keep the default location C:\Program Files\PostgreSQL\14.
 - Select the components to be installed. Uncheck the option to install Stack Builder.
 - Add your data directory. Keep the default location C:\Program Files\PostgreSQL\14\data.
 - Enter postgres as the password. Be sure to record this password for future use.
 - Keep the default port as 5432. In the Advanced Options, set the locale as [Default locale].
 - The final screen will be the Pre Installation Summary.
 - When you are done, the Postgres 14 folder can be accessed from the Start menu of your computer.
 - This folder contains the pgAdmin 4 application.
 - To confirm the installation, start pgAdmin (this will open in a new browser window). Connect to the default server by clicking on it and entering the password if prompted.

**Installation psycopg2:**
- after activating dev environment in Anaconda Prompt (see Getting Started above), type: "pip install psycopg2"


## Contributing

- Plotly.js website: (https://plotly.com/javascript/)
- Highcharts.js website: (https://api.highcharts.com/highcharts/)

## Sources

- Icon used in cluster chart taken from: https://www.flaticon.com/free-icon/car-crash_3664541
- Background image for website taken from: https://www.whichcar.com.au/car-advice/the-best-driving-roads-in-victoria
