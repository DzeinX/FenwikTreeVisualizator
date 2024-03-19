import Globals from "../../../configs/Globals.js";
import Steps from "../Steps.js";
import StepBuildTree from "../Step/StepBuildTree.js";
import PlayerBoxCallbacks from "./PlayerBoxCallbacksUpdate.js";
import Tabs from "../Tabs.js";

class PlayerBoxCallbacksBuild {
    static fenwikStepByStep = new Array(Globals.globalFenwikLength).fill(0);

    static createSteps() {
        while (Globals.CURRENT_INDEX_STATE <= Globals.globalFenwikLength) {
            PlayerBoxCallbacksBuild.tabBuildNextStepButton();
            Steps.CURRENT += 1;
        }
        Steps.CURRENT = 0;
        Globals.CURRENT_INDEX_STATE = 1;
    }

    static tabBuildNextStepButton() {
        if (Steps.currentStep().state === StepBuildTree.SUM_VALUE ||
            Steps.currentStep().state === StepBuildTree.WAITING) {
            if (Globals.CURRENT_INDEX_STATE < Globals.globalFenwikLength) {
                const sourceState = PlayerBoxCallbacksBuild.getFenwikRealArray();

                let highlightingIndexes = Array(Globals.globalFenwikLength).fill(0);
                let index = Globals.CURRENT_INDEX_STATE;
                while (index < Globals.globalFenwikLength) {
                    highlightingIndexes[index] = 1;
                    PlayerBoxCallbacksBuild.fenwikStepByStep[index] += sourceState[Globals.CURRENT_INDEX];
                    index = index | (index + 1);
                }

                const highlightSource = PlayerBoxCallbacksBuild.getHighlightArray();

                let step = new StepBuildTree(
                    StepBuildTree.SUM_VALUE,
                    highlightingIndexes,
                    highlightSource,
                    PlayerBoxCallbacksBuild.fenwikStepByStep,
                    sourceState,
                    [
                        sourceState[Globals.CURRENT_INDEX],
                        PlayerBoxCallbacksBuild.fenwikStepByStep
                    ]
                );

                Steps.pushStep(step);

                Globals.CURRENT_INDEX += 1;
                Globals.CURRENT_INDEX_STATE += 1;
            } else {
                const sourceState = PlayerBoxCallbacks.getFenwikRealArray();

                const zerosArray = new Array(Globals.globalFenwikLength);
                zerosArray.fill(0);

                let step = new StepBuildTree(
                    StepBuildTree.DONE,
                    zerosArray,
                    zerosArray,
                    PlayerBoxCallbacksBuild.fenwikStepByStep,
                    sourceState
                );

                Steps.pushStep(step);

                Globals.CURRENT_INDEX += 1;
                Globals.CURRENT_INDEX_STATE += 1;
                Globals.FENWIK_STATE = sourceState;
            }
        }
    }

    static updateTab() {
        Tabs.createBuildTab();
        Globals.CURRENT_INDEX = 0;
        Globals.CURRENT_INDEX_STATE = 0;
        PlayerBoxCallbacksBuild.fenwikStepByStep = new Array(Globals.globalFenwikLength).fill(0);
    }

    static getFenwikRealArray() {
        let realArray = [];
        for (let i = 0; i < Globals.FENWIK.lenght; i++) {
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

export default PlayerBoxCallbacksBuild;