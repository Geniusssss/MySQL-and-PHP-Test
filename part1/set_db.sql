CREATE DATABASE MindAtlas;

USE MindAtlas;

CREATE TABLE User (
    ID INT PRIMARY KEY,
    Username VARCHAR(50)
);

CREATE TABLE UserFieldName (
    ID INT PRIMARY KEY,
    Field VARCHAR(50)
);

CREATE TABLE UserData (
    ID INT PRIMARY KEY,
    FieldID INT,
    Data VARCHAR(100),
    UserID INT,
    FOREIGN KEY (FieldID) REFERENCES UserFieldName(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

INSERT INTO User (ID, Username) VALUES 
(1, 'User1'),
(2, 'User2'),
(3, 'User3');

INSERT INTO UserFieldName (ID, Field) VALUES 
(1, 'Phone'),
(2, 'Email'),
(3, 'Position');

INSERT INTO UserData (ID, FieldID, Data, UserID) VALUES 
(1, 1, '1111111', 1),
(2, 2, 'User1@gmail.com', 1),
(3, 1, '2222222', 2),
(4, 2, 'User2@gmail.com', 2),
(5, 1, '3333333', 3),
(6, 2, 'User3@gmail.com', 3),
(7, 3, 'Tester', 3);