module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
        resolve: `gatsby-plugin-s3`,
        options: {
            bucketName: 'www.tylernorbury.com',
            protocol: "https",
            hostname: "www.tylernorbury.com",
            acl: null
        }
    }
  ]
};
