export function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  
  export function createProductUrl(id, title) {
    const slug = generateSlug(title);
    return `/products/${id}-${slug}`;
  }