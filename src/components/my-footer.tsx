import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-muted py-8 px-4 mt-8 rounded-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center sm:items-end">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-2">Contact Me</h2>
            <p className="text-muted-foreground">
              Feel free to contact me anytime via my X account or LinkedIn—I’d be happy to connect!
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/nasserbvb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/nasser-setti/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://x.com/NBvBJS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">X (ex Twitter)</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nasser Setti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
