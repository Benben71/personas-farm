# Personas Website - Next.js 14 App Router

A participatory website showcasing personas with a GitHub-based comments system. No database required - all data is stored in JSON files and comments are committed to a GitHub repository.

## Features

- **Personas Display**: Browse and view detailed persona profiles
- **HTML Content**: Each persona has rich HTML content stored in `/public/personas-html/`
- **Comments System**: Users can leave comments that are saved as JSON files to GitHub
- **No Database**: All data stored in JSON files and Git commits
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive styling

## Project Structure

```
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   │   ├── health/        # Health check endpoint
│   │   │   └── comments/      # Comments API (GitHub integration)
│   │   ├── personas/          # Personas pages
│   │   │   ├── page.tsx       # Personas list
│   │   │   └── [slug]/        # Individual persona pages
│   │   │       ├── page.tsx   # Persona detail page
│   │   │       └── CommentForm.tsx # Comments form component
│   │   └── privacy/           # Privacy policy page
│   ├── components/            # Reusable components
│   │   ├── PersonaCard.tsx    # Persona card component
│   │   └── PersonaView.tsx    # HTML content renderer
│   ├── data/                  # JSON datasets
│   │   └── personas.json      # Personas data
│   └── lib/                   # Utility functions
│       ├── personas.ts         # Personas data helpers
│       ├── github.ts          # GitHub API integration
│       ├── fs-html.ts         # HTML file reader
│       └── comments.ts        # Comments validation and saving
├── public/
│   └── personas-html/         # Static HTML files for each persona
└── env.local.example         # Environment variables template
```

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Copy `env.local.example` to `.env.local` and configure:
   ```bash
   cp env.local.example .env.local
   ```
   
   Required environment variables:
   - `GITHUB_OWNER`: Your GitHub username
   - `GITHUB_REPO`: Repository name for storing comments
   - `GITHUB_TOKEN`: Fine-grained Personal Access Token with "contents:write" permission
   - `GITHUB_BRANCH`: Branch name (default: "main")
   - `SITE_ORIGIN`: Site URL (default: "http://localhost:3000")

3. **GitHub Token Setup**
   - Go to GitHub Settings > Developer settings > Personal access tokens > Fine-grained tokens
   - Create a new token with "contents:write" permission on your repository
   - Copy the token to your `.env.local` file

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns: `{ status: "ok", timestamp: "..." }`

### Comments
- **POST** `/api/comments`
- Body: `{ slug: string, prenom: string, message: string }`
- Returns: `{ ok: true, id: string }` or error

## Comments System

The comments system stores user contributions as JSON files in a GitHub repository:

- **Storage**: `data/comments/{slug}/{uuid}.json`
- **Format**: Each comment includes id, slug, prenom, message, createdAt, userAgent
- **Validation**: Basic spam protection and input validation
- **Privacy**: Comments are stored in a public Git repository

## Personas Data

Personas are defined in `src/data/personas.json` with the following structure:

```typescript
interface Persona {
  id: string;           // Unique identifier
  name: string;         // Display name
  age: number;          // Age
  profile: string;      // Description
  needs: string[];      // List of needs
  motivations: string[]; // List of motivations
  channels: string[];   // Preferred channels
  services: string[];   // Relevant services
  communicationChallenge: string; // Communication challenge
  image: string;        // Image path
}
```

## HTML Content

Each persona has corresponding HTML content in `/public/personas-html/{slug}.html`. This content is rendered using `dangerouslySetInnerHTML` with proper sanitization.

## Privacy & GDPR

The site includes a privacy policy at `/privacy` that explains:
- Data collection and usage
- GitHub-based storage
- User rights under GDPR
- Contact information for data requests

## Development

### Adding New Personas

1. Add persona data to `src/data/personas.json`
2. Create HTML content in `/public/personas-html/{slug}.html`
3. The site will automatically generate routes and pages

### Customizing Styling

The site uses Tailwind CSS with custom configurations:
- Responsive design
- Modern card layouts
- Consistent color scheme
- Accessible components

### Type Safety

All components and utilities are fully typed with TypeScript:
- Strict type checking enabled
- Interface definitions for all data structures
- Type-safe API responses

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Custom server

3. **Configure environment variables** in your deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.