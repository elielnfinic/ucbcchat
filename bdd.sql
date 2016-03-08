CREATE TABLE IF NOT EXISTS `message` (
  `idMessage` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `loginEnvoi` VARCHAR(7) NOT NULL,
  `loginReception` VARCHAR(7) NOT NULL,
  `dateHeure` datetime NOT NULL,
  `message` text NOT NULL,
  `reception` int(11) NOT NULL DEFAULT '0'
);