import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";

export default function BlogPost({ data }) {
	const post = data.markdownRemark
  
	return (
		<Layout>
		<div className="text-gray-800 mt-10">
                <div className="p-2">
                        <article key={post.id} className="mb-4">
                            <span className="text-gray-500 text-sm block m-0 leading-tight">Escrito el {post.frontmatter.date}</span>
                            <h2 className="text-xl">
                              {post.frontmatter.title}
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: post.html }} />
                        </article>
                </div>
            </div>
	  </Layout>
	)
  }
  
  export const query = graphql`
	query BlogQuery($slug: String!) { 
	  markdownRemark(fields: { slug: { eq: $slug } }) {
		html
		frontmatter {
			date(formatString: "D - MM - YYYY")
		  title
		}
	  }
	}
  `