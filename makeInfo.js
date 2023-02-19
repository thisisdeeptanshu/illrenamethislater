function makeInfo(rows, columns, url) {
    let body = document.body;

    let main = document.createElement("div");
    body.appendChild(main);
    
    let grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `${100/columns}%`;
    grid.style.padding = "10px";
    main.appendChild(grid);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            let res = xhr.response;
            let i = 1;
            let lastHeight = 0;
            let heightList = [];
            for (let name in res) {
                
                let a = document.createElement("h1");
                // a.style.border = "1px solid white";
                a.style.color = "#00000000";
                a.innerText = res[name]["Description"];
                a.style.padding = "5px";
                a.style.gridColumn = (i % columns == 0 ? columns : 0);
                grid.appendChild(a);

                // https://stackoverflow.com/questions/43347612/cover-an-arbitrary-element-with-another
                var rect = a.getBoundingClientRect();
                var overlayElement = document.createElement("div");
                overlayElement.style.position = "absolute";
                overlayElement.style.zIndex = "999";
                overlayElement.style.top = "0px";
                overlayElement.style.width = 100/columns + "%";
                overlayElement.style.left = 100/columns * (i-1) + "%";
                overlayElement.style.height = (rect.bottom - rect.top) + "px";
                // overlayElement.style.backgroundColor = "white";

                if (i > columns) {
                    overlayElement.style.left = 100/columns * (i-columns-1) + "%";
                    overlayElement.style.top = heightList[i - columns - 1];
                }
                overlayElement.setAttribute("class", "center");

                let x = document.createElement("h1");
                x.innerHTML = name;
                x.style.color = "#FAB2AF";
                overlayElement.appendChild(x);
                let y = document.createElement("h1");
                y.innerHTML = res[name]["YOE"] + ` Year${res[name]["YOE"] == 1 ? "" : "s"} of Experience`;
                y.style.color = "#FAB2AF";
                overlayElement.appendChild(y);
                let z = document.createElement("h1");
                z.innerHTML = `Skill Level: ${res[name]["Scale"]}/10`;
                z.style.color = "#FAB2AF";
                overlayElement.appendChild(z);
                overlayElement.addEventListener("mouseenter", () => {
                    a.style.color = "#F5B8EE";
                    x.style.color = "#00000000";
                    y.style.color = "#00000000";
                    z.style.color = "#00000000";
                });
                overlayElement.addEventListener("mouseleave", () => {
                    a.style.color = "#00000000";
                    x.style.color = "#FAB2AF";
                    y.style.color = "#FAB2AF";
                    z.style.color = "#FAB2AF";
                });
                
                body.append(overlayElement);
                heightList.push(overlayElement.style.height);

                i++;
            }
        } else {
            console.log(":(");
        }
    };
    xhr.send();
}