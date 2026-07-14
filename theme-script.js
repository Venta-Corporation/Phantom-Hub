function switchToLightTheme() {

    // create style element
    let lightStyle = document.getElementById("light-theme-style");

    if (!lightStyle) {

        lightStyle = document.createElement("style");
        lightStyle.id = "light-theme-style";

        lightStyle.innerHTML = `

        body{
            background:#f5f6f8 !important;
            color:#111 !important;
        }

        .sidebar{
            background:#ffffff !important;
            border-right:1px solid rgba(0,0,0,0.08) !important;
        }

        .chat-view{
            background:#f7f7f9 !important;
        }

        #chat-header{
            background:#ffffff !important;
            border-bottom:1px solid rgba(0,0,0,0.08) !important;
        }

        .msg-them{
            background:#ffffff !important;
            color:#111 !important;
            border:1px solid rgba(0,0,0,0.08);
        }

        .msg-me{
            background:#D4AF37 !important;
            color:black !important;
        }

        .info-card{
            background:#ffffff !important;
            border:1px solid rgba(0,0,0,0.08) !important;
        }

        .bg-white\\/5{
            background:rgba(0,0,0,0.03) !important;
        }

        .bg-white\\/10{
            background:rgba(0,0,0,0.06) !important;
        }

        .border-white\\/5{
            border-color:rgba(0,0,0,0.05) !important;
        }

        .border-white\\/10{
            border-color:rgba(0,0,0,0.08) !important;
        }

        .text-white\\/20,
        .text-white\\/30,
        .text-white\\/40,
        .text-white\\/50,
        .text-white\\/60,
        .text-white\\/70,
        .text-white\\/80{
            color:rgba(0,0,0,0.6) !important;
        }

        .msg-action-panel{
            background:rgba(255,255,255,0.9) !important;
            border:1px solid rgba(0,0,0,0.1) !important;
            color:#111 !important;
        }

        .msg-action-btn{
            color:#111 !important;
        }

        .msg-action-btn:hover{
            background:rgba(0,0,0,0.05) !important;
        }

        input{
            color:#111 !important;
        }
        
                /* Panel & Sidebar Overrides */
        #content-panel, #panel-body {
            background: #ffffff !important;
            color: #111 !important;
        }

        /* Target Tailwind background and border classes in the switch list */
        .bg-white\\/5, .bg-white\\[0\\.02\\] { 
            background: rgba(0, 0, 0, 0.04) !important; 
        }
        
        .bg-white\\/10 { 
            background: rgba(0, 0, 0, 0.08) !important; 
        }

        .border-white\\/5, .border-white\\/10 { 
            border-color: rgba(0, 0, 0, 0.1) !important; 
        }

        /* Fix Text Visibility in Light Mode */
        .text-white, .text-gray-300, .text-gray-200 { 
            color: #111 !important; 
        }

        /* Target the specific alpha text classes used in your settings */
        .text-white\\/20, .text-white\\/30, .text-white\\/40, 
        .text-white\\/50, .text-white\\/60, .text-white\\/70, 
        .text-white\\/80 {
            color: rgba(0, 0, 0, 0.7) !important;
        }

        /* Details/Dropdowns inside the panel */
        details {
            background: #fafafa !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        /* Radio button container background */
        .radio-btn {
            background: #ffffff !important;
        }
        
        
        
                /* Hub Icon Overrides (Main & Explore) */
        .grid-item {
            color: #111 !important;
        }

        /* Target the icon boxes (w-12 h-12) */
        .grid-item div.bg-white\\/5 {
            background: rgba(0, 0, 0, 0.05) !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
        }

        /* Target the SVGs inside the icons */
        .grid-item svg {
            stroke: #111 !important;
        }

        /* Hover effect for light mode */
        .grid-item:hover div.bg-white\\/5 {
            background: rgba(0, 0, 0, 0.08) !important;
            transform: translateY(-2px);
            transition: all 0.2s ease;
        }

        /* Section Titles for Hubs */
        h2, .hub-title {
            color: #111 !important;
        }
        
        
                /* --- HUB & STACK LIGHT MODE OVERRIDES --- */

        /* The main floating buttons (when not expanded) */
        .hub-btn {
            background: #D4AF37 !important; /* Keep the Gold */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }

        /* The Expanded Hub Panel (The Glassy Card) */
        .hub-btn.expanded {
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(25px) !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1) !important;
        }

        /* Grid Items inside the Hub */
        .hub-grid .grid-item {
            color: #444 !important; /* Darker text for readability */
        }

        .hub-grid .grid-item span {
            color: #666 !important;
            font-weight: 800 !important;
        }

        /* The icon containers inside the Hub Grid */
        .hub-grid .grid-item div {
            background: rgba(0, 0, 0, 0.04) !important;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
            color: #111 !important;
        }

        /* Hover states in Light Mode */
        .hub-grid .grid-item:hover {
            color: #D4AF37 !important; /* Turn gold on hover */
        }

        .hub-grid .grid-item:hover div {
            background: rgba(0, 0, 0, 0.08) !important;
            border-color: #D4AF37 !important;
        }

        /* SVG Icon color inside the Hub */
        .hub-grid .grid-item svg {
            stroke: #111 !important;
        }

        .hub-grid .grid-item:hover svg {
            stroke: #D4AF37 !important;
        }

        /* Desktop specific alignment adjustment for light mode shadows */
        @media (min-width: 769px) {
            .hub-stack {
                filter: drop-shadow(0 5px 15px rgba(0,0,0,0.05));
            }
        }
        
        
        
        
        
                /* --- CHAT FILTER BUBBLES & ACTION BUTTONS --- */

        /* Generic Bubble Style (Inactive) */
        .filter-bubble {
            background: rgba(0, 0, 0, 0.05) !important;
            color: #444 !important;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
        }

        /* Active Bubble (The selected one) */
        .active-bubble {
            background: #111 !important; /* Dark contrast for the selected filter */
            color: #fff !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }

        /* Phantom AI Button (Keeping the Gold Identity) */
        .ai-btn-gold {
            background: rgba(0, 0, 0, 0.05) !important;
            color: #4c4c4c !important;
            font-weight: 800 !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
        }

        /* P2P / Action Button (The w-12 rounded-2xl one) */
        button[onclick="openP2PPanel()"] {
            
            border-color: rgba(0, 0, 0, 0.1) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
        }

        /* SVG Icon inside the P2P button */
        button[onclick="openP2PPanel()"] svg {
            color: gray !important; /* Makes the white icon dark */
        }

        /* Hover states for filter buttons */
        .filter-bubble:hover {
            background: rgba(255, 255, 255, 0.08);
            
            
        }

        /* Hide Scrollbar for Light Mode */
        .scroll-hide::-webkit-scrollbar {
            display: none;
        }
        
        
                /* --- AVATAR / ICON PLACEHOLDER OVERRIDES --- */

        /* Target the w-12 h-12 container with bg-neutral-900 */
        .w-12.h-12.bg-neutral-900 {
            background: rgba(0, 0, 0, 0.06) !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            color: #111 !important; /* Forces initials like "JD" to be dark */
        }

        /* Target the text-gray-500 inside that specific container */
        .w-12.h-12.bg-neutral-900.text-gray-500 {
            color: #333 !important;
            font-weight: 800 !important;
        }

        /* If there is an image inside the rounded-2xl container */
        .w-12.h-12.rounded-2xl img {
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        
        
                /* --- PHANTOM AI LIGHT MODE (FINAL OPTIMIZED) --- */

/* Main Panel & Header */
#phantom-ai-system {
    background: #f5f6f8 !important;
}

#phantom-ai-system .border-b.border-white\\/10 {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03) !important;
}

#phantom-ai-system button.hover\\:bg-white\\/10 {
    color: #111 !important;
}

/* AI Message & Text Nodes */
.ai-text-node {
    background: rgba(0, 0, 0, 0.03) !important;
    border-left: 3px solid #D4AF37 !important;
    padding: 15px !important;
    border-radius: 12px !important;
}

.ai-content-wrapper, .ai-text-node p.text-white\\/80 {
    color: #111 !important;
}

.user-msg-bubble {
    background: #D4AF37 !important;
    color: #000 !important;
}

/* Code Blocks */
.ai-code-container {
    background: #fdfdfd !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    overflow: hidden;
    border-radius: 12px;
}

.code-header {
    background: #f1f1f1 !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.code-lang { color: #666 !important; font-weight: 800 !important; }

.code-body-wrapper pre { background: #f8f8f8 !important; }
.code-body-wrapper code { color: #222 !important; }

/* Bottom Input Bar */
#phantom-ai-system .p-4.bg-black.border-t {
    background: #ffffff !important;
    border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
}

#phantom-ai-system .flex.items-center.bg-white\\/5 {
    background: rgba(0, 0, 0, 0.04) !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
}

#ai-query-input { color: #111 !important; }
#ai-query-input::placeholder { color: rgba(0, 0, 0, 0.4) !important; }

/* System UI Elements */
.ai-heading { color: #000 !important; font-weight: 800 !important; }

#phantom-ai-system .text-\\[10px\\] {
    background: rgba(212, 175, 55, 0.1) !important;
    color: #AA8418 !important;
    border-color: #D4AF37 !important;
}

.copy-btn { color: #888 !important; }
.animate-pulse { color: #D4AF37 !important; }

/* Scrollbar */
#ai-viewport::-webkit-scrollbar { width: 4px; }
#ai-viewport::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}



/* Targeting the P2P / Content Panel for Light Mode */
/* Update the P2P Container for Light Mode */
/* --- LIGHT THEME FOR P2P SYSTEM --- */

/* 1. Main P2P Panel & Chat Backgrounds */
#p2p-content, 
#p2p-chat-panel, 
#qr-overlay > div, 
#p2p-request-popup > div {
    background-color: #f8f9fa !important; /* Soft white/light grey */
    border-color: rgba(0, 0, 0, 0.1) !important;
    color: #1a1a1a !important;
}

/* 2. Full Screen Chat Background & Overlay */
#p2p-chat-panel {
    background: #ffffff !important;
}

#p2p-messages {
    background: radial-gradient(circle at top, #f0f0f0 0%, #ffffff 100%) !important;
}

/* 3. Inner Cards and Input Boxes */
#p2p-content .bg-white\/5, 
#p2p-interface .bg-white\/5,
#p2p-chat-panel .bg-white\/5 {
    background-color: rgba(0, 0, 0, 0.04) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
}

/* 4. Text Colors (Headings, Labels, and Body) */
#p2p-content p, 
#p2p-content h2, 
#p2p-content span, 
#p2p-chat-panel h3,
#p2p-chat-panel p,
#p2p-request-popup p {
    color: #1a1a1a !important;
}

/* 5. Input Fields */
#peer-id-input, 
#p2p-input {
    color: #000000 !important;
}

#peer-id-input::placeholder, 
#p2p-input::placeholder {
    color: rgba(0, 0, 0, 0.3) !important;
}

/* 6. Console Log Area */
#sync-console {
    background-color: black !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
    color: #444 !important;
}

/* 7. Close & Action Buttons (Non-Gold) */
#p2p-content button.bg-white\/5,
#p2p-chat-panel button {
    background-color: rgba(0, 0, 0, 0.05) !important;
    color: #1a1a1a !important;
}

/* 8. QR Code Container */
#qrcode {
    background-color: #ffffff !important;
    padding: 15px;
    border: 1px solid #ddd;
}



     
        
        
        

        `;

        document.head.appendChild(lightStyle);
    }
}

function switchToDarkTheme(){

    const lightStyle = document.getElementById("light-theme-style");

    if(lightStyle){
        lightStyle.remove();
    }

}





// 1. MUST BE GLOBAL (Outside of any other function)
window.setTheme = function(theme) {
    console.log("Switching to theme:", theme);
    localStorage.setItem("selectedTheme", theme);
    
    if (theme === "dark") {
        switchToDarkTheme(); // Ensure this function exists globally too
    } else {
        switchToLightTheme(); // Ensure this function exists globally too
    }
    
    // Keep the dot in sync
    syncRadioUI();
};

// 2. Your existing Sync Function
function syncRadioUI() {
    const savedTheme = localStorage.getItem("selectedTheme") || "dark";
    setTimeout(() => {
        const radio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
        if (radio) {
            radio.checked = true;
        }
    }, 50);
}

// 3. Your Initialization Logic
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("selectedTheme") || "dark";
    
    // Apply theme on reload
    if (savedTheme === "dark") {
        if (typeof switchToDarkTheme === "function") switchToDarkTheme();
    } else {
        if (typeof switchToLightTheme === "function") switchToLightTheme();
    }
    
    syncRadioUI();
});
