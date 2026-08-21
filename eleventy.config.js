module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addWatchTarget("content");

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
