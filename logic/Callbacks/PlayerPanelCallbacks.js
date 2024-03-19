import PlayerBoxController from "../Views/PlayerBoxCallbacks/PlayerBoxController.js";
import Steps from "../Views/Steps.js";

let stepNextButton = document.querySelector(".step-next");
stepNextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (Steps.CURRENT > 0) {
        stepPrevButton.classList.remove("disable");
        stepPrevButton.setAttribute("title", "Шаг назад");
    }
    PlayerBoxController.nextStepButton();
    if (Steps.CURRENT <= 1) {
        stepPrevButton.classList.add("disable");
        stepNextButton.setAttribute("title", "Шаг назад: не активен");
    }
});

let stepPrevButton = document.querySelector(".step-prev");
stepPrevButton.addEventListener("click", (e) => {
    e.preventDefault();
    PlayerBoxController.prevStepButton();
    if (Steps.CURRENT <= 1) {
        e.target.classList.add("disable");
        e.target.setAttribute("title", "Шаг назад: не активен");
        return;
    }
    if (e.target.classList.contains("disable")) {
        e.target.classList.remove("disable");
        e.target.setAttribute("title", "Шаг назад");
    }
    if (Steps.CURRENT <= 1) {
        e.target.classList.add("disable");
        e.target.setAttribute("title", "Шаг назад: не активен");
    }
});

let play = document.querySelector(".play");
play.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("pause")) {
        e.target.classList.toggle("pause");
        e.target.setAttribute("title", "Приостановить анимацию");
        PlayerBoxController.playButton();
    } else {
        e.target.classList.toggle("pause");
        e.target.setAttribute("title", "Проиграть анимацию");
        PlayerBoxController.stopButton();
    }


});

let stop = document.querySelector(".stop");
stop.addEventListener("click", (e) => {
    e.preventDefault();
    PlayerBoxController.resetButton();
});
