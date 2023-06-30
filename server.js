const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json());
app.use(cors());

let db;

MongoClient.connect('mongodb+srv://shukla26shivansh:hello@cluster0.wedpcrx.mongodb.net/?retryWrites=true&w=majority').then((client) => {
    db = client.db('Food-delivery'); 
    console.log("DB server is connected");
}).catch((err) => {
    console.log(err);
})

app.post('/signup', async(req, res) => {
    const { fullName, email, contact, password, add } = req.body;
    if (!fullName || !email || !contact || !password || !add) {
        res.json({ message: "please enter valid details" });
        return;
    } else {
        const result = await db.collection('user-cred').find({email}).toArray();
        console.log(result);
        if(result.length){
            res.json({message : 'user already exists'});
            return;
        }
        const user = {fullName, email, contact, password, add};
        await db.collection('user-cred').insertOne(user);

        res.json({ message: "user created successfully" });
    }

});


app.post('/login', (req, res) => {
    const { email, password} = req.body;

    
    res.json({message : "Invalid email or password"});
})

app.post('/forgotPassword', (req, res)=>{
    const {email, phoneNumber, newPassword} = req.body;
    
    res.json({message: "invalid "});

})



const port = 3001;
app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});