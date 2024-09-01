import type { ComputedApp, ThinApp } from '@/types';
import SearchWorker from '@/workers/search.worker?worker';

let previousWorker: Worker;

export class SearchService {
  static async query(value: string): Promise<ComputedApp<ThinApp>[]> {
    if (previousWorker) {
      previousWorker.terminate();
    }

    previousWorker = new SearchWorker();

    return new Promise((resolve, reject) => {
      previousWorker.addEventListener(
        'message',
        (event) => {
          if (event.data.error)
            reject({
              message: event.data.error,
              debounce: false,
            });
          else resolve(event.data.result);
        },
        {
          once: true,
        }
      );

      // There's almost certainly a better way of doing this, but I don't have time to figure it out atm.
      ((terminate) => {
        previousWorker.terminate = function () {
          terminate.apply(previousWorker);
          reject({
            message: 'Interupting due to new call',
            debounce: true,
          });
        };
      })(previousWorker.terminate);

      previousWorker.postMessage(value);
    });
  }
}
