/**
 * Converts a File size to KB or MB string.
 * @param file The JavaScript File object.
 * @param unit The target unit ('KB' or 'MB'). Defaults to 'MB'.
 */
export const formatFileSize = (file: File | undefined, unit: 'KB' | 'MB' = 'MB'): string => {
  if (!file) return '0 ' + unit;
  
  const bytes = file.size;
  
  if (unit === 'KB') {
    const kb = bytes / 1024;
    return `${kb.toFixed(2)} KB`;
  }
  
  // Default to MB conversion
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

