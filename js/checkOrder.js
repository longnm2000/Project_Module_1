const homestayName = document.getElementById("homestay-name");
const homestayImage = document.getElementById("homestay-image");
const dateDistance = document.getElementById("date");
const paymentCost = document.getElementById("payment-cost");
let homestays = JSON.parse(localStorage.getItem("homestays"));

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

// In key và giá trị ra console
for (var key in keyValuePairs) {
  console.log(key + ": " + keyValuePairs[key]);
}
console.log(keyValuePairs);

let startDate = new Date(keyValuePairs["check_in"]);
let endDate = new Date(keyValuePairs["check_out"]);
let startTimestamp = startDate.getTime();
let endTimestamp = endDate.getTime();

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
}

console.log(startDate, endDate);
