async function createTransaction() {
    document.getElementById('create-action').disabled = true;
    document.getElementById('create-currency').disabled = true;
    document.getElementById('create-description').disabled = true;
    document.getElementById('create-amount').disabled = true;
    document.getElementById('create-button-create').disabled = true;
    document.getElementById('create-button-cancel').disabled = true;

    if (isNodeJS) {
        await (await window.fetch("https://money-v1.equestria.dev/Application/AddTransaction/?Currency=" + document.getElementById('create-currency').value + "&Amount=" + document.getElementById('create-amount').value + "&Operation=" + document.getElementById('create-action').value + "&Description=" + Buffer.from(document.getElementById('create-description').value).toString("base64url"))).text();
    } else {
        await (await window.fetch("https://money-v1.equestria.dev/Application/AddTransaction/?Currency=" + document.getElementById('create-currency').value + "&Amount=" + document.getElementById('create-amount').value + "&Operation=" + document.getElementById('create-action').value + "&Description=" + btoa(document.getElementById('create-description').value).replaceAll("+", "-").replaceAll("/", "_"))).text();
    }

    await refresh();

    document.getElementById('create-action').disabled = false;
    document.getElementById('create-currency').disabled = false;
    document.getElementById('create-description').disabled = false;
    document.getElementById('create-amount').disabled = false;
    document.getElementById('create-button-create').disabled = false;
    document.getElementById('create-button-cancel').disabled = false;
    document.getElementById('create-modal').style.display = 'none';
    document.getElementById('create-action').value = '+';
    document.getElementById('create-currency').value = '£';
    document.getElementById('create-description').value = '';
    document.getElementById('create-amount').value = '';
}

async function newCreate() {
    if (!addAmount.valid || !addDescription.valid || document.querySelector(".mdc-add-dialog .mdc-text-field-add-amount > input").value.trim() === "" || document.querySelector(".mdc-add-dialog .mdc-text-field-add-description > input").value.length > 100) return;

    document.getElementById("action-remove").disabled = true;
    document.getElementById("action-add").disabled = true;
    document.getElementById("currency-eur").disabled = true;
    document.getElementById("currency-gbp").disabled = true;
    document.querySelector(".mdc-add-dialog .mdc-text-field-add-amount > input").disabled = true;
    document.querySelector(".mdc-add-dialog .mdc-text-field-add-description > input").disabled = true;
    Array.from(document.querySelectorAll(".mdc-add-dialog .mdc-dialog__actions button")).map((e) => e.disabled = true);

    await (await window.fetch("https://money-v1.equestria.dev/Application/AddTransaction/?Currency=" + (document.getElementById("currency-eur").checked ? "€" : "£") + "&Amount=" + document.querySelector(".mdc-add-dialog .mdc-text-field-add-amount > input").value + "&Operation=" + (document.getElementById("action-add").checked ? "+" : "-") + "&Description=" + btoa(document.querySelector(".mdc-add-dialog .mdc-text-field-add-description > input").value).replaceAll("+", "-").replaceAll("/", "_"))).text();

    await refresh();

    document.getElementById("action-remove").disabled = false;
    document.getElementById("action-add").disabled = false;
    document.getElementById("currency-eur").disabled = false;
    document.getElementById("currency-gbp").disabled = false;
    document.querySelector(".mdc-add-dialog .mdc-text-field-add-amount > input").disabled = false;
    document.querySelector(".mdc-add-dialog .mdc-text-field-add-description > input").disabled = false;
    Array.from(document.querySelectorAll(".mdc-add-dialog .mdc-dialog__actions button")).map((e) => e.disabled = false);
    addDialog.close();

    document.getElementById("action-add").checked = true;
    document.getElementById("currency-gbp").checked = true;
    document.querySelector(".mdc-add-dialog .mdc-text-field-add-amount > input").value = "";
    document.querySelector(".mdc-add-dialog .mdc-text-field-add-description > input").value = "";
}