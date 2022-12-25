export function ucfirst(str: string): string {
  if (str.length === 0) {
    return str;
  }

  return str[0].toUpperCase() + str.substring(1);
}
