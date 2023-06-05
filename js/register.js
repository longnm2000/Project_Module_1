const registerForm = document.getElementById("register-form");
const nameErrorMsg = document.querySelector(".name-error");
const emailErrorMsg = document.querySelector(".email-error");
const phoneErrorMsg = document.querySelector(".phone-error");
const passwordErrorMsg = document.querySelector(".password-error");
const repasswordErrorMsg = document.querySelector(".repassword-error");

// let users = [
//   {
//     id: 1,
//     email: "longnguyenmanh20052000@gmail.com",
//     phone: "0398926955",
//     password: "0123456789Long!",
//   },
//   {
//     id: 2,
//     email: "example@example.com",
//     phone: "0123456789",
//     password: "examplePassword123!",
//   },
//   {
//     id: 3,
//     email: "john@example.com",
//     phone: "9876543210",
//     password: "john1234!",
//   },
//   {
//     id: 4,
//     email: "emma@example.com",
//     phone: "1234567890",
//     password: "emma5678!",
//   },
//   {
//     id: 5,
//     email: "david@example.com",
//     phone: "4567890123",
//     password: "david9012!",
//   },
//   {
//     id: 6,
//     email: "sarah@example.com",
//     phone: "0123456789",
//     password: "sarah6789!",
//   },
//   {
//     id: 7,
//     email: "michael@example.com",
//     phone: "9876543210",
//     password: "michael1234!",
//   },
//   {
//     id: 8,
//     email: "olivia@example.com",
//     phone: "1234567890",
//     password: "olivia5678!",
//   },
//   {
//     id: 9,
//     email: "william@example.com",
//     phone: "4567890123",
//     password: "william9012!",
//   },
//   {
//     id: 10,
//     email: "emily@example.com",
//     phone: "0123456789",
//     password: "emily6789!",
//   },
//   {
//     id: 11,
//     email: "james@example.com",
//     phone: "9876543210",
//     password: "james1234!",
//   },
// ];

let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

let nameError = "Họ tên chỉ chứa chữ cái và dấu cách";
let emailError = "Email không hợp lệ";
let phoneError = "Số điện thoại không hợp lệ";
let passwordError = "Mật khẩu không hợp lệ";
let repasswordError = "Mật khẩu không trùng khớp";

// Kiểm tra xem phần tử định thêm vào có key bằng với 1 phần tử nào đó trong mảng hay không
function checkDuplicate(key, value, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i][key]) {
      return true;
    }
  }
  return false;
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = 0;
  console.log(registerForm.password.value);
  if (!nameRegex.test(registerForm.name.value)) {
    nameErrorMsg.textContent = nameError;
    errors++;
  } else {
    nameErrorMsg.textContent = "";
  }
  if (!emailRegex.test(registerForm.email.value)) {
    emailErrorMsg.textContent = emailError;
    errors++;
  } else {
    emailErrorMsg.textContent = "";
  }
  if (!passwordRegex.test(registerForm.password.value)) {
    passwordErrorMsg.textContent = passwordError;
    errors++;
  } else {
    passwordErrorMsg.textContent = "";
  }
  if (!phoneRegex.test(registerForm.phone.value)) {
    phoneErrorMsg.textContent = phoneError;
    errors++;
  } else {
    phoneErrorMsg.textContent = "";
  }
  if (registerForm.password.value !== registerForm.repassword.value) {
    repasswordErrorMsg.textContent = repasswordError;
    errors++;
  } else {
    repasswordErrorMsg.textContent = "";
  }
  // let registerUser = users.find((user) => user.email === loginForm.email.value);
  // if (registerUser) {
  //   emailError.textContent = "Email đã được đăng ký rồi";
  //   errors++;
  // }
  if (!errors && !checkDuplicate("email", registerForm.email.value, users)) {
    let randomId = Math.floor(Math.random() * 1000000000);
    while (checkDuplicate("id", randomId, users)) {
      randomId = Math.floor(Math.random() * 1000000000);
    }
    let newUser = {
      id: randomId,
      name: registerForm.name.value,
      email: registerForm.email.value,
      phone: registerForm.phone.value,
      password: registerForm.password.value,
      isLogin: true,
    };
    users.push(newUser);
    localStorage.setItem("currentUser", newUser);
    console.log(localStorage.getItem("currentUser"));
    swal({
      title: "Đăng ký thành công!",
      icon: "success",
      timer: 2000,
    }).then(() => {
      location.href = "/index.html";
    });
  }
});
