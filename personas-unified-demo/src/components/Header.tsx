'use client';

import Link from 'next/link';
import { Users, ChevronDown, Menu } from 'lucide-react';
import { Persona } from '@/types';

interface HeaderProps {
  site: string;
  personas: Persona[];
}

export default function Header({ site, personas }: HeaderProps) {

  const personasDropdownItems = personas.map(persona => ({
    name: persona.id.charAt(0).toUpperCase() + persona.id.slice(1),
    href: `/persona/${persona.id}?site=${site}`,
    id: persona.id
  }));

  // Déterminer le nom du thème et le titre (case-insensitive)
  const normalizedSite = (site || '').toLowerCase();
  const themeName = normalizedSite === 'info' ? '' : '';
  const siteTitle = normalizedSite === 'info' ? 'MUSIP' : 'PASTEUR';
  
  console.log('Header site:', site, 'normalized:', normalizedSite, 'title:', siteTitle);

  return (
    <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Clickable Logo/Title */}
          <Link href={`/?site=${site}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Users className="h-6 w-6 text-orange-600" />
            <div>
              <h1 className="text-xl font-bold tracking-tighter text-gray-900">{siteTitle}</h1>
              <p className="text-xs text-gray-600">{themeName}</p>
            </div>
          </Link>
          
          {/* Personas Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 text-gray-600 transition-colors hover:text-orange-600 cursor-default py-2 px-1">
              <span className="select-none text-sm font-medium">Personas</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {personasDropdownItems.map((dropdownItem) => (
                <Link
                  key={dropdownItem.id}
                  href={dropdownItem.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                  prefetch={false}
                >
                  {dropdownItem.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
