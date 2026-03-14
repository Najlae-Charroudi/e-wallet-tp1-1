import finduserbymail from "./database.js";

const mailInput = document.getElementById('mail');
const passwordInput = document.getElementById('password');
const submitbtn = document.getElementById('submitbtn');

submitbtn.addEventListener("click", hadlesubmit);

function hadlesubmit(){
    let mail = mailInput.value;
    let password = passwordInput.value;

    if(!mail || !password){
        alert("il faut entrer votre mail et votre pass");
    }
    else{
        let user = null;

        submitbtn.textContent = "checking...";

        setTimeout(()=>{
            user = finduserbymail(mail,password);

            if(user){
                sessionStorage.setItem("current user", JSON.stringify(user));
                
                document.location = "dashboard.html";
            }
            else{
                alert("bad checking");
            }

        },2000);
    }
}