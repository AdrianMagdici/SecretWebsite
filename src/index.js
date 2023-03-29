const btn = document.getElementById("myButton");

btn.onclick = function() {
    window.alert("clicked!");
    btn.innerHTML = "Clicked!";
}