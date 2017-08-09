const path = require('path');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/template-blog-post.js');

    graphql(
      `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
                type
              }
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
      }

      // Create blog posts pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: edge.node.fields.slug, // required
          component: blogPostTemplate,
          context: {
            slug: edge.node.fields.slug
          }
        });
      });

      resolve();
    })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
  const {createNodeField} = boundActionCreators;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`;
    createNodeField({node, name: 'slug', value: slug});
    const type = (filepath => {
      const filearr = filepath.dir.split('/');
      return filearr[filearr.length - 2];
    })(parsedFilePath);
    createNodeField({node, name: 'type', value: type});
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent);
    createNodeField({node, name: 'slug', value: fileNode.fields.slug});
    createNodeField({node, name: 'type', value: fileNode.fields.type});
  }
};
