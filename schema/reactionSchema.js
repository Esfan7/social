
const mongoose = require('mongoose');



const reactionSchema = mongoose.Schema({
    reactionId:{
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280
    },
    username:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        default: () => Date.now() + 7*24*60*60*1000
    }


})

module.exports = reactionSchema