import React from "react";
import { Link } from "react-router-dom";
import { ComboBox, SMButton, TextBox } from "./../../components/ComponentLib";
import ErrorHandler from "../../components/ErrorHandler";
import LoadingModal from "../../components/LoadingModal";
import ApiUrl from "../../constants/ApiUrl";
import { M_LOGINDTO, M_LOGINFilter } from "../../DtoParams/Administration/M_LOGINDTO";
import M_LOGIN from "../../entities/Administration/M_LOGIN";
import M_LOGIN_TYPE from "../../entities/Administration/M_LOGIN_TYPE";
import { iBaseProps, iBaseState } from "../../Interfaces/iBaseComponent";
import PagingInfo from "../../models/PagingInfo";
import { Icons } from "../../themes";
import PagingUC from "../../UserControls/uc/PagingUC";
import HttpUtils from "../../Utils/HttpUtils";
import { RouteUrls } from "../RouteManager";

interface iProp extends iBaseProps { }
interface iState extends iBaseState {
  lstM_LOGIN_TYPE: M_LOGIN_TYPE[];

  M_LOGINs: M_LOGIN[];

  Filter: M_LOGINFilter;

  PagingInfo: PagingInfo;

}

export default class UserDefault extends React.Component<iProp, iState> {
  constructor(props: any) {
    super(props);

    let id = this.props.match.params.id;
    this.state = {
      // OrderId: parseInt(this.props.match.params.id),
      Filter: new M_LOGINFilter(),
      M_LOGINs: [],
      lstM_LOGIN_TYPE: [],
      PagingInfo: new PagingInfo(),

    };
  }

  async componentDidMount() {
    LoadingModal.showLoading();
    try {
      await this.SetupViewForm();
    }
    catch (ex) {
      ErrorHandler.HandlerException(ex);
    }
    LoadingModal.hideLoading();
  }

  async SetupViewForm() {
    const request = new M_LOGINDTO();
    const response = await HttpUtils.post<M_LOGINDTO>(
      ApiUrl.Login_Execute + "/SetupViewForm",
      JSON.stringify(request)
    );
    this.setState({
      lstM_LOGIN_TYPE: response.lstM_LOGIN_TYPE!
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
    const request = new M_LOGINDTO();
    var filter = { ...this.state.Filter! };
    filter.PageIndex = pageIndex;
    request.Filter = filter;
    const response = await HttpUtils.post<M_LOGINDTO>(
      ApiUrl.Login_Execute + "/SearchData",
      JSON.stringify(request)
    );
    this.setState({
      M_LOGINs: response.M_LOGINs! ?? [],
      PagingInfo: response.PagingInfo!,
    },
      //  async () => { await this.loadData(0) }
    )
  }

  async resetSearch() {
    LoadingModal.showLoading();
    try {
      let newFilter = new M_LOGINFilter();

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

    const { lstM_LOGIN_TYPE, M_LOGINs, Filter, PagingInfo } = this.state!;

    return (

      <div className="layout-main box-grid-custom">
        <div className="toolbar">
          <div className="p-toolbar-group-left">
            <h1>DANH SÁCH ADMIN/USER</h1>
          </div>
          <div className="p-toolbar-group-right">
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
                <th>TÊN ĐĂNG NHẬP</th>
                <td>
                  <TextBox
                    value={Filter.USER_NAME || ''}
                    className="sm-textbox w-100"
                    onChange={(e: any) => {
                      Filter.USER_NAME = e.target.value
                      this.setState({});
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        this.doSearchAction()
                      }
                    }}
                  />
                </td>

                <th>MÃ ĐĂNG NHẬP</th>
                <td>
                  <TextBox
                    value={Filter.PASS_WORD || ''}
                    className="sm-textbox w-100"
                    onChange={(e: any) => {
                      Filter.PASS_WORD = e.target.value
                      this.setState({});
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        this.doSearchAction()
                      }
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

                  {/* <SMButton
                    className={'sm-button-link margin-right-5'}
                    onClick={() => {
                      this.setState({ isshowAdvanced: !isshowAdvanced, });
                      // reset mà vẫn giữ state
                      // Filter.DESCRIPTION = '' ;
                    }}>
                    <i className={isshowAdvanced === true ? Icons.curetUp : Icons.curetDown} />
                    {' Nâng cao '}
                  </SMButton> */}
                </td>
              </tr>
              <tr>
                <th>LOẠI TÀI KHOẢN</th>
                <td>
                  <ComboBox
                    dataSource={lstM_LOGIN_TYPE}
                    textField="LOGIN_NAME"
                    valueField="LOGIN_TYPE_ID"
                    selectedValue={`${Filter?.LOGIN_TYPE_ID || ''}`}
                    className="sm-combobox w-100"
                    addBlankItem={true}
                    blankItemText="--- Tất cả ---"
                    onChange={(val) => {
                      Filter.LOGIN_TYPE_ID = Number(val);
                      this.setState({});
                    }} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="h-datatable layout-fixed allow-fixheader">
            <table style={{ width: "100%" }} >
              <colgroup>
                <col width="5%" />
                <col width="20%" />
                <col width="20%" />
                <col width="15%" />
                <col width="20%" />
                <col width="10%" />
              </colgroup>

              <thead>
                <tr>
                  <th>STT</th>
                  <th>TÊN ĐĂNG NHẬP</th>
                  <th>MÃ ĐĂNG NHẬP</th>
                  <th>LOẠI TÀI KHOẢN</th>
                  <th>SĐT</th>
                  <th>NGƯỜI TẠO</th>
                </tr>
              </thead>

              <tbody>
                {
                  M_LOGINs.map((item, index) => {
                    return (
                      <tr key={item.LOGIN_ID}>
                        <td className="grid-center">
                          {PagingInfo?.PageSize! * PagingInfo?.PageIndex! + index + 1}
                        </td>

                        <td>
                          <Link to={`./${RouteUrls.Display}/${item.LOGIN_ID}`} >
                            {item.USER_NAME}
                          </Link>
                        </td>

                        <td>
                          {item.PASS_WORD}
                        </td>

                        <td>
                          {item.LOGIN_NAME}
                        </td>

                        <td>
                          {item.SDT}
                        </td>

                        <td className="grid-center">
                          {item.CREATED_BY}
                        </td>
                        {/* 
                        <td style={{ height: 90 }}>
                          <img className='w-100' src={item.URL} />
                        </td> */}
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
