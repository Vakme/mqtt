var mosca = require('mosca');

var settings = {
    port: 1883,
    persistence: {
        factory: mosca.persistence.Memory
    }
};

//here we start mosca
var server = new mosca.Server(settings, function() {
    console.log('Mosca server is up and running')
});

server.published = function(packet, client, cb) {
    if (packet.topic.indexOf('echo') === 0) {
        return cb();
    }

    var newPacket = {
        topic: 'echo/' + packet.topic,
        payload: packet.payload,
        retain: packet.retain,
        qos: packet.qos
    };

    console.log('newPacket', newPacket);

    server.publish(newPacket, function () {
        console.log('Sent: ' + newPacket.payload + " Clients: " + client);
    });
};