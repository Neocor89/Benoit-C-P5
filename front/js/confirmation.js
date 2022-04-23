
// let orderId = new URL(window.location.href).searchParams.get("id");

function getOrderId(){
    const displayId = document.getElementById("orderId");
    displayId.innerText = localStorage.getItem("article");
    localStorage.clear();

  }

getOrderId();
