import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION })
const bucket = process.env.AWS_BUCKET

export async function getSignedDownloadUrl(path) {
    let command = new GetObjectCommand({ Bucket: bucket, Key: path })
    return await getSignedUrl(s3Client, command, { expiresIn: 60 })
}

export async function getSignedUploadUrl(path) {
    const command = new PutObjectCommand({ Bucket: bucket, Key: path });
    return await getSignedUrl(s3Client, command, { expiresIn: 600 })
}
