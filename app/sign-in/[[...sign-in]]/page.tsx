'use client'
import { SignIn } from '@clerk/nextjs'

export default function CustomSignInPage() {

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  )
}
