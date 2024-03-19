import Globals from "../../../configs/Globals.js";
import Steps from "../Steps.js";
import StepGetSumTree from "../Step/StepGetSumTree.js";
import Tabs from "../Tabs.js";

class PlayerBoxCallbacksGetSum {
    static LEFT_SUM = 0;
    static RIGHT_SUM = 0;

    static indexFrom;
    static indexTo;

    static createSteps() {
        let indexFrom = document.querySelector("#from");
        let indexTo = document.querySelector("#to");

        let fromMessageBox = document.querySelector("#from-message");
        let toMessageBox = document.querySelector("#to-message");

        if (indexFrom.value === "") {
            fromMessageBox.innerText = "Значение не заполенено";
            return;
        }
        fromMessageBox.innerText = "";

        if (indexTo.value === "") {
            toMessageBox.innerText = "Значение не заполенено";
            return;
        }
        toMessageBox.innerText = "";

        if (parseInt(indexFrom.value) > parseInt(indexTo.value)) {
            fromMessageBox.innerText = "Сумма от не должна быть меньше суммы до";
            return;
        }
        fromMessageBox.innerText = "";

        PlayerBoxCallbacksGetSum.indexFrom = indexFrom;
        PlayerBoxCallbacksGetSum.indexTo = indexTo;

        while (Steps.currentStep().state !== StepGetSumTree.DONE) {
            PlayerBoxCallbacksGetSum.tabGetSumNextStepButton();
            Steps.CURRENT += 1;
        }
        Steps.CURRENT = 0;
        Globals.CURRENT_INDEX = 1;
    }

    static tabGetSumNextStepButton() {
        if (Steps.currentStep().state === StepGetSumTree.WAITING) {
            PlayerBoxCallbacksGetSum.indexFrom.disabled = true;
            PlayerBoxCallbacksGetSum.indexTo.disabled = true;

            let highlightSource = PlayerBoxCallbacksGetSum.getHighlightSourceArray(PlayerBoxCallbacksGetSum.indexFrom);
            let [highlightFenwik, leftSum] = PlayerBoxCallbacksGetSum.getHighlightFenwikArray(PlayerBoxCallbacksGetSum.indexFrom, false)
            PlayerBoxCallbacksGetSum.LEFT_SUM = leftSum;

            let sourceState = [];
            for (let i = 0; i < Globals.globalFenwikLength; i++) {
                sourceState.push(Globals.FENWIK.get(i));
            }

            const step = new StepGetSumTree(
                StepGetSumTree.SUM_FROM,
                highlightFenwik,
                highlightSource,
                Globals.FENWIK.btree,
                sourceState,
                [
                    PlayerBoxCallbacksGetSum.LEFT_SUM,
                    parseInt(PlayerBoxCallbacksGetSum.indexFrom.value),
                    parseInt(PlayerBoxCallbacksGetSum.indexTo.value)
                ]
            );
            Steps.pushStep(step);
            return;
        }

        if (Steps.currentStep().state === StepGetSumTree.SUM_FROM) {
            let highlightSource = PlayerBoxCallbacksGetSum.getHighlightSourceArray(PlayerBoxCallbacksGetSum.indexTo);
            let [highlightFenwik, rightSum] = PlayerBoxCallbacksGetSum.getHighlightFenwikArray(PlayerBoxCallbacksGetSum.indexTo, true)
            PlayerBoxCallbacksGetSum.RIGHT_SUM = rightSum;

            let step = new StepGetSumTree(
                StepGetSumTree.SUM_TO,
                highlightFenwik,
                highlightSource,
                Globals.FENWIK.btree,
                PlayerBoxCallbacksGetSum.getFenwikRealArray(),
                [
                    PlayerBoxCallbacksGetSum.RIGHT_SUM,
                    parseInt(PlayerBoxCallbacksGetSum.indexFrom.value),
                    parseInt(PlayerBoxCallbacksGetSum.indexTo.value)
                ]
            );

            Steps.pushStep(step);
            return;
        }

        if (Steps.currentStep().state === StepGetSumTree.SUM_TO) {
            const highlight = new Array(Globals.globalFenwikLength).fill(0);
            let highlightSource = PlayerBoxCallbacksGetSum.getHighlightSourceArrayRange(PlayerBoxCallbacksGetSum.indexFrom, PlayerBoxCallbacksGetSum.indexTo);

            Globals.DIFFERENCE = PlayerBoxCallbacksGetSum.RIGHT_SUM - PlayerBoxCallbacksGetSum.LEFT_SUM;

            let step = new StepGetSumTree(
                StepGetSumTree.DIFFERENCE,
                highlight,
                highlightSource,
                Globals.FENWIK.btree,
                PlayerBoxCallbacksGetSum.getFenwikRealArray(),
                [
                    Globals.DIFFERENCE,
                    PlayerBoxCallbacksGetSum.RIGHT_SUM,
                    PlayerBoxCallbacksGetSum.LEFT_SUM
                ]
            );

            Steps.pushStep(step);
            return;
        }

        if (Steps.currentStep().state === StepGetSumTree.DIFFERENCE) {
            const highlight = new Array(Globals.globalFenwikLength).fill(0);

            let step = new StepGetSumTree(
                StepGetSumTree.DONE,
                highlight,
                highlight,
                Globals.FENWIK.btree,
                PlayerBoxCallbacksGetSum.getFenwikRealArray()
            );

            Steps.stepsNext = [];
            Steps.pushStep(step);
        }
    }

    static updateTab() {
        Tabs.createGetSumTab();

        PlayerBoxCallbacksGetSum.indexFrom.value = "";
        PlayerBoxCallbacksGetSum.indexTo.value = "";

        PlayerBoxCallbacksGetSum.indexFrom.disabled = false;
        PlayerBoxCallbacksGetSum.indexTo.disabled = false;

        Globals.CURRENT_INDEX = 0;
        Globals.DIFFERENCE = 0;
        PlayerBoxCallbacksGetSum.LEFT_SUM = 0;
        PlayerBoxCallbacksGetSum.RIGHT_SUM = 0;
    }

    static getHighlightSourceArray(input) {
        let highlightSource = new Array(Globals.globalFenwikLength).fill(0);
        highlightSource[parseInt(input.value)] = 1;
        return highlightSource;
    }

    static getHighlightSourceArrayRange(inputFrom, inputTo) {
        let highlightSource = new Array(Globals.globalFenwikLength).fill(0);
        for (let i = parseInt(inputFrom.value); i <= parseInt(inputTo.value); i++) {
            highlightSource[i] = 1;
        }
        return highlightSource;
    }

    static getHighlightFenwikArray(input, isInclude = false) {
        let highlightFenwik = new Array(Globals.globalFenwikLength).fill(0);
        let index = parseInt(input.value) + (isInclude ? 0 : (-1));
        let sum = 0;
        while (index >= 0) {
            highlightFenwik[index] = 1;
            sum += Globals.FENWIK.btree[index];
            index = index & (index + 1);
            index -= 1;
        }
        return [highlightFenwik, sum];
    }

    static getFenwikRealArray() {
        let realArray = [];
        for (let i = 0; i < Globals.globalFenwikLength; i++) {
            realArray.push(Globals.FENWIK.get(i));
        }
        return realArray
    }

    static getHighlightArray() {
        let highlightArray = new Array(Globals.globalFenwikLength);
        highlightArray.fill(0);
        highlightArray[Globals.CURRENT_INDEX] = 1;
        return highlightArray;
    }
}

export default PlayerBoxCallbacksGetSum;