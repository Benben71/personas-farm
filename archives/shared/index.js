/**
 * Shared data module for personas-farm
 * 
 * This module provides a single source of truth for all personas data
 * across different applications in the project.
 */

const fs = require('fs');
const path = require('path');

/**
 * Get the path to a shared data file
 * @param {string} filename - The name of the file
 * @returns {string} The absolute path to the file
 */
function getSharedDataPath(filename) {
  return path.join(__dirname, 'data', filename);
}

/**
 * Get the content of a shared data file as JSON
 * @param {string} filename - The name of the file
 * @returns {object} The parsed JSON content
 */
function getSharedData(filename) {
  const filePath = getSharedDataPath(filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

/**
 * Get the info personas data
 * @returns {object} The info personas data
 */
function getInfoPersonas() {
  return getSharedData('info-personas.json');
}

/**
 * Get the pasteur personas data
 * @returns {object} The pasteur personas data
 */
function getPasteurPersonas() {
  return getSharedData('pasteur-personas.json');
}

module.exports = {
  getSharedDataPath,
  getSharedData,
  getInfoPersonas,
  getPasteurPersonas,
};
