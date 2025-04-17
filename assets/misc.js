function showConfirm(text) {
    document.getElementById("confirm-text").innerText = text;
    Array.from(document.querySelectorAll(".mdc-delete-dialog .mdc-dialog__actions button")).map((e) => e.disabled = false);
    deleteDialog.open();
}

confirmAction = () => {
    console.log("Confirmed!");
    deleteDialog.close();
}