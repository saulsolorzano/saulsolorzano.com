require("dotenv").config();
module.exports = {
  siteMetadata: {
    title: "Saúl Solórzano",
    titleTemplate: "%s | Full Stack Developer",
    description:
      "Sitio personal de Saúl Solórzano. Desarrollador Full-Stack y consultor enfocado en el desempeño web",
    siteUrl: "https://www.saulsolorzano.com", // No trailing slash allowed!
    image: "/img/saul.jpg",
    twitterUsername: "@saulsolorzano",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Saúl Solórzano",
        short_name: "Saúl Solórzano",
        start_url: "/",
        icon: "src/img/icon.png",
        background_color: "#1E90FF",
        theme_color: "#1E90FF",
        display: "standalone",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["UA-28765112-1"],
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `mob3kpg0`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./src/blog/",
      },
      __key: "blog",
    },
  ],
};
