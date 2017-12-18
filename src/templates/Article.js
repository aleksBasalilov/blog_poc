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
      articleName: { articleName },
      productDescription,
      image,
      brand,
      subjects,
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
          <h4>{articleName}</h4>
        </div>
        <h1>{articleName}</h1>
        <h4>Made by {brand.companyName.companyName}</h4>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: productDescription.childMarkdownRemark.html,
            }}
          />
          <div>
            <span>See other: </span>
            <ul>
              {subjects.map((category, i) => (
                <li key={i}>
                  <Link key={i} to={`/subjects/${category.id}`}>
                    {category.title.title}
                  </Link>
                </li>
              ))}
            </ul>
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
      articleName {
        articleName
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
      subjects {
        id
        title {
          title
        }
      }
    }
  }
`
