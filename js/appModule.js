var appModule = {
    init: function () {
        popup.init();
        toastMessage.init();
        // get methode
        $.get("http://localhost:2000/getdatabase", function (responce) {
            var result = responce.results;
            // console.log(result.length);
            // console.log("result : ", result);
            if (result.length == 0) {
                userList.classList.add("hide");
            } else {
                applicationLayout.classList.add("hide");
                userList.classList.remove("hide");
                document.body.style.background = "none";
                for (var i = 0; i < result.length; i++) {
                    var dpresultitem = result[i];
                    //   console.log(dpresultitem);
                    var payLoad = dpresultitem;
                    creatList(payLoad);
                }
            }
        });

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
            popup.close(".login-form");
            form.reset();
            userProfileImg.src = "img/user3.jpg";
            for (i = 0; i < lablefocus.length; i++) {
                var lableTag = lablefocus[i];
                lableTag.classList.remove("lable-focus");
            }
        });
    },
};
