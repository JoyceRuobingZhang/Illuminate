import React, { useEffect, useState, useContext } from "react";
import moment from 'moment'

import { PostContext } from "./PostProvider";
import "./PostList.css"
import comment from "./comment.svg"
import like from "./like.svg"

export const PostList = () => {
  const { posts, getPosts } = useContext(PostContext)

  useEffect(() => {
    getPosts()
  }, [])

  return(
    <div className="posts">
        {
          posts.filter(post => post.approved === true)
          .map(p => {
            return (
                <section className="post" key={p.id}>
                    <img src={p.imageUrl} className="profile_img" />
                    <div className="post_info">
                        <div>
                            <h3>{p.author.user.firstName} {p.author.user.lastName}</h3>
                            <i>{ moment(p.publicationDate.toString()).format('MMMM Do YYYY, h:mm:ss a')}</i>
                        </div>

                        <div className="post_content">{p.content}</div>
                        <img src={p.imageUrl} className="post_img" />

                        <div className="reactions">
                            <button className="reaction">
                                <img src={comment} className="icon"/>
                                Comments
                            </button>
                            <button className="reaction">
                                <img src={like} className="icon"/>
                                Like
                            </button>
                        </div>

                    </div>
                </section>
            )
          })
        }
    </div>
  )
}