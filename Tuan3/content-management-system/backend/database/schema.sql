CREATE DATABASE IF NOT EXISTS microkernel_cms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE microkernel_cms;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_name VARCHAR(120) NOT NULL,
  category VARCHAR(120) NOT NULL,
  status ENUM('draft', 'review', 'published') NOT NULL DEFAULT 'draft',
  excerpt TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  views INT NOT NULL DEFAULT 0,
  layout_name VARCHAR(120) NOT NULL DEFAULT 'article-story',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  initials VARCHAR(12) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  role_slug ENUM('admin', 'editor', 'viewer') NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  last_login_text VARCHAR(120) NOT NULL,
  avatar_bg VARCHAR(16) NOT NULL,
  avatar_color VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS plugins (
  slug VARCHAR(80) PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  icon_label VARCHAR(20) NOT NULL,
  accent_color VARCHAR(16) NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT FALSE,
  version VARCHAR(40) NOT NULL,
  category_name VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) NOT NULL,
  event_type VARCHAR(120) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts
  (id, title, author_name, category, status, excerpt, meta_description, content, views, layout_name, created_at)
VALUES
  (
    1,
    'Bắt đầu với Microkernel CMS',
    'Admin',
    'Hướng dẫn',
    'published',
    'Giới thiệu nhanh về kiến trúc microkernel và cách bắt đầu.',
    'Hướng dẫn ngắn giúp developer hiểu core, plugin và chạy local.',
    'Bài viết này cung cấp các bước cần thiết để cấu hình và chạy microkernel CMS trên máy phát triển. Bao gồm cấu hình database, kernel và quản lý plugin.',
    1250,
    'article-story',
    '2026-03-16 09:00:00'
  ),
  (
    2,
    'Viết plugin: Từ cơ bản đến nâng cao',
    'Editor 1',
    'Hướng dẫn',
    'review',
    'Hướng dẫn từng bước để tạo plugin tương tác với kernel.',
    'Từ scaffold plugin, đăng ký hook tới debug và phát hành trên plugin manager.',
    'Hướng dẫn chi tiết tạo plugin: khởi tạo, đăng ký hook, xử lý sự kiện và kiểm thử trên môi trường staging.',
    560,
    'guide-stepper',
    '2026-03-15 14:20:00'
  ),
  (
    3,
    'Ghi chú phát hành v1.1',
    'Admin',
    'Tin tức',
    'published',
    'Tổng hợp các thay đổi chính trong bản v1.1.',
    'Bao gồm bản vá bảo mật, cải tiến hiệu năng và API mới.',
    'Phiên bản 1.1 bao gồm tối ưu truy vấn, nâng cấp plugin runtime và bổ sung endpoints cho quản lý quyền.',
    300,
    'article-story',
    '2026-03-14 11:00:00'
  ),
  (
    4,
    'API Quickstart: Tích hợp frontend',
    'Dev',
    'Kỹ thuật',
    'draft',
    'Hướng dẫn tích hợp React với API của CMS.',
    'Ví dụ mã, cách gọi endpoints và quản lý xác thực giữa UI và core.',
    'Bài viết minh hoạ cách gọi endpoints posts, users và plugin runtime từ ứng dụng React, kèm token auth và xử lý lỗi.',
    75,
    'docs-clean',
    '2026-03-16 08:30:00'
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  author_name = VALUES(author_name),
  category = VALUES(category),
  status = VALUES(status),
  excerpt = VALUES(excerpt),
  meta_description = VALUES(meta_description),
  content = VALUES(content),
  views = VALUES(views),
  layout_name = VALUES(layout_name),
  created_at = VALUES(created_at);

INSERT INTO users
  (id, name, initials, email, role_slug, status, last_login_text, avatar_bg, avatar_color)
VALUES
  (1, 'Linh Trần', 'LT', 'linh.tran@example.com', 'admin', 'active', 'Hôm nay', '#e6f7ff', '#0b5d8a'),
  (2, 'Minh Nguyễn', 'MN', 'minh.nguyen@example.com', 'editor', 'active', '3 giờ trước', '#fff4e6', '#b35a00'),
  (3, 'Hoàng Bùi', 'HB', 'hoang.bui@example.com', 'editor', 'active', 'Hôm qua', '#f5f7e9', '#2e6b2e'),
  (4, 'An Lê', 'AL', 'an.le@example.com', 'viewer', 'inactive', '2 tuần trước', '#faf0f6', '#6b4b6b')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  initials = VALUES(initials),
  email = VALUES(email),
  role_slug = VALUES(role_slug),
  status = VALUES(status),
  last_login_text = VALUES(last_login_text),
  avatar_bg = VALUES(avatar_bg),
  avatar_color = VALUES(avatar_color);

INSERT INTO plugins
  (slug, name, description, icon_label, accent_color, enabled, version, category_name)
VALUES
  (
    'seo',
    'SEO Pro',
    'Cải thiện meta, sitemap và structured data cho tối ưu tìm kiếm nâng cao.',
    'SEO',
    '#cfeee8',
    TRUE,
    '1.3.0',
    'marketing'
  ),
  (
    'imageopt',
    'Image Optimizer',
    'Nén ảnh, tạo các kích thước responsive và lazy-load để tối ưu hiệu năng.',
    'IMG',
    '#fff7e0',
    TRUE,
    '1.0.0',
    'performance'
  ),
  (
    'cache',
    'Cache Layer',
    'Bộ nhớ đệm trang và cache API để giảm thời gian phản hồi và tải server.',
    'CCH',
    '#e8f0ff',
    TRUE,
    '2.1.5',
    'infrastructure'
  )
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  icon_label = VALUES(icon_label),
  accent_color = VALUES(accent_color),
  enabled = VALUES(enabled),
  version = VALUES(version),
  category_name = VALUES(category_name);

INSERT INTO activity_log
  (id, message, event_type, created_at)
VALUES
  (1, 'Linh tạo bài viết mới: "Bắt đầu với Microkernel CMS"', 'content.created', '2026-03-16 10:05:00'),
  (2, 'Image Optimizer tối ưu ảnh cho bài viết #2', 'plugin.action', '2026-03-16 09:40:00'),
  (3, 'Cache Layer đã xóa cache toàn bộ', 'system.cache.clear', '2026-03-15 22:10:00'),
  (4, 'Đăng nhập thất bại: tài khoản thử nghiệm', 'auth.failed', '2026-03-14 18:25:00')
ON DUPLICATE KEY UPDATE
  message = VALUES(message),
  event_type = VALUES(event_type),
  created_at = VALUES(created_at);
