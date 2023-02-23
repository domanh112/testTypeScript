import { BaseDTO, BaseFilter } from '../BaseParam';
import iKeyValuePair from '../../Interfaces/iKeyValuePair';
import M_SERVICE_ORDER from '../../entities/Administration/SERVICE_ORDER';
import M_CAR from '../../entities/Administration/CAR';
import M_STATUS from '../../entities/Administration/M_STATUS';
import SERVICE_ORDER from '../../entities/Administration/SERVICE_ORDER';
import CAR from '../../entities/Administration/CAR';


class M_SERVICE_ORDERDTO extends BaseDTO {
    public dictStatus?: Array<iKeyValuePair<number, string>>;

    public ORDER_ID?: number;

    public dicCat?: Array<iKeyValuePair<number, string>>;

    public M_CARs?: Array<CAR>;

    public M_SERVICE_ORDER?: SERVICE_ORDER;

    public M_SERVICE_ORDERs?: Array<SERVICE_ORDER>;

    public M_Statuss?: Array<M_STATUS>;

    public Filter?: M_SERVICE_ORDERFilter;

}

class M_SERVICE_ORDERFilter extends BaseFilter {
    public CAR_ID?: number;
    public PAGE_NUM?: number;
    public PAGE_SIZE?: number;
    public PLAN_START_DTG?: Date;
    public PLAN_END_DTG?: Date;
    public CUSTOMER_NAME?: string;
    public STATUS?: number;

}

export { M_SERVICE_ORDERDTO, M_SERVICE_ORDERFilter }
