function toggleCartStatus(){
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('#order-form');
    if(cartWrapper.children.length > 0){
        console.log('full');
        cartEmpty.classList.add('none');
        orderForm.classList.remove('none');
    } else{
        console.log('empty');
        cartEmpty.classList.remove('none');
        orderForm.classList.add('none');
    }
}