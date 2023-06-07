let homestays = JSON.parse(localStorage.getItem("homestays"));
const categories = JSON.parse(localStorage.getItem("categories"));

const homestayBox = document.querySelector(".all-homestays");
// const categoryItem = document.querySelectorAll(".category-item");
const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");
const categoryBox = document.getElementById("category-box");

categories.forEach((category) => {
  categoryBox.innerHTML += `
    <div type-category="${category.typeCategory}" class="category-item mx-2">
      <img src="${category.image}" alt="${category.title}" title="${category.title}"/>
      <p>${category.title}</p>
    </div>
  `;
});

const categoryItem = document.querySelectorAll(".category-item");

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    navigation: true,
    nav: false,
    items: 12,
    magin: 10,
    dots: true,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 2,
        dots: false,
      },
      // breakpoint from 480 up
      480: {
        items: 5,
        dots: false,
      },
      // breakpoint from 768 up
      768: {
        items: 8,
      },
      1000: {
        items: 12,
      },
    },
  });
});

function renderHomestay(element) {
  homestayBox.innerHTML += `
    <div class="col">
        <div class="card h-100 border border-0">
            <a href="/details.html?id=${
              element.id
            }" class="text-decoration-none text-dark">
            <img height="250px" src="${
              element.images[0]
            }" class="card-img-top rounded" alt="...">
              <div class="card-body p-0 py-3">
                  <h5 class="card-title single-line" title="${
                    element.address
                  }">${element.address}</h5>
                  <p class="card-text">${element.minday} đêm</p>
                  <p class="card-text">$ ${
                    element.pricePerDay * element.minday
                  } tổng trước thuế</p>
              </div>
            </a>
        </div>
    </div>
    `;
}

homestays.forEach((element) => {
  renderHomestay(element);
});

categoryItem.forEach((element) => {
  //Tạo border khi active element
  element.classList.remove("active-item");
  element.style.cursor = "pointer";
  element.addEventListener("click", () => {
    // Loại bỏ lớp 'active' từ tất cả các phần tử
    categoryItem.forEach((item) => {
      item.classList.remove("active-item");
    });

    // Thêm lớp 'active' cho phần tử được click
    element.classList.add("active-item");

    //Lọc homestay dựa theo attribute type-category của element và hiện ra kết quả
    homestayBox.innerHTML = "";
    homestays.forEach((homestay) => {
      if (
        homestay.typeHomestay.includes(element.getAttribute("type-category"))
      ) {
        renderHomestay(homestay);
      }
    });
    if (homestayBox.innerHTML == "") {
      homestayBox.innerHTML = `<h2 style="text-align: center">Hiện tại không có homestay loại này</h2>`;
    }
  });
});

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
