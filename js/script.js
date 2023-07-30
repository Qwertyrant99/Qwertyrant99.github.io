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
const sidePanelLink = document.querySelectorAll('.sidepanel__img');
window.addEventListener('scroll', () => {
    const verticalScrollPx = window.scrollY;
    if (verticalScrollPx < 225) {
        sidePanelText.style.color = '#f5f5f5';
        sidePanelDivider.style.backgroundColor = '#f5f5f5';
        sidePanelLink.forEach(img => {
            img.style.filter = '#f5f5f5';
        });
    } else {
        sidePanelText.style.color = '#2A109E';
        sidePanelDivider.style.backgroundColor = '#2A109E';
        sidePanelLink.forEach(img => {
            img.style.filter = '#2A109E';
        });
    }
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