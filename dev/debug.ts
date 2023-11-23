import { LogType } from "./hana";

function stringifyWindow() {
    let result = {}
    Object.getOwnPropertyNames(window).forEach((key: string) => {
        // @ts-ignore
        const value = window[key];
        // @ts-ignore
        switch (typeof window[key]) {
            case 'undefined':
                // @ts-ignore
                result[key] = 'undefined';
                break;
            case 'function':
                // @ts-ignore
                result[key] = value.toString();
                break;
            default:
                try {
                    // @ts-ignore
                    result[key] = JSON.parse(JSON.stringify(value));
                } catch { }
                break;
        }
    });
    return result;
}


export default function HanabiLog(body: string | object, type: LogType) {
    console.log(Hana)
    if (!Hana.debug)
        return;
    const _body = {
        body: body,
        type
    };
    return fetch('/yoru', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body),
    })
        .then(response => response.json())
        .then(console.log)
}