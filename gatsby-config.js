module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Tyler Norbury Photography',
                short_name: "Tyler's Pics",
                start_url: '/',
                background_color: '#fffde7',
                theme_color: '#fffde7',
                display: 'standalone',
                icon: 'src/media/icon/icon.png',
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-emotion`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-s3`,
            options: {
                bucketName: 'www.tylernorbury.com',
                protocol: 'https',
                hostname: 'www.tylernorbury.com',
                acl: null,
            },
        },
        {
            resolve: `gatsby-plugin-html-attributes`,
            options: {
                lang: 'en',
            },
        },
        `gatsby-plugin-compression-v2`,
    ],
};
