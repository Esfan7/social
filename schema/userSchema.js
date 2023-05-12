const {Schema} = require('mongoose');

const userSchema = Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    thoughts:{
        type:Array
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
  
    }]



},{
    toJSON: {
        virtuals: true
    },
    id: false
})


userSchema.virtual('friendCount').get(function () {

    return this.friends.length;

});
module.exports = userSchema