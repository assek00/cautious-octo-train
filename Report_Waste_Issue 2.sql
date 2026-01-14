create database Report_Waste_Issue;
use Report_Waste_Issue;

create table Report_Waste_Issue(
report_id int primary key,
type_of_waste varchar(50),
location varchar(50),
description_of_waste varchar(50)
);
select*from Report_Waste_Issue;
INSERT INTO Report_Waste_Issue (type_of_waste, location, description_of_waste) 
        VALUES ('$type', '$loc', '$desc')
        
