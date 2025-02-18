document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const xFields = document.getElementById("x-inputs");
    const yFields = document.getElementById("y-inputs");
    let fieldCount = 1;

    function addFields() {
        let newXField = document.createElement("input");
        let newYField = document.createElement("input");

        newXField.placeholder = "Value of X " + (fieldCount + 1) + " ";
        newYField.placeholder = "Value of Y " + (fieldCount + 1) + " ";
        newXField.className = "x-input";
        newYField.className = "y-input";

        xFields.appendChild(newXField);
        yFields.appendChild(newYField);
        fieldCount++;
    }

    function removeField() {
        if (fieldCount > 1) {
            xFields.removeChild(xFields.lastChild);
            yFields.removeChild(yFields.lastChild);
            fieldCount--;
        }
    }

    function generateGraph() {

        canvas.innerHTML = ""; // Clear previous graph
        let xValues = document.querySelectorAll(".x-input");
        let yValues = document.querySelectorAll(".y-input");

        let maxValue = 0;
        let data = [];
        
        xValues.forEach((xField, index) => {
            let name = xField.value.trim();
            let value = parseInt(yValues[index].value.trim(), 10);
            if (name && !isNaN(value)) {
                data.push({ name, value });
                if (value > maxValue) maxValue = value;
            }
        });

        if (data.length === 0) {
            alert("Please enter valid values for the graph!");
            return;
        }

        data.forEach(({ name, value }) => {
            let barContainer = document.createElement("div");
            
            barContainer.classList.add("bar-container");

            let bar = document.createElement("div");
            bar.classList.add("bar") 
            bar.style.height = `${(value / maxValue) * 100}px`;

            let label = document.createElement("span");
            label.className = "bar-label";
            label.innerText = `${name} (${value})`;

            barContainer.appendChild(bar);
            barContainer.appendChild(label);
            canvas.appendChild(barContainer);
        });
    }

    document.querySelector(".add-btn.add").addEventListener("click", addFields);
    document.querySelector(".add-btn.remove").addEventListener("click", removeField);
    document.getElementById("generate-btn").addEventListener("click", generateGraph);
});
