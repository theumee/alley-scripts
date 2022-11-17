export default getMediaUrl;
/**
 * Given a media object returned from the WordPress REST API, extracts the
 * URL for the media item at the requested size if it exists, or the full
 * size if it does not. Returns an empty string if unable to find either.
 * Uses a superset of the same logic that the Gutenberg Image component uses
 * for selecting the correct image size from a media REST API response.
 * @param {object} media - A media object returned by the WordPress API.
 * @param {string} size - Media size to request. Default: full
 * @returns {string} - The URL to the asset, or an empty string on failure.
 */
declare function getMediaUrl(media: object, size?: string): string;
