const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

function change(e) {
    let iteration = 0;
  
    clearInterval(interval);
    
    interval = setInterval(() => {
        e.innerText = e.innerText
        .split("")
        .map((letter, index) => {
            if(index < iteration) {
                return e.dataset.value[index];
            }
        
            return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
        
        if(iteration >= e.dataset.value.length){ 
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30);
}
function changeE(e) {
    let iteration = 0;
  
    clearInterval(interval);
    
    interval = setInterval(() => {
        e.innerText = e.innerText
        .split("")
        .map((letter, index) => {
            if(index < iteration) {
                return e.dataset.old[index];
            }
        
            return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
        
        if(iteration >= e.dataset.old.length){ 
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30);
}