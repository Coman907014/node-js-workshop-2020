SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `workshopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `users` (`name`, `email`, `password`) VALUES
('Vlad', 'vlad@gmail.com', 'pass123'),
('Andrei', 'andrei@gmail.com', 'pass1234'),
('Maria', 'maria@gmail.com', 'pass12345'),
('Ioana', 'ioana@gmail.com', 'pass123456');

COMMIT;
