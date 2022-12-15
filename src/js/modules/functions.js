// Проверка поддержки webp, добавление класса webp или no-webp для HTML

export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {

        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className)
    });
}


const { speechSynthesis } = window;

const voicesSelect = document.querySelector("#voices");
const langSelect = document.querySelector("#langs");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const text = document.querySelector("#text");
let someLang = "ru-RU";

let voices = [];
let langs = [];

const generateVoices = () => {
    voices = speechSynthesis.getVoices();
    console.log(voices);
    const voicesList = voices
        .map(
            (voice, index) =>
                voice.lang === someLang &&
                `<option value=${index}>${voice.name} (${voice.lang})</option>`
        )
        .join("");
    voicesSelect.innerHTML = voicesList;
};

const newLang = () => {
    someLang = langSelect.value;
    generateVoices();
};

const generateLangs = () => {
    langs = speechSynthesis.getVoices();

    const langList = langs.map(
        (voice, index) => `<option>${voice.lang}</option>`
    );
    langSelect.innerHTML = Array.from(new Set(langList)).join("");
};

const speak = () => {
    if (speechSynthesis.speaking) {
        return;
    }
    if (text.value !== "") {
        const ssUtterance = new SpeechSynthesisUtterance(text.value);
        ssUtterance.voice = voices[voicesSelect.value];
        ssUtterance.pitch = pitch.value;
        ssUtterance.rate = rate.value;
        speechSynthesis.speak(ssUtterance);
    }
};

generateVoices();
generateLangs();

document
    .querySelector("#btn-stop")
    .addEventListener("click", () => speechSynthesis.cancel());
document.querySelector("#btn-start").addEventListener("click", speak);

rate.addEventListener(
    "change",
    () => (document.querySelector(".rate-value").textContent = rate.value)
);
pitch.addEventListener(
    "change",
    () => (document.querySelector(".pitch-value").textContent = pitch.value)
);

langSelect.addEventListener("change", newLang);
voicesSelect.addEventListener("change", speak);

speechSynthesis.addEventListener("voiceschanged", generateVoices);
speechSynthesis.addEventListener("voiceschanged", generateLangs);






