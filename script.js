// Array of 35 Image Names
const pinImages = [
    "FB_IMG_1755072234905.jpg",
    "FB_IMG_1758384891305.jpg",
    "IMG-20241115-WA0015~3.jpg",
    "IMG-20250518-WA0065.jpg",
    "IMG-20250629-WA0000.jpg",
    "IMG-20250629-WA0020.jpg",
    "IMG-20250630-WA0001.jpg",
    "IMG-20250921-WA0007.jpg",
    "IMG_1718467955702.jpg",
    "IMG_1756393251764.jpg",
    "IMG_1758384847409.jpg",
    "Messenger_creation_008D4634-712F-4B07-A0FE-E38382F02FA1.jpeg",
    "Messenger_creation_0ABBDCC0-762F-4E46-A43F-CAF86CBE9B2C.jpeg",
    "Messenger_creation_9B76B2B3-5CCA-4DF5-A6C8-3AEF9861B73F.jpeg",
    "Messenger_creation_B23C9E01-B61A-4AF5-9E8F-8E359C7E43A9.jpeg",
    "Messenger_creation_F8E1372F-15B3-4B88-AA16-9EF15FE8B91E.jpeg",
    "Messenger_creation_FB351AF0-F050-4AB5-9D76-89B076180C28~2.jpeg",
    "Screenshot_20240614-130150~2.jpg",
    "Screenshot_20240614-130609~2.jpg",
    "Screenshot_20240823-154950~2.jpg",
    "Screenshot_20240921-125122~2.jpg",
    "Screenshot_20250111-120355~2.jpg",
    "Screenshot_20250501-144233.jpg",
    "Screenshot_20250508-152816.jpg",
    "Screenshot_20250528-094823.jpg",
    "Screenshot_20250706-144032.jpg",
    "Screenshot_20250924-174952.jpg",
    "Screenshot_20251005-181223.jpg",
    "Screenshot_20251012-143302.jpg",
    "Snapchat-1167169927.jpg",
    "Snapchat-1635970030.jpg",
    "Snapchat-1790199894.jpg",
    "Snapchat-562710592.jpg",
    "Snapchat-860467066~2.jpg",
    "received_1164893104479408.jpeg"
];

// Generate Memory Pinboard Cards Dynamically
function renderMemoryPinboard() {
    const gridContainer = document.getElementById("pinboard-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    pinImages.forEach((filename, idx) => {
        const imagePath = `images/${filename}`;

        const noteCard = document.createElement("div");
        noteCard.className = "sticky-note";
        noteCard.innerHTML = `
            <img src="${imagePath}" alt="Memory ${idx + 1}" onerror="this.onerror=null; this.src='https://picsum.photos/400/300?random=${idx + 10}';">
            <div class="note-typography">
                <div class="note-line-1">Memory #${idx + 1}</div>
                <div class="note-line-2">বিশেষ একটি মুহূর্ত ❤️</div>
                <div class="note-line-3">Forever in my heart</div>
            </div>
        `;
        gridContainer.appendChild(noteCard);
    });
}

// Call on load
document.addEventListener("DOMContentLoaded", renderMemoryPinboard);
