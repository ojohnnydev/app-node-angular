CREATE TABLE `caed`.`alunos` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `NOME` varchar(100) NOT NULL,
    `CPF` varchar(11) NOT NULL,
    `DATA_NASCIMENTO` date NOT NULL,
    `SEXO` char(1) NOT NULL,
    `EMAIL` varchar(150) DEFAULT NULL,
    `MAIOR_IDADE` varchar(15) NOT NULL,
    `DATA_CRIACAO` datetime NOT NULL,
    `DATA_ALTERACAO` datetime DEFAULT NULL,
     PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
