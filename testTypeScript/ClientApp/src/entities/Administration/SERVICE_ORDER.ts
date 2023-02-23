
export default class SERVICE_ORDER {

    public ORDER_ID?: number;
    public CAR_ID?: number;
    public DICTSTATUSNAME?: string;
    public PLATE_NUMBER?: String;
    public TIME_CATEGORY?: number;
    public ORDER_DURATION?: number;
    public PLAN_START_DTG?: Date;
    public PLAN_END_DTG?: Date;
    public ACTUAL_START_DTG?: Date;
    public ACTUAL_END_DTG?: Date;
    public CUSTOMER_NAME?: string;
    public DESCRIPTION?: string;
    public STATUS?: number;
    public DELETED?: number;
    public VERSION?: number;
    public CREATED_BY?: string;
    public CREATED_DTG?: Date;
    public UPDATED_BY?: string;
    public UPDATED_DTG?: Date;

    // ExtendMember

    public STATUS_NAME?: string;
    public NAME?: string;
    public URL?: string;

}
