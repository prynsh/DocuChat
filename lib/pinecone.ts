import { Pinecone, PineconeRecord} from '@pinecone-database/pinecone';
import { DownloadFromS3 } from './s3-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {Document, RecursiveCharacterTextSplitter} from "@pinecone-database/doc-splitter"
import { getEmbeddings } from './embeddings';
import md5 from "md5"
import { convertToASCII } from './utils';

export const getPineConeClient= async ()=>{
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!
    });
    return pc;
}



type PDFPage={
    pageContent:string,
    metadata:{
        loc:{pageNumber:number}
    }
}

export async function loadS3IntoPinecone(filekey:string) {
    console.log("Downloading S3 into file system")
    const file_name = await DownloadFromS3(filekey);
    if(!file_name){
        throw new Error ("Could not download from S3")
    }
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];
    console.log(pages);
    const documents = await Promise.all(pages.map(prepareDocument));

    const vectors = await Promise.all(documents.flat().map(embedDocument));

    const client = await getPineConeClient();

    const pineConeIndex = client.Index('docu-chat-768')
    const namespace = pineConeIndex.namespace( convertToASCII(filekey));
    console.log("inserting vectors into Pinecone")
    await namespace.upsert(vectors);
    return documents[0]


}


// async function embedDocument(doc:Document){
//     try {
//         const embeddings = await getEmbeddings(doc.pageContent)
//         const hash = md5(doc.pageContent)
//         return {
//              id: hash,
//              values: embeddings,
//              metadata:{
//                 text: doc.metadata.text,
//                 pageNumber : doc.metadata.pageNumber
//              }
//         } as PineconeRecord
//     } catch (error) {
//         console.log("error embedding document", error)
//         throw error;
//     }
// }
// Import the modified function

async function embedDocument(doc: Document) {
    try {
        const embeddings = await getEmbeddings(doc.pageContent);
        const hash = md5(doc.pageContent);

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber,
            },
        } as PineconeRecord;
    } catch (error) {
        console.error("Error embedding document", error);
        throw error;
    }
}


export const truncateStringByBytes=(str: string, bytes:number)=>{
    const enc = new TextEncoder()
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0,bytes));
} 

async function prepareDocument(page:PDFPage){
    const {metadata} = page;
    let {pageContent}  = page;
    pageContent= pageContent.replace(/\n/g,'')
    const splitter = new RecursiveCharacterTextSplitter() 
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata:{
                pageNumber: metadata.loc.pageNumber,
                text:truncateStringByBytes(pageContent,36000)
            }
        })
    ])
    return docs;
}   