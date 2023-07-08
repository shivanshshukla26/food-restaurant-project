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


app.post('/login', async(req, res) => {
    const { email, password} = req.body;
    if(email && password){
        const result = await db.collection('user-cred').find({email}).toArray();
        if(result.length){
            if(result[0].password == password){
                res.json({message : 'login successful', details: result})
            }
            else{
                res.json({message : 'invalid password'});
            }
        }
        else{
            res.json({message : 'user doesn\'t exists'})
        }
    }
    else{
        res.json({message : "Invalid email or password"});
    }
})

app.post('/forgotPassword', async(req, res)=>{
    const {email, phoneNumber, newPassword} = req.body;
    if(email && phoneNumber && newPassword){
        const result = await db.collection('user-cred').find({email}).toArray();
        if(result.length){
            if(result[0].contact == phoneNumber){
                await db.collection('user-cred').updateOne({email}, {$set: {password : newPassword}});
                res.json({message: 'password updated successfully'});
            }
            else{
                res.json({message : 'invalid contact'});
            }
        }
        else{
            res.json({message: 'user doesn\'t exists'});
        }
    }
    else{
        res.json({message: 'invalid email or phone number'});
    }
    
})

app.post('/addRestaurant', async(req,res)=>{
    const restoDetails = req.body;
    if(restoDetails){
        await db.collection('restaurant').insertOne(restoDetails);
        res.json({message : 'restaurant details added in DB'});
    }
    else{
        res.json({message: "restaurant details is empty"});
    }
})


app.get('/getRestaurant', async(req, res) => {
    const { location, food, id} = req.query;
    const result = await db.collection('restaurant').find({}).toArray();
    let data =[];

    if(result.length){

        if(location){
            console.log(result);
            result.forEach(eachResto => {
                if(eachResto.details.address == location){
                    data.push(eachResto);
                }
            });
            res.json({message : 'All the Restaurant', data});
        }
        else if(id){
            result.forEach(eachResto => {
                console.log(eachResto._id);
                const _id = (eachResto._id).toString();
                if(_id == id){
                    data.push(eachResto);
                }
            });
            res.json({message : 'All the Restaurant', data});
        }
        else if(food){
            result.forEach(eachResto => {
                for(const key in eachResto.foodItems){
                    eachResto.foodItems[`${key}`].forEach(foodItems => {
                        if(foodItems.name == food){
                            data.push(eachResto);
                        }
                    })
                    res.json({message: 'All the restaurant', data});
                }
            });
        }else{
            res.json({message : 'All the Restaurant', result});
        }
    }else{
        res.json({message : 'No restaurant available'});
    }

})

const port = 3001;
app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});