function makeSummary(text, max = 150) {
  if (!text) return 'Mô tả sẽ được sinh tự động khi nội dung được cập nhật.';
  const compact = String(text).replace(/\s+/g, ' ').trim();
  return compact.length > max ? `${compact.slice(0, max - 3)}...` : compact;
}

export const builtinPlugins = [
  {
    meta: {
      slug: 'seo',
      name: 'SEO Pro',
      description: 'Tự động sinh meta, validate structured data và xuất sitemap.',
      icon: 'SEO',
      accent: '#cfeee8',
      version: '1.3.0',
      category: 'marketing',
      enabledByDefault: true,
      capabilities: ['Auto meta', 'Structured data', 'Sitemap export'],
    },
    hooks: {
      'posts:beforeCreate': async (draft) => {
        if (draft.metaDescription) return draft;
        return { ...draft, metaDescription: makeSummary(draft.excerpt || draft.content || draft.title, 160) };
      },
      'posts:afterCreate': async ({ post }, { repositories }) => {
        await repositories.activity.add({
          message: `SEO Pro đã cập nhật metadata cho "${post.title}"`,
          eventType: 'plugin.seo.sync',
        });
      },
      'dashboard:cards': async ({ repositories }) => {
        const posts = await repositories.posts.list();
        const covered = posts.filter((p) => p.metaDescription).length;
        return {
          title: 'SEO coverage',
          value: `${covered}/${posts.length}`,
          detail: 'Tỷ lệ bài viết có meta description',
          tone: 'success',
        };
      },
    },
  },

  {
    meta: {
      slug: 'imageopt',
      name: 'Image Optimizer',
      description: 'Nén hình, tạo responsive sizes và lazy-load để cải thiện tốc độ tải.',
      icon: 'IMG',
      accent: '#fff7e0',
      version: '1.0.0',
      category: 'performance',
      enabledByDefault: true,
      capabilities: ['Resize', 'Compress', 'Responsive images'],
    },
    hooks: {
      'posts:beforeCreate': async (draft, { services }) => {
        // giả lập hành vi: đánh dấu rằng ảnh cần được tối ưu
        const images = (draft.content || '').match(/<img [^>]*src=\"([^\"]+)\"/g) || [];
        if (images.length === 0) return draft;
        // gắn flag để pipeline xử lý ảnh sau khi lưu
        return { ...draft, needsImageOptimization: true };
      },
      'posts:afterCreate': async ({ post }, { repositories }) => {
        if (post.needsImageOptimization) {
          await repositories.activity.add({
            message: `Image Optimizer đã tối ưu ảnh cho "${post.title}"`,
            eventType: 'plugin.image.optimize',
          });
        }
      },
      'dashboard:cards': async ({ repositories }) => {
        const posts = await repositories.posts.list();
        const needs = posts.filter((p) => p.needsImageOptimization).length;
        return {
          title: 'Images to optimize',
          value: `${needs}`,
          detail: 'Số bài cần tối ưu ảnh',
          tone: 'warning',
        };
      },
    },
  },

  {
    meta: {
      slug: 'cache',
      name: 'Cache Layer',
      description: 'Quản lý cache trang và cache API để giảm tải hệ thống.',
      icon: 'CCH',
      accent: '#e8f0ff',
      version: '2.1.5',
      category: 'infrastructure',
      enabledByDefault: true,
      capabilities: ['Page cache', 'API cache', 'Purge'],
    },
    hooks: {
      'posts:afterCreate': async ({ post }, { cache, repositories }) => {
        // khi có nội dung mới, purge cache trang chính
        if (cache && typeof cache.purge === 'function') {
          try {
            await cache.purge('/');
          } catch (e) {
            await repositories.activity.add({
              message: `Cache Layer purge failed: ${e.message}`,
              eventType: 'plugin.cache.error',
            });
          }
        }
        await repositories.activity.add({
          message: `Cache Layer đã purge cache sau khi tạo "${post.title}"`,
          eventType: 'plugin.cache.purge',
        });
      },
      'dashboard:cards': async ({ repositories }) => {
        return {
          title: 'Cache status',
          value: 'Healthy',
          detail: 'Bộ nhớ đệm hoạt động bình thường',
          tone: 'success',
        };
      },
    },
  },
];
