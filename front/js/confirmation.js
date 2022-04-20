

let orderId = new URL(window.location.href).searchParams.get("id");


function getOrderId(){
    const displayId = document.getElementById("orderId");
    displayId.innerText = orderId;
    // localStorage.clear();

  }

getOrderId();
