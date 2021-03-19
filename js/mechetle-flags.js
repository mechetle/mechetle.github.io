//// Mechetle page builder:
////

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