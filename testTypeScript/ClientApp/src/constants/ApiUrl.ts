import EnvConfig from "../Utils/EnvConfig";

class ApiUrl {
    static Role_Execute = EnvConfig.getApiHost() + "/Api/Internal/Administration/Role";

    //Order Api
    static Order_Execute = EnvConfig.getApiHost() + "/api/webs/M_SERVICE_ORDER";

    //Car Api
    static Car_Execute = EnvConfig.getApiHost() + "/api/webs/M_CAR";

    //Login Api
    static Login_Execute = EnvConfig.getApiHost() + "/api/webs/M_LOGIN";
}

export default ApiUrl;