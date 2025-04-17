window.onerror = (event, source, lineno, colno, error) => {
    if (error.message === "FocusTrap: Element must have at least one focusable child.") return;
    if (appLoading) {
        document.getElementById("loadfailure").style.display = "";
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerText = error.stack;
    }
}