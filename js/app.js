// const loginSection = document.querySelector(".login-form");
// const frontLogo = document.querySelector(".logo-add");
const userProfileImg = document.querySelector(".profile-img");
// const overlay = document.querySelector(".overlay");
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
var time;
document.addEventListener("DOMContentLoaded", function () {
  splash.init(1000);
  appModule.init();
});


var profileiImgChanging = document.querySelector(".profile-img-changing");
profileiImgChanging.addEventListener("change", function () {
  editProfileImg(".profile-img", ".profile-img-input");
});

userprofession.addEventListener("change", function () {
  var professionInput = this.parentNode.firstElementChild;
  professionInput.value = this.value;
  // professionInput.nextElementSibling.classList.add("lable-focus");
})

userprofession.addEventListener("focus", function () {
  var professionInput = this.parentNode.firstElementChild;
  professionInput.nextElementSibling.classList.add("lable-focus");
});

userprofession.addEventListener("blur", function () {
  if (this.value == "") {
    var professionInput = this.parentNode.firstElementChild;
    professionInput.nextElementSibling.classList.remove("lable-focus");
  }
});

function editProfileImg(x, y) {
  const profileImg = document.querySelector(x);
  const file = document.querySelector(y).files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      profileImg.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
var inputState = document.querySelectorAll(".inputstate");
for (var i = 0; i < inputState.length; i++) {
  var inputItem = inputState[i];
  inputItem.addEventListener("focus", function () {
    var inputLable = this.nextElementSibling;
    inputLable.classList.add("lable-focus");
    this.style.borderBottomss = "1px solid #03e9f4";
  });
  inputItem.addEventListener("blur", function () {
    var inputLable = this.nextElementSibling;
    if (this.value == "") {
      inputLable.classList.remove("lable-focus");
    }
  });
}

var appLoginForm = document.querySelector(".apploginform");
appLoginForm.addEventListener("submit", function (event) {
  submitData(event, this);
});

function submitData(e, el) {
  // var formLable = document.querySelectorAll(".form-label");
  e.preventDefault();
  var statusvalidation = CreatUserList();
  if (!statusvalidation) {
    return;
  } else {
    var button = document.querySelector("#submit");
    button.innerHTML = "submiting...";
    const url = "http://localhost:2000/creat-user";
    var payLoad = payLoadObject();
    $.post(url, payLoad, function (data, status) {
      // console.log("data : " + data);
      if (data.responce == true) {
        toastMessage.success("data save successfully!!!");
        button.innerHTML = "submit";
        var payLoadDataobj = JSON.parse(payLoad);
        creatList(payLoadDataobj);
        popup.close(".login-form");
        document.body.style.background = "none";
        form.reset();
        userProfileImg.src = "img/user3.jpg";
        for (i = 0; i < lablefocus.length; i++) {
          var lableTag = lablefocus[i];
          lableTag.classList.remove("lable-focus");
        }
      } else if (data.responce == false) {
        toastMessage.failed("something is wrong");
        button.innerHTML = "submit";
      }
    }).catch(function (e) {
      console.log("something is wrong!", e);
      toastMessage.failed("something is wrong");
      button.innerHTML = "submit";
    });
  }
}

function payLoadObject() {
  var formFieldValues = document.querySelectorAll(".form-field");
  // var x = "";
  var obj = {};
  for (i = 0; i < formFieldValues.length; i++) {
    var item = formFieldValues[i];
    var itemname = item.name;
    var itemvalue = item.value;
    if (itemname == "image") {
      itemvalue = userProfileImg.getAttribute("src");
    }
    obj[itemname] = itemvalue;
    // arr.push(itemname+":"+itemvalue);
    // obj[i]={infoname:value};
  }
  return JSON.stringify(obj);
}

// base64 start
// function base64apload(base64){
//   console.log(base64);
// }    
// base64 end

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
  } else if (x < 3) {
    alert("enter valid email address");
    return false;
  } else if (userprofession.value === "Select Your Profession") {
    alert("profession can't be empty");
    return false;
  } else if (passwordLength.length < 4) {
    alert("password must be 4 digit long");
    return false;
  } else {
    return true;
  }
}

function creatList(payLoadDataobj) {
  // const userProfileImg = document.querySelector(".profile-img");

  var Ulist = document.createElement("div");
  Ulist.innerHTML =
    "<div class='profile-layout'>" +
    "<img src='" +
    payLoadDataobj.image +
    "' class='user-img'/>" +
    // "<i class='fa fa-user user-font' aria-hidden='true'></i>" +
    "<h2 class='user-display-name'>" +
    payLoadDataobj.fname +
    "</h2>" +
    "<span class='profession'>" +
    payLoadDataobj.job +
    "</span>" +
    "<div class='social-media-account'>" +
    "<a href='" + payLoadDataobj.facebook + "' target='_blank'><i class='fab fa-facebook-f'></i></a>" +
    "<a href='" + payLoadDataobj.twitter + "' target='_blank'><i class='fab fa-twitter'></i></a>" +
    "<a href='" + payLoadDataobj.linkedin + "' target='_blank'><i class='fab fa-linkedin'></i></a>" +
    "</div>" +
    "</div>";
  Ulist.classList.add("user");
  parentUserList.prepend(Ulist);
  userList.classList.remove("hide");
  applicationLayout.classList.add("hide");
  // this function for display user profile
  Ulist.addEventListener("click", function () {
    popup.open(".userProfile");
    var DesplayElcss = document.querySelector(".DesplayElcss");
    DesplayElcss.classList.add("flex-content-justify")
    var currentUser = this;
    userProfile.innerHTML =
      "<div>" +
      "<i class='fas fa-trash-alt user-edit deletfunctionlity'></i>" +
      "<i class='fas fa-edit user-edit editfunctionlity')'></i>" +
      "</div>" +
      // "<i class='fa fa-user profile-font' aria-hidden='true'></i>" +
      "<div class='img-font-wrapper'>" +
      "<img src='" +
      payLoadDataobj.image +
      "' class='p-img-editPage'/>" +
      "<div class='img-font-input'>" +
      '<i class="fas fa-user-edit user-edit-profileFont"></i>' +
      "<input type='file' name='image' class='font-input editIn profilechanging'>" +
      "</div>" +
      "</div>" +
      "<div class='edit-input-area-parent'><div class='edit-input-area'>" +
      "<h2>" +
      payLoadDataobj.fname +
      "</h2>" +
      "<span class='profession'>" +
      payLoadDataobj.job +
      "</span>" +
      "<span class='email'>" +
      payLoadDataobj.email +
      "</span>" +
      "<div class='edit-link'>" +
      "<i class='fab fa-facebook-f facebook-font'></i></a>" +
      "<i class='fab fa-twitter'></i></a>" +
      "<i class='fab fa-linkedin'></i></a>" +
      "</div>" +
      "</div></div>" +
      // "<p id ='contact'>" + obj.contact + "</p>" +
      "<div class='btn-wrap'><div class='btn-parent'><button class='btn go-back-btn'>Go Back</button></div></div>";

    var goBackBtn = userProfile.querySelector(".go-back-btn");
    goBackBtn.addEventListener("click", function () {
      popup.close(".userProfile");
      alredyEditMode = false;
    });
    var profileChanging = userProfile.querySelector(".profilechanging");
    profileChanging.addEventListener("change", function () {
      editProfileImg(".p-img-editPage", ".font-input");
      // onchange='editProfileImg(\".p-img-editPage\",\".font-input\")'
    });
    var editFunctionlity = userProfile.querySelector(".editfunctionlity");
    editFunctionlity.addEventListener("click", function () {
      edit(payLoadDataobj, currentUser);
    });
    var deletFunctionlity = userProfile.querySelector(".deletfunctionlity");
    deletFunctionlity.addEventListener("click", function () {
      deletUser(payLoadDataobj, currentUser);
    });
  });
}

