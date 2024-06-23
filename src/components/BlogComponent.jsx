import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import './BlogComponent.css'; 
import { useAuth } from './AuthContext';
import { setLikesToPosts } from './ApiService';
import { formatDistanceToNow } from 'date-fns';
import { useAuth0 } from '@auth0/auth0-react';
import sanitizeHtml from 'sanitize-html';

const Blog = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const fetchPost = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPost(data);
                setLoaded(true);
            } else {
                alert('Failed to fetch post');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    return (
        <div className="container_1">
            {post ? (
                <BlogPost post={post} fetchPost={fetchPost} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

const BlogPost = ({ post, fetchPost }) => {
    const { isAuthenticated } = useAuth0();
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [likes, setLikes] = useState(post.likes.length || 0);
    const [comments, setComments] = useState(post.comments || []);
    const [hasLiked, setHasLiked] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [showShareOptions, setShowShareOptions] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const storedHasLiked = localStorage.getItem(`hasLiked-${user.id}-${post.id}`);
            setHasLiked(storedHasLiked === 'true');
        }
    }, [isAuthenticated, post.id, user.id]);

    const handleReadMore = (event) => {
        event.preventDefault();
        setIsExpanded(!isExpanded);
    };

    const handleLike = () => {
        if (isAuthenticated) {
            if (!hasLiked) {
                setLikesToPosts(user.id, post.id)
                    .then(() => {
                        fetchPost();
                        setHasLiked(true);
                        localStorage.setItem(`hasLiked-${user.id}-${post.id}`, true);
                    })
                    .catch((error) => console.log(error));
            } else {
                alert("You have already liked this post.");
            }
        } else {
            navigate('/login');
        }
    };

    const handleComment = () => {
        if (isAuthenticated) {
            setIsCommenting(true);
        } else {
            navigate('/login');
        }
        setIsCommenting(!isCommenting);
    };

    const submitComment = async () => {
        if (commentText.trim()) {
            const newComment = { userId: user.id, text: commentText };
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${post.id}/comment/${user.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newComment),
                });

                if (response.ok) {
                    const savedComment = await response.json();
                    fetchPost();
                    setCommentText("");
                    setIsCommenting(false);
                } else {
                    alert('Failed to post comment');
                }
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        } else {
            alert("Comment cannot be empty.");
        }
    };

    const sharePost = (platform) => {
        if (isAuthenticated) {
            const postUrl = `${window.location.origin}/post/${post.id}`;
            const text = `${post.title}\n${post.description}\n\nRead more: ${postUrl}`;
            const encodedUrl = encodeURIComponent(postUrl);

            switch (platform) {
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
                    break;
                case 'whatsapp':
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                    break;
                default:
                    if (navigator.share) {
                        navigator.share({
                            title: post.title,
                            text: post.description,
                            url: postUrl,
                        }).catch((error) => console.error('Error sharing:', error));
                    } else {
                        alert('Sharing not supported by your browser.');
                    }
            }
        } else {
            navigate('/login');
        }
        setShowShareOptions(false);
    };

    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${post.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            console.log('Post deleted successfully');
            navigate('/blog');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const sanitizedDescription = sanitizeHtml(post.description);

    return (
        <div className="blog-post">
            <div className="post-header">
                {post.user && (
                    <>
                        <img className="user-photo" src={post.user.picture} alt={post.user.name} />
                        <div className="user-info">
                            <span className="user-name">{post.user.username}</span>
                            <br />
                            <span className="post-time">{formatDistanceToNow(new Date(post.time), { addSuffix: true })}</span>
                        </div>
                    </>
                )}
            </div>
            <div className="post-body">
                <h1 className="post-title">{post.title}</h1>
                <img className="post-image" src={post.photoPath} alt={post.title} />
                <div
                    className="post-description"
                    dangerouslySetInnerHTML={{ __html: isExpanded ? sanitizedDescription : `${sanitizedDescription.substring(0, 100)}...` }}
                />
                <a href="#" className="read-more" onClick={handleReadMore}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </a>
            </div>
            <div className="post-actions">
                <span className="likes">Likes: {likes}</span>
                <button className="like-button" onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button className="comment-button" onClick={handleComment}>
                    Comment
                </button>
                <button
                    className="share-button"
                    onClick={() => setShowShareOptions(!showShareOptions)}
                >
                    <FontAwesomeIcon icon={faShare} /> Share
                </button>
            </div>
            {isCommenting && (
                <div className="comment-box">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Enter your comment"
                    />
                    <button className="submit-comment" onClick={submitComment}>
                        Send
                    </button>
                </div>
            )}
            {showShareOptions && (
                <div className="share-options">
                    <button className="share-option" onClick={() => sharePost('facebook')}>
                        Facebook
                    </button>
                    <button className="share-option" onClick={() => sharePost('whatsapp')}>
                        WhatsApp
                    </button>
                    <button className="share-option" onClick={() => sharePost('twitter')}>
                        Twitter
                    </button>
                    <button className="share-option" onClick={() => sharePost()}>
                        Other
                    </button>
                </div>
            )}
            <Comments comments={comments} />
            {isAdmin && (
                <button className="delete-button" onClick={deletePost}>
                    Delete Post
                </button>
            )}
        </div>
    );
};

const Comments = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <div className="comments">No comments available.</div>;
    }

    return (
        <div className="comments">
            {comments.map((comment, index) => (
                <div className="comment" key={index}>
                    <img src={comment.user.picture} alt={comment.user.name} className="comment-photo" />
                    <div className="comment-content">
                        <span className="comment-user-name">{comment.user.username}</span>
                        <p className="comment-text">{comment.text}</p>
                        <span className="comment-time">{formatDistanceToNow(new Date(comment.time), { addSuffix: true })}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blog;
