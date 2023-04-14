import { DataOverview, DeviceManagement, RealTimeMonitor, SmsManagement, StatisticalAnalysis, SystemManagement } from "@/pages/model/components-install";

export default [
    {
        name: "data-overview",
        component: DataOverview,
        className: ["data-overview"],
        power: [0, 1],
        sort: 1,
    },
    {
        name: "real-time-monitor",
        component: RealTimeMonitor,
        className: ["real-time-monitor"],
        power: [0, 1],
        sort: 2,
    },
    {
        name: "statistical-analysis",
        component: StatisticalAnalysis,
        className: ["statistical-analysis"],
        power: [0, 1],
        sort: 3,
    },
    {
        name: "sms-management",
        component: SmsManagement,
        className: ["sms-management"],
        power: [0],
        sort: 4,
    },
    {
        name: "device-management",
        component: DeviceManagement,
        className: ["device-management"],
        power: [0],
        sort: 5,
    },
    {
        name: "system-management",
        component: SystemManagement,
        className: ["system-management"],
        power: [0],
        sort: 6,
    },
];
