function switchToStats() {
    document.getElementById("switcher-1").style.display = "";
    document.getElementById("switcher-0").style.display = "none";
    document.getElementById("title-1").style.display = "";
    document.getElementById("title-0").style.display = "none";
    document.getElementById("list").style.display = "none";
    document.getElementById("stats").style.display = "";
}

function switchToList() {
    document.getElementById("switcher-1").style.display = "none";
    document.getElementById("switcher-0").style.display = "";
    document.getElementById("title-1").style.display = "none";
    document.getElementById("title-0").style.display = "";
    document.getElementById("list").style.display = "";
    document.getElementById("stats").style.display = "none";
}