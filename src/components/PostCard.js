import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { likePost, unlikePost, commentPost } from "../firebase";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function PostCard({data, limit}){
    const userData = useContext(UserContext);

    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState('')
    const [commentLoad, setCommentLoad] = useState(false)

    useEffect(() => {
       
        if(data.likes?.includes(userData?.uid)) setLiked(true)
    }, [userData])

    const handleLike = (e) => {
        userData.uid && e.preventDefault();
        if(!userData.uid) return;
        if(liked){
            sendUnlike()
        } else {
            sendLike()
        }
    }

    const sendLike = async () => {
       
        setLiked(true)
        data.likes?.push(userData.uid)
        let res = await likePost(userData?.uid, data.id)
    }

    const sendUnlike = async () => {
        setLiked(false)
        data.likes?.pop()
        
        let res = await unlikePost(userData?.uid, data.id)
    }

    const sendComment = async () => {
        if(!comment) return;
        setCommentLoad(true)

        let commentData = {
            user: userData?.uid,
            comment,
            date: Date.now()
        }
        data.comments && data.comments.push(commentData)
        let res = await commentPost(data.id, commentData)
        toast('Comment Sent!', {
            position: "top-center",
            type: "success"
        });
        setCommentLoad(false)
        setComment('')

    }

    return (
        <div className="box mb-3 shadow-sm border rounded bg-white osahan-post">
            <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="./img/avatar.jpeg" alt="" />
                    <div className="status-indicator bg-success"></div>
                </div>
                <div className="font-weight-bold">
                    <div className="text-truncate">{data.user}</div>
                    <div className="small text-gray-500">{moment(data.date).format('LL')}</div>
                </div>
           
            </div>
            <div className="p-3 border-bottom osahan-post-body">
                <h6>
                    <Link to={`/post/${data.id}`}>{data.title}</Link>
                </h6>
                <p>
                {data.body}
                </p>
                <div className="row">
                    {data.images.map((image, i) => <div key={i} className={`col-${data.images.length === 1? '12' : '6'} p-2`}><img src={image} className="img-fluid" alt="Post image" /></div>)}
                </div>
            
            </div>
            <div className="p-3 border-bottom osahan-post-footer">
                <a href="/#/login" onClick={(e) => handleLike(e)} className="mr-3 text-secondary"><i className={`feather-heart ${liked && 'text-danger'}`}></i> {data.likes?.length || 0}</a>
                <a className="mr-3 text-secondary"><i className="feather-message-square"></i> {data.comments?.length || 0}</a>
                <a href="#" className="mr-3 text-secondary"><i className="feather-share-2"></i></a>
                {liked && <p className="text-primary" style={{fontSize: '11px'}}>You Liked this post</p>}
            </div>

            {!limit && data?.comments?.map((comment, i) => {
                
                return (
                    <div key={i} className="p-3 d-flex align-items-top border-bottom osahan-post-comment">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src={comment.user.imageURL || './img/avatar.jpeg'} alt="" />
                            
                        </div>
                        <div className="font-weight-bold">
                            <div className="text-truncate">
                                <p className="m-0 p-0">{comment.user.fullname}</p>  
                                <p className="small m-0 p-0">{moment(comment.date).format('LL')}</p>
                            </div>
                            <div className="small text-strong">
                                {comment.comment}
                            </div>
                        </div>
                    </div>
                )
            })}

            {userData?.uid && 
                <div className="p-3">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add Comment..." className="form-control border-0 p-0 shadow-none" rows="3"></textarea>
                    <button onClick={sendComment} className="btn btn-primary btn-sm mt-2">{commentLoad? <PulseLoader color="#fff"/> : 'Comment'}</button>
                </div>
            }
        </div>
    )
}