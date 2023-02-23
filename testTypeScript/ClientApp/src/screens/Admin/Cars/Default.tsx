import React from "react";
import { Link } from "react-router-dom";
import ComboBox from "../../../components/ComboBox";
import ErrorHandler from "../../../components/ErrorHandler";
import LoadingModal from "../../../components/LoadingModal";
import SMButton from "../../../components/SMButton";
import ApiUrl from "../../../constants/ApiUrl";
import { M_CARDTO, M_CARFilter } from "../../../DtoParams/Administration/M_CARDTO";
import M_CAR from "../../../entities/Administration/CAR";
import M_CAR_CATEGORY from "../../../entities/Administration/M_CAR_CATEGORY";
import { iBaseProps, iBaseState } from "../../../Interfaces/iBaseComponent";
import PagingInfo from "../../../models/PagingInfo";
import { Icons } from "../../../themes";
import PagingUC from "../../../UserControls/uc/PagingUC";
import HttpUtils from "../../../Utils/HttpUtils";
import { RouteUrls } from "../../RouteManager";

interface iProp extends iBaseProps { }
interface iState extends iBaseState {
    lstM_CAR: Array<M_CAR>;
    M_CARs: Array<M_CAR>;
    M_CAR_CATEGORYs: Array<M_CAR_CATEGORY>;
    Filter: M_CARFilter;
    PagingInfo: PagingInfo;

}

export default class CarDefault extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);

        this.state = {
            Filter: new M_CARFilter(),
            lstM_CAR: [],
            M_CARs: [],
            M_CAR_CATEGORYs: [],
            PagingInfo: new PagingInfo(),

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
        const request = new M_CARDTO();
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/SetupViewForm",
            JSON.stringify(request)
        );

        this.setState({
            lstM_CAR: response.lstM_CAR!,
            M_CAR_CATEGORYs: response.M_CAR_CATEGORYs!
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
        const request = new M_CARDTO();
        var filter = { ...this.state.Filter! };
        filter.PageIndex = pageIndex;
        request.Filter = filter;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/SearchData",
            JSON.stringify(request)
        );
        this.setState({
            M_CARs: response.M_CARs! ?? [],
            PagingInfo: response.PagingInfo!,
        },
            // async () => { await this.loadData(0) }
        )
    }

    async resetSearch() {
        LoadingModal.showLoading();
        try {
            let newFilter = new M_CARFilter();

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

        const { lstM_CAR, M_CARs, Filter, M_CAR_CATEGORYs, PagingInfo } = this.state!;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>DANH SÁCH CARS</h1>
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
                            <col width="10%" />
                            <col width="20%" />
                            <col width="10%" />
                            <col width="25%" />
                            <col width="15%" />
                            <col />
                        </colgroup>

                        <tbody>
                            <tr>
                                <th>LOẠI XE</th>
                                <td>
                                    <ComboBox
                                        dataSource={M_CAR_CATEGORYs}
                                        textField="NAME"
                                        valueField="CAR_CATEGORY_ID"
                                        className="sm-combobox w-100"
                                        addBlankItem={true}
                                        selectedValue={`${Filter.CAR_CATEGORY_ID || ''}`}
                                        onChange={(e) => {
                                            Filter.CAR_CATEGORY_ID = parseInt(e)
                                            this.setState({});
                                        }} />
                                </td>

                                <th>BIỂN SỐ XE</th>
                                <td>
                                    <ComboBox
                                        dataSource={lstM_CAR}
                                        textField="PLATE_NUMBER"
                                        valueField="CAR_ID"
                                        className="sm-combobox w-100"
                                        addBlankItem={true}
                                        selectedValue={`${Filter.CAR_ID || ''}`}
                                        onChange={(e) => {
                                            Filter.CAR_ID = parseInt(e)
                                            this.setState({});
                                        }} />
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
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="h-datatable layout-fixed allow-fixheader">
                        <table style={{ width: "100%" }} >
                            <colgroup>
                                <col width="5%" />
                                <col width="10%" />
                                <col width="15%" />
                                <col width="10%" />
                                <col width="15%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="15%" />
                            </colgroup>

                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>BIỂN SỐ XE</th>
                                    <th>LOẠI XE</th>
                                    <th>MÀU SẮC</th>
                                    <th>MÔ TẢ</th>
                                    <th>GIÁ THUÊ</th>
                                    <th>NGƯỜI TẠO</th>
                                    <th>ẢNH MÔ TẢ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    M_CARs.map((item, index) => {
                                        return (
                                            <tr key={item.CAR_ID}>
                                                <td className="grid-center">
                                                    {PagingInfo?.PageSize! * PagingInfo?.PageIndex! + index + 1}
                                                </td>

                                                <td>
                                                    <Link to={`./${RouteUrls.Display}/${item.CAR_ID}`} >
                                                        {item.PLATE_NUMBER}
                                                    </Link>
                                                </td>

                                                <td>
                                                    {item.BIKE_NAME}
                                                </td>

                                                <td>
                                                    {item.COLOR}
                                                </td>

                                                <td>
                                                    {item.DESCRIPTION}
                                                </td>

                                                <td>
                                                    {item.PRICE}
                                                </td>

                                                <td className="grid-center">
                                                    {item.CREATED_BY}
                                                </td>

                                                <td style={{ height: 90 }}>
                                                    <img className='w-100' src={item.URL} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
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
