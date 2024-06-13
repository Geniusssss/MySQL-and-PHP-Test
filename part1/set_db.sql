CREATE DATABASE mindatlas;

USE mindatlas;

CREATE TABLE user (
    id INT PRIMARY KEY,
    username VARCHAR(50)
);

CREATE TABLE user_filed (
    id INT PRIMARY KEY,
    field VARCHAR(50)
);

CREATE TABLE user_data (
    id INT PRIMARY KEY,
    field_id INT,
    field_data VARCHAR(100),
    user_id INT,
    FOREIGN KEY (field_id) REFERENCES user_filed(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO user (id, username) VALUES
(1, 'User1'),
(2, 'User2'),
(3, 'User3');

INSERT INTO user_filed (id, field) VALUES
(1, 'Phone'),
(2, 'Email'),
(3, 'Position');

INSERT INTO user_data (id, field_id, field_data, user_id) VALUES
(1, 1, '1111111', 1),
(2, 2, 'User1@gmail.com', 1),
(3, 1, '2222222', 2),
(4, 2, 'User2@gmail.com', 2),
(5, 1, '3333333', 3),
(6, 2, 'User3@gmail.com', 3),
(7, 3, 'Tester', 3);
