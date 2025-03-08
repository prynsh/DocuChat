'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import React from "react"

type Props={
    children: React.ReactNode
}

const queryClient= new QueryClient


export default function  Provider  ({children}: Props)  {
  return (
    <div>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  )
}


