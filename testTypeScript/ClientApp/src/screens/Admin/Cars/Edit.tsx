import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, DatePicker, DialogMessage, ErrorHandler, FieldValidator, SMButton, SMNumericBox, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import ApiUrl from '../../../constants/ApiUrl';
import M_SERVICE_ORDER from '../../../entities/Administration/SERVICE_ORDER';
import M_CAR from '../../../entities/Administration/CAR';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import { Icons } from '../../../themes';
import HttpUtils from '../../../Utils/HttpUtils';
import Utility from '../../../Utils/Utility';
import { RouteUrls } from '../../RouteManager';
import { SMXException } from '../../../models/SMXException';
import { M_CARDTO } from '../../../DtoParams/Administration/M_CARDTO';
import M_CAR_CATEGORY from '../../../entities/Administration/M_CAR_CATEGORY';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    M_CAR: M_CAR;
    M_CAR_CATEGORYs: Array<M_CAR_CATEGORY>;
    CAR_ID?: number;
}

export default class CarEdit extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            M_CAR: new M_CAR,
            M_CAR_CATEGORYs: [],
            CAR_ID: parseInt(this.props.match.params.id)
        }
    }

    async componentDidMount() {
        LoadingModal.showLoading();
        try {
            await this.setUpEdit();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setUpEdit() {
        const request = new M_CARDTO();
        request.CAR_ID = this.state.CAR_ID;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/SetupEditForm",
            JSON.stringify(request)
        );
        this.setState({
            M_CAR: response.M_CAR!,
            M_CAR_CATEGORYs: response.M_CAR_CATEGORYs!,
        })
    }

    async saveData() {
        const request = new M_CARDTO();
        request.M_CAR = this.state.M_CAR;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/Update",
            JSON.stringify(request)
        );
    }

    async onPressSave() {
        try {
            if (FieldValidator.HasError() === true) {
                throw SMXException.CreateDataInvalidException();
            }
            LoadingModal.showLoading();

            await this.saveData();
            this.props.history.push(`../${RouteUrls.Display}/${this.state.CAR_ID}`)
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
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
        request.M_CAR = this.state.M_CAR;
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

        const { M_CAR, M_CAR_CATEGORYs } = this.state;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>CHỈNH SỬA CAR</h1>
                    </div>

                    <div className="p-toolbar-group-right">
                        <SMButton className={'sm-button'} onClick={() => {

                            this.onPressSave();
                        }}>
                            <i className={`${Icons.save}`} /> {' Lưu'}
                        </SMButton>

                        <SMButton className={'sm-delete-button'} onClick={() => {
                            DialogMessage.showConfirm("Xóa XE", "Bạn có chắc muốn xóa xe này không?",
                                () => {
                                    this.delCar();
                                })
                        }}>
                            <i className={`${Icons.trash}`} /> {' Xóa'}
                        </SMButton>

                        <Link className={'sm-button-link margin-left-5'} to={`../${RouteUrls.Display}/${this.state.CAR_ID}`}>
                            <i className={`${Icons.exit}`} /> {' Thoát'}
                        </Link>
                    </div>
                </div>

                <div className="card card-w-title box-grid-custom">
                    <div className="p-grid">

                        <div className="p-col-4">
                            <span className="title-info">BIỂN SỐ XE</span>
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                value={M_CAR.PLATE_NUMBER || ''}
                                onChange={(e: any) => {
                                    M_CAR.PLATE_NUMBER = e.target.value;
                                    this.setState({})
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">LOẠI XE</span>
                            <ComboBox
                                dataSource={M_CAR_CATEGORYs}
                                textField="NAME"
                                valueField="CAR_CATEGORY_ID"
                                className="sm-combobox w-100"
                                addBlankItem={true}
                                selectedValue={Utility.GetNumberString(M_CAR.CATEGORY_ID) || ''}
                                onChange={(e) => {
                                    M_CAR.CATEGORY_ID = parseInt(e)
                                    this.setState({});
                                }} />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">MÀU XE</span>
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                value={M_CAR.COLOR || ''}
                                onChange={(e: any) => {
                                    M_CAR.COLOR = e.target.value;
                                    this.setState({})
                                }}
                            />
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">MÔ TẢ</span>
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                value={M_CAR.DESCRIPTION || ''}
                                onChange={(e: any) => {
                                    M_CAR.DESCRIPTION = e.target.value;
                                    this.setState({})
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">GIÁ THUÊ</span>
                            <SMNumericBox
                                className="sm-numericbox w-100"
                                value={M_CAR.PRICE}
                                onChange={(e) => {
                                    M_CAR.PRICE = e;
                                    this.setState({ M_CAR })
                                }}
                            />
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info w-100">ẢNH MÔ TẢ</span>
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                value={M_CAR.URL || ''}
                                onChange={(e: any) => {
                                    M_CAR.URL = e.target.value;
                                    this.setState({})
                                }}
                            />
                            <img className='w-100' src={M_CAR.URL} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}