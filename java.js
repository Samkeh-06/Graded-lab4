let compareBtn = document.getElementById("compare-btn");
compareBtn.addEventListener("click", function () {
    let text1 = document.getElementById("expected").value.trim();
    let text2 = document.getElementById("actual").value.trim();
    let result = document.getElementById("result");

    // Clear previous results
    result.innerHTML = "";

    // If both are empty, it should show an alert
    if (text1 === "" && text2 === "") {
        alert("Please enter text in both text areas");
        return;
    }

    let expectedLines = text1.split("\n");
    let actualLines = text2.split("\n");
    let maxLines = Math.max(expectedLines.length, actualLines.length);

    //declare a boolean variable to check if the difference between the inputs is found
    let differenceFound = false;

    // Check number of lines difference only if both have content
    if (text1 !== "" && text2 !== "" && expectedLines.length !== actualLines.length) {
        let li = document.createElement("li");
        li.innerHTML = `Length differs:
         &lt ${expectedLines.length},
         &gt ${actualLines.length}`;
        result.appendChild(li);
        differenceFound = true;
    }

    // Compare line by line
    for (let i = 0; i < maxLines; i++) {
        let line1 = expectedLines[i] || "";
        let line2 = actualLines[i] || "";

        // Skip comparison if either line is empty
        if (line1 === "" || line2 === "") continue;
        
        // Check if the line 1 is not the same as line 2
        if (line1 !== line2) {
            let li = document.createElement("li");
            li.innerHTML = `Line ${i + 1}:<br>
            &lt ${line1}<br>
            &gt ${line2}`;
            result.appendChild(li);
            differenceFound = true;
        }
    }


    // Final message
    if (differenceFound) {
    result.classList.remove("nochange");
    result.classList.add("change");

    let message = document.createElement("p");
    message.textContent = "Texts are different";
    result.prepend(message);

    } else {
    result.classList.remove("change");
    result.classList.add("nochange");

    let li = document.createElement("li");  
    li.textContent = "No differences found";
    result.appendChild(li);  // append as list item
   }
});

// Clear button to remove or clear the entire input
document.getElementById("clear-btn").addEventListener("click", function () {
    document.getElementById("expected").value = "";
    document.getElementById("actual").value = "";
    document.getElementById("result").innerHTML = "";
});