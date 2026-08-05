/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://forgetechnobles.com', // or your Vercel URL
  generateRobotsTxt: true, // auto-generate robots.txt as well
  // If you use a custom export folder, specify source directory
  sourceDir: '.next', // or 'out'? Actually for static export, sourceDir should be 'out'
  // But next-sitemap works better with server-side; for static export, you may need to generate post-build.
  // Alternatively, use a simple script after build.
};