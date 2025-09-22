import { putFile } from './github';

export interface Comment {
  id: string;
  slug: string;
  prenom: string;
  message: string;
  createdAt: string;
  userAgent: string;
}

export async function saveComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  
  const fullComment: Comment = {
    ...comment,
    id,
    createdAt,
  };

  const contentBase64 = Buffer.from(JSON.stringify(fullComment, null, 2)).toString('base64');
  const path = `data/comments/${comment.slug}/${id}.json`;
  const message = `Add comment from ${comment.prenom} for persona ${comment.slug}`;

  await putFile({
    path,
    contentBase64,
    message,
  });

  return { id };
}

export function validateComment(prenom: string, message: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Basic validation
  if (!prenom || prenom.trim().length === 0) {
    errors.push('Le prénom est requis');
  } else if (prenom.length > 80) {
    errors.push('Le prénom ne peut pas dépasser 80 caractères');
  }

  if (!message || message.trim().length === 0) {
    errors.push('Le message est requis');
  } else if (message.length > 2000) {
    errors.push('Le message ne peut pas dépasser 2000 caractères');
  }

  // Simple spam detection
  const spamPatterns = [
    /https?:\/\//i,
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /href\s*=/i,
  ];

  const hasSpam = spamPatterns.some(pattern => 
    pattern.test(prenom) || pattern.test(message)
  );

  if (hasSpam) {
    errors.push('Le contenu contient des éléments non autorisés');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}