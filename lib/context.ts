import { Pinecone } from "@pinecone-database/pinecone";
import { convertToASCII } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(embeddings:number[],fileKey:string){
    const getPineConeClient= async ()=>{
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!
        });
        return pc;
    }
    const client = await getPineConeClient();
    const pineConeIndex = client.Index('docu-chat-768')
    try {
        const namespace = pineConeIndex.namespace( convertToASCII(fileKey));
        const queryResult = await pineConeIndex.query({
                topK:5,
                vector:embeddings,
                includeMetadata:true,
        })
        return queryResult.matches || [];
    } catch (error) {
        console.log('error querying embeddings',error);
        throw error;
    }
}


export async function getContext(query:string,fileKey:string) {
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings , fileKey);

    const qualiflyingDocs = matches.filter(
        (match)=> match.score && match.score> 0.5
    )

    type MetaData={
        text:string,
        pageNumber: number
    }
    const docs = qualiflyingDocs.map(match=>(match.metadata as MetaData).text)
    return docs.join('\n').substring(0,3000);
}