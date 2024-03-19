import StepUpdateTree from "./Step/StepUpdateTree.js";
import Steps from "./Steps.js";
import Globals from "../../configs/Globals.js";
import PlayerBoxCallbacks from "./PlayerBoxCallbacks/PlayerBoxCallbacksUpdate.js";
import StepBuildTree from "./Step/StepBuildTree.js";
import {
    refreshLengthInput, refreshRangeHighInput,
    refreshRangeLowInput,
    refreshTimeInput,
    refreshValueInput
} from "../Callbacks/UpdateTabCallbacks.js";
import {refreshIndexInput} from "../Callbacks/UpdateTabCallbacks.js";
import PlayerBoxController from "./PlayerBoxCallbacks/PlayerBoxController.js";
import PlayerBoxCallbacksBuild from "./PlayerBoxCallbacks/PlayerBoxCallbacksBuild.js";
import StepGetSumTree from "./Step/StepGetSumTree.js";

class Tabs {
    static CHECKED_TAB_BOX = document.querySelector("#action");
    static TAB_LIST = document.querySelectorAll(".tab");
    static GLOBAL_TAB_STATE;
    static #inputData = document.getElementById("input-data");

    constructor() {
        Tabs.CHECKED_TAB_BOX.innerText = Tabs.TAB_LIST[0].innerText;
        Tabs.GLOBAL_TAB_STATE = Tabs.TAB_LIST[0].getAttribute("data-tab-name");

        Tabs.TAB_LIST.forEach((tab) => tab.addEventListener("click", (e) => {
            e.preventDefault();

            const tabName = e.target.getAttribute("data-tab-name")
            if (Tabs.GLOBAL_TAB_STATE !== tabName) {
                Tabs.CHECKED_TAB_BOX.innerText = e.target.innerText;
                Tabs.GLOBAL_TAB_STATE = tabName;
                Tabs.changeTab(tabName);
            }
        }));
    }

    static changeTab() {
        PlayerBoxController.resetButton(Tabs.GLOBAL_TAB_STATE);
        Globals.CURRENT_INDEX_STATE = 0;
    }

    static reloadTabs(tabName) {
        document.querySelector(".step-prev").classList.add("disable");
        document.querySelector(".step-prev").setAttribute("title", "Шаг назад: не активен");
        switch (tabName) {
            case "createTree":
                Globals.CURRENT_INDEX = 0;
                Tabs.createBuildTab();
                Tabs.createBuildTabInputPanel();
                PlayerBoxCallbacksBuild.fenwikStepByStep = Array(Globals.globalFenwikLength).fill(0);
                break;
            case "updateTree":
                Globals.CURRENT_INDEX = 0;
                Tabs.createUpdateTab();
                Tabs.createUpdateTabInputPanel();
                break;
            case "getSum":
                Globals.CURRENT_INDEX = 0;
                Tabs.createGetSumTab();
                Tabs.createGetSumTabInputPanel();
                break;
        }
        refreshTimeInput();
        Steps.nextStep();
    }

    static reloadTabsWithoutPanel(tabName) {
        document.querySelector(".step-prev").classList.add("disable");
        document.querySelector(".step-prev").setAttribute("title", "Шаг назад: не активен");
        switch (tabName) {
            case "createTree":
                Globals.CURRENT_INDEX = 0;
                Tabs.createBuildTab();
                PlayerBoxCallbacksBuild.fenwikStepByStep = Array(Globals.globalFenwikLength).fill(0);
                break;
            case "updateTree":
                Globals.CURRENT_INDEX = 0;
                Tabs.createUpdateTab();
                break;
            case "getSum":
                Globals.CURRENT_INDEX = 0;
                Tabs.createGetSumTab();
                break;
        }
        Steps.nextStep();
    }

    static createUpdateTab() {
        const sourceState = PlayerBoxCallbacks.getFenwikRealArray();
        const highlight = new Array(Globals.globalFenwikLength);
        highlight.fill(0);

        let step = new StepUpdateTree(
            StepUpdateTree.WAITING,
            highlight,
            highlight,
            Globals.FENWIK.btree,
            sourceState
        );

        Steps.STEPS_NEXT = Array();
        Steps.CURRENT = 0;

        Steps.pushStep(step);
        Steps.nextStep();
    }

    static createBuildTab() {
        const sourceState = PlayerBoxCallbacks.getFenwikRealArray();
        const zerosArray = new Array(Globals.globalFenwikLength);
        zerosArray.fill(0);

        let step = new StepBuildTree(
            StepBuildTree.WAITING,
            zerosArray,
            zerosArray,
            zerosArray,
            sourceState
        );

        Steps.STEPS_NEXT = Array();
        Steps.CURRENT = 0;

        Steps.pushStep(step);
        Steps.nextStep();
    }

    static createGetSumTab() {
        const sourceState = PlayerBoxCallbacks.getFenwikRealArray();
        const highlight = new Array(Globals.globalFenwikLength);
        highlight.fill(0);

        let step = new StepGetSumTree(
            StepGetSumTree.WAITING,
            highlight,
            highlight,
            Globals.FENWIK.btree,
            sourceState
        );

        Steps.STEPS_NEXT = Array();
        Steps.CURRENT = 0;

        Steps.pushStep(step);
        Steps.nextStep();
    }

    static createGetSumTabInputPanel() {
        Tabs.clearInputData();

        const inputBox1 = Tabs.createInput("from", "Сумма от (включительно)", "");
        const inputBox2 = Tabs.createInput("to", "Сумма до (включительно)", "");

        Tabs.#inputData.appendChild(inputBox1);
        Tabs.#inputData.appendChild(inputBox2);

        refreshRangeLowInput();
        refreshRangeHighInput();
    }

    static createInput(inputId, labelText, setValue) {
        const inputBox = document.createElement("div");
        inputBox.setAttribute("class", "input-box");

        const labelFrom = document.createElement("label");
        labelFrom.setAttribute("for", inputId);
        labelFrom.innerText = labelText;

        const inputFrom = document.createElement("input");
        inputFrom.setAttribute("type", "text");
        inputFrom.setAttribute("class", "input");
        inputFrom.setAttribute("id", inputId);
        inputFrom.setAttribute("value", "" + setValue)

        const fromMessage = document.createElement("span");
        fromMessage.setAttribute("class", "message");
        fromMessage.setAttribute("id", inputId + "-message");

        inputBox.appendChild(labelFrom);
        inputBox.appendChild(inputFrom);
        inputBox.appendChild(fromMessage);

        return inputBox;
    }

    static createBuildTabInputPanel() {
        Tabs.clearInputData();

        const inputBox = Tabs.createInput("length", "Длина массива", Globals.globalFenwikLength);

        Tabs.#inputData.appendChild(inputBox);

        refreshLengthInput();
    }

    static createUpdateTabInputPanel() {
        Tabs.clearInputData();

        const inputBox1 = Tabs.createInput("index", "Индекс элемента", "");
        const inputBox2 = Tabs.createInput("source_value", "Новое значение элемента", "");

        Tabs.#inputData.appendChild(inputBox1);
        Tabs.#inputData.appendChild(inputBox2);

        refreshIndexInput();
        refreshValueInput();
    }

    static clearInputData() {
        Tabs.#inputData.innerHTML = "";
        const title = document.createElement("div");
        title.innerText = "Входные данные";
        title.setAttribute("class", "title");

        Tabs.#inputData.appendChild(title);
    }
}

export default Tabs;