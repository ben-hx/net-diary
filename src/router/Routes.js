import Home from "../home/component/Home";
import Sketch from "../sketch/component/Sketch";
import Login from "../authentication/login/component/Login";

const Routes = {
    'login': {
        root: '/login',
        path: '/login',
        component: Login,
        isProtected: false,
    },
    'home': {
        root: '/home',
        path: '/home/:date?',
        component: Home,
        isProtected: true,
    },
    'sketch': {
        root: '/sketch',
        path: '/sketch',
        component: Sketch,
        isProtected: true,
    }
}

export default Routes;



