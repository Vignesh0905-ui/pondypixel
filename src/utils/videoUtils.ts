/**
 * Converts a Google Drive link or standard video URL into an embeddable format.
 * E.g., https://drive.google.com/file/d/12345/view -> https://drive.google.com/file/d/12345/preview
 */
export function formatVideoEmbedUrl(url: string): { type: 'gdrive' | 'direct' | 'unknown'; embedUrl: string } {
  if (!url || typeof url !== 'string') {
    return { type: 'unknown', embedUrl: '' };
  }

  const trimmed = url.trim();

  // Match Google Drive file ID pattern
  // E.g. drive.google.com/file/d/FILE_ID/view or drive.google.com/open?id=FILE_ID
  const driveFileRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=))([a-zA-Z0-9_-]+)/;
  const match = trimmed.match(driveFileRegex);

  if (match && match[1]) {
    const fileId = match[1];
    return {
      type: 'gdrive',
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    };
  }

  // Direct MP4 or video link
  if (trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.includes('blob:')) {
    return {
      type: 'direct',
      embedUrl: trimmed,
    };
  }

  return {
    type: 'unknown',
    embedUrl: trimmed,
  };
}
