async function refresh() {
    document.getElementById("loader-text").innerText = "Preparing to load data...";
    updateLoader();
    document.getElementById("transactions").innerHTML = "";

    document.getElementById("loader-text").innerText = "Loading user information...";
    updateLoader();
    document.getElementById("user-profile").title = JSON.parse(await (await window.fetch("https://money-v1.equestria.dev/Authentication/Username/")).text()).name;
    document.getElementById("user-profile").src = "https://privateauth.equestria.dev/hub/api/rest/avatar/" + JSON.parse(await (await window.fetch("https://money-v1.equestria.dev/Authentication/Username/")).text()).id + "?dpr=2&size=48";

    document.getElementById("loader-text").innerText = "Gathering transactions list...";
    updateLoader();
    window.transactions = JSON.parse(await (await window.fetch("https://money-v1.equestria.dev/Application/TransactionsList/")).text());

    document.getElementById("loader-text").innerText = "Gathering goal information...";
    updateLoader();
    window.goal = JSON.parse(await (await window.fetch("https://money-v1.equestria.dev/Application/GetGoal/")).text());

    document.getElementById("loader-text").innerText = "Processing transactions...";
    updateLoader();
    for (let transaction of transactions) {
        demo = document.getElementById("demo-transaction");
        demo.id = "";

        if (transaction.type === "pay") {
            word = "used";
            color = "#b31500";
        } else {
            word = "added";
            color = "#0065b3";
        }

        if (transaction.amount['original'] === "eur") {
            if (sensitiveInfoVisible) {
                baseCurrency = transaction.amount['eur'].toFixed(2) + "€";
                convertedCurrency = "£" + transaction.amount['gbp'].toFixed(2);
            } else {
                baseCurrency = "--.--€";
                convertedCurrency = "£--.--";
            }
        } else {
            if (sensitiveInfoVisible) {
                convertedCurrency = transaction.amount['eur'].toFixed(2) + "€";
                baseCurrency = "£" + transaction.amount['gbp'].toFixed(2);
            } else {
                convertedCurrency = "--.--€";
                baseCurrency = "£--.--";
            }
        }

        document.getElementById("transactions").innerHTML += demo.outerHTML
            .replace("%user%", transaction.author.name)
            .replace("%picture%", "\" src=\"" + transaction.author.avatar + "\"")
            .replace("%time%", transaction.date.relative)
            .replace("%transactionId%", transaction.date.absolute)
            .replace("%description%", sensitiveInfoVisible ? transaction.description.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;") : "---------")
            .replace("%type%", word)
            .replace("%amount_bc%", baseCurrency)
            .replace("%amount_cc%", convertedCurrency)
            .replace("%type%", word)
            .replace("var(--perc-color)", color)

        demo.id = "demo-transaction";
    }

    document.getElementById("loader-text").innerText = "Calculating total...";
    updateLoader();
    try {
        totalPaidEUR = transactions.filter(i => i.type === "pay").map(i => { return i.amount['eur']; }).reduce((a, b) => { return a+b; });
    } catch (e) {
        totalPaidEUR = 0;
    }

    try {
        totalPaidGBP = transactions.filter(i => i.type === "pay").map(i => { return i.amount['gbp']; }).reduce((a, b) => { return a+b; });
    } catch (e) {
        totalPaidGBP = 0;
    }

    try {
        totalGainedEUR = transactions.filter(i => i.type !== "pay").map(i => { return i.amount['eur']; }).reduce((a, b) => { return a+b; });
    } catch (e) {
        totalGainedEUR = 0;
    }

    try {
        totalGainedGBP = transactions.filter(i => i.type !== "pay").map(i => { return i.amount['gbp']; }).reduce((a, b) => { return a+b; });
    } catch (e) {
        totalGainedGBP = 0;
    }

    totalEUR = totalGainedEUR - totalPaidEUR;
    totalGBP = totalGainedGBP - totalPaidGBP;

    if (sensitiveInfoVisible) {
        document.getElementById("balance-eur").innerText = totalEUR.toFixed(2);
        document.getElementById("balance-gbp").innerText = totalGBP.toFixed(2);
    } else {
        document.getElementById("balance-eur").innerText = "---.--";
        document.getElementById("balance-gbp").innerText = "---.--";
    }

    document.getElementById("loader-text").innerText = "Calculating goal completion...";
    updateLoader();
    document.getElementById("goal-name").innerText = goal.name;

    if (sensitiveInfoVisible) {
        document.getElementById("goal-amount-eur").innerText = goal.amount['eur'].toFixed(2);
        document.getElementById("goal-amount-gbp").innerText = goal.amount['gbp'].toFixed(2);
    } else {
        document.getElementById("goal-amount-eur").innerText = "---.--";
        document.getElementById("goal-amount-gbp").innerText = "---.--";
    }

    if (goal.amount['eur'] === 0 || goal.amount['gbp'] === 0) {
        document.getElementById("goal-amount-percentage").innerText = "N/A";
        document.getElementById("goal-bar-fill").style.width = "0%";
    } else {
        percentage = (totalEUR / goal.amount['eur']) * 100;
        if (sensitiveInfoVisible) {
            document.getElementById("goal-amount-percentage").innerText = percentage.toFixed(2);
            document.getElementById("goal-bar-fill").style.width = percentage.toFixed(5) + "%";
        } else {
            document.getElementById("goal-amount-percentage").innerText = "--.--";
            document.getElementById("goal-bar-fill").style.width = "50%";
        }
    }

    document.getElementById("loader-text").innerText = "Setting up listeners...";
    updateLoader();
    for (let item of Array.from(document.getElementsByClassName("transaction"))) {
        item.onclick = () => {
            deleteTransaction(item.getAttribute("data-transaction-id"));
        }
    }

    document.getElementById("loader-text").innerText = "Calculating graph...";
    updateLoader();
    graph.data.labels = transactions.map((i) => { return new Date(i.date.absolute).toString().split(":")[0] + ":" + new Date(i.date.absolute).toString().split(":")[1]; }).reverse().filter((_, i) => i > 1);

    let last = 0;
    let balances = [];

    transactions.map((i) => { if (i.type === "pay") { return -(i.amount.eur); } else { return i.amount.eur; } }).reverse().map((i) => {
        last = last + i;
        balances.push(last);
    });

    if (!sensitiveInfoVisible) {
        balances = balances.map(() => {
            return Math.random() * 1000;
        })
    }

    graph.data.datasets[0].data = balances.filter((_, i) => i > 1);

    document.getElementById("loader-text").innerText = "Processing trends and average...";
    updateLoader();
    trendData = balances.filter((_, i) => i > 1).map((i, _) => { return { x: _, y: i } });
    trend = trendline(trendData, 'x', 'y');

    let lastTrend = trend.yStart;
    let balancesTrend = [];

    transactions.filter((_, i) => i > 1).map(() => {
        lastTrend = lastTrend + trend.slope;
        balancesTrend.push(lastTrend);
    });

    graph.data.datasets[1].data = balancesTrend;

    document.getElementById("loader-text").innerText = "Gathering insights...";
    updateLoader();
    document.getElementById("graph-insights-color").style.backgroundColor = "black";
    document.getElementById("graph-insights-text").style.color = "black";
    document.getElementById("graph-insights-text").innerText = "No insights available. Please try again later.";

    document.getElementById("graph-insights-text").style.color = "white";
    document.getElementById("graph-insights-text").innerText = "Slope (negative = losing money; positive = gaining money): " + trend.slope;

    let avgSlope = Math.round(trend.slope);

    if (avgSlope < -3) {
        document.getElementById("graph-insights-color").style.backgroundColor = "red";
        document.getElementById("graph-insights-text").style.color = "red";
        document.getElementById("graph-insights-text").innerText = "Money is going down faster than it should, you must immediately reduce your expenses.";
    } else if (avgSlope < 0) {
        document.getElementById("graph-insights-color").style.backgroundColor = "orange";
        document.getElementById("graph-insights-text").style.color = "orange";
        document.getElementById("graph-insights-text").innerText = "You are not saving money, consider reducing your expenses.";
    } else if (avgSlope === 0) {
        document.getElementById("graph-insights-color").style.backgroundColor = "green";
        document.getElementById("graph-insights-text").style.color = "green";
        document.getElementById("graph-insights-text").innerText = "Your balance is stable, consider saving more money.";
    } else if (avgSlope > 0) {
        document.getElementById("graph-insights-color").style.backgroundColor = "skyblue";
        document.getElementById("graph-insights-text").style.color = "skyblue";
        document.getElementById("graph-insights-text").innerText = "You are effectively saving money.";
    }

    document.getElementById("loader-text").innerText = "Calculating zero/goal date...";
    updateLoader();
    document.getElementById("stats-goal-date").innerText = "-";
    document.getElementById("stats-goal-item").innerText = "Goal";

    if (avgSlope < 0) {
        it = 0; b = totalEUR; while (b > 0) { it++; b = b + trend.slope; }
        let avgDelay = Math.round(averageDelta(transactions.map((i) => { return new Date(i.date.absolute).getTime() }).reverse()));
        let timeUntilEmpty = avgDelay * it;
        let date = new Date(new Date().getTime() + timeUntilEmpty).toString().split(":")[0];
        document.getElementById("stats-goal-date").innerText = date.substring(0, date.length - 3);
        //document.getElementById("stats-est-day").innerText = "-" + (totalEUR / new Date(new Date().getTime() + timeUntilEmpty).getTime() / 86400000) + "€";
        document.getElementById("stats-goal-item").innerText = "Zero";
    } else {
        it = 0; b = totalEUR; while (b < goal.amount.eur) { it++; b = b + trend.slope; }
        let avgDelay = Math.round(averageDelta(transactions.map((i) => { return new Date(i.date.absolute).getTime() }).reverse()));
        let timeUntilGoal = avgDelay * it;
        let date = new Date(new Date().getTime() + timeUntilGoal).toString().split(":")[0];
        document.getElementById("stats-goal-date").innerText = date.substring(0, date.length - 3);
        //document.getElementById("stats-est-day").innerText = "+" + (totalEUR / new Date(new Date().getTime() + timeUntilEmpty).getTime() / 86400000) + "€";
        document.getElementById("stats-goal-item").innerText = "Goal";
    }

    document.getElementById("loader-text").innerText = "Calculating additional stats...";
    updateLoader();
    document.getElementById("stats-exchange").innerText = "1.00€ = £" + (totalGBP / totalEUR).toFixed(2);
    document.getElementById("stats-slope").innerText = trend.slope.toFixed(5);

    if (avgSlope < 0) {
        document.getElementById("stats-chances-holidays").innerText = "0.00%";
        document.getElementById("stats-chances-living").innerText = "Not possible";
        document.getElementById("stats-chances-living2").innerText = "Not possible";
    } else {
        let targetDate      = new Date("Jul 17 2024");
        let realDate        = new Date(document.getElementById("stats-goal-date").innerText);
        let holidaysChances = (targetDate.getTime() / realDate.getTime()) * 100;

        if (holidaysChances < 100) {
            document.getElementById("stats-chances-holidays").innerText = holidaysChances.toFixed(2) + "%";
        } else {
            document.getElementById("stats-chances-holidays").innerText = "100.00%";
        }

        let monthsLiving    = Math.floor(totalEUR / 400);

        if (monthsLiving > 0) {
            let monthsLivingStr = monthsLiving + " month" + (monthsLiving > 1 ? "s" : "")
            if (monthsLiving >= 12) {
                let remainingMonths = monthsLiving - Math.floor(monthsLiving / 12) * 12;
                monthsLivingStr = Math.floor(monthsLiving / 12) + " year" + (monthsLiving / 12 > 1 ? "s" : "") + (remainingMonths > 0 ? " and " + remainingMonths + " month" + (remainingMonths > 1 ? "s" : "") : "")
            }

            document.getElementById("stats-chances-living").innerText = monthsLivingStr;
        } else {
            document.getElementById("stats-chances-living").innerText = "Not possible";
        }

        let exclHolidays_monthsLiving    = Math.floor((totalEUR - goal.amount.eur) / 400);

        if (exclHolidays_monthsLiving > 0) {
            let exclHolidays_monthsLivingStr = exclHolidays_monthsLiving + " month" + (exclHolidays_monthsLiving > 1 ? "s" : "")
            if (monthsLiving >= 12) {
                let exclHolidays_remainingMonths = exclHolidays_monthsLiving - Math.floor(exclHolidays_monthsLiving / 12) * 12;
                exclHolidays_monthsLivingStr = Math.floor(exclHolidays_monthsLiving / 12) + " year" + (exclHolidays_monthsLiving / 12 > 1 ? "s" : "") + (exclHolidays_remainingMonths > 0 ? " and " + exclHolidays_remainingMonths + " month" + (exclHolidays_remainingMonths > 1 ? "s" : "") : "")
            }

            document.getElementById("stats-chances-living2").innerText = exclHolidays_monthsLivingStr;
        } else {
            document.getElementById("stats-chances-living2").innerText = "Not possible";
        }
    }

    document.getElementById("loader-text").innerText = "";
    updateLoader();

    setTimeout(() => {
        document.getElementById("app").style.display = "";
        document.getElementById("loader").style.opacity = "0";
        document.getElementById("loader").style.pointerEvents = "none";
    }, 500);
}