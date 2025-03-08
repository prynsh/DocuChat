import { Pinecone } from '@pinecone-database/pinecone';
import { DownloadFromS3 } from './s3-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
});


export async function loadS3IntoPinecone(filekey:string) {
    console.log("Downloading S3 into file system")
    const file_name = await DownloadFromS3(filekey);
    if(!file_name){
        throw new Error ("Could not download from S3")
    }
    const loader = new PDFLoader(file_name);
    const pages = await loader.load()
    console.log(pages);
    return pages;
}