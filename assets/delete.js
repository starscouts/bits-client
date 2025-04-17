async function deleteTransaction(id) {
    let transaction = transactions.filter(i => i.date.absolute === id)[0];
    console.log(transaction);
    showConfirm("This will remove the transaction made by " + transaction.author.name + " " + transaction.date.relative + ".\nIt will be removed from the list and the global balance will be recalculated without this transaction.");
    confirmAction = async () => {
        if (isNodeJS) {
            await (await window.fetch("https://money-v1.equestria.dev/Application/RemoveTransaction/?Transaction=" + Buffer.from(id).toString("base64url"))).text();
        } else {
            await (await window.fetch("https://money-v1.equestria.dev/Application/RemoveTransaction/?Transaction=" + btoa(id).replaceAll("+", "-").replaceAll("/", "_"))).text();
        }
        await refresh();
        deleteDialog.close();
    }
}