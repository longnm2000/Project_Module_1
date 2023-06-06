const admin = JSON.parse(localStorage.getItem("admin"));

const loginForm = document.getElementById("login-form");
console.log(loginForm.name);
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    admin.email === loginForm.email.value &&
    admin.password === loginForm.password.value
  ) {
    admin.isLogin = true;
    localStorage.setItem("admin", JSON.stringify(admin));
    swal({
      title: "Đăng nhập thành công!",
      icon: "success",
      timer: 2000,
    }).then(() => {
      location.href = "/admin/index.html";
    });
  } else {
    swal({
      title: "Tài khoản hoặc mật khẩu không đúng!",
      icon: "error",
      timer: 2000,
    });
  }
});
