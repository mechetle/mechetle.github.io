///////////////////
// Mechetle Core //
///////////////////

var path = window.location.pathname;
var page = path.split("/").pop();
var jkjkjk="thub.i";shrek="gi";com=`.gi${jkjkjk}o`;sully=`${shrek}thub`;  // magic dust



//// Fetches info about page:
var xhttp = new XMLHttpRequest();
// function isObjectEmpty(obj) {
//     return obj.length;
// }

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        // console.log("how long is array" + this.length);
        let repos = JSON.parse(this.responseText);
        if (typeof repos !== 'undefined' && repos.length > 0) { // checks for existance
            // the array is defined and has at least one element
            var updateDate = repos[0].commit.committer.date;
            let updateBy = repos[0].commit.committer.name;
            let updateChange = repos[0].commit.message;
            console.log(`🔹 Changed: ${updateChange}, \n🔹 Updated on: ${new Date(updateDate)} by ${updateBy},`);
        } else {
            console.warn(`🔹 "${page}" can't be found in change logs, this may be because you are still editing on your computer bruv.`);
        }

        //repos.forEach((repo)=>{
        //console.log(`Previous updates: ${repo.commitcommitter.name}: ${new Date(repo.commitcommitter.date)}`);
        //});
    }
};
// Get info:
xhttp.open("GET", `https://api.${sully}.com/repos/mechetle/mechetle${com}/commits?per_page=1&sha=beta&path=${page}`, true);
xhttp.send();   
        
console.log(
    "%cMECHETLE" + "\n",
    "background:#000;color:#fff;font-family:arial black;font-size:5vw;font-weight:800;padding: 0 2vw"
);
console.log(
    "%c🔥 Herro, not sure what you are doing here but I hope you enjoy your stay!" + "\n" + "Version:  ALPHA" + "\n",
    "color:#000;font-family:Courier New;font-size:1rem;",
);



//// Beta mode switch:
var beta = localStorage.getItem("beta");
var firstTimer = localStorage.getItem("firstTimer");

if (typeof (Storage) !== "undefined") {
    // Things to hide during beta
    const hideByFacade = document.querySelectorAll("header, .navigation-button-wrap, .other-pages, section:not(#beta-section), main");

    const join = document.getElementById("joinBeta"),
          leave = document.getElementById("leaveBeta"),
          alert = document.getElementById("beta-notify");
          bodyTag = document.getElementById("homepage");
          betaSection = document.getElementById("beta-section");

    function joinBeta() {
        // console.info("Join beta button pressed")
        localStorage.setItem("beta", "on");
        setTimeout(function () {
            window.location.reload(false);
            window.scrollTo(0, 0);
            //window.onbeforeunload = function () {
            //    window.scrollTo(0, 0);
            //}
        }, 100);
    }
    function leaveBeta() {
        // console.info("Leave beta button pressed")
        localStorage.removeItem("beta");
        localStorage.removeItem("firstTimer");
        setTimeout(function () {
            window.location.reload(false);
        }, 100);
    }
    function waitForRelease() {
        localStorage.setItem("beta", "wait");
    }

    switch (beta) {
        case "on":
            //beta notifier stuff
            leave.style.display = "inline-block";
            join.style.display = "none";
            betaSection.remove();
            console.log("🔹 Beta status: Enabled");

            if (firstTimer == "noLonger") {
                nortification("This is a test notification");
            } else {
                nortification("Welcome to the development-zone. <br><small>A lot of things will not work as they haven't fully been implemented yet.</small>", "warning", "6000");
                localStorage.setItem("firstTimer", "noLonger");
            }

            alert.classList.add("beta-on");
            break;

        case "wait":
            alert.querySelector("h2").innerHTML = "Hello again! Still developing on this."; 
            break;

        default: //during facade (if not "signed up") - not in beta
            bodyTag.style.background = "#fff";
            for (var i = 0; i < hideByFacade.length; i++) {
                //hideByFacade[i].style.display = "none";
                hideByFacade[i].remove();
            }

            //beta notifier stuff
            leave.style.display = "none";
            join.style.display = "inline-block";
            console.log("🔹 Beta status: Disabled");
                    
            // this might be useless, might remove:
            // alert.classList.remove("beta-on");
    }

} else {
    // document.getElementById("error").innerHTML = "Oopsies, your browser is too old that this function would not work";
    // to-do: add mchtl-Nortifications.js into here.
}



