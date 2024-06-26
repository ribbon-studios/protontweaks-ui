import type { App } from '@/types';
import SearchWorker from '@/workers/search.worker?worker';

const worker: Worker = new SearchWorker();

export class SearchService {
  static async query(value: string): Promise<App[]> {
    return new Promise((resolve) => {
      worker.addEventListener(
        'message',
        (event) => {
          resolve(event.data);
        },
        {
          once: true,
        }
      );

      worker.postMessage(value);
    });
  }
}
