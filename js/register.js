const registerForm = document.getElementById("register-form");
const nameErrorMsg = document.querySelector(".name-error");
const emailErrorMsg = document.querySelector(".email-error");
const phoneErrorMsg = document.querySelector(".phone-error");
const passwordErrorMsg = document.querySelector(".password-error");
const repasswordErrorMsg = document.querySelector(".repassword-error");

let users = JSON.parse(localStorage.getItem("users"));

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

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
  if (!nameRegex.test(registerForm.name.value)) {
    nameErrorMsg.textContent = `Họ tên chỉ chứa chữ cái và dấu cách`;
    nameErrorMsg.style.display = "block";
    errors++;
  } else {
    nameErrorMsg.style.display = "none";
  }
  if (!emailRegex.test(registerForm.email.value)) {
    emailErrorMsg.textContent = `Email không hợp lệ`;
    emailErrorMsg.style.display = "block";
    errors++;
  } else {
    emailErrorMsg.style.display = "none";
  }
  if (!phoneRegex.test(registerForm.phone.value)) {
    phoneErrorMsg.textContent = `Số điện thoại gồm 10 chữ số`;
    phoneErrorMsg.style.display = "block";
    errors++;
  } else {
    phoneErrorMsg.style.display = "none";
  }
  if (!passwordRegex.test(registerForm.password.value)) {
    passwordErrorMsg.textContent = `Mật khẩu có ít nhất 8 ký tự chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt`;
    passwordErrorMsg.style.display = "block";
    errors++;
  } else {
    passwordErrorMsg.style.display = "none";
  }
  if (
    registerForm.password.value !== registerForm.repassword.value ||
    registerForm.repassword.value == ""
  ) {
    repasswordErrorMsg.textContent = `Mật khẩu không trùng khớp`;
    repasswordErrorMsg.style.display = "block";
    errors++;
  } else {
    repasswordErrorMsg.style.display = "none";
  }

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
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("users", JSON.stringify(users));
    swal({
      title: "Đăng ký thành công!",
      icon: "success",
      timer: 2000,
    }).then(() => {
      location.href = "/index.html";
    });
  }
});
