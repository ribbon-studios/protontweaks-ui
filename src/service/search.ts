import type { App } from '@/types';
import SearchWorker from '@/workers/search.worker?worker';

let previousWorker: Worker;

export class SearchService {
  static async query(value: string): Promise<App[]> {
    if (previousWorker) {
      previousWorker.terminate();
    }

    previousWorker = new SearchWorker();

    return new Promise((resolve, reject) => {
      previousWorker.addEventListener(
        'message',
        (event) => {
          resolve(event.data);
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
