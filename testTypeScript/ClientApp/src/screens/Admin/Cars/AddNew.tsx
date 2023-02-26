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
    m_CAR: M_CAR;
    lstM_CAR_CATEGORY: Array<M_CAR_CATEGORY>;
    caR_ID?: number;

}

export default class CarAddNew extends Component<iProps, iState> {
    private roleID?: number;
    constructor(props: iProps) {
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
            lstM_CAR_CATEGORY: response.lstM_CAR_CATEGORY!,
        });
    }

    async saveData() {
        const request = new M_CARDTO();
        request.m_CAR = this.state.m_CAR;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/Insert",
            JSON.stringify(request)
        );
        this.props.history.push(`./${RouteUrls.Display}/${response.caR_ID}`)
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

        const { m_CAR, lstM_CAR_CATEGORY } = this.state;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>THÊM MỚI XE</h1>
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
                                    m_CAR.categorY_ID = e.target.value;
                                    this.setState({})
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">LOẠI XE</span>
                            <ComboBox
                                dataSource={lstM_CAR_CATEGORY}
                                textField="name"
                                valueField="caR_CATEGORY_ID"
                                className="sm-combobox w-100"
                                addBlankItem={true}
                                selectedValue={`${m_CAR.categorY_ID || ''}`}
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
                                onChange={(e: any) => {
                                    m_CAR.description = e.target.value;
                                    this.setState({})
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">GIÁ THUÊ</span>
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