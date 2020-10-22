
const splash = {
    isTimeoutDone: false,
    isExited: false,

    init: function (timer) {
        this.isTimeoutDone = false;
        this.isExited = false;
        // var x = splashx.prototype.init;
        // console.log(x);
        var that = this;
        setTimeout(function () {
            that.isTimeoutDone = true;
            if (that.isExited == true) {
                that.done();
            }
        }, timer);
    },
    exit: function () {
        if (this.isTimeoutDone == true) {
            this.done();
        } else {
            this.isExited = true;
        };
    },
    done: function () {
        console.log("this is exited");
        var splashScreenV = document.querySelector(".splash-screen")
        splashScreenV.classList.add("hide");
    },
}


function splashx() {
    // this.time = time;
    // this.exitProsses = exit;
    // console.log(time,exitProsses);
}
// splashx.prototype.time = false;
// var objFn = new splashx();

splashx.prototype = {
    init: function () {
        this.isTimeoutDone = false;
        this.isExited = false;
        
    },
    exit: function () { },
    done: function () { }
}
var test = new splashx();


// use of object orianted progrming
// esyly accsecebale any methode or property using this
// global variable are not using in object



// how to creat object : object name : splash
// Object.create(splash);

// new  keyword
// creat object of function using new , function splashFn(){},
// var a = new splashFn();
