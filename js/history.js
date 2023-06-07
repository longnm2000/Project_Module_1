const personalOrderBox = document.getElementById("personal-order");
const personalCompleteOrderBox = document.getElementById(
  "personal-complete-order"
);
const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");

const homestays = JSON.parse(localStorage.getItem("homestays"));
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let personalOrders = orders.filter((e) => {
  return e.userId === currentUser.id && e.isComplete == false;
});

personalOrders.forEach((e) => {
  let foundHomestay = homestays.find((homestay) => {
    return homestay.id === e.homestayId;
  });

  personalOrderBox.innerHTML += `
            <tr>
                <td>${foundHomestay.name}</td>
                <td>${e.checkIn}</td>
                <td>${e.checkOut}</td>
                <td>${e.adults}</td>
                <td>${e.childrens}</td>
                <td>${e.babys}</td>
                <td>${e.pets}</td>
                <td>${e.price}</td>
            </tr>
            

        `;
});

let personalCompleteOrders = orders.filter((e) => {
  return e.userId === currentUser.id && e.isComplete === true;
});

personalCompleteOrders.forEach((e) => {
  let foundCompleteHomestay = homestays.find((homestay) => {
    return homestay.id === e.homestayId;
  });

  personalCompleteOrderBox.innerHTML += `
              <tr>
                  <td>${foundCompleteHomestay.name}</td>
                  <td>${e.checkIn}</td>
                  <td>${e.checkOut}</td>
                  <td>${e.adults}</td>
                  <td>${e.childrens}</td>
                  <td>${e.babys}</td>
                  <td>${e.pets}</td>
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
