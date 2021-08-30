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
          // bodyTag = document.getElementsByTagName("homepage");
          bodyTag = document.querySelector("body");
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


// wraps element
function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}                


//// psuedo - <Select> input box
const selectWrapper = document.querySelectorAll(".mchtl-select")
selectWrapper.forEach(element => { // for every selectWrapper
    console.log("Selects identified as custom:", element);

    // get select element
    let select = element.getElementsByTagName("select")[0];
    // get label element
    let label = element.getElementsByTagName("label")[0];
    // take label and put a span in it this will be a placeholder for values
    label.innerHTML += "<span class='select-value'> " + select.value + "</span>";
    let labelValue = label.querySelectorAll(".select-value")[0];

    selectCloned = select.cloneNode(true) // .cloneNode(true) allows the selct wrapper to clone 
    element.appendChild(selectCloned);

    var selectClonedWrapper = document.createElement("div");
    wrap(selectCloned, selectClonedWrapper); // wrap selectCloned elements with a div. 
    selectClonedWrapper.className = "psudo-select";
    
    // renaming element tags
    console.log("selectClonedWrapper:", selectClonedWrapper);
    let clonedSelect = selectClonedWrapper.querySelectorAll("select")[0];
    let divSelect = document.createElement("div") // the div element
    let index;
    // Copy the children
    while (clonedSelect.firstChild) {
        divSelect.appendChild(clonedSelect.firstChild); // *Moves* the child
    }
    // Copy the attributes
    for (index = clonedSelect.attributes.length - 1; index >= 0; --index) {
        divSelect.attributes.setNamedItem(clonedSelect.attributes[index].cloneNode());
    }
    // Replace it
    clonedSelect.parentNode.replaceChild(divSelect, clonedSelect);

    // replacing options
    var divSelectOptions = divSelect.querySelectorAll("option");
/*     divSelectOptions.forEach(options => {
        options.className = "psuedo-select-opt";
        options.outerHTML = options.outerHTML.replace(/value/g,"data-value").replace(/option/g,"div");
    }); */
    divSelectOptions.forEach(options => {
        options.className = "psuedo-select-opt";
        options.outerHTML = options.outerHTML.replace(/value/g,"data-value").replace(/option/g,"div");
    });
    
    // swapping values
    // detect what is clicked
    let dataValue;
    var psudoOptions = element.querySelectorAll(".psuedo-select-opt");
    // adding even listeners
    for (let i = 0; i < psudoOptions.length; i++) {
        psudoOptions[i].addEventListener("click", (e) => {
            dataValue = e.target.getAttribute("data-value");
            console.log("index:", i, "          value:", dataValue);

            changeValueLabel(dataValue);
            changeValueSelect(i);
            
            begoneHover();
            changeHoveredState();
        });
    }

    function changeValueSelect(num) {
        select.selectedIndex = num;
    }
    function changeValueLabel(value) {
        labelValue.innerHTML = " " + value; 
    }
    function begoneHover(){
        selectClonedWrapper.style.pointerEvents = "none";
        setTimeout(function() {
            selectClonedWrapper.style.pointerEvents = "auto";

            // TODO: unfocus selector
            // https://www.w3schools.com/jsref/met_html_blur.asp
            select.blur();
            divSelect.blur();
            psudoOptions.forEach(pOption => {
                pOption.blur();
            });
        }, 150);
    }
    function changeHoveredState() {
        let j = select.selectedIndex; // the index of select
        console.log("~~~ index: " + j);
        
        psudoOptions.forEach(element => {
            element.classList.remove("hovered");
        });
        psudoOptions[j].classList.add("hovered");

        if (select.id == "compare-what") {
            const comparePanel = document.querySelector(".compare-panel");

            if (select.selectedIndex == 0) {
                comparePanel.querySelector("h3").innerText = "Comparing with similar countries";
                comparePanel.querySelector("p").innerText = "Insert a country in, and the system will automatically pick countries to compare based on similarities";
                comparePanel.querySelector("#countries-input").placeholder = "Enter any country here";
                //comparePanel.querySelector("#countries-input").list = "countries";
                comparePanel.querySelector("#countries-input").setAttribute("list", "countries")
            } else {
                comparePanel.querySelector("h3").innerText = "Comparing with similar regions";
                comparePanel.querySelector("p").innerText = "Insert a region in, and the system will automatically pick regions of that country to compare based on similarities";
                comparePanel.querySelector("#countries-input").placeholder = "Enter any region here";
                comparePanel.querySelector("#countries-input").setAttribute("list", "regions");
            }

        } else {
            if (select.value != "Custom") {
                setTimeout(function() {
                    submitForm();
                }, 350);
            } else { //if custom is selected
                const otherIn = document.querySelector(".other-inputs");

                otherIn.classList.add("show")
            }
        }
    }

    select.addEventListener('change',(e) => {
        console.log("selector changed");
        changeValueLabel(select.value); 
        changeHoveredState();
        
    });
    
    select.addEventListener('click',(e) => {
        console.log("selector pressed with the id '" + e.target.id + "'");
        label.classList = "active";
    });

    // let focussed = false;
    select.addEventListener('focus', (event) => {
        if (label.classList == "active") {
            begoneHover();
        } else {
            label.classList = "active";
        }
        // focussed = true;
        divSelect.style.display = "block";
    });

    select.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "Enter" :
                e.preventDefault();
                console.log("pressed enter in select");
                begoneHover();
            break;

            default:
                console.log("pressed any other key other than enter in select");
                // changed = false;
        }
    });
      
    select.addEventListener('blur', (event) => {
        label.classList = "";
        if(window.matchMedia("(pointer: coarse)").matches) { // touchscreen
            setTimeout(function() {
                divSelect.style.display = "none";
            }, 360);
        }
        
    });

    if (select.value == "Custom") { 
        const otherIn = document.querySelector(".other-inputs");
        otherIn.classList.add("show")
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event

});


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



//// Nortification (notification oops mis-spelling):
function nortification(details = "This is a nortification", type = "normal",  timeout = 3000) {
    var elementNortifDetails = document.getElementById("nortification_details");
    var elementNortifWrap = document.getElementsByClassName("nortification-pullup")[0];
    elementNortifWrap.className += " nort-push-active";
            
    elementNortifDetails.innerHTML = details;

    console.group("💬 " + details);

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
            console.log("Type:", type);
            console.groupEnd();

            setTimeout(function(){
                elementNortifDetails.classList.remove("nortification_success");
            }, timeout_colour);
        break;

        case "warning":
            elementNortifDetails.className += " nortification_warning";
            console.log("Type:", type);
            console.groupEnd();

            setTimeout(function(){
                elementNortifDetails.classList.remove("nortification_warning");
            }, timeout_colour);
        break;

        case "error":
            elementNortifDetails.className += " nortification_error";
            console.log("Type:", type);
            console.groupEnd();

            setTimeout(function(){
                elementNortifDetails.classList.remove("nortification_error");
            }, timeout_colour);
        break;

        default:
            elementNortifDetails.className += " nortification_normal";
            console.log("Type:", type);
            console.groupEnd();

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

//// Lab room stuff:
// SourceConsole (wip): //
let scContents = `
    <div class="m-modal window" id="SourceConsole">
        <div id="SourceConsoleModal">
            <div class="titlebar">
                Console 
                
                <a href="#%" class="button float-right" title="close" onclick="sourceConsole()"><i class="fas fa-times"> </i></a> 
            </div>
            <!-- <textarea id="the-console" readonly> -->
            <textarea id="the-console" name="theConsole" readonly>THIS IS A WORK IN PROGRESS, YOU ARE NOT MEANT TO SEE THIS LOL. CLICK OUT OF THIS AND RETURN WHEN IT'S READY!
            </textarea>

            <form id="consoleCommand"  name="consoleCom">
                <input type="text" id="command" name="command">
                <input type="submit" value="Submit" id="consoleSend">
            </form>
        </div>
    </div>
`;
document.getElementsByTagName("footer")[0].insertAdjacentHTML('afterend', scContents);

/* document.onkeypress = function (e) {
    e = e || window.event;

    if (e.key == "`") {
        console.log("pressed on " + e.key + ", it enabled the SourceConsole");
        sourceConsole();
    }
    
};
 */

function sourceConsole() {
    let div = document.getElementById("SourceConsole");
    div.classList.toggle('active');

   // if (div.style.display !== 'none') {
   //     div.style.display = 'none';
   // }
   // else {
   //     div.style.display = 'block';
   // }
}

var form = document.getElementById("consoleCommand");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

document.getElementById('consoleSend').onclick = function() {
    document.theConsole.value += '\n' + document.forms.consoleCom.command.value;
 };

// For each item with a `window` class…
var windows = document.querySelectorAll(".window");
[].forEach.call(windows,function(win){

  // …find the title bar inside it and do something onmousedown
  var title = win.querySelector('.titlebar');
  title.addEventListener('mousedown',function(evt){

    // Record where the window started
    var real = window.getComputedStyle(win),
        winX = parseFloat(real.left),
        winY = parseFloat(real.top);

    // Record where the mouse started
    var mX = evt.clientX,
        mY = evt.clientY;

    // When moving anywhere on the page, drag the window
    // …until the mouse button comes up
    document.body.addEventListener('mousemove',drag,false);
    document.body.addEventListener('mouseup',function(){
      document.body.removeEventListener('mousemove',drag,false);
    },false);

    // Every time the mouse moves, we do the following 
    function drag(evt){
      // Add difference between where the mouse is now
      // versus where it was last to the original positions
      win.style.left = winX + evt.clientX-mX + 'px';
      win.style.top  = winY + evt.clientY-mY + 'px';
    };
  },false);
});

// Checks for webp usable:
//
var headerImage = document.querySelector(".image-header");

// if no support:
try {
    Modernizr.on('webplossless,webp-lossless', function(result) {
        if (result) {
          // supported
        } else {
          // not-supported
          console.log("webp lossless is supported");
          headerImage.querySelector("img").src = headerImageSrc.replace("webp", "png");
        }
     });

} catch {
    console.log("Modernizr not active on this page");
}

// Header image load
//
var checkImg = document.querySelector(".image-header-temp");

function loaded() {
    let headerImageSrc = headerImage.querySelector("img").src;

    headerImage.style.cssText = `background-image: url( ${headerImageSrc} );`
    headerImage.classList.add("load-header");

    document.querySelector(".transition").classList.add("load-header");
    document.querySelector(".video").classList.add("load-header");
    checkImg.remove(); // hide image

}

try {
    if (checkImg.complete) {
        loaded()
    } else {
        checkImg.addEventListener("load", loaded);
    }

} catch {
    console.log("lol no header images on this page")
}



//// Portfolio page:
const port_page = document.querySelector("#work");
const port_section = port_page.querySelectorAll(".design-field");
const sidebar_links = document.querySelectorAll(".nav-sidebar li");

function resetSidebarIndicator() {
    sidebar_links.forEach(el => {
        el.classList = "";
    })
}

// indicator background that moves:
const marker = document.querySelector("#indicator-marker") 
function indicatorBG(e) {
    marker.style.top = e.offsetTop + 'px';
    marker.style.width = e.offsetWidth + 'px'; 
}
    
// Scroll event listener:
var runOnScroll = function(evt) {
    let scrollPos = window.scrollY;

    // Detect which section is being scrolled into when window scroll detected
    port_section.forEach(el => {
        let section_top_bound = el.getBoundingClientRect().top
        let section_bottom_bound = el.getBoundingClientRect().bottom

        console.group(el.id + ":", section_top_bound)
        console.log(el)

        if (scrollPos <= document.querySelector(".image-header").getBoundingClientRect().bottom - 80) {
            resetSidebarIndicator()
            marker.style.width = "0px";
        }

        else if ((section_top_bound <= 200) && (section_bottom_bound >= 0)) {
            console.log("entered top bound")
            console.log("bottom bound:", section_bottom_bound)

            // add a fill to the hyperlink element via the el.id
            let navLink = document.querySelector(`[href="#${el.id}"]`);
            let navLinkWrap = navLink.parentNode;

            console.log(navLink)

            // remove all current active clast lists form nav
            resetSidebarIndicator()

            // make li "active"
            navLinkWrap.classList = "active";

            // update position of the indicator background:
            indicatorBG(navLinkWrap);
        }

        console.groupEnd();

    });


};

window.addEventListener("scroll", runOnScroll);


/* if (port_page.length == 1) {
} */
