import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
import './signup.css';
import { useAuth } from "./AuthContext";

const Upload = () => {
  const { user } = useAuth();

  const [input, setInput] = useState({
    title: "",
    photo: null,
    description: ""
  });

  const [error, setError] = useState({
    title: "",
    photo: "",
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setInput({
        ...input,
        photo: e.target.files[0],
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    setError({
      ...error,
      [e.target.name]: e.target.value ? "" : "Required Field",
    });
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setInput({
      ...input,
      description: data,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('post', JSON.stringify({ title: input.title, description: input.description }));
    formData.append('photoFile', input.photo);
console.log(input);
    try {
      const response = await fetch(` https://ntc-website-backend-1.onrender.com/api/posts/${user.id}`, { // Change the URL and userId as necessary
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Post created successfully');
        setInput({
          title: "",
          photo: null,
          description: ""
        });
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <header>
        <div className="container_2 text-center">
          <div className="row align-items-center">
            <div className="col">
              <form
                onSubmit={handleSubmit}
                className="login-form"
                style={{ width: "60%", margin: "0 auto" }}
              >
                <div className="form_body ">
                  <h2>Write your blog here...</h2>
                  <p>Share your experience and inspire generations.</p>

                  <label style={{ display: "block", textAlign: "left" }}>
                    Title
                  </label>
                  <input
                    className="login-input"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={input.title}
                    onChange={handleChange}
                    required
                  />

                  <label style={{ display: "block", textAlign: "left" }}>
                    Add Photo
                  </label>
                  <input
                    className="login-input"
                    type="file"
                    id="photo"
                    name="photo"
                    placeholder="Photo"
                    onChange={handleChange}
                    required
                  />

                  <label style={{ display: "block", textAlign: "left" }}>
                    Add Description
                  </label>
                  <div className="input-login">
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        placeholder: "Write something about your blog...",
                      }}
                      onChange={handleDescriptionChange}
                    />
                  </div>

                  <div className="row align-items-center">
                    <div className="col">
                      <button
                        type="submit"
                        className="login-btn"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Upload;
