'use client'
import Link from "next/link"

export default function Notfound(){
    return (
        <html>
            <body>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        {/* Image or Illustration */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Button to redirect back to homepage */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
            </body>
        </html>
    )
}

