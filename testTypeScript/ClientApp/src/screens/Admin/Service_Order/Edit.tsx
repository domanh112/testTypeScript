import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, DatePicker, DialogMessage, ErrorHandler, FieldValidator, SMButton, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import ApiUrl from '../../../constants/ApiUrl';
import { M_SERVICE_ORDERDTO } from '../../../DtoParams/Administration/M_SERVICE_ORDERDTO';
import M_SERVICE_ORDER from '../../../entities/Administration/SERVICE_ORDER';
import M_CAR from '../../../entities/Administration/CAR';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import iKeyValuePair from '../../../Interfaces/iKeyValuePair';
import { Icons } from '../../../themes';
import HttpUtils from '../../../Utils/HttpUtils';
import Utility from '../../../Utils/Utility';
import { RouteUrls } from '../../RouteManager';
import { SMXException } from '../../../models/SMXException';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    M_SERVICE_ORDER: M_SERVICE_ORDER,
    ORDER_ID: number,
    dicCat?: Array<iKeyValuePair<number, string>>,
    M_CARs?: Array<M_CAR>;
    M_CAR: M_CAR;
}

export default class OrderEdit extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            ORDER_ID: parseInt(this.props.match.params.id),
            M_SERVICE_ORDER: {},
            M_CAR: {}
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
        const request = new M_SERVICE_ORDERDTO();
        request.ORDER_ID = this.state.ORDER_ID;
        const response = await HttpUtils.post<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/SetupEditForm",
            JSON.stringify(request)
        );

        console.log('response.M_SERVICE_ORDER', response.M_SERVICE_ORDER);

        this.setState({
            dicCat: response.dicCat!,
            M_CARs: response.M_CARs!,
            M_SERVICE_ORDER: response.M_SERVICE_ORDER || {},
        })
    }

    async saveData() {
        const request = new M_SERVICE_ORDERDTO();
        let M_SERVICE_ORDER = this.state.M_SERVICE_ORDER;
        request.M_SERVICE_ORDER = M_SERVICE_ORDER;
        const response = await HttpUtils.post<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/Update",
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
            this.props.history.push(`../${RouteUrls.Display}/${this.state.ORDER_ID}`)
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async delOrder() {
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
        const request = new M_SERVICE_ORDERDTO();
        let M_SERVICE_ORDER = this.state.M_SERVICE_ORDER;
        request.M_SERVICE_ORDER = M_SERVICE_ORDER;
        const response = await HttpUtils.post<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/StaDelete",
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

        const { M_SERVICE_ORDER } = this.state;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>CHỈNH SỬA Order</h1>
                    </div>

                    <div className="p-toolbar-group-right">
                        <SMButton className={'sm-button'} onClick={() => {
                            DialogMessage.showConfirm("SỬA ORDER", "Bạn có chắc muốn sửa order này khum?",
                                () => {
                                    this.onPressSave();
                                })
                        }}>
                            <i className={`${Icons.save}`} /> {' Lưu'}
                        </SMButton>

                        <SMButton className={'sm-delete-button'} onClick={() => {
                            DialogMessage.showConfirm("Xóa nhóm người dùng", "Bạn có chắc muốn xóa nhóm người dùng?",
                                () => {
                                    this.delOrder();
                                })
                        }}>
                            <i className={`${Icons.trash}`} /> {' Xóa'}
                        </SMButton>

                        <Link className={'sm-button-link margin-left-5'} to={`../${RouteUrls.Display}/${this.state.ORDER_ID}`}>
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
                                value={M_SERVICE_ORDER.CUSTOMER_NAME || ''}
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
                        <div className="p-col-4">
                            <span className="title-info">LOẠI THỜI GIAN</span>
                            <ComboBox dataSource={this.state.dicCat}
                                textField="Value"
                                valueField="Key"
                                selectedValue={Utility.GetNumberString(M_SERVICE_ORDER.TIME_CATEGORY)}
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
                            <span className="title-info">TỪ NGÀY</span>
                            <DatePicker
                                selectedDate={M_SERVICE_ORDER?.PLAN_START_DTG}
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
                            <span className="title-info">ĐẾN NGÀY</span>
                            <DatePicker
                                selectedDate={M_SERVICE_ORDER?.PLAN_END_DTG}
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