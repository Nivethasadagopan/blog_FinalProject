import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from './common/Footer';
import { auth } from '../config/firebase';

function Blogs() {

    const [blogs, setBlogs] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [message, setMessage] = useState("");

    // Helper to show message for 2 seconds
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 2000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

           auth.onAuthStateChanged((user)=>{
                if(user){
                  
                  if(user.uid === "UgsUmWjf9MQQoPYOWyJIIP5Or8q1")
                  {
                    setAdmin(true);
                  }else{
                    setAdmin(false);    
                  }
                } else {
                  
                  console.log("No admin is logged in.");
                }   
              })


        fetchBlogs();
    }, []);

    const fetchBlogs = () => {
        axios.get("https://blog-finalproject.onrender.com/api/blogs")
            .then((res) => {
                setBlogs(res.data);
            })
            .catch(() => {
                console.log("Error fetching data");
            });


    };

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newImage, setNewImage] = useState(null); // NEW

    const handleLike = async (blog_id) => {
        try {
            const response = await axios.patch(`https://blog-finalproject.onrender.com/api/blogs/like/${blog_id}`);
            if (response.status === 200) {
                fetchBlogs();
            }
        } catch (error) {
            console.error('Error liking the blog post:', error);
        }
    };

    const handleNewBlogSubmit = async (event) => {
        event.preventDefault();

        const today = new Date();
        const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const likes = 0;

        const formData = new FormData();
        formData.append("newTitle", newTitle);
        formData.append("newContent", newContent);
        formData.append("date", date);
        formData.append("likes", likes);

        if (newImage) {
            formData.append("image", newImage);
        }

        axios.post("https://blog-finalproject.onrender.com/api/blogs", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                showMessage(res.data.message);
                fetchBlogs();
                setNewTitle('');
                setNewContent('');
                setNewImage(null);
            })
            .catch((error) => {
                console.log("Error creating blog:", error);
            });
    };

    // -----------------------------
    // EDIT BLOG STATES + FUNCTIONS
    // -----------------------------
    const [editingBlog, setEditingBlog] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editImage, setEditImage] = useState(null); // NEW

    const startEditing = (blog) => {
        setEditingBlog(blog);
        setEditTitle(blog.newTitle);
        setEditContent(blog.newContent);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("newTitle", editTitle);
        formData.append("newContent", editContent);

        if (editImage) {
            formData.append("image", editImage);
        }

        try {
            const res = await axios.patch(
                `https://blog-finalproject.onrender.com/api/blogs/${editingBlog._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            showMessage(res.data.message);
            setEditingBlog(null);
            fetchBlogs();

        } catch (error) {
            console.log("Error updating blog:", error);
        }
    };

    // -----------------------------
    // DELETE BLOG
    // -----------------------------
    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`https://blog-finalproject.onrender.com/api/blogs/${id}`);
            showMessage(res.data.message);
            fetchBlogs();
        } catch (error) {
            console.log("Error deleting blog:", error);
        }
    };

    return (
        <div className="blog-section py-14">
            <h2 className="text-center text-5xl font-bold mb-14">
                Latest <span className='text-orange-400'>Blogs</span> 📚
            </h2>

            {message && (
                <p className="text-center text-green-600 font-semibold mb-4">{message}</p>
            )}

            {/* Blog creation form */}
            {admin?
            <div className="blog-creation-form mb-8" style={{ width: "80%", margin: "auto" }}>
                <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />

                    <textarea
                        placeholder="Blog Content"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="p-2 border rounded"
                        rows="4"
                        required
                    />

                    {/* OPTIONAL IMAGE UPLOAD */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImage(e.target.files[0])}
                        className="p-2 border rounded"
                    />

                    <button type="submit" className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600">
                        Add Blog
                    </button>
                </form>
            </div>:""}

            {/* EDIT FORM */}
            {editingBlog && (
                <div className="blog-edit-form mb-8" style={{ width: "80%", margin: "auto" }}>
                    <h3 className="text-2xl font-bold mb-4">Edit Blog</h3>

                    <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="p-2 border rounded"
                            required
                        />

                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="p-2 border rounded"
                            rows="4"
                            required
                        />

                        {/* OPTIONAL IMAGE UPLOAD */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEditImage(e.target.files[0])}
                            className="p-2 border rounded"
                        />

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
                                onClick={() => setEditingBlog(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Blogs list */}
            <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post mb-8 p-6 bg-white shadow-lg rounded-lg">

                        {/* SHOW IMAGE IF EXISTS */}
                        {blog.image && (
                            <img
                                src={`https://blog-finalproject.onrender.com${blog.image}`}
                                className="w-full rounded mb-4"
                                alt="Blog"
                            />
                        )}

                        <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">{blog.newTitle}</h3>
                        <p className="blog-date text-gray-400 text-sm mb-4">{blog.date}</p>
                        <p className="blog-content text-gray-600 mb-4">{blog.newContent}</p>

                        <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() => handleLike(blog._id)}
                        >
                            Like
                        </span>
                        <span className="ml-2">{blog.likes} Likes</span>

                        <div className="mt-4 flex gap-4">
                            <button
                                className="text-green-600 font-semibold"
                                onClick={() => startEditing(blog)}
                            >
                                Edit
                            </button>

                            <button
                                className="text-red-600 font-semibold"
                                onClick={() => deleteBlog(blog._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Blogs;
