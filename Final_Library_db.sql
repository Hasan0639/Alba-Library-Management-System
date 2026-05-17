CREATE DATABASE  IF NOT EXISTS `library_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `library_db`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: library_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `publish_date` varchar(50) DEFAULT NULL,
  `shelf` varchar(50) DEFAULT NULL,
  `row_number` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Available',
  `total_copies` int(11) DEFAULT 1,
  `taken_copies` int(11) DEFAULT 0,
  `category_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `fk_books_category` (`category_id`),
  CONSTRAINT `fk_books_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (14,'Practical Guide to Industrial Safety','Khaled Ismail','01/04/2022','H','2','https://hsseworld.com/wp-content/uploads/2022/04/Practical-Guide-to-Industrial-Safety2.png','Available',10,3,3,''),(15,'Safety Culture and High-Risk Environments','Khaled Ismail','13/04/2022','G','2','https://hsseworld.com/wp-content/uploads/2022/04/Safety-Culture-and-high-risk-environment-2.png','Taken',1,1,3,''),(17,'Our business civilization','James Truslow Adams','January 1, 1929','H','4','https://d1btptoiso7inb.cloudfront.net/JoHTbG_tce-MES7tNL-clMbNQqqLrnoJHOhad1rvKW8/s:540:776/aHR0cHM6Ly9ib29r/ZnVzaW9uLnMzLWFj/Y2VsZXJhdGUuYW1h/em9uYXdzLmNvbS9i/b29rL2NvdmVyLzAw/NS85NTkvNDczLzFi/ZmYzYTJhYWNlOTEy/ZjkuanBn','Available',1,0,2,NULL),(18,'Fundamentals of Business','Business Faculty from Ontario Colleges','June 1, 2018','G','3','https://d1btptoiso7inb.cloudfront.net/Ouavclb7wgZPcb_O5gmNpbG2HDst8BcXiKBFr1iYrOM/s:540:776/aHR0cHM6Ly9ib29r/ZnVzaW9uLnMzLWFj/Y2VsZXJhdGUuYW1h/em9uYXdzLmNvbS9i/b29rL2NvdmVyLzAw/MC81MTMvNDI3LzEw/YzY5M2Q5NjYxZTc3/OTkuanBn','Available',1,0,2,NULL),(38,'Exploring the Internet','Carl Malamud',' April 28, 1996','D','2','https://d1btptoiso7inb.cloudfront.net/clpqShYSuqbPtOxbhJTpduyZwOoIIgLJa0u92I1X1bo/s:540:776/aHR0cHM6Ly9ib29r/ZnVzaW9uLnMzLWFj/Y2VsZXJhdGUuYW1h/em9uYXdzLmNvbS9i/b29rL2NvdmVyLzAw/MC8xNDYvOTgwLzMy/OTZiMmNjOTRmMDVh/NGUuanBn','Available',3,1,1,'Exploring the Internet: A Technical Travelogue by Carl Malamud is a book that explores the early development of the Internet through the author’s journeys around the world. Written in a travelogue style, the book documents visits to different countries, research centers, and networking communities during the early days of global Internet expansion.'),(39,'Leading with Safety','Thomas R. Krause Ph.D,','21/10/2005','H','3','https://onlinelibrary.wiley.com/cms/asset/08cc8775-1679-4a0b-a58f-45edc6803d55/047178527x.cover.gif','Taken',2,1,3,NULL),(40,'Practical Mechanics for Boys','James Slough Zerbe','11/8/2007','F','4','https://www.gutenberg.org/cache/epub/22298/pg22298.cover.medium.jpg','Available',3,1,4,NULL),(41,' C++ for Everyone','Cay S. Horstmann','3/11/2008','A','3','https://m.media-amazon.com/images/I/71hN-6i1qsL._AC_UF1000,1000_QL80_.jpg','Available',1,0,1,'C++ for Everyone by Cay S. Horstmann is a beginner-friendly introduction to C++ and computer programming, requiring no prior experience. Focusing on essentials, the book uses a visual approach, problem-solving strategies, and extensive \"How To\" guides with worked examples to teach core programming concepts to students and professionals alike.'),(42,'eMarketing - The Essential Guide to Online Marketing','Rob Stokes','2/5/2008','B','2','https://m.media-amazon.com/images/I/61d-eO7ccxL._UF1000,1000_QL80_.jpg','Available',2,0,2,NULL),(43,'Supervisors Safety Manual',' Linda F. Martin and Daniel Corcoran','28/6/2018','G','5','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8yAMQzuJ4Fg5rxGjiGg6DnpBv3pRsNBW64w&s','Available',2,0,3,NULL),(45,'To Engineer Is Human: The Role of Failure in Successful ','Henry Petroski','31/3/1992','F','3','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzXwf-ZfmJbJcHKojXM1kOUfAAS1FLJRnziw&s','Taken',1,1,4,''),(56,'Artificial Intelligence, Data and Robotics: Foundations, Transformations and Future Directions ','Edward Curry, et al.','March 7, 2026','A','4','https://m.media-amazon.com/images/I/71a6e3ocqjL._SY466_.jpg','Taken',2,1,1,'This open access book explores the rapidly evolving landscape of artificial intelligence, data and robotics (ADR), highlighting their foundational principles, transformative applications and future directions.'),(57,'Fundamentals of Thermodynamics','Claus Borgnakke, Richard E. Sonntag','April 26, 2019','F','2','https://media.wiley.com/product_data/coverImage300/17/13942129/1394212917.jpg','Available',2,0,4,'Fundamentals of Thermodynamics is a widely used engineering textbook that introduces the principles of thermodynamics and their applications in real-world engineering systems. The book explains how heat, energy, work, temperature, and entropy interact in physical systems such as engines, refrigerators, air conditioners, power plants, and energy conversion systems.');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_history`
