//// Mechetle page builder:
////


// Abacus thingo:
//
// initialization variables:
const regexQuery = new RegExp('(medium-)[0-9]{1,}', 'g');
const regexSlice = new RegExp('cell (medium-)', 'g');
const cellContainer = document.querySelectorAll(".grid-slider .grid-x");
// initialization function:
console.groupCollapsed("🧮 Mechetle Abacus - initialied:");
cellContainer.forEach (element => {
    console.group(element);
    let cells = element.querySelectorAll(".cell");
    let mediumCellSizes = [];
    let cl = cells.length;
    console.log("cl:", cl);

    // allocate values into mediumCellSizes
    for (let i = 0; i < cl; i++) {
        // console.log(cells[i].className.replace(regexSlice, ""));
        mediumCellSizes[i] = parseInt(cells[i].className.replace(regexSlice, ""));
    }

    console.log("Size of cells in medium", mediumCellSizes);

    //
/*  let mediumCellSizesSumup = mediumCellSizes[0];
    let countRowsMedium = 0;
    let colForRow = [];

   for (let j = 0; j < cl; j++) {
        if (mediumCellSizesSumup == 12) {
            mediumCellSizesSumup = mediumCellSizes[j];

            // add row to count
            countRowsMedium++;

            console.log(j);
            
            // then put collumn amount for that row into an array
            colForRow[countRowsMedium - 1] = countColForRow;
            // reset number of columns for next scan
            countColForRow = 1; 

        } else {
            mediumCellSizesSumup += mediumCellSizes[j];
            countColForRow++;
        }
    } */

    // TODO: previous-above-last system with better one
    //       where is groups row of collumns in to an  
    //       array inside of an array: 
    /*
     * - countRowsMedium = array.length ✔️
     * - colForRow (an array) = array[i].length ✔️
     * - remove old one
     */


    // Grid to array (gta)
    let gtaInput = mediumCellSizes;
    let gtaArray = [];
    let gtaIndex = 0;
    while (gtaIndex < gtaInput.length) {
        subArray = [];
    
        let g = 0;
    
        while (g != 12) {
            subArray.push(gtaInput[gtaIndex]);
            g += gtaInput[gtaIndex];
            gtaIndex++;
        }
        // put new sub array into array
        gtaArray.push(subArray);
    }
    console.log("Grid -> array", gtaArray);   

    let countRowsMedium = gtaArray.length; 
    // let colForRow = gtaArray[0].length; 
    let colForRow = gtaArray.map( element => {
        return element.length;
    }); 

    console.group("Number of rows - medium:", countRowsMedium);
    console.log("Number of collumns for rows:", colForRow);
    console.groupEnd();

    // creating elements:
    // creating wrapper
    let wrapper = document.createElement("div");
    wrapper.className = "sliders";
    element.appendChild(wrapper);

    
    // get highest height of cells:
    // This is used for setting the height of the sliders
    let height;
    function getHeight(int) {
        height = cells[int].offsetHeight;
        console.log("height", height);
    }
    
    // creating individual sliders for each cell:
    var template = document.querySelector('#productrow');
    let heightAddup = 0;
    for (let k = 0; k < countRowsMedium; k++) {
        heightAddup += colForRow[k];
        console.log("heightAddup", heightAddup);
        getHeight(heightAddup - 1);

        // copying slider template:
        let clone = template.content.cloneNode(true);
        console.log(clone.querySelectorAll(".slider-overlay")[0].parentNode);

        clone.querySelector(".slider-overlay").parentNode.style.height = height + "px";

        // copying slider of slider template clone: 
        let cloneTwo = clone.querySelector(".slider-overlay").cloneNode(true);
        clone.querySelector(".slider-overlay").remove();

        let sliderAmount = colForRow[k] - 1;
        console.log("cloneTwoAmount", sliderAmount);

        // adding an extra slider cursor:
        let sliderInitialVal = 0;
        for (let i = 0; i < sliderAmount; i++) {
            sliderInitialVal = sliderInitialVal + gtaArray[k][i];
            console.log("sliderInitialVal:", sliderInitialVal)

            cloneTwo.setAttribute( "value", sliderInitialVal);

            clone.querySelector(".slider").appendChild(cloneTwo);

            cloneTwo = clone.querySelector(".slider-overlay").cloneNode(true);
        }
        

        wrapper.appendChild(clone);
    }
    console.groupEnd();


    // for every slider with .slider-overlay
    const colSlider = element.querySelectorAll(".slider-overlay");
    colSlider.forEach(elSlider => {
        let cells = elSlider.parentElement.parentElement.parentElement.getElementsByClassName("cell");
        let valueChange;
        let el_i;
        //let initColVal;

        /* collumnChange() - changes collumn size (only temporary)
        * TODO:
        * - Clean up code, 🚧
        * - Reduce redundancy by replacing them with variables, 🚧
        * - Make it scalable, 🚧
        * - remove el_i it's always going to be 0 from now on 🚧
        * - rename el_el_i --> handle_i ✅
        */
        function collumnChange(el_i, handle_i, change) {
            const sliderByIndex = elSlider.parentNode.children;
            console.log("el_i", el_i);
            
            let otherCell = null;
            let mainCell = null;

            last_cell = cells.length - 1;

            if (colForRow[0] == 3) { // if current collumns = 3
                if (sliderByIndex[handle_i  + 1] != null) {    // if this is not the last cursor interacted
                    // 2nd slider value - 1st slider value = difference
                    let difference = sliderByIndex[handle_i + 1].value - sliderByIndex[handle_i].value;
                    // check if the change in value is 0 or below, if so disable handle movement:
                    if (difference <= 0) {
                        difference = 1;
                        change = change - 1;

                        elSlider.value = parseInt(sliderByIndex[handle_i + 1].value) - 1;

                        elSlider.disabled = true;
                        setTimeout(function() {
                            elSlider.disabled = false;
                            console.groupEnd();
                        }, 1);
                    }

                    otherCell = cells[1].className = cells[1].className.replace(regexQuery, "medium-" + difference);
                    
                } else {    // if this is the last cursor interacted
                    otherCell = cells[last_cell].className = cells[last_cell].className.replace(regexQuery, "medium-" + (12 - elSlider.value));
                }
                
                mainCell = cells[handle_i].className = cells[handle_i].className.replace(regexQuery, "medium-" + change);

            } else if (colForRow[0] == 2) { 
                mainCell = cells[0].className = cells[0].className.replace(regexQuery, "medium-" + change);
                otherCell = cells[last_cell].className = cells[last_cell].className.replace(regexQuery, "medium-" + (12 - elSlider.value));
            } else if (colForRow[0] == 4) { 
                if (sliderByIndex[handle_i  + 1] != null) {    // if this is not the last cursor interacted
                    // 2nd slider value - 1st slider value = difference
                    let difference = sliderByIndex[handle_i + 1].value - sliderByIndex[handle_i].value;
                    // check if the change in value is 0 or below, if so disable handle movement:
                    if (difference <= 0) {
                        difference = 1;
                        change = change - 1;

                        elSlider.value = parseInt(sliderByIndex[handle_i + 1].value) - 1;

                        elSlider.disabled = true;
                        setTimeout(function() {
                            elSlider.disabled = false;
                            console.groupEnd();
                        }, 1);
                    }

                    otherCell = cells[handle_i + 1].className = cells[handle_i + 1].className.replace(regexQuery, "medium-" + difference);
                    mainCell = cells[handle_i].className = cells[handle_i].className.replace(regexQuery, "medium-" + change);

                } else {    // if this is the last cursor interacted
                    let difference = sliderByIndex[handle_i].value - sliderByIndex[handle_i - 1].value;
                    // check if the change in value is 0 or below, if so disable handle movement:
                    if (difference <= 0) {
                        difference = 1;
                        
                        elSlider.value = parseInt(sliderByIndex[handle_i].value) + 1;
                        
                        elSlider.disabled = true;
                        setTimeout(function() {
                            elSlider.disabled = false;
                            console.groupEnd();
                        }, 1);
                    }
                    
                    otherCell = cells[handle_i + 1].className = cells[handle_i + 1].className.replace(regexQuery, "medium-" + (12 - elSlider.value));
                    mainCell = cells[handle_i].className = cells[handle_i].className.replace(regexQuery, "medium-" + difference);
                }
            }
            
            /* Note: It returns two values because it only 
             * changes 2 columns in between the handle.
             */
            return mainCell, otherCell;
        }


        elSlider.addEventListener("mousedown", (e) => {
            console.groupCollapsed("🧮 Column change imbound:");

            // Get cells:
            // cells = e.target.parentElement.parentElement.parentElement.getElementsByClassName("cell");

            // Get first cell:
            // firstCell = cell[0];

            // get the column value for first collumn
            // initColVal = element.value;
        });

        elSlider.addEventListener("input", (e) => {
            valueChange = e.target.value;
            console.log("Value:", valueChange);
            console.log("From:", e.target.parentElement.parentElement.parentElement);

            console.log(cells[0].className);

            // get collumns of row:
            let col =  colForRow[el_i];
            console.log("amount of collumns:", col);
            console.log("for wrapper - collumns:", colForRow);

            //slider - index 
            el_i = Array.from(elSlider.parentNode.parentNode.children).indexOf(elSlider.parentNode);
            console.log("Slider index:", el_i);

            //slider cursor- index 
            el_el_i = Array.from(elSlider.parentNode.children).indexOf(elSlider) // TODO: use this to add to retun in function
            console.log("Slider index (el_el_i):", el_el_i);

            if (el_el_i > 0) {
                console.group("Cursor values:");

                let firstCursorVal = parseInt(elSlider.parentNode.children[0].value);
                console.log("first cursor value", firstCursorVal);
                console.log("second cursor value", valueChange);

                // new valueChange:
                valueChange = valueChange - firstCursorVal;
                console.log("new valueChange", valueChange);

                // check if it is 0 or below:
                if (valueChange <= 0) {
                    valueChange = 1;
                    // console.log("bruvv", firstCursorVal + 0);
                    e.target.value = firstCursorVal + 1;

                    e.target.disabled = true;
                    setTimeout(function() {
                        e.target.disabled = false;
                        console.groupEnd();
                    }, 1);
                }
                
                console.groupEnd();
            }

            collumnChange(el_i, el_el_i, valueChange);
            
            // cells[0 + el_i * 2].className = cells[0 + el_i * 2].className.replace(regexQuery, "medium-" + valueChange);
            
            // the second collumn
            // cells[1 + el_i * 2].className = cells[1 + el_i * 2].className.replace(regexQuery, "medium-" + (12 - valueChange));

            
        });

        elSlider.addEventListener("mouseup", (e) => {
            //get new max-height:
            let newH = cells[el_i * 2].offsetHeight;
            console.log(newH, cells[el_i * 2]);
            elSlider.parentNode.style.height = newH + "px";

            console.groupEnd();
        });

    });
    console.groupEnd();
})




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