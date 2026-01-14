import admin from "firebase-admin";
import serviceAccount from '../../queluz-app-firebase-adminsdk-fbsvc-b4bb26155b.json'

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default app