--

DROP TABLE IF EXISTS `borrow_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_history` (
  `borrow_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `borrow_date` datetime DEFAULT current_timestamp(),
  `return_date` datetime DEFAULT NULL,
  PRIMARY KEY (`borrow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_history`
--

LOCK TABLES `borrow_history` WRITE;
/*!40000 ALTER TABLE `borrow_history` DISABLE KEYS */;
INSERT INTO `borrow_history` VALUES (1,2,9,'2026-04-29 23:47:18','2026-04-30 00:23:23'),(2,2,18,'2026-04-30 00:06:42','2026-04-30 00:23:59'),(3,2,14,'2026-04-30 00:10:47','2026-04-30 00:23:45'),(4,2,18,'2026-04-30 00:11:00','2026-04-30 00:23:59'),(5,2,9,'2026-04-30 00:22:33','2026-04-30 00:23:23'),(6,2,9,'2026-04-30 00:35:15','2026-04-30 12:35:24'),(7,2,19,'2026-04-30 00:43:19','2026-04-30 00:44:53'),(8,2,19,'2026-04-30 00:43:19','2026-04-30 00:44:53'),(9,2,9,'2026-05-04 01:12:20','2026-05-06 00:48:16'),(10,2,22,'2026-05-05 23:32:46',NULL),(11,2,20,'2026-05-06 00:19:50','2026-05-06 00:20:00'),(12,2,23,'2026-05-06 00:20:46','2026-05-06 00:20:56'),(13,2,23,'2026-05-06 00:20:51','2026-05-06 00:20:56'),(14,2,23,'2026-05-06 00:33:35','2026-05-06 00:55:30'),(15,2,18,'2026-05-06 00:36:04','2026-05-07 03:08:07'),(16,2,9,'2026-05-06 00:48:14','2026-05-06 00:48:16'),(17,1,23,'2026-05-06 00:55:37',NULL),(18,1,24,'2026-05-06 00:59:37','2026-05-06 01:01:50'),(19,2,24,'2026-05-06 00:59:45','2026-05-06 01:01:50'),(20,2,25,'2026-05-06 01:44:52','2026-05-06 01:45:01'),(21,1,25,'2026-05-06 01:44:56','2026-05-06 01:45:09'),(22,2,25,'2026-05-06 01:55:58','2026-05-06 01:56:37'),(23,1,25,'2026-05-06 01:56:07',NULL),(24,2,42,'2026-05-07 00:16:07','2026-05-07 00:16:38'),(25,2,42,'2026-05-07 00:16:07','2026-05-07 00:16:42'),(26,2,42,'2026-05-07 00:16:07','2026-05-07 00:16:45'),(27,2,42,'2026-05-07 00:16:07','2026-05-07 00:16:49'),(28,1,40,'2026-05-07 02:48:47',NULL),(29,3,45,'2026-05-11 00:36:17','2026-05-11 01:39:03'),(30,2,43,'2026-05-11 00:36:35','2026-05-11 01:39:24'),(31,1,43,'2026-05-11 00:36:47','2026-05-11 00:37:03'),(32,2,42,'2026-05-11 01:39:43','2026-05-11 01:40:25'),(33,3,38,'2026-05-11 01:40:11',NULL),(34,2,42,'2026-05-11 01:40:31','2026-05-11 02:18:09'),(35,2,56,'2026-05-11 01:43:20',NULL),(36,3,39,'2026-05-11 02:17:30',NULL),(37,2,42,'2026-05-11 02:17:49','2026-05-11 02:18:21'),(38,3,45,'2026-05-11 18:42:35',NULL),(39,2,16,'2026-05-11 18:43:21',NULL),(40,3,15,'2026-05-12 17:13:07',NULL),(41,2,17,'2026-05-16 06:18:18','2026-05-16 06:21:22');
/*!40000 ALTER TABLE `borrow_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Business'),(4,'Engineering'),(1,'IT'),(3,'Safety');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_books`
--

DROP TABLE IF EXISTS `favorite_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_books` (
  `favorite_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `saved_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`favorite_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_books`
--

LOCK TABLES `favorite_books` WRITE;
/*!40000 ALTER TABLE `favorite_books` DISABLE KEYS */;
INSERT INTO `favorite_books` VALUES (9,2,40,'2026-05-06 23:42:44'),(11,3,45,'2026-05-11 00:35:06'),(12,2,56,'2026-05-11 02:07:44'),(13,2,41,'2026-05-16 06:42:25');
/*!40000 ALTER TABLE `favorite_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Active',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Hasan','Hasan@g.com','1234','admin','Active'),(2,'Ali ahmed','ahmed@gmail.com','1234','user','Active'),(3,'Hussain Mohd','Hussain@gmail.com','1234','user','active');
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

-- Dump completed on 2026-05-18  0:09:48
