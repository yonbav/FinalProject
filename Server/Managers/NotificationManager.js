const { Expo } = require('expo-server-sdk');
const authManager = require("./AuthManager");
const Notifications = require('../models/Notifications.');
var somePushTokens = [];

module.exports = {
    SendNotificationAsync: async (title,message,token) => {
        try {
            let isAuth = await authManager.isTokenValidAsync(token, 5)
            if (!isAuth) {
                return false;
            }
            // Create a new Expo SDK client
            let expo = new Expo();

            // Create the messages that you want to send to clents
            let messages = [];
            somePushTokens = [];
            await Notifications.find({}).cursor().eachAsync(doc => {
                somePushTokens.push(doc.id);
            });

            for (let pushToken of somePushTokens) {
                console.log(pushToken);
                // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

                // Check that all your push tokens appear to be valid Expo push tokens
                if (!Expo.isExpoPushToken(pushToken)) {
                    console.error(`Push token ${pushToken} is not a valid Expo push token`);
                    continue;
                }

                // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
                messages.push({
                    to: pushToken,
                    sound: 'default',
                    title: title,
                    body: message,
                    data: { withSome: 'data' },
                })
            }

            // The Expo push notification service accepts batches of notifications so
            // that you don't need to send 1000 requests to send 1000 notifications. We
            // recommend you batch your notifications to reduce the number of requests
            // and to compress them (notifications with similar content will get
            // compressed).
            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
                // Send the chunks to the Expo push notification service. There are
                // different strategies you could use. A simple one is to send one chunk at a
                // time, which nicely spreads the load out over time:
                for (let chunk of chunks) {
                    try {
                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                        console.log(ticketChunk);
                        tickets.push(...ticketChunk);
                        // NOTE: If a ticket contains an error code in ticket.details.error, you
                        // must handle it appropriately. The error codes are listed in the Expo
                        // documentation:
                        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                    } catch (error) {
                        console.error(error);
                    }
                }
            })();
            let receiptIds = [];
            for (let ticket of tickets) {
                if (ticket.id) {
                    receiptIds.push(ticket.id);
                }
            }

            let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
            (async () => {
                // Like sending notifications, there are different strategies you could use
                // to retrieve batches of receipts from the Expo service.
                for (let chunk of receiptIdChunks) {
                    try {
                        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                        console.log(receipts);

                        // The receipts specify whether Apple or Google successfully received the
                        // notification and information about an error, if one occurred.
                        for (let receipt of receipts) {
                            if (receipt.status === 'ok') {
                                continue;
                            } else if (receipt.status === 'error') {
                                console.error(`There was an error sending a notification: ${receipt.message}`);
                                if (receipt.details && receipt.details.error) {
                                    // The error codes are listed in the Expo documentation:
                                    // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                                    // You must handle the errors appropriately.
                                    console.error(`The error code is ${receipt.details.error}`);
                                }
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            })();
            return true;
        }
        catch (err) {
            console.log("Error in [isAddUserValidAsync]: " + err);
            return false;
        }
    }
};