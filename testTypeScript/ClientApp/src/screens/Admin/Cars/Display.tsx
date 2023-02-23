import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, ErrorHandler, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import ApiUrl from '../../../constants/ApiUrl';
import { M_CARDTO } from '../../../DtoParams/Administration/M_CARDTO';
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
    M_CAR: M_CAR,
    CAR_ID: number,
}

export default class CarDisplay extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            CAR_ID: parseInt(this.props.match.params.id),
            M_CAR: {},

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
        const request = new M_CARDTO();
        request.CAR_ID = this.state.CAR_ID;

        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/Detail",
            JSON.stringify(request)
        );

        this.setState({
            M_CAR: response.M_CAR!,
        })
    }
    isInitPage: boolean = true;

    render() {
        // Ẩn layout khi chưa setup form
        if (this.isInitPage === true) {
            this.isInitPage = false;
            return (<></>)
        }
        const M_CAR = this.state.M_CAR!;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>CHI TIẾT CAR</h1>
                    </div>
                    <div className="p-toolbar-group-right">
                        <Link className={'sm-button-link'} to={`../${RouteUrls.Edit}/${this.state.CAR_ID}`}>
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
                            <span className="title-info">BIỂN SỐ XE </span>
                            <span className="title-value">{M_CAR.PLATE_NUMBER}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">LOẠI XE</span>
                            <span className="title-value">{M_CAR.BIKE_NAME}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">MÀU XE</span>
                            <span className="title-value">{M_CAR.COLOR}</span>
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">MÔ TẢ</span>
                            <span className="title-value">{M_CAR.DESCRIPTION}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">GIÁ THUÊ</span>
                            <span className="title-value">{Utility.GetDecimalString(M_CAR.PRICE)}</span>
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info w-100">ẢNH MÔ TẢ</span>
                            <img className='w-100' src={M_CAR.URL} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}