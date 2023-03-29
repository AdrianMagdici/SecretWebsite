const btn = document.getElementById("myButton");

btn.onclick = function() {
    window.alert("clicked!");
    btn.innerText = "Clicked!";
}