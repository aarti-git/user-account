/**
 * creat overlay
 * which elent want to on the to of overlay
 * this fuction append to end of body(document.body.)
 * 
 */

const popup = {
    init: function(){
        var creatPopup = document.createElement("div");
        creatPopup.classList.add("overlay");

        this._overlay = creatPopup

        document.body.append(creatPopup);
    },
    open: function(x){
        var popupElement = document.querySelector(x);
        if(!popupElement){
            return;
        }
        
        popupElement.style.display="block";
        this._overlay.style.display="block";
        var popupElementParent = popupElement.parentElement;
        document.body.append(popupElementParent);
    },
    close: function(y){
        var popupRemove = document.querySelector(y);
        if(!popupRemove){
            return;
        };
        this._overlay.style.display="none";
        popupRemove.style.display="none";
    }
}

// popup.open('.slector')
// popup.close('.slector')