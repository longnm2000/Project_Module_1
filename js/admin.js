let admin = JSON.parse(localStorage.getItem("admin"));
let users = JSON.parse(localStorage.getItem("users"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let homestays = JSON.parse(localStorage.getItem("homestays"));

const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");
const userInfo = document.getElementById("user-info");
const homestayInfo = document.getElementById("homestay-info");

if (admin.isLogin == true) {
  let firstword = admin.name.split(" ")[0];
  titleDropdown.innerHTML = `<i class="fa-solid fa-bars me-3"></i> Hi ${firstword}`;
  menuContent.innerHTML = `
    <li id="log-out"><a class="dropdown-item" href="/loginAdmin.html">Đăng xuất</a></li>
    <li ><div id="show-user-info" class="dropdown-item">Thông tin người dùng</div></li>
    <li id="show-homestay-info"><a class="dropdown-item" href="">Homestay</a></li>
    `;

  const logout = document.getElementById("log-out");

  logout.addEventListener("click", () => {
    admin.isLogin = false;
    localStorage.setItem("admin", JSON.stringify(admin));
  });
  const showUserInfo = document.getElementById("show-user-info");

  users.forEach((user) => {
    let result1 = "";
    let result2 = "";
    if (user.isLogin == true) {
      result1 = "selected";
      result2 = "";
    } else {
      result1 = "";
      result2 = "selected";
    }
    userInfo.innerHTML += `
    <tr>
      <td scope="row" class="user-id-info">${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>
        <select style="width:250px" class=" form-select form-select-lg mb-3 state-login" aria-label=".form-select-lg example">
        <option class="option-select" ${result1} value="true">Cho Phép</option>
        <option class="option-select" ${result2} value="false">Khóa</option>
    </select>
      </td>
    </tr>
    `;
  });

  userInfo.addEventListener("click", (e) => {
    let userId =
      e.target.parentElement.parentElement.querySelector(
        ".user-id-info"
      ).textContent;
    let selectedUser = users.find((e) => e.id == userId);
    console.log(selectedUser);
    const selectState = document.querySelector(".state-login");

    if (!!selectedUser && selectState.classList.contains("state-login")) {
      console.log(
        selectedUser,
        selectedUser.id,
        selectState.classList.contains("state-login"),
        e.target.value
      );
      users.forEach((user) => {
        if (user.id == selectedUser.id) {
          if (e.target.value == "true") {
            user.isLogin = true;
          } else {
            user.isLogin = false;
            if (user.id == currentUser.id) {
              currentUser.isLogin = false;
            }
          }
          console.log(currentUser);
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  });

  showUserInfo.addEventListener("click", (e) => {
    userInfo.style.display = "block";
  });

  homestays.forEach((homestay) => {
    let result1 = "";
    let result2 = "";
    if (homestay.isLogin == true) {
      result1 = "selected";
      result2 = "";
    } else {
      result1 = "";
      result2 = "selected";
    }
    homestayInfo.innerHTML += `
    <tr>
      <td scope="row" class="user-id-info">${homestay.id}</td>
      <td>${homestay.name}</td>
      <td>${homestay.owner}</td>
      <td>${homestay.address}</td>
      <td>${homestay.pricePerDay}</td>
      <td scope="col">Xem chi tiết</td>
      <td>
        <select style="width:250px" class=" form-select form-select-lg mb-3 state-login" aria-label=".form-select-lg example">
        <option class="option-select" ${result1} value="true">Cho Phép</option>
        <option class="option-select" ${result2} value="false">Khóa</option>
    </select>
      </td>
    </tr>
    `;
  });
}
