CREATE DATABASE course_management;

USE course_management;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL
);

CREATE TABLE course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE enrolment (
    enrolment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    completion_status ENUM('not started', 'in progress', 'completed') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    UNIQUE (user_id, course_id)
);

CREATE INDEX idx_user_id ON enrolment(user_id);
CREATE INDEX idx_course_id ON enrolment(course_id);
