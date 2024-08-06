let id = 0;

function generateUniqueId(prefix = ''): string {
  id += 1;
  return `${prefix}${id}`;
}

export default function uuid(prefix: string): string {
  return generateUniqueId(prefix);
}
