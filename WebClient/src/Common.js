export const Constants = {
    SERVER_URL: 'http://192.168.1.14:3000',
    ERROR_MESSAGES: [
        "",
        "Incorrect username or password.",
        "Incorrect token.",
        "Wrong client number.",
        "Incorrect Business Date.",
        "No work hours defined To current business date.",
        "GroupType property in pos config is not defined.",
    ],
    INTERAL_ERROR_MESSAGE: "Internal server error, please check server logs.",
    LINK_KEYS: [
        "machine", 
        "ip", 
        "printer",
        "couchdb",
        "cod",
        "runner",
        "viewconfig",
        "exportlog",
        "restartclient",
        "pcrestart"
    ],
    ADMIN_LINK_KEYS: [
        "viewconfig",
        "exportlog",
        "restartclient",
        "pcrestart",
    ],
    ADMIN_LINK_LABELS: {
        viewconfig: "View Config",
        exportlog: "Export Logs (zip)",
        restartclient: "Restart Client",
        pcrestart: "Pc Restart",
    },
    DATA_KEYS: {
        MACHINE: "machine",
        POS_TYPE: "postype",
        IP: "ip",
        STATUS: "status",
        NETWORK: "network",
        PRINTER: "printer",
        VX: "vx",
        SCANNER: "scanner",
        FINGERPRINT: "fingerprint",
        COUCHDB: "couchdb",
        CLINET_STATE: "clientstate",
        COD: "cod",
        RUNNER: "runner",
        DRAWER: "drawer",
        VERSION: "version",
        TESTING_UNIT: "testingunitresult",
        TERMINALID: "terminalid",
        FREE_SPACE: "freespace",
        CPU_USAGE: "cpuusage",
        TOTAL_MEMORY: "totalmemory",
        USED_MEMORY: "usedmemory",
        VIEW_CONFIG: "viewconfig",
        EXPORT_LOGS: "exportlog",
        RESTART_CLIENT: "restartclient",
        PC_RESTART: "pcrestart",
    },
    ERROR_TEXTS:[
        "Error", "Low Paper", "Close", "Offline"
    ],
    GOOD_TEXTS:[
        "Ok", "Idle", "OK", "Open", "Online"
    ]
}

export const clone = (src) => {
    return JSON.parse(JSON.stringify(src));
}

export const getSpecialElement = (obejctArray, key, value) => {
    for (let object of obejctArray){
        if (Number(object[key]) === Number(value)){
            return object;
        }
    }
    return null;
}
