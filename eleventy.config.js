module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addWatchTarget("content");

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
