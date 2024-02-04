import Debug from 'dev/debug'
try{

    window.Hana = {
        version: "beta1.0",
        host: window.location.host,
        debug: false,
        log: Debug,
        enviroment: {
            sockets: !(vino) || !!(WebSocket),
            sse: !!(EventSource),
            wiiu: !!(window.wiiu)
        }
    };
    
}catch(err){
    alert("Hanabi Internal Error")
}

var Hana = window.Hana;