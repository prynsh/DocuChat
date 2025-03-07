import { Button } from "@/components/ui/button";
import { Zap, FileText, Brain, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
            Chat with Your Documents
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your documents into interactive conversations. Upload PDFs, docs, or text files and get instant, intelligent responses.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard 
              icon={<FileText className="h-6 w-6 text-primary" />} 
              title="Multiple Formats" 
              description="Support for PDFs, Word docs, text files, and more. Easy upload and instant processing." 
            />
            <FeatureCard 
              icon={<Brain className="h-6 w-6 text-primary" />} 
              title="AI-Powered Chat" 
              description="Advanced AI understands context and provides accurate, relevant responses to your questions." 
            />
            <FeatureCard 
              icon={<Lock className="h-6 w-6 text-primary" />} 
              title="Secure & Private" 
              description="Your documents are encrypted and processed securely. Your data stays private." 
            />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-4 text-center text-gray-600">
        Created by Priyansh Verma
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