//// Disable navigation buttons
window.onload = function() {
    const DisableBtn = document.querySelectorAll(".disable-me");
    setTimeout(function () {
        for (var i = 0; i < DisableBtn.length; i++) {
            //hideByFacade[i].style.display = "none";
            DisableBtn[i].className += " disabled";
            DisableBtn[i].onclick = function() { nortification("Page disabled <br><small>I haven't added this page yet.</small>", "warning" ); };
            // test
        }
    }, 500);
};



//// Nortifications:
function nortification(details = "This is a nortification", type = "normal",  timeout = 3000) {
    var elementNortifDetails = document.getElementById("nortification_details");
    var elementNortifWrap = document.getElementsByClassName("nortification-pullup")[0];
    elementNortifWrap.className += " nort-push-active";
            
    elementNortifDetails.innerHTML = details;

    console.log("💬 " + details);

    setTimeout(function(){
        // todo: if nort-push-active is still there => do not remove
        elementNortifWrap.classList.remove("nort-push-active");
                
//      setTimeout(function(){ // this caused problems
//          elementNortifDetails.innerHTML = "";
//      }, 1000);
    }, timeout);

    var timeout_colour = timeout + 15;

    switch (type) {
        case "success":
            elementNortifDetails.className += " nortification_success";
            console.log(type);

            setTimeout(function(){
                elementNortifDetails.classList.remove("nortification_success");
            }, timeout_colour);
        break;

        case "warning":
            elementNortifDetails.className += " nortification_warning";
            console.log(type);
            setTimeout(function(){
                elementNortifDetails.classList.remove("nortification_warning");
            }, timeout_colour);
        break;

        case "error":
            elementNortifDetails.className += " nortification_error";
            console.log(type);
            setTimeout(function(){
                elementNortifDetails.classList.remove("nortification_error");
            }, timeout_colour);
        break;

        default:
            elementNortifDetails.className += " nortification_normal";
            console.log(type);
            setTimeout(function(){
                elementNortifDetails.classList.remove("nortification_normal");
            }, timeout_colour);
    }

}  




//// Execute functions from URL:
function validateURL(str) {
    let pattern = new RegExp(str); // fragment locator 
    return !!pattern.test(window.location.href);
}        
document.addEventListener("DOMContentLoaded", function(event) { 
    switch (true) {
        case validateURL("discordtag"):
            console.log("Attempting to execute functions from URL: Discord");
            ToggleDiscordModal();
            
            break;
        case validateURL("beta"):
            if (beta === null) joinBeta();
            break;
    }
});



//// Spoilers: <-- note to self: this breaks when it's not in beta mode - temp fixed

function tglSpoiler(id) {
    let spoiler = document.getElementById(id);

    //check for existance
    function checkIfSpoilerExist() {
        if (spoiler == null) {
            // do nothing
        } else {
            return true;
        }
    }

    if (checkIfSpoilerExist()) {
        let numberOfChildren = spoiler.children.length;
        console.log(numberOfChildren);
    
        let el = document.querySelectorAll(".spoiler p");
    
        if (spoiler.style.display === "none") {
            spoiler.style.display = "block";
                    
            // make this on page load:
            let i, 
                transitionDelay;
    
            for (i = 0; i < numberOfChildren - 1; i++) {
                transitionDelay = i * 0.2 + 0.4;
                setTimeout(function(){ el[i].style.opacity = "1" }, transitionDelay);
                        
                //el[i].style.transitionDelay = i * 0.2 + 0.4 + "s";
                //text += cars[i] + "<br>";
            }                
                    
            //spoiler.style.height = "24rem";
        } else {
            el.forEach(child => {
            child.style.opacity = 1;
            });                
            spoiler.style.display = "none";
            //spoiler.style.height = "0";
        }
    }
    
}

if (beta == "on") {
    tglSpoiler('aboutSpoiler');
}



//// Discord modal:
function ToggleDiscordModal() {
    $(".discordmodal").fadeToggle("3500", "swing", function () {}); //todo: el.classList.toggle(className);
}

// changed to onclick in html, removed redundancy
//$(".discordmodaltoggle, .modal-bg").click(function () { //todo: convert to click event: 
//    ;
//});


//// Get copyright date
let copyrightYearWrap = document.getElementsByClassName("year");
let copyrightYear = new Date().getFullYear();
copyrightYearWrap[0].innerHTML = copyrightYear;
copyrightYearWrap[1].innerHTML = copyrightYear;

