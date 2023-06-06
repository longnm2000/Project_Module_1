let admin = JSON.parse(localStorage.getItem("admin"));
let homestays = JSON.parse(localStorage.getItem("homestays"));

const homestayInfo = document.getElementById("homestay-info");
const modalBodyBox = document.getElementById("modal-body-box");
const datatablesSimple = document.getElementById("datatablesSimple");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const addHomstayBtn = document.querySelector(".add-homstay-btn");

homestays.forEach((homestay) => {
  homestayInfo.innerHTML += `
    <tr>
        <td>${homestay.id}</td>
        <td>${homestay.name}</td>
        <td>${homestay.owner}</td>
        <td>${homestay.address}</td>
        <td><img style="width:100px" src="${homestay.images[0]}"></td>
        <td>${homestay.minday}</td>
        <td>${homestay.pricePerDay}</td>
        <td>
        <button type="button" class="show-modal-box-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        View
        </button>

        </td>
    </tr>
    `;
});

datatablesSimple.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-modal-box-btn")) {
    let selectId =
      e.target.parentElement.parentElement.querySelector("td").textContent;
    let foundHomestay = homestays.find((e) => e.id == selectId);
    if (!!foundHomestay) {
      let images = "";
      foundHomestay.images.forEach((img) => {
        images += `<div class="my-3"><img style="width: 100%" src="${img}"></div>`;
      });
      exampleModalLabel.textContent = "Details";
      modalBodyBox.innerHTML = `
      <ul>
      <li><b>Id:</b> <br>${foundHomestay.id}</li>
      <li><b>Name:</b> <br>${foundHomestay.name}</li>
      <li><b>Owner:</b> <br>${foundHomestay.owner}</li>
      <li><b>Address:</b> <br>${foundHomestay.address}</li>
      <li><b>Minimum number of nights booked:</b> <br>${foundHomestay.minday}</li>
      <li><b>Price Per Day:</b> <br>${foundHomestay.pricePerDay}</li>
      <li><b>Tourists:</b> <br>${foundHomestay.tourists}</li>
      <li><b>Babys:</b> <br>${foundHomestay.babys}</li>
      <li><b>Pets:</b> <br>${foundHomestay.pets}</li>
      <li><b>Bathrooms:</b> <br>${foundHomestay.bathrooms}</li>
      <li><b>Bedrooms:</b> <br>${foundHomestay.bedrooms}</li>
      <li><b>Description:</b> <br>${foundHomestay.content}</li>
      <li><b>Image:</b>
        ${images}
      </li>
  </ul>
      `;
    }
  }
});

// Kiểm tra xem phần tử định thêm vào có key bằng với 1 phần tử nào đó trong mảng hay không
function checkDuplicate(key, value, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i][key]) {
      return true;
    }
  }
  return false;
}

addHomstayBtn.addEventListener("click", () => {
  modalBodyBox.innerHTML = `
  <form id="register-form" class="d-flex flex-column g-3">
      <div class="input-box d-flex flex-column mb-3">
          <label class="form-label" for="name-user">Họ tên:</label>
          <input type="text" name="name" id="name-user" class="form-control mb-2" />
          <p role="alert" class=" alert alert-danger name-error"></p>
      </div>
      <div class="input-box d-flex flex-column mb-3">
          <label class="form-label" for="email-user">Email:</label>
          <input type="text" name="email" id="email-user" class="form-control mb-2" />
          <p role="alert" class="alert alert-danger email-error"></p>
      </div>
      <div class="input-box d-flex flex-column mb-3">
          <label class="form-label" for="phone-user">Phone:</label>
          <input type="text" name="phone" id="phone-user" class="form-control mb-2" />
          <p role="alert" class="alert alert-danger phone-error"></p>
      </div>
      <div class="input-box d-flex flex-column mb-3">
          <label class="form-label" for="email-password">Password:</label>
          <input type="password" name="password" id="email-password" class="form-control mb-2" />
          <p role="alert" class="alert alert-danger password-error"></p>
      </div>
      <div class="input-box d-flex flex-column mb-3">
          <label class="form-label" for="email-repassword">Xác nhận Password:</label>
          <input type="password" name="repassword" id="email-repassword" class="form-control mb-2" />
          <p role="alert" class="alert alert-danger repassword-error"></p>
      </div>
      <button class="btn btn-primary">Đăng Ký</button>
  </form>
  `;
  exampleModalLabel.textContent = "Add A New Homestay";
  idNewHomestay = Math.floor(Math.random() * 1000000000);
  while (checkDuplicate("id", idNewHomestay, homestays)) {
    randomId = Math.floor(Math.random() * 1000000000);
  }
});
