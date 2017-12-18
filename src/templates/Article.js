import React from "react"
import Link from "gatsby-link"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"

import { rhythm } from "../utils/typography"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class ArticleTemplate extends React.Component {
  render() {
    const product = this.props.data.contentfulProduct
    const {
      productName: { productName },
      productDescription,
      image,
      brand,
      categories,
    } = product
    return (
      <div>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <Img resolutions={image[0].resolutions} />
          <h4> {productName}</h4>
        </div>
        <h1>Review of the {productName}</h1>
        <h4>Contributor by {brand.companyName.companyName}</h4>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: productDescription.childMarkdownRemark.html,
            }}
          />
          <div>
          </div>
        </div>
      </div>
    )
  }
}

ArticleTemplate.propTypes = propTypes

export default ArticleTemplate

export const pageQuery = graphql`
  query productQuery($id: String!) {
    contentfulProduct(id: { eq: $id }) {
      productName {
        productName
      }
      productDescription {
        childMarkdownRemark {
          html
        }
      }
      price
      image {
        resolutions(width: 50, height: 50) {
          base64
          src
          srcSet
          height
          width
        }
      }
      brand {
        companyName {
          companyName
        }
      }
      categories {
        id
        title {
          title
        }
      }
    }
  }
`
