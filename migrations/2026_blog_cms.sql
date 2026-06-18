-- FormLLC blog CMS — initial schema.
-- Apply once against the database referenced by env vars
-- MYSQL_HOST / MYSQL_PORT / MYSQL_DATABASE / MYSQL_USER / MYSQL_PASSWORD.

CREATE TABLE IF NOT EXISTS blogs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NULL,
  content LONGTEXT NOT NULL,
  content_type ENUM('html', 'markdown') NOT NULL DEFAULT 'html',
  featured_image VARCHAR(500) NULL,
  image_alt VARCHAR(255) NULL,
  meta_title VARCHAR(255) NULL,
  meta_description VARCHAR(320) NULL,
  canonical_url VARCHAR(500) NULL,
  category VARCHAR(120) NULL,
  tags JSON NULL,
  region ENUM('global', 'us', 'both') NOT NULL DEFAULT 'both',
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  seo_score INT NULL,
  reading_minutes INT NULL,
  old_slug VARCHAR(255) NULL,
  source_file VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_region (region),
  INDEX idx_published_at (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
