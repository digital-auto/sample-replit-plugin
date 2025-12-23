import { useEffect, useRef } from "react";

const pluginData = {
  model: {
    name: "Vehicle Light Control",
  },
  prototype: {
    _id: "6948bf84e34605fcdf030f45",
    apis: {
      VSC: [],
      VSS: [],
    },
    code: 'import time\nimport asyncio\nimport signal\n\nfrom sdv.vdb.reply import DataPointReply\nfrom sdv.vehicle_app import VehicleApp\nfrom vehicle import Vehicle, vehicle\n\nclass TestApp(VehicleApp):\n\n    def __init__(self, vehicle_client: Vehicle):\n        super().__init__()\n        self.Vehicle = vehicle_client\n\n    async def on_start(self):\n        # on app started, this function will be trigger, your logic SHOULD start from HERE\n        while True:\n            # sleep for 2 second\n            await asyncio.sleep(2)\n            # write an actuator signal with value\n            await self.Vehicle.Body.Lights.Beam.Low.IsOn.set(True)\n            await asyncio.sleep(1)\n            # read an actuator back\n            value = (await self.Vehicle.Body.Lights.Beam.Low.IsOn.get()).value\n            print("Light value ", value)\n            \n            await asyncio.sleep(2)\n            # write an actuator signal with value\n            await self.Vehicle.Body.Lights.Beam.Low.IsOn.set(False)\n            await asyncio.sleep(1)\n            # read an actuator back\n            value = (await self.Vehicle.Body.Lights.Beam.Low.IsOn.get()).value\n            print("Light value ", value)\n\nasync def main():\n    vehicle_app = TestApp(vehicle)\n    await vehicle_app.run()\n\n\nLOOP = asyncio.get_event_loop()\nLOOP.add_signal_handler(signal.SIGTERM, LOOP.stop)\nLOOP.run_until_complete(main())\nLOOP.close()',
    complexity_level: 3,
    customer_journey:
      "\n#Step 1\nWho: Driver\nWhat: Wipers turned on manually\nCustomer TouchPoints: Windshield wiper switch\n#Step 2\nWho: User\nWhat: User opens the car door/trunk and the open status of door/trunk is set to true\nCustomer TouchPoints: Door/trunk handle\n#Step 3\nWho: System\nWhat: The wiping is immediately turned off by the software and user is notified\nCustomer TouchPoints: Notification on car dashboard and mobile app\n",
    description: {
      problem: "",
      says_who: "",
      solution: "",
      status: "",
    },
    image_file: "/d/2025-12-22/file-1766395388030-352893916.png",
    model_id: {
      name: "X Car",
      visibility: "private",
      id: "6948bc92e34605fcdf03082c",
    },
    name: "X",
    portfolio: {
      effort_estimation: 0,
      needs_addressed: 0,
      relevance: 0,
    },
    skeleton: "{}",
    state: "development",
    tags: [],
    widget_config:
      '{\n  "autorun": false,\n  "widgets": [\n    {\n      "plugin": "Builtin",\n      "widget": "Embedded-Widget",\n      "options": {\n        "api": "Vehicle.Body.Lights.Beam.Low.IsOn",\n        "defaultImgUrl": "https://bestudio.digitalauto.tech/project/Ml2Sc9TYoOHc/light_off.png",\n        "displayExactMatch": true,\n        "valueMaps": [\n          {\n            "value": true,\n            "imgUrl": "https://bestudio.digitalauto.tech/project/Ml2Sc9TYoOHc/light_on.png"\n          },\n          {\n            "value": false,\n            "imgUrl": "https://bestudio.digitalauto.tech/project/Ml2Sc9TYoOHc/light_off.png"\n          }\n        ],\n        "url": "https://store-be.digitalauto.tech/data/store-be/Image%20by%20Signal%20value/latest/index/index.html",\n        "iconURL": "https://upload.digitalauto.tech/data/store-be/3c3685b3-0b58-4f75-820e-9af0180cf3f0.png"\n      },\n      "boxes": [\n        2,\n        3,\n        7,\n        8\n      ],\n      "path": ""\n    },\n    {\n      "plugin": "Builtin",\n      "widget": "Embedded-Widget",\n      "options": {\n        "url": "https://store-be.digitalauto.tech/data/store-be/Terminal/latest/terminal/index.html",\n        "iconURL": "https://upload.digitalauto.tech/data/store-be/e991ea29-5fbf-42e9-9d3d-cceae23600f0.png"\n      },\n      "boxes": [\n        1,\n        6\n      ],\n      "path": ""\n    },\n    {\n      "plugin": "Builtin",\n      "widget": "Embedded-Widget",\n      "options": {\n        "api": "Vehicle.Body.Lights.Beam.Low.IsOn",\n        "lineColor": "#005072",\n        "dataUpdateInterval": "1000",\n        "maxDataPoints": "30",\n        "url": "https://store-be.digitalauto.tech/data/store-be/Chart%20Signal%20Widget/latest/index/index.html",\n        "iconURL": "https://upload.digitalauto.tech/data/store-be/f25ceb29-b9e8-470e-897a-4d843e16a0cf.png"\n      },\n      "boxes": [\n        4,\n        5\n      ],\n      "path": ""\n    },\n    {\n      "plugin": "Builtin",\n      "widget": "Embedded-Widget",\n      "options": {\n        "apis": [\n          "Vehicle.Body.Lights.Beam.Low.IsOn"\n        ],\n        "vss_json": "https://bewebstudio.digitalauto.tech/data/projects/sHQtNwric0H7/vss_rel_4.0.json",\n        "url": "https://store-be.digitalauto.tech/data/store-be/Signal%20List%20Settable/latest/table-settable/index.html",\n        "iconURL": "https://upload.digitalauto.tech/data/store-be/dccabc84-2128-4e5d-9e68-bc20333441c4.png"\n      },\n      "boxes": [\n        9,\n        10\n      ],\n      "path": ""\n    }\n  ]\n}',
    rated_by: {},
    autorun: true,
    created_by: {
      name: "Luong Nguyen Nhan (BGSV/PJ-NE)",
      image_file:
        "https://backend-core-dev.digital.auto/v2/file/data/store-be/bd0b321a-a19b-4c3d-9292-040ddaac34af.jpg",
      id: "6699fa83964f3f002f35ea03",
    },
    executed_turns: 0,
    language: "python",
    editors_choice: false,
    createdAt: "2025-12-22T03:48:20.619Z",
    updatedAt: "2025-12-22T09:23:08.875Z",
    __v: 0,
    id: "6948bf84e34605fcdf030f45",
    avg_score: null,
  },
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPlugin = async () => {
      await new Promise((resolve) => {
        if ((window as any).DAPlugins?.["page-plugin"]) {
          resolve(true);
          return;
        }

        const checkInterval = setInterval(() => {
          if ((window as any).DAPlugins?.["page-plugin"]) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
      });

      if (containerRef.current && (window as any).DAPlugins?.["page-plugin"]) {
        const plugin = (window as any).DAPlugins["page-plugin"];
        plugin.mount(containerRef.current, {
          data: pluginData,
          config: {
            backendUrl: window.location.origin,
          },
        });
      }
    };

    loadPlugin();

    return () => {
      if (containerRef.current && (window as any).DAPlugins?.["page-plugin"]) {
        const plugin = (window as any).DAPlugins["page-plugin"];
        plugin.unmount(containerRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} data-testid="plugin-container" />;
}
