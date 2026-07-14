
let peer = null;
let conn = null;
let html5QrCode = null;
let reconnectAttempts = 0;
let maxReconnect = 3;
let pendingConn = null;

// --- PANEL NAVIGATION ---
function openP2PPanel() {
    const panel = document.getElementById('p2p-panel');
    const content = document.getElementById('p2p-content');

    panel.classList.remove('hidden');

    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);

    if (localStorage.getItem('p2p-acknowledged') === 'true') {
        acknowledgeP2P();
    }
}

function acknowledgeP2P() {
    localStorage.setItem('p2p-acknowledged', 'true');

    document.getElementById('p2p-notice').classList.add('hidden');
    document.getElementById('p2p-interface').classList.remove('hidden');

    initPeer();
}

function closeP2PPanel() {
    const panel = document.getElementById('p2p-panel');
    const content = document.getElementById('p2p-content');

    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => panel.classList.add('hidden'), 400);
}

function openP2PChat() {
    closeP2PPanel();
    document.getElementById('p2p-chat-panel').classList.remove('hidden');
}

function closeP2PChat() {
    document.getElementById('p2p-chat-panel').classList.add('hidden');
}

// --- CORE P2P LOGIC ---
function initPeer() {
    if (peer) return;

    try {
        peer = new Peer(null, { debug: 2 });

        peer.on('open', (id) => {
            document.getElementById('my-id').innerText = id;
            logSync("Neural Link Established.", true);
        });

        // 🔥 Incoming request (NO AUTO CONNECT)
        peer.on('connection', (incoming) => {
            logSync("Incoming Sync Request...");

            pendingConn = incoming;

            document.getElementById('incoming-peer-id').innerText =
                incoming.peer.substring(0, 10);

            document.getElementById('p2p-request-popup').classList.remove('hidden');
        });

        peer.on('error', (err) => {
            logSync("Peer Error: " + err.type);
        });

        peer.on('disconnected', () => {
            logSync("Disconnected. Attempting recovery...");
            attemptReconnect();
        });

    } catch {
        logSync("Initialization Failed.");
    }
}

// ✅ ACCEPT
function acceptConnection() {
    if (!pendingConn) return;

    conn = pendingConn;
    pendingConn = null;

    // 🔥 SEND APPROVAL SIGNAL
    conn.send({ type: "accepted" });

    setupConnection();

    document.getElementById('p2p-request-popup').classList.add('hidden');

    logSync("Connection Accepted.", true);
}

// ❌ REJECT
function rejectConnection() {
    if (pendingConn) {
        pendingConn.close();
        pendingConn = null;
    }

    document.getElementById('p2p-request-popup').classList.add('hidden');

    logSync("Connection Rejected.");
}

// --- OUTGOING CONNECTION ---
function connectToPeer() {
    const remoteId = document.getElementById('peer-id-input').value.trim();
    const myId = document.getElementById('my-id').innerText;

    if (!remoteId) return logSync("Error: No Peer ID.");

    if (remoteId === myId) {
        logSync("Error: Cannot connect to your own Vault.");
        return;
    }

    if (!peer) return logSync("Peer not initialized.");

    logSync("Handshaking with " + remoteId.substring(0, 8));

    try {
        conn = peer.connect(remoteId, { reliable: true });

        conn.on('open', () => {
            logSync("Waiting for peer approval...");
        });

        // 🔥 LISTEN FOR ACCEPT SIGNAL
        conn.on('data', (data) => {
            if (data?.type === "accepted") {
                logSync("Peer Accepted Connection.", true);
                setupConnection(); // ✅ NOW ACTIVATE
            }
        });

        conn.on('close', () => {
            logSync("Connection Closed.");
            updateStatus(false);
        });

        conn.on('error', () => {
            logSync("Connection Failed.");
        });

    } catch {
        logSync("Connection Failed.");
    }
}
// --- ACTUAL CONNECTION ACTIVATION ---
function setupConnection() {
    if (!conn) return;

    // Avoid duplicate binding
    if (conn._phantomSetup) return;
    conn._phantomSetup = true;

    reconnectAttempts = 0;

    logSync("Tunnel Secured.", true);

    const btn = document.getElementById('btn-to-chat');
    btn.disabled = false;
    btn.classList.replace('text-gray-600', 'text-[#D4AF37]');

    updateStatus(true);

    conn.on('data', (data) => {
        // Ignore system messages
        if (typeof data === "object" && data.type) return;

        appendP2PMsg("Peer", data, 'received');
    });

    conn.on('close', () => {
        logSync("Connection Closed.");
        updateStatus(false);
    });

    conn.on('error', () => {
        logSync("Connection Error.");
        updateStatus(false);
    });
}

function attemptReconnect() {
    if (reconnectAttempts >= maxReconnect) {
        logSync("Reconnect Failed.");
        return;
    }

    reconnectAttempts++;
    logSync("Retry " + reconnectAttempts + "...");

    peer.reconnect();
}

function updateStatus(active) {
    const dot = document.getElementById('p2p-status-dot');
    const text = document.getElementById('p2p-status-text');

    if (active) {
        dot.className = "w-1.5 h-1.5 bg-green-500 animate-pulse";
        text.innerText = "Link Active";
    } else {
        dot.className = "w-1.5 h-1.5 bg-red-500";
        text.innerText = "Disconnected";
    }
}

function handleP2PSend() {
    const input = document.getElementById('p2p-input');
    const msg = input.value.trim();

    if (!msg) return;

    if (conn && conn.open) {
        conn.send(msg);
        appendP2PMsg("You", msg, 'sent');
        input.value = "";
    } else {
        logSync("No Active Connection.");
    }
}

function appendP2PMsg(sender, text, type) {
    const container = document.getElementById('p2p-messages');

    const div = document.createElement('div');
    div.className = `flex ${type === 'sent' ? 'justify-end' : 'justify-start'}`;

    const time = new Date().toLocaleTimeString();

    div.innerHTML = `
        <div class="max-w-[80%] p-4 rounded-2xl text-xs font-medium
        ${type === 'sent'
            ? 'bg-[#D4AF37] text-black rounded-tr-none'
            : 'bg-white/5 border border-white/10 text-white rounded-tl-none'}">
            ${text}
            <div class="text-[8px] opacity-50 mt-1">${time}</div>
        </div>
    `;

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function logSync(msg, gold = false) {
    const consoleBox = document.getElementById('sync-console');

    const div = document.createElement('div');
    div.className = gold ? 'text-[#D4AF37]' : '';

    div.innerText = `> ${msg}`;

    consoleBox.prepend(div);
}

// --- QR & CLIPBOARD ---
function copyVaultKey() {
    const id = document.getElementById('my-id').innerText;

    navigator.clipboard.writeText(id)
        .then(() => logSync("Key Copied."))
        .catch(() => logSync("Copy Failed."));
}

function showMyQRCode() {
    const id = document.getElementById('my-id').innerText;

    if (id.includes("...")) return;

    document.getElementById('qrcode').innerHTML = "";

    try {
        new QRCode(document.getElementById('qrcode'), {
            text: id,
            width: 180,
            height: 180
        });
    } catch {
        logSync("QR Failed.");
    }

    document.getElementById('qr-overlay').classList.remove('hidden');
    document.getElementById('qr-display-area').classList.remove('hidden');
    document.getElementById('scanner-area').classList.add('hidden');
}

function startScanner() {
    document.getElementById('qr-overlay').classList.remove('hidden');
    document.getElementById('qr-display-area').classList.add('hidden');
    document.getElementById('scanner-area').classList.remove('hidden');

    try {
        if (!html5QrCode) html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 200 },
            (txt) => {
                document.getElementById('peer-id-input').value = txt;
                stopScanner();
                connectToPeer();
            }
        );
    } catch {
        logSync("Scanner Failed.");
    }
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop()
            .then(() => closeOverlay())
            .catch(() => closeOverlay());
    } else {
        closeOverlay();
    }
}

function closeOverlay() {
    document.getElementById('qr-overlay').classList.add('hidden');
}

//<!-- end of p2p script -->