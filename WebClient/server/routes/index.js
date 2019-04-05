var express = require('express');
var router = express.Router();

router.post('/api/ConfiguratorAPI/Login', function (req, res, next) {
	if (req.body.Username !== "Admin" || req.body.Password !== "1234"){
		res.status(200).json({
			ErrorCode: 1
		})
	}else{
		res.status(200).json({
			"Token": "6436f1d7-3033-4ed6-aaac-667013f74eec",
			"ErrorCode": 0
		})
	}	
});

router.post('/api/ConfiguratorAPI/HighAuthorizationOpenDay', function (req, res, next) {
	if (!req.body.Token){
		res.status(200).json({
			ErrorCode: 2
		});
	}else if (!req.body.BusinessDate){
		res.status(200).json({
			ErrorCode: 4
		});
	}
	else{
		res.status(200).json({
			"ErrorCode": 0
		})
	}	
});

router.post('/api/ConfiguratorAPI/StartClose', function (req, res, next) {
	res.status(200).json({
		ErrorCode: 0
	});
});

router.get('/api/ConfiguratorAPI/BusinessDate', function (req, res, next) {
	res.status(200).json({
		"BusinessDate": "21/05/2019",
		"ErrorCode": 0
	});
});

router.get('/api/ConfiguratorAPI/StoreStatus', function (req, res, next) {
	res.status(200).json({
		"StoreStatus": 3, 
		"ErrorCode": 0
	});
});

router.get('/api/ConfiguratorAPI/GetVersion', function (req, res, next) {
	res.status(200).json({
		"Version": "0.33.0.0"
	});
});

router.get('/api/ConfiguratorAPI/LogDisplayProperties', function (req, res, next) {
	res.status(200).json({
		"FileName": "Logs\\General_ILServer21_V30.0.0_Info_190115.txt", 
		"DateFormat": "yyyy-MM-dd",
		"ErrorCode": 0
	});
});

router.get('/api/ConfiguratorAPI/WorkingHours', function (req, res, next) {
	res.status(200).json({
		"WorkHours": {
			"OpenTime": "2018-08-19T07:30:00",
			"CloseTime": "2018-08-20T01:00:00" 
		},
		"ErrorCode": 0
	});
});

router.get('/api/ConfiguratorAPI/ClockedInEmployees', function (req, res, next) {
	res.status(200).json({
		"ClockedEmployees": 2,
		"ErrorCode": 0
	});
});

router.get('/api/ConfiguratorAPI/GetClients', function (req, res, next) {
	const response = [];
	for (let i = 0; i < 27; i++) {
        const dummyData = [{
            Machine: String(i + 1),
            "PosType": "Kiosk",
            "Ip": "192.168.0.79",
            "Status": "Unknown",
            "Network": "Offline",
            "Printer": "",
            "Vx": "",
            "Scanner": "",
            "FingerPrint": "",
            "CouchDB": "",
            "ClientState": "Unknown",
            "COD": "",
            "Runner": "",
            "Drawer": "",
            "Version": "",
            "TestingUnitResult": "",
            "TerminalId": "",
            "FreeSpace": "",
            "CPUUsage": "",
            "TotalMemory": "",
            "UsedMemory": ""
        },{
            Machine: String(i + 1),
            "PosType": "Kiosk",
            "Ip": "192.168.0.79",
            "Status": "Unknown",
            "Network": "Offline",
            Printer: { Status:"Error", Error:"Low Paper"}, 
            "Vx": "",
            "Scanner": "",
            "FingerPrint": "",
            "CouchDB": "",
            "ClientState": "Unknown",
            "COD": "",
            "Runner": "",
            "Drawer": "",
            "Version": "",
            "TestingUnitResult": "",
            "TerminalId": "",
            "FreeSpace": "",
            "CPUUsage": "",
            "TotalMemory": "",
            "UsedMemory": ""
        },{
            Machine: String(i + 1),
            PosType: 0,
            Ip: "172.17.65.1",
            Status: "Open",
            Network: "true",
            Printer: { Status:"Ok", Error:""}, 
            Vx: "OK",
            Scanner: {
                Status: "OK",
                Id: "9721234679",
                Time: "12:24:00"
            },
            FingerPrint: {
                Version: "1.05",
                LastClock: "12:05:04"
            },
            CouchDB: "OK",
            ClientState: {
                Status: "Idle",
                LastOrder: "107"
            },
            COD: "COD_1",
            Runner: "Baker",
            Drawer: {
                Client: "pos",
                LastOpen: "12:27:00"
            },
            Version: {
                Number: "0.23.0.0",
                LastUpdate: "12/02/18 11:04:00"
            },
            TestingUnitResult: {
                Result: "PASS",
                TestTime: "9:00:00"
            },
            TerminalId: "0960031",
            FreeSpace: "0.87",
            CPUUsage: "97.30",
            TotalMemory: "7.88 Gb",
            UsedMemory: "3.45 Gb"
        }]
        response.push(dummyData[Math.round((Math.random() * 10000)) % 3]);
    }
	res.status(200).json({ClientsDataList:response});
});

router.get('/api/ConfiguratorAPI/GetPosConfig', function (req, res, next) {
	res.status(200).json({
		"Config": {
            "_id": "Kiosk97",
            "PosNumber": 97,
            "ClientType": 4,
            "IP": "192.168.0.97",
            "Status": "OK",
            "Config": {
                "Arb": true,
                "Arb_Item": 9985,
                "AllowPayFewCreditCards": false,
                "CashOpenTime": 240,
                "DefaultLanguage": "heb",
                "DisplayDebugInfo": true,
                "DisableMenuItemID": 9996,
                "Eng": true,
                "Eng_Item": 9984,
                "GhostTouchTreshold": 30,
                "Heb_Item": 9983,
                "Heb": true,
                "IgnoreCoinInsertionDoorSensor": false,
                "IgnoreCoinExctarctionDoorSensor": false,
                "IgnoreMainCashDoorSensor": false,
                "IgnoreErrors": false,
                "IgnorePrinterErrors": true,
                "IsSilentPosDisable": false,
                "IsFailMakeTest": false,
                "IsShowTsVideo": false,
                "Lifestyle_Discount": 0,
                "LevelAmount_WithoutDiscount": true,
                "MaxMemoryPrecentageUsageAllowed": 95,
                "MinimumAmount": 0,
                "MaximumAmount": 499,
                "Number_Of_UpSale_Pages": 1,
                "Number_Of_Suggestive_Sale_Pages": 0,
                "Reduce": 3,
                "RestartDays": "1,2,4,5",
                "ScreenOffPeriod": 1,
                "SummerCampaign_PopUpPriceThreshold": 50,
                "SplitScrollerIntervals": 1,
                "Timeout": 120,
                "TimeBeforeOpen": 30,
                "TimeBeforeClose": 7,
                "TimeBeforeShake": 6,
                "TouchDragDistance": 30,
                "TimeBeforeError": 15,
                "TechModePass": "12345",
                "TimeBeforeTurnScreenOff": 15,
                "TakeReceiptTimer": 1,
                "TimeBeforeRetryShvaTransmit": "1",
                "UseCampaignVarification": true,
                "Port": 25,
                "Host": "smtp.gmail.com",
                "MailAddress": "sbenari3@gmail.com",
                "SummerCampaignIni": "C:\\AAPos\\Application\\Campaign 123.ini",
                "DonationCampaignIni": "C:\\AAPos\\Application\\Campaign 35.ini",
                "PosIp": "192.168.0.97",
                "WebServerPort": "8080",
                "RunnerNum": 0,
                "RunnerQueue": 0,
                "Vx": true,
                "CashMachine": "",
                "CompanyCards": true,
                "HardwareTestInterval": 10000,
                "IsManagerPos": false,
                "UpdateDelayTimeSec": 5,
                "MaxEcardPayments": 2,
                "MinimumTotalPriceToAllowedSplitPayments": 20,
                "MinimumAmountAllowedPerCard": 5,
                "DeleteCouchDBTablesInterval": 9999,
                "MaximumTimeForCardTrans": 15,
                "ShowMessageID": true,
                "GroupType": null,
                "ScannerType": "Zebra",
                "AllowTS": false,
                "DismissTsObjectSecondsIntervalAfterServe": 60,
                "SafetyDismissTsObjectMinutesInterval": 60,
                "TsScanningOption": 2,
                "MckitiIp": "192.168.0.97",
                "DeleteLogsDaysInterval": 60,
                "TerminalID": "0960028",
                "ECRID": "000000097",
                "TerminalName": "Alcon Test",
                "IgnoreSignature": false,
                "SignTriesThreshold": 1,
                "DeleteOldVxLogsTimeLimit": 60,
                "ComTestIntervalsInMinutes": 10
            },
            "Name": "Kiosk97"
        }
	});
});

router.get('/api/ConfiguratorAPI/LoadStoreData', function (req, res, next) {
	// res.status(400).json({
	// 	"Message": "Internal server error, failed to close store. Please check logs."
	// });
	res.status(200).json({
	});
});

router.get('/api/ConfiguratorAPI/LoadPosConfig', function (req, res, next) {
	// res.status(400).json({
	// 	"Message": "Internal server error, failed to close store. Please check logs."
    // });
    res.status(200).json({
	});
});


router.use(function (err, req, res, next) {
    if (err) {
        console.log(err);
        res.status(404).json({
            "Message": "Internal server error, failed to close store. Please check logs."
        })
        return;
    }
});

module.exports = router;