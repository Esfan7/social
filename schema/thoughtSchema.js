
const mongoose = require('mongoose');

const thoughtSchema = mongoose.Schema({
    thoughts:{
        type: String,
        required: true,
        minLength: 1,
        MaxLength: 280
    },
    createdAt:{
        type: Date,
        default: () => Date.now() + 7*24*60*60*1000
    },
    username:{
        type:String,
        required: true
    },
    reactions:{
        type:Array
    }


})

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

module.exports = thoughtSchema