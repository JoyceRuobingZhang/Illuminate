import React, { useEffect, useState } from "react"
import moment from 'moment'
import "../../assets/styles/PostList.css"
import commentIcon from "../../assets/img/comment.svg"
import like from "../../assets/img/like.svg"
import unlike from "../../assets/img/unlike.svg"
import approve from "../../assets/img/approve.svg"
import send from "../../assets/img/send.svg"
import deleteIcon from "../../assets/img/delete.svg"



export const PostList = ({posts, approvePost, likePost, unlikePost, comments, getComments, createComment, profile, deletePost}) => {
    const [ showComments, setShowComments ] = useState(0)
    const [ comment, setComment ] = useState({})

    useEffect(() => {
        getComments()
    }, [])

    const sorted = posts.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))

    const Swal = require('sweetalert2')


    const handleControlledInputChange = (e) => {
        const newCurrentComment = {...comment }
        newCurrentComment[e.target.name] = e.target.value
        setComment(newCurrentComment)
      };


    const renderComments = (postId) => {
        const theComments = comments.filter(c => c.post?.id === postId)
        if(postId === showComments){
            if(theComments.length){
                return (<>
                    <div className="comment_input_wrapper">
                        <input type="text" placeholder="Leave a comment..." className="comment_input" 
                        name="content" value={comment.content} onChange={handleControlledInputChange} />
                        <button className="comment_send" type="button" onClick={() => createComment({
                            content: comment.content,
                            postId: postId,
                            publication_date: Date(Date.now())
                        })}>
                            <img src={send} alt="send" className="icon" />
                        </button>
                    </div>
                    {
                        theComments.map(c => (
                            <div className="comment" key={c.id}>
                                <img src={c.author.profileImg} className="comment_profile" />
                                <div className="comment_info">
                                    <div className="comment_info_header">
                                        <p>{c.author.user.firstName} {c.author.user.lastName}</p> 
                                        <i>{moment(c.publicationDate.toString()).format('MMMM Do YYYY, h:mm:ss a')}</i>
                                    </div>
                                    <p>{c.content}</p>
                                </div>
                            </div>
                        ))
                    }
                    </>)
            } else {
                return (<>
                    <div className="comment_input_wrapper">
                        <input type="text" placeholder="Leave a comment..." className="comment_input"/>
                        <button className="comment_send">
                            <img src={send} alt="send" className="icon" />
                        </button>
                    </div>
                    <h4>Be the first one to leave a comment.</h4>
                </>)
            }
        }
    }

    
    // render approve button for admin user
    const renderApproveBtn = (p) => {
       if(profile.user.isStaff) {
           if(!p.approved){
                return <button className="btn reaction" onClick={() => {
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
       }
    }


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
                                <button className="btn reaction" onClick={ () => setShowComments(p.id) }>
                                    <img src={commentIcon} className="icon"/>
                                    Comments
                                </button>

                                {/* render like/unlike button */}
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

                                {renderApproveBtn(p)}

                                {
                                    p.author?.id === profile.id ?
                                    <button className="btn reaction" type="button" onClick={() => {
                                        deletePost(p.id)
                                        Swal.fire({
                                            title: 'Delete Successfully!',
                                            confirmButtonText: 'OK'
                                        })
                                    }}>
                                        <img src={deleteIcon} alt="delete" className="icon" style={{width:"20px"}} />
                                        Delete
                                    </button>
                                    : null
                                }
                            </div>
                            <div className="comments">
                                
                                { renderComments(p.id) }
                            </div>
                        </div>
                    </section>
                )
            })
            : <p className="no_posts">No Posts Here.</p>
            }
        </div>
    )
}