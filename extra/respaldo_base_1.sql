-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para kite_app
DROP DATABASE IF EXISTS `kite_app`;
CREATE DATABASE IF NOT EXISTS `kite_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kite_app`;

-- Volcando estructura para tabla kite_app.changeslog
DROP TABLE IF EXISTS `changeslog`;
CREATE TABLE IF NOT EXISTS `changeslog` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.changeslog: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.failed_jobs
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.failed_jobs: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.genres
DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10771 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.genres: ~27 rows (aproximadamente)
INSERT INTO `genres` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(12, 'Aventura', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(14, 'Fantasía', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(16, 'Animación', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(18, 'Drama', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(27, 'Terror', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(28, 'Acción', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(35, 'Comedia', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(36, 'Historia', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(37, 'Viejo Oeste', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(53, 'Suspense', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(80, 'Crimen', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(99, 'Documental', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(878, 'Ciencia ficción', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(9648, 'Misterio', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10402, 'Música', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10749, 'Romance', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10751, 'Familia', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10752, 'Bélica', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10759, 'Acción y Aventura', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10762, 'Niños', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10763, 'Noticias', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10764, 'Reality', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10765, 'Ciencia Ficción y Fantasía', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10766, 'Novela', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10767, 'Talk', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10768, 'Guerra y Política', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10770, 'Película de TV', '2023-12-04 17:34:02', '2023-12-04 17:34:02');

-- Volcando estructura para tabla kite_app.migrations
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.migrations: ~0 rows (aproximadamente)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
	(3, '2019_08_19_000000_create_failed_jobs_table', 1),
	(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(5, '2023_09_18_001035_create_permission_tables', 1),
	(6, '2023_09_19_222853_create_titles_table', 1),
	(7, '2023_09_19_222929_create_reviews_table', 1),
	(8, '2023_09_19_222944_create_playlists_table', 1),
	(9, '2023_09_19_223030_create_services_table', 1),
	(10, '2023_09_19_223043_create_reminders_table', 1),
	(11, '2023_09_19_223101_create_genres_table', 1),
	(12, '2023_09_19_223116_create_seasons_table', 1),
	(13, '2023_09_19_223238_create_user_views_title_table', 1),
	(14, '2023_09_19_223248_create_user_has_title_table', 1),
	(15, '2023_09_19_223303_create_user_views_genre_table', 1),
	(16, '2023_09_19_223325_create_playlist_has_title_table', 1),
	(17, '2023_09_19_223343_create_title_on_service_table', 1),
	(18, '2023_09_19_223408_create_title_has_genre_table', 1),
	(19, '2023_09_19_223449_create_user_likes_review_table', 1),
	(20, '2023_09_19_223511_create_user_has_service_table', 1),
	(21, '2023_09_19_234443_create_season_on_service_table', 1),
	(22, '2023_11_13_174100_create_changeslog_table', 1);

-- Volcando estructura para tabla kite_app.model_has_permissions
DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE IF NOT EXISTS `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.model_has_permissions: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.model_has_roles
DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE IF NOT EXISTS `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.model_has_roles: ~4 rows (aproximadamente)
INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
	(3, 'App\\Models\\User', 11),
	(3, 'App\\Models\\User', 12),
	(2, 'App\\Models\\User', 13),
	(1, 'App\\Models\\User', 14),
	(1, 'App\\Models\\User', 15);

-- Volcando estructura para tabla kite_app.password_reset_tokens
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.password_reset_tokens: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.permissions
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.permissions: ~14 rows (aproximadamente)
INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'access app', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(2, 'suggest titles', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(3, 'access dashboard', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(4, 'see users', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(5, 'disable users', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(6, 'add users', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(7, 'edit users', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(8, 'see titles', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(9, 'add titles', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(10, 'edit titles', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(11, 'disable titles', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(12, 'perform changes', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(13, 'see changes log', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(14, 'analytics', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01');

-- Volcando estructura para tabla kite_app.personal_access_tokens
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.personal_access_tokens: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.playlists
DROP TABLE IF EXISTS `playlists`;
CREATE TABLE IF NOT EXISTS `playlists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `playlists_user_id_foreign` (`user_id`),
  CONSTRAINT `playlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.playlists: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.playlist_has_title
DROP TABLE IF EXISTS `playlist_has_title`;
CREATE TABLE IF NOT EXISTS `playlist_has_title` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title_id` bigint unsigned NOT NULL,
  `playlist_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `playlist_has_title_title_id_foreign` (`title_id`),
  KEY `playlist_has_title_playlist_id_foreign` (`playlist_id`),
  CONSTRAINT `playlist_has_title_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`),
  CONSTRAINT `playlist_has_title_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.playlist_has_title: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.reminders
DROP TABLE IF EXISTS `reminders`;
CREATE TABLE IF NOT EXISTS `reminders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title_id` bigint unsigned NOT NULL,
  `service_id` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'service',
  `release_date` timestamp NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reminders_user_id_foreign` (`user_id`),
  KEY `reminders_title_id_foreign` (`title_id`),
  KEY `reminders_service_id_foreign` (`service_id`),
  CONSTRAINT `reminders_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `reminders_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`),
  CONSTRAINT `reminders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.reminders: ~13 rows (aproximadamente)
INSERT INTO `reminders` (`id`, `title_id`, `service_id`, `user_id`, `type`, `release_date`, `status`, `created_at`, `updated_at`) VALUES
	(1, 15, 1, 15, 'service', NULL, 0, '2023-12-04 18:43:21', '2023-12-04 18:43:21'),
	(2, 15, 2, 15, 'service', NULL, 0, '2023-12-04 18:43:21', '2023-12-04 18:43:21'),
	(3, 15, 3, 15, 'service', NULL, 0, '2023-12-04 18:43:21', '2023-12-04 18:43:21'),
	(4, 15, 4, 15, 'service', NULL, 0, '2023-12-04 18:43:21', '2023-12-04 18:43:21'),
	(5, 15, 5, 15, 'service', NULL, 0, '2023-12-04 18:43:21', '2023-12-04 18:43:21'),
	(6, 15, 6, 15, 'service', NULL, 0, '2023-12-04 18:43:21', '2023-12-04 18:43:21'),
	(7, 7, 1, 15, 'service', NULL, 0, '2023-12-04 18:45:55', '2023-12-04 18:45:55'),
	(8, 7, 2, 15, 'service', NULL, 0, '2023-12-04 18:45:55', '2023-12-04 18:45:55'),
	(9, 7, 3, 15, 'service', NULL, 0, '2023-12-04 18:45:55', '2023-12-04 18:45:55'),
	(10, 7, 4, 15, 'service', NULL, 1, '2023-12-04 18:45:55', '2023-12-04 18:45:55'),
	(11, 7, 5, 15, 'service', NULL, 0, '2023-12-04 18:45:55', '2023-12-04 18:45:55'),
	(12, 7, 6, 15, 'service', NULL, 0, '2023-12-04 18:45:55', '2023-12-04 18:45:55'),
	(13, 7, NULL, 15, 'release', '2023-12-04 15:46:51', 1, '2023-12-04 18:45:55', '2023-12-04 18:45:55');

-- Volcando estructura para tabla kite_app.reviews
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title_id` bigint unsigned NOT NULL,
  `star_number` int NOT NULL,
  `review_text` text COLLATE utf8mb4_unicode_ci,
  `disabled_at` timestamp NULL DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  KEY `reviews_title_id_foreign` (`title_id`),
  CONSTRAINT `reviews_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`),
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.reviews: ~3 rows (aproximadamente)
INSERT INTO `reviews` (`id`, `user_id`, `title_id`, `star_number`, `review_text`, `disabled_at`, `reason`, `created_at`, `updated_at`) VALUES
	(1, 3, 15, 4, 'The Batman va más allá de una interpretación literaria del legendario superhéroe, que retoma los materiales necesarios para mantener la esencia de la franquicia, combinándola con elementos y efectos del siglo XXI, haciendo frente a otras entregas del Justiciero Encapotado...', NULL, NULL, '2023-12-04 18:52:08', '2023-12-04 18:52:08'),
	(2, 4, 15, 5, 'El director no solo construye el mundo de este nuevo héroe, cimentando las bases de lo que será una franquicia exitosa, se aleja del Batman del universo de Zach Snyder y se acerca más a la realidad de Nolan, pero con toques de cine negro y homenajes al de David Fincher.', NULL, NULL, '2023-12-04 18:54:13', '2023-12-04 18:54:13'),
	(3, 5, 15, 5, 'La puesta en escena de Matt Reeves es magistral, porque combina planos secuencias estáticos y las inserta en escenas de acción pura y violenta...', NULL, NULL, '2023-12-04 18:56:07', '2023-12-04 18:56:07');

-- Volcando estructura para tabla kite_app.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.roles: ~3 rows (aproximadamente)
INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'user', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(2, 'moderator', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(3, 'admin', 'web', '2023-12-04 17:34:01', '2023-12-04 17:34:01');

-- Volcando estructura para tabla kite_app.role_has_permissions
DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE IF NOT EXISTS `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.role_has_permissions: ~21 rows (aproximadamente)
INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
	(1, 1),
	(2, 1),
	(1, 2),
	(2, 2),
	(3, 2),
	(4, 2),
	(5, 2),
	(1, 3),
	(2, 3),
	(3, 3),
	(4, 3),
	(5, 3),
	(6, 3),
	(7, 3),
	(8, 3),
	(9, 3),
	(10, 3),
	(11, 3),
	(12, 3),
	(13, 3),
	(14, 3);

-- Volcando estructura para tabla kite_app.seasons
DROP TABLE IF EXISTS `seasons`;
CREATE TABLE IF NOT EXISTS `seasons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title_id` bigint unsigned NOT NULL,
  `season_number` int NOT NULL,
  `episode_count` int NOT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seasons_title_id_foreign` (`title_id`),
  CONSTRAINT `seasons_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.seasons: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.season_on_service
DROP TABLE IF EXISTS `season_on_service`;
CREATE TABLE IF NOT EXISTS `season_on_service` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint unsigned NOT NULL,
  `season_id` bigint unsigned NOT NULL,
  `quality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leaving` timestamp NOT NULL,
  `available_since` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `season_on_service_service_id_foreign` (`service_id`),
  KEY `season_on_service_season_id_foreign` (`season_id`),
  CONSTRAINT `season_on_service_season_id_foreign` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`),
  CONSTRAINT `season_on_service_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.season_on_service: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.services
DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `homepage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_id_name_unique` (`id_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.services: ~6 rows (aproximadamente)
INSERT INTO `services` (`id`, `name`, `id_name`, `homepage`, `logo_path`, `price`, `created_at`, `updated_at`) VALUES
	(1, 'Apple TV', 'apple', 'https://tv.apple.com/ar', 'https://media.movieofthenight.com/services/apple/logo-dark-theme.svg', 6.99, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(2, 'Disney+', 'disney', 'https://www.disneyplus.com/', 'https://media.movieofthenight.com/services/disney/logo-dark-theme.svg', 799.00, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(3, 'HBO Max', 'hbo', 'https://play.hbomax.com/', 'https://media.movieofthenight.com/services/hbo/logo-dark-theme.svg', 699.00, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(4, 'Netflix', 'netflix', 'https://www.netflix.com', 'https://media.movieofthenight.com/services/netflix/logo-dark-theme.svg', 1649.00, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(5, 'Paramount+', 'paramount', 'https://www.paramountplus.com', 'https://media.movieofthenight.com/services/paramount/logo-dark-theme.svg', 599.00, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(6, 'Amazon Prime Video', 'prime', 'https://www.primevideo.com', 'https://media.movieofthenight.com/services/prime/logo-dark-theme.svg', 1149.00, '2023-12-04 17:34:02', '2023-12-04 17:34:02');

-- Volcando estructura para tabla kite_app.titles
DROP TABLE IF EXISTS `titles`;
CREATE TABLE IF NOT EXISTS `titles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `poster_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `backdrop_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL,
  `overview` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` double(8,2) DEFAULT NULL,
  `rating_amount` int NOT NULL DEFAULT '0',
  `origin_country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `release_date` timestamp NOT NULL DEFAULT '2023-12-04 17:33:59',
  `tmdb_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `disabled_at` timestamp NULL DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `titles_tmdb_id_unique` (`tmdb_id`),
  KEY `titles_user_id_foreign` (`user_id`),
  CONSTRAINT `titles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.titles: ~63 rows (aproximadamente)
INSERT INTO `titles` (`id`, `type`, `original_title`, `title`, `year`, `poster_path`, `backdrop_path`, `status`, `overview`, `rating`, `rating_amount`, `origin_country`, `release_date`, `tmdb_id`, `user_id`, `disabled_at`, `reason`, `created_at`, `updated_at`) VALUES
	(1, 'tv', 'La Casa de Papel', 'La Casa de Papel', '2017', '/z01Dc0Ly2GmCpLe6Scx4d3dPP1S.jpg', '/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg', 1, 'Ocho ladrones toman rehenes en la Fábrica Nacional de Moneda y Timbre de España, mientras el líder de la banda manipula a la policía para cumplir con su plan.', NULL, 0, 'ES', '2023-12-04 17:33:59', 'tv/71446', NULL, NULL, NULL, '2023-12-04 17:34:48', '2023-12-04 17:34:48'),
	(2, 'tv', '종이의 집: 공동경제구역', 'La casa de papel: Corea', '2022', '/9c9aT9WDEG0UhNlL7yWP9yM7qiT.jpg', '/lcTuggU70y6pt6x13Rv1Ffjs93K.jpg', 1, 'Ladrones se apoderan de la Casa de la Moneda de una Corea unificada. Con rehenes atrapados, la policía debe detenerlos, así como a la mente maestra detrás del golpe.', NULL, 0, 'KR', '2023-12-04 17:33:59', 'tv/112836', NULL, NULL, NULL, '2023-12-04 17:35:00', '2023-12-04 17:35:00'),
	(3, 'tv', 'La Casa de Papel: de Tokio a Berlín', 'La Casa de Papel: De Tokio a Berlín', '2021', '/lIa5eVVFdVNQmfAlKRexoJCVVd1.jpg', '/gk1enrMtCVABqJd4ujVwIIeswTT.jpg', 1, 'The filmmakers and actors behind "Money Heist" characters like Tokyo and the Professor talk about the emotional and artistic process of filming Money Heist.', NULL, 0, 'ES', '2023-12-04 17:33:59', 'tv/132719', NULL, NULL, NULL, '2023-12-04 17:35:25', '2023-12-04 17:35:25'),
	(4, 'movie', 'La Casa de Papel: el fenómeno', 'La Casa de Papel: el fenómeno', '2020', '/AboUXTrDWEi0PuZUqaft0iwBTm7.jpg', '/yEBBtk1eyZltGgJt8Z2zi3KIvvX.jpg', 1, 'Documental sobre el fenómeno social que ha se ha producido alrededor de "La casa de papel", una de las series más vistas de la parrilla de Netflix.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/689249', NULL, NULL, NULL, '2023-12-04 17:35:30', '2023-12-04 17:35:30'),
	(5, 'movie', 'Moana', 'Moana: Un mar de aventuras', '2016', '/y6wkgEH1gTWAafH9Bc7cNNut0Kf.jpg', '/iYLKMV7PIBtFmtygRrhSiyzcVsF.jpg', 1, 'En la antigua Polinesia, cuando una terrible maldición del semidiós Maui llega a la isla de Moana, ella responde al llamado del océano para buscar al semidiós y arreglar las cosas.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/277834', NULL, NULL, NULL, '2023-12-04 17:35:49', '2023-12-04 17:35:49'),
	(6, 'tv', 'Loki', 'Loki', '2021', '/53aonG0QS3ynbYuuwhPtyoOwTDD.jpg', '/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg', 1, 'Loki es llevado ante la misteriosa organización llamada AVT (Autoridad de Variación Temporal) después de los acontecimientos  ocurridos en  "Avengers: Endgame (2019)" y  se le da a elegir  enfrentarse a ser borrado de la existencia debido a que es una "variante de tiempo" o ayudar a arreglar la línea de tiempo y detener una amenaza mayor.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/84958', NULL, NULL, NULL, '2023-12-04 17:36:04', '2023-12-04 17:36:04'),
	(7, 'movie', 'tick, tick... BOOM!', 'tick, tick... BOOM!', '2021', '/DPmfcuR8fh8ROYXgdjrAjSGA0o.jpg', '/rKe3MR2u4ZZ0y9uKivzKJRrqBCe.jpg', 1, 'En la cúspide de su cumpleaños número 30, un joven y prometedor compositor de teatro navega por el amor, la amistad y las presiones de la vida como artista en la ciudad de Nueva York.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/537116', NULL, NULL, NULL, '2023-12-04 17:37:28', '2023-12-04 17:37:28'),
	(8, 'movie', 'Hamilton', 'Hamilton', '2020', '/h1B7tW0t399VDjAcWJh8m87469b.jpg', '/uWVkEo9PWHu9algZsiLPi6sRU64.jpg', 1, 'La historia gira en torno a los padres fundadores de los Estados Unidos, como George Washington y Thomas Jefferson, y a las experiencias vividas por Alexander Hamilton a lo largo de su vida, en la que se codeó con personajes históricos como Aaron Burr y John Laurens. A través de este musical en clave de hip hop, se puede ver cómo Hamilton fue un huérfano en el Caribe, un inmigrante en Nueva York que consiguió hacerse un hueco en el ejército personal de George Washington, ser elegido por el presidente como Secretario del Tesoro de los Estados Unidos, y convertirse en uno de los padres de la política económica norteamericana.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/556574', NULL, NULL, NULL, '2023-12-04 17:37:39', '2023-12-04 17:37:39'),
	(9, 'movie', 'Mary Poppins', 'Mary Poppins', '1964', '/8hU9v0EYEiAWYOkROcy4iWnSNpl.jpg', '/prVH6SyQ6yDmzVxxkcr57zhLM5C.jpg', 1, 'Una familia inglesa formada por un padre banquero, una madre sufraguista y dos niños rebeldes -que pretenden llamar la atención de su padre haciendo la vida imposible a todas las niñeras-, se verá alterada con la llegada de Mary Poppins, una institutriz muy especial, que desciende de las nubes empleando su paraguas como paracaídas. Una niñera mágica y canciones pegadizas que harán las delicias de los más pequeños de la casa.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/433', NULL, NULL, NULL, '2023-12-04 17:37:58', '2023-12-04 17:37:58'),
	(10, 'movie', 'Mary Poppins Returns', 'El Regreso De Mary Poppins', '2018', '/d9bLYgkgppdsyGaI4uSrZedBKpA.jpg', '/oGzToOBTRdXVOrHj8r0VgK3d2sU.jpg', 1, 'Mary Poppins es la niñera casi perfecta, con unas extraordinarias habilidades mágicas para convertir una tarea rutinaria en una aventura inolvidable y fantástica. Esta nueva secuela, vuelve para ayudar a la siguiente generación de la familia Banks a encontrar la alegría y la magia que faltan en sus vidas después de una trágica pérdida personal. La niñera viene acompañada de su amigo Jack, un optimista farolero que ayuda a llevar la luz -y la vida- a las calles de Londres.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/400650', NULL, NULL, NULL, '2023-12-04 17:38:02', '2023-12-04 17:38:02'),
	(11, 'movie', 'Encanto', 'Encanto', '2021', '/4JCyBaUJmMgmnDkLiOI8P3tDpqS.jpg', '/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg', 1, 'Encanto relata la historia de una familia extraordinaria; los Madrigal, quienes viven escondidos en las montañas de Colombia, en una casa mágica, un pueblo vibrante y en un lugar maravilloso llamado Encanto. La magia del Encanto ha bendecido a cada niño de la familia con un don único, desde la superfuerza hasta el poder de sanar; a todos, excepto Mirabel, quien desea ser tan especial como el resto de su familia.  Pero cuando la magia que rodea al Encanto está en peligro, Mirabel decide que ella, la única Madrigal sin ningún tipo de don único, puede ser la única esperanza de su excepcional familia.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/568124', NULL, NULL, NULL, '2023-12-04 17:38:27', '2023-12-04 17:38:27'),
	(12, 'movie', 'Argentina, 1985', 'Argentina, 1985', '2022', '/isLWtcB9TK3wLlTzEny2dPH6beh.jpg', '/gh1Rghpf3BIISHSAw9GsObG4TN3.jpg', 1, 'Argentina, 1985 está inspirada en la historia real de Julio Strassera, Luis Moreno Ocampo y su joven equipo jurídico que se atrevieron a acusar, contra viento y marea, a contrarreloj y bajo constante amenaza, a la más sangrienta dictadura militar argentina. Una batalla de David contra Goliat, con los héroes menos esperados.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/714888', NULL, NULL, NULL, '2023-12-04 17:39:18', '2023-12-04 17:39:18'),
	(13, 'movie', 'PAW Patrol: The Mighty Movie', 'PAW Patrol: La súper película', '2023', '/ojsARUPhtbMAcA3dCR3UwcHW1wM.jpg', '/zgQQF04u3OgNBJqClRNby1FPz9s.jpg', 1, 'Un meteorito mágico impacta en Ciudad Aventura y otorga superpoderes a los cachorros de la Patrulla Canina.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/893723', NULL, NULL, NULL, '2023-12-04 17:40:20', '2023-12-04 17:40:20'),
	(14, 'movie', 'PAW Patrol: The Movie', 'La Patrulla Canina: La película', '2021', '/fOYt5TfJKHHz0hFY37kSXKvEdf7.jpg', '/a17F3zXnmuwqxfiDa46mtlosjrv.jpg', 1, 'Ryder y los cachorros son llamados a Ciudad Aventura para evitar que el alcalde Humdinger convierta la bulliciosa metrópolis en un estado de caos.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/675445', NULL, NULL, NULL, '2023-12-04 17:40:24', '2023-12-04 17:40:24'),
	(15, 'movie', 'The Batman', 'Batman', '2022', '/mo7teil1qH0SxgLijnqeYP1Eb4w.jpg', '/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg', 1, 'Cuando un asesino se dirige a la élite de Gotham con una serie de maquinaciones sádicas, un rastro de pistas crípticas envía Batman a una investigación en los bajos fondos. A medida que las pruebas comienzan a acercarse a su casa y se hace evidente la magnitud de los planes del autor, Batman debe forjar nuevas relaciones, desenmascarar al culpable y hacer justicia al abuso de poder y la corrupción que durante mucho tiempo han asolado Gotham City.', 4.70, 3, NULL, '2023-12-04 17:33:59', 'movie/414906', NULL, NULL, NULL, '2023-12-04 17:44:05', '2023-12-04 18:56:07'),
	(16, 'tv', 'Adventure Time', 'Hora de aventura', '2010', '/vpnV0g2VOounP0kHNi86oBPceMY.jpg', '/pe4B3OYBb7qYCdkAz7nKWordbls.jpg', 1, '¡No son justos, son injustos! Conéctate con Finn y Jake mientras viajan por la Tierra de Ooo en busca de aventuras. Pero recuerda, la aventura no siempre es fácil. A veces tienes que luchar contra los gnomos de fuego que torturan a las ancianas, salvar a una princesa maloliente del Rey Helado y descongelar a un grupo de hombres de negocios congelados. ¡¿Qué repollo ?!', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/15260', NULL, NULL, NULL, '2023-12-04 17:45:25', '2023-12-04 17:45:25'),
	(17, 'tv', 'Regular Show', 'Un Show Más', '2010', '/6xea7V4d2xayrlBKOtMZ4wlV6wZ.jpg', '/bhF63Jd90gRYyTHd4y5GCGA2vX6.jpg', 1, 'Mordecai (un arrendajo azul) y Rigby (un mapache) son encargados de mantenimiento en un parque, y buscan cualquier excusa para no trabajar. En su día a día viven múltiples aventuras, muchas de ellas de carácter surrealista, en las que también interactúan el resto de personajes.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/31132', NULL, NULL, NULL, '2023-12-04 17:45:38', '2023-12-04 17:45:38'),
	(18, 'tv', 'Peppa Pig', 'Peppa Pig', '2004', '/ycf1ZqisXs8ZCGmw0reD1pI2Zlp.jpg', '/qKyczRO7EUJ0NHxIscmaZbmINYp.jpg', 1, 'Unos personajes simpáticos llenos de energía y actividad donde predomina el compañerismo. Peppa, su familia y amigos encarnan valores que sirven de ejemplo a los más pequeños como el amor, la solidaridad, el diálogo familiar entre otros.', NULL, 0, 'GB', '2023-12-04 17:33:59', 'tv/12225', NULL, NULL, NULL, '2023-12-04 17:47:26', '2023-12-04 17:47:26'),
	(19, 'tv', 'Bluey', 'Bluey', '2018', '/fPNZIi8LozFPO0OuwXH5eqPxnT0.jpg', '/7iTOLVTKoBLwDYcoOA1qTS6NY5y.jpg', 1, 'Bluey es una perrita de seis años incansable. Esta pastor ganadero australiano azul convierte el día a día con su familia en una aventura extraordinaria y desarrolla así tanto su imaginación como su capacidad mental, física y emocional.', NULL, 0, 'AU', '2023-12-04 17:33:59', 'tv/82728', NULL, NULL, NULL, '2023-12-04 17:47:35', '2023-12-04 17:47:35'),
	(20, 'movie', 'Annie', 'Annie', '2014', '/33WsmnE5M2SSGrZCQW4dlr2D5WG.jpg', '/cgh1gGBzCI2zh8fNyJMb21UYqv9.jpg', 1, 'Annie is a young, happy foster kid who\'s also tough enough to make her way on the streets of New York in 2014. Originally left by her parents as a baby with the promise that they\'d be back for her someday, it\'s been a hard knock life ever since with her mean foster mom Miss Hannigan. But everything\'s about to change when the hard-nosed tycoon and New York mayoral candidate Will Stacks—advised by his brilliant VP and his shrewd and scheming campaign advisor—makes a thinly-veiled campaign move and takes her in. Stacks believes he\'s her guardian angel, but Annie\'s self-assured nature and bright, sun-will-come-out-tomorrow outlook on life just might mean it\'s the other way around.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/196867', NULL, NULL, NULL, '2023-12-04 17:47:52', '2023-12-04 17:47:52'),
	(21, 'tv', 'Ted Lasso', 'Ted Lasso', '2020', '/5fhZdwP1DVJ0FyVH6vrFdHwpXIn.jpg', '/wImNeqxKsqmJ5OBw8j3I37GNFN3.jpg', 1, 'Ted Lasso, un ingenuo entrenadorde fútbol americano que decide probar suerte en un club de fútbol inglés aunque no tiene idea de ese deporte. Su inexperiencia despierta recelo y desdén entre jugadores y aficionados. Con un equipo y una ciudad quelo mira con sospecha, ¿logrará tener éxito?', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/97546', NULL, NULL, NULL, '2023-12-04 17:48:41', '2023-12-04 17:48:41'),
	(22, 'tv', 'The Crowded Room', 'The Crowded Room', '2023', '/vRmopCFp0j1eJGbILLsYsYzxmL8.jpg', '/kv9KH67hsVJ8RLplUBoc1kZlAtY.jpg', 1, 'Una intriga psicológica que transcurre en Manhattan en el verano de 1979, cuando un joven es arrestado por un crimen impactante y una investigadora insospechada debe descubrir el misterio que hay detrás.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/123192', NULL, NULL, NULL, '2023-12-04 17:48:59', '2023-12-04 17:48:59'),
	(23, 'tv', 'Hijack', 'Secuestro aéreo', '2023', '/vAo3QL02oOI9Xz90FILQN5vxMsQ.jpg', '/uPhsA9a2PtUYwYgECZKkOQOyL7c.jpg', 1, 'Cuando secuestran el vuelo KA29 durante el viaje de siete horas de Dubái a Londres, Sam Nelson -un consumado negociador empresarial- intenta utilizar sus habilidades profesionales para salvar a todos a bordo. ¿Esta arriesgada estrategia será su perdición?', NULL, 0, 'GB', '2023-12-04 17:33:59', 'tv/198102', NULL, NULL, NULL, '2023-12-04 17:49:12', '2023-12-04 17:49:12'),
	(24, 'movie', 'Palmer', 'Palmer', '2021', '/xSDdRAjxKAGi8fUBLOqSrBhJmF0.jpg', '/bblKpucB0XbyQBmfXsaRN985Rgh.jpg', 1, 'El ex jugador de futbol americano Eddie Palmer regresa a casa después de pasar 12 años en prisión. Sin esperarlo, empieza a cuidar de Sam, un niño de una familia conflictiva, pero el pasado de Eddie amenaza con destruir su nueva vida.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/458220', NULL, NULL, NULL, '2023-12-04 17:49:24', '2023-12-04 17:49:24'),
	(25, 'movie', 'Luck', 'Luck', '2022', '/bwlHp4KsAyuEIAtbYs4mxCkrgyx.jpg', '/sKvQUSyqsFq8e1ts6oo3Xp3dPH2.jpg', 1, '¡Sam Greenfield es la persona con menos suerte del mundo! De repente, llega a la nunca antes vista Tierra de la Suerte, y tendrá que unirse a las criaturas mágicas del lugar para cambiar su suerte.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/585511', NULL, NULL, NULL, '2023-12-04 17:49:31', '2023-12-04 17:49:31'),
	(26, 'tv', 'The Snoopy Show', 'El show de Snoopy', '2021', '/7VArREhMVdHdwYILQTrcAHJsgwB.jpg', '/o04090TAInK18zXAkp71Duq8Qbx.jpg', 1, 'El perrito más icónico del mundo está aquí. Descubre nuevas aventuras con el beagle más bailarín y soñador, acompañado de sus fieles amigos Woodstock, Charlie Brown y su inolvidable pandilla.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/110948', NULL, NULL, NULL, '2023-12-04 17:49:42', '2023-12-04 17:49:42'),
	(27, 'movie', 'Joker', 'Guasón', '2019', '/v0eQLbzT6sWelfApuYsEkYpzufl.jpg', '/r0kZNywAeN6Ar75rxDqLlTP5RiJ.jpg', 1, 'Arthur Fleck es un hombre ignorado por la sociedad, cuya motivación en la vida es hacer reír. Pero una serie de trágicos acontecimientos le llevarán a ver el mundo de otra forma. Película basada en el popular personaje de DC Comics Joker, conocido como archivillano de Batman, pero que en este film tomará un cariz más realista y oscuro.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/475557', NULL, NULL, NULL, '2023-12-04 18:02:15', '2023-12-04 18:02:15'),
	(28, 'tv', 'Tom Clancy\'s Jack Ryan', 'Jack Ryan', '2018', '/1Wz730VjE6Yee9ywb5ReXXe1GBZ.jpg', '/mDVIU9Y2TYeK2W29a2HRBiWt3JA.jpg', 1, 'Jack Ryan es una serie de acción y política americana, basada en los personajes y el mundo del espionaje internacional, creados por el escritor Tom Clancy. La historia sigue al analista de la CIA, Jack Ryan, mientras es forzado a abandonar el monótono pero seguro papeleo de escritorio y ser lanzado a los riesgosos trabajos de campo, después de tropezarse con una sospechosa serie de transferencias bancarias que lo obligarán a tomar parte en un mortal juego del gato y el ratón.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/73375', NULL, NULL, NULL, '2023-12-04 18:03:35', '2023-12-04 18:03:35'),
	(29, 'movie', 'Leo', 'Leo', '2023', '/hs41WYhEuaq4PaBbtaoCfGFEebi.jpg', '/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg', 1, 'Leo, un lagarto hastiado de 74 años, ha estado atrapado en el mismo salón de clases de Florida durante décadas con su compañera de terrario, la tortuga. Cuando descubre que sólo le queda un año de vida, planea escapar para experimentar la vida en el exterior, pero en lugar de eso queda atrapado en los problemas de sus ansiosos estudiantes, incluido un profesor sustituto increíblemente malo.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/1075794', NULL, NULL, NULL, '2023-12-04 18:05:47', '2023-12-04 18:05:47'),
	(30, 'tv', 'Star Trek: Strange New Worlds', 'Star Trek: Extraños Nuevos Mundos', '2022', '/7Cp5w4X8xH2x4xDk67C5kMC5ePA.jpg', '/627K48naKH2Y3Rz47Ydra4qktdI.jpg', 1, 'Siga a Christopher Pike, Spock y Number One en los años antes de que el Capitán Kirk abordara el U.S.S. Enterprise, mientras exploran nuevos mundos alrededor de la galaxia.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/103516', NULL, NULL, NULL, '2023-12-04 18:06:30', '2023-12-04 18:06:30'),
	(31, 'tv', 'Halo', 'Halo', '2022', '/m8tW2ssuqib10BUlUZfbYlfqEfd.jpg', '/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg', 1, 'Representando un conflicto épico del siglo 26 entre la humanidad y una amenaza alienígena conocida como el Pacto, la serie teje historias personales profundamente dibujadas con acción, aventura y una visión ricamente imaginada del futuro.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/52814', NULL, NULL, NULL, '2023-12-04 18:06:36', '2023-12-04 18:06:36'),
	(32, 'tv', 'Yellowstone', 'Yellowstone', '2018', '/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg', '/xHkOKPUe3ioXyPIe5odyL6o6cp4.jpg', 1, 'John Dutton (Costner) es el propietario del rancho más grande de Estados Unidos. Él y sus hijos entablarán una lucha sin cuartel contra una reserva india y contra el Gobierno federal de Estados Unidos que intenta expandir el parque nacional contiguo a la propiedad de los Dutton.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/73586', NULL, NULL, NULL, '2023-12-04 18:06:50', '2023-12-04 18:06:50'),
	(33, 'tv', 'Your Honor', 'Su Señoría', '2020', '/1rWWgTEDFdV330aLgCoaq7I56lk.jpg', '/t73x5Pb81mIGZR417aeGwbkR520.jpg', 1, 'Un joven adolescente atropella mortalmente a un motorista de forma accidental y se da a la fuga. Su padre, un respetado juez de la ciudad de Nueva Orleans, decide proteger a su hijo.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/86430', NULL, NULL, NULL, '2023-12-04 18:07:01', '2023-12-04 18:07:01'),
	(34, 'tv', 'No Escape', 'No Escape', '2023', '/AsIDKFpBeTjuZpKjHNki6JgV0s4.jpg', '/cmzNw4BpBPdFNFlxH7Ns7RAYdgs.jpg', 1, 'Best friends Lana and Kitty are on the run from the UK police. They find sanctuary on a ship called The Blue, which promises a carefree life full of beautiful people, parties and endless beaches, but that paradise soon turns into a nightmare and the pair find themselves far from home and in mortal danger.', NULL, 0, 'GB', '2023-12-04 17:33:59', 'tv/222288', NULL, NULL, NULL, '2023-12-04 18:07:11', '2023-12-04 18:07:11'),
	(35, 'tv', 'Tulsa King', 'Tulsa King', '2022', '/yzRnj5GMZEjiW9xTGkz8cVNyzH9.jpg', '/mNHRGO1gFpR2CYZdANe72kcKq7G.jpg', 1, 'Justo después de ser liberado de prisión después de 25 años, el capo de la mafia de Nueva York, Dwight "El General" Manfredi, es exiliado sin contemplaciones por su jefe para instalarse en Tulsa, Oklahoma. Al darse cuenta de que su familia de la mafia puede no tener sus mejores intereses en mente, Dwight construye lentamente una "tripulación" a partir de un grupo de personajes inverosímiles, para ayudarlo a establecer un nuevo imperio criminal en un lugar que para él bien podría ser otro planeta.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/153312', NULL, NULL, NULL, '2023-12-04 18:07:25', '2023-12-04 18:07:25'),
	(36, 'tv', 'Dora the Explorer', 'Dora, la exploradora', '2000', '/l0SqSh62sYM3zPphjVPnicd2jYj.jpg', '/uEPbIAmsZENHL5B50WNYSyItFjf.jpg', 1, 'Dora Márquez es una niña de 7 años que, junto a su amigo Botas (un mono de 5 años) emprende en cada episodio un viaje en el que se propone buscar algo que perdió o ayudar a Botas a cumplir con alguna misión. Siguiendo un formato que en parte recuerda el de un juego interactivo para computadora, en cada episodio Dora pide a sus amigos televidentes que le ayuden a encontrar nuevos lugares utilizando a Mapa, que de hecho es otro personaje, y le ayuden a solucionar las dificultades que Dora se encuentre en el camino. Otro objetivo importante que persigue el programa es la enseñanza amena de elementos del idioma inglés a los niños de habla hispana (en la versión original de la serie Dora enseña elementos del español y de la cultura latinoamericana a sus televidentes angloparlantes).', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/79', NULL, NULL, NULL, '2023-12-04 18:07:34', '2023-12-04 18:07:34'),
	(37, 'tv', 'South Park', 'South Park', '1997', '/ka1ilKJLUkNvirukSAASEcufNFK.jpg', '/41neXsH222hV2zrsTyw8h7javon.jpg', 1, 'South Park es una serie de televisión estadounidense de animación, creada por Trey Parker y Matt Stone para el canal Comedy Central. Está dirigida al público adulto y se caracteriza por satirizar con humor negro la sociedad, actualidad y cultura estadounidense a través de las historias y situaciones surrealistas que les suceden a sus protagonistas, cuatro niños (Stan, Kyle, Cartman y Kenny) residentes en un pueblo ficticio de Colorado que se llama South Park.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/2190', NULL, NULL, NULL, '2023-12-04 18:08:17', '2023-12-04 18:08:17'),
	(38, 'movie', 'Scream VI', 'Scream 6', '2023', '/zh0JffFtxcWEJBLKayH3d34WnNT.jpg', '/44immBwzhDVyjn87b3x3l9mlhAD.jpg', 1, 'Sam, Tara, Mindy y Chad quieren tener una vida completamente normal, por ello, después de la masacre final de Ghostface en Woodsboro, deciden mudarse a Nueva York. Todos ellos quieren abandonar esas horribles vivencias que sufrieron en su pequeño pueblo. Sin embargo, no pueden escapar tan fácilmente de sus problemas y les volverá a perseguir, el ya conocido, asesino con una máscara de fantasma. Lo comienzan a ver en el metro, en el supermercado, en medio de la gran ciudad. Sam, Tara, Mindy y Chad no están dispuestos a rendirse y se preparan para acabar con él y volver a vivir en tranquilidad.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/934433', NULL, NULL, NULL, '2023-12-04 18:08:36', '2023-12-04 18:08:36'),
	(39, 'movie', 'The Super Mario Bros. Movie', 'Super Mario Bros. La película', '2023', '/zNKs1T0VZuJiVuhuL5GSCNkGdxf.jpg', '/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg', 1, 'Mientras trabaja bajo tierra para arreglar una tubería de agua, los plomeros de Brooklyn Mario y su hermano Luigi son transportados por una misteriosa tubería y llegan a un nuevo mundo mágico. Pero cuando los hermanos se separan, Mario se embarca en una búsqueda épica para encontrar a Luigi. Con la ayuda de un residente del Reino Champiñón, Toad y algo de entrenamiento de la gobernante del Reino Champiñón, la Princesa Peach, Mario conocerá su propio poder.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/502356', NULL, NULL, NULL, '2023-12-04 18:09:05', '2023-12-04 18:09:05'),
	(40, 'tv', 'Rick and Morty', 'Rick y Morty', '2013', '/5Yiep9EwcQgLolg013ETBVqHxuD.jpg', '/rBF8wVQN8hTWHspVZBlI3h7HZJ.jpg', 1, 'Rick Sánchez es un genio científico alcohólico que se ha mudado con la familia de su hija Beth. Él pasa el tiempo con su nieto adolescente Morty (y en ocasiones con otros miembros de la familia) en aventuras peligrosas y surrealistas a través del espacio y universos paralelos.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/60625', NULL, NULL, NULL, '2023-12-04 18:09:37', '2023-12-04 18:09:37'),
	(41, 'tv', 'The Big Bang Theory', 'La Teoría del Big Bang', '2007', '/2bDQWCvFxRGhdvThTJvVxueEoLl.jpg', '/7RySzFeK3LPVMXcPtqfZnl6u4p1.jpg', 1, 'Leonard y Sheldon son dos físicos que comparten trabajo y apartamento. La serie comienza con la mudanza de Penny, su nueva y atractiva vecina, y hace hincapié en la dificultad de los físicos para relacionarse con personas fuera de su entorno para dar lugar a situaciones cómicas.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/1418', NULL, NULL, NULL, '2023-12-04 18:09:47', '2023-12-04 18:09:47'),
	(42, 'movie', 'Scoob!', '¡Scooby!', '2020', '/zD8LFCoOPe4ooBTkedl1sGSYRGO.jpg', '/fKtYXUhX5fxMxzQfyUcQW9Shik6.jpg', 1, 'Scooby y la pandilla enfrentan su misterio más complicado: un complot para liberar al perro fantasma Cerbero contra el mundo. Mientras corren para detener el apocalipsis perruno, el grupo descubre que Scooby tiene un épico destino que nadie sospechó nunca.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/385103', NULL, NULL, NULL, '2023-12-04 18:11:54', '2023-12-04 18:11:54'),
	(43, 'tv', 'Ben 10', 'Ben 10', '2005', '/pT0NlYVIkwM2zAw9oUkePwrOlxW.jpg', '/v5hLUEpbn3G3oLXLdF7lFikDivb.jpg', 1, 'Gracias a un dispositivo misterioso conocido como el Omnitrix, Ben Tennyson tiene el poder de transformarse en una variedad de superhéroes alienígenas.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/4686', NULL, NULL, NULL, '2023-12-04 18:12:21', '2023-12-04 18:12:21'),
	(44, 'movie', 'Avengers: Endgame', 'Avengers: Endgame', '2019', '/br6krBFpaYmCSglLBWRuhui7tPc.jpg', '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', 1, 'Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/299534', NULL, NULL, NULL, '2023-12-04 18:13:13', '2023-12-04 18:13:13'),
	(45, 'movie', 'Avengers: Infinity War', 'Avengers: Infinity War', '2018', '/ksBQ4oHQDdJwND8H90ay8CbMihU.jpg', '/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', 1, 'Los Vengadores y sus aliados deben estar dispuestos a sacrificarlo todo para intentar derrotar al poderoso Thanos antes de que su ataque de devastación y ruina ponga fin al universo.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/299536', NULL, NULL, NULL, '2023-12-04 18:14:43', '2023-12-04 18:14:43'),
	(46, 'movie', 'Harry Potter and the Philosopher\'s Stone', 'Harry Potter y la piedra filosofal', '2001', '/7xXJ15VEf7G9GdAuV1dO769yC73.jpg', '/hziiv14OpD73u9gAak4XDDfBKa2.jpg', 1, 'El día en que cumple once años, Harry Potter se entera de que es hijo de dos destacados hechiceros, de los que ha heredado poderes mágicos. En la escuela Hogwarts de Magia y Hechicería, donde se educa con otros niños que también tienen poderes especiales, aprenderá todo lo necesario para ser mago.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/671', NULL, NULL, NULL, '2023-12-04 18:14:56', '2023-12-04 18:14:56'),
	(47, 'tv', 'Soy Luna', 'Soy Luna', '2016', '/78CUmir4MDINMKdkUt4TmW5d7k4.jpg', '/mXVr88l7877i0P4cLQl1mUvaXGJ.jpg', 1, 'Luna Valente lives with her family in Cancún, Mexico. She goes to school, has her own group of friends, has a job, and loves to skate. However, her life changes when her parents are given a job offer that moves them to Buenos Aires, Argentina. There she finds a new skating rink (named Jam & Roller), learns freestyling, makes new friends, and even falls in love.', NULL, 0, 'AR', '2023-12-04 17:33:59', 'tv/66203', NULL, NULL, NULL, '2023-12-04 18:18:05', '2023-12-04 18:18:05'),
	(48, 'tv', 'iCarly', 'iCarly', '2021', '/ooQbYPupFxyvzEaJreuAUkcjqUA.jpg', '/yDPPqVVxEXlinYtvyefXLNWYpM4.jpg', 1, 'Un grupo de mejores amigos creando un webcast mientras lidia con problemas y aventuras cotidianas.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/119243', NULL, NULL, NULL, '2023-12-04 18:18:33', '2023-12-04 18:18:33'),
	(49, 'tv', 'iCarly', 'iCarly', '2007', '/kP8Z51s9D8tiGnoRbL88db0e2jv.jpg', '/1yguthn0tBF7XzmAbX9kwtW3I9J.jpg', 1, 'Una cámara, amigos y mucha imaginación es todo lo que necesita Carly para poner en marcha un programa retransmitido por Internet y que de inmediato se convierte en un gran éxito. Pero ser unas celebridades en la red no significa que Carly y sus amigos no tengan que resolver problemas increíbles para preparar un programa nuevo cada semana ¡Eso añadido a los líos normales de un adolescente! Por si fuera poco Sam y Freddie, los amigos de Carly, son muy particulares: Freddie está locamente enamorado de Carly y Sam es... bueno Sam es Sam, una chica un poco bruta, cuyo pasatiempo preferido es hacer rabiar al pobre Freddie.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/5371', NULL, NULL, NULL, '2023-12-04 18:18:55', '2023-12-04 18:18:55'),
	(50, 'movie', 'Top Gun: Maverick', 'Top Gun: Maverick', '2022', '/AlWpEpQq0RgZIXVHAHZtFhEvRgd.jpg', '/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg', 1, 'Después de más de treinta años de servicio como uno de los mejores aviadores de la Armada, Pete "Maverick" Mitchell está en donde pertenece, sobresaliendo como un valiente piloto de pruebas y evitando subir de rango en la armada, que evitaría que pudiera seguir volando. Cuando se encuentra entrenando a un destacamento de graduados de Top Gun para una misión especial que ningún piloto vivo ha visto antes, Maverick se encuentra con el teniente Bradley Bradshaw, señal de llamada: "Rooster", el hijo del difunto amigo de Maverick y el oficial de intercepción de radar, el teniente Nick Bradshaw, también conocido como "Goose".', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/361743', NULL, NULL, NULL, '2023-12-04 18:20:10', '2023-12-04 18:20:10'),
	(51, 'tv', 'Monster High', 'Monster High', '2022', '/2fe2GD3qpQ1pYJMF6IbvRLmdCcN.jpg', '/dILtvmsUTwtBEqe5PCKdPT0Qwy9.jpg', 1, 'Based on the Monster High franchise, Clawdeen Wolf arrives at Monster High with a dark secret. With the help of her friends Draculaura and Frankie Stein, she is able to embrace her true monster heart and save the school from total destruction.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/131532', NULL, NULL, NULL, '2023-12-04 18:21:27', '2023-12-04 18:21:27'),
	(52, 'tv', 'Special Ops: Lioness', 'Operativo: Lioness', '2023', '/d0r0rxI9UjMVvD5Krc5oET2O0gU.jpg', '/sa9vB0xb3OMU6iSMkig8RBbdESq.jpg', 1, 'Joe intenta equilibrar su vida personal y profesional como punta de lanza de la CIA en la guerra contra el terrorismo. El Programa Lioness recluta a Cruz para que opere de incógnito junto a Joe entre los poderosos del terrorismo de Estado.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/113962', NULL, NULL, NULL, '2023-12-04 18:22:02', '2023-12-04 18:22:02'),
	(53, 'tv', 'Game of Thrones', 'Juego de Tronos', '2011', '/z9gCSwIObDOD2BEtmUwfasar3xs.jpg', '/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg', 1, 'En un mundo fantástico y en un contexto medieval varias familias, relativas a la nobleza, se disputan el poder para dominar el territorio ficticio de Poniente (Westeros) y tomar el control de los Siete Reinos desde el Trono de Hierro, lugar donde el rey ejerce el poder.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/1399', NULL, NULL, NULL, '2023-12-04 18:23:53', '2023-12-04 18:23:53'),
	(54, 'movie', 'Zack Snyder\'s Justice League', 'La Liga de la Justicia de Zack Snyder', '2021', '/wcIJgChypo0s6ILm9Dkr13rV5q0.jpg', '/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg', 1, 'Decidido a asegurarse de que el sacrificio final de Superman no fue en vano, Bruce Wayne alinea fuerzas con Diana Prince con planes para reclutar un equipo de metahumanos para proteger al mundo de una amenaza de proporciones catastróficas que se aproxima.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/791373', NULL, NULL, NULL, '2023-12-04 18:24:13', '2023-12-04 18:24:13'),
	(55, 'tv', 'The Enfield Poltergeist', 'La maldición de Enfield', '2023', '/ctGC872WaKvkgIwvgu6MX6uxzga.jpg', '/k86ACtdzhdgSrG73Q996OUidKAr.jpg', 1, 'Vive la escalofriante historia real del caso de poltergeist más famoso del mundo a través de las grabaciones de audio originales que se registraron dentro de la casa cuando sucedieron los hechos.', NULL, 0, 'GB', '2023-12-04 17:33:59', 'tv/235851', NULL, NULL, NULL, '2023-12-04 18:25:14', '2023-12-04 18:25:14'),
	(56, 'movie', 'Stephen Curry: Underrated', 'Stephen Curry: infravalorado', '2023', '/zkSbTskb99UxUaNH7w5Ka2M30Zl.jpg', '/fy3WUGHWoTnxZKhWics6fSFL5i0.jpg', 1, 'La extraordinaria historia del crecimiento de Stephen Curry, uno de los jugadores más influyentes, dinámicos e inesperados en la historia del baloncesto, y su ascenso desde que era un jugador universitario de altura insuficiente hasta llegar a ser un cuádruple campeón de la NBA.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/860278', NULL, NULL, NULL, '2023-12-04 18:25:40', '2023-12-04 18:25:40'),
	(57, 'movie', 'The Elephant Queen', 'Reina de elefantes', '2019', '/Kn64w1zz5zHy5N7ILkeDo84s1a.jpg', '/hOGyG78jlEgTKE7csCLmyZvJojY.jpg', 1, 'Conozcan a Athena, un carismático animal con colmillos que se ha ganado el respeto de su familia liderándola con adorable practicidad. Athena sabe que el destino de sus pequeños depende de ella y frente a la sequía, tendrá que decidir si sacar a su familia de su hogar para buscar alimento, sabiendo que los elefantes pequeños quizá no estén todavía preparados para el viaje.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/541572', NULL, NULL, NULL, '2023-12-04 18:26:02', '2023-12-04 18:26:02'),
	(58, 'tv', 'Severance', 'Severance', '2022', '/wrZjYKxObEaWZmjB7scQMYo40o8.jpg', '/npD65vPa4vvn1ZHpp3o05A5vdKT.jpg', 1, 'Mark dirige un equipo de oficinistas, cuyas memorias fueron divididas quirúrgicamente entre sus vidas personales y laborales. Cuando un colega misterioso aparece fuera del trabajo, inicia un viaje por descubrir la verdad sobre sus empleos.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/95396', NULL, NULL, NULL, '2023-12-04 18:26:27', '2023-12-04 18:26:27'),
	(59, 'movie', 'Grease', 'Grease', '1978', '/flSy0dexE82TiS6Si2FtulSHk8o.jpg', '/pdhDFmVQSA0f5i5IL0gpWROjgZ5.jpg', 1, 'El rebelde Danny Zuko y la inocente australiana Sandy mantienen un romance durante las vacaciones, creyendo que no se volverán a ver; sin embargo, para sorpresa de ambos, se reencuentran en la escuela secundaria al empezar el nuevo año escolar.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/621', NULL, NULL, NULL, '2023-12-04 18:27:11', '2023-12-04 18:27:11'),
	(60, 'tv', 'Invincible', 'Invencible', '2021', '/uCRZrXZNzzDijApmREUTFywhUmW.jpg', '/pbSdwutAVywzxtx2KEoYHEwOO0h.jpg', 1, 'Mark Grayson hereda superpoderes a los diecisiete años y se une a su padre como uno de los mayores héroes de la Tierra. Todos sus sueños se hacen realidad, hasta que un evento impactante lo cambia todo.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/95557', NULL, NULL, NULL, '2023-12-04 18:28:31', '2023-12-04 18:28:31'),
	(61, 'tv', 'Gen V', 'Gen V', '2023', '/8XQNhJ3y8LT8guh7wwbzUgzuAi3.jpg', '/urzEsxKKNgCan2mX5z5heXbUyef.jpg', 1, 'En la única universidad para superhéroes de Estados Unidos, los estudiantes superdotados ponen a prueba sus límites morales, compitiendo por la clasificación más alta de la universidad y la oportunidad de unirse a The Seven, el equipo de élite de superhéroes de Vought International. Cuando los oscuros secretos de la escuela salen a la luz, deben decidir en qué tipo de héroes quieren convertirse.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/205715', NULL, NULL, NULL, '2023-12-04 18:28:42', '2023-12-04 18:28:42'),
	(62, 'tv', 'The Boys', 'The Boys', '2019', '/cSAN6ofLRwRiuwOHYD81p4k6Yks.jpg', '/thLAoL6VeZGmCyDpCOeoxLvA8yS.jpg', 1, 'La serie tiene lugar en un mundo en el que los superhéroes representan el lado oscuro de la celebridad y la fama. Un grupo de vigilantes que se hacen llamar "The Boys" decide hacer todo lo posible por frenar a los superhéroes que están perjudicando a la sociedad, independientemente de los riesgos que ello conlleva.', NULL, 0, 'US', '2023-12-04 17:33:59', 'tv/76479', NULL, NULL, NULL, '2023-12-04 18:28:53', '2023-12-04 18:28:53'),
	(63, 'movie', 'John Wick: Chapter 4', 'John Wick 4', '2023', '/gh2bmprLtUQ8oXCSluzfqaicyrm.jpg', '/kBBMF7GWYXzdRSk5w4xwip7yk3U.jpg', 1, 'John Wick descubre un camino para derrotar a La Mesa. Pero antes de poder ganar su libertad, Wick deberá enfrentarse a un nuevo enemigo con poderosas alianzas en todo el mundo; y contra las fuerzas que convierten a viejos amigos en enemigos.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/603692', NULL, NULL, NULL, '2023-12-04 18:29:06', '2023-12-04 18:29:06'),
	(64, 'movie', 'Kung Fu Panda', 'Kung Fu Panda', '2008', '/wzOERnvuM3c2mbAvCu5pw1QIaZX.jpg', '/d1RHScaZc7I8j0lDke1c4AxI435.jpg', 1, 'Cuando el Valle de la Paz se ve amenazado, el perezoso Po el panda descubre su destino como el “elegido” y se entrena para convertirse en un héroe de kung fu, pero no será fácil transformar al vago desaliñado en un valiente guerrero. Depende del Maestro Shifu y los Cinco Furiosos: Tigresa, Grulla, Mantis, Víbora y Mono: intentarlo.', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/9502', NULL, NULL, NULL, '2023-12-04 18:31:21', '2023-12-04 18:31:21'),
	(65, 'movie', 'Jurassic World', 'Jurassic World: Mundo Jurásico', '2015', '/lWhnr4ehIiRMudbF6YCEViatbaN.jpg', '/dF6FjTZzRTENfB4R17HDN20jLT2.jpg', 1, 'Veintidós años después de lo ocurrido en Jurassic Park, la isla Nublar ha sido transformada en un enorme parque temático, Jurassic Wold, con versiones «domesticadas» de algunos de los dinosaurios más conocidos. Cuando todo parece ir sobre ruedas y ser el negocio del siglo, un nuevo dinosaurio de especie desconocida, pues ha sido creado manipulando genéticamente su ADN, y que resulta ser mucho más inteligente de lo que se pensaba, se escapa de su recinto y comienza a causar estragos entre los visitantes del Parque', NULL, 0, NULL, '2023-12-04 17:33:59', 'movie/135397', NULL, NULL, NULL, '2023-12-04 18:32:00', '2023-12-04 18:32:00');

-- Volcando estructura para tabla kite_app.title_has_genre
DROP TABLE IF EXISTS `title_has_genre`;
CREATE TABLE IF NOT EXISTS `title_has_genre` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `genre_id` bigint unsigned NOT NULL,
  `title_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `title_has_genre_genre_id_foreign` (`genre_id`),
  KEY `title_has_genre_title_id_foreign` (`title_id`),
  CONSTRAINT `title_has_genre_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
  CONSTRAINT `title_has_genre_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.title_has_genre: ~157 rows (aproximadamente)
INSERT INTO `title_has_genre` (`id`, `genre_id`, `title_id`, `created_at`, `updated_at`) VALUES
	(1, 80, 1, NULL, NULL),
	(2, 18, 1, NULL, NULL),
	(3, 10759, 2, NULL, NULL),
	(4, 80, 2, NULL, NULL),
	(5, 18, 2, NULL, NULL),
	(6, 9648, 2, NULL, NULL),
	(7, 99, 3, NULL, NULL),
	(8, 99, 4, NULL, NULL),
	(9, 12, 5, NULL, NULL),
	(10, 35, 5, NULL, NULL),
	(11, 10751, 5, NULL, NULL),
	(12, 16, 5, NULL, NULL),
	(13, 18, 6, NULL, NULL),
	(14, 10765, 6, NULL, NULL),
	(15, 18, 7, NULL, NULL),
	(16, 10402, 7, NULL, NULL),
	(17, 36, 8, NULL, NULL),
	(18, 18, 8, NULL, NULL),
	(19, 35, 9, NULL, NULL),
	(20, 10751, 9, NULL, NULL),
	(21, 14, 9, NULL, NULL),
	(22, 14, 10, NULL, NULL),
	(23, 10751, 10, NULL, NULL),
	(24, 35, 10, NULL, NULL),
	(25, 16, 11, NULL, NULL),
	(26, 35, 11, NULL, NULL),
	(27, 10751, 11, NULL, NULL),
	(28, 14, 11, NULL, NULL),
	(29, 18, 12, NULL, NULL),
	(30, 36, 12, NULL, NULL),
	(31, 16, 13, NULL, NULL),
	(32, 10751, 13, NULL, NULL),
	(33, 28, 13, NULL, NULL),
	(34, 878, 13, NULL, NULL),
	(35, 35, 13, NULL, NULL),
	(36, 16, 14, NULL, NULL),
	(37, 10751, 14, NULL, NULL),
	(38, 12, 14, NULL, NULL),
	(39, 35, 14, NULL, NULL),
	(40, 80, 15, NULL, NULL),
	(41, 9648, 15, NULL, NULL),
	(42, 53, 15, NULL, NULL),
	(43, 16, 16, NULL, NULL),
	(44, 35, 16, NULL, NULL),
	(45, 10765, 16, NULL, NULL),
	(46, 16, 17, NULL, NULL),
	(47, 35, 17, NULL, NULL),
	(48, 16, 18, NULL, NULL),
	(49, 10762, 18, NULL, NULL),
	(50, 16, 19, NULL, NULL),
	(51, 10762, 19, NULL, NULL),
	(52, 35, 20, NULL, NULL),
	(53, 18, 20, NULL, NULL),
	(54, 10751, 20, NULL, NULL),
	(55, 35, 21, NULL, NULL),
	(56, 18, 21, NULL, NULL),
	(57, 18, 22, NULL, NULL),
	(58, 80, 22, NULL, NULL),
	(59, 9648, 22, NULL, NULL),
	(60, 18, 23, NULL, NULL),
	(61, 18, 24, NULL, NULL),
	(62, 16, 25, NULL, NULL),
	(63, 12, 25, NULL, NULL),
	(64, 35, 25, NULL, NULL),
	(65, 14, 25, NULL, NULL),
	(66, 16, 26, NULL, NULL),
	(67, 80, 27, NULL, NULL),
	(68, 53, 27, NULL, NULL),
	(69, 18, 27, NULL, NULL),
	(70, 10759, 28, NULL, NULL),
	(71, 18, 28, NULL, NULL),
	(72, 10768, 28, NULL, NULL),
	(73, 16, 29, NULL, NULL),
	(74, 35, 29, NULL, NULL),
	(75, 10751, 29, NULL, NULL),
	(76, 10765, 30, NULL, NULL),
	(77, 10759, 31, NULL, NULL),
	(78, 10765, 31, NULL, NULL),
	(79, 37, 32, NULL, NULL),
	(80, 18, 32, NULL, NULL),
	(81, 18, 33, NULL, NULL),
	(82, 80, 33, NULL, NULL),
	(83, 18, 34, NULL, NULL),
	(84, 80, 35, NULL, NULL),
	(85, 18, 35, NULL, NULL),
	(86, 10759, 36, NULL, NULL),
	(87, 16, 36, NULL, NULL),
	(88, 10751, 36, NULL, NULL),
	(89, 10762, 36, NULL, NULL),
	(90, 16, 37, NULL, NULL),
	(91, 35, 37, NULL, NULL),
	(92, 27, 38, NULL, NULL),
	(93, 80, 38, NULL, NULL),
	(94, 53, 38, NULL, NULL),
	(95, 16, 39, NULL, NULL),
	(96, 10751, 39, NULL, NULL),
	(97, 12, 39, NULL, NULL),
	(98, 14, 39, NULL, NULL),
	(99, 35, 39, NULL, NULL),
	(100, 16, 40, NULL, NULL),
	(101, 35, 40, NULL, NULL),
	(102, 10765, 40, NULL, NULL),
	(103, 10759, 40, NULL, NULL),
	(104, 35, 41, NULL, NULL),
	(105, 16, 42, NULL, NULL),
	(106, 35, 42, NULL, NULL),
	(107, 10751, 42, NULL, NULL),
	(108, 9648, 42, NULL, NULL),
	(109, 16, 43, NULL, NULL),
	(110, 35, 43, NULL, NULL),
	(111, 12, 44, NULL, NULL),
	(112, 878, 44, NULL, NULL),
	(113, 28, 44, NULL, NULL),
	(114, 12, 45, NULL, NULL),
	(115, 28, 45, NULL, NULL),
	(116, 878, 45, NULL, NULL),
	(117, 12, 46, NULL, NULL),
	(118, 14, 46, NULL, NULL),
	(119, 10766, 47, NULL, NULL),
	(120, 10762, 47, NULL, NULL),
	(121, 35, 48, NULL, NULL),
	(122, 35, 49, NULL, NULL),
	(123, 10751, 49, NULL, NULL),
	(124, 10762, 49, NULL, NULL),
	(125, 28, 50, NULL, NULL),
	(126, 18, 50, NULL, NULL),
	(127, 16, 51, NULL, NULL),
	(128, 10751, 51, NULL, NULL),
	(129, 10762, 51, NULL, NULL),
	(130, 18, 52, NULL, NULL),
	(131, 10765, 53, NULL, NULL),
	(132, 18, 53, NULL, NULL),
	(133, 10759, 53, NULL, NULL),
	(134, 28, 54, NULL, NULL),
	(135, 12, 54, NULL, NULL),
	(136, 14, 54, NULL, NULL),
	(137, 99, 55, NULL, NULL),
	(138, 99, 56, NULL, NULL),
	(139, 99, 57, NULL, NULL),
	(140, 10751, 57, NULL, NULL),
	(141, 18, 58, NULL, NULL),
	(142, 9648, 58, NULL, NULL),
	(143, 10765, 58, NULL, NULL),
	(144, 10749, 59, NULL, NULL),
	(145, 35, 59, NULL, NULL),
	(146, 16, 60, NULL, NULL),
	(147, 10765, 60, NULL, NULL),
	(148, 10759, 60, NULL, NULL),
	(149, 18, 60, NULL, NULL),
	(150, 10759, 61, NULL, NULL),
	(151, 18, 61, NULL, NULL),
	(152, 10765, 61, NULL, NULL),
	(153, 10765, 62, NULL, NULL),
	(154, 10759, 62, NULL, NULL),
	(155, 28, 63, NULL, NULL),
	(156, 53, 63, NULL, NULL),
	(157, 80, 63, NULL, NULL),
	(158, 28, 64, NULL, NULL),
	(159, 12, 64, NULL, NULL),
	(160, 16, 64, NULL, NULL),
	(161, 10751, 64, NULL, NULL),
	(162, 35, 64, NULL, NULL),
	(163, 28, 65, NULL, NULL),
	(164, 12, 65, NULL, NULL),
	(165, 878, 65, NULL, NULL),
	(166, 53, 65, NULL, NULL);

-- Volcando estructura para tabla kite_app.title_on_service
DROP TABLE IF EXISTS `title_on_service`;
CREATE TABLE IF NOT EXISTS `title_on_service` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `service_id` bigint unsigned NOT NULL,
  `title_id` bigint unsigned NOT NULL,
  `quality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leaving` timestamp NULL DEFAULT NULL,
  `available_since` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `title_on_service_title_id_foreign` (`title_id`),
  KEY `title_on_service_service_id_foreign` (`service_id`),
  CONSTRAINT `title_on_service_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `title_on_service_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.title_on_service: ~61 rows (aproximadamente)
INSERT INTO `title_on_service` (`id`, `service_id`, `title_id`, `quality`, `link`, `leaving`, `available_since`, `created_at`, `updated_at`) VALUES
	(1, 4, 1, 'HD', 'https://www.netflix.com/title/80192098/', NULL, NULL, '2023-12-04 17:34:50', '2023-12-04 17:34:50'),
	(2, 4, 2, 'HD', 'https://www.netflix.com/title/80997343/', NULL, NULL, '2023-12-04 17:35:01', '2023-12-04 17:35:01'),
	(3, 4, 3, 'HD', 'https://www.netflix.com/title/81488216/', NULL, NULL, '2023-12-04 17:35:26', '2023-12-04 17:35:26'),
	(4, 4, 4, 'HD', 'https://www.netflix.com/title/81098822/', NULL, NULL, '2023-12-04 17:35:30', '2023-12-04 17:35:30'),
	(5, 2, 5, 'uhd', 'https://www.disneyplus.com/movies/moana/70GoJHflgHH9', NULL, NULL, '2023-12-04 17:35:50', '2023-12-04 17:35:50'),
	(6, 2, 6, 'uhd', 'https://www.disneyplus.com/series/loki/6pARMvILBGzF', NULL, NULL, '2023-12-04 17:36:06', '2023-12-04 17:36:06'),
	(7, 4, 7, 'HD', 'https://www.netflix.com/title/81149184/', NULL, NULL, '2023-12-04 17:37:29', '2023-12-04 17:37:29'),
	(8, 2, 8, 'uhd', 'https://www.disneyplus.com/movies/hamilton/3uPmBHWlO6HJ', NULL, NULL, '2023-12-04 17:37:40', '2023-12-04 17:37:40'),
	(9, 2, 9, 'hd', 'https://www.disneyplus.com/movies/mary-poppins/3P3waOoBmUdm', NULL, NULL, '2023-12-04 17:37:59', '2023-12-04 17:37:59'),
	(10, 2, 10, 'uhd', 'https://www.disneyplus.com/movies/mary-poppins-returns/5F6U4wl2xb7P', NULL, NULL, '2023-12-04 17:38:04', '2023-12-04 17:38:04'),
	(11, 2, 11, 'uhd', 'https://www.disneyplus.com/movies/encanto/33q7DY1rtHQH', NULL, NULL, '2023-12-04 17:38:29', '2023-12-04 17:38:29'),
	(12, 6, 12, 'uhd', 'https://www.primevideo.com/detail/0U3X7URM9HIE7L8OYI27ZS77YN/ref=atv_dp', NULL, NULL, '2023-12-04 17:39:19', '2023-12-04 17:39:19'),
	(13, 4, 14, 'HD', 'https://www.netflix.com/title/81416774/', NULL, NULL, '2023-12-04 17:40:25', '2023-12-04 17:40:25'),
	(14, 6, 15, 'sd', 'https://www.primevideo.com/detail/0TNWJYOSXYR74OY4W78E71780P/ref=atv_dp', NULL, NULL, '2023-12-04 17:44:06', '2023-12-04 17:44:06'),
	(15, 3, 15, 'uhd', 'https://play.hbomax.com/page/urn:hbo:page:GYiDbSAmIpMNvYAEAAAAI:type:feature', NULL, NULL, '2023-12-04 17:44:06', '2023-12-04 17:44:06'),
	(16, 3, 16, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GXmAuwAxxXp4_wwEAACh0:type:series', NULL, NULL, '2023-12-04 17:45:29', '2023-12-04 17:45:29'),
	(17, 4, 16, 'HD', 'https://www.netflix.com/title/70241425/', NULL, NULL, '2023-12-04 17:45:29', '2023-12-04 17:45:29'),
	(18, 3, 17, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GXl20QAK1sTC3wwEAAB4I:type:series', NULL, NULL, '2023-12-04 17:45:42', '2023-12-04 17:45:42'),
	(19, 4, 18, 'HD', 'https://www.netflix.com/title/80025494/', NULL, NULL, '2023-12-04 17:47:29', '2023-12-04 17:47:29'),
	(20, 2, 19, 'hd', 'https://www.disneyplus.com/series/bluey/1xy9TAOQ0M3r', NULL, NULL, '2023-12-04 17:47:39', '2023-12-04 17:47:39'),
	(21, 4, 20, 'HD', 'https://www.netflix.com/title/70305931/', NULL, NULL, '2023-12-04 17:47:53', '2023-12-04 17:47:53'),
	(22, 1, 21, 'uhd', 'https://tv.apple.com/ar/show/ted-lasso/umc.cmc.vtoh0mn0xn7t3c643xqonfzy', NULL, NULL, '2023-12-04 17:48:47', '2023-12-04 17:48:47'),
	(23, 1, 22, 'uhd', 'https://tv.apple.com/ar/show/the-crowded-room/umc.cmc.495pmjg441gg3j70j3x2yufx9', NULL, NULL, '2023-12-04 17:49:01', '2023-12-04 17:49:01'),
	(24, 1, 24, 'uhd', 'https://tv.apple.com/ar/movie/palmer/umc.cmc.40qrv09i2yfh8iilyi4s8vfi?playableId=tvs.sbd.4000%3AVPALM0560101', NULL, NULL, '2023-12-04 17:49:26', '2023-12-04 17:49:26'),
	(25, 1, 25, 'uhd', 'https://tv.apple.com/ar/movie/luck/umc.cmc.5w6fq1u39v7ozsdv3jkx0nrfs?playableId=tvs.sbd.4000%3AA0053801001', NULL, NULL, '2023-12-04 17:49:33', '2023-12-04 17:49:33'),
	(26, 1, 26, 'uhd', 'https://tv.apple.com/ar/show/el-show-de-snoopy/umc.cmc.5iswprrvjjw6ab020a17x4ca3', NULL, NULL, '2023-12-04 17:49:53', '2023-12-04 17:49:53'),
	(27, 3, 27, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GYGOrjQfhvKCWowEAAAAE:type:feature', NULL, NULL, '2023-12-04 18:02:16', '2023-12-04 18:02:16'),
	(28, 6, 27, 'sd', 'https://www.primevideo.com/detail/0GMB11EJPS2AO890FSOYYGKMB9/ref=atv_dp', NULL, NULL, '2023-12-04 18:02:16', '2023-12-04 18:02:16'),
	(29, 6, 28, 'uhd', 'https://www.primevideo.com/detail/0IMOE9I1H3BN74ON17M9XGZFPG/ref=atv_dp', NULL, NULL, '2023-12-04 18:03:41', '2023-12-04 18:03:41'),
	(30, 5, 30, 'HD', 'https://www.paramountplus.com/shows/star-trek-strange-new-worlds/', NULL, NULL, '2023-12-04 18:06:32', '2023-12-04 18:06:32'),
	(31, 5, 31, 'HD', 'https://www.paramountplus.com/shows/halo/', NULL, NULL, '2023-12-04 18:06:38', '2023-12-04 18:06:38'),
	(32, 5, 34, 'HD', 'https://www.paramountplus.com/shows/no-escape/', NULL, NULL, '2023-12-04 18:07:12', '2023-12-04 18:07:12'),
	(33, 5, 35, 'HD', 'https://www.paramountplus.com/shows/tulsa-king/', NULL, NULL, '2023-12-04 18:07:27', '2023-12-04 18:07:27'),
	(34, 5, 36, 'HD', 'https://www.paramountplus.com/shows/dora-the-explorer/', NULL, NULL, '2023-12-04 18:07:38', '2023-12-04 18:07:38'),
	(35, 5, 37, 'HD', 'https://www.paramountplus.com/shows/south-park/', NULL, NULL, '2023-12-04 18:08:21', '2023-12-04 18:08:21'),
	(36, 3, 40, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GZMEZ_QQRiQnCZwEAACH7:type:feature', NULL, NULL, '2023-12-04 18:09:39', '2023-12-04 18:09:39'),
	(37, 3, 40, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GXkRjxwjR68PDwwEAABKJ:type:series', NULL, NULL, '2023-12-04 18:09:39', '2023-12-04 18:09:39'),
	(38, 3, 40, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GY1IBdAJF2sNksQEAAAEH:type:feature', NULL, NULL, '2023-12-04 18:09:39', '2023-12-04 18:09:39'),
	(39, 3, 41, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GXdRsewUPO5uAuwEAABEI:type:series', NULL, NULL, '2023-12-04 18:09:52', '2023-12-04 18:09:52'),
	(40, 3, 42, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GXtf0UwTqw8JHjQEAAAbT:type:feature', NULL, NULL, '2023-12-04 18:11:56', '2023-12-04 18:11:56'),
	(41, 6, 42, 'sd', 'https://www.primevideo.com/detail/0U8IWL8RGQHY8ZO48336I6JTQY/ref=atv_dp', NULL, NULL, '2023-12-04 18:11:56', '2023-12-04 18:11:56'),
	(42, 4, 43, 'HD', 'https://www.netflix.com/title/70155571/', NULL, NULL, '2023-12-04 18:12:27', '2023-12-04 18:12:27'),
	(43, 3, 43, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GXmmNFAzEJyLCHAEAACDB:type:series', NULL, NULL, '2023-12-04 18:12:27', '2023-12-04 18:12:27'),
	(44, 2, 44, 'uhd', 'https://www.disneyplus.com/movies/marvel-studios-avengers-endgame/aRbVJUb2h2Rf', NULL, NULL, '2023-12-04 18:13:15', '2023-12-04 18:13:15'),
	(45, 2, 45, 'uhd', 'https://www.disneyplus.com/movies/marvel-studios-avengers-infinity-war/1WEuZ7H6y39v', NULL, NULL, '2023-12-04 18:14:45', '2023-12-04 18:14:45'),
	(46, 3, 46, 'uhd', 'https://play.hbomax.com/page/urn:hbo:page:GYY7NkAImuJzDwgEAAAAL:type:feature', NULL, NULL, '2023-12-04 18:14:57', '2023-12-04 18:14:57'),
	(47, 2, 47, 'hd', 'https://www.disneyplus.com/movies/soy-luna-live-concert/6XfV2viAqQVg', NULL, NULL, '2023-12-04 18:18:15', '2023-12-04 18:18:15'),
	(48, 2, 47, 'hd', 'https://www.disneyplus.com/series/soy-luna/1o9q3oqIzUV0', NULL, NULL, '2023-12-04 18:18:15', '2023-12-04 18:18:15'),
	(49, 4, 49, 'HD', 'https://www.netflix.com/title/70136153/', NULL, NULL, '2023-12-04 18:18:57', '2023-12-04 18:18:57'),
	(50, 5, 52, 'HD', 'https://www.paramountplus.com/shows/special-ops-lioness/', NULL, NULL, '2023-12-04 18:22:03', '2023-12-04 18:22:03'),
	(51, 3, 53, 'uhd', 'https://play.hbomax.com/page/urn:hbo:page:GVU2cggagzYNJjhsJATwo:type:series', NULL, NULL, '2023-12-04 18:23:56', '2023-12-04 18:23:56'),
	(52, 3, 54, 'uhd', 'https://play.hbomax.com/page/urn:hbo:page:GYFJ_1g7SgX-vswEAAAAS:type:feature', NULL, NULL, '2023-12-04 18:24:14', '2023-12-04 18:24:14'),
	(53, 3, 54, 'uhd', 'https://play.hbomax.com/page/urn:hbo:page:GYDAnZgCFQ8IJpQEAAAAN:type:feature', NULL, NULL, '2023-12-04 18:24:14', '2023-12-04 18:24:14'),
	(54, 1, 55, 'uhd', 'https://tv.apple.com/ar/show/la-maldicion-de-enfield/umc.cmc.33t5cskiqmmft1hxp23w9gnbw', NULL, NULL, '2023-12-04 18:25:15', '2023-12-04 18:25:15'),
	(55, 1, 56, 'uhd', 'https://tv.apple.com/ar/movie/stephen-curry-infravalorado/umc.cmc.23v0wxaiwz60bjy1w4vg7npun?playableId=tvs.sbd.4000%3AA0115701001', NULL, NULL, '2023-12-04 18:25:41', '2023-12-04 18:25:41'),
	(56, 1, 57, 'uhd', 'https://tv.apple.com/ar/movie/the-elephant-queen/umc.cmc.1ybrwww83rknjtwiuuemjfbvq?playableId=tvs.sbd.4000%3AVELQN0560101', NULL, NULL, '2023-12-04 18:26:04', '2023-12-04 18:26:04'),
	(57, 1, 58, 'uhd', 'https://tv.apple.com/ar/show/severance/umc.cmc.1srk2goyh2q2zdxcx605w8vtx', NULL, NULL, '2023-12-04 18:26:29', '2023-12-04 18:26:29'),
	(58, 6, 60, 'sd', 'https://www.primevideo.com/detail/0K677J96WQ96K6UY6BL15O70CO/ref=atv_dp', NULL, NULL, '2023-12-04 18:28:34', '2023-12-04 18:28:34'),
	(59, 6, 61, 'uhd', 'https://www.primevideo.com/detail/0QL016992N86EED5P1FO3ER0P5/ref=atv_dp', NULL, NULL, '2023-12-04 18:28:45', '2023-12-04 18:28:45'),
	(60, 6, 62, 'uhd', 'https://www.primevideo.com/detail/0KRGHGZCHKS920ZQGY5LBRF7MA/ref=atv_dp', NULL, NULL, '2023-12-04 18:28:57', '2023-12-04 18:28:57'),
	(61, 6, 63, 'sd', 'https://www.primevideo.com/detail/0OPU861X5ZA4ETQFV906HPCQ1T/ref=atv_dp', NULL, NULL, '2023-12-04 18:29:07', '2023-12-04 18:29:07'),
	(62, 6, 64, 'sd', 'https://www.primevideo.com/detail/0H7KJOOAE2TX8TXMJWDNU9E03V/ref=atv_dp', NULL, NULL, '2023-12-04 18:31:23', '2023-12-04 18:31:23'),
	(63, 3, 64, 'hd', 'https://play.hbomax.com/page/urn:hbo:page:GXrR72QhID4ayhAEAAANa:type:feature', NULL, NULL, '2023-12-04 18:31:23', '2023-12-04 18:31:23'),
	(64, 4, 65, 'HD', 'https://www.netflix.com/title/80029196/', NULL, NULL, '2023-12-04 18:32:02', '2023-12-04 18:32:02'),
	(65, 6, 65, 'sd', 'https://www.primevideo.com/detail/0QFYOZYBSZJC7FJD8LQX8WHRMT/ref=atv_dp', NULL, NULL, '2023-12-04 18:32:02', '2023-12-04 18:32:02');

-- Volcando estructura para tabla kite_app.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disabled_at` timestamp NULL DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.users: ~15 rows (aproximadamente)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `profile_path`, `disabled_at`, `reason`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'fmayer', 'keith15@example.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', 'SkjcmkesKH', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(2, 'samson.langosh', 'rosella.prosacco@example.org', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', 'YksDwtNOaw', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(3, 'heraldo', 'mmcdermott@example.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', 'tHrtVDRSQl', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(4, 'carlosmiguelrosales', 'cwaters@example.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', 'MonweuckPR', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(5, 'angelicapanda', 'juana55@example.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', '07hEiPchpK', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(6, 'kolby.ernser', 'wbernhard@example.net', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, '2023-12-04 17:34:01', 'Baneo de prueba', '2023-12-04 17:34:01', '5lf2G7x0fm', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(7, 'kattie70', 'gerardo54@example.org', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, '2023-12-04 17:34:01', 'Baneo de prueba', '2023-12-04 17:34:01', 'tVMvqAbSqh', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(8, 'icollins', 'meghan65@example.org', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', 'nrBSh4ijLJ', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(9, 'gerlach.isidro', 'rbrown@example.net', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', 'pJehqcDoqd', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(10, 'nona.beer', 'norene.wyman@example.net', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, '2023-12-04 17:34:01', 'Baneo de prueba', '2023-12-04 17:34:01', 'DOiQ0sCMpW', '2023-12-04 17:34:01', '2023-12-04 17:34:01'),
	(11, 'Gus', 'gusa05@gmail.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:01', 'NiSa6MxpH74YCmE3jEHvMJLHG5ZJboIxuC4iJTfCPz9pagHgna3dV2Rm4UDs', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(12, 'admin', 'admin@gmail.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:02', 'BwpHk2m9e5', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(13, 'moderator', 'moderator@gmail.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:02', 'XvlsAqZ0M7', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(14, 'user', 'user@gmail.com', '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', NULL, NULL, NULL, '2023-12-04 17:34:02', 'yXpcnTiBtq', '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(15, 'gustavo_oliveros', 'gusa06@gmail.com', '$2y$10$CoFS.CkD2VUsAZNSlfnZS.sMxfDz5I8Y3xBVd5anmohkMyQhhim3G', NULL, NULL, NULL, '2023-12-04 18:34:47', NULL, '2023-12-04 18:34:26', '2023-12-04 18:34:47');

-- Volcando estructura para tabla kite_app.user_has_service
DROP TABLE IF EXISTS `user_has_service`;
CREATE TABLE IF NOT EXISTS `user_has_service` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `service_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_has_service_user_id_foreign` (`user_id`),
  KEY `user_has_service_service_id_foreign` (`service_id`),
  CONSTRAINT `user_has_service_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `user_has_service_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.user_has_service: ~30 rows (aproximadamente)
INSERT INTO `user_has_service` (`id`, `user_id`, `service_id`, `created_at`, `updated_at`) VALUES
	(1, 3, 4, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(2, 5, 3, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(3, 9, 3, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(4, 6, 4, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(5, 4, 6, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(6, 4, 4, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(7, 14, 5, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(8, 3, 3, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(9, 7, 2, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(10, 12, 2, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(11, 8, 1, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(12, 13, 4, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(13, 4, 2, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(14, 1, 5, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(15, 8, 4, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(16, 1, 3, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(17, 9, 1, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(18, 5, 6, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(19, 1, 2, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(20, 14, 2, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(21, 2, 2, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(22, 14, 3, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(23, 11, 6, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(24, 9, 1, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(25, 12, 6, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(26, 2, 6, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(27, 13, 6, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(28, 6, 6, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(29, 13, 5, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(30, 11, 1, '2023-12-04 17:34:02', '2023-12-04 17:34:02'),
	(31, 15, 1, '2023-12-04 18:34:53', '2023-12-04 18:34:53'),
	(32, 15, 2, '2023-12-04 18:34:53', '2023-12-04 18:34:53'),
	(33, 15, 3, '2023-12-04 18:34:53', '2023-12-04 18:34:53'),
	(34, 15, 4, '2023-12-04 18:34:53', '2023-12-04 18:34:53'),
	(35, 15, 5, '2023-12-04 18:34:53', '2023-12-04 18:34:53'),
	(36, 15, 6, '2023-12-04 18:34:53', '2023-12-04 18:34:53');

-- Volcando estructura para tabla kite_app.user_has_title
DROP TABLE IF EXISTS `user_has_title`;
CREATE TABLE IF NOT EXISTS `user_has_title` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_has_title_title_id_foreign` (`title_id`),
  KEY `user_has_title_user_id_foreign` (`user_id`),
  CONSTRAINT `user_has_title_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`),
  CONSTRAINT `user_has_title_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.user_has_title: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.user_likes_review
DROP TABLE IF EXISTS `user_likes_review`;
CREATE TABLE IF NOT EXISTS `user_likes_review` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `review_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_likes_review_user_id_foreign` (`user_id`),
  KEY `user_likes_review_review_id_foreign` (`review_id`),
  CONSTRAINT `user_likes_review_review_id_foreign` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`),
  CONSTRAINT `user_likes_review_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.user_likes_review: ~0 rows (aproximadamente)

-- Volcando estructura para tabla kite_app.user_views_genre
DROP TABLE IF EXISTS `user_views_genre`;
CREATE TABLE IF NOT EXISTS `user_views_genre` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `genre_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `view_count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_views_genre_genre_id_foreign` (`genre_id`),
  KEY `user_views_genre_user_id_foreign` (`user_id`),
  CONSTRAINT `user_views_genre_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
  CONSTRAINT `user_views_genre_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.user_views_genre: ~7 rows (aproximadamente)
INSERT INTO `user_views_genre` (`id`, `genre_id`, `user_id`, `view_count`, `created_at`, `updated_at`) VALUES
	(1, 16, 11, 2, '2023-12-04 17:40:48', '2023-12-04 18:10:26'),
	(2, 10751, 11, 2, '2023-12-04 17:40:48', '2023-12-04 18:19:06'),
	(3, 12, 11, 2, '2023-12-04 17:40:48', '2023-12-04 18:32:21'),
	(4, 35, 11, 3, '2023-12-04 17:40:48', '2023-12-04 18:19:06'),
	(5, 80, 11, 2, '2023-12-04 17:44:19', '2023-12-04 18:32:25'),
	(6, 9648, 11, 1, '2023-12-04 17:44:19', '2023-12-04 17:44:19'),
	(7, 53, 11, 3, '2023-12-04 17:44:19', '2023-12-04 18:32:25'),
	(8, 10765, 11, 2, '2023-12-04 18:10:26', '2023-12-04 18:32:32'),
	(9, 10759, 11, 2, '2023-12-04 18:10:26', '2023-12-04 18:32:32'),
	(10, 10762, 11, 2, '2023-12-04 18:19:06', '2023-12-04 18:32:45'),
	(11, 28, 11, 2, '2023-12-04 18:32:21', '2023-12-04 18:32:25'),
	(12, 878, 11, 1, '2023-12-04 18:32:21', '2023-12-04 18:32:21'),
	(13, 10766, 11, 1, '2023-12-04 18:32:45', '2023-12-04 18:32:45'),
	(14, 16, 15, 2, '2023-12-04 18:36:40', '2023-12-04 18:37:07'),
	(15, 35, 15, 2, '2023-12-04 18:36:40', '2023-12-04 18:37:07'),
	(16, 10751, 15, 1, '2023-12-04 18:37:07', '2023-12-04 18:37:07'),
	(17, 12, 15, 1, '2023-12-04 18:37:07', '2023-12-04 18:37:07'),
	(18, 10759, 15, 1, '2023-12-04 18:38:16', '2023-12-04 18:38:16'),
	(19, 80, 15, 4, '2023-12-04 18:38:16', '2023-12-04 18:42:24'),
	(20, 18, 15, 4, '2023-12-04 18:38:16', '2023-12-04 18:38:51'),
	(21, 9648, 15, 3, '2023-12-04 18:38:16', '2023-12-04 18:42:24'),
	(22, 53, 15, 3, '2023-12-04 18:38:21', '2023-12-04 18:42:24'),
	(23, 99, 15, 1, '2023-12-04 18:38:28', '2023-12-04 18:38:28'),
	(24, 10402, 15, 1, '2023-12-04 18:38:33', '2023-12-04 18:38:33');

-- Volcando estructura para tabla kite_app.user_views_title
DROP TABLE IF EXISTS `user_views_title`;
CREATE TABLE IF NOT EXISTS `user_views_title` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `service_id` bigint unsigned NOT NULL,
  `view_count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_views_title_title_id_foreign` (`title_id`),
  KEY `user_views_title_user_id_foreign` (`user_id`),
  KEY `user_views_title_service_id_foreign` (`service_id`),
  CONSTRAINT `user_views_title_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `user_views_title_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`),
  CONSTRAINT `user_views_title_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla kite_app.user_views_title: ~2 rows (aproximadamente)
INSERT INTO `user_views_title` (`id`, `title_id`, `user_id`, `service_id`, `view_count`, `created_at`, `updated_at`) VALUES
	(1, 14, 11, 4, 1, '2023-12-04 17:40:48', '2023-12-04 17:40:48'),
	(2, 15, 11, 6, 1, '2023-12-04 17:44:19', '2023-12-04 17:44:19'),
	(3, 40, 11, 3, 1, '2023-12-04 18:10:26', '2023-12-04 18:10:26'),
	(4, 49, 11, 4, 1, '2023-12-04 18:19:06', '2023-12-04 18:19:06'),
	(5, 65, 11, 6, 1, '2023-12-04 18:32:21', '2023-12-04 18:32:21'),
	(6, 63, 11, 6, 1, '2023-12-04 18:32:25', '2023-12-04 18:32:25'),
	(7, 62, 11, 6, 1, '2023-12-04 18:32:32', '2023-12-04 18:32:32'),
	(8, 47, 11, 2, 1, '2023-12-04 18:32:45', '2023-12-04 18:32:45'),
	(9, 17, 15, 3, 1, '2023-12-04 18:36:40', '2023-12-04 18:36:40'),
	(10, 14, 15, 4, 1, '2023-12-04 18:37:07', '2023-12-04 18:37:07'),
	(11, 2, 15, 4, 1, '2023-12-04 18:38:16', '2023-12-04 18:38:16'),
	(12, 27, 15, 3, 1, '2023-12-04 18:38:21', '2023-12-04 18:38:21'),
	(13, 4, 15, 4, 1, '2023-12-04 18:38:28', '2023-12-04 18:38:28'),
	(14, 7, 15, 4, 1, '2023-12-04 18:38:33', '2023-12-04 18:38:33'),
	(15, 52, 15, 5, 1, '2023-12-04 18:38:51', '2023-12-04 18:38:51'),
	(16, 15, 15, 6, 2, '2023-12-04 18:42:08', '2023-12-04 18:42:24');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
