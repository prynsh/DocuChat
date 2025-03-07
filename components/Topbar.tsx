
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'
import { FileText } from "lucide-react"

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <FileText className="h-6 w-6 text-primary" />
        <div className="text-xl font-bold cursor-pointer">DocuChat</div>
      </Link>

        <div>
        <SignedOut>
            <SignInButton />
            </SignedOut>
            <SignedIn>
            <UserButton />
         </SignedIn>
       </div>
    </header>
  )
}
