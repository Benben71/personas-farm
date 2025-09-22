export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-6 py-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-4">Page introuvable</h2>
        <p className="text-gray-500 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
