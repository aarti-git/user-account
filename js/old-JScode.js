const loginSection = document.querySelector(".login-form");
const frontLogo = document.querySelector("logo-add");
const userProfileImg = document.querySelector(".profile-img");
const overlay = document.querySelector(".overlay");
const userProfile = document.querySelector(".userProfile");
const userList = document.querySelector(".user-list");
const applicationLayout = document.querySelector(".application-layout");
var form = document.querySelector("form");
const parentUserList = document.querySelector(".list-parent");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userprofession = document.getElementById("user-profession");
const userpassword = document.getElementById("user-password");
const lablefocus = document.querySelectorAll("label");
// const userContact = document.getElementById("user-contact");

var userData = [];

document.addEventListener("DOMContentLoaded", function(){
    appModule.init();
});

function loginForm() {
    if (userData.length == 0) {
        document.body.style.background = "";
        popup.open(".login-form");
    } else {
        popup.open(".login-form");
    }


}

function editProfileImg(x, y) {
    const profileImg = document.querySelector(x);
    const file = document.querySelector(y).files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        profileImg.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }

}

function removeForm() {
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
}

// goBack button
function goBack() {
    popup.close(".userProfile");
}

function InputFocus(el) {
    var inputLable = el.nextElementSibling;
    inputLable.classList.add("lable-focus");
    el.style.borderBottomss = "1px solid #03e9f4"
}
function InputBlur(el) {
    var inputLable = el.nextElementSibling;
    if (el.value == "") {
        inputLable.classList.remove("lable-focus");
    }
}

function submitData(e, el) {
    // var formLable = document.querySelectorAll(".form-label");
    e.preventDefault();
    var statusvalidation = CreatUserList();
    if (!statusvalidation) {
        return
    } else {
        var button = document.querySelector("#submit");
        button.innerHTML = "submiting.."
        const url = el.action
        var payLoad = payLoadObject();
        $.post(url, payLoad, function (data, status) {
            // alert("data save successfully !")
            if (data.responce == true) {
                // toastNotification('data save successfully !!', true);
                notification.success();
                button.innerHTML = "submit";
                creatList();
                popup.close(".login-form");
                document.body.style.background = "none";
                form.reset();
                userProfileImg.src = "img/user3.jpg";
                for (i = 0; i < lablefocus.length; i++) {
                    var lableTag = lablefocus[i];
                    lableTag.classList.remove("lable-focus");
                }
            } else if (data.responce == false) {
                // toastNotification('something is wrong!!', false);
                notification.failed();
                // throw e;
                // alert("something is wrong !");
                button.innerHTML = "submit";
            }
        }).catch(function (e) {
            console.log("something is wrong!", e);
            // toastNotification('something is wrong!!', false);
            notification.failed();
            button.innerHTML = "submit";
        })
    }
}

function payLoadObject() {
    var formFieldValues = document.querySelectorAll(".form-field");
    var x = "";
    var obj = {}
    for (i = 0; i < formFieldValues.length; i++) {
        var item = formFieldValues[i];
        var itemname = item.name;
        var itemvalue = item.value;
        if (itemname == "image") {
            itemvalue = userProfileImg.getAttribute('src');
        }
        obj[itemname] = itemvalue;
        // arr.push(itemname+":"+itemvalue);
        // obj[i]={infoname:value};
    }
    return JSON.stringify(obj);
}


function CreatUserList() {
    var isFormValid = formValidation();
    if (isFormValid === true) {
        return true;
    } else if (isFormValid === false) {
        return false;
    }
}

function formValidation() {
    var x = userEmail.value.indexOf("@");
    // const contLength = userContact.value;
    const passwordLength = userpassword.value;
    if (userName.value == "") {
        alert("name can't be empty");
        return false;
    }
    else if (x < 3) {
        alert("enter valid email address");
        return false;
    }
    else if (userprofession.value === "Select Your Profession") {
        alert("profession can't be empty");
        return false;
    }
    else if (passwordLength.length < 4) {
        alert("password must be 4 digit long");
        return false;
    }
    else {
        return true;
    }
}

function creatList() {
    var obj = {};
    const userProfileImg = document.querySelector(".profile-img");
    obj.name = userName.value;
    obj.email = userEmail.value;
    obj.profession = userprofession.value;
    obj.img = userProfileImg.src;
    if (userProfileImg.currentSrc == "") {
        obj.img = "img/user3.jpg"
    }
    userData.push(obj);
    // var data = userData[count]
    var Ulist = document.createElement("div");
    Ulist.innerHTML =
        "<div class='profile-layout'>" +
        "<img src='" + obj.img + "' class='user-img'/>" +
        // "<i class='fa fa-user user-font' aria-hidden='true'></i>" +
        "<h2 class='user-display-name'>" + obj.name + "</h2>" +
        "<span class='profession'>" + obj.profession + "</span>" +
        "<div class='social-media-account'>" +
        "<a href='https://www.facebook.com'><i class='fab fa-facebook-f'></i></a>" +
        "<a href='https://www.twitter.com'><i class='fab fa-twitter'></i></a>" +
        "<a href='https://www.linkedin.com/'><i class='fab fa-linkedin'></i></a>" +
        "</div>" +
        "</div>";
    Ulist.classList.add("user");
    parentUserList.prepend(Ulist);
    userList.style.display = "block";
    applicationLayout.style.display = "none";
    loginSection.style.display = "none";
    // this function for display user profile
    Ulist.addEventListener("click", function () {
        popup.open(".userProfile");
        var indexNo = userData.indexOf(obj);
        userProfile.innerHTML =
            "<div>"+
            "<i class='fas fa-trash-alt user-edit' onclick='deletUser(" + indexNo + ")'></i>" +
            "<i class='fas fa-edit user-edit' onclick='edit(" + indexNo + ")'></i>" +
            "</div>"+
            // "<i class='fa fa-user profile-font' aria-hidden='true'></i>" +
            "<div class='img-font-wrapper'>" +
            "<img src='" + obj.img + "' class='p-img-editPage'/>" +
            "<div class='img-font-input'>" +
            "<i class=\"fas fa-user-edit user-edit-profileFont\"></i>" +
            "<input type='file'class='font-input' onchange='editProfileImg(\".p-img-editPage\",\".font-input\")'>" +
            "</div>" +
            "</div>" +
            "<div>"+
            "<h2>" + obj.name + "</h2>" +
            "<span class='profession'>" + obj.profession + "</span>" +
            "<span class='email'>" + obj.email + "</span>" +
            "</div>"+
            // "<p id ='contact'>" + obj.contact + "</p>" +
            "<button class='btn' onclick='goBack(true)'>Go Back</button>";
    })
    // form.reset();
    // userProfileImg.src = "img/user3.jpg";
    // //  userProfileImg.style.display = "none"
    // for (i = 0; i < lablefocus.length; i++) {
    //     var lableTag = lablefocus[i];
    //     lableTag.classList.remove("lable-focus");
    // }
}

//  edit peofile
var alredyEditMode = false;
function edit(indexNo) {
    // save editaed data here
    if (alredyEditMode == true) return;

    alredyEditMode = true;
    var editedData = userData[indexNo];


    var saveBtn = document.createElement("button");
    saveBtn.innerHTML = "save"
    saveBtn.classList.add("save-btn", "btn");
    userProfile.append(saveBtn);
    const editProfileFont = document.querySelector(".user-edit-profileFont");
    var ProfileName = userProfile.querySelector("h2");
    var prfileProfession = userProfile.querySelector(".profession");
    var prfileEmail = userProfile.querySelector(".email");
    // var prfileContact = userProfile.querySelector("#contact");
    var profileImage = userProfile.querySelector(".p-img-editPage");
    editProfileFont.style.visibility = "visible";

    ProfileName.innerHTML = "<input type='text' name='name' placeholder='Name' value='" + editedData.name + "' class='edit-name edit-input'/>";
    prfileProfession.innerHTML = "<input type='text' name='' placeholder='Profession' value='" + editedData.profession + "' class='edit-profession edit-input' />";
    prfileEmail.innerHTML = "<input type='text' name='email' placeholder='Email' value='" + editedData.email + "' class='edit-email edit-input'/>";
    // prfileContact.innerHTML = "<input type='number' placeholder ='Contact No' value='" + editedData.contact + "' id='edit-contact' class='edit-input'/>";
    profileImage.src = editedData.img;

    saveBtn.addEventListener("click", function () {
        alredyEditMode = false;
        var saveName = document.querySelector(".edit-name");
        var saveProfession = document.querySelector(".edit-profession");
        var saveEmail = document.querySelector(".edit-email");
        // var saveContact = document.getElementById("edit-contact");
        var saveImage = profileImage;


        var userDisplayName = document.querySelectorAll(".user-display-name");
        var userDisplayProfession = document.querySelectorAll(".profession");
        var uderDisplayImage = document.querySelectorAll(".user img")

        editedData.name = saveName.value;
        editedData.profession = saveProfession.value;
        editedData.email = saveEmail.value;
        // editedData.contact = saveContact.value;
        editedData.img = saveImage.src;

        ProfileName.innerHTML = saveName.value;
        prfileProfession.innerHTML = saveProfession.value;
        prfileEmail.innerHTML = saveEmail.value;
        // prfileContact.innerHTML = saveContact.value;
        profileImage.src = saveImage.src;
        // userDisplayName

        userDisplayName[indexNo].innerHTML = editedData.name;
        userDisplayProfession[indexNo].innerHTML = editedData.profession;
        uderDisplayImage[indexNo].src = editedData.img;
        saveBtn.style.display = 'none';
    })

}

// deletUser
{
    function deletUser(indexNo) {
        var deletAction = confirm(" You Want To Delet This User ? ")
        if (deletAction == true) {
            var userDisplayName = document.querySelectorAll(".user-display-name");
            if (indexNo > -1) {
                userData.splice(indexNo, 1);
                // var nodlistArr = Array.from(userDisplayName);
                // nodlistArr.splice(indexNo, 1);
                userDisplayName[indexNo].parentNode.parentNode.remove();
                popup.close(".userProfile");
            }
        }
    }
}