import "../../../logic/Views/index.js";
import "../../../logic/Callbacks/index.js";
import "../../../logic/FenwikTree/index.js";
import Tabs from "../../../logic/Views/Tabs.js";
import Globals from "../../../configs/Globals.js";
import FenwikTree from "../../../logic/FenwikTree/FenwikTree.js";
import fillFenwikTree from "../../../logic/FenwikTree/FillFenwikTree.js";

const __ = new Globals();
Globals.FENWIK = new FenwikTree(fillFenwikTree());
const _ = new Tabs();
Tabs.changeTab(Tabs.GLOBAL_TAB_STATE);

