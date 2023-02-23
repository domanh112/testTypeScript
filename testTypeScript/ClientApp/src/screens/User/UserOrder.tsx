import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, DatePicker, DialogMessage, ErrorHandler, FieldValidator, SMButton, SMMultiSelect, TextArea, TextBox } from '../../components/ComponentLib';
import LoadingModal from '../../components/LoadingModal';
import { ListItem } from '../../components/SMMultiSelect';
import ApiUrl from '../../constants/ApiUrl';
import SMX from "../../constants/SMX";
import { M_CARFilter } from '../../DtoParams/Administration/M_CARDTO';
import { M_SERVICE_ORDERDTO, M_SERVICE_ORDERFilter } from '../../DtoParams/Administration/M_SERVICE_ORDERDTO';
import M_CAR from '../../entities/Administration/CAR';
import M_SERVICE_ORDER from '../../entities/Administration/SERVICE_ORDER';
import { iBaseProps, iBaseState } from '../../Interfaces/iBaseComponent';
import iKeyValuePair from '../../Interfaces/iKeyValuePair';
import { Icons } from '../../themes';
import HttpUtils from '../../Utils/HttpUtils';
import Utility from '../../Utils/Utility';
import { RouteUrls } from '../RouteManager';

interface iProps extends iBaseProps {
}

interface iState extends iBaseState {
    M_CARs?: Array<M_CAR>;
    M_SERVICE_ORDER: M_SERVICE_ORDER,
    dicCat?: Array<iKeyValuePair<number, string>>;
    car_id: number;
    Filter?: M_SERVICE_ORDERFilter,

}

export default class UserOrder extends Component<iProps, iState> {
    private roleID?: number;
    constructor(props: iProps) {
        super(props);
        this.state = {
            Filter: new M_SERVICE_ORDERFilter(),
            M_SERVICE_ORDER: new M_SERVICE_ORDER(),
            dicCat: [],
            car_id: parseInt(this.props.match.params.id)
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
        let request = new M_SERVICE_ORDERDTO();
        let response = await HttpUtils.get<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/SetupAddNew",
            JSON.stringify(request)
        );
        this.setState({
            dicCat: response.dicCat!,
            M_CARs: response.M_CARs!,
        });
    }

    async saveData() {
        const request = new M_SERVICE_ORDERDTO();
        request.M_SERVICE_ORDER = this.state.M_SERVICE_ORDER;
        const response = await HttpUtils.post<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/Insert",
            JSON.stringify(request)
        );
    }

    async onPressSave() {

        LoadingModal.showLoading();
        try {
            if (FieldValidator.HasError() === true) {
            }
            await this.saveData();
            this.props.history.push(`../`)
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

        const { M_SERVICE_ORDER } = this.state;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>SỬA Order</h1>
                    </div>

                    <div className="p-toolbar-group-right">

                        <SMButton className={'sm-save-button'} onClick={() => {
                            DialogMessage.showConfirm("Thêm Order", "Bạn có chắc muốn thêm Order này chứ?",
                                () => {
                                    this.onPressSave();
                                })
                        }}>
                            <i className={`${Icons.save}`} /> {' THÊM'}
                        </SMButton>
                        <Link className={'sm-button-link margin-left-5'} to={`../`}>
                            <i className={`${Icons.exit}`} /> {' Thoát'}
                        </Link>
                    </div>
                </div>

                <div className="card card-w-title box-grid-custom">
                    <div className="p-grid">

                        <div className="p-col-4">
                            <span className="title-info">TÊN KHÁCH </span>
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                onChange={(e: any) => {
                                    const M_SERVICE_ORDER = this.state.M_SERVICE_ORDER;
                                    M_SERVICE_ORDER.CUSTOMER_NAME = e.target.value;
                                    this.setState({ M_SERVICE_ORDER })
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">BIỂN SỐ</span>
                            <ComboBox dataSource={this.state.M_CARs}
                                textField="PLATE_NUMBER"
                                valueField="CAR_ID"
                                selectedValue={Utility.GetNumberString(M_SERVICE_ORDER.CAR_ID)}
                                className="sm-combobox w-100"
                                addBlankItem={true}
                                onChange={(e) => {
                                    M_SERVICE_ORDER.CAR_ID = parseInt(e)
                                    this.setState({ M_SERVICE_ORDER });
                                }} />
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-2">
                            <span className="title-info">LOẠI TIME</span>
                            <ComboBox dataSource={this.state.dicCat}
                                textField="Value"
                                valueField="Key"
                                className="sm-combobox w-100"
                                addBlankItem={true}
                                onChange={(e) => {
                                    M_SERVICE_ORDER.TIME_CATEGORY = parseInt(e)
                                    this.setState({ M_SERVICE_ORDER });
                                }} />
                        </div>
                    </div>

                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">TỪ</span>
                            <DatePicker
                                selectedDate={M_SERVICE_ORDER.PLAN_START_DTG}
                                placeholder="dd/MM/yy"
                                onChange={(val?: Date) => {
                                    M_SERVICE_ORDER.PLAN_START_DTG = val
                                    this.setState({
                                        M_SERVICE_ORDER
                                    })
                                }}
                            />
                        </div>

                        <div className="p-col-4">
                            <span className="title-info">ĐẾN</span>
                            <DatePicker
                                selectedDate={M_SERVICE_ORDER.PLAN_END_DTG}
                                placeholder="dd/MM/yy"
                                onChange={(val?: Date) => {
                                    M_SERVICE_ORDER.PLAN_END_DTG = val
                                    this.setState({
                                        M_SERVICE_ORDER
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}