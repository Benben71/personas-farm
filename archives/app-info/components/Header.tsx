import Link from 'next/link';
import { useState } from 'react';
import { Users, ChevronDown, Menu } from 'lucide-react';
import personasData from '../data/personas - v3.json';

interface HeaderProps {
  projectData: {
    title: string;
    contact: {
      email: string;
      phone: string;
    };
  };
}

export default function Header({ projectData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPersonasDropdownOpen, setIsPersonasDropdownOpen] = useState(false);

  const navigation: Array<{
    name: string;
    href?: string;
    hasDropdown?: boolean;
    dropdownItems?: Array<{ name: string; href: string; id: string }>;
  }> = [
    { name: 'Accueil', href: '/' },
    { 
      name: 'Personas', 
      hasDropdown: true,
      dropdownItems: personasData.map(persona => ({
        name: persona.id.charAt(0).toUpperCase() + persona.id.slice(1),
        href: `/persona/${persona.id}`,
        id: persona.id
      }))
    },
    { name: 'Vision globale', href: '/vision' },
    { name: 'Stratégie numérique', href: '/strategie' },
  ];

  return (
    <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary-600" />
          <h1 className="text-xl font-bold tracking-tighter text-secondary-950">MUSIP</h1>
        </div>
        
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.hasDropdown ? (
                <div className="relative group">
                  <div className="flex items-center gap-1 text-secondary-600 transition-colors hover:text-primary-600 cursor-default py-2 px-1">
                    <span className="select-none">{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  
                  <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-secondary-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 hover:text-primary-600 transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="text-secondary-600 transition-colors hover:text-primary-600"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}