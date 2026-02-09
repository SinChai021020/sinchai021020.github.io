/* Handles showing/hiding views WITHIN the current file.
   Also handles loading specific views based on URL hash (e.g., noodle.html#detail-xiao-ming)
*/

document.addEventListener("DOMContentLoaded", () => {
    // 1. Reset all food/menu states on load
    resetShopStates();

    // 2. Check if there is a hash in the URL (e.g., #detail-xiao-ming)
    const hash = window.location.hash.substring(1); // remove '#'
    
    if (hash && document.getElementById('view-' + hash)) {
        // If hash exists and corresponds to a view ID, show it
        showInternalView(hash);
    } else {
        // Otherwise, do nothing (CSS handles showing the default view-section)
    }
});

function showInternalView(viewId) {
    // 1. Hide all main views in this file
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(s => s.classList.remove('active'));

    // 2. Show the target view
    const target = document.getElementById('view-' + viewId);
    if(target) {
        target.classList.add('active');
        // Scroll to top
        window.scrollTo({top: 0, behavior: 'instant'});
    }
}

function resetShopStates() {
    const menuBoxes = document.querySelectorAll('.menu-item-box');
    menuBoxes.forEach(box => box.classList.remove('active'));

    const detailSections = document.querySelectorAll('.detail-group');
    detailSections.forEach(section => {
        const defaultSrc = section.getAttribute('data-default-src');
        const mainImg = section.querySelector('.main-preview-img');
        const descText = section.querySelector('.food-description-text');

        if (mainImg && defaultSrc) mainImg.src = defaultSrc;
        if (descText) descText.innerText = "Select a dish to explore its flavor.";
    });
}

function updateMenu(shopKey, imgUrl, caption, description, el) {
    const imgElement = document.getElementById('img-' + shopKey);
    const descElement = document.getElementById('desc-' + shopKey);
    
    if(imgElement) imgElement.src = imgUrl;
    if(descElement) descElement.innerText = description;
    
    const boxes = el.parentElement.getElementsByClassName('menu-item-box');
    for(let b of boxes) { b.classList.remove('active'); }
    el.classList.add('active');
}