var appModule = {
    userdata: [],
    init: function () {
        popup.init();
        notification.init();

        // loginform open
        var addBtn = document.querySelector(".add-btn");
        addBtn.addEventListener("click", function () {
            document.body.style.background = "";
            popup.open(".login-form");
        });

        var addBtn2 = document.querySelector(".add-btn2");
        addBtn2.addEventListener("click", function () {
            popup.open(".login-form");
        });


        // loginform close
        var removeFormBtn = document.querySelector(".remove-form-btn");
        removeFormBtn.addEventListener("click", function () {
            if (userData.length == 0) {
                popup.close(".login-form");
            } else {
                popup.close(".login-form");
            }
            form.reset();
            userProfileImg.src = "img/user3.jpg";
            for (i = 0; i < lablefocus.length; i++) {
                var lableTag = lablefocus[i];
                lableTag.classList.remove("lable-focus");
            }
        })

        // go back 
        // var goBackBtn = userList.querySelector(".go-back-btn");
        // if(!goBackBtn){
        //     return;
        // };
        // goBackBtn.addEventListener("click", function(){
        //     popup.close(".userProfile");
        // })


    },


}