interface HanaAPI{
    version: number;
    host: number;
    isSocket: boolean;
}
declare global {
    interface Window {
        hana: HanaAPI;
    };
    const hana: HanaAPI;
}