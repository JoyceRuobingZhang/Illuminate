import React from "react"
import moment from 'moment'
import Swal from 'sweetalert2'
import "./PostList.css"
import comment from "./comment.svg"
import like from "./like.svg"
import unlike from "./unlike.svg"
import approve from "./approve.svg"


export const PostList = ({posts, approvePost, likePost, unlikePost}) => {

  const sorted = posts.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))

  const Swal = require('sweetalert2')

  return(
    <div className="posts">
        {
          posts.length > 0 ?
          sorted.map(p => {
            return (
                <section className="post" key={p.id}>
                    <img src={p.author.profileImg || "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg"} className="profile_img" />
                    <div className="post_info">
                        <div>
                            <h3>{p.author.user.firstName} {p.author.user.lastName}</h3>
                            <i>{ moment(p.publicationDate.toString()).format('MMMM Do YYYY, h:mm:ss a')}</i>
                        </div>

                        <div className="post_content">{p.content}</div>
                        <img src={p.imageUrl || null} className="post_img" />

                        <div className="reactions">
                            <button className="btn reaction">
                                <img src={comment} className="icon"/>
                                Comments
                            </button>

                            {
                                p.liked?
                                <button className="btn reaction" onClick={(e) => {
                                    e.preventDefault()
                                    unlikePost(p)
                                }}>
                                    <img src={unlike} className="icon"/>
                                    Unlike
                                </button>
                                : 
                                <button className="btn reaction" onClick={(e) => {
                                    e.preventDefault()
                                    likePost(p)
                                }}>
                                    <img src={like} className="icon"/>
                                    Like
                                </button>
                            }

                            {
                              p.approved? 
                              null 
                              : <button className="btn reaction" onClick={() => {
                                  approvePost(p)
                                  Swal.fire({
                                    title: 'Approved Successfully',
                                    confirmButtonText: 'OK'
                                  })
                                }}>
                                    <img src={approve} className="icon"/>
                                    Approve
                                </button>
                            }
                        </div>

                    </div>
                </section>
            )
          })
          : <p className="no_posts">No Unapproved Posts.</p>
        }
    </div>
  )
}