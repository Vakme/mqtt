var mqtt = require('mqtt');

client = mqtt.connect('mqtt://localhost:1883/');

client.on('connect', function () {
    client.subscribe('response');

    console.log('Client publishing.. ');

    var msg = 'Client 1 is alive.. Test Ping! ' + new Date();
    /*console.log(msg);*/
    client.publish('presence', msg);
});

client.on('message', function(topic, message) {
        if(topic.toString() === 'response' && message.toString() == 'true') {
            console.log('Config successful');
            client.end();
        }

});