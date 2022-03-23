import React, { useEffect, useState, useContext } from "react";
import { ProfileContext } from "../profile/ProfileProvider";
import { PostContext } from "./PostProvider";
import { PostList } from "./PostList";
import "../../assets/styles/PostPage.css"
import like from "../../assets/img/like.svg"
import postIcon from "../../assets/img/post.svg"
import img from "../../assets/img/image.svg"
import listIcon from "../../assets/img/unapproved.svg"
import { CommentContext } from "../comment/CommentProvider";


export const PostPage = () => {
    const { profile, getProfile } = useContext(ProfileContext)
    const { comments, getComments, createComment } = useContext(CommentContext)
    const { posts, getPosts, approvePost, likePost, unlikePost, getMyFavoritePosts, deletePost } = useContext(PostContext)
    const { createPost } = useContext(PostContext)
    const [ favorites, setFavorites ] = useState([])
    const [ imgInput, setImgInput ] = useState(false)
    const [ post, setPost ] = useState({imageUrl: ""})

    // file uploading
    const [upload, setUpload] = useState({ file: null })
    const [submit, setSubmit] = useState(false)

    // for different tabs
    const [tabState, setTabState] = useState([
        {
            id: 1,
            tab: "explore",
            selected: true
        },
        {
            id: 2,
            tab: "unapproved",
            selected: false
        },
        {
            id: 3,
            tab: "myPosts",
            selected: false
        },
        {
            id: 4,
            tab: "myFavorites",
            selected: false
        }
    ])

    useEffect(() => {
        getProfile()
    },[])

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        getMyFavoritePosts().then(res => setFavorites(res))
    }, [posts])

    /* file uploading */
    const handleFileSelect = e => {
        setUpload( {...upload,file: e.target.files[0]} )
        setSubmit(true)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
    
        const data = new FormData()
        data.set('newFile', upload.file)
        
        fetch(`http://localhost:8000/appusers/${localStorage.getItem("illuminate_login_appuser")}`, {
          method: 'PUT',
          headers:{
            "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
        },
          body: data
        })
        .then(() => {
            getPosts()
            getProfile()
        })

        setSubmit(false)
    }
    /* */
    
    const handleControlledInputChange = (e) => {
        const newPost = {...post}
        newPost[e.target.name] = e.target.value // Modify copy
        setPost(newPost)
    }

    // render posts for each tab
    const renderPosts =() => {
        const selectedTab = tabState.find(t => t.selected === true)
        let tabPosts = []
        switch (selectedTab.tab) {
            case "explore":
                tabPosts= posts.filter(p => p.approved === true)
            break
            case "unapproved":
                tabPosts= posts.filter(p => p.approved === false)
            break
            case "myPosts":
                tabPosts= posts.filter(p => p.author.id === profile.id)
            break
            case "myFavorites":
                tabPosts= favorites
            break
            default:
                tabPosts= posts
            break
        }
        return tabPosts
    }

    const handleTab = (tab) => {
        tabState.forEach(t => t.selected = false)
        tabState.find(t => t.tab === tab).selected = true
        setTabState([...tabState])
    }
    

    return (
        <div className="post_page">
            <div className="me">
                <img src={ profile.profileImg || "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg" } alt="my profile image" className="my_profile_img" />
                <input type="file"  name="fileToUpload" className="uploader" onChange={handleFileSelect} />
                {   submit?
                    <button className="btn submit_upload" onClick={(e) =>{
                        console.log(upload) 
                        handleSubmit(e)
                    }}>Submit Change</button> : null
                }

                <h3 className="me_name">{profile.user?.firstName} {profile.user?.lastName}</h3>

                <p className="bio"><i>{profile.bio}</i></p>

                <button className="btn my_activity" onClick={() => handleTab("explore")}>
                    <img src={listIcon} className="icon" alt="explore feed" />
                    <p>Explore</p>
                </button>
                <button className="btn my_activity" onClick={() => handleTab("myFavorites")} >
                    <img src={like} className="icon" alt="my favorites" />
                    <p>My Favorites</p>
                </button>
                <button className="btn my_activity" onClick={() => handleTab("myPosts")} >
                    <img src={postIcon} className="icon" alt="my posts" />
                    <p>My Posts</p>
                </button>
                {
                    profile.user?.isStaff?
                    <button className="btn my_activity" onClick={() => handleTab("unapproved")}>
                        <img src={listIcon} className="icon" alt="unapproved posts" />
                        <p>Unapproved Posts</p>
                    </button> : null
                }
            </div>


            <PostList 
                posts={renderPosts()} 
                approvePost={approvePost} 
                likePost={likePost}
                unlikePost={unlikePost}
                comments={comments}
                getComments={getComments}
                createComment={createComment}
                profile={profile}
                deletePost={deletePost}
            />

            {/* create a new post */}
            <div className="create">
                <div className="me_author">
                    <img src={profile.profileImg || "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg"} 
                    alt="my profile image" className="my_profile_img" />
                    <h3>{profile.user?.firstName} {profile.user?.lastName}</h3>
                </div>
                <textarea placeholder="Share your thoughts and feelings and  let's support each other..."
                name="content" value={post.content} onChange={handleControlledInputChange} />
                <div className="img_input">
                    <button className="btn" onClick={() => setImgInput(!imgInput) }>
                        <img src={img} className="icon" />
                    </button>
                    {
                        imgInput?
                        <input className="img_input_field" type="text" name="imageUrl" value={post.imageUrl} 
                        onChange={handleControlledInputChange} placeholder="Enter image url here..." />
                        : null
                    }
                </div>

                <button className="submit" onClick={(e) => {
                    e.preventDefault()
                    createPost({
                        ...post, 
                        publication_date: Date(Date.now())
                    })
                    setPost({...post, ["content"]: "", ["imageUrl"]: ""})
                }} >Submit</button>
            </div>
        </div>
    )
}