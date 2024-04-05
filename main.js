let browserLang = (window.navigator && window.navigator.language) || "en-US";
browserLang = browserLang.slice(0, 2).toLowerCase();

let header, moods;
if (browserLang === "es") {
    header = "¿Cómo te sientes hoy?"
    moods = {
        "🙂": "feliz",
        "😇": "bendecid@",
        "🍀": "dichos@",
        "🥰": "amad@",
        "😢": "triste",
        "🙏": "agradecid@",
        "🤩": "entusiasmad@",
        "😍": "enamorad@",
        "🤪": "loc@",
        "🤓": "inteligente",
        "😎": "guay",
        "😠": "enojad@",
        "🥱": "cansad@",
        "😞": "decepcionad@",
        "🤒": "enferm@",
        "🥴": "borrach@",
        "😈": "malvad@",
    };
} else {
    header = "How are you feeling today?"
    moods = {
        "🙂": "happy",
        "😇": "blessed",
        "🍀": "lucky",
        "🥰": "loved",
        "😢": "sad",
        "🙏": "grateful",
        "🤩": "excited",
        "😍": "in love",
        "🤪": "crazy",
        "🤓": "smart",
        "😎": "cool",
        "😠": "angry",
        "🥱": "tired",
        "😞": "disappointed",
        "🤒": "sick",
        "🥴": "drunk",
        "😈": "evil",
    };
}

function h(tag, attributes, ...children) {
    const element = document.createElement(tag);
    if (attributes) {
        Object.entries(attributes).forEach((entry) => {
            element.setAttribute(entry[0], entry[1]);
        });
    }
    element.append(...children);
    return element;
}

function main() {
    const root = document.getElementById("root");
    root.append(h("h2", {}, header));
    const today = getDate();
    if (today !== localStorage.day) {
        localStorage.removeItem("day");
        localStorage.removeItem("mood");
    }
    const mood = localStorage.mood;
    Object.keys(moods).forEach(function(key) {
        const span = h("span", {}, key + " " + moods[key], h("i", {class: "check"}));
        let btnClass = "btn" +((mood === key)? " selected" : "");
        root.append(h("button", { class: btnClass, onclick: "share(this)", data: key}, span));
    });
}

function getDate() {
    const now = new Date();
    return now.getDay()+"/"+now.getMonth()+"/"+now.getFullYear();
}

function share(btn) {
    const buttons = document.getElementsByClassName("btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
    const mood = btn.getAttribute("data");
    if (localStorage.mood === mood) {
        localStorage.removeItem("mood");
    } else {
        btn.classList.add("selected");
        localStorage.mood = mood;
        localStorage.day = getDate();
        let info = mood + " " + window.webxdc.selfName + " is feeling " + moods[mood] + " today";
        window.webxdc.sendUpdate({payload: "", info}, info);
    }
}

main();
