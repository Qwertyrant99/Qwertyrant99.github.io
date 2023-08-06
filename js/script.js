const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const sidePanelText = document.querySelector('.sidepanel__text span');
const sidePanelDivider = document.querySelector('.sidepanel__divider');
const sidePanelLink = document.querySelectorAll('.sidepanel__link svg path');
window.addEventListener('scroll', () => {
    const verticalScrollPx = window.scrollY;

    function changeColor(scrollSize, item) {
        if (verticalScrollPx >= scrollSize) {
            item.classList.add('dark');
        } else {
            item.classList.remove('dark');
        }
    }
    changeColor(225, sidePanelText);
    changeColor(325, sidePanelDivider);
    sidePanelLink.forEach(el => changeColor(425, el));
    // if (verticalScrollPx < 225) {
    //     sidePanelText.style.color = '#f5f5f5';
    //     sidePanelDivider.style.backgroundColor = '#f5f5f5';
    //     sidePanelLink.forEach(img => {
    //         img.style.filter = '#f5f5f5';
    //     });
    // } else if (verticalScrollPx >= 225) {
    //     sidePanelText.style.color = '#2A109E';
    // } else if (verticalScrollPx >= 325) {
    //     sidePanelDivider.style.backgroundColor = '#2A109E';
    // } else if (verticalScrollPx >= 425) {
    //     sidePanelLink.forEach(link => link.style.fill = '#2A109E');
    // }
});

const counters = document.querySelectorAll('.skills__percentage-counter'),
    lines = document.querySelectorAll('.skills__percentage-scale span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});


// // Плавное появление и исчезание элемента
// const linkShow = document.querySelector('.sidepanel')
// document.addEventListener('scroll', () => {
//     if (window.scrollY >= 3500) {
//         document.querySelector('.sidepanel').classList.add('hidden');
//     } else {
//         document.querySelector('.sidepanel').classList.remove('hidden');
//     }
// })