const calculateProductTotalPrice = (cart) =>{
    let totalPrice = 0;
    for(let i= 0; i < cart.length; i++){
     totalPrice += cart[i].quantity * cart[i].price;   
    }
    return totalPrice;
}

export default calculateProductTotalPrice