import db from '../../config/db.mjs';
import moment from 'moment';

// Get all blogs
export const getBlogs = async (req, res) => {
    console.log('GET /blogs endpoint hit');
    try {
        const [blogs] = await db.query('SELECT * FROM blogs');
        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found.' });
        }
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};


// Fetch a blog post by ID
export const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM blogs WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const blogPost = rows[0];
        res.status(200).json(blogPost);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Database error', details: error.message });
    }
};

// Create a new blog with media and timestamp
export const createBlog = async (req, res) => {
    const { title, content, media_url, media_type } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    const allowedMediaTypes = ['image', 'video', 'none'];
    if (media_type && !allowedMediaTypes.includes(media_type)) {
        return res.status(400).json({ error: 'Invalid media type.' });
    }

    // Generate the current timestamp using moment.js
    const formattedTimestamp = moment().format('YYYY-MM-DD HH:mm:ss');

    try {
        const [result] = await db.query(
            'INSERT INTO blogs (title, content, created_at, media_url, media_type) VALUES (?, ?, ?, ?, ?)',
            [title, content, formattedTimestamp, media_url || null, media_type || 'none']
        );

        res.status(201).json({
            message: 'Blog created successfully',
            blogId: result.insertId,
        });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};

// Update an existing blog by ID
export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, media_url, media_type } = req.body;

    // Validate input
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    const allowedMediaTypes = ['image', 'video', 'none'];
    if (media_type && !allowedMediaTypes.includes(media_type)) {
        return res.status(400).json({ error: 'Invalid media type.' });
    }

    try {
        // Check if the blog exists
        const [rows] = await db.query('SELECT * FROM blogs WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Update the blog post in the database
        await db.query(
            'UPDATE blogs SET title = ?, content = ?, media_url = ?, media_type = ? WHERE id = ?',
            [title, content, media_url || null, media_type || 'none', id]
        );

        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};



// Delete a blog by ID
export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: 'Blog ID is required' });
        }

        const [result] = await db.query('DELETE FROM blogs WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
};


