module.exports = {
  layout: "blog-post.njk",
  tags: "post",
  permalink: function (data) {
    return `/blog/${data.page.fileSlug}/`;
  }
};
