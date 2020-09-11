
// fst argument = message, sec = sucses or unsucses
var a = 20;
var count = 0;
function toastNotification(message, status) {
    var creatMessage = document.createElement("div");
    creatMessage.innerHTML = message;
    creatMessage.classList.add("toast-message");
    if (!status) {
        creatMessage.classList.add("errorcss");
    }
    creatMessage.className += " show";
    document.body.append(creatMessage);
    var cratedDiv = document.querySelectorAll(".toast-message");

    // for(i=1;i<cratedDiv.length;i++){
    // var currentDiv = cratedDiv[count];
    if (cratedDiv.length == 2) {
        var x = a + 40;
        // currentDiv.className;
        var classToastM = document.getElementsByClassName("toast-message")
        classToastM[1].style.marginBottom =  x +"px";
        classToastM[1].style.color = "blue";
        // a = x;
    }

    // }
    setTimeout(function () {
        creatMessage.className = creatMessage.className.replace("show", "");
    }, 3000);
    setTimeout(function () {
        creatMessage.remove();
    }, 3000);
};