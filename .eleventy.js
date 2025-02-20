const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(config) {

  // Add a date formatter filter to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js") );
  config.addFilter("dateDisplayProject", require("./filters/datesProject.js") );
  config.addFilter("timestamp", require("./filters/timestamp.js") );
  config.addFilter("squash", require("./filters/squash.js") );
 
  // Plugins
  config.addPlugin(pluginRss);

  // Blog post collection
  config.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("**/posts/**.njk").reverse();
  });

  // Latest posts include
   config.addCollection("latestPosts", function(collection) {
    return collection.getFilteredByGlob("**/posts/**.njk").slice(-3).reverse();
  });

  // PostCSS plugin collection
  config.addCollection("postcss", function(collection) {
    return collection.getFilteredByGlob("**/postcss/**.njk").reverse();
  });

  // Components collection
  config.addCollection("components", function(collection) {
    return collection.getFilteredByGlob("**/components/**.njk").reverse();
  });


  // Components talks
  config.addCollection("talks", function(collection) {
    return collection.getFilteredByGlob("**/talks/**.njk").reverse();
  });

  // Filter using `Array.filter`
  config.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("**/projects/**.njk").reverse().filter(function(item) {
      // Side-step tags and do your own filtering
      return "projectTags" in item.data;
    });
  });


  // Minify HTML output
  config.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }
    return content
  })


  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes",
      // layouts: "_layouts",
      data: "_data"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };

};








