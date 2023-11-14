let email = document.getElementById('email')
let errEmail = document.getElementById('errEmail')
let button = document.getElementById('submit')
email.addEventListener('input',()=>{
    if(validator.isEmail(email.value)){
        errEmail.hidden = true
    }else{
        errEmail.hidden = false
    }
    check()
})

let pass = document.getElementById('password')
let passr = document.getElementById('passwordRepeat')
let errPass = document.getElementById('errPass')
passr.addEventListener('input',()=>{
    if(pass.value == passr.value){
        errPass.hidden = true
    }else{
        errPass.hidden = false
    }
    check()
})

function check(){
    if (errEmail.hidden == true && errPass.hidden == true){
        button.disabled = false
    }else{
        button.disabled = true
    }
}
