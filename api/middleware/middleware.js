const Users = require("../users/users-model")

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] METHOD: ${req.method} URL: ${req.url}`
  );

  next();
}

const validateUserId = async (req, res, next) =>{
   const {id} = req.params
  try {
    const user = await Users.getById(id)
    if(!user){
      res.status(404).json({ message: "user not found" })
    }
    else{
      req.user = user
      next();
    }
  }
  catch(error){
    res.status(500).json({message: "Internal server error"})
  }
  // Users.getById(id)
  //   .then(user =>{
  //     if (user) {
  //       req.user = user
  //       next()
  //     }
  //     else {
  //       res.status(404).json({ message: "user not found" })
  //     }
  //   })
  //   .catch(error){
  //       res.status(500).json({message: "Internal server error"})
  // }
}

function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text){
    res.status(400).json({ message: "missing required text field" })
  }else{
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
// do not forget to expose these functions to other modules
