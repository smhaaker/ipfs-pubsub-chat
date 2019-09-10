console.log('compiled')

const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')

console.log(IPFS)

const ipfs = new IPFS({
    repo: repo(),
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Addresses: {
            Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
        }
    }
})

ipfs.once('ready', () => ipfs.id((err, info) => {
    if (err) { throw err}
    console.log('IPFS node running, pubsub enabled')
    console.log('Address: ' + info.id)
}))

console.log(ipfs)

const room = Room(ipfs, 'ipfs-pubsub-rooms')

console.log(room)

room.on('peer joined', (peer) => console.log('peer ' + peer + ' joined'))
room.on('peer left', (peer) => console.log('peer ' + peer + ' left'))

room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer))
room.on('message', (message) => 
    console.log('got message from ' + message.from + ' : ' + message.data.toString()))

room.on('subscribed', () => {
    console.log('connected')
})

    // testing broadcast every 2 seconds
// setInterval(() => room.broadcast('testing broadcast'), 2000)
// room.hasPeer(peer)
function sendMsgOnClick() {
    let getMessage = document.getElementById("msgInput").value
    console.log(getMessage)
    // room.hasPeer(peer)

    console.log(room.getPeers())
    let peers = room.getPeers()
    room.broadcast("THIS IS A MESSAGE ONCLICK")
    room.broadcast("input message: " + getMessage)
    room.sendTo(peers[0], "Message to first peer in list")
    room.sendTo(peers[1], "Message to second peer in list")
}
let sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendMsgOnClick);

function testFunction () {
    console.log('testing')
}
var button = document.getElementById('testButton'); 
button.addEventListener('click', testFunction);

function repo () {
    // returns random repo path to have different ID's
    // random ID's generated each reload
    return 'ipfs/pubsub/' + Math.random()
}

testFunction()


