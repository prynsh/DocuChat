"use client";

import FileUpload from "@/components/FileUpload";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-r from-[#dfe2fe] via-[#b1cbfa] to-[#8e98f5] h-screen flex justify-center items-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Chat with Any PDF
        </h1>
        <FileUpload />
      </div>
    </div>
  );
}
