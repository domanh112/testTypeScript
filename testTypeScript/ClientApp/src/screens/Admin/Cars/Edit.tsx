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
import SMX from '../../../constants/SMX';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    m_CAR: M_CAR;
    lstM_CAR_CATEGORY: Array<M_CAR_CATEGORY>;
    caR_ID?: number;
}

export default class CarEdit extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            m_CAR: new M_CAR,
            lstM_CAR_CATEGORY: [],
            caR_ID: parseInt(this.props.match.params.id)
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
        request.caR_ID = this.state.caR_ID;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/SetupEditForm",
            JSON.stringify(request)
        );
        this.setState({
            m_CAR: response.m_CAR!,
            lstM_CAR_CATEGORY: response.lstM_CAR_CATEGORY!,
        })
    }

    async saveData() {
        const request = new M_CARDTO();
        request.m_CAR = this.state.m_CAR;
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
            this.props.history.push(`../${RouteUrls.Display}/${this.state.caR_ID}`)
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

        const { m_CAR, lstM_CAR_CATEGORY } = this.state;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>CHỈNH SỬA XE</h1>
                    </div>

                    <div className="p-toolbar-group-right">
                        <SMButton className={'sm-button-link'} onClick={() => {

                            this.onPressSave();
                        }}>
                            <i className={`${Icons.save}`} /> {' Lưu'}
                        </SMButton>

                        <Link className={'sm-button-link'} to={`../${RouteUrls.Display}/${this.state.caR_ID}`}>
                            <i className={`${Icons.exit}`} /> {' Thoát'}
                        </Link>
                    </div>
                </div>

                <div className="card card-w-title box-grid-custom">
                    <div className="p-grid">

                        <div className="p-col-4">
                            <span className="title-info required">BIỂN SỐ XE</span>
                            <FieldValidator
                                value={m_CAR.platE_NUMBER}
                                className="validator"
                                required={true}
                                requiredMessage={SMX.ValidateMessage.RequiredField}
                            />
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                value={m_CAR.platE_NUMBER || ''}
                                onChange={(e: any) => {
                                    m_CAR.platE_NUMBER = e.target.value;
                                    this.setState({})
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info required">LOẠI XE</span>
                            <FieldValidator
                                value={m_CAR.categorY_ID}
                                className="validator"
                                required={true}
                                requiredMessage={SMX.ValidateMessage.RequiredField}
                            />
                            <ComboBox
                                dataSource={lstM_CAR_CATEGORY}
                                textField="name"
                                valueField="caR_CATEGORY_ID"
                                className="sm-combobox w-100"
                                addBlankItem={true}
                                selectedValue={Utility.GetNumberString(m_CAR.categorY_ID) || ''}
                                onChange={(e) => {
                                    m_CAR.categorY_ID = parseInt(e)
                                    this.setState({});
                                }} />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">MÀU XE</span>
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                value={m_CAR.color || ''}
                                onChange={(e: any) => {
                                    m_CAR.color = e.target.value;
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
                                value={m_CAR.description || ''}
                                onChange={(e: any) => {
                                    m_CAR.description = e.target.value;
                                    this.setState({})
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info required">GIÁ THUÊ</span>
                            <FieldValidator
                                value={m_CAR.price}
                                className="validator"
                                required={true}
                                requiredMessage={SMX.ValidateMessage.RequiredField}
                            />
                            <SMNumericBox
                                className="sm-numericbox w-100"
                                value={m_CAR.price}
                                onChange={(e) => {
                                    m_CAR.price = e;
                                    this.setState({ })
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
                                value={m_CAR.url || ''}
                                onChange={(e: any) => {
                                    m_CAR.url = e.target.value;
                                    this.setState({})
                                }}
                            />
                            <img className='w-100' src={m_CAR.url} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}