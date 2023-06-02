let users = [
  {
    id: 1,
    email: "longnguyenmanh20052000@gmail.com",
    phone: "0398926955",
    password: "0123456789Long!",
  },
  {
    id: 2,
    email: "example@example.com",
    phone: "0123456789",
    password: "examplePassword123!",
  },
  {
    id: 3,
    email: "john@example.com",
    phone: "9876543210",
    password: "john1234!",
  },
  {
    id: 4,
    email: "emma@example.com",
    phone: "1234567890",
    password: "emma5678!",
  },
  {
    id: 5,
    email: "david@example.com",
    phone: "4567890123",
    password: "david9012!",
  },
  {
    id: 6,
    email: "sarah@example.com",
    phone: "0123456789",
    password: "sarah6789!",
  },
  {
    id: 7,
    email: "michael@example.com",
    phone: "9876543210",
    password: "michael1234!",
  },
  {
    id: 8,
    email: "olivia@example.com",
    phone: "1234567890",
    password: "olivia5678!",
  },
  {
    id: 9,
    email: "william@example.com",
    phone: "4567890123",
    password: "william9012!",
  },
  {
    id: 10,
    email: "emily@example.com",
    phone: "0123456789",
    password: "emily6789!",
  },
  {
    id: 11,
    email: "james@example.com",
    phone: "9876543210",
    password: "james1234!",
  },
];

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginUser = users.find(
    (user) =>
      user.email === loginForm.email.value &&
      user.password === loginForm.password.value
  );
  if (loginUser) {
    swal({
      title: "Đăng nhập thành công!",
      icon: "success",
      timer: 2000,
    }).then(() => {
      location.href = "/index.html";
    });
  } else {
    swal({
      title: "Tài khoản hoặc mật khẩu không đúng!",
      icon: "error",
      timer: 2000,
    });
  }
});
