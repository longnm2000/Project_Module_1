const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");
const profileForm = document.getElementById("profile-form");
const updateForm = document.getElementById("update-form");
const updateBtn = document.getElementById("update-btn");
const closeBtn = document.getElementById("close-btn");
const nameErrorMsg = document.querySelector(".name-error");
const phoneErrorMsg = document.querySelector(".phone-error");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
const phoneRegex = /^\d{10}$/;

if (!!currentUser) {
  profileForm.name.value = currentUser.name;
  profileForm.email.value = currentUser.email;
  profileForm.number.value = currentUser.phone;
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

  updateForm.name.value = currentUser.name;
  updateForm.phone.value = currentUser.phone;

  updateBtn.addEventListener("click", () => {
    let errors = 0;
    if (!nameRegex.test(updateForm.name.value.trim())) {
      nameErrorMsg.textContent = `Họ tên không hợp lệ`;
      nameErrorMsg.style.display = "block";
      errors++;
    } else {
      nameErrorMsg.style.display = "none";
    }
    if (!phoneRegex.test(updateForm.phone.value)) {
      phoneErrorMsg.textContent = `Số điện thoại gồm 10 chữ số`;
      phoneErrorMsg.style.display = "block";
      errors++;
    } else {
      phoneErrorMsg.style.display = "none";
    }
    if (errors == 0) {
      let selectUser = users.find((e) => e.id == currentUser.id);
      if (!!selectUser) {
        users.forEach((user) => {
          if (user.id == selectUser.id) {
            user.name = updateForm.name.value.trim();
            user.phone = updateForm.phone.value;
          }
        });
        currentUser.name = updateForm.name.value.trim();
        currentUser.phone = updateForm.phone.value;
        console.log(currentUser, users);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("users", JSON.stringify(users));
        profileForm.name.value = currentUser.name;
        profileForm.number.value = currentUser.phone;
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
        swal({
          title: "Cập nhật thông tin thành công",
          icon: "success",
          timer: 2000,
        }).then(() => {
          closeBtn.click();
        });
      }
    }
  });
} else {
  location.href = "/login.html";
}
