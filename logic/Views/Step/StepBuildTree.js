import Invoker from "../Invoker.js";
import Globals from "../../../configs/Globals.js";

class StepBuildTree {
    static WAITING = "waiting";
    static SUM_VALUE = "sum-value";
    static DONE = "done";

    static WAITING_DESCRIPTION = "Массив автоматически заполняется случайными числами. Поменяйте входные данные, " +
        "если хотите, чтобы числа в исходном массиве изменились.<br>" +
        "В самом начале дерево Фенвика заполнено нулями и имеет ту же самую длину, что и исходный массив.<br>" +
        "Если хотите более подробно рассмотреть процесс заполенеия одной ячейки дерева Фенвика, то это можно сделать " +
        "во вкладке \"Обновление Дерева\".";
    static SUM_VALUE_DESCRIPTION = "Из исходного массива берётся подсвеченное чило и складывается с " +
        "каждым подсвеченным числом из дерева Фенвика.<br>Сложение начинается с текщего индекса исходного " +
        "массива, а следующий индекс считается по формуле:";
    static DONE_DESCRIPTION = "Построение дерева завершено";

    constructor(state, highlightFenwikTree, highlightSource, treeFenwikState, sourceState, additionData = []) {
        this.state = state;

        switch (state) {
            case StepBuildTree.WAITING:
                this.description = StepBuildTree.WAITING_DESCRIPTION;
                break;
            case StepBuildTree.SUM_VALUE:
                let indexesString = "";
                let index = parseInt(Globals.CURRENT_INDEX);
                while (index < Globals.globalFenwikLength) {
                    indexesString += (
                        "Сумма ячейки равна:<span>" +
                        additionData[1][index] +
                        " = " +
                        additionData[0] +
                        " + " +
                        (additionData[1][index] - additionData[0]) +
                        "</span>"
                    );
                    indexesString += (
                        "Следующий индекс " +
                        (((index | (index + 1)) > Globals.globalFenwikLength) ? "больше длинны массива, следовательно, дальше не идём" : "") +
                        "<span>" +
                        (index | (index + 1)) +
                        " = " +
                        index +
                        " | (" +
                        index +
                        " + " +
                        1 +
                        ")</span><br>"
                    );
                    index = index | (index + 1);
                }
                this.description = StepBuildTree.SUM_VALUE_DESCRIPTION
                                    + "<span>index = index | (index + 1)</span><br>"
                                    + indexesString;
                break;
            case StepBuildTree.DONE:
                this.description = StepBuildTree.DONE_DESCRIPTION;
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

export default StepBuildTree;