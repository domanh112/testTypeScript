import { inject, observer } from "mobx-react";
import { Menu } from "primereact/menu";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import smLogo from "../../assets/images/sm-logo.png";
import xe3 from "../../assets/images/xe3.png";
import logoxe from "../../assets/images/logoxe.png";
import SMX from "../../constants/SMX";
import GlobalStore from "../../Stores/GlobalStore";
import SMButton from "../../components/SMButton";
import { RouteUrls } from "../../screens/RouteManager";

interface iProps {
    history: any;
    GlobalStore: GlobalStore;
}

interface iState {
    isshowMenu: boolean;
}

@inject(SMX.StoreName.GlobalStore)
@observer
export default class LeftMenu extends Component<iProps, iState> {
    menu!: Menu | null;
    constructor(props: iProps) {
        super(props);
        this.state = {
            isshowMenu: true,

        };
    }

    async componentDidMount() {
    }

    render() {
        const { isshowMenu } = this.state!;

        return (
            <div className="sidebar-main" >
                <Link to="/" className="logo-menu">
                    <img src={logoxe} alt="" />
                </Link>

                <ul id="main-menu" className="main-menu">
                    <div className="active-menu">
                        <a
                            className="sm-button-link"
                            onClick={() => {
                                this.setState({ isshowMenu: true, });
                            }}>
                            <i className="fas fa-car"></i>
                        </a>

                        <a
                            className="sm-button-link"
                            onClick={() => {
                                this.setState({ isshowMenu: false, });
                            }}>
                            <i className="fas fa-user-check"></i>
                        </a>

                        <div className="sub-menu active">
                            <div className="column">
                                <div className="sub-menu-top"><b>BooKiNG BiKe</b></div>
                                {
                                    (isshowMenu === true) && (
                                        <>
                                            <div className="sub-menu-title">
                                                {/*<Link to={`/${RouteUrls.Admin}/${RouteUrls.Order}/${RouteUrls.Default}`} target={''}><b>DANH SÁCH ORDER</b></Link>*/}
                                            </div>
                                            <div className="sub-menu-title">
                                                <Link to={`/${RouteUrls.Admin}/${RouteUrls.Car}/${RouteUrls.Default}`} target={''}><b>DANH SÁCH XE</b></Link>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    (isshowMenu === false) && (
                                        <>
                                            <div className="sub-menu-title">
                                                <Link to={`/${RouteUrls.User}/${RouteUrls.Default}`} target={''}> <b>USER</b></Link>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </ul>
            </div >
        );
    }
}
