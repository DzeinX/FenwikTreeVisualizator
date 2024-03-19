import Invoker from "../Invoker.js";

class StepUpdateTree {
    static WAITING = "waiting";
    static GET_OLD_VALUE = "get-old-value";
    static SET_DIFFERENCE = "set-difference";
    static PLUS_DIFFERENCE = "plus-difference";
    static DONE = "done";

    static WAITING_DESCRIPTION = "Заполните входные данные...";
    static GET_OLD_VALUE_DESCRIPTION_1 = "Берём из исходного массива элемент с индексом ";
    static GET_OLD_VALUE_DESCRIPTION_2 = " и запоминаем его.";
    static SET_DIFFERENCE_DESCRIPTION_1 = "Находим разность между введённым числом ";
    static SET_DIFFERENCE_DESCRIPTION_2 = " и элементом массива, который был запомнен ранее";
    static SET_DIFFERENCE_DESCRIPTION_3 = " по следующей формуле:";
    static PLUS_DIFFERENCE_DESCRIPTION_1 = "В дереве Фенвика складываем полученную разность с обновлёным элементом:<br>";
    static PLUS_DIFFERENCE_DESCRIPTION_2 = "Далее, вычисляем следующий индекс элемента по формуле <br>новый_индекс = текущий_индекс | (текущий_индекс + 1):<br>";
    static DONE_DESCRIPTION = "Построение дерева завершено";

    constructor(state, highlightFenwikTree, highlightSource, treeFenwikState, sourceState, additionData = []) {
        this.state = state;

        switch (state) {
            case StepUpdateTree.WAITING:
                this.description = StepUpdateTree.WAITING_DESCRIPTION;
                break;
            case StepUpdateTree.GET_OLD_VALUE:
                this.description = StepUpdateTree.GET_OLD_VALUE_DESCRIPTION_1
                    + highlightSource.indexOf(1)
                    + " (число " + additionData[0] + ")"
                    + StepUpdateTree.GET_OLD_VALUE_DESCRIPTION_2;
                break;
            case StepUpdateTree.SET_DIFFERENCE:
                this.description = StepUpdateTree.SET_DIFFERENCE_DESCRIPTION_1
                    + " (число " + additionData[0] + ") "
                    + StepUpdateTree.SET_DIFFERENCE_DESCRIPTION_2
                    + " (число " + additionData[1] + ") "
                    + StepUpdateTree.SET_DIFFERENCE_DESCRIPTION_3 + "<br>"
                    + "Разница = Введённое число - Число исходного массива <br>"
                    + "<span>" + (additionData[0] - additionData[1]) + " = " + additionData[0] + " - " + ((additionData[1] >= 0) ? additionData[1] : ("(" + additionData[1] + ")")) + "</span>";
                break;
            case StepUpdateTree.PLUS_DIFFERENCE:
                const newIndex = additionData[2] | (additionData[2] + 1);
                this.description = StepUpdateTree.PLUS_DIFFERENCE_DESCRIPTION_1
                    + "<span>" + (additionData[0] + additionData[1]) + " = " + additionData[0] + " + " + additionData[1] + "</span>"
                    + "Потом записываем его на место старого элемента в дереве Фенвика.<br>"
                    + StepUpdateTree.PLUS_DIFFERENCE_DESCRIPTION_2
                    + "<span>" + newIndex + " = " + additionData[2] + " | (" + additionData[2] + " + " + "1)" + "</span>"
                    + ((newIndex > treeFenwikState.length - 1) ? ("Так как " + newIndex + " элемента у дерева Фенвика нет, то больше менять элементов не нужно.") : "");
                break;
            case StepUpdateTree.DONE:
                this.description = StepUpdateTree.DONE_DESCRIPTION;
                break;
        }

        this.highlightFenwikTree = highlightFenwikTree.slice();
        this.highlightSource = highlightSource.slice();

        this.invoker = new Invoker();

        this.treeFenwikState = treeFenwikState.slice();
        this.sourceState = sourceState.slice();
    }

    run(step) {
        this.invoker.render(step);
    }
}

export default StepUpdateTree;