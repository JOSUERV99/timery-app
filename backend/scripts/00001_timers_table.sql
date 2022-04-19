USE `timer_app_db`;

CREATE TABLE IF NOT EXISTS `timers` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) UNIQUE NOT NULL,
  rest int NOT NULL,
  work int NOT NULL,
  sets int NOT NULL,
  totalTime int NOT NULL,
  creationDate DATETIME DEFAULT CURRENT_TIMESTAMP 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;