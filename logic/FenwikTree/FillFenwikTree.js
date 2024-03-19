import Globals from "../../configs/Globals.js";

function fillFenwikTree() {
    return Array.from(
        {length: Globals.globalFenwikLength},
        () => Math.floor(Math.random() * ((Math.abs(Globals.minRandomNumber)) + Globals.maxRandomNumber) - (Math.abs(Globals.minRandomNumber)))
    )
}

export default fillFenwikTree;
