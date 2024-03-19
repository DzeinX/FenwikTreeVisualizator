import DescriptionComponent from "../../primitives/web/DescriptionComponent/DescriptionComponent.js";
import ArrayComponent from "../../primitives/web/ArrayComponent/ArrayComponent.js";

class Invoker {
    static ROOT = document.getElementById("root");

    render(step) {
        this.clearRoot();
        this.createSourceArray(step.highlightSource, step.sourceState);
        this.createFenwikTreeArray(step.highlightFenwikTree, step.treeFenwikState);
        this.createDescription(step.description);
    }

    createDescription(description) {
        const descriptionComponent =  DescriptionComponent.createDescription(description);
        this.addToRootRoot(descriptionComponent);
    }

    createSourceArray(highlight, source) {
        const arrayComponent = ArrayComponent.createArray(highlight, source, "Исходный Массив");
        this.addToRootRoot(arrayComponent);
    }

    createFenwikTreeArray(highlight, fenwik_tree) {
        const arrayComponent = ArrayComponent.createArray(highlight, fenwik_tree, "Дерево Фенвика");
        this.addToRootRoot(arrayComponent);
    }

    clearRoot() {
        Invoker.ROOT.innerHTML = "";
    }

    addToRootRoot(component) {
        Invoker.ROOT.appendChild(component);
    }
}

export default Invoker;