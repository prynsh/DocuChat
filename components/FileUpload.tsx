'use client'
import { Inbox } from "lucide-react"
import {useDropzone } from "react-dropzone"

export default function FileUpload() {
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf",".json",".txt"] },
        maxFiles: 1,
        onDrop:(acceptedFiles)=>{
            console.log(acceptedFiles)
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
              <>
                <Inbox className="w-10 h-10 text-blue-500" />
                <p className="mt-2 text-sm text-slate-400">Drop your Files Here</p>
              </>
          </div>
        </div>
      );
}

