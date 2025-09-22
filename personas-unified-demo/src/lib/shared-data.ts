/**
 * Shared data module for personas-farm
 * This is a Next.js-compatible version of the shared data module
 */

import infoPersonasData from '@/data/info-personas.json';
import pasteurPersonasData from '@/data/pasteur-personas.json';

/**
 * Get the info personas data
 * @returns {object} The info personas data
 */
export function getInfoPersonas() {
  return infoPersonasData;
}

/**
 * Get the pasteur personas data
 * @returns {object} The pasteur personas data
 */
export function getPasteurPersonas() {
  return pasteurPersonasData;
}
