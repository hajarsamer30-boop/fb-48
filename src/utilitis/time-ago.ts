export function timeAgo(iso: string): string {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  );

  const units: [string, number][] = [
    ["y", 31536000],
    ["mo", 2592000],
    ["w", 604800],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
    ["s", 1],
  ];

  for (const [label, secs] of units) {
    if (seconds >= secs) return `${Math.floor(seconds / secs)}${label}`;
  }
  return "0s";
}