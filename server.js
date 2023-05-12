const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const userRoutes = require("./controller/userRoutes")
const thoughtRoutes = require("./controller/thoughtsRoutes")

app.use(express.json());
//translate body for post requests
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//return all files in public folder
app.use(express.static('public'))



async function main(){
    await mongoose.connect('mongodb+srv://eafanbeh:Gencoupe20t@cluster0.s9qly3h.mongodb.net/?retryWrites=true&w=majority')
}

main().catch(err=> console.log(err))


//declare a route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.use("/api/users", userRoutes)
app.use("/api/thoughts", thoughtRoutes)





//virtual friend count
//virutal raeciont count




const listener = app.listen(process.env.PORT || PORT, () => {
    console.log('Server started at http://localhost:' + listener.address().port);
})