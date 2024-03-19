import Tabs from "../Tabs.js";
import PlayerBoxCallbacksUpdate from "./PlayerBoxCallbacksUpdate.js";
import PlayerBoxCallbacksBuild from "./PlayerBoxCallbacksBuild.js";
import PlayerBoxCallbacksGetSum from "./PlayerBoxCallbacksGetSum.js";
import Steps from "../Steps.js";
import Globals from "../../../configs/Globals.js";
import StepUpdateTree from "../Step/StepUpdateTree.js";

class PlayerBoxController {
    static prom = null;

    static nextStepButton() {
        if (Steps.CURRENT === 0) {
            switch (Tabs.GLOBAL_TAB_STATE) {
                case Tabs.TAB_LIST[0].getAttribute("data-tab-name"):
                    PlayerBoxCallbacksBuild.createSteps();
                    break;
                case Tabs.TAB_LIST[1].getAttribute("data-tab-name"):
                    PlayerBoxCallbacksUpdate.createSteps();
                    break;
                case Tabs.TAB_LIST[2].getAttribute("data-tab-name"):
                    PlayerBoxCallbacksGetSum.createSteps();
                    break;
            }
        }

        if (Steps.currentStep().state === StepUpdateTree.DONE) {
            switch (Tabs.GLOBAL_TAB_STATE) {
                case Tabs.TAB_LIST[0].getAttribute("data-tab-name"):
                    PlayerBoxCallbacksBuild.updateTab();
                    break;
                case Tabs.TAB_LIST[1].getAttribute("data-tab-name"):
                    PlayerBoxCallbacksUpdate.updateTab();
                    break;
                case Tabs.TAB_LIST[2].getAttribute("data-tab-name"):
                    PlayerBoxCallbacksGetSum.updateTab();
                    break;
            }
        }

        Steps.nextStep();
    }

    static prevStepButton() {
        Steps.prevStep();
    }

    static async playButton() {
        if (PlayerBoxController.prom !== null) {
            return;
        }
        const milSecondsPerStep = document.getElementById("seconds-per-step");

        if (Steps.STEPS_NEXT[Steps.CURRENT].state <= "done") {
            document.querySelector(".step-prev").classList.add("disable");
            document.querySelector(".step-prev").setAttribute("title", "Шаг назад: не активен");
        }

        PlayerBoxController.nextStepButton();
        while (Steps.STEPS_NEXT[Steps.CURRENT].state !== "done") {
            PlayerBoxController.prom = PlayerBoxController.sleep(parseInt(milSecondsPerStep.value));
            await PlayerBoxController.prom.promise.then();
            PlayerBoxController.nextStepButton();
            if (Steps.CURRENT > 1) {
                document.querySelector(".step-prev").classList.remove("disable");
                document.querySelector(".step-prev").setAttribute("title", "Шаг назад");
            }
        }
        PlayerBoxController.prom = null;
        let play = document.querySelector(".play");
        if (play.classList.contains("pause")) {
            play.classList.remove("pause");
        }
    }

    static async stopButton() {
        PlayerBoxController.prom.cancel();
        PlayerBoxController.prom = null;
    }

    static sleep(timeInSeconds) {
        let timeout;
        const prom = new Promise((r) => {
            timeout = setTimeout(r, timeInSeconds)
        });
        return {
            promise: prom,
            cancel: function () { clearTimeout(timeout); }
        };
    }

    static resetButton() {
        Tabs.reloadTabs(Tabs.GLOBAL_TAB_STATE);
        if (PlayerBoxController.prom !== null) {
            PlayerBoxController.prom.cancel();
            PlayerBoxController.prom = null;
        }

        let play = document.querySelector(".play");
        if (play.classList.contains("pause")) {
            play.classList.remove("pause");
        }
        Globals.CURRENT_INDEX_STATE = 0;
        Steps.CURRENT = 0;
    }
}

export default PlayerBoxController;