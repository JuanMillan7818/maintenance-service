CREATE USER juan WITH ENCRYPTED PASSWORD 'JuanAdmin';

ALTER ROLE juan SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;

CREATE DATABASE MaintenanceService;

USE MaintenanceService;

CREATE TABLE users (
    id_user SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(40) NOT NULL,
    user_password VARCHAR(100) NOT NULL
);

ALTER SEQUENCE users_id_user_seq RESTART WITH 1;

CREATE TABLE customers (    
    id_customer INTEGER NOT NULL PRIMARY KEY,    
    date_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
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
    id_request VARCHAR(100) NOT NULL PRIMARY KEY,
    id_customer INTEGER NOT NULL,
    id_expert INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    date_service TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
    CONSTRAINT FK_refer_customer FOREIGN KEY(id_customer) REFERENCES customers(id_customer),
    CONSTRAINT FK_refer_expert FOREIGN KEY(id_expert) REFERENCES experts(id_expert),
    CONSTRAINT FK_refer_service FOREIGN KEY(id_service) REFERENCES services(id_service)
);

ALTER SEQUENCE request_services_id_request_seq RESTART WITH 1;

-------------------- Usuarios 
INSERT INTO users (first_name, last_name, email, username, user_password) 
    VALUES ('juan pablo', 'millan holgin', 'juan@gmail.com', 'gonzales', 'aaa');
INSERT INTO users (first_name, last_name, email, username, user_password) 
    VALUES ('anderson', 'rengifo gonzales', 'anderson@gmail.com', 'gonzales', 'bbb');
INSERT INTO users (first_name, last_name, email, username, user_password)
    VALUES ('jimena', 'hernandez', 'jimena@gmail.com', 'gonzales', 'ccc');
INSERT INTO users (first_name, last_name, email, username, user_password)
    VALUES ('jose luiz', 'millan rodriguez', 'jose@gmail.com', 'gonzales', 'ddd');
INSERT INTO users (first_name, last_name, email, username, user_password)
    VALUES ('jose javier', 'gonzales', 'javier@gmail.com', 'gonzales', 'eee');
INSERT INTO users (first_name, last_name, email, username, user_password)
    VALUES ('miguel angel', 'hernandez', 'miguel@gmail.com', 'miguel', 'fff');

-------------------- Clientes 
INSERT INTO customers (id_customer)
    VALUES ('1'); 

INSERT INTO customers (id_customer)
    VALUES ('2');

INSERT INTO customers (id_customer)
    VALUES ('3');


-------------------- Tecnicos
INSERT INTO experts (id_expert, refer_contract, max_request)
    VALUES ('4', 'fgfgsgfsd', 10);
INSERT INTO experts (id_expert, refer_contract, max_request)
    VALUES ('5', 'qwqweqeweq', 10);
INSERT INTO experts (id_expert, refer_contract, max_request)
    VALUES ('6', 'pooasasmdsd', 10);

-------------------- Servicios que se ofrece
INSERT INTO services (text_description, type_service)
    VALUES ('sfdfjdsafjds', 'mantenimiento');
INSERT INTO services (text_description, type_service)
    VALUES ('qqqqqqqqqqqqq', 'cambio');
INSERT INTO services (text_description, type_service)
    VALUES ('wwwwwwwwwwwww', 'compra');
INSERT INTO services (text_description, type_service)
    VALUES ('aaaaaaaaaaaaa', 'falla');
INSERT INTO services (text_description, type_service)
    VALUES ('eeeeeeeeeeeee', 'revision');
INSERT INTO services (text_description, type_service)
    VALUES ('ttttttttttttt', 'instalacion');

-------------------- Solicitud de servicios

DELETE FROM customers;