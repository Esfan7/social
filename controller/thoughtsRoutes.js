const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const thoughtSchema = require('../schema/thoughtSchema');
const Thought = mongoose.model("Thought", thoughtSchema)

const reactionSchema = require('../schema/reactionSchema');
const Reaction = mongoose.model("Reaction", reactionSchema)

const ObjectId = require('mongodb').ObjectId;

//api/users
router.get("/", async (req, res)=>{

    try{
        const result = await Thought.find();
    
        res.json(result)

    } catch(err){
        console.log(err)
    }

})

router.post("/", async (req, res)=>{

    try{
        const result = await Thought.create({
            thoughts: req.body.thoughts,
            username: req.body.username,
            reactions: []
        });
        res.json(result)

    } catch(err){
        console.log(err)
    }
})


//User.update
router.put('/:id', async (req, res) => {
   
    try{
      const result = await Thought.findByIdAndUpdate(req.params.id,{
        thoughts: req.body.thoughts,
        username: req.body.username

      });

      res.json(result);
  
    } catch (err){
      console.log(err)
    }
  
  });


  router.put('/:id/reaction', async (req, res) => {
   
    try{


        const targetThought = await Thought.findById(req.params.id);

        const newReaction = await Reaction.create({
            reactionId: new ObjectId(),
            reactionBody: req.body.reactionBody,
            username: req.body.username
        });


        targetThought.reactions.push(newReaction)

        const result = await Thought.findByIdAndUpdate(req.params.id,{
            reactions: targetThought.reactions

        });

      res.json(result);
  
    } catch (err){
      console.log(err)
    }
  
  });

  router.delete('/:id/reaction', async (req, res) => {
   
    try{


        const targetThought = await Thought.findById(req.params.id);

        //targetThought.reaction //loop through and find the reactiona and remove


        targetThought.reactions.push(newReaction)

        const result = await Thought.findByIdAndUpdate(req.params.id,{
            reactions: targetThought.reactions

        });

      res.json(result);
  
    } catch (err){
      console.log(err)
    }
  
  });
//User.destroy{id:}
router.delete('/:id',async (req, res) => {

    console.log(req.body.reactionId)
    if(req.body.reactionId){
      //delete reaction in thought
      try{
        const targetThought = await Thought.findById(req.params.id);

       

        //targetThought.reaction //loop through and find the reactiona and remove
        let reactionList = [];

        targetThought.reactions.map(t=>{
          console.log(t.reactionId.toString(), "compare", req.body.reactionId)
          if(t.reactionId.toString() !== req.body.reactionId ){
            console.log("no match")
            reactionList.push(t)
          } 
        })


     

        const result = await Thought.findByIdAndUpdate(req.params.id,{
            reactions: reactionList

        });
        res.json(result);
    
      } catch (err){
        console.log(err)
      }
  


    } else {
      //delete thought
      try{
        const result = await Thought.deleteOne({
          _id: new ObjectId(req.params.id)
        });
        res.json(result);
    
      } catch (err){
        console.log(err)
      }
  


    }

   
  
  
  });


  




module.exports = router;
