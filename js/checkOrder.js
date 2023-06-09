const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");

const homestayName = document.getElementById("homestay-name");
const homestayImage = document.getElementById("homestay-image");
const dateDistance = document.getElementById("date");
const paymentCost = document.getElementById("payment-cost");
const timeHomestay = document.getElementById("time-homestay");
const tourists = document.getElementById("tourists");
const expiration = document.getElementById("expiration");
const numberCard = document.getElementById("number-card");
const cvv = document.getElementById("cvv");
const zipCode = document.getElementById("zip-code");
const country = document.getElementById("country");
const submitBtn = document.getElementById("submit-btn");
const numberCardError = document.getElementById("number-card-error");
const expirationError = document.getElementById("expiration-error");
const cvvError = document.getElementById("cvv-error");
const zipCodeError = document.getElementById("zip-code-error");
const countryError = document.getElementById("country-error");

const homestays = JSON.parse(localStorage.getItem("homestays")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Lấy URL từ địa chỉ hiện tại
var url = window.location.href;

// Lấy phần query string từ URL
var queryString = url.substring(url.indexOf("?") + 1);

// Tách query string thành mảng các cặp key-value
var params = queryString.split("&");

// Tạo một đối tượng để lưu trữ key-value
var keyValuePairs = {};

// Lặp qua các cặp key-value và lưu trữ vào đối tượng
params.forEach(function (param) {
  var pair = param.split("=");
  var key = decodeURIComponent(pair[0]);
  var value = decodeURIComponent(pair[1]);
  keyValuePairs[key] = value;
});

let startDate = new Date(keyValuePairs["check_in"]);
let endDate = new Date(keyValuePairs["check_out"]);
let startTimestamp = startDate.getTime();
let endTimestamp = endDate.getTime();

let checkInDay = keyValuePairs["check_in"].split("-")[2];
let checkInMonth = keyValuePairs["check_in"].split("-")[1];
let checkInYear = keyValuePairs["check_in"].split("-")[0];

let checkOutDay = keyValuePairs["check_out"].split("-")[2];
let checkOutMonth = keyValuePairs["check_out"].split("-")[1];
let checkOutYear = keyValuePairs["check_out"].split("-")[0];

// Tính số milliseconds chênh lệch giữa hai ngày
let timeDiff = endTimestamp - startTimestamp;

// Chuyển đổi milliseconds thành số ngày
let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

let post = homestays.find((e) => {
  return e.id == keyValuePairs["homestay_id"];
});
if (post) {
  homestayName.textContent = post.name;
  homestayImage.src = post.images[0];
  dateDistance.textContent = `${daysDiff} đêm`;
  paymentCost.textContent = `$ ${daysDiff * post.pricePerDay}`;
  timeHomestay.textContent = `Ngày ${checkInDay} Tháng ${checkInMonth} Năm ${checkInYear} - Ngày ${checkOutDay} Tháng ${checkOutMonth} Năm ${checkOutYear}`;

  tourists.textContent = `${keyValuePairs["adults"]} người lớn `;
  if (keyValuePairs["childrens"] != 0) {
    tourists.textContent += `- ${keyValuePairs["childrens"]} trẻ em `;
  }
  if (keyValuePairs["babys"] != 0) {
    tourists.textContent += `- ${keyValuePairs["babys"]} em bé `;
  }
  if (keyValuePairs["pets"] != 0) {
    tourists.textContent += `- ${keyValuePairs["pets"]} thú cưng`;
  }
}

function isValidVisa(cardNumber) {
  // Bắt đầu bằng số 4 và có đúng 12 chữ số
  let visaRegex = /^4[0-9]{11}$/;

  // Kiểm tra xem chuỗi nhập vào khớp với quy tắc mã số thẻ Visa
  if (visaRegex.test(cardNumber)) {
    return true;
  } else {
    return false;
  }
}

function checkDuplicate(key, value, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i][key]) {
      return true;
    }
  }
  return false;
}

