document.addEventListener("DOMContentLoaded", () => {
    resetShopStates();

    const hash = window.location.hash.substring(1); // remove '#'
    
    if (hash && document.getElementById('view-' + hash)) {
        showInternalView(hash);
    } else {
    }
});

function showInternalView(viewId) {
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(s => s.classList.remove('active'));

    const target = document.getElementById('view-' + viewId);
    if(target) {
        target.classList.add('active');
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