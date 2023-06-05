let admin = JSON.parse(localStorage.getItem("admin"));
const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");
if (admin.isLogin == true) {
  let firstword = admin.name.split(" ")[0];
  titleDropdown.innerHTML = `<i class="fa-solid fa-bars me-3"></i> Hi ${firstword}`;
  menuContent.innerHTML = `
    <li id="log-out"><a class="dropdown-item" href="/loginAdmin.html">Đăng xuất</a></li>`;
  const logout = document.getElementById("log-out");

  logout.addEventListener("click", () => {
    admin.isLogin = false;
    localStorage.setItem("admin", JSON.stringify(admin));
  });
}
