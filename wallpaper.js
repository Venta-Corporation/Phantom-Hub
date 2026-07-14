// ============================
// Wallpaper System
// ============================

const preview = document.getElementById("previewBox");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const galleryPicker = document.getElementById("galleryPicker");

let selectedWallpaper = 
localStorage.getItem("chatWallpaper") || "#121212";


// Load saved wallpaper
updatePreview(selectedWallpaper);


// ============================
// Apply Color Wallpaper
// ============================

function applyColor(color){

    selectedWallpaper = color;

    updatePreview(color);
}


// ============================
// Apply Built-in Wallpaper
// ============================

function applyWallpaper(path){

    selectedWallpaper = path;

    updatePreview(path);

    // Remove previous selection
    document.querySelectorAll(".card").forEach(card=>{
        card.classList.remove("active");
    });

    // Highlight selected wallpaper
    if(event && event.currentTarget){
        event.currentTarget.classList.add("active");
    }

}


// ============================
// Preview Function
// ============================

function updatePreview(value){

    if(!preview) return;


    if(value.startsWith("#")){

        preview.style.background = value;
        preview.style.backgroundImage = "none";

    }
    else{

        preview.style.backgroundImage = 
        `url("${value}")`;

        preview.style.backgroundSize = "cover";
        preview.style.backgroundPosition = "center";
        preview.style.backgroundRepeat = "no-repeat";

    }

}


// ============================
// Gallery Upload
// ============================

if(galleryPicker){

galleryPicker.addEventListener("change",function(){

    const file = this.files[0];

    if(!file) return;


    const reader = new FileReader();


    reader.onload = function(e){

        selectedWallpaper = e.target.result;

        updatePreview(selectedWallpaper);

    };


    reader.readAsDataURL(file);


});

}


// ============================
// Save Wallpaper
// ============================

if(saveBtn){

saveBtn.onclick=function(){

    localStorage.setItem(
        "chatWallpaper",
        selectedWallpaper
    );


    showToast("Wallpaper saved ✔");

};

}


// ============================
// Reset Wallpaper
// ============================

if(resetBtn){

resetBtn.onclick=function(){

    selectedWallpaper="#121212";

    updatePreview(selectedWallpaper);


    localStorage.removeItem(
        "chatWallpaper"
    );


    showToast("Wallpaper reset");

};

}


// ============================
// Toast Message
// ============================

function showToast(message){

    let toast=document.createElement("div");

    toast.innerText=message;


    toast.style.position="fixed";
    toast.style.bottom="25px";
    toast.style.left="50%";
    toast.style.transform="translateX(-50%)";
    toast.style.background="#D4AF37";
    toast.style.color="#000";
    toast.style.padding="12px 22px";
    toast.style.borderRadius="25px";
    toast.style.fontWeight="bold";
    toast.style.zIndex="9999";
    toast.style.boxShadow=
    "0 5px 15px rgba(0,0,0,.4)";


    document.body.appendChild(toast);


    setTimeout(()=>{

        toast.remove();

    },2500);

}
const backBtn = document.getElementById("backBtn");

if(backBtn){

    backBtn.onclick = function(){

        window.history.back();

    };

}