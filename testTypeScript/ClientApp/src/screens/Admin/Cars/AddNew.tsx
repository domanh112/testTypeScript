import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, ErrorHandler, FieldValidator, NumericBox, SMButton, SMNumericBox, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import ApiUrl from '../../../constants/ApiUrl';
import SMX from "../../../constants/SMX";
import { M_CARDTO } from '../../../DtoParams/Administration/M_CARDTO';
import M_CAR from '../../../entities/Administration/CAR';
import M_CAR_CATEGORY from '../../../entities/Administration/M_CAR_CATEGORY';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import { SMXException } from '../../../models/SMXException';
import { Icons } from '../../../themes';
import HttpUtils from '../../../Utils/HttpUtils';
import { RouteUrls } from '../../RouteManager';

interface iProps extends iBaseProps {
}

interface iState extends iBaseState {
    M_CAR: M_CAR;
    M_CAR_CATEGORYs: Array<M_CAR_CATEGORY>;
    CAR_ID?: number;

}

export default class CarAddNew extends Component<iProps, iState> {
    private roleID?: number;
    constructor(props: iProps) {
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
            await this.setUpAddnewForm();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setUpAddnewForm() {
        let request = new M_CARDTO();
        let response = await HttpUtils.get<M_CARDTO>(
            ApiUrl.Car_Execute + "/SetupAddNew",
            JSON.stringify(request)
        );
        this.setState({
            M_CAR_CATEGORYs: response.M_CAR_CATEGORYs!,
        });
    }

    async saveData() {
        const request = new M_CARDTO();
        request.M_CAR = this.state.M_CAR;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/Insert",
            JSON.stringify(request)
        );
        this.props.history.push(`./${RouteUrls.Display}/${response.CAR_ID}`)
    }

    async onPressSave() {

        try {
            if (FieldValidator.HasError() === true) {
                throw SMXException.CreateDataInvalidException();
            }
            LoadingModal.showLoading();

            await this.saveData();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }

        LoadingModal.hideLoading();
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
                        <h1>THÊM MỚI Order</h1>
                    </div>

                    <div className="p-toolbar-group-right">

                        <SMButton className={'sm-button-link'} onClick={() => {
                            this.onPressSave();
                        }}>
                            <i className={`${Icons.save}`} /> {' THÊM'}
                        </SMButton>

                        <Link className={'sm-button-link '} to={`./${RouteUrls.Default}`}>
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
                                selectedValue={`${M_CAR.CATEGORY_ID || ''}`}
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
                                onChange={(e: any) => {
                                    M_CAR.DESCRIPTION = e.target.value;
                                    this.setState({})
                                }}
                            />
                            <span>{M_CAR.PRICE}</span>
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