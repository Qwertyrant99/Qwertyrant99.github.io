const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const sidePanelText = document.querySelector('span');
const sidePanelDivider = document.querySelector('.sidepanel__divider');
const sidePanelLink = document.querySelectorAll('.sidepanel__link');
// window.addEventListener('scroll', () => {
//     const verticalScrollPx = window.scrollY;
//     if (verticalScrollPx < 225) {
//         sidePanelText.style.color = '#f5f5f5';
//         sidePanelDivider.style.backgroundColor = '#f5f5f5';
//         sidePanelLink.forEach(link => {
//             link.style.color = '#f5f5f5';
//         });
//     } else {
//         sidePanelText.style.color = '#2A109E';
//         sidePanelDivider.style.backgroundColor = '#2A109E';
//         sidePanelLink.forEach(link => {
//             link.style.color = '#2A109E';
//         });
//     }
// });
function interpolateColors(color1, color2, percentage) {
    const color1Value = color1.substring(1); // Remove the '#' character
    const color2Value = color2.substring(1);
    const color1RGB = parseInt(color1Value, 16);
    const color2RGB = parseInt(color2Value, 16);
    const r1 = (color1RGB >> 16) & 255;
    const g1 = (color1RGB >> 8) & 255;
    const b1 = color1RGB & 255;
    const r2 = (color2RGB >> 16) & 255;
    const g2 = (color2RGB >> 8) & 255;
    const b2 = color2RGB & 255;

    const r = Math.round(r1 + (r2 - r1) * percentage);
    const g = Math.round(g1 + (g2 - g1) * percentage);
    const b = Math.round(b1 + (b2 - b1) * percentage);

    return `rgb(${r}, ${g}, ${b})`;
}

// Function to change the color of the "aside" block based on scroll position
function changeAsideColorOnScroll() {
    // const asideElement = document.getElementById("myAside");
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const percentage = scrollPosition / maxScroll;
    const colorStart = "#f5f5f5"; // Initial color
    const colorEnd = "#2A109E"; // Target color
    const interpolatedColor = interpolateColors(colorStart, colorEnd, percentage);
    sidePanelText.style.color = interpolatedColor;
    sidePanelDivider.style.backgroundColor = interpolatedColor;
}

// Attach the scroll event listener
window.addEventListener("scroll", changeAsideColorOnScroll);