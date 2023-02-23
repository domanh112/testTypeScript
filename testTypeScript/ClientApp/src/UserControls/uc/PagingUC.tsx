import React from "react";
import MultilineLabel from "../../components/MultilineLabel";
import PagingInfo from "../../models/PagingInfo";

interface iProps {
  onPageIndexChange?: (pageIndex: number) => void;
  pagingInfo: PagingInfo;
  showResult?: boolean;
}

interface iState {
  groupIndex: number;
}

const groupNumber: number = 10;
export default class PagingUC extends React.Component<iProps, iState> {
  constructor(props: iProps) {
    super(props);
    this.state = {
      groupIndex: 0,
    };
  }

  async componentDidMount() { }

  async onPageIndexChange(pageIndex: number) {
    this.setState(
      {
        groupIndex: Math.floor(pageIndex / groupNumber),
      },
      () => {
        if (this.props.onPageIndexChange)
          this.props.onPageIndexChange(pageIndex);
      }
    );
  }

  renderPrevNode() {
    return (
      <>
        <li
          key={-1}
          className={`grid-left paging__btn ${this.props.pagingInfo.PageIndex! > 0 ? "active" : ""
            }`}
          aria-disabled="true"
          onClick={() => {
            this.onPageIndexChange(this.props.pagingInfo.PageIndex! - 1);
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </li>

        {this.state.groupIndex > 0 ? (
          <>
            <li
              key={-11}
              className="grid-left paging__dots"
              onClick={() => {
                this.onPageIndexChange(0);
              }}
            >
              {1}
            </li>

            <li
              key={-111}
              className="grid-left paging__dots"
              onClick={() => {
                this.onPageIndexChange(
                  (this.state.groupIndex - 1) * groupNumber + (groupNumber - 1)
                );
              }}
            >
              ...
            </li>
          </>
        ) : (
          ""
        )}
      </>
    );
  }

  renderNextNode() {
    let pagingInfo = this.props.pagingInfo;
    let totalPage = Math.ceil(pagingInfo.RecordCount! / pagingInfo.PageSize!)!;
    let pageCount = Math.min(
      (this.state.groupIndex + 1) * groupNumber,
      totalPage
    );
    return (
      <>
        {pageCount < totalPage ? (
          <>
            <li
              key={-2}
              className=" grid-left paging__dots"
              onClick={() => {
                this.onPageIndexChange(
                  (this.state.groupIndex + 1) * groupNumber
                );
              }}
            >
              ...
            </li>
            <li
              key={-22}
              className="grid-left paging__dots"
              onClick={() => {
                this.onPageIndexChange(totalPage - 1);
              }}
            >
              {totalPage}
            </li>
          </>
        ) : (
          ""
        )}
        <span
          key={-222}
          className={`grid-left paging__btn ${(pagingInfo.PageIndex! + 1) * pagingInfo.PageSize! <=
            pagingInfo.RecordCount!
            ? "active"
            : ""
            }`}
          onClick={() => {
            this.onPageIndexChange(pagingInfo.PageIndex! + 1);
          }}
        >
          {" "}
          <i className="fas fa-chevron-right"></i>
        </span>
      </>
    );
  }

  renderPageNumber() {
    let pagingInfo = this.props.pagingInfo;
    let prevCount = this.state.groupIndex * groupNumber;
    let totalPage = Math.ceil(pagingInfo.RecordCount! / pagingInfo.PageSize!)!;
    let pageCount = Math.min(
      (this.state.groupIndex + 1) * groupNumber,
      totalPage
    );

    let indents: any[] = [];
    for (let i = prevCount; i < pageCount; i++) {
      indents.push(
        <li
          className={`grid-left paging__numbers ${i === pagingInfo.PageIndex! ? "active" : ""
            }`}
          key={i}
          onClick={() => {
            this.onPageIndexChange(i);
          }}
        >
          {" "}
          {i + 1}
        </li>
      );
    }
    return indents;
  }

  getResultText() {
    let pagingInfo = this.props.pagingInfo;
    let currentItem = (pagingInfo.PageIndex! + 1) * pagingInfo.PageSize!;
    let result = `Bản ghi ${pagingInfo.RecordCount! === 0
      ? 0
      : pagingInfo.PageIndex! * pagingInfo.PageSize! + 1
      } đến ${currentItem > pagingInfo.RecordCount!
        ? pagingInfo.RecordCount!
        : currentItem
      } trên tổng số ${pagingInfo.RecordCount!} bản ghi`;

    return result;
  }

  render() {
    return (
      <div className="paging_content">
        <div style={{ display: "flex" }}>
          <ul className="paging">
            {this.renderPrevNode()}
            {this.renderPageNumber()}
            {this.renderNextNode()}
          </ul>
        </div>
        {(this.props.showResult || false) && (
          <div>
            {/* <MultilineLabel value={this.getResultText()}></MultilineLabel> */}
            <span>{this.getResultText()}</span>
          </div>
        )}
      </div>
    );
  }
}