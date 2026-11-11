import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Local development only. Production uses the same-origin PHP endpoint on cPanel.
const mailPreview = process.env.IHIRE_ENQUIRY_PREVIEW === '1';
export default defineConfig({
  site: 'https://www.ihireglobal.com', output: 'static', trailingSlash: 'always',
  integrations: [sitemap()], devToolbar: { enabled: false },
  vite: { server: { proxy: mailPreview ? {
    '/api/enquiry.php': {
      target: 'https://mail.ihireglobal.com', changeOrigin: true, secure: true,
      configure(proxy) {
        proxy.on('proxyReq', request => {
          request.setHeader('Origin', 'https://ihireglobal.com');
          request.removeHeader('sec-fetch-site');
        });
      }
    }
  } : undefined } }
});
