var signUpButton = document.getElementById('signUp');
var signInButton = document.getElementById('signIn');
var loginButton = document.getElementById('login-button');
var signButton = document.getElementById('signButton');
// *************************************************
var container1 = document.getElementById('container1');
// *************************************************
var loginEmail = document.getElementById('login-Email');
var loginPassword = document.getElementById('login-Password');
var signupName = document.getElementById('signup-Name');
var signupEmail = document.getElementById('signup-Email');
var signupPassword = document.getElementById('signup-Password');
// *************************************************
var nameAlert = document.getElementById('name-Alert')
var emailAlert = document.getElementById('email-Alert')
var passwordAlert = document.getElementById('password-Alert')
var emailLog = document.getElementById('logE-Alert')
var pwLog = document.getElementById('LogP-Alert')
// *************************************************
var accounts = [];
var accountsObj = {};
if (localStorage.getItem('accounts') != null) {
    accounts = JSON.parse(localStorage.getItem('accounts'))
}

function addAcc() {
    if (signupName.value!= ``) {
        if (validateEmail() == true) {
            if (validatePassword() == true) {
                accountsObj = {
                    accName: signupName.value,
                    accEmail: signupEmail.value,
                    accPassword: signupPassword.value,
                }
                accounts.push(accountsObj)
                localStorage.setItem('accounts', JSON.stringify(accounts))
                console.log(accounts)
                clear()
            }

        }
    }
   else {
    nameAlert.classList.remove('d-none')
    nameAlert.innerHTML=`Fill Your name`;
   }

}
signButton.addEventListener('click', function () {
    addAcc();
})

function clear() {
    signupName.value = '';
    signupEmail.value = '';
    signupPassword.value = '';
}

signUpButton.addEventListener('click', function () {
    container1.classList.add("animation-form");
});

signInButton.addEventListener('click', function () {
    container1.classList.remove("animation-form");
});

function validateEmail() {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(signupEmail.value) == true) {

        return true;
    }
    else {
        emailAlert.classList.remove('d-none');
        emailAlert.innerHTML = 'Please use Valid Mail'
        signupEmail.value = '';
        return false;
    }
}
function validatePassword() {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (regex.test(signupPassword.value) == true) {
        passwordAlert.classList.add('d-none');
        return true;
    }
    else {

        passwordAlert.classList.remove('d-none');
        passwordAlert.innerHTML = `Use Capital letter and special char(@, $, !, &).`
        signupPassword.value = '';

    }
}
function validatelogin() {
    var id = loginEmail.value
    var pw = loginPassword.value
    if (id == `` && pw == ``) {
        fillEm()
        fillPw()
    }
    else if (!id == ``) {
        if (!pw == ``) {
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].accEmail.toLowerCase() == id.toLowerCase()) {
                    if (accounts[i].accPassword == pw) {
                       window.location.href=`index2.html`;
                       var usernameName = document.getElementById('user-name')
                        usernameName.innerHTML=`${accounts[i].accName}`;
                        
                    }
                    else {
                        pwLog.classList.remove('d-none');
                        pwLog.innerHTML = 'Wrong Password'
                        loginPassword.value = ``;
                    }
                }
                else {
                    emailLog.classList.remove('d-none');
                    emailLog.innerHTML = `Wrong Email`;
                }
            }
        }
        else {
            fillPw()
        }
    }
    else {
        fillEm()
    }



}
loginButton.addEventListener('click', function () {
    validatelogin()
})
loginPassword.addEventListener('input', function () {
    pwLog.classList.add('d-none');

})
signupEmail.addEventListener('input', function () {
    emailAlert.classList.add('d-none');
})
signupPassword.addEventListener('input', function () {
    passwordAlert.classList.add('d-none')
})
loginEmail.addEventListener('input', function () {
    emailLog.classList.add('d-none');
    pwLog.classList.add('d-none');

})
signupName.addEventListener('input',function(){
    nameAlert.classList.add('d-none');
})


function fillEm() {
    emailLog.classList.remove('d-none');
    emailLog.innerHTML = `Please Fill your Email`;
}

function fillPw() {
    pwLog.classList.remove('d-none');
    pwLog.innerHTML = 'Please Fill Your Password'
}
