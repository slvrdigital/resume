/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_PATH ?? '',
  generateRobotsTxt: true,
  outDir: '../../out'
};
