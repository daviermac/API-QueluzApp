import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "dotenv";
config()

const s3Client = new S3Client({ 
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    } 
})
const bucket = process.env.AWS_BUCKET

export async function getSignedDownloadUrl(fileKey, fileType) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: fileKey, ContentType: fileType })
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

export async function getSignedUploadUrl(fileKey, fileType) {
    const command = new PutObjectCommand({ Bucket: bucket, Key: fileKey, ContentType: fileType });
    return await getSignedUrl(s3Client, command, { expiresIn: 60 })
}
