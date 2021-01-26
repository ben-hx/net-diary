import createHOC from "../../misc/createHOC";
import HomeService from "../service/HomeService";

export default createHOC({home: new HomeService()});
