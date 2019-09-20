# ipfs-pubsub-chat

> 
> ipfs pubsub chat client experiment
>

## Build Setup

``` bash
# Install dependencies
npm install

# Compile
npm run compile

# Run local server
npm start

# Open browser to
localhost:12345/index.html
```

Each window has a unique Peer ID. 

``` bash
# Chat commands
/commands - gives list of commands in web chat
/peers - lists current peers, click peer id to dm
/dm - direct message to peer
```

``` bash
# OR. Run in terminal (in progress)
node src/terminal.js 'peer to connect'

node src/terminal.js /dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmPv9ADi7gBzkM1uAvdXS5gBxNYPLVNTuYhT9QC6t6Je4F
```

