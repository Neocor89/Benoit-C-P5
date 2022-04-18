
let str = window.location.href;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

function getOrderId(){
    const orderId = document.getElementById("orderId");
    orderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

getOrderId();
