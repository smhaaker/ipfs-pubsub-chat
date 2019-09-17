const IPFS = require('ipfs')
async function main() {
    node = await IPFS.create({ 
        start: false,
        repo: repo(),
        EXPERIMENTAL: {
            pubsub: true
        },
        config: {
            Addresses: {
                Swarm: [
                // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                // '/p2p-circuit/ipfs/QmPv9ADi7gBzkM1uAvdXS5gBxNYPLVNTuYhT9QC6t6Je4F' // add singular peer
                ]
            }
        }
    })
    console.log('Node is ready to use but not started!')

    start(node)
}

main()


async function start(node) {
    try {
        await node.start()
        console.log('Node started!')
        const topic = 'ipfs-pubsub-general-room'
        const receiveMsg = (msg) => console.log(msg.data.toString())

        node.pubsub.subscribe(topic, receiveMsg, (err) => {
          if (err) {
            return console.error(`failed to subscribe to ${topic}`, err)
          }
          console.log(`subscribed to ${topic}`)
        })

          // this works to connect to single peer. it only sends out to one.... 
        node.swarm.connect('/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmPv9ADi7gBzkM1uAvdXS5gBxNYPLVNTuYhT9QC6t6Je4F') 
        // console.log(await node.id())
        // checkPeers(node)
        setTimeout(function(){ publish(node, topic, 'hello'); }, 3000); // works with delay so async it
      } catch (error) {
        console.error('Node failed to start!', error)
      }
}


async function publish(node, topic, message){
  const msg = Buffer.from(message)
  // node.pubsub.publish(topic, msg)

  node.pubsub.publish(topic, msg, (err) => {
    if (err) {
      return console.error(`failed to publish to ${topic}`, err)
    }
    // msg was broadcasted
    console.log(`published to ${topic}`)
  })
}

function checkPeers(node) {
  node.swarm.peers(function (err, peerInfos) {
    if (err) {
      throw err
    }
    console.log(peerInfos)
  })

  // node.swarm.addrs(function (err, peerInfos) {
  //   if (err) {
  //     throw err
  //   }
  //   console.log(peerInfos)
  // })
}


function repo () {
  // returns random repo path to have different ID's
  // random ID's generated each reload
  return 'ipfs/pubsub/' + Math.random()
}