//// Mechetle page builder:
////

// grid collumn slider:
const colSlider = document.querySelectorAll(".slider-overlay")
colSlider.forEach(element => {
    let cells;
    let initColVal;
    let valueChange;

    element.addEventListener("mousedown", (e) => {
        console.group("Column change imbound:");

        // Get cells:
        cells = e.target.parentElement.getElementsByClassName("cell");

        // Get first cell:
        // firstCell = cell[0];

        // get the column value for first collumn
        initColVal = element.value;
    });

    element.addEventListener("input", (e) => {
        valueChange = e.target.value;
        console.log("Value:", valueChange);
        console.log("From:", e.target.parentElement);

        console.log(cells[0].className);

        const regex = new RegExp('(medium-)[0-9]{1,}', 'g');
        
        cells[0].className = cells[0].className.replace(regex, "medium-" + valueChange);
        
        cells[1].className = cells[1].className.replace(regex, "medium-" + (12 - valueChange));


    });

    element.addEventListener("mouseup", (e) => {
        console.groupEnd();
    });

});


// finding work area:
const workspace = document.querySelector(".mchtl-page-builder > div");
// Making workspace area editable:
workspace.setAttribute("contenteditable", "true");
// declaring commandBox
var commandBox;

// if detect "/" pressed:
var lastChar;
workspace.addEventListener("keydown", event => { //was previously "keypress"
    if (event.key == "`" ) {
        console.log("backquote detected");
        lastChar = "`";
    }

    if ((event.key == " ") || (event.key == "Backspace")) {
        // cancel this if last char is /:
        //console.log("test");

        if (lastChar == "`") {
            console.log("stop scan of commmand");
            lastChar = "";
        }
    } else if (event.keyCode >= 65 && event.keyCode <= 90) { // used to be else {}
        //replace all backquotes with inputs if last char is "`":
        if (lastChar == "`") {
            workspace.innerHTML = workspace.innerHTML.replace("`", "<input type='text' class='commands' name='command'>"); 
            commandBox = document.getElementsByClassName("commands")[0];    // assigns commandbox once created.
            commandBox.focus();
            lastChar = "";
            
            commandBox.addEventListener("keydown", function(event) {
                const key = event.key;
                console.log("activity in command box");
            
                if (key === "Backspace" || key === "Delete") { 
                    console.log("deleting in command box");
            
                    if (this.value == "") {
            
                        console.log("empty command box");
                        commandBox.remove();
                    }
                }
            });

        }
 
    }

/*     // Check if text box is empty
    if (document.getElementsByClassName("commands")[0].innerHTML == "") {
        // get 
        // this.remove();
        console.log("command box clear")
    } */

    // Number 13 is the "Enter" key on the keyboard
    if (event.key == "Enter") {
        console.log("enter detected");
    }
  });