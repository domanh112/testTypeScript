import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, DialogMessage, ErrorHandler, FieldValidator, SMButton, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import ApiUrl from '../../../constants/ApiUrl';
import { M_CARDTO, M_CARFilter } from "../../../DtoParams/Administration/M_CARDTO";
import M_CAR from '../../../entities/Administration/CAR';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import { SMXException } from '../../../models/SMXException';
import { Icons } from '../../../themes';
import HttpUtils from '../../../Utils/HttpUtils';
import Utility from '../../../Utils/Utility';
import { RouteUrls } from '../../RouteManager';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    m_CAR: M_CAR,
    caR_ID: number,
}

export default class CarDisplay extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            caR_ID: parseInt(this.props.match.params.id),
            m_CAR: {},

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
        request.caR_ID = this.state.caR_ID;

        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/Detail",
            JSON.stringify(request)
        );

        this.setState({
            m_CAR: response.m_CAR!,
        }, () => console.log(this.state.m_CAR))
    }


    async delCar() {
        try {
            if (FieldValidator.HasError() === true) {
                throw SMXException.CreateDataInvalidException();
            }
            LoadingModal.showLoading();

            await this.staDelete();
            this.props.history.push(`../${RouteUrls.Default}`)
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }
    async staDelete() {
        const request = new M_CARDTO();
        request.m_CAR = this.state.m_CAR;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/Delete",
            JSON.stringify(request)
        );
    }

    isInitPage: boolean = true;

    render() {
        // Ẩn layout khi chưa setup form
        if (this.isInitPage === true) {
            this.isInitPage = false;
            return (<></>)
        }
        const m_CAR = this.state.m_CAR!;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>CHI TIẾT XE</h1>
                    </div>
                    <div className="p-toolbar-group-right">
                        <Link className={'sm-button-link'} to={`../${RouteUrls.Edit}/${this.state.caR_ID}`}>
                            <i className={`${Icons.edit}`} /> {' Sửa'}
                        </Link>

                        <SMButton className={'sm-button-link'} onClick={() => {
                            DialogMessage.showConfirm("Xóa XE", "Bạn có chắc muốn xóa xe này không?",
                                () => {
                                    this.delCar();
                                })
                        }}>
                            <i className={`${Icons.trash}`} /> {' Xóa'}
                        </SMButton>

                        <Link className={'sm-button-link'} to={`../${RouteUrls.Default}`}>
                            <i className={`${Icons.exit}`} /> {' Thoát'}
                        </Link>
                    </div>
                </div>

                <div className="card card-w-title box-grid-custom">
                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">BIỂN SỐ XE </span>
                            <span className="title-value">{m_CAR.platE_NUMBER}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">LOẠI XE</span>
                            <span className="title-value">{m_CAR.categorY_NAME}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">MÀU XE</span>
                            <span className="title-value">{m_CAR.color}</span>
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">MÔ TẢ</span>
                            <span className="title-value">{m_CAR.description}</span>
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">GIÁ THUÊ</span>
                            <span className="title-value">{Utility.GetDecimalString(m_CAR.price)}</span>
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info w-100">ẢNH MÔ TẢ</span>
                            <img className='w-100' src={m_CAR.url} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}