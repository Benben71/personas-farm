import Link from 'next/link';

interface FooterProps {
  projectData: {
    title: string;
    contact: {
      email: string;
      phone: string;
      address: string;
      website: string;
    };
  };
}

export default function Footer({ projectData }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    project: [
      { name: 'Notre Mission', href: '/project#mission' },
      { name: 'Notre Vision', href: '/project#vision' },
      { name: 'Concept d\'Exposition', href: '/project#exhibition' },
      { name: 'Objectifs Pédagogiques', href: '/project#goals' },
    ],
    personas: [
      { name: 'Nina - Génération Z', href: '/personas#nina' },
      { name: 'Marco - Professionnels', href: '/personas#marco' },
      { name: 'Sophie - Éducateurs', href: '/personas#sophie' },
      { name: 'Ahmed - Communautés', href: '/personas#ahmed' },
    ],
    support: [
      { name: 'Soutien Financier', href: '/support#financial' },
      { name: 'Soutien en Nature', href: '/support#inkind' },
      { name: 'Mise à Disposition', href: '/support#location' },
      { name: 'Sponsoring', href: '/support#sponsoring' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{projectData.title}</h3>
                <p className="text-sm text-gray-400">Musée Participatif</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Un espace innovant dédié à l'éducation aux médias et à la compréhension de l'écosystème de l'information.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Project Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Le Projet</h3>
            <ul className="space-y-2">
              {footerLinks.project.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Personas Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Personas</h3>
            <ul className="space-y-2">
              {footerLinks.personas.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nous Soutenir</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <h4 className="font-semibold text-white mb-2">Contact</h4>
              <p>{projectData.contact.email}</p>
              <p>{projectData.contact.phone}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Adresse</h4>
              <p>{projectData.contact.address}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Site Web</h4>
              <a href={`https://${projectData.contact.website}`} className="hover:text-white transition-colors">
                {projectData.contact.website}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} {projectData.title}. Tous droits réservés.</p>
          <p className="mt-2">Conçu avec ❤️ pour l'éducation aux médias</p>
        </div>
      </div>
    </footer>
  );
}
