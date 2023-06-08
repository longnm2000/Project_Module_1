const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");
const profileForm = document.getElementById("profile-form");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

profileForm.name.value = currentUser.name;
profileForm.email.value = currentUser.email;
profileForm.number.value = currentUser.phone;

if (!!currentUser) {
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
