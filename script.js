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