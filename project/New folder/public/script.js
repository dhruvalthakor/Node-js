let user=document.querySelector("#name")
let email=document.querySelector("#email")
let password=document.querySelector("#password")

let userlist=JSON.parse(localStorage.getItem("users"))||[];
// let userlist=[];

//  sigin up 
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    if (user.value&&email.value&&password.value) {
        userlist.push({
            name:user.value,
            email:email.value,
            password:password.value
        })
         window.location.href="login.html"
    } else {
        alert("enter value")
    }
  
    localStorage.setItem("users",JSON.stringify(userlist));
    

   user.value="",
  email.value="",
 password.value=""

})