//  edit peofile
var alredyEditMode = false;
function edit(payLoadDataobj, currentUser) {
  // save editaed data here
  // console.log(payLoadDataobj);
  if (alredyEditMode == true) return;
  alredyEditMode = true;
  var DesplayElcss = document.querySelector(".DesplayElcss");
  DesplayElcss.classList.remove("flex-content-justify")
  var saveBtn = document.createElement("button");
  saveBtn.innerHTML = "save";
  saveBtn.classList.add("btn");
  var btnParent = userProfile.querySelector(".btn-parent");
  btnParent.append(saveBtn);
  const editProfileFont = document.querySelector(".user-edit-profileFont");
  var ProfileName = userProfile.querySelector("h2");
  var prfileProfession = userProfile.querySelector(".profession");
  var prfileEmail = userProfile.querySelector(".email");
  var profileImage = userProfile.querySelector(".p-img-editPage");
  var editLink = userProfile.querySelector(".edit-link");
  var editInputAreaParent = userProfile.querySelector(".edit-input-area-parent");
  var editInputArea = userProfile.querySelector(".edit-input-area")
  editProfileFont.style.visibility = "visible";

  editInputArea.classList.add("hide")
  var crateditForm = document.createElement("div");
  crateditForm.classList.add("crat-edit-Form")
  crateditForm.innerHTML =
    `<div class="inf-fill-section">
      <div class="section-tittle tittle-design">
        <h3>personal info</h3>
      </div>
      <input type='text' name='fname' placeholder='Name' value='${payLoadDataobj.fname}' class='editIn edit-input'/>
      <select name="job" required="" class="editIn edit-input edit-select-box">
        <option>${payLoadDataobj.job}</option>
        <option>Student</option>
        <option>Web Devloper</option>
        <option>Software Engineer</option>
        <option>Teacher</option>
        <option>Army</option>
        <option>Acter</option>
        <option>writer</option>
      </select>
      <input type='text' name='email' placeholder='Email' value='${payLoadDataobj.email}' class='editIn edit-input'/>
    </div>
    <div class="inf-fill-section">
      <div class="section-tittle tittle-design">
          <h3>social info</h3>
      </div>
      <input type='text' name='facebook' placeholder='facebook link ' value='${payLoadDataobj.facebook}' class='editIn edit-input'/>
      <input type='text' name='twitter' placeholder='twitter link ' value='${payLoadDataobj.twitter}' class='editIn edit-input'/>
      <input type='text' name='twitter' placeholder='twitter link ' value='${payLoadDataobj.twitter}' class='editIn edit-input'/>
    </div>`

  editInputAreaParent.append(crateditForm);
  profileImage.src = payLoadDataobj.image;

  editLink.classList.add("hide");

  saveBtn.addEventListener("click", function () {
    alredyEditMode = false;
    var formValues = document.querySelectorAll(".editIn");
    // var editobj = {}
    for (i = 0; i < formValues.length; i++) {
      var item = formValues[i];
      var itemname = item.name;
      var itemvalue = item.value;
      if (itemname == "image") {
        itemvalue = profileImage.getAttribute("src");
      }
      payLoadDataobj[itemname] = itemvalue;
    }

    const url = "http://localhost:2000/update";
    var payLoad = JSON.stringify(payLoadDataobj);
    $.post(url, payLoad, function (data, status) {
      if (data.responce == true) {
        toastMessage.Update("data update successfuly!!!");

        ProfileName.innerHTML = payLoadDataobj.fname;
        prfileProfession.innerHTML = payLoadDataobj.job;
        prfileEmail.innerHTML = payLoadDataobj.email;
        profileImage.src = payLoadDataobj.image;

        editLink.classList.remove("hide");
        editInputArea.classList.remove("hide")
        var cratEditForm = userProfile.querySelector(".crat-edit-Form")
        cratEditForm.classList.add("hide");

        var userDisplayName = currentUser.querySelector(".user-display-name");
        var userDisplayProfession = currentUser.querySelector(".profession");
        var uderDisplayImage = currentUser.querySelector(".user img");

        userDisplayName.innerHTML = payLoadDataobj.fname;
        userDisplayProfession.innerHTML = payLoadDataobj.job;
        uderDisplayImage.src = payLoadDataobj.image;
        saveBtn.classList.add("hide");
        DesplayElcss.classList.add("flex-content-justify")
      }
    });
  });
}

// deletUser
function deletUser(payLoadDataobj, currentUser) {
  var deletAction = confirm(" You Want To Delet This User ? ");
  if (deletAction == true) {
    const url = "http://localhost:2000/delete";
    var payLoad = JSON.stringify(payLoadDataobj);
    $.post(url, payLoad, function (data, status) {
      currentUser.remove();
      toastMessage.Delete("data delete successfully!!");
      popup.close(".userProfile");
    });
  }
}

