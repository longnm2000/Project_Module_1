// let users = [
//   {
//     id: 1,
//     name: "Nguyen Manh Long",
//     email: "longnguyenmanh20052000@gmail.com",
//     phone: "0398926955",
//     password: "0123456789Long!",
//     isLogin: true,
//   },
//   {
//     id: 2,
//     name: "example",
//     email: "example@example.com",
//     phone: "0123456789",
//     password: "examplePassword123!",
//     isLogin: true,
//   },
//   {
//     id: 3,
//     name: "John",
//     email: "john@example.com",
//     phone: "9876543210",
//     password: "john1234!",
//     isLogin: true,
//   },
//   {
//     id: 4,
//     name: "Emma",
//     email: "emma@example.com",
//     phone: "1234567890",
//     password: "emma5678!",
//     isLogin: true,
//   },
//   {
//     id: 5,
//     name: "David",
//     email: "david@example.com",
//     phone: "4567890123",
//     password: "david9012!",
//     isLogin: true,
//   },
//   {
//     id: 6,
//     name: "Sarah",
//     email: "sarah@example.com",
//     phone: "0123456789",
//     password: "sarah6789!",
//     isLogin: true,
//   },
//   {
//     id: 7,
//     name: "Michael",
//     email: "michael@example.com",
//     phone: "9876543210",
//     password: "michael1234!",
//     isLogin: true,
//   },
//   {
//     id: 8,
//     name: "Olivia",
//     email: "olivia@example.com",
//     phone: "1234567890",
//     password: "olivia5678!",
//     isLogin: true,
//   },
//   {
//     id: 9,
//     name: "William",
//     email: "william@example.com",
//     phone: "4567890123",
//     password: "william9012!",
//     isLogin: true,
//   },
//   {
//     id: 10,
//     name: "Emily",
//     email: "emily@example.com",
//     phone: "0123456789",
//     password: "emily6789!",
//     isLogin: true,
//   },
//   {
//     id: 11,
//     name: "Jame",
//     email: "james@example.com",
//     phone: "9876543210",
//     password: "james1234!",
//     isLogin: true,
//   },
// ];

// localStorage.setItem("users", JSON.stringify(users));

let users = JSON.parse(localStorage.getItem("users"));

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
