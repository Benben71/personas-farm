# Multi-Theme Personas Architecture

This architecture transforms your existing personas website into a scalable, multi-theme museum-sector personas generator.

## 🏗️ Architecture Overview

### Core + Theme Packages Approach
- **personas-core**: Shared domain logic, schema, components, export engines
- **personas-theme-***: Theme-specific configurations, sections, templates
- **app-***: Thin deployable applications that wire themes to core

### Key Benefits
✅ **No Code Duplication**: Shared core with theme-specific extensions  
✅ **Parallel Instances**: Run multiple themes simultaneously  
✅ **Isolated Environments**: Separate databases, configs, deployments  
✅ **Scalable**: Easy to add new themes without touching existing code  
✅ **Maintainable**: Clear separation of concerns  

## 📁 Project Structure

```
personas-core/                 # npm package
├── schema/persona.schema.json # shared JSON Schema
├── src/
│   ├── types/                # TypeScript interfaces
│   ├── lib/
│   │   ├── generator.ts       # Persona generation logic
│   │   ├── section-registry.ts # Theme section management
│   │   └── export-engines.ts # PDF/Deck/JSON export
│   └── index.ts              # Main exports
└── package.json

personas-theme-info/           # npm package
├── theme.config.ts           # Info theme configuration
├── sections/                 # Media literacy sections
├── templates/exports         # Export templates
└── package.json

personas-theme-darwin/         # npm package  
├── theme.config.ts           # Darwin theme configuration
├── sections/                 # Science literacy sections
├── templates/exports         # Export templates
└── package.json

app-info/                      # deployable
├── pages/                     # Next.js pages
├── Dockerfile
├── docker-compose.yaml
└── package.json

app-darwin/                    # deployable
├── pages/                     # Next.js pages  
├── Dockerfile
├── docker-compose.yaml
└── package.json
```

## 🚀 Migration Path

### Phase 1: Tag Current State
```bash
cd personas
git tag v1.0-before-migration
git push origin v1.0-before-migration
```

### Phase 2: Extract Core Package
1. Create `personas-core` with shared schema and components
2. Publish to internal npm registry (or use Git submodules)
3. Extract generic components from current repo

### Phase 3: Create Info Theme Package
1. Move theme-specific code to `personas-theme-info`
2. Update current repo to consume `@org/personas-core`
3. Test that everything still works

### Phase 4: Create Darwin Theme
1. Create `personas-theme-darwin` package
2. Create `app-darwin` deployable
3. Test parallel deployment

## ☁️ Vercel Deployment Notes

- Use the root script `npm run vercel-build` for CI/CD on Vercel. It builds the app selected via the `TARGET_APP` environment variable (`app-info` by default) and copies its `.next` output to the repository root so the deployment succeeds.
- Recommended Vercel project settings:
  - **Build Command**: `npm run vercel-build`
  - **Output Directory**: `.next`
  - **Environment Variables**: set `TARGET_APP` to `app-info` or `app-pasteur` depending on the project you deploy.

### Phase 5: Containerize & Deploy
1. Set up Docker containers for each app
2. Configure reverse proxy for routing
3. Deploy to internal server

## 🐳 Running Locally

### Single Theme (Development)
```bash
cd app-info
npm install
npm run dev
# Runs on http://localhost:3000
```

### Multiple Themes (Production)
```bash
# Start all services
docker-compose -f docker-compose.full.yaml up -d

# Access:
# http://localhost/info     -> Media Literacy theme
# http://localhost/darwin    -> Darwin Exhibition theme
```

## 🔧 Configuration

### Theme Configuration (`theme.config.ts`)
```typescript
export const themeConfig: ThemeConfig = {
  id: 'media-literacy',
  name: 'Éducation aux Médias',
  enabledSections: ['identite_profil', 'systeme_croyances', ...],
  taxonomies: {
    audienceTypes: ['Collégien(ne)', 'Lycéen(ne)', ...],
    channels: ['TikTok', 'Instagram', ...]
  },
  exportTemplates: {
    pdf: 'media-literacy-pdf-template',
    deck: 'media-literacy-deck-template'
  },
  guardrails: {
    biasChecklist: ['Éviter les stéréotypes...'],
    inclusionNotes: ['Considérer l\'accès numérique...']
  }
};
```

### Section Registry
```typescript
// Register theme-specific sections
registry.register({
  id: 'systeme_croyances',
  name: 'Système de Croyances',
  schema: { /* JSON Schema */ },
  uiRenderer: 'SystemeCroyancesRenderer',
  exportPartials: ['systeme-croyances-pdf'],
  enabled: true
});
```

## 📊 Data Isolation

### Database Separation
- **app-info**: `personas_info` database
- **app-darwin**: `personas_darwin` database
- **Separate ports**: 5433, 5434

### File Storage
- **app-info**: `/app-info/data/*`, `/app-info/exports/*`
- **app-darwin**: `/app-darwin/data/*`, `/app-darwin/exports/*`

### Environment Variables
```bash
# app-info/.env
THEME_ID=media-literacy
DATABASE_URL=postgresql://user:password@db-info:5432/personas_info

# app-darwin/.env  
THEME_ID=pasteur-exhibition
DATABASE_URL=postgresql://user:password@db-darwin:5432/personas_darwin
```

## 🔄 Adding New Themes

1. **Create theme package**:
   ```bash
   mkdir personas-theme-climate
   cd personas-theme-climate
   npm init
   npm install @org/personas-core
   ```

2. **Define theme config**:
   ```typescript
   // theme.config.ts
   export const themeConfig: ThemeConfig = {
     id: 'climate-action',
     name: 'Action Climatique',
     enabledSections: ['identite_profil', 'rapport_environnement', ...],
     // ... other config
   };
   ```

3. **Create app**:
   ```bash
   mkdir app-climate
   cd app-climate
   # Copy from app-info, update theme reference
   ```

4. **Update reverse proxy**:
   ```nginx
   location /climate {
       proxy_pass http://app-climate;
   }
   ```

## 🎯 Next Steps

1. **Start with Phase 1**: Tag your current repo
2. **Extract core package**: Move shared code to `personas-core`
3. **Test migration**: Ensure current functionality works
4. **Create Darwin theme**: Build second theme as proof of concept
5. **Deploy parallel**: Set up Docker containers and reverse proxy

## ☁️ Vercel Deployment Notes

- Use the root script `npm run vercel-build` for CI/CD on Vercel. The script reads the `TARGET_APP` environment variable (`app-info` by default), builds that workspace, and outputs the generated `.next` directory at the repository root.
- Recommended Vercel project settings:
  - **Build Command**: `npm run vercel-build`
  - **Output Directory**: `.next`
  - **Environment Variables**: set `TARGET_APP` to the app you deploy (`app-info` or `app-pasteur`).
- When the script runs it also keeps the workspace `next-env.d.ts` pointing at the local `.next` folder, so local development remains unaffected.

## 🔒 Reverting Changes

If you need to revert:
```bash
# Revert to tagged state
git checkout v1.0-before-migration

# Or revert specific files
git checkout HEAD~1 -- path/to/file
```

The architecture is designed to be reversible at each phase, so you can safely experiment and roll back if needed.
