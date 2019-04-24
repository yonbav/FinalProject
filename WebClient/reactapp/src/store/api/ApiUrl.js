import {Constants} from '../../Common';

export default {

    // login
    LOGIN: `${Constants.SERVER_URL}/Auth/Login`,
    
    // business day
    GET_BUSINESS_DAY: `${Constants.SERVER_URL}/BusinessDate`,
    // business day
    GET_STORE_STATUS: `${Constants.SERVER_URL}/StoreStatus`,
    // open hours
    GET_OPEN_HOURS: `${Constants.SERVER_URL}/WorkingHours`,
    // employee count
    GET_EMPLOYEE_COUNT: `${Constants.SERVER_URL}/ClockedInEmployees`,
    // get version
    GET_VERSION: `${Constants.SERVER_URL}/GetVersion`,
    // get store name
    GET_STORE_NAME: `${Constants.SERVER_URL}/GetStoreName`,
    // load stroe data
    LOAD_STORE_DATA: `${Constants.SERVER_URL}/LoadStoreData`,
    // load pos config
    LOAD_POS_CONFIG: `${Constants.SERVER_URL}/LoadPosConfig`,
    // get pos config
    GET_POS_CONFIG: `${Constants.SERVER_URL}/GetPosConfig`,
    // hig authorization open day
    HIGH_AUTh_OPEN_DAY: `${Constants.SERVER_URL}/HighAuthorizationOpenDay`,
    // start close
    START_CLOSE: `${Constants.SERVER_URL}/StartClose`,
    // log display properties
    LOG_DISPLAY_PROPERTIES: `${Constants.SERVER_URL}/LogDisplayProperties`,
    // get all client monitor datas
    GET_ALL_CLIENTS: `${Constants.SERVER_URL}/GetClients`,
}

