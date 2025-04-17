let system;
let members;

async function plural() {
    try {
        await (await window.fetch("https://money-v1.equestria.dev/Application/SetDefaultIdentity/")).text();
        system = JSON.parse(await (await window.fetch("https://money-v1.equestria.dev/Authentication/Username/")).text()).system.trim();

        if (system.toLowerCase() === "null" || system === "") return;

        members_pre = JSON.parse(await (await window.fetch("https://api.pluralkit.me/v2/systems/" + system + "/members")).text()).filter((i) => i.name !== "unknown");
        fronters = JSON.parse(await (await window.fetch("https://api.pluralkit.me/v2/systems/" + system + "/fronters")).text());
        members = [
            ...fronters['members'],
            ...members_pre.filter((i) =>
                !fronters['members'].map((i) => {
                    return i.id;
                }).includes(i.id))
        ]

        for (let member of members) {
            let dom = `
            <li class="mdc-list-item" tabindex="0" data-mdc-dialog-action="none" id="plural-member-${member['id']}" onclick="setPluralUser('${member['id']}');">
                <span class="mdc-list-item__text">
                    <img alt="" src="${member['avatar_url'] ?? './assets/default.png'}" style="border-radius:999px;background-color: rgb(37, 37, 37);width: 36px;height: 36px;vertical-align: middle;margin-right: 7px;">
                    ${member['display_name'] ?? member['name']}
                </span>
            </li>
        `;
            document.getElementById("plural-members").innerHTML += dom;
        }

        pluralDialog.open();
    } catch (e) {
        document.getElementById("loadfailure").style.display = "";
    }
}

async function setPluralUser(user) {
    let member = members.filter((i) => i.id === user)[0];

    await (await window.fetch("https://money-v1.equestria.dev/Application/SetCurrentIdentity/?Name=" + btoa(member['display_name'] ?? member['name']).replaceAll("+", "-").replaceAll("/", "_") + "&Picture=" + btoa(member['avatar_url'] ?? "./assets/default.png").replaceAll("+", "-").replaceAll("/", "_"))).text();

    pluralDialog.close();
}