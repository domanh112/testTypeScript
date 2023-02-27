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
    m_CARs: Array<M_CAR>;
    lstM_CAR_CATEGORY: Array<M_CAR_CATEGORY>;

    Filter: M_CARFilter;

    caR_ID?: number;

    //CAR_CAT_ID?: number;
}

export default class CarDefault extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);

        this.state = {
            Filter: new M_CARFilter(),
            lstM_CAR: [],
            m_CARs: [],
            lstM_CAR_CATEGORY: [],

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
            lstM_CAR_CATEGORY: response.lstM_CAR_CATEGORY!
        },
            async () => { await this.loadData(0) }
        )
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
        request.Filter = filter;
        const response = await HttpUtils.post<M_CARDTO>(
            ApiUrl.Car_Execute + "/SearchData",
            JSON.stringify(request)
        );
        this.setState({
            m_CARs: response.m_CARs! ?? [],
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

        const { lstM_CAR, m_CARs, Filter, lstM_CAR_CATEGORY, caR_ID } = this.state!;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>DANH SÁCH XE</h1>
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
                                        dataSource={lstM_CAR_CATEGORY}
                                        textField="name"
                                        valueField="caR_CATEGORY_ID"
                                        className="sm-combobox w-100"
                                        addBlankItem={true}
                                        blankItemText={"-------Tìm và chọn-------"}
                                        selectedValue={`${Filter.CAR_CATEGORY_ID || ''}`}
                                        onChange={(val: any) => {
                                            Filter.CAR_CATEGORY_ID = Number(val)
                                            this.setState({});
                                        }} />
                                </td>

                                <th>BIỂN SỐ XE</th>
                                <td>
                                    <ComboBox
                                        dataSource={lstM_CAR}
                                        textField="platE_NUMBER"
                                        valueField="caR_ID"
                                        className="sm-combobox w-100"
                                        addBlankItem={true}
                                        blankItemText={"-------Tìm và chọn-------"}
                                        selectedValue={`${Filter.CAR_ID || ''}`}
                                        onChange={(val: any) => {
                                            Filter.CAR_ID = Number(val)
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
                        <table style={{ width: "100%" }} className="allow-scroll">
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
                                    m_CARs?.map((item, index) => {
                                        return (
                                            <tr key={item.caR_ID}>
                                                <td className="grid-center">
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <Link to={`./${RouteUrls.Display}/${item.caR_ID}`} >
                                                        {item.platE_NUMBER}
                                                    </Link>
                                                </td>

                                                <td>
                                                    {item.categorY_NAME}
                                                </td>

                                                <td>
                                                    {item.color}
                                                </td>

                                                <td>
                                                    {item.description}
                                                </td>

                                                <td>
                                                    {item.price}
                                                </td>

                                                <td className="grid-center">
                                                    {item.createD_BY}
                                                </td>

                                                <td style={{ height: 90 }}>
                                                    <img className='w-100' src={item.url} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}
