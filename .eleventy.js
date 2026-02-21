module.exports = function (eleventyConfig) {

  // ----------------------------------------
  // Pass-through: all existing site files
  // Eleventy only builds the blog and admin.
  // ----------------------------------------
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("shared");
  eleventyConfig.addPassthroughCopy("i-am-tobago");
  eleventyConfig.addPassthroughCopy("my-tobago-guide");
  eleventyConfig.addPassthroughCopy("admin");

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
