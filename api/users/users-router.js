const express = require('express');

const Posts = require("../posts/posts-model")
const Users = require("./users-model")

const { logger, validateUserId, validateUser, validatePost } = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users =>{
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({message: ""})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error =>{
      next(error)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error =>{
      next(error)
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(()=>{
      res.status(200).json({ message: "deleted"})
    })
    .catch(error => {
      res.status(500).json({ message: "Error removing user"})
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error =>{
      res.status(500).json({ message: "error getting posts"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postData = {...req.body, user_id: req.params.id};
  Posts.insert(postData)
    .then(post =>{
      res.status(201).json(post);
    })
    .catch(error => {
      next(error)
    }); 
});

// do not forget to export the router

module.exports = router
