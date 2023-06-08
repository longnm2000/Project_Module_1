let admin = JSON.parse(localStorage.getItem("admin"));
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const orderInfo = document.getElementById("order-info");
const titleDropdown = document.getElementById("title-drop-down");
const datatablesSimple = document.getElementById("datatablesSimple");

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
                                        <td>${order.userId}</td>
                                        <td class="homestay-id">${order.homestayId}</td>
                                        <td>${order.checkIn}</td>
                                        <td>${order.checkOut}</td>
                                        <td>${order.adults}</td>
                                        <td>${order.childrens}</td>
                                        <td>${order.babys}</td>
                                        <td>${order.pets}</td>
                                        <td>${order.cardNumber}</td>
                                        <td>${order.expiration}</td>
                                        <td>${order.cvv}</td>
                                        <td>${order.zipCode}</td>
                                        <td>${order.country}</td>
                                        <td>${order.price}</td>
                                        <td>
                                            <select ${isDisabled} id="option-false" style="width:250px" class=" form-select form-select-sm state-login" aria-label=".form-select-lg example">
                                                <option class="option-select" ${result1} value="true">Ordered</option>
                                                <option  class="option-select" ${result2} value="false">Cancel</option>
                                            </select>
                                        </td>
                                    </tr>
    `;
    // const optionFalse = document.getElementById("option-false");
    // if (result2 != "") {
    //   optionFalse.disabled = true;
    // }
  });

  datatablesSimple.addEventListener("click", (e) => {
    let userId =
      e.target.parentElement.parentElement.querySelector("td").textContent;

    let homestayId =
      e.target.parentElement.parentElement.querySelectorAll("td")[1]
        .textContent;
    console.log(userId, homestayId);
    let selectedOrder = orders.find(
      (e) => e.userId == userId && e.homestayId == homestayId
    );
    if (!!selectedOrder) {
      orders.forEach((order) => {
        if (
          order.userId == selectedOrder.userId &&
          order.homestayId == selectedOrder.homestayId
        ) {
          if (e.target.value == "false") {
            order.isComplete = false;
            e.target.disabled = true;
          }
        }
      });
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  });
} else {
  location.href = "/admin/login.html";
}
