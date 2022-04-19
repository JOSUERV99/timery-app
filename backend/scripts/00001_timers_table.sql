USE `timer_app_db`;

CREATE TABLE IF NOT EXISTS `timers` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  rest int NOT NULL,
  work int NOT NULL,
  sets int NOT NULL,
  totalTime int NOT NULL,
  creationDate DATE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;