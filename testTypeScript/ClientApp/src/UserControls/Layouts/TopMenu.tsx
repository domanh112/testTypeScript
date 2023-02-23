import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SMX from "../../constants/SMX";
import { RouteUrls } from "../../screens/RouteManager";
import GlobalStore from "../../Stores/GlobalStore";
import { Icons } from "../../themes";
import icons from "../../themes/icons";

interface iProps {
    history: any;
    GlobalStore: GlobalStore;
}

interface iState {
    isshowMenu: boolean
}

@inject(SMX.StoreName.GlobalStore)
@observer
export default class TopMenu extends Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = {
            isshowMenu: false
        };
    }

    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="topbar-menu">
                <div className="topbar-menu-left flex">
                    {/* <Link to={'/'} className="sm-button-link"><b> HOME PAGE</b></Link> */}
                </div>
                <ul className="topbar-menu-right">
                    <li>
                        <div className="dropdown show">
                            <a
                                className="sm-button-link btn btn-secondary dropdown-toggle"
                                href="#" role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => {
                                    this.setState({ isshowMenu: true, });
                                }}>
                                <i className="fas fa-user-circle" />{' SYSTEM '}
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="/login">ĐĂNG XUẤT</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
