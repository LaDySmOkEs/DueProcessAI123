/**
 * Utility function to create page URLs
 * @param pageName - The name of the page
 * @returns The URL path for the page
 */
export function createPageUrl(pageName: string): string {
  // Convert page name to URL-friendly format
  return `/${pageName.toLowerCase().replace(/\s+/g, '-')}`;
}

export default createPageUrl;