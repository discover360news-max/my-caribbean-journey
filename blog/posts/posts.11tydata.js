module.exports = {
  layout: "blog-post.njk",
  tags: "post",
  type: "post",
  author: "Quincy",
  featured: false,
  draft: false,
  permalink: function (data) {
    return `/blog/${data.page.fileSlug}/`;
  }
};