function validateVisaExpiration(expiration) {
  let regex = /^(0[1-9]|1[0-2])\/([2-9][0-9])$/;
  let isValidFormat = regex.test(expiration);

  if (isValidFormat) {
    let parts = expiration.split("/");
    let month = parseInt(parts[0]);
    let year = parseInt(parts[1]);

    let currentYear = new Date().getFullYear() % 100; // Lấy 2 số cuối của năm hiện tại
    let currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại

    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validateVisaCVV(cvv) {
  let regex = /^[0-9]{3}$/;
  return regex.test(cvv);
}

function validateVisaZipCode(zipCode) {
  var regex = /^\d{6}$/;
  return regex.test(zipCode);
}

numberCard.addEventListener("keydown", (event) => {
  // Lấy mã phím được nhấn
  var key = event.key;

  // Kiểm tra xem phím có phải là số từ 0 đến 9, hoặc là phím "Backspace" hoặc "Delete" hay không
  if (!/^\d$|^Backspace$|^Delete$/i.test(key)) {
    // Ngăn chặn sự kiện mặc định của phím
    event.preventDefault();
  }
});

submitBtn.addEventListener("click", () => {
  let errors = 0;
  if (!isValidVisa(numberCard.value)) {
    numberCardError.style.display = "block";
    numberCardError.textContent = "Mã số thẻ gồm 12 chữ số bắt đầu bằng 4";
    errors++;
  } else {
    numberCardError.style.display = "none";
  }
  console.log(errors);
  if (!validateVisaExpiration(expiration.value)) {
    expirationError.style.display = "block";
    expirationError.textContent = "Ngày hết hạn không hợp lệ";
    errors++;
  } else {
    expirationError.style.display = "none";
  }
  console.log(errors);

  if (!validateVisaCVV(cvv.value)) {
    cvvError.style.display = "block";
    cvvError.textContent = "CVV phải gồm 3 chữ số";
    errors++;
  } else {
    cvvError.style.display = "none";
  }
  console.log(errors);
  if (!validateVisaZipCode(zipCode.value)) {
    zipCodeError.style.display = "block";
    zipCodeError.textContent = "Mã bưu chính phải gồm 6 chữ số";
    errors++;
  } else {
    zipCodeError.style.display = "none";
  }
  console.log(errors);
  if (country.value.trim() == "") {
    console.log("Dwadw", country.value.trim(), "Dwadwa");
    countryError.textContent = "Không được để trống";
    countryError.style.display = "block";
    errors++;
  } else {
    countryError.style.display = "none";
  }
  console.log(errors);
  const currentUser2 = JSON.parse(localStorage.getItem("currentUser"));

  if (errors == 0) {
    if (!!currentUser2) {
      if (currentUser2.isLogin == true) {
        let orders1 = JSON.parse(localStorage.getItem("orders"));
        let foundCurentUserOrder = orders1.find(
          (e) =>
            e.userId == currentUser.id &&
            e.homestayId == keyValuePairs["homestay_id"] &&
            e.isComplete == true
        );
        if (!!foundCurentUserOrder) {
          swal({
            title: "Bạn đã đặt homestay này rồi",
            icon: "error",
            timer: 2000,
          });
        } else {
          let randomId = Math.floor(Math.random() * 1000000000);
          while (checkDuplicate("orderId", randomId, orders1)) {
            randomId = Math.floor(Math.random() * 1000000000);
          }
          let orderedHomestay = {
            orderId: randomId,
            userId: currentUser2.id,
            homestayId: post.id,
            checkIn: keyValuePairs["check_in"],
            checkOut: keyValuePairs["check_out"],
            adults: keyValuePairs["adults"],
            childrens: keyValuePairs["childrens"],
            babys: keyValuePairs["babys"],
            pets: keyValuePairs["pets"],
            cardNumber: numberCard.value,
            expiration: expiration.value,
            cvv: cvv.value,
            zipCode: zipCode.value,
            country: country.value,
            price: daysDiff * post.pricePerDay,
            isComplete: true,
          };
          console.log(orderedHomestay);
          orders1.unshift(orderedHomestay);
          localStorage.setItem("orders", JSON.stringify(orders1));
          swal({
            title: "Bạn đã đặt phòng thành công! Tự động chuyển về trang chủ",
            icon: "success",
            timer: 2000,
          }).then(() => {
            location.href = "/index.html";
          });
        }
      } else {
        swal({
          title: "Tài khoản của bạn đã bị khóa",
          icon: "error",
          timer: 2000,
        });
      }
    } else {
      console.log("dwadwadawd");
      swal({
        title: "Bạn cần đăng nhập để có thể đặt phòng",
        icon: "warning",
        timer: 2000,
      });
    }
  } else {
    swal({
      title: "Vẫn còn lỗi",
      icon: "warning",
      timer: 2000,
    });
  }
});

if (currentUser != null) {
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
}
