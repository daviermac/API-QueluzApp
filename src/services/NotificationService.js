import admin from "../config/firebase.js";

export async function sendPushNotification({ token, title, body, data = {}}) {
    const message = {
        token,
        notification: {
            title,
            body
        },
        data
    }

    try {
        const response = await admin.messaging().send(message)
        console.log("Notificação enviada: ", response)
        return response
    } catch (error) {
        console.error("Erro ao enviar notificação:", error);
        throw error;
    }
}
