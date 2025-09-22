'use client';

import { useState } from 'react';

interface CommentFormProps {
  slug: string;
}

export default function CommentForm({ slug }: CommentFormProps) {
  const [prenom, setPrenom] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          prenom: prenom.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();
      
      // Debug logging
      console.log('Comment API response:', { status: response.status, data });

      if (response.ok) {
        setStatus('success');
        setPrenom('');
        setMessage('');
      } else {
        // Handle specific GitHub configuration error
        if (data.error === 'Configuration GitHub manquante' || response.status === 500) {
          // Fallback: save to localStorage
          const comment = {
            id: Date.now().toString(),
            slug,
            prenom: prenom.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
            source: 'localStorage'
          };
          
          const existingComments = JSON.parse(localStorage.getItem('comments') || '[]');
          existingComments.push(comment);
          localStorage.setItem('comments', JSON.stringify(existingComments));
          
          setStatus('success');
          setPrenom('');
          setMessage('');
          setErrorMessage('');
          console.log('Comment saved to localStorage:', comment);
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'Une erreur est survenue');
        }
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="prenom" className="block text-sm font-medium">
          Prénom <span className="text-red-600">*</span>
        </label>
        <input
          id="prenom"
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          placeholder="Votre prénom"
          maxLength={80}
          required
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {prenom.length}/80
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-300 p-2 text-sm leading-relaxed resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-neutral-900"
          placeholder="Écrivez votre commentaire ici…"
          maxLength={2000}
          required
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {message.length}/2000
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !prenom.trim() || !message.trim()}
        className="w-full inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
      >
        {isSubmitting ? 'Publication...' : 'Publier le commentaire'}
      </button>

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
        <p className="text-xs text-blue-800">
          💡 <strong>Note :</strong> Le système de commentaires nécessite une configuration GitHub pour fonctionner. 
          En attendant, vos commentaires sont affichés mais ne sont pas sauvegardés de manière permanente.
        </p>
      </div>

      {status === 'success' && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="text-sm text-green-800">
            ✅ Commentaire sauvegardé ! Il sera visible après rechargement de la page.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-800">
            ❌ {errorMessage}
          </p>
        </div>
      )}
    </form>
  )
}