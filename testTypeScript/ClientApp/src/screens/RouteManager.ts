// Common
import RouteInfo from "./../models/RouteInfo";
import OrderEdit from "./Admin/Service_Order/Edit";
import OrderAddNew from "./Admin/Service_Order/AddNew";
import UserDefault from "./User/Default";
import OrderDefault from "./Admin/Service_Order/Default";
import OrderDisplay from "./Admin/Service_Order/Display";
import CarDefault from "./Admin/Cars/Default";
import CarAddNew from "./Admin/Cars/AddNew";
import CarDisplay from "./Admin/Cars/Display";
import CarEdit from "./Admin/Cars/Edit";
import Login from "./Admin/Login/Login";


const RouteUrls = class {
    static Home: string = "home";
    static Default: string = "list";
    static AddNew: string = "addnew";
    static Edit: string = "edit";
    static Display: string = "display";
    static Setting: string = "setting";
    static Review: string = "review";
    static detail: string = "detail";
    static Test: string = "test";
    static Admin: string = "admin";
    static Order: string = "order";
    static Car: string = "car";
    static User: string = "user";


    static ExportProposal: string = "exportproposal";
    static ImportProposal: string = "importproposal";

    static TabHopDongEdit: string = 'mortgage-contract-edit';
    static TabHopDongDisplay: string = 'mortgage-contract-info';
};

/**
 * Full Route collection
 */
const RouteCollection: RouteInfo[] = [
    // Admin //
    // Trang Order
    new RouteInfo("/admin/Order/list", "", OrderDefault, true),
    new RouteInfo("/admin/Order/addnew", "", OrderAddNew, true),
    new RouteInfo("/admin/Order/edit", "/:id", OrderEdit, true),
    new RouteInfo("/admin/Order/display", "/:id", OrderDisplay, true),

    // Trang Car
    new RouteInfo("/admin/Car/list", "", CarDefault, true),
    new RouteInfo("/admin/Car/addnew", "", CarAddNew, true),
    new RouteInfo("/admin/Car/edit", "/:id", CarEdit, true),
    new RouteInfo("/admin/Car/display", "/:id", CarDisplay, true),

    // Trang User
    new RouteInfo("/Login", "", Login, true),
    new RouteInfo("/User/list", "", UserDefault, true),

];

const GetRouteInfoByPath = (path: string) => {
    path = path.toLowerCase();
    let enRoute = RouteCollection.find((en) => en.Path.toLowerCase() === path);
    return enRoute;
};

export { RouteUrls, RouteCollection, GetRouteInfoByPath };

