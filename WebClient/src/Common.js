export const Constants = {
    SERVER_URL: 'http://localhost:3000',
    ERROR_MESSAGES: [
    ],
    INTERAL_ERROR_MESSAGE: "Internal server error, please check server logs.",
    AUTHORIZATION: {
        EMPLOYEE   : "1",
        MANAGER    : "3",
        SUPERVIZER : "5",
    }
}

export const clone = (src) => {
    return JSON.parse(JSON.stringify(src));
}

export const defaultFilterMethod = (filter, row) => {
    return row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value);
}

export const EnumFunctions = { 
    AuthEnumToString: (value) => {
        switch (value) {
            case(Constants.AUTHORIZATION.SUPERVIZER):
            return "Supervizer";
            case(Constants.AUTHORIZATION.MANAGER):
            return "Manager";
            case(Constants.AUTHORIZATION.EMPLOYEE):
            return "Employee";
            default:
            return "Unknown";
        }
    },
}
