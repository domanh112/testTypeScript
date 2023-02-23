import M_LOGIN from "../../entities/Administration/M_LOGIN";
import M_LOGIN_TYPE from "../../entities/Administration/M_LOGIN_TYPE";
import { BaseDTO, BaseFilter } from "../BaseParam";

class M_LOGINDTO extends BaseDTO {

  public M_LOGIN?: M_LOGIN;

  public lstM_LOGIN_TYPE?: M_LOGIN_TYPE[];

  public M_LOGINs?: M_LOGIN[];

  public Filter?: M_LOGINFilter;
}

class M_LOGINFilter extends BaseFilter {

  public USER_NAME?: string;
  public PASS_WORD?: string;
  public LOGIN_TYPE_ID?: number;
}

export { M_LOGINDTO, M_LOGINFilter }
