import type { App, ComputedApp } from '@/types';
import SearchWorker from '@/workers/search.worker?worker';

let previousWorker: Worker;

export class SearchService {
  static async query(value: string): Promise<ComputedApp[]> {
    if (previousWorker) {
      previousWorker.terminate();
    }

    previousWorker = new SearchWorker();

    return new Promise((resolve, reject) => {
      previousWorker.addEventListener(
        'message',
        (event: MessageEvent<App[]>) => {
          resolve(
            event.data.map((app) => ({
              ...app,
              image_url: `https://steamcdn-a.akamaihd.net/steam/apps/${app.id}/header.jpg`,
            }))
          );
        },
        {
          once: true,
        }
      );

      // There's almost certainly a better way of doing this, but I don't have time to figure it out atm.
      ((terminate) => {
        previousWorker.terminate = function () {
          terminate.apply(previousWorker);
          reject('Interupting due to new call');
        };
      })(previousWorker.terminate);

      previousWorker.postMessage(value);
    });
  }
}
