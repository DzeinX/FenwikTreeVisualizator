import Globals from "../../configs/Globals.js";
import fillFenwikTree from "../FenwikTree/FillFenwikTree.js";
import Tabs from "../Views/Tabs.js";
import PlayerBoxController from "../Views/PlayerBoxCallbacks/PlayerBoxController.js";

window.addEventListener("resize", (e) => {
    Globals.globalFenwikLength = Math.round(window.innerWidth * 0.6 / 42);
    PlayerBoxController.resetButton();
})

export function refreshIndexInput() {
    let index = document.querySelector("#index");
    index.addEventListener("input", (e) => {
        e.preventDefault();

        e.target.value = e.target.value.replace(/\D/g, '');

        if (e.target.value > Globals.globalFenwikLength - 1) {
            e.target.value = e.target.value.replace(e.target.value.split("")[e.target.value.length - 1], "");
        }
    })
}

export function refreshValueInput() {
    let value = document.querySelector("#source_value");
    value.addEventListener("input", (e) => {
        e.preventDefault();

        e.target.value = e.target.value.replace(/\D/g, '');

        if (e.target.value > Globals.maxRandomNumber || e.target.value === "00") {
            e.target.value = e.target.value.replace(e.target.value.split("")[e.target.value.length - 1], "");
        }
    })
}

export function refreshLengthInput() {
    let length = document.querySelector("#length");
    length.addEventListener("input", (e) => {
        e.preventDefault();

        e.target.value = parseInt(e.target.value.replace(/\D/g, ''));

        if (parseInt(e.target.value) > Globals.maxFenwikLength) {
            e.target.value = Globals.maxFenwikLength;
        }
        if (e.target.value === "NaN" || e.target.value === "") {
            e.target.value = 1;
        }

        Globals.globalFenwikLength = parseInt(e.target.value);
        Globals.FENWIK.refill(fillFenwikTree());
        Tabs.reloadTabsWithoutPanel(Tabs.GLOBAL_TAB_STATE);
    })
}

export function refreshTimeInput() {
    let time = document.querySelector("#seconds-per-step");
    time.addEventListener("input", (e) => {
        e.preventDefault();

        e.target.value = e.target.value.replace(/\D/g, '');

        if (parseInt(e.target.value) > Globals.maxTimeInput) {
            e.target.value = Globals.maxTimeInput;
        }

        if (e.target.value === "NaN" || e.target.value === "") {
            e.target.value = 500;
        }
    })
}

export function refreshRangeLowInput() {
    let rangeLow = document.querySelector("#from");
    rangeLow.addEventListener("input", (e) => {
        e.preventDefault();

        e.target.value = e.target.value.replace(/\D/g, '');

        if (e.target.value < 0 || e.target.value > Globals.globalFenwikLength - 1) {
            e.target.value = e.target.value.replace(e.target.value.split("")[e.target.value.length - 1], "");
        }
    })
}

export function refreshRangeHighInput() {
    let rangeHigh = document.querySelector("#to");
    rangeHigh.addEventListener("input", (e) => {
        e.preventDefault();

        e.target.value = e.target.value.replace(/\D/g, '');

        if (e.target.value < 0 || e.target.value > Globals.globalFenwikLength - 1) {
            e.target.value = e.target.value.replace(e.target.value.split("")[e.target.value.length - 1], "");
        }
    })
}
