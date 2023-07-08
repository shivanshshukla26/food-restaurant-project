const fullNameElement = document.getElementById('fullName');
const emailIdElement = document.getElementById('emailId');
const phoneNumberElement = document.getElementById('phoneNumber');
const passwordElement = document.getElementById('password');
const addElement = document.getElementById('add');
const loginEmailElement = document.getElementById('loginEmailId');
const loginPasswordElement = document.getElementById('loginPassword');
const forgotPassEmailIdElement = document.getElementById('forgotPassEmailId');
const forgotPassPhoneNumberElement = document.getElementById('forgotPassPhoneNumber');
const newPasswordElement = document.getElementById('newPassword');


axios.get('http://localhost:3001/getRestaurant').then((result) => {
    console.log(result);
    const restoSelectElement = document.getElementById('restoSelect');
    result.data.result.forEach(eachResto =>{
        const optionTag = document.createElement('option');
        optionTag.text = eachResto.restaurantName + ", " + eachResto.details.address;
        optionTag.value = eachResto._id;
        restoSelectElement.append(optionTag);
    })
}).catch((err) => {
    console.log(err);
})


function signup() {
    console.log(fullNameElement.value, emailIdElement.value, passwordElement.value, phoneNumberElement.value, addElement.value);

    const data = {
        fullName: fullNameElement.value,
        email: emailIdElement.value,
        contact: phoneNumberElement.value,
        password: passwordElement.value,
        add: addElement.value
    };
    axios.post('http://localhost:3001/signup', data).then((result) => {
        console.log(result);
        alert(result.data.message);
        document.getElementById('fullName').value = '';
        document.getElementById('emailId').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('password').value = '';
        document.getElementById('add').value = '';
    }).catch((err) => {
        console.log(err);
    });
}

function login(){
    console.log(loginEmailElement.value, loginPasswordElement.value);
    const data = {
        email : loginEmailElement.value, 
        password : loginPasswordElement.value 
    }
    axios.post('http://localhost:3001/login', data).then((result) =>{
    console.log(result);
    alert(result.data.message);
    document.getElementById('loginEmailId').value = '';
    document.getElementById('loginPassword').value = '';

    }).catch((err) => {
        console.log(err);
    });
}

function forgotPass(){
    console.log(loginEmailElement.value, loginPasswordElement.value);
    const data = {
        email : forgotPassEmailIdElement.value, 
        phoneNumber : forgotPassPhoneNumberElement.value,
        newPassword : newPasswordElement.value 

    }
    axios.post('http://localhost:3001/forgotPassword', data).then((result) =>{
    console.log(result);
    alert(result.data.message);
    document.getElementById('forgotPassEmailId').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('forgotPassPhoneNumber').value = '';

    }).catch((err) => {
        console.log(err);
    });
}

function displayFood() {
    const restoSeclectElement = document.getElementById('restoSelect');
    axios.get(`http://localhost:3001/getRestaurant?id=${restoSeclectElement.value}`).then((result) => {
        console.log(result);
        const foodListcontainer = document.getElementById('food-list');
        foodListcontainer.innerHTML = '';
        const foodItems = result.data.data[0].foodItems;
        console.log(foodItems);
        for(const key in foodItems){ 
            foodItems[`${key}`].forEach(foodItem => {
                const foodElement = document.createElement('div');
                foodElement.innerHTML = `<span>${foodItem.name} - Rs ${foodItem.price}<span> <button> add to cart </button>`;
                foodListcontainer.appendChild(foodElement);
            });   
        }
    }).catch((err) => {
    console.log(err);
    })
}