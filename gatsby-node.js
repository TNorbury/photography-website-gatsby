const path = require('path');
const data = require('./src/json/albums.json');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;
    data.forEach(({ title, parentAlbum, type, imageLocations }) => {
        var pagePath = '';
        var isAlbum = false;

        // Only prepend the parent album to the path if it's not on the home page
        if (parentAlbum != 'home') {
            pagePath = parentAlbum + '/';
        }
        pagePath += title;

        // We also want the path to be lower case. Also remove any whitespace
        pagePath = pagePath.toLowerCase().replace(/ /g, "-").replace(/ü/g, "u") + '/';

        // Determine which template to use based upon the type of the album
        var template = '';

        // Albums will serve as a directory for other albums
        if (type == 'album') {
            template = path.resolve(`src/templates/album.js`);
            isAlbum = true;
        }

        // Whereas galleries will display images
        else if (type == 'gallery') {
            template = path.resolve(`src/templates/gallery.js`);
        }

        // Now that we've created the paths, let's create the pages
        createPage({
            path: pagePath,
            component: template,
            context: {
                // Pass the locations that the galleries can use to find their images
                images: imageLocations,

                // The title of the page will serve as the parent
                parent: title,

                // Flag to determine if this is an album page, or a gallery page
                isAlbum: isAlbum,
            },
        });
    });
};
