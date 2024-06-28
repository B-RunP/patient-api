-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 28, 2024 at 01:28 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db1`
--

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `age` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `treatment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `gender`, `age`, `address`, `diagnosis`, `treatment`) VALUES
(1, 'Budi', 'laki-laki', 25, 'Surakarta', 'Tipes', 'Rawat inap'),
(4, 'Sendi', 'laki-laki', 30, 'Jogja', 'Masuk Angin', 'Rawat Jalan');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT '',
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `google_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `google_id`) VALUES
(1, 'brian', '$2b$10$pXTAOKGgA.ShbtgqgzPjV.jboGgO7Xhz9rhosrMZGP0hJu1f/mlom', 'admin', ''),
(2, 'budi', '$2b$10$HQh5nAsqapiKEVeMbKF7SOTlgPhvbhXlFDf2RdZ8fMrXvPBkx0SRu', 'user', ''),
(3, 'rusli', '$2b$10$Y33qC3KBC4S9o93/4a6ZX.wn7H0hLdX7p3xm5kXgjkrYSQ5Pd48T2', 'admin', ''),
(4, 'toni', '$2b$10$kg65xPlsp8zm92EBzu4cAeiLedQNz4RthK5ps2Gem87A5158mt3H6', 'admin', ''),
(5, 'ricky', '$2b$10$Gu07EeLKcTJAt34vylcWxOZoSuUH9g5glo9r8SWuwLslFtYFArLP.', 'user', ''),
(6, 'putra', '$2b$10$UXXUhHpKtK0Eop4Wj.k9QOqOua9Oku8iroRjwH3rdww9dZU/n6DE6', 'user', ''),
(7, 'admin', '$2b$10$omu6hsgmhqNGDEY5u57uwuZSHFLg318riFRTvqPOlq2D87NM04v9G', 'admin', ''),
(8, 'acer', '$2b$10$ZUWtHsQtVJ34UBxZegizWe26WqShDzlLdAbtQrknBUEH0bNvohpWu', 'admin', ''),
(9, 'brian purnama', '', 'user', '111037497982390744274'),
(11, 'ferdi', '$2a$10$PJdfKhmfUZg5fu/4mY34hONS3IkplDRdvjO2rA5O7is3qoe.DGYQa', 'user', NULL),
(12, 'bagus', '$2a$10$9BuL9P0LdysQIXOo9zXq.u9zrdEbrIsSpukqJnqsY7LUbx2esr9sy', 'user', NULL),
(13, 'putra', '$2a$10$5zlDVeSv9g10A7VGhfqLFehxfQJ76nySirOw1.91qG4DkxNhNskBy', 'admin', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
