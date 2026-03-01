const markdownIt = require("markdown-it");

// Configure markdown-it:
//   breaks: true  — single Enter becomes <br>, matching what you type in the CMS
//   html: true    — allow raw HTML in posts if needed
const md = markdownIt({ html: true, breaks: true, linkify: false });

module.exports = function (eleventyConfig) {

  // Use the configured markdown-it instance
  eleventyConfig.setLibrary("md", md);

  // ----------------------------------------
  // Pass-through: all existing site files
  // Eleventy only builds the blog and admin.
  // ----------------------------------------
  // index.html removed — now index.njk, processed as an Eleventy template
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("shared");
  eleventyConfig.addPassthroughCopy("i-am-tobago");
  eleventyConfig.addPassthroughCopy("my-tobago-guide");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("privacy-policy");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("shared/support.js");
  eleventyConfig.addPassthroughCopy("blog/images");

  // ----------------------------------------
  // Date filters (used in blog templates)
  // ----------------------------------------
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  eleventyConfig.addFilter("readableDate", function (dateObj) {
    const d = new Date(dateObj);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  });

  eleventyConfig.addFilter("htmlDateString", function (dateObj) {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // ----------------------------------------
  // Category label filter
  // ----------------------------------------
  const CATEGORY_LABELS = {
    culture: "Culture & Heritage",
    history: "History",
    travel:  "Travel & Expat",
    food:    "Food & Traditions",
    music:   "Music & Arts",
    news:    "News & Updates",
  };

  eleventyConfig.addFilter("categoryLabel", function (value) {
    return CATEGORY_LABELS[value] || value;
  });

  // Truncate a string to N words, appending an ellipsis if trimmed
  eleventyConfig.addFilter("truncateWords", function (str, count) {
    if (!str) return '';
    var words = str.trim().split(/\s+/);
    if (words.length <= count) return str;
    return words.slice(0, count).join(' ') + '\u2026';
  });

  // Render a markdown string from frontmatter (used for references field)
  eleventyConfig.addFilter("markdownify", function (content) {
    if (!content) return "";
    return md.render(String(content));
  });

  // ----------------------------------------
  // Collections — exclude drafts, featured first
  // ----------------------------------------
  eleventyConfig.addCollection("post", function (api) {
    return api.getFilteredByTag("post")
      .filter(item => !item.data.draft)
      .sort((a, b) => {
        if (a.data.featured && !b.data.featured) return -1;
        if (!a.data.featured && b.data.featured) return 1;
        return b.date - a.date;
      });
  });

  // ----------------------------------------
  // Config
  // ----------------------------------------
  return {
    // Only process .njk and .md files — existing .html files are
    // handled by addPassthroughCopy above.
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
