import { getApps } from '@/service/protontweaks.service';
import type { App, ThinApp } from '@/types';
import { every } from '@/utils/object';
import { delay } from '@ribbon-studios/js-utils';

self.onmessage = async (event) => {
  try {
    const [filteredApps] = await Promise.all([filterApps(event.data.toLowerCase()), delay(500)]);

    self.postMessage({
      result: filteredApps,
    });
  } catch {
    self.postMessage({
      error: 'Failed to retrieve apps!',
    });
  }
};

type ParsedSearchOptions = {
  raw: string;
  query: string;
  partials: string[];
  has: Partial<Record<keyof ThinApp['has'], boolean>>;
};

function parseOptions(value: string): ParsedSearchOptions {
  const has_filters = Array.from(value.matchAll(/has:([^\s]+)/g));

  const has = has_filters.reduce<ParsedSearchOptions['has']>((output, [, flag]) => {
    if (['trick', 'tricks'].includes(flag)) {
      output.tricks = true;
    } else if (['env', 'envs'].includes(flag)) {
      output.env = true;
    } else if (['setting', 'settings'].includes(flag)) {
      output.settings = true;
    } else if (['arg', 'args'].includes(flag)) {
      output.args = true;
    }

    return output;
  }, {});

  const query = value
    .replace(/has:[^\s]+/g, '')
    .replace(/\s\s/g, ' ')
    .trim();

  return {
    raw: value,
    query,
    partials: query.split(' ').filter(Boolean),
    has,
  };
}

async function filterApps(value: string) {
  // TODO: Add a method of getting an api version (git sha) and using it to enable caching and cache busting
  const apps = await getApps();

  if (!value) return apps;

  const options = parseOptions(value);

  return apps
    .filter((app) => {
      return (
        (options.partials.length === 0 ||
          options.partials.some((partial) => app.name.toLowerCase().includes(partial))) &&
        every(options.has, ([key, value]) => app.has[key] === value)
      );
    })
    .map((app) => ({
      ...app,
      strength: determineMatchStrength(value, options.partials, app.name.toLowerCase()),
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
