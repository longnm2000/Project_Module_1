let admin = JSON.parse(localStorage.getItem("admin"));
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userInfo = document.getElementById("user-info");
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
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>
        <select class=" form-select form-select-sm state-login" aria-label=".form-select-lg example">
        <option class="option-select" ${result1} value="true">&#x2714;</option>
        <option class="option-select" ${result2} value="false">&#x2716;</option>
    </select>
      </td>
    </tr>
    `;
  });

  datatablesSimple.addEventListener("click", (e) => {
    let userId =
      e.target.parentElement.parentElement.querySelector("td").textContent;
    let selectedUser = users.find((e) => e.id == userId);
    if (!!selectedUser) {
      users.forEach((user) => {
        if (user.id == selectedUser.id) {
          if (e.target.value == "true") {
            user.isLogin = true;
            if (!!currentUser) {
              currentUser.isLogin = true;
            }
          } else {
            user.isLogin = false;
            if (!!currentUser) {
              if (user.id == currentUser.id) {
                currentUser.isLogin = false;
              }
            }
          }
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
      console.log(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  });
} else {
  location.href = "/admin/login.html";
}
