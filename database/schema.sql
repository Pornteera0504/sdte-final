create table users (
id int AUTO_INCREMENT PRIMARY KEY,
email varchar(50),
password varchar(100),
userID varchar(13)
);

create table courses (
categoryID int AUTO_INCREMENT PRIMARY KEY,
name varchar(50),
definition varchar(255)

);
create table tasks (
taskID int AUTO_INCREMENT PRIMARY KEY,
name varchar(50),
description TEXT,
activityDate varchar(20),
lastEditDate varchar(20),
userID int NOT NULL,
categoryID int NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID),
FOREIGN KEY (categoryID) REFERENCES categories(categoryID)
ON DELETE CASCADE
);