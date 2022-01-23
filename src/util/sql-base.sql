CREATE USER juan WITH ENCRYPTED PASSWORD 'JuanAdmin';

ALTER ROLE juan SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;

CREATE DATABASE MaintenanceService;

USE MaintenanceService;

CREATE TABLE users (
    id_user SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

ALTER SEQUENCE users_id_user_seq RESTART WITH 1;

CREATE TABLE customers (    
    id_customer INTEGER NOT NULL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    user_password VARCHAR(100) NOT NULL,    
    CONSTRAINT FK_id_refer_customer FOREIGN KEY(id_customer) REFERENCES users(id_user)
);

CREATE TABLE experts (
    id_expert INTEGER NOT NULL PRIMARY KEY,
    refer_contract VARCHAR(100) NOT NULL,
    max_request INTEGER NOT NULL,
    CONSTRAINT FK_id_refer_expert FOREIGN KEY(id_expert) REFERENCES users(id_user)
);

CREATE TABLE services (
    id_service SERIAL NOT NULL PRIMARY KEY,
    text_description VARCHAR(300) NOT NULL,
    type_service VARCHAR(15) NOT NULL
);

ALTER SEQUENCE services_id_service_seq RESTART WITH 1;

CREATE TABLE request_services (
    id_request SERIAL NOT NULL PRIMARY KEY,
    id_customer INTEGER NOT NULL,
    id_expert INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    date_service TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
    CONSTRAINT FK_refer_customer FOREIGN KEY(id_customer) REFERENCES customers(id_customer),
    CONSTRAINT FK_refer_expert FOREIGN KEY(id_expert) REFERENCES experts(id_expert),
    CONSTRAINT FK_refer_service FOREIGN KEY(id_service) REFERENCES services(id_service)
);

ALTER SEQUENCE request_services_id_request_seq RESTART WITH 1;

INSERT INTO users (first_name, last_name, email) 
    VALUES ('juan pablo', 'millan holgin', 'juan@gmail.com');
INSERT INTO users (first_name, last_name, email) 
    VALUES ('anderson', 'rengifo gonzales', 'anderson@gmail.com');
INSERT INTO users (first_name, last_name, email)
    VALUES ('jimena', 'hernandez', 'jimena@gmail.com');
INSERT INTO users (first_name, last_name, email)
    VALUES ('jose luiz', 'millan rodriguez', 'jose@gmail.com');
INSERT INTO users (first_name, last_name, email)
    VALUES ('jose javier', 'gonzales', 'javier@gmail.com');

INSERT INTO customers (id_customer, username, user_password)
    VALUES ('1', 'gonzales', 'sss');

INSERT INTO customers (id_customer, username, user_password)
    VALUES ('2', 'hola', 'AAA');

INSERT INTO customers (id_customer, username, user_password)
    VALUES ('3', 'techmaster', 'ssaa');

DELETE FROM customers;