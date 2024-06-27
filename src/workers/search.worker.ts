import { getApps } from '@/service/protontweaks';
import { delay } from '@ribbon-studios/js-utils';

self.onmessage = async (event) => {
  const [filteredApps] = await Promise.all([filterApps(event.data.toLowerCase()), delay(500)]);

  self.postMessage(filteredApps);
};

async function filterApps(value: string) {
  // TODO: Add a method of getting an api version (git sha) and using it to enable caching and cache busting
  const apps = await getApps();

  if (!value) return apps;

  const partials = value.split(' ').filter(Boolean);

  return apps
    .filter((app) => {
      return partials.some((partial) => app.name.toLowerCase().includes(partial));
    })
    .map((app) => ({
      ...app,
      strength: determineMatchStrength(value, partials, app.name.toLowerCase()),
    }))
    .sort((a, b) => b.strength - a.strength);
}

function determineMatchStrength(value: string, partials: string[], comparisonValue: string): number {
  if (comparisonValue === value) return 100;
  const matches = partials
    // Filter out the non matches
    .filter((partial) => comparisonValue.includes(partial))
    // Calculate the number of characters that matched
    .reduce((output, partial) => output + partial.length, 0);

  return Math.floor((matches / value.length) * 100);
}
