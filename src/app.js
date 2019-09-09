console.log('compiled')

const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')

// console.log(IPFS)

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

const room = Room(ipfs, 'ipfs-pubsub-rooms')

console.log(room)

room.on('peer joined', (peer) => console.log('peer ' + peer + ' joined'))
room.on('peer left', (peer) => console.log('peer ' + peer + ' left'))

room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer))
room.on('message', (message) => 
    console.log('got message from ' + message.from + ' : ' + message.data.toString()))

    // testing broadcast every 2 seconds
// setInterval(() => room.broadcast('testing broadcast'), 2000)

function repo () {
    // returns random repo path to have different ID's
    return 'ipfs/pubsub/' + Math.random()
}