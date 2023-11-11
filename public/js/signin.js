import validator from 'validator'
function getEmail(){
    var email = document.getElementById('email').value;
    return validator.isEmail(email)
}

function getUname(){
    var uname = document.getElementById('username')

    if (uname.length < 3){
        return false
    } else{
        return true
    }
}

function getPass(){
    var pass = document.getElementById('password').value;
    var passR = document.getElementById('passwordRepeat').value;

    if (pass == passR && pass.length > 7 && passR.length > 7){
        return true
    } else{
        return false
    }
}

function checker(getEmail,getPass,getUname){
    if (!getEmail){
        result.textContent = 'Email tidak valid'
        return false
    } else if(!getPass){
        result.textContent = 'Kata Sandi tidak valid'
        return false
    } else if(!getUname){
        result.textContent = 'Nama tidak valid'
        return false
    } else{
        document.getElementById("loginForm").submit()
    }
    
}