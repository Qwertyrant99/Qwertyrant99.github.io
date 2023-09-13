function calcCartPriceAndDelivery(){
    const cartWrapper = document.querySelector('.cart-wrapper');
    const priceElements = cartWrapper.querySelectorAll('.price');
    const totalPriceEl = document.querySelector('.total-price');
    const deliveryCost = document.querySelector('.delivery-cost');
    const cartDelivery = document.querySelector('[data-cart-delivery]');

    let priceTotal = 0;

    priceElements.forEach(function(item){
        const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
        
        const currentPrice = parseInt(item.innerText)*parseInt(amountEl.innerText);
        priceTotal += currentPrice;
    });
    totalPriceEl.innerText = priceTotal;

    if(priceTotal>0){
        cartDelivery.classList.remove('none');
    } else {
        cartDelivery.classList.add('none');
    }

    if(priceTotal>=50){
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'za darmo';
    } else {
        deliveryCost.classList.remove('free');
        deliveryCost.innerText = '17 Zł';
    }
}

