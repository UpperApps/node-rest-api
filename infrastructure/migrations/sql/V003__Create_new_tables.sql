CREATE TABLE IF NOT EXISTS client (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(150) NOT NULL,
  cpf char(11) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pet (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(150),
  client_id int NOT NULL,
  type varchar(100),
  comments text,
  PRIMARY KEY (id),
  FOREIGN KEY (client_id) references client(id)
);

CREATE TABLE IF NOT EXISTS service (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(150),
  price decimal(5, 2),
  description text,
  PRIMARY KEY (id)
);

DROP TABLE appointment;

CREATE TABLE IF NOT EXISTS appointment (
  id int NOT NULL AUTO_INCREMENT,
  cliente_id int NOT NULL,
  pet_id int NOT NULL,
  service_id int NOT NULL,
  date_appointment datetime NOT NULL,
  status varchar(100) NOT NULL,
  comments text,
  date_creation datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (cliente_id) references client(id),
  FOREIGN KEY (pet_id) references pet(id),
  FOREIGN KEY (service_id) references service(id)
);