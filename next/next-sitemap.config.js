/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_SITE_URL || 'https://v-core9.com';

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true, // (optional)
  // ...other options
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'test-bot',
        allow: ['/path', '/path-2'],
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/sub-path-1', '/path-2'],
      },
    ],
    additionalSitemaps: [
      siteUrl + '/my-custom-sitemap-1.xml',
      siteUrl + '/my-custom-sitemap-2.xml',
      siteUrl + '/my-custom-sitemap-3.xml',
    ],
  },
}
