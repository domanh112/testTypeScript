import { inject, observer } from "mobx-react";
import { InputText } from "primereact/inputtext";
import React from "react";
import { ComboBox, DatePicker, ErrorHandler, SMButton, TextBox } from "../../../components/ComponentLib";
import ApiUrl from "../../../constants/ApiUrl";
import { iBaseProps, iBaseState } from "../../../Interfaces/iBaseComponent";
import HttpUtils from "../../../Utils/HttpUtils";
import logoxe from "../../../assets/images/logoxe.png";
import LoadingModal from '../../../components/LoadingModal';
import { M_SERVICE_ORDERFilter } from '../../../DtoParams/Administration/M_SERVICE_ORDERDTO';
import M_LOGIN from "../../../entities/Administration/M_LOGIN";
import { M_LOGINDTO, M_LOGINFilter } from "../../../DtoParams/Administration/M_LOGINDTO";
import GlobalStore from "../../../Stores/GlobalStore";

interface iProp {
    history?: any;
    GlobalStore: GlobalStore;
    match: any;
}
interface iState extends iBaseState {
    Filter: M_LOGINFilter,
    M_LOGIN: M_LOGIN;
    UserName: string;
    Password: string;
    ErrorMsg: string;

}

export default class Login extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);

        this.state = {
            Filter: new M_SERVICE_ORDERFilter(),
            M_LOGIN: {},
            UserName: "",
            Password: "",
            ErrorMsg: "",
        };
    }


    async componentDidMount() {
        document.addEventListener("keydown", this.eventListen);

        this.props.GlobalStore.IsLoading = true;

        await this.loadData();

        // await this.getCaptcha();

        this.props.GlobalStore.IsLoading = false;
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.eventListen);
    }

    eventListen = (e: any) => {
        if (e.keyCode === 13) this.loadData();
    };

    async doSearchAction() {
        LoadingModal.showLoading();
        try {
            await this.loadData();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }


    async loadData() {
        const request = new M_LOGINDTO();
        var filter = { ...this.state.Filter! };
        request.Filter = filter;
        const response = await HttpUtils.post<M_LOGINDTO>(
            ApiUrl.Login_Execute + "/Login",
            JSON.stringify(request)
        );
        this.setState({
            M_LOGIN: response.M_LOGIN!,
        },
            // async () => { await this.loadData(0) }
        )
    }



    isInitPage: boolean = true;

    render() {
        // Ẩn layout khi chưa setup form
        if (this.isInitPage === true) {
            this.isInitPage = false;
            return <></>;
        }

        const { } = this.state!;

        return (
            <div className="login-box">
                <div className="card-login">
                    <div className="login-header mx-auto bg-dark">
                        <span>
                            <img src={logoxe} alt="Logo" className="w-75" style={{ width: "200px" }} />
                        </span>
                        <br />
                        {/*<span className="logo_title mt-5">FlexCash Management</span>*/}
                    </div>
                    <div className="login-body">
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="pi pi-user" />
                                </span>
                            </div>
                            <InputText
                                required={true}
                                placeholder="Tài khoản"
                                className="form-control"
                                onChange={(event: any) => this.setState({ UserName: event.target.value })}
                            />
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="pi pi-key" />
                                </span>
                            </div>
                            <InputText
                                required={true}
                                type="password"
                                placeholder="Mật khẩu"
                                className="form-control"
                                onChange={(event: any) => this.setState({ Password: event.target.value })}
                            />
                        </div>
                        {/* <div className="captcha-img">
                        <img src={this.state.Image} alt="" />
                        <span onClick={() => this.getCaptcha()}>
                            <i className={Icons.reset} />
                        </span>
                    </div>
                    <div className="input-group form-group">
                        <InputText
                            required={true}
                            placeholder="Nhập mã xác thực"
                            className="form-control"
                            style={{ paddingLeft: 0, textAlign: "center", fontSize: 24 }}
                            value={this.state.inputOTP}
                            onChange={(event: any) => this.setState({ inputOTP: event.target.value.toUpperCase() })}
                        />
                    </div> */}
                        <div style={{ color: "#f00", textAlign: "center", fontSize: 18 }}>{this.state.ErrorMsg}</div>
                        <div className="login_div form-group">
                            <button
                                id="login_btn"
                                className="login_btn p-button "
                                onClick={() => {
                                    this.loadData();
                                }}
                            >
                                <span className="p-button-text p-c">Đăng nhập</span>
                            </button>
                        </div>
                    </div>
                    <div className="login-footer">Copyright © 2022 DO MANH.</div>
                </div>
            </div>
        );
    }
}
