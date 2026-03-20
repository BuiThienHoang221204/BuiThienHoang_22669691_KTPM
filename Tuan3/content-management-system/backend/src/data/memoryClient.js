// Lightweight in-memory client used when DB_ENABLED is false.
// Implements a minimal subset of the mysql2/promise query() shape used by the app.
export async function createMemoryClient(/* config */) {
  const db = {
    posts: [],
    users: [],
    plugins: [],
    activity_log: [],
  };

  let nextId = 1;

  function now() {
    return new Date();
  }

  async function query(sql, params = []) {
    const s = sql.trim().toUpperCase();

    // SELECT queries
    if (s.startsWith('SELECT')) {
      if (s.includes('FROM POSTS')) {
        // map to expected column names
        const rows = db.posts
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((p) => ({
            id: p.id,
            title: p.title,
            author_name: p.author_name,
            category: p.category,
            status: p.status,
            excerpt: p.excerpt,
            meta_description: p.meta_description,
            content: p.content,
            views: p.views,
            layout_name: p.layout_name,
            created_at: p.created_at,
          }));

        return [rows];
      }

      if (s.includes('FROM USERS')) {
        const rows = db.users
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((u) => ({
            id: u.id,
            name: u.name,
            initials: u.initials,
            email: u.email,
            role_slug: u.role_slug,
            status: u.status,
            last_login_text: u.last_login_text,
            avatar_bg: u.avatar_bg,
            avatar_color: u.avatar_color,
          }));

        return [rows];
      }

      if (s.includes('FROM PLUGINS')) {
        // handle both list and select by slug
        if (s.includes('WHERE SLUG =')) {
          const slug = params[0];
          const plugin = db.plugins.find((p) => p.slug === slug);
          return [plugin ? [plugin] : []];
        }

        const rows = db.plugins
          .slice()
          .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
          .map((p) => ({
            slug: p.slug,
            name: p.name,
            description: p.description,
            icon_label: p.icon_label,
            accent_color: p.accent_color,
            enabled: p.enabled ? 1 : 0,
            version: p.version,
            category_name: p.category_name,
          }));

        return [rows];
      }

      if (s.includes('FROM ACTIVITY_LOG')) {
        const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
        const limit = limitMatch ? Number(limitMatch[1]) : undefined;
        const rows = db.activity_log
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, limit)
          .map((r) => ({
            id: r.id,
            message: r.message,
            event_type: r.event_type,
            created_at: r.created_at,
          }));

        return [rows];
      }
    }

    // INSERT queries
    if (s.startsWith('INSERT')) {
      if (s.includes('INTO POSTS')) {
        // params expected in the same order as createDataAccess
        const [title, author_name, category, status, excerpt, meta_description, content, views, layout_name, created_at] = params;
        const id = nextId++;
        db.posts.push({ id, title, author_name, category, status, excerpt, meta_description, content, views, layout_name, created_at });
        return [{ insertId: id }];
      }

      if (s.includes('INTO PLUGINS')) {
        const [slug, name, description, icon_label, accent_color, enabled, version, category_name] = params;
        const id = nextId++;
        const plugin = { slug, name, description, icon_label, accent_color, enabled: Boolean(enabled), version, category_name };
        db.plugins.push(plugin);
        return [{ insertId: id }];
      }

      if (s.includes('INTO ACTIVITY_LOG')) {
        const [message, event_type, created_at] = params;
        const id = nextId++;
        db.activity_log.push({ id, message, event_type, created_at });
        return [{ insertId: id }];
      }
    }

    // UPDATE queries (toggle plugin enabled)
    if (s.startsWith('UPDATE')) {
      if (s.includes('PLUGINS')) {
        const slug = params[0];
        const plugin = db.plugins.find((p) => p.slug === slug);
        if (plugin) {
          plugin.enabled = !plugin.enabled;
          return [{ affectedRows: 1 }];
        }
        return [{ affectedRows: 0 }];
      }
    }

    // Default: return empty result set
    return [[]];
  }

  return {
    mode: 'memory',
    isReady: true,
    query,
    async close() {
      // nothing to close for memory
    },
  };
}
