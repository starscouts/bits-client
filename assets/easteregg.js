f13presses = 0;
document.onkeydown = (event) => {
    if (event.keyCode === 124) {
        if (require('os').platform() === "win32") {
            alert("haha you're using an inferior OS! Doing F13 on here is too easy so you might have expected " +
                "something but you're not going to get it.")
        } else {
            f13presses++;

            switch (f13presses) {
                case 1:
                    Array.from(document.querySelectorAll("*")).forEach((item) => {
                        item.style.fontFamily = "'Noto Sans Symbols', 'Wingdings', 'Webdings', monospace";
                    });
                    break;

                case 2:
                    Array.from(document.querySelectorAll("*")).forEach((item) => {
                        item.style.background = "red";
                    });
                    break;

                case 3:
                    Array.from(document.querySelectorAll("*")).forEach((item) => {
                        item.style.color = "blue";
                    });
                    break;

                case 4:
                    Array.from(document.querySelectorAll("img")).forEach((item) => {
                        item.src = "";
                        item.style.color = "yellow";
                    });
                    break;

                case 5:
                    Array.from(document.querySelectorAll("*")).forEach((item) => {
                        item.style.transition = "transform 200ms";
                        item.style.animationName = "shake";
                        item.style.animationDuration = "200ms";
                        item.style.animationIterationCount = "infinite";
                        item.style.animationDirection = "alternate-reverse";
                    });
                    break;

                case 6:
                    Array.from(document.querySelectorAll("*")).forEach((item) => {
                        item.style.display = "none";
                    });
                    break;

                default:
                    Array.from(document.querySelectorAll("*")).forEach((item) => {
                        window.close();
                    });
                    break;
            }
        }
    }
}