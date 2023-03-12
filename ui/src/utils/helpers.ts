export function TrimString(str: string, len: number): string {
  if (str.length <= len) {
    return str;
  }
  return str.substring(0, len) + "...";
}
