import React from "react";
import { ComboBox, DatePicker, ErrorHandler, SMButton, TextBox } from "../../../components/ComponentLib";
import ApiUrl from "../../../constants/ApiUrl";
import { M_SERVICE_ORDERDTO } from "../../../DtoParams/Administration/M_SERVICE_ORDERDTO";
import M_SERVICE_ORDER from "../../../entities/Administration/SERVICE_ORDER";
import { iBaseProps, iBaseState } from "../../../Interfaces/iBaseComponent";
import { Icons } from "../../../themes";
import HttpUtils from "../../../Utils/HttpUtils";
import Utility from "../../../Utils/Utility";
import LoadingModal from '../../../components/LoadingModal';
import { M_SERVICE_ORDERFilter } from '../../../DtoParams/Administration/M_SERVICE_ORDERDTO';
import { RouteUrls } from "../../RouteManager";
import { Link } from "react-router-dom";
import M_STATUS from "../../../entities/Administration/M_STATUS";
import PagingUC from "../../../UserControls/uc/PagingUC";
import PagingInfo from "../../../models/PagingInfo";
import SERVICE_ORDER from "../../../entities/Administration/SERVICE_ORDER";

interface iProp extends iBaseProps { }
interface iState extends iBaseState {
    Filter: M_SERVICE_ORDERFilter,
    M_SERVICE_ORDERs: Array<SERVICE_ORDER>;
    M_Statuss?: Array<M_STATUS>;
    M_SERVICE_ORDER?: SERVICE_ORDER;
    OrderId: number,
    // index: number,
    PagingInfo?: PagingInfo;
    isshowAdvanced: boolean;

}

export default class OrderDefault extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);

        this.state = {
            OrderId: parseInt(this.props.match.params.id),
            Filter: new M_SERVICE_ORDERFilter(),
            M_SERVICE_ORDERs: [],
            // index: 1,
            PagingInfo: new PagingInfo(),
            isshowAdvanced: false,

        };
    }

    async componentDidMount() {
        LoadingModal.showLoading();
        try {
            await this.setupForm();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setupForm() {
        const request = new M_SERVICE_ORDERDTO();
        const response = await HttpUtils.post<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/SetupViewForm",
            JSON.stringify(request)
        );

        this.setState({
            M_Statuss: response.M_Statuss!
        }, async () => { await this.loadData(0) })
    }

    async doSearchAction() {
        LoadingModal.showLoading();
        try {
            await this.loadData(0);
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }


    async loadData(pageIndex: number) {
        const request = new M_SERVICE_ORDERDTO();
        var filter = { ...this.state.Filter! };
        filter.PLAN_START_DTG = Utility.ConvertToUtcDateTime(this.state.Filter.PLAN_START_DTG);
        filter.PLAN_END_DTG = Utility.ConvertToUtcDateTime(this.state.Filter.PLAN_END_DTG);
        filter.PageIndex = pageIndex;
        // filter.PAGE_NUM = this.state.index;
        // filter.PAGE_SIZE = 4;
        request.Filter = filter;
        const response = await HttpUtils.post<M_SERVICE_ORDERDTO>(
            ApiUrl.Order_Execute + "/SearchData",
            JSON.stringify(request)
        );
        this.setState({
            M_SERVICE_ORDERs: response.M_SERVICE_ORDERs! ?? [],
            PagingInfo: response.PagingInfo!,

        },
            // async () => { await this.loadData(0) }
        )
    }

    async resetSearch() {
        LoadingModal.showLoading();
        try {
            let newFilter = new M_SERVICE_ORDERFilter();

            this.setState({ Filter: newFilter },);
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    isInitPage: boolean = true;

    render() {
        // Ẩn layout khi chưa setup form
        if (this.isInitPage === true) {
            this.isInitPage = false;
            return <></>;
        }

        const { M_SERVICE_ORDERs, Filter, M_Statuss, PagingInfo, isshowAdvanced } = this.state!;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>DANH SÁCH ORDER</h1>
                    </div>
                    <div className="p-toolbar-group-right" style={{ paddingRight: '13px' }}>
                        <Link className={'sm-button-link'} to={`./${RouteUrls.AddNew}`}>
                            <i className={`${Icons.add}`} /> {' Tạo mới'}
                        </Link>
                    </div>
                </div>
                <div className="card card-w-title">
                    <table className="search-table">
                        <colgroup>
                            <col width="15%" />
                            <col width="20%" />
                            <col width="15%" />
                            <col width="20%" />
                            <col />
                        </colgroup>

                        <tbody>
                            <tr>
                                <th>TÊN KHÁCH HÀNG</th>
                                <td>
                                    <TextBox
                                        value={Filter.CUSTOMER_NAME || ''}
                                        className="sm-textbox w-100"
                                        onChange={(e: any) => {
                                            Filter.CUSTOMER_NAME = e.target.value
                                            this.setState({});
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                this.doSearchAction()
                                            }
                                        }}
                                    />
                                </td>

                                <th>TRẠNG THÁI</th>
                                <td>
                                    <ComboBox
                                        dataSource={M_Statuss}
                                        textField="STATUS_NAME"
                                        valueField="STATUS_CODE"
                                        selectedValue={`${Filter.STATUS || ''}`}
                                        className="sm-combobox w-100"
                                        addBlankItem={true}
                                        blankItemText={''}
                                        onChange={(val) => {
                                            Filter!.STATUS = Number(val);
                                            this.setState({});
                                        }}
                                    />
                                </td>

                                <td style={{ whiteSpace: "nowrap" }}>
                                    <SMButton
                                        className={'sm-button margin-right-5'}
                                        onClick={() => this.doSearchAction()}>
                                        <i className={Icons.search} />  Tìm kiếm
                                    </SMButton>

                                    <SMButton
                                        className={'sm-button margin-right-5'}
                                        onClick={() => this.resetSearch()}>
                                        <i className={Icons.reset} />  Bỏ qua
                                    </SMButton>

                                    <SMButton
                                        className={'sm-button-link margin-right-5'}
                                        onClick={() => {
                                            this.setState({ isshowAdvanced: !isshowAdvanced, });
                                            // reset mà vẫn giữ state
                                            // Filter.DESCRIPTION = '' ;
                                        }}>
                                        <i className={isshowAdvanced === true ? Icons.curetUp : Icons.curetDown} />
                                        {' Nâng cao '}
                                    </SMButton>
                                </td>
                            </tr>

                            {
                                (isshowAdvanced === true) && (
                                    <>
                                        <tr>
                                            <th>TỪ NGÀY</th>
                                            <td>
                                                <DatePicker
                                                    selectedDate={Filter.PLAN_START_DTG}
                                                    placeholder="dd/MM/yyyy"
                                                    onChange={(val?: Date) => {
                                                        Filter.PLAN_START_DTG = val
                                                        this.setState({})
                                                    }}
                                                />
                                            </td>

                                            <th>ĐẾN NGÀY</th>
                                            <td>
                                                <DatePicker
                                                    selectedDate={Filter.PLAN_END_DTG}
                                                    placeholder="dd/MM/yyyy"
                                                    onChange={(val?: Date) => {
                                                        Filter.PLAN_END_DTG = val
                                                        this.setState({})
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )}
                        </tbody>
                    </table>

                    <div className="h-datatable layout-fixed allow-fixheader">
                        <table style={{ width: "100%" }} >
                            <colgroup>
                                <col width="5%" />
                                <col width="15%" />
                                <col width="10%" />
                                <col width="20%" />
                                <col width="15%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="15%" />
                            </colgroup>

                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên KHÁCH HÀNG</th>
                                    <th>LOẠI XE</th>
                                    <th>BIỂN SỐ</th>
                                    <th>THUÊ TỪ</th>
                                    <th>THUÊ ĐẾN</th>
                                    <th>Trạng thái</th>
                                    <th>ẢNH MÔ TẢ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    M_SERVICE_ORDERs.map((item, index) => {
                                        return (
                                            <tr key={item.ORDER_ID}>
                                                <td className="grid-center">
                                                    {PagingInfo?.PageSize! * PagingInfo?.PageIndex! + index + 1}
                                                </td>

                                                <td>
                                                    <Link to={`./${RouteUrls.Display}/${item.ORDER_ID}`} >
                                                        {item.CUSTOMER_NAME}
                                                    </Link>
                                                </td>

                                                <td>
                                                    {item.NAME}
                                                </td>

                                                <td>
                                                    {item.PLATE_NUMBER}
                                                </td>

                                                <td className="grid-center">
                                                    {Utility.GetDateString(item.PLAN_START_DTG)}
                                                </td>

                                                <td className="grid-center">
                                                    {Utility.GetDateString(item.PLAN_END_DTG)}
                                                </td>

                                                <td className="grid-center">
                                                    {item.STATUS_NAME}
                                                </td>

                                                <td style={{ height: 90 }}>
                                                    <img className='w-100' src={item.URL} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            {/* <tr className="p-toolbar-group-left">

                                <td>
                                    <SMButton className="sm-button" onClick={() => {
                                        this.setState({
                                            index: 1
                                        })

                                    }}>
                                        <i className="fas fa-angle-double-left"></i>
                                    </SMButton>
                                </td>
                                <td>
                                    <SMButton className="sm-button" onClick={() => {
                                        this.setState({
                                            index: this.state.index - 1
                                        })

                                    }}>
                                        <i className="fas fa-angle-left"></i>
                                    </SMButton>
                                </td>
                                <td>
                                    <SMButton className="sm-button"
                                        onClick={() => {
                                            this.setState({
                                                index: this.state.index + 1
                                            })

                                        }}>
                                        <i className="fas fa-angle-right"></i>
                                    </SMButton>
                                </td>
                                <td>
                                    <button className="sm-button">
                                        <i className="fas fa-angle-double-right"></i>
                                    </button>
                                </td>
                            </tr> */}
                        </table>
                    </div>
                    <div className="sm-textbox w-100" >
                        <PagingUC showResult={true} pagingInfo={PagingInfo!} onPageIndexChange={(pageIndex) => this.loadData(pageIndex)}></PagingUC>
                    </div>
                </div>
            </div >
        );
    }
}
