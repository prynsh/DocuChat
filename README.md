# DocuChat

DocuChat is a document-based AI chatbot that allows users to upload PDF files, store their embeddings, and interact with them using semantic search. When a user asks a question, the system retrieves relevant document sections based on vector similarity and streams responses powered by Gemini.

## Features

- **User Authentication:** Secure authentication with [Clerk](https://clerk.com/).
- **File Upload & Storage:** Upload PDFs via the dashboard, stored in Amazon S3.
- **Embedding & Search:** PDF embeddings are stored in [Pinecone](https://www.pinecone.io/) for fast and efficient retrieval.
- **AI Chat:** Chat with documents, retrieve relevant sections, and get responses in a streaming manner.
- **Streaming Responses:** Answers are retrieved based on the closest vector embeddings and streamed to the UI.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) for a modern React-based UI.
- **Authentication:** [Clerk](https://clerk.com/) for user authentication and session management.
- **Database:** [PostgreSQL](https://www.postgresql.org/) using [Drizzle ORM](https://orm.drizzle.team/) for structured data management.
- **Storage:** [Amazon S3](https://aws.amazon.com/s3/) for handling document storage.
- **Vector Search:** [Pinecone](https://www.pinecone.io/) for storing and retrieving document embeddings.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a sleek, responsive design.

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js (LTS version recommended)
- PostgreSQL database
- AWS S3 bucket setup
- Pinecone API key
- Clerk API key

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/docuchat.git
   cd docuchat
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env.local` file:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
   CLERK_SECRET_KEY=your-clerk-api-key
   DATABASE_URL=your-postgres-url
   S3_BUCKET_NAME=your-s3-bucket-name
   S3_ACCESS_KEY=your-s3-access-key
   S3_SECRET_KEY=your-s3-secret-key
   PINECONE_API_KEY=your-pinecone-api-key
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
   ```
4. Run database migrations:
   ```
   npx drizzle-kit push
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Sign up or log in via Clerk.
2. Upload a PDF document from the dashboard.
3. The document is stored in S3, and embeddings are generated and stored in Pinecone.
4. Start chatting with the document, and receive AI-generated responses based on semantic search.
