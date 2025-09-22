import { readFileSync } from 'fs';
import { join } from 'path';

export function readPersonaHtml(slug: string): string {
  try {
    const filePath = join(process.cwd(), 'public', 'personas-html', `${slug}.html`);
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.warn(`Could not read HTML file for persona ${slug}:`, error);
    return '';
  }
}
