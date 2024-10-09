const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAllPosts = async (req, res) => {
  // #swagger.tags = ['Posts']
    try {
      const result = await mongodb.getDb().collection('posts').find();
      const posts = await result.toArray();
      console.log('Posts:', posts); // Check if the data is being populated
      if (posts.length === 0) {
        console.log('No posts found');
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(posts);
    } catch (err) {
      console.log('Error getting posts:', err);
      res.status(500).json({ message: 'Error getting posts' });
    }
  };

const getPostById = async (req, res) => {
  // #swagger.tags = ['Posts']
    const postId = ObjectId.createFromHexString(req.params.id)
    const result = await mongodb.getDb().collection('posts').find({ _id: postId});
    result.toArray().then((posts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(posts);
    })
};

const createPost = async (req, res) => {
  // #swagger.tags = ['Posts']
    const post = {
        userName: req.body.userName,
        content: req.body.content,
        date: new Date(),
        likes: 0
    };
    try {
      const result = await mongodb.getDb().collection('posts').insertOne(post);
      res.status(201).json(result);
    } catch (err) {
      console.log('Error creating post:', err);
      res.status(500).json({ message: 'Error creating post' });
    } 
  };

const updatePost = async (req, res) => {
  // #swagger.tags = ['Posts']
    const postId = ObjectId.createFromHexString(req.params.id)
    const post = {
        userName: req.body.userName,
        content: req.body.content,
        date: req.body.date, 
        likes: req.body.likes
    };
    try {
      const result = await mongodb.getDb().collection('posts').replaceOne({ _id: postId}, post);
      res.status(204).json(result);
    } catch (err) {
      console.log('Error updating post:', err);
      res.status(500).json({ message: 'Error updating post' });
    }
  };

const deletePost = async (req, res) => {
  // #swagger.tags = ['Posts']
    const postId = ObjectId.createFromHexString(req.params.id)
    try {
      const result = await mongodb.getDb().collection('posts').deleteOne({ _id: postId});
      res.status(204).json(result);
    } catch (err) {
      console.log('Error deleting post:', err);
      res.status(500).json({ message: 'Error deleting post' });
    }
  };

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}