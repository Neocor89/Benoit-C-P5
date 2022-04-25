

function getOrderId(){
    const displayId = document.getElementById("orderId");
    displayId.innerText = localStorage.getItem("orderId");
    localStorage.clear();

  }

getOrderId();
