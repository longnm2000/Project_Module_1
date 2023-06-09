const users = JSON.parse(localStorage.getItem("users")) || [];

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginUser = users.find(
    (user) =>
      user.email === loginForm.email.value &&
      user.password === loginForm.password.value
  );
  if (loginUser) {
    if (loginUser.isLogin) {
      localStorage.setItem("currentUser", JSON.stringify(loginUser));
      swal({
        title: "Đăng nhập thành công!",
        icon: "success",
        timer: 2000,
      }).then(() => {
        location.href = "/index.html";
      });
    } else {
      swal({
        title: "Tài khoản đã bị khóa",
        icon: "warning",
        timer: 2000,
      });
    }
  } else {
    swal({
      title: "Tài khoản hoặc mật khẩu không đúng!",
      icon: "error",
      timer: 2000,
    });
  }
});
