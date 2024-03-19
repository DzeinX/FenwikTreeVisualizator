import StepUpdateTree from "../Step/StepUpdateTree.js";
import Globals from "../../../configs/Globals.js";
import Steps from "../Steps.js";
import Tabs from "../Tabs.js";

class PlayerBoxCallbacksUpdate {
    static index;
    static value;

    static createSteps() {
        let index = document.querySelector("#index");
        let value = document.querySelector("#source_value");

        let indexMessageBox = document.querySelector("#index-message");
        let valueMessageBox = document.querySelector("#source_value-message");

        if (index.value === "") {
            indexMessageBox.innerText = "Значение не заполенено";
            return;
        }
        indexMessageBox.innerText = "";

        if (value.value === "") {
            valueMessageBox.innerText = "Значение не заполенено";
            return;
        }
        valueMessageBox.innerText = "";

        PlayerBoxCallbacksUpdate.index = index;
        PlayerBoxCallbacksUpdate.value = value;

        while (Globals.CURRENT_INDEX <= Globals.FENWIK.lenght) {
            PlayerBoxCallbacksUpdate.tabUpdateNextStepButton();
            Steps.CURRENT += 1;
        }
        Steps.CURRENT = 0;
        Globals.CURRENT_INDEX_STATE = 1;
    }

    static tabUpdateNextStepButton() {
        if (Steps.currentStep().state === StepUpdateTree.WAITING) {
            PlayerBoxCallbacksUpdate.index.disabled = true;
            PlayerBoxCallbacksUpdate.value.disabled = true;

            let highlightSource = new Array(Globals.globalFenwikLength);
            highlightSource.fill(0);
            highlightSource[PlayerBoxCallbacksUpdate.index.value] = 1;

            let sourceState = [];
            for (let i = 0; i < Globals.FENWIK.lenght; i++) {
                sourceState.push(Globals.FENWIK.get(i));
            }

            Globals.CURRENT_INDEX = PlayerBoxCallbacksUpdate.index.value;

            const step = new StepUpdateTree(
                StepUpdateTree.GET_OLD_VALUE,
                [0, 0, 0],
                highlightSource,
                Globals.FENWIK.btree,
                sourceState,
                [sourceState[PlayerBoxCallbacksUpdate.index.value]]
            );
            Steps.pushStep(step);

            Globals.CURRENT_INDEX_STATE += 1;
            return;
        }

        if (Steps.currentStep().state === StepUpdateTree.GET_OLD_VALUE) {
            const highlightSource = PlayerBoxCallbacksUpdate.getHighlightArray();
            const sourceState = PlayerBoxCallbacksUpdate.getFenwikRealArray();

            let step = new StepUpdateTree(
                StepUpdateTree.SET_DIFFERENCE,
                [0, 0, 0],
                highlightSource,
                Globals.FENWIK.btree,
                sourceState,
                [PlayerBoxCallbacksUpdate.value.value, sourceState[Globals.CURRENT_INDEX]]
            );

            Steps.pushStep(step);

            Globals.CURRENT_INDEX_STATE += 1;
            return;
        }

        if (Steps.currentStep().state === StepUpdateTree.SET_DIFFERENCE) {
            const highlightSource = PlayerBoxCallbacksUpdate.getHighlightArray();
            const sourceState = PlayerBoxCallbacksUpdate.getFenwikRealArray();

            Globals.DIFFERENCE = parseInt(PlayerBoxCallbacksUpdate.value.value) - sourceState[Globals.CURRENT_INDEX];

            let step = new StepUpdateTree(
                StepUpdateTree.PLUS_DIFFERENCE,
                highlightSource,
                highlightSource,
                Globals.FENWIK.btree,
                sourceState,
                [
                    Globals.FENWIK.btree[Globals.CURRENT_INDEX],
                    Globals.DIFFERENCE,
                    parseInt(Globals.CURRENT_INDEX)
                ]
            );
            Globals.FENWIK.setValueByStep(Globals.CURRENT_INDEX, Globals.DIFFERENCE);

            Globals.HIGHLIGHT_SOURCE = highlightSource;
            Globals.SOURCE_STATE = sourceState;

            Steps.pushStep(step);

            Globals.CURRENT_INDEX_STATE += 1;
            return;
        }

        if (Steps.currentStep().state === StepUpdateTree.PLUS_DIFFERENCE) {
            Globals.CURRENT_INDEX = parseInt(Globals.CURRENT_INDEX) | (parseInt(Globals.CURRENT_INDEX) + 1);

            if (Globals.CURRENT_INDEX > Globals.FENWIK.lenght) {
                let sourceState = [];
                for (let i = 0; i < Globals.FENWIK.lenght; i++) {
                    sourceState.push(Globals.FENWIK.get(i));
                }

                let step = new StepUpdateTree(
                    StepUpdateTree.DONE,
                    [0, 0, 0],
                    [0, 0, 0],
                    Globals.FENWIK.btree,
                    sourceState
                )
                Steps.pushStep(step);

                Globals.CURRENT_INDEX_STATE += 1;
            } else {
                let highlightSource = new Array(Globals.FENWIK.lenght);
                highlightSource.fill(0);
                highlightSource[Globals.CURRENT_INDEX] = 1;

                let step = new StepUpdateTree(
                    StepUpdateTree.PLUS_DIFFERENCE,
                    highlightSource,
                    Globals.HIGHLIGHT_SOURCE,
                    Globals.FENWIK.btree,
                    Globals.SOURCE_STATE,
                    [
                        Globals.FENWIK.btree[Globals.CURRENT_INDEX],
                        Globals.DIFFERENCE,
                        parseInt(Globals.CURRENT_INDEX)
                    ]
                );
                Globals.FENWIK.setValueByStep(parseInt(Globals.CURRENT_INDEX), Globals.DIFFERENCE);

                Steps.pushStep(step);

                Globals.CURRENT_INDEX_STATE += 1;
            }
        }
    }

    static updateTab() {
        Globals.CURRENT_INDEX = 0;

        PlayerBoxCallbacksUpdate.index.value = "";
        PlayerBoxCallbacksUpdate.value.value = "";

        PlayerBoxCallbacksUpdate.index.disabled = false;
        PlayerBoxCallbacksUpdate.value.disabled = false;

        Tabs.createUpdateTab();
    }

    static getFenwikRealArray() {
        let realArray = [];
        for (let i = 0; i < Globals.globalFenwikLength; i++) {
            realArray.push(Globals.FENWIK.get(i));
        }
        return realArray;
    }

    static getHighlightArray() {
        let highlightArray = new Array(Globals.FENWIK.lenght);
        highlightArray.fill(0);
        highlightArray[Globals.CURRENT_INDEX] = 1;
        return highlightArray;
    }
}

export default PlayerBoxCallbacksUpdate;