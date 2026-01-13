import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useEffect, useRef, useState } from "react";

if (typeof globalThis !== 'undefined') {
  (globalThis as any).React = React;
  (globalThis as any).ReactDOM = ReactDOM;
}

const pluginData = {
  model: {
    name: "Vehicle Light Control",
    id: "model-demo-123",
  },
  prototype: {
    id: "6948bf84e34605fcdf030f45",
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
        # On app started, this function will trigger
        while True:
            await asyncio.sleep(2)
            await self.Vehicle.Body.Lights.Beam.Low.IsOn.set(True)
            await asyncio.sleep(1)
            value = (await self.Vehicle.Body.Lights.Beam.Low.IsOn.get()).value
            print("Light value ", value)
            
            await asyncio.sleep(2)
            await self.Vehicle.Body.Lights.Beam.Low.IsOn.set(False)
            await asyncio.sleep(1)
            value = (await self.Vehicle.Body.Lights.Beam.Low.IsOn.get()).value
            print("Light value ", value)

async def main():
    vehicle_app = TestApp(vehicle)
    await vehicle_app.run()

LOOP = asyncio.get_event_loop()
LOOP.add_signal_handler(signal.SIGTERM, LOOP.stop)
LOOP.run_until_complete(main())
LOOP.close()`,
    customer_journey: `#Step 1
Who: Driver
What: Wipers turned on manually
Customer TouchPoints: Windshield wiper switch

#Step 2
Who: User
What: User opens the car door/trunk and the open status is set to true
Customer TouchPoints: Door/trunk handle

#Step 3
Who: System
What: The wiping is immediately turned off by the software and user is notified
Customer TouchPoints: Notification on car dashboard and mobile app`,
    model_id: {
      name: "X Car",
      id: "6948bc92e34605fcdf03082c",
    },
    name: "Vehicle Light Control Prototype",
    state: "development",
    language: "python",
  },
};

const mockApi = {
  updatePrototype: async (updates: any) => {
    console.log("Mock updatePrototype called with:", updates);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...pluginData.prototype, ...updates };
  },
  updateModel: async (updates: any) => {
    console.log("Mock updateModel called with:", updates);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...pluginData.model, ...updates };
  },
  getComputedAPIs: async () => {
    console.log("Mock getComputedAPIs called");
    return {};
  },
  getRuntimeApiValues: () => {
    return {
      "Vehicle.Speed": 65.5,
      "Vehicle.Body.Lights.Beam.Low.IsOn": true,
    };
  },
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlugin = async () => {
      try {
        const pluginModule = await import("../../../plugin/src/index");
        
        if (containerRef.current && pluginModule.mount) {
          pluginModule.mount(containerRef.current, {
            data: pluginData,
            config: { plugin_id: "demo-plugin" },
            api: mockApi,
          });
          setIsLoaded(true);
        }
      } catch (err: any) {
        console.error("Failed to load plugin:", err);
        setError(err?.message || "Failed to load plugin");
      }
    };

    loadPlugin();

    return () => {
      const cleanup = async () => {
        try {
          const pluginModule = await import("../../../plugin/src/index");
          if (containerRef.current && pluginModule.unmount) {
            pluginModule.unmount(containerRef.current);
          }
        } catch (err) {
          console.error("Failed to cleanup plugin:", err);
        }
      };
      cleanup();
    };
  }, []);

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '24px',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <h1 style={{ color: '#991b1b', marginBottom: '12px' }}>Failed to load plugin</h1>
        <p style={{ color: '#6b7280' }}>{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      data-testid="plugin-container" 
      style={{ minHeight: '100vh', width: '100%' }}
    />
  );
}
