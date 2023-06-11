const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const userSchema = require('../schema/userSchema');
const User = mongoose.model("User", userSchema)
const ObjectId = require('mongodb').ObjectId;

//api/users
router.get("/", async (req, res)=>{

    try{
        const result = await User.find();
    
        res.json(result)

    } catch(err){
        console.log(err)
    }

})

router.get("/:id", async (req, res)=>{

  try{
      const result = await User.find({
        _id: new ObjectId(req.params.id)
      });
  
      res.json(result)

  } catch(err){
      console.log(err)
  }

})

router.post("/", async (req, res)=>{

    try{
        const result = await User.create(req.body);
        res.json(result)

    } catch(err){
        console.log(err)
    }
})


//User.update
router.put('/:id', async (req, res) => {
   
    try{
      const result = await User.findByIdAndUpdate(req.params.id,{
        username: req.body.username,
        email: req.body.email

      });

      res.json(result);
  
    } catch (err){
      console.log(err)
    }
  
  });


  ///:userId/friends/:friendId
  router.put('/:userId/friends/:friendId', async (req, res) => {
   
    try{
      const result = await User.findByIdAndUpdate(req.params.userId,{
        $addToSet: {friends: new ObjectId(req.params.friendId)}
      });

      res.json(result)
  
    } catch (err){
      console.log(err)
    }
  
  });

  router.delete('/:userId/friends/:friendId', async (req, res) => {
    try{
      const result = await User.findByIdAndUpdate(req.params.userId,{
        $pull: {friends: new ObjectId(req.params.friendId)}
      });

      res.json(result)
  
    } catch (err){
      console.log(err)
    }
  
  });



//User.destroy{id:}
router.delete('/:id',async (req, res) => {
   
    try{
      const result = await User.deleteOne({
        _id: new ObjectId(req.params.id)
      });
      res.json(result);
  
    } catch (err){
      console.log(err)
    }
  
  
  });




module.exports = router;
