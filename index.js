const express = require('express');
const cors = require('cors');
const fs = require('fs')
const app = express();

app.use(express.json());
app.use(cors());

const credentialList = [];


app.post('/signup', (req, res) => {
    const { fullName, email, contact, password, add } = req.body;
    if (!fullName || !email || !contact || !password || !add) {
        res.json({ message: "please enter valid details" });
        return;
    } else {
        for (let i = 0; i < credentialList.length; i++) {
            if (credentialList[i].email == email) {
                res.json({ message: "user already exist" });
                return;
            }
        }
        credentialList.push({ fullName, email, contact, password, add });
        let jsonData = JSON.stringify (credentialList);
        writeToFile (jsonData);

        res.json({ message: "user created successfully" });
    }
    console.log(credentialList);
});


app.post('/login', (req, res) => {
    const { email, password} = req.body;

    for(let i = 0; i < credentialList.length; i++){
        if(credentialList[i].email == email && credentialList[i].password == password){
            res.json({message : "login successful"});
            return;
        }
    }
    res.json({message : "Invalid email or password"});
})

app.post('/forgotPassword', (req, res)=>{
    const {email, phoneNumber, newPassword} = req.body;
    for(let i = 0; i < credentialList.length; i++){
        if(credentialList[i].email == email && credentialList[i].contact  == phoneNumber) {
            credentialList[i].password = newPassword;
            res.json({message : "password changed"});
            const jsonData = JSON.stringify(credentialList);
            writeToFile(jsonData);
            return;
        }
    }
    res.json({message: "invalid "});

})


function readFromFile(){
    fs.readFile('cred.json', (err, data) => {
        if(err){
            console.log(`error in reading file: ${err}`);
        }
        else{
            console.log(data.toString());
        }
    })
}


function writeToFile(jsonData){
    fs.writeFile('cred.json', jsonData, (err) => {
        if(err){
            console.log(`error in writing data : ${err}`);
    
        }
        else{
            console.log("Data inserted into cred.json file")
        }
    })
    
}

const port = 3001;
app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});