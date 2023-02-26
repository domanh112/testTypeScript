import M_CAR from "../../entities/Administration/CAR";
import M_CAR_CATEGORY from "../../entities/Administration/M_CAR_CATEGORY";
import { BaseDTO, BaseFilter } from "../BaseParam";

class M_CARDTO extends BaseDTO {

    public m_CAR?: M_CAR;

    public caR_ID?: number;

    public CAR_CAT_ID?: number;

    public lstM_CAR?: Array<M_CAR>;

    public m_CARs?: Array<M_CAR>;

    public lstM_CAR_CATEGORY?: Array<M_CAR_CATEGORY>;

    public Filter?: M_CARFilter;
}

class M_CARFilter extends BaseFilter {
    public CAR_CATEGORY_ID?: number;
    public CAR_ID?: number;
    public PLATE_NUMBER?: string;
    public NAME?: string;
}

export { M_CARDTO, M_CARFilter }
