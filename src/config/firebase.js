import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Corrige __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(
  __dirname,
  "../../queluz-app-firebase-adminsdk-fbsvc-b4bb26155b.json"
);

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
