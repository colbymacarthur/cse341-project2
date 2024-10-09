const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']
    try {
      const result = await mongodb.getDb().collection('users').find();
      const users = await result.toArray();
      console.log('Users:', users); // Check if the data is being populated
      if (users.length === 0) {
        console.log('No users found');
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    } catch (err) {
      console.log('Error getting users:', err);
      res.status(500).json({ message: 'Error getting users' });
    }
  };

  const getUserById = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
      const userId = ObjectId.createFromHexString(req.params.id);
      const result = await mongodb.getDb().collection('users').find({ _id: userId });
      const users = await result.toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
    const user = {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      bio: req.body.bio,
      join: req.body.join,
      followers: req.body.followers,
      following: req.body.following
    };
    try {
      const result = await mongodb.getDb().collection('users').insertOne(user);
      res.status(201).json(result);
    } catch (err) {
      console.log('Error creating user:', err);
      res.status(500).json({ message: 'Error creating user' });
    }
  };

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
    const userId = ObjectId.createFromHexString(req.params.id)
    const user = {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      bio: req.body.bio,
      join: req.body.join,
      followers: req.body.followers,
      following: req.body.following
    };
    try {
      const result = await mongodb.getDb().collection('users').replaceOne({ _id: userId}, user);
      res.status(204).json(result);
    } catch (err) {
      console.log('Error updating user:', err);
      res.status(500).json({ message: 'Error updating user' });
    }
  };

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
    const userId = ObjectId.createFromHexString(req.params.id)
    try {
      const result = await mongodb.getDb().collection('users').deleteOne({ _id: userId});
      res.status(204).json(result);
    } catch (err) {
      console.log('Error deleting user:', err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}