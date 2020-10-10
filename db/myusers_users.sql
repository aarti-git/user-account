CREATE DATABASE  IF NOT EXISTS `myusers` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myusers`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: myusers
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `job` varchar(20) DEFAULT NULL,
  `pwd` varchar(15) DEFAULT NULL,
  `image` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aarti s','aarti.yogesh@gmail.com','Software Engineer','12344','img/user3.jpg'),(2,'aarti','aarti.yogesh@gmail.com','Web Devloper','3333544','img/user3.jpg'),(3,'aarti','yog99mail@gmail.com','Student','1234','img/user3.jpg'),(4,'aarti','yog99mail@gmail.com','Student','1222','img/user3.jpg'),(5,'Yogesh Jagdale','yogesh@anattadesign.com','Web Devloper','1222','img/user3.jpg'),(6,'aarti','yog99mail@gmail.com','Student','1111','img/user3.jpg'),(7,'aarti','yogesh@anattadesign.com','Web Devloper','23333','img/user3.jpg'),(8,'aarti','yog99mail@gmail.com','Student','1222','img/user3.jpg'),(9,'aarti','yogesh@anattadesign.com','Student','1233','img/user3.jpg'),(10,'Yogesh Jagdale','yog99mail@gmail.com','Student','23344','img/user3.jpg'),(11,'aarti','yog99mail@gmail.com','Student','12233','img/user3.jpg'),(12,'aarti','yog99mail@gmail.com','Web Devloper','12223','img/user3.jpg'),(13,'aarti','yog99mail@gmail.com','Student','11111','img/user3.jpg'),(14,'aarti','yog99mail@gmail.com','Student','2343456','img/user3.jpg'),(15,'Yogesh Jagdale','yog99mail@gmail.com','Web Devloper','12345','img/user3.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-10 13:56:50
