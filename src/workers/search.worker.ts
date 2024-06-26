import { getApps } from '@/service/protontweaks';
import { delay } from '@ribbon-studios/js-utils';

// listen for main to transfer the buffer to myWorker
self.onmessage = async (event) => {
  const [filteredApps] = await Promise.all([
    getApps().then((apps) => apps.filter((app) => app.name.toLowerCase().includes(event.data.toLowerCase()))),
    delay(500),
  ]);

  self.postMessage(filteredApps);
};
