import { getApps } from '@/service/protontweaks';

// listen for main to transfer the buffer to myWorker
self.onmessage = async (event) => {
  const apps = await getApps();
  const filteredApps = apps.filter((app) => app.name.toLowerCase().includes(event.data.toLowerCase()));
  self.postMessage(filteredApps);
};
