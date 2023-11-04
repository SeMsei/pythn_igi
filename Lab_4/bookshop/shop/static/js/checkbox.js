var checkbox = document.getElementById("changeFontSize");
var checkbox_color = document.getElementById("changeFontColor");
var checkbox_bgcolor = document.getElementById("changeBackgroundColor");
var div = document.getElementById("font-cont");
var div_color = document.getElementById("font-color-cont");
var div_bg = document.getElementById("bg-color");

var form = document.getElementById("cool-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (checkbox.checked) {
    var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
        all[i].style.fontSize = document.getElementById("font-size").value + "px";
    }
  }
  
  if (checkbox_color.checked) {
    let r = parseInt(document.getElementById("font-color-r").value);
    let g = parseInt(document.getElementById("font-color-g").value);
    let b = parseInt(document.getElementById("font-color-b").value);
    var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
        all[i].style.color = `rgb(${r}, ${g}, ${b})`;
    }
  }
  
  if (checkbox_bgcolor.checked) {
    let r = parseInt(document.getElementById("bg-color-r").value);
    let g = parseInt(document.getElementById("bg-color-g").value);
    let b = parseInt(document.getElementById("bg-color-b").value);
    
    document.getElementsByClassName("content")[0].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    /*var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++) {
        all[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }*/
  }
})

// Add an event listener to the checkbox
checkbox.addEventListener("change", function() {
  if (checkbox.checked) {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }

  var tmp = document.getElementById('font-cont');
  const inp = document.createElement('label');
  inp.innerText = 'Font size';
  tmp.appendChild(inp);
});

checkbox_bgcolor.addEventListener("change", function() {
  if (checkbox_bgcolor.checked) {
    div_bg.style.display = "block";
  } else {
    div_bg.style.display = "none";
  }
});

checkbox_color.addEventListener("change", function() {
  if (checkbox_color.checked) {
    div_color.style.display = "block";
  } else {
    div_color.style.display = "none";
  }
});