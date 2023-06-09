const personalOrderBox = document.getElementById("personal-order");
const personalCompleteOrderBox = document.getElementById(
  "personal-complete-order"
);
const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");

const homestays = JSON.parse(localStorage.getItem("homestays")) || [];
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let personalOrders = orders.filter((e) => {
  return e.userId === currentUser.id && e.isComplete == true;
});
personalOrders.forEach((e) => {
  let foundHomestay = homestays.find((homestay) => {
    return homestay.id === e.homestayId;
  });
  let status = "";

  if (e.isComplete) {
    status = "Đã đặt phòng";
  } else {
    status = "Đã bị hủy";
  }

  personalOrderBox.innerHTML += `
            <tr>
                <td>${e.orderId}</td>
                <td>${foundHomestay.id}</td>
                <td>${foundHomestay.name}</td>
                <td>${foundHomestay.address}</td>
                <td>${e.checkIn}</td>
                <td>${e.checkOut}</td>
                <td>${e.adults}</td>
                <td>${e.childrens}</td>
                <td>${e.babys}</td>
                <td>${e.pets}</td>
                <td>${e.cardNumber}</td>
                <td>${e.country}</td>
                <td>${e.price}</td>
                <td class="status">${status}</td>
                <td><button class="btn btn-danger cancel-btn">Hủy đặt phòng</button>
            </tr>
            

        `;
});

let personalCompleteOrders = orders.filter((e) => {
  return e.userId === currentUser.id && e.isComplete === false;
});

personalCompleteOrders.forEach((e) => {
  let foundCompleteHomestay = homestays.find((homestay) => {
    return homestay.id === e.homestayId;
  });

  personalCompleteOrderBox.innerHTML += `
              <tr>
              <td>${e.orderId}</td>
              <td>${foundCompleteHomestay.id}</td>
              <td>${foundCompleteHomestay.name}</td>
              <td>${foundCompleteHomestay.address}</td>
              <td>${e.checkIn}</td>
              <td>${e.checkOut}</td>
              <td>${e.adults}</td>
              <td>${e.childrens}</td>
              <td>${e.babys}</td>
              <td>${e.pets}</td>
              <td>${e.cardNumber}</td>
              <td>${e.country}</td>
              <td>${e.price}</td>
              
              </tr>

          `;
});

if (currentUser != null) {
  let firstword = currentUser.name.split(" ")[0];
  titleDropdown.innerHTML = `<i class="fa-solid fa-bars me-3"></i> Hi ${firstword}`;
  menuContent.innerHTML = `
    <li id="remove-current-user"><a class="dropdown-item" href="/index.html">Đăng xuất</a></li>
    <li><a class="dropdown-item" href="/history.html">Lịch sử đặt phòng</a></li>
    <li><a class="dropdown-item" href="/profile.html">Thông tin cá nhân</a></li>
    <li>
        <a class="dropdown-item" href="">Cho thuê chỗ ở qua Airbnb</a>
    </li>
    <li><a class="dropdown-item" href="">Trợ giúp</a></li>
    
    `;
  const removeCurrent = document.getElementById("remove-current-user");

  removeCurrent.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
  });
}
personalOrderBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("cancel-btn")) {
    orders.forEach((element) => {
      if (
        element.orderId ==
          e.target.parentElement.parentElement.querySelector("td")
            .textContent &&
        element.isComplete == true
      ) {
        let isConfirm = confirm("Bạn có muốn hủy đặt phòng không?");
        if (isConfirm) {
          element.isComplete = false;
          e.target.parentElement.parentElement.querySelector(
            ".status"
          ).textContent = "Đã bị hủy";
          e.target.disabled = true;
          swal({
            title: "Đã hủy thành công!",
            icon: "success",
            timer: 2000,
          }).then(() => {
            location.href = "/history.html";
          });
        }
      }
    });
    localStorage.setItem("orders", JSON.stringify(orders));
  }
});
