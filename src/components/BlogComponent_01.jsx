import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Blog.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from './AuthContext';
import sanitizeHtml from 'sanitize-html';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  
  const storeUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.name,
          email: user.email,
          picture: user.picture,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store user data');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('userStored', 'true');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && !localStorage.getItem('userStored')) {
      storeUserData();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setLoaded(true);
        } else {
          alert('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const loadSavedData = () => {
    const savedData = localStorage.getItem('blogData');
    return savedData ? JSON.parse(savedData) : {};
  };

  const mergePosts = (posts, savedData) => {
    return posts.map(post => {
      const savedPost = savedData[post.id] || { likes: [], comments: [] };
      return { ...post, ...savedPost };
    });
  };

  const renderBlogPosts = posts => {
    return posts.map((post, postIndex) => {
      return (
        <div className="col-md-4 mb-4" key={post.id}>
          {createCard(post, postIndex)}
        </div>
      );
    });
  };

  const createCard = (post, postIndex) => {
    const sanitizedDescription = sanitizeHtml(post.description);
    return (
      <div className={`card_1 h-100 ${loaded ? 'animate' : ''}`} style={{ animationDelay: `${postIndex * 0.1}s` }}>
        <img className="card-img-top" src={post.photoPath} alt={post.title} />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p
            className="card-text description"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription.substring(0, 30) + '...' }}
          />
          <br />
          <br />
          <Link to={`/blogcomponent/${post.id}`} className="btn btn-primary read-more">
            Get More
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="row" id="blog-posts-row">
      {renderBlogPosts(posts)}
      <Link to={`/createBlog`} className="btn_1">
        Create Blog
      </Link>
    </div>
  );
};

export default BlogPosts;
