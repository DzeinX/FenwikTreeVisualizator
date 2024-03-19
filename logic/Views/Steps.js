import Globals from "../../configs/Globals.js";

class Steps {
    static STEPS_NEXT = Array();
    static CURRENT = 0;

    static pushStep(step) {
        if (Steps.CURRENT + 1 === Steps.STEPS_NEXT.length || Steps.STEPS_NEXT.length === 0) {
            Steps.STEPS_NEXT.push(step);
            return;
        }

        if (Steps.STEPS_NEXT[Steps.CURRENT].state === "waiting") {
            Steps.STEPS_NEXT.push(step);
        }
    }

    static nextStep() {
        Steps.CURRENT += 1;
        if (Steps.CURRENT > Steps.STEPS_NEXT.length - 1) {
            Steps.CURRENT = 0;
        }

        Steps.STEPS_NEXT[Steps.CURRENT].run(Steps.STEPS_NEXT[Steps.CURRENT]);
    }

    static prevStep() {
        if (Steps.CURRENT <= 1) {
            return;
        }

        Globals.CURRENT_INDEX -= 1;
        Steps.CURRENT -= 1;
        if (Steps.CURRENT < 0) {
            Steps.CURRENT = 0;
        }

        Steps.STEPS_NEXT[Steps.CURRENT].run(Steps.STEPS_NEXT[Steps.CURRENT]);
    }

    static clear() {
        Steps.STEPS_NEXT = Array();
        Steps.CURRENT = 0;
    }

    static currentStep() {
        return Steps.STEPS_NEXT[Steps.CURRENT];
    }
}

export default Steps;