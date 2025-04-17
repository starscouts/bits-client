let sensitiveInfoVisible = true;

async function toggleVisibility() {
    if (sensitiveInfoVisible) {
        sensitiveInfoVisible = false;
        document.getElementById("visibility-icon").innerText = "visibility_off";
        await refresh();
    } else {
        sensitiveInfoVisible = true;
        document.getElementById("visibility-icon").innerText = "visibility";
        await refresh();
    }
}