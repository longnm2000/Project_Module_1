let admin = JSON.parse(localStorage.getItem("admin"));
let homestays = JSON.parse(localStorage.getItem("homestays")) || [];

const homestayInfo = document.getElementById("homestay-info");
const modalBodyBox = document.getElementById("modal-body-box");
const datatablesSimple = document.getElementById("datatablesSimple");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const addHomstayBtn = document.querySelector(".add-homstay-btn");
const titleDropdown = document.getElementById("title-drop-down");

if (admin.isLogin == true) {
  //Hiển thị tên  admin
  let firstword = admin.name.split(" ")[0];
  titleDropdown.innerHTML = `<i class="fa-solid fa-user me-2" style="color: #ffffff;"></i> ${firstword}`;

  //Chức năng đăng xuất admin
  const logout = document.getElementById("log-out");
  logout.addEventListener("click", () => {
    admin.isLogin = false;
    localStorage.setItem("admin", JSON.stringify(admin));
    logOut.textContent = "Login";
  });
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

              <button title="View" type="button" class="mb-2 show-modal-box-btn btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                View
              </button>
              <button class="btn btn-primary update-btn"  >
              Update
              </button>

  
          </td>
      </tr>
      `;
  });

  datatablesSimple.addEventListener("click", (e) => {
    console.log(e.target);
    let selectId =
      e.target.parentElement.parentElement.querySelector("td").textContent;
    let foundHomestay = homestays.find((e) => e.id == selectId);
    if (e.target.classList.contains("show-modal-box-btn")) {
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
    if (e.target.classList.contains("update-btn")) {
      location.href = `/admin/updateHomestay.html?homestayId=${foundHomestay.id}`;
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
    location.href = "/admin/addHomestay.html";
  });
} else {
  location.href = "/admin/login.html";
}
