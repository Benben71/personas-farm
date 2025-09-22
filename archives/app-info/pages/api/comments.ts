import { NextApiRequest, NextApiResponse } from 'next';
import { saveComment, validateComment } from '../../src/lib/comments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { slug, prenom, message } = req.body;

    // Validate input
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Slug is required' });
    }

    // Validate comment content
    const validation = validateComment(prenom, message);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    // Save comment to GitHub
    const userAgent = req.headers['user-agent'] || 'unknown';
    const result = await saveComment({
      slug,
      prenom: prenom.trim(),
      message: message.trim(),
      userAgent,
    });

    res.status(200).json({ ok: true, id: result.id });
  } catch (error) {
    console.error('Error saving comment:', error);
    
    // Provide specific error messages for common issues
    if (error instanceof Error && error.message.includes('Missing required GitHub environment variables')) {
      return res.status(500).json({ 
        error: 'Configuration GitHub manquante',
        details: 'Les variables d\'environnement GitHub ne sont pas configurées. Consultez le fichier env.local.example pour les instructions de configuration.',
        instructions: [
          '1. Copiez env.local.example vers .env.local',
          '2. Créez un repository GitHub pour stocker les commentaires',
          '3. Générez un token GitHub avec permissions "repo"',
          '4. Remplissez les variables dans .env.local',
          '5. Redémarrez le serveur'
        ]
      });
    }
    
    res.status(500).json({ error: 'Failed to save comment' });
  }
}
