'use client';

import { useState, useEffect } from 'react';
import { Comment } from '../src/lib/comments';

type LocalComment = Comment & { 
  timestamp?: string;
  source?: string;
}

export default function CommentsList({ slug }: { slug: string }) {
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = () => {
    try {
      const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const filteredComments = storedComments.filter((comment: LocalComment) => comment.slug === slug);
      setComments(filteredComments);
    } catch (error) {
      console.error('Error loading comments from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    
    // Listen for storage changes to update comments when new ones are added
    const handleStorageChange = () => {
      loadComments();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadComments, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [slug]);

  if (isLoading) {
    return <p className="text-sm text-neutral-500">Chargement des commentaires...</p>;
  }

  if (comments.length === 0) {
    return <p className="text-sm text-neutral-500">Aucun commentaire pour le moment.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border border-neutral-200 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-neutral-900">{comment.prenom}</h4>
            <span className="text-xs text-neutral-500">
              {comment.timestamp ? new Date(comment.timestamp).toLocaleDateString('fr-FR') : 'Récent'}
            </span>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">{comment.message}</p>
          {comment.source === 'localStorage' && (
            <div className="mt-2 text-xs text-blue-600">
              💾 Sauvegardé localement
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
