import { useEffect, useRef } from "react";

const pluginData = {
  prototype: {
    code: `import time
import asyncio
import signal

from sdv.vdb.reply import DataPointReply
from sdv.vehicle_app import VehicleApp
from vehicle import Vehicle, vehicle

class TestApp(VehicleApp):

    def __init__(self, vehicle_client: Vehicle):
        super().__init__()
        self.Vehicle = vehicle_client

    async def on_start(self):
        # on app started, this function will be trigger, your logic SHOULD start from HERE
        while True:
            # sleep for 2 second
            await asyncio.sleep(2)
            # write an actuator signal with value
            await self.Vehicle.Body.Lights.Beam.Low.IsOn.set(True)
            await asyncio.sleep(1)
            # read an actuator back
            value = (await self.Vehicle.Body.Lights.Beam.Low.IsOn.get()).value
            print("Light value ", value)
            
            await asyncio.sleep(2)
            # write an actuator signal with value
            await self.Vehicle.Body.Lights.Beam.Low.IsOn.set(False)
            await asyncio.sleep(1)
            # read an actuator back
            value = (await self.Vehicle.Body.Lights.Beam.Low.IsOn.get()).value
            print("Light value ", value)

async def main():
    vehicle_app = TestApp(vehicle)
    await vehicle_app.run()


LOOP = asyncio.get_event_loop()
LOOP.add_signal_handler(signal.SIGTERM, LOOP.stop)
LOOP.run_until_complete(main())
LOOP.close()`
  }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPlugin = async () => {
      await new Promise((resolve) => {
        if ((window as any).DAPlugins?.['page-plugin']) {
          resolve(true);
          return;
        }
        
        const checkInterval = setInterval(() => {
          if ((window as any).DAPlugins?.['page-plugin']) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
      });

      if (containerRef.current && (window as any).DAPlugins?.['page-plugin']) {
        const plugin = (window as any).DAPlugins['page-plugin'];
        plugin.mount(containerRef.current, {
          data: pluginData,
          config: {
            backendUrl: window.location.origin
          }
        });
      }
    };

    loadPlugin();

    return () => {
      if (containerRef.current && (window as any).DAPlugins?.['page-plugin']) {
        const plugin = (window as any).DAPlugins['page-plugin'];
        plugin.unmount(containerRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} data-testid="plugin-container" />;
}
