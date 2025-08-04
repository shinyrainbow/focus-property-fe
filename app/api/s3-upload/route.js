import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region: process.env.NEXT_AWS_S3_REGION,
	credentials: {
		accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
	}
});

async function uploadFileToS3(file, fileName) {

	const fileBuffer = file;
	// console.log(fileName, 8888);
	const params = {
		Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
		Key: `${fileName}-${Date.now()}`,
		Body: fileBuffer,
		ContentType: "image/jpg"
	}

	const command = new PutObjectCommand(params);
	console.timeLog()
	await s3Client.send(command);
	// console.log("fileName::::", fileName)
	return fileName;
}

export async function POST(request) {
	try {

		// const formData = await request.formData();

		const formData = await request.formData();
		// selectedFiles.forEach((file) => {
		//   formData.append('images[]', file); // 'images[]' is the key for the array of files
		// });
		// console.log('formData is tada........', formData)
		const files = formData.getAll("files");

		const uploadedFiles = []

		for (const file of files ) {
			const buffer = Buffer.from(await file.arrayBuffer())
			const fileName = await uploadFileToS3(buffer, file.name)
			console.log('fileName>>>>>', fileName)
			uploadedFiles.push(fileName)
		}

		console.log(uploadedFiles, 555555)
		// if(!file) {
		// 	return NextResponse.json( { error: "File is required."}, { status: 400 } );
		// } 
		// const buffer = Buffer.from(await file.arrayBuffer());
		// const fileName = await uploadFileToS3(buffer, file.name);
// console.log("successss kaaaa")


		return NextResponse.json({ success: true, fileName});
	} catch (error) {
		return NextResponse.json({ error });
	}
}