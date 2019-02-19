const path = require("path");
const data = require("./src/json/albums.json");

exports.createPages = ({ boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    data.forEach(({ title, parentAlbum, type }) => {
        pagePath = "";

        // Only prepend the parent album to the path if it's not on the home page
        if (parentAlbum != "home") {
            pagePath = parentAlbum + "/";
        }
        pagePath += title;

        // We also want the path to be lower case
        pagePath = pagePath.toLowerCase();
        console.log("\n", pagePath);

        // Determine which template to use based upon the type of the album
        // Albums will serve as a directory for other albums, whereas galleries
        // will display images
        template = "";
        if (type == "album") {
            template = path.resolve(`src/templates/album.js`);
        }
        else if (type == "gallery") {
            template = path.resolve(`src/templates/gallery.js`);
        }

        console.log(template);

        // Now that we've created the paths, let's create the pages
        createPage({
            path: pagePath,
            component: template
        })
    });
};
