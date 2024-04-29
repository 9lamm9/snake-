const inputs = document.querySelectorAll(".input")
const form = document.querySelector("form")
const lock = document.querySelectorAll(".passlock")
const check = document.querySelector("#check")
const alive = 1 
function Incorrect(text){
    document.querySelector(".WRONG").innerHTML = text
}
function enregistrement(){
    form.addEventListener("submit",event=>{event.preventDefault()})
    if ( !getCookie("usercount")){
        createCookie("usercount",1,999)
    }
    if ( !inputs[4].checked){
        Incorrect(`You must agree to the terms and conditions`)
        return
    }
    if( inputs[2].value != inputs[3].value ) {
        Incorrect(``)
        return
    }
    if (String(inputs[0].value).trim()==``){
        document.querySelector(".WRONG").innerHTML = `Username cannot be empty`
        return
    }
    if ( inputs[1].value == ``){
        Incorrect(`Email cannot be empty`)
        return
    }
    
    
    if(inputs[0].value!="" && inputs[1].value!=""){
        let usernumber = parseInt(getCookie("usercount"));
        createCookie(`username${usernumber}`,inputs[0].value,999)
        createCookie(`email${usernumber}`,inputs[1].value,999)
        createCookie(`password${usernumber}`,inputs[2].value,999)
        createCookie(`balance${usernumber}`,0.10,999)
        createCookie(`loginstate`,`${usernumber}`,1)
        createCookie(`usercount`,usernumber+1,999)
        setTimeout(()=>{window.location.href='index.html'},900)
        document.querySelector(".WRONG").innerHTML=``
        console.log("All Cookies = ",document.cookie)
    }
}
function bienvenue(){
    form.addEventListener("submit",event=>{event.preventDefault()})
    const username = inputs[0].value
    const password = inputs[1].value
    let i = parseInt(getCookie("usercount"))-1
    if (i == undefined){
        Incorrect(`you don't have any account Create Account`)
        return
    }
    while( i > 0){
        if(username==getCookie(`username${i}`) && password==getCookie(`password${i}`)){
            createCookie(`loginstate`,`${i}`,1)
            if ( inputs[2].checked)
               createCookie("rememberme",`${i}`,1)
            else 
               createCookie("rememberme",`false`,1)
            window.location.href="index.html"
            return
        }
        i--
    }
    document.querySelector(".WRONG").innerHTML = "Incorrect Username or Password"
}
function changePassword(){
    form.addEventListener("submit",event=>{event.preventDefault()})
    const username = inputs[0].value
    const ConfirmationCode = inputs[1].getAttribute("data-code")
    if ( ConfirmationCode!=inputs[1].value) {
        Incorrect(`Confirmation Code Incorrect !`)
        return
    }
    if ( inputs[2].value != inputs[3].value) {
        Incorrect("Passwords do not match ! Try again")
        return
    }
    if ( inputs[2].value == ``){
        document.querySelector(".WRONG").innerHTML = `New Password cannot be empty`
        return
    }
    let i = parseInt(getCookie("usercount"))-1
    while( i > 0){
        if(username==getCookie(`username${i}`)){
            createCookie(`password${i}`,inputs[2].value,999)
            document.querySelector(".WRONG").innerHTML = `Password Changed Successfully`
            setTimeout(() => {
                window.location.href="login.html"
            }, 1500);
            return
        }
        i--
    }
}
function createCookie(name,value,alive){
    const date = new Date()
    date.setTime(date.getTime()+(alive*24*60*60*1000))
    let expires="expires="+date.toUTCString()
    document.cookie=`${name}=${value};${expires};path=/`
}
function deleteCookie(cookieName) {
    createCookie(cookieName,null,null)
}
function getCookie(cookieName){
    const decoded = decodeURIComponent(document.cookie).split("; ");
    let result
    decoded.forEach(cookie=>{
        if(cookie.indexOf(cookieName)==0){
            result= cookie.substring(cookieName.length+1)
        }
    })
    return result
}

document.addEventListener("DOMContentLoaded",()=>{
    deleteCookie("loginstate")
    if(window.location.pathname.split("/").pop() == `login.html`){
       let i = parseInt(getCookie("rememberme"))
       let username = getCookie(`username${i}`)
       let password = getCookie(`password${i}`)
       if(username!=undefined && password!=undefined && getCookie("rememberme")!="false"){
           inputs[0].value= username
           inputs[1].value= password
       }
    }
    
    //Password locks
    lock.forEach( e => {
    e.addEventListener("click",()=>{
        if(e.classList=="bx bxs-lock passlock"){
            e.classList='bx bxs-lock-open passlock'
            inputs[e.getAttribute("data-i")].type="text"
        }
        else{
            e.classList='bx bxs-lock passlock'
            inputs[e.getAttribute("data-i")].type="password"
        }
        })
    })
    console.log(document.cookie)
})