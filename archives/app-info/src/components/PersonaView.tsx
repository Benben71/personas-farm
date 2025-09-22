import { readFileSync } from 'fs';
import { join } from 'path';

interface PersonaViewProps {
  slug: string;
}

export default function PersonaView({ slug }: PersonaViewProps) {
  try {
    const filePath = join(process.cwd(), 'public', 'personas-html', `${slug}.html`);
    const htmlContent = readFileSync(filePath, 'utf-8');
    
    return (
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  } catch (error) {
    return (
      <div className="card">
        <p className="text-gray-600">
          Contenu HTML non disponible pour {slug}. 
          Veuillez créer le fichier public/personas-html/{slug}.html
        </p>
      </div>
    );
  }
}
