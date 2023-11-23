export type LogType = "ERROR" | "LOG";

interface HanaAPI {
    version: string;
    host: string;
    debug: boolean;
    log: (body: string | object, type: LogType) => Promise<void> | void
}
declare global {
    interface Window {
        Hana: HanaAPI;
    };

    const Hana: HanaAPI;
}
