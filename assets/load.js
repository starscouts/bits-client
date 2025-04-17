appLoading = true;

window.onload = async () => {
    setTimeout(() => {
        try {
            document.getElementById("loader-text").innerText = "Loading...";
            updateLoader();

            if (!isNodeJS) {
                document.getElementById("mobile-css").removeAttribute("disabled");
            }

            setTimeout(async () => {
                document.getElementById("loader-text").innerText = "Authenticating with the server...";
                updateLoader();
                loginStatus = JSON.parse(await (await window.fetch("https://money-v1.equestria.dev/Authentication/Test/")).text()).status;
                if (loginStatus === 1) {
                    document.getElementById("loader-text").innerText = "Redirecting to login page...";
                    updateLoader();
                    console.info("Starting authentication procedure (Mobile)");
                    location.href = "https://money-v1.equestria.dev/Authentication/Mobile2/"
                } else {
                    console.info("Authenticated successfully");

                    await plural();
                    await refresh();
                    appLoading = false;
                }
            }, 1000)
        } catch (e) {
            document.getElementById("loadfailure").style.display = "";
        }
    }, 1000)
}

let currentLoad = 0;
function updateLoader() {
    let step = 6.25;
    currentLoad = currentLoad + step;

    document.getElementById("loader-img").style.background = "linear-gradient(-90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) " + (100 - currentLoad) + "%, var(--mdc-theme-primary) " + (100 - currentLoad) + "%, var(--mdc-theme-primary) 100%)";
}