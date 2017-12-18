module.exports = {
  siteMetadata: {
    title: `HWD blog with Gatsby, Netlify, Contentful`
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `rmev73t835ba`,
        accessToken: `36641dd57012d67062473aaa01dd3c20ce2ee6a1c4ab6a7fd5fd2926a7bde4a2`
      }
    },
    `gatsby-transformer-remark`
  ]
};
