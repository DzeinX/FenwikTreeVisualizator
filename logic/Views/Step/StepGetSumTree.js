import Invoker from "../Invoker.js";
import Globals from "../../../configs/Globals.js";

class StepGetSumTree {
    static WAITING = "waiting";
    static SUM_FROM = "sum-from";
    static SUM_TO = "sum-to";
    static DIFFERENCE = "difference";
    static DONE = "done";

    static WAITING_DESCRIPTION = "Заполните входные данные...";
    static SUM_FROM_DESCRIPTION_1 = "Сумма элементов исходного массива с ";
    static SUM_FROM_DESCRIPTION_2 = " Общая сумма высчитывается по сумме элементов, индексы которых вычисляются по формуле:";
    static SUM_TO_DESCRIPTION_1 = "Сумма элементов исходного массива с ";
    static SUM_TO_DESCRIPTION_2 = " Общая сумма высчитывается по сумме элементов, индексы которых вычисляются по формуле:";
    static DIFFERENCE_DESCRIPTION = "Берём запомненные ранее суммы левой и правой границ, и вычитаем из правой границы ";
    static DONE_DESCRIPTION = "Подсчёт суммы элементов завершён";

    constructor(state, highlightFenwikTree, highlightSource, treeFenwikState, sourceState, additionData = []) {
        this.state = state;

        switch (state) {
            case StepGetSumTree.WAITING:
                this.description = StepGetSumTree.WAITING_DESCRIPTION;
                break;
            case StepGetSumTree.SUM_FROM:
                let string_from = "";
                let index_from = additionData[1] - 1;
                let sum_from = 0;
                if (additionData[1] - 1 < 0) {
                    string_from += "<br>Текущую сумму не посчитать, так как индекс меньше нуля, поэтому сумма остаётся равной нулю.<br>";
                } else {
                    do {
                        string_from += "<br>Текущая сумма<br><span>" + (sum_from + Globals.FENWIK.btree[index_from]) + " = " + sum_from + " + " + ((Globals.FENWIK.btree[index_from] >= 0) ? Globals.FENWIK.btree[index_from] : ("(" + Globals.FENWIK.btree[index_from] + ")")) + "</span>";
                        string_from += "Следующий индекс " + (((index_from & (index_from + 1)) - 1) < 0 ? "получился меньше нуля, следовательно, дальше не идём" : "") + "<br><span>" + ((index_from & (index_from + 1)) - 1) + " = " + index_from + " & (" + index_from + " + 1) - 1" + "</span>";
                        sum_from += Globals.FENWIK.btree[index_from];
                        index_from = index_from & (index_from + 1);
                        index_from -= 1;
                    } while (index_from >= 0);
                }

                this.description = StepGetSumTree.SUM_FROM_DESCRIPTION_1 +
                    additionData[1] + " по " + additionData[2] + " элемент." +
                    StepGetSumTree.SUM_FROM_DESCRIPTION_2 +
                    "<span>index = index & (index + 1) - 1</span>" +
                    "Чтобы включить начальный элемент нужно посчитать сумму элемента стоящего до него, " +
                    "поэтому первый индекс равен " +
                    (additionData[1] - 1) + ", так как " + additionData[1] + " - 1 = " + (additionData[1] - 1) + ".<br>" +
                    string_from + "Сумму нужно запомнить, она нам понадобится в дальнейшем (она равна " + sum_from + ").<br>";
                break;
            case StepGetSumTree.SUM_TO:
                let string = "";
                let index = additionData[2];
                let sum = 0;
                do {
                    string += "<br>Текущая сумма<br><span>" + (sum + Globals.FENWIK.btree[index]) + " = " + sum + " + " + ((Globals.FENWIK.btree[index] >= 0) ? Globals.FENWIK.btree[index] : ("(" + Globals.FENWIK.btree[index] + ")")) + "</span>";
                    string += "Следующий индекс " + (((index & (index + 1)) - 1) < 0 ? "получился меньше нуля, следовательно, дальше не идём" : "") + "<br><span>" + ((index & (index + 1)) - 1) + " = " + index + " & (" + index + " + 1) - 1" + "</span>";
                    sum += Globals.FENWIK.btree[index];
                    index = index & (index + 1);
                    index -= 1;
                } while (index >= 0);

                this.description = StepGetSumTree.SUM_TO_DESCRIPTION_1 +
                    additionData[1] + " по " + additionData[2] + " элемент." +
                    StepGetSumTree.SUM_TO_DESCRIPTION_2 +
                    "<span>index = index & (index + 1) - 1</span>" +
                    "Этот элемент уже включён, поэтому первый индекс равен " +
                    "поэтому первый индекс равен " +
                    (additionData[2]) + "<br>" +
                    string + "По аналогии с предыдущим шагом, сумму нужно запомнить, она нам понадобится в следующем шаге (она равна " + sum + ").<br>";
                break;
            case StepGetSumTree.DIFFERENCE:
                this.description = StepGetSumTree.DIFFERENCE_DESCRIPTION + "(" + additionData[1] + ") левую (" + additionData[2] + "):" +
                    "<span>" + additionData[0] + " = " + additionData[1] + " - " + ((additionData[2] >= 0) ? additionData[2] : ("(" + additionData[2] + ")")) + "</span>" +
                    "В итоге получилась сумма равная " + additionData[0] + ".";
                break;
            case StepGetSumTree.DONE:
                this.description = StepGetSumTree.DONE_DESCRIPTION;
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

export default StepGetSumTree;