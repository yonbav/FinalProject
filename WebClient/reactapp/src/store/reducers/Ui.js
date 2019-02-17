import {
    ON_SHOW_FULLLOADER,
    ON_HIDE_FULLLOADER,
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    SHOW_INDICATOR,
    HIDE_INDICATOR,
    TOGGLE_LOGIN_FORM,
    TOGGLE_BSDATE_FORM,
    TOGGLE_POSCONFIG_FORM,
} from '../actionTypes';

const INIT_STATE = {
    fullLoader: {
        flag: false,
        text: 'Data Loading...'
    },
    message: {
        isShowMsg: false,
        data: {
            msg: '',
            type: 'success'
        }
    },
    loader: 0,
    isOpenLoginForm: false,
    isOpenBSDateForm: false,
    isOpenDlg: false,
    dlgContent: {}
};


export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case SHOW_MESSAGE: {
            return {
                ...state,
                message: {
                    isShowMsg: true,
                    data: action.payload,
                }
            }
        }

        case HIDE_MESSAGE: {
            return {
                ...state,
                message: {
                    isShowMsg: false,
                    data: {
                        msg: '',
                        type: 'success'
                    },
                }
            }
        }

        case ON_SHOW_FULLLOADER: {
            return {
                ...state,
                fullLoader:{
                    flag: true,
                    text: action.payload || 'Data Loading...',
                }
            }
        }

        case ON_HIDE_FULLLOADER: {
            return {
                ...state,
                fullLoader:{
                    flag: false,
                    text: null,
                }
            }
        }

        case SHOW_INDICATOR: {
            return {
                ...state,
                loader: state.loader + 1,
            }
        }

        case HIDE_INDICATOR: {
            return {
                ...state,
                loader: state.loader - 1,
            }
        }

        case TOGGLE_LOGIN_FORM: {
            return {
                ...state,
                isOpenLoginForm: !state.isOpenLoginForm,
            }
        }

        case TOGGLE_BSDATE_FORM: {
            return {
                ...state,
                isOpenBSDateForm: !state.isOpenBSDateForm,
            }
        }

        case TOGGLE_POSCONFIG_FORM: {
            return {
                ...state,
                isOpenDlg: !state.isOpenDlg,
                dlgContent: action.payload
            }
        }

        default:
            return state;
    }
}
