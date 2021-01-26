import AuthenticationService from "../service/AuthenticationService";
import createHOC from "../../misc/createHOC";

export default createHOC({authentication: new AuthenticationService()});
