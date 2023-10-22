import pandas as pd
from sqlalchemy import create_engine


# Importing csv's

accident_path = "Cleaned_Datasets/master_accident_cleaned.csv"
vehicle_path = "Cleaned_Datasets/vehicle_cleaned.csv"
person_path = "Cleaned_Datasets/person_cleaned.csv"

# converting to pandas dataframes

accident = pd.read_csv(accident_path,low_memory=False)
vehicle = pd.read_csv(vehicle_path,low_memory=False)
person = pd.read_csv(person_path,low_memory=False)

accident = accident[['ACCIDENT_NO','ACCIDENTDATE','ACCIDENTTIME','Accident_Type_Desc'
                     ,'Day_Week_Description','Light Condition Desc','NO_PERSONS_KILLED'
                     ,'SPEED_ZONE','LGA_NAME','REGION_NAME','DEG_URBAN_NAME','Lat','Long','Atmosph_Cond_Desc',
                     'Surface_Cond_Desc']]

year = pd.to_datetime(accident['ACCIDENTDATE'],dayfirst=True).dt.year
accident['year']=year

id_year = accident[['ACCIDENT_NO','year']]
# Adding year column so the table can be groupedby year in the api.py file

vehicle = vehicle[['ACCIDENT_NO','VEHICLE_BODY_STYLE','VEHICLE_MAKE','VEHICLE_MODEL','Vehicle Type Desc']]

vehicle = vehicle.merge(id_year,on='ACCIDENT_NO')

person = person[['ACCIDENT_NO','SEX','Age_Group','Road_User_Type_Desc']]

person = person.merge(id_year,on='ACCIDENT_NO')

# Create a postgres database and call it project_db
# Making connection to postgresql db

port = 5432            
username = "postgres"  
password = "postgres"
db_name = "project_db"

db_connection_string = f"postgresql+psycopg2://{username}:{password}@localhost:{port}/{db_name}"
engine = create_engine(db_connection_string)

# using ".to_sql(table_name, engine, if_exists='append', index=False)" we can append data to tables in sql db
accident.to_sql("accident", engine, if_exists='replace', index=False)
vehicle.to_sql("vehicle", engine, if_exists='replace', index=False)
person.to_sql("person", engine, if_exists='replace', index=False)




