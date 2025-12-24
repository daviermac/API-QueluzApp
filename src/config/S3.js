import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "dotenv";
config()

const s3Client = new S3Client({ 
    region: process.env.AWS_REGION
})

const bucket_privado = process.env.AWS_PRIVATE_BUCKET
const bucket_publico = process.env.AWS_PUBLIC_BUCKET

export async function getSignedDownloadUrl(fileKey) {
    const command = new GetObjectCommand({ Bucket: bucket_privado, Key: fileKey })
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
}   

export async function getSignedUploadUrl(fileKey) {
    const command = new PutObjectCommand({ Bucket: bucket_privado, Key: fileKey });
    return await getSignedUrl(s3Client, command, { expiresIn: 60 })
}   

export async function uploadPhotoToS3(directory, fileBuffer, fileName, contentType) {
    const key = `${directory}/${Date.now()}-${fileName}`
    const command = new PutObjectCommand({
        Bucket: bucket_publico,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType
    })
    
    await s3Client.send(command)
    
    return key
}   
    
export async function deleteFileFromS3(fileUrl) {
    try {
        const key = fileUrl.split('.com/')[1]
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key
        })
        await s3Client.send(command)
    } catch (error) {
        console.error('Erro ao deletar arquivo do S3:', error)
    }
}
