import createHOC from "../../misc/createHOC";
import SketchService from "../service/SketchService";

export default createHOC({sketch: new SketchService()});
