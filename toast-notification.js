
// fst argument = message, sec = sucses or unsucses
function toastNotification(message, status) {
    var creatMessage = document.createElement("div");
    if(status){
        creatMessage.innerHTML =`<i class="far fa-check-circle toastNoti-font-desing"></i>`+ message;
    }else if (!status) {
        creatMessage.innerHTML =`<i class="far fa-times-circle toastNoti-font-desing"></i>`+ message;
        var tostNotificationFont =creatMessage.querySelector(".toastNoti-font-desing");
        tostNotificationFont.style.backgroundColor="#fa5959";
    }
    creatMessage.classList.add("toast-message","show");
    var toastParent = document.querySelector(".toast-notification");
    toastParent.append(creatMessage);

    setTimeout(function () {
        creatMessage.remove();
    }, 3000);
};