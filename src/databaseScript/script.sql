create schema SCO;
use SCO;

CREATE TABLE teachers (
id INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(100) NOT NULL, 
last_name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
`password` VARCHAR(150) NOT NULL,
phone VARCHAR(100), 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at DATE default NULL, 
deleted INT DEFAULT 0
);


CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(100) NOT NULL, 
last_name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
`password` VARCHAR(150) NOT NULL,
phone VARCHAR(100), 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at DATE default NULL, 
deleted INT DEFAULT 0
);

CREATE TABLE appointments (
id INT auto_increment primary KEY,
`description` VARCHAR(100) NOT NULL,
id_user INT,
id_teacher INT, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at DATE default NULL, 
deleted INT DEFAULT 0,
foreign key (id_user) references users(id),
foreign key (id_teacher) references teachers(id)
);

CREATE TABLE records (
id INT AUTO_INCREMENT PRIMARY KEY,
`description` VARCHAR(100) NOT NULL, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at DATE default NULL, 
deleted INT DEFAULT 0, 
id_user INT,
foreign key (id_user) references users(id)
);

CREATE TABLE tokens (
    id INT AUTO_INCREMENT,
    token VARCHAR(300) NOT NULL,
    PRIMARY KEY (id)
);