const cartWrapper = document.querySelector('.cart-wrapper');

window.addEventListener('click', function(event){
    if(event.target.hasAttribute('data-cart')){
        const card = event.target.closest('.box');
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            price: card.querySelector('.price').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        if(itemInCart){
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
            <div class="cart-item_top">
                <div class="cart-item_img">
                    <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                </div>
                <div class="cart-item_desc">
                    <div class="cart-item_title">${productInfo.title}</div>
                    <div class="cart-item_details">
                        <div class="items-small counter-wrapper">
                            <div class="items_control" data-action="minus">-</div>
                            <div class="items_current" data-counter="">${productInfo.counter}</div>
                            <div class="items_control" data-action="plus">+</div>
                        </div>
                        <div class="price">${productInfo.price}</div>
                    </div>
                </div>
            </div>
            </div>`;
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
            
        }
        
        card.querySelector('[data-counter]').innerText = '1';
        
        toggleCartStatus();
        calcCartPriceAndDelivery();
    }
});