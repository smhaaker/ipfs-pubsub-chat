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
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
            // '/p2p-circuit/ipfs/QmZLQiNPJSB2GB2ofGJLjH871bDbtc5iBpweFavJYAbPzu' // add singular peer
            ]
        }
    }
})

let ipfsID = document.getElementById('ipfsID')
// let testAddr = '/p2p-circuit/ipfs/QmZLQiNPJSB2GB2ofGJLjH871bDbtc5iBpweFavJYAbPzu'

ipfs.once('ready', () => ipfs.id((err, info) => {
    if (err) { throw err}
    console.log('IPFS node running, pubsub enabled')
    console.log(info.addresses)
    console.log('Address: ' + info.id)
    ipfsID.innerHTML = info.id
    // ipfs.swarm.peers({}, function(err, peers) {
    //     console.log(peers)
    // })
    console.log((ipfs))
    // ipfs.swarm.connect(testAddr, function (err) {
    //     if (err) {
    //       throw err
    //     }
    //     // if no err is present, connection is now open
    //   })


}))



console.log(ipfs)
// console.log(ipfs.pubsub)

const room = Room(ipfs, 'ipfs-pubsub-general-room')
// change to whatever room

console.log(room)

room.on('peer joined', (peer) => console.log('peer ' + peer + ' joined'))
room.on('peer left', (peer) => console.log('peer ' + peer + ' left'))

room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer))
let textOutputHTML = document.getElementById('textOutput')
let status = document.getElementById('status')

room.on('message', (message) => 
    // console.log('got message from ' + message.from + ' : ' + message.data.toString())
    textOutputHTML.innerHTML += '<span class="message"> <b>' + message.from + ' </b>: ' + message.data.toString() + '</span><br/>'
    )
room.on('subscribed', () => {
    console.log('connected')
    status.innerHTML = 'connected'
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
    // room.broadcast("THIS IS A MESSAGE ONCLICK")
    room.broadcast(getMessage) // broadcasts a message to the room
    // room.sendTo(peers[0], "Message to first peer in list")
    // room.sendTo(peers[1], "Message to second peer in list")
    clearInput() // clearing input field
}

function clearInput () {
    let input = document.getElementById("msgInput")
    console.log(input.value)
    input.value = "";
}

let sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendMsgOnClick);

function repo () {
    // returns random repo path to have different ID's
    // random ID's generated each reload
    return 'ipfs/pubsub/' + Math.random()
}


window.WindowFunction = function(){
    console.log('testing window function');
};

