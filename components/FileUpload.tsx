
import { uploadtoS3 } from "@/lib/s3"
import { useMutation } from "@tanstack/react-query"
import { Inbox, Loader2 } from "lucide-react"
import {useDropzone } from "react-dropzone"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"



export default  function FileUpload() {
  const router = useRouter();
  const [uploading,setUploading]= useState(false)
    const { mutate, isPending}  = useMutation({
      mutationFn: async({file_key,
         file_name
        }:{
          file_key:string,
          file_name:string
        })=>{
        const response = await axios.post("/api/create-chat",
        {file_key, file_name}); 
        return response.data;
      }, 
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf",".json",".txt"] },
        maxFiles: 1,
        onDrop:async(acceptedFiles)=>{
            console.log(acceptedFiles)
            const file = acceptedFiles[0]
            if(file.size > 10*1024*1024){
                toast.error('Please Upload a smaller file than 10Mb')
                return
            }
            try{
              setUploading(true)
                const data =await uploadtoS3(file)
                if(!data?.file_key || !data.file_name){
                  toast.error("something went wrong");
                  return;
                }
                mutate(data, {
                  onSuccess:({chat_id})=>{
                    toast.success("Chat Created");
                    router.push(`/chat/${chat_id}`)

                    console.log(data)
                  },onError:(e)=>{
                    toast.error("Error creating Chat")
                    console.log(e);
                    
                  }
                })
            }catch(e){
                console.log(e);
            }finally{
              setUploading(false);
            }
        }
    })
    return (
        <div className="p-2 bg-white rounded-xl w-full">
          <div
            {...getRootProps({
              className:
                "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
            })}
          >
            <input {...getInputProps()} />
                {(isPending || uploading)?(<>
                  <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
                    <p className="mt-2  text-sm text-slate-400">Sending Files to GPT....</p>
                </>):(
              <>
                  <Inbox className="w-10 h-10 text-blue-500" />
                <p className="mt-2 text-sm text-slate-400">Drop your Files Here</p>
              </>
            )}
          </div>
        </div>
      );
}

