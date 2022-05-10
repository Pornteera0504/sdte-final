create table users (
id int AUTO_INCREMENT PRIMARY KEY,
email varchar(50),
password varchar(100),
nationality enum('ไทย', 'อื่นๆ'),
userID varchar(13)
);

create table projects (
id int AUTO_INCREMENT PRIMARY KEY,
project_name varchar(100)
);

create table rounds (
id int AUTO_INCREMENT PRIMARY KEY,
round_name varchar(255),
semester varchar(20)
);

create table courses (
id int AUTO_INCREMENT PRIMARY KEY,
faculty_name varchar(100),
course varchar(255),
language enum('หลักสูตรนานาชาติ', 'หลักสูตรไทย'),
open_due_date varchar(255),
description TEXT,
project int NOT NULL,
round int NOT NULL,
FOREIGN KEY (project) REFERENCES projects(id),
FOREIGN KEY (round) REFERENCES rounds(id)
ON DELETE CASCADE
);