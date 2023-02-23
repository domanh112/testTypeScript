import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, ErrorHandler, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import ApiUrl from '../../../constants/ApiUrl';
import { M_SERVICE_ORDERDTO } from '../../../DtoParams/Administration/M_SERVICE_ORDERDTO';
import M_CAR from '../../../entities/Administration/CAR';
import M_SERVICE_ORDER from '../../../entities/Administration/SERVICE_ORDER';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import { Icons } from '../../../themes';
import HttpUtils from '../../../Utils/HttpUtils';
import Utility from '../../../Utils/Utility';
import { RouteUrls } from '../../RouteManager';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    M_SERVICE_ORDER?: M_SERVICE_ORDER,
    OrderID: number,
    M_CARs?: Array<M_CAR>;
}

export default class OrderDisplay extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            OrderID: parseInt(this.props.match.params.id),
            M_SERVICE_ORDER: {},
        }
    }

    async componentDidMount() {
        LoadingModal.showLoading();
        try {
            await this.setUpDisplay();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setUpDisplay() {
        const request = new M_SERVICE_ORDERDTO();
        request.ORDER_ID = this.state.OrderID;

        const response = await HttpUtils.post<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/Detail",
            JSON.stringify(request)
        );

        this.setState({
            M_SERVICE_ORDER: response.M_SERVICE_ORDER!,
            M_CARs: response.M_CARs
        })
    }
    isInitPage: boolean = true;

    render() {
        // Ẩn layout khi chưa setup form
        if (this.isInitPage === true) {
            this.isInitPage = false;
            return (<></>)
        }
        const M_SERVICE_ORDER = this.state.M_SERVICE_ORDER!;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>Chi tiết Order</h1>
                    </div>
                    <div className="p-toolbar-group-right">
                        <Link className={'sm-button-link'} to={`../${RouteUrls.Edit}/${this.state.OrderID}`}>
                            <i className={`${Icons.edit}`} /> {' Sửa'}
                        </Link>
                        <Link className={'sm-button-link margin-left-5'} to={`../${RouteUrls.Default}`}>
                            <i className={`${Icons.exit}`} /> {' Thoát'}
                        </Link>
                    </div>
                </div>

                <div className="card card-w-title box-grid-custom">
                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">TÊN KHÁCH </span>
                            <span className="title-value">{M_SERVICE_ORDER?.CUSTOMER_NAME}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">BIỂN SỐ</span>
                            <span className="title-value">{M_SERVICE_ORDER.PLATE_NUMBER}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">LOẠI THỜI GIAN</span>
                            <span className="title-value">{M_SERVICE_ORDER?.NAME}</span>
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">TỪ NGÀY</span>
                            <span className="title-value">{Utility.GetDateString(M_SERVICE_ORDER?.PLAN_START_DTG)}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">ĐẾN NGÀY</span>
                            <span className="title-value">{Utility.GetDateString(M_SERVICE_ORDER?.PLAN_END_DTG)}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">TRẠNG THÁI</span>
                            <span className="title-value">{M_SERVICE_ORDER?.STATUS_NAME}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}