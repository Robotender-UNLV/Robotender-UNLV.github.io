function setUp()
{
    localStorage.setItem("user1Email", "user1@gmail.com");
    localStorage.setItem("user1Pass", "password");
    localStorage.setItem("user2Email", "user2@gmail.com");
    localStorage.setItem("user2Pass", "password");
    localStorage.setItem("ValidEventCode", "E767911");

    
}

function signUp() {
    $(".sign-up").toggleClass('d-none',1000);
    $(".login").toggleClass('d-none',1000)
    console.log("CLicked sign up");

    //store in local 
   var tempEmail =  $("#email").value;
   var tempPass =  $("#password").value;
    localStorage.setItem("newUserEmail",tempEmail );
    localStorage.setItem("newUserPass", tempPass)
}
function login() {
    $(".sign-up").addClass('d-none',1000);
    $(".login").removeClass('d-none',1000)
    console.log("CLicked sign up",1000);


}
function passCheck()
{
    
    var emailUser = document.getElementById('email').value;
    var passUser = $("#password").value;

    console.log(emailUser);
    console.log(localStorage.getItem("user1Email"));
    if(emailUser == localStorage.getItem("user1Email") || emailUser == localStorage.getItem("user2Email") || emailUser == localStorage.getItem("newUserEmail"))
    {
        console.log("valid");
        window.location.href = "https://robotender-unlv.github.io/drink.html";
    }

    else
    {
        console.log("not valid");
    }
}
