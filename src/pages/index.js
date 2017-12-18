import React from "react";
import Link from "gatsby-link";
import * as PropTypes from "prop-types";
import { rhythm } from "../utils/typography";
import Img from "gatsby-image";

const propTypes = {
  data: PropTypes.object.isRequired
};

const BlogArticle = ({ node }) => (
  <div>
    <Link
      style={{ color: `inherit`, textDecoration: `none` }}
      to={`/article/${node.id}/`}
    >
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          borderBottom: `1px solid lightgray`,
          paddingBottom: rhythm(1 / 2),
          marginBottom: rhythm(1 / 2)
        }}
      >
        <div style={{ marginRight: rhythm(1 / 2) }}>
          {node.image[0].resolutions.src && (
            <Img
              style={{ margin: 0 }}
              resolutions={node.image[0].resolutions}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>Review {node.productName.productName}</div>
      </div>
    </Link>
  </div>
);

class IndexPage extends React.Component {
  render() {
    const usProductEdges = this.props.data.us.edges;
    return (
      <div style={{ marginBottom: rhythm(2) }}>
        <br />
        <h3>
          {" "}
          HDub Blog POC using Contentful as a data source for a Gatsby site{" "}
        </h3>
        {usProductEdges.map(({ node }, i) => (
          <BlogArticle node={node} key={node.id} />
        ))}
        <br />
        <br />
      </div>
    );
  }
}

IndexPage.propTypes = propTypes;

export default IndexPage;

export const pageQuery = graphql`
query PageQuery {
  us: allContentfulProduct(filter: { node_locale: { eq: "en-US" } }) {
    edges {
      node {
        id
        productName {
          productName
        }
        image {
          resolutions(width: 75) {
            ...GatsbyContentfulResolutions
          }
        }
      }
    }
  }
  german: allContentfulProduct(filter: { node_locale: { eq: "de" } }) {
    edges {
      node {
        id
        productName {
          productName
        }
        image {
          resolutions(width: 75) {
            ...GatsbyContentfulResolutions
          }
        }
      }
    }
  }
}
`