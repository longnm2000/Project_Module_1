const admin = JSON.parse(localStorage.getItem("admin"));
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const orderInfo = document.getElementById("order-info");
const titleDropdown = document.getElementById("title-drop-down");
const datatablesSimple = document.getElementById("datatablesSimple");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const modalBodyBox = document.getElementById("modal-body-box");

if (admin.isLogin == true) {
  //Hiển thị tên  admin
  let firstword = admin.name.split(" ")[0];
  titleDropdown.innerHTML = `<i class="fa-solid fa-user me-2" style="color: #ffffff;"></i> ${firstword}`;

  //Chức năng đăng xuất admin
  const logout = document.getElementById("log-out");
  logout.addEventListener("click", () => {
    admin.isLogin = false;
    localStorage.setItem("admin", JSON.stringify(admin));
    logout.textContent = "Login";
  });

  //Render ra thông tin các user
  orders.forEach((order) => {
    let result1 = "";
    let result2 = "";
    let isDisabled = "";
    if (order.isComplete == true) {
      result1 = "selected";
      result2 = "";
    } else {
      result1 = "";
      result2 = "selected";
      isDisabled = "disabled";
    }

    orderInfo.innerHTML += `
    <tr>
      <td>${order.orderId}</td>                      
      <td>${order.userId}</td>
      <td class="homestay-id">${order.homestayId}</td>
      <td>${order.checkIn}</td>
      <td>${order.checkOut}</td>                                       
      <td>${order.cardNumber}</td>
      <td>${order.country}</td>
      <td>${order.price}</td>
      <td>
          <select ${isDisabled} id="option-false" style="width:120px" class=" form-select form-select-sm state-login" aria-label=".form-select-lg example">
              <option class="option-select" ${result1} value="true">Ordered</option>
              <option  class="option-select" ${result2} value="false">Cancel</option>
          </select>
      </td>
      <td>
        <button title="View" type="button" class="mb-2 show-modal-box-btn btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
          View
        </button>
      </td>
    </tr>
    `;
  });

  datatablesSimple.addEventListener("click", (e) => {
    let orderId =
      e.target.parentElement.parentElement.querySelector("td").textContent;

    let userId =
      e.target.parentElement.parentElement.querySelectorAll("td")[1]
        .textContent;
    let homestayId =
      e.target.parentElement.parentElement.querySelectorAll("td")[2]
        .textContent;
    let selectedOrder = orders.find((e) => e.orderId == orderId);
    if (!!selectedOrder) {
      if (
        e.target.classList.contains("state-login") &&
        e.target.disabled == false
      ) {
        orders.forEach((order) => {
          if (
            order.userId == selectedOrder.userId &&
            order.homestayId == selectedOrder.homestayId &&
            order.orderId == orderId
          ) {
            console.log(e.target);
            if (e.target.value == "false") {
              if (confirm("Are you sure?")) {
                order.isComplete = false;
                e.target.disabled = true;
              }
            }
          }
        });
        localStorage.setItem("orders", JSON.stringify(orders));
      }
      if (e.target.classList.contains("show-modal-box-btn")) {
        const findOrder = orders.find(
          (e) =>
            e.userId == userId &&
            e.homestayId == homestayId &&
            e.orderId == orderId
        );
        if (!!findOrder) {
          exampleModalLabel.textContent = "Details";
          modalBodyBox.innerHTML = `
            <ul>
            <li><b>Order Id:</b> <br>${findOrder.orderId}</li>
            <li><b>User Id:</b> <br>${findOrder.userId}</li>
            <li><b>Homestay Id:</b> <br>${findOrder.homestayId}</li>
            <li><b>Check In:</b> <br>${findOrder.checkIn}</li>
            <li><b>Check Out:</b> <br>${findOrder.checkOut}</li>
            <li><b>Adults:</b> <br>${findOrder.adults}</li>
            <li><b>Childrens:</b> <br>${findOrder.childrens}</li>
            <li><b>Babys:</b> <br>${findOrder.babys}</li>
            <li><b>Pets:</b> <br>${findOrder.pets}</li>
            <li><b>Card Number:</b> <br>${findOrder.cardNumber}</li>
            <li><b>Expiration:</b> <br>${findOrder.expiration}</li>
            <li><b>CVV:</b> <br>${findOrder.cvv}</li>
            <li><b>Zip Code:</b> <br>${findOrder.zipCode}</li>
            <li><b>Country:</b> <br>${findOrder.country}</li>
            <li><b>Price ($):</b> <br>${findOrder.price}</li>
        </ul>
            `;
        }
      }
    }
  });
} else {
  location.href = "/admin/login.html";
}
