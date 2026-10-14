const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

// text/package matching only, medical suitability nahi
export const isMatch = (scheduled, scanned) =>
  norm(scanned.name).includes(norm(scheduled.name)) && norm(scanned.dose) === norm(scheduled.dose);