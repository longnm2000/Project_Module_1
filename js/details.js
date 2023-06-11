const numberBtns = document.querySelector(".number-buttons");
const person = document.getElementById("adult-input");
const baby = document.getElementById("baby-number");
const petInput = document.getElementById("pet-input");
const child = document.getElementById("child-number");
const formOrder = document.getElementById("form-order");
const titleWeb = document.getElementsByTagName("title")[0];
const selectNumber = document.getElementById("select-number");

const titleDropdown = document.getElementById("title-drop-down");
const menuContent = document.getElementById("dropdown-menu-content");

const homestayOwner = document.getElementById("homestay-owner");
const homestayName = document.getElementById("homestay-name");
const homestayAddress = document.getElementById("homestay-address");
const homestayUtilities = document.getElementById("utilities");
const homestayContent = document.getElementById("homestay-content");
const totalPrice = document.getElementById("total-price");
const img1 = document.getElementById("image-details-1");
const img2 = document.getElementById("image-details-2");
const img3 = document.getElementById("image-details-3");
const img4 = document.getElementById("image-details-4");
const img5 = document.getElementById("image-details-5");
const modalBody = document.querySelector(".modal-body");
const pricePerNight = document.getElementById("price-per-night");
const minDay = document.getElementById("min-day");
const numberTotal = document.getElementById("number-total");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const homestays = JSON.parse(localStorage.getItem("homestays")) || [];

const orders = JSON.parse(localStorage.getItem("orders"));

let queryString = location.search;
let params = new URLSearchParams(queryString);
let id = params.get("id");

let post = homestays.find((e) => {
  return e.id == id;
});

if (post) {
  homestayName.innerText = post.name;
  homestayOwner.innerText = `Chủ homestay: ${post.owner}`;
  homestayAddress.innerText = post.address;
  homestayUtilities.innerText = `${post.tourists} người lớn và trẻ em, ${post.babys} em bé, ${post.pets} thú cưng, ${post.bedrooms} phòng ngủ, ${post.bathrooms} phòng tắm`;
  numberTotal.innerText = `Có thể đặt cho ${post.tourists} người lớn và trẻ em, ${post.babys} em bé, ${post.pets} thú cưng`;
  homestayContent.innerText = post.content;
  totalPrice.innerHTML = `$ ${post.pricePerDay * post.minday}`;
  titleWeb.innerHTML = `${post.name}`;
  img1.src = post.images[0];
  img2.src = post.images[1];
  img3.src = post.images[2];
  img4.src = post.images[3];
  img5.src = post.images[4];

  post.images.forEach((image) => {
    modalBody.innerHTML += `
      <img src = "${image}" class = "w-100 my-3" style="height:auto">
    `;
  });

  pricePerNight.innerText = `$ ${post.pricePerDay} / 1 đêm`;
  minDay.innerText = `Ít nhất ${post.minday} đêm`;
}

if (post.pets == 0) {
  let inputList = petInput.parentElement.querySelectorAll("button");
  inputList.forEach((e) => {
    e.classList.add("disabled");
  });
}

numberBtns.addEventListener("click", (e) => {
  //Ngăn sự kiện submit
  e.preventDefault();
  //Ngăn sự kiện đóng dropdown khi click
  e.stopPropagation();

  let inputElement = e.target.parentElement.querySelector("input");

  if (e.target.classList.contains("subtraction")) {
    if (inputElement.value != 0) {
      inputElement.value = +inputElement.value - 1;
    }
  }
  if (e.target.classList.contains("summation")) {
    if (
      baby.value != post.babys &&
      e.target.parentElement.querySelector("input").id == "baby-number"
    ) {
      inputElement.value = +inputElement.value + 1;
    }
    if (
      petInput.value != post.pets &&
      e.target.parentElement.querySelector("input").id == "pet-input"
    ) {
      inputElement.value = +inputElement.value + 1;
    }
    if (
      person.value != post.tourists &&
      e.target.parentElement.querySelector("input").id == "adult-input"
    ) {
      inputElement.value = +inputElement.value + 1;
    }
    if (
      child.value != post.tourists &&
      e.target.parentElement.querySelector("input").id == "child-number"
    ) {
      inputElement.value = +inputElement.value + 1;
    }
  }
  let finalTourists = `${person.value} người lớn, ${child.value} trẻ em, ${baby.value} em bé, ${petInput.value} thú cưng`;
  selectNumber.textContent = finalTourists;
});

let today = new Date();
let day = today.getDate() + 1;
let month = today.getMonth() + 1;
let year = today.getFullYear();

// Định dạng lại chuỗi ngày tháng
if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}

var currentDate = year + "-" + month + "-" + day;
formOrder.begindate.min = currentDate;

formOrder.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = 0;
  let startDate = new Date(formOrder.begindate.value);
  let endDate = new Date(formOrder.enddate.value);
  let startTimestamp = startDate.getTime();
  let endTimestamp = endDate.getTime();

  // Tính số milliseconds chênh lệch giữa hai ngày
  let timeDiff = endTimestamp - startTimestamp;

  // Chuyển đổi milliseconds thành số ngày
  let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (!formOrder.begindate.value || !formOrder.enddate.value) {
    swal({
      title: "Nhập ngày bắt đầu và ngày kết thúc đầy đủ",
      icon: "warning",
      timer: 2000,
    });
    errors++;
  }
  if (daysDiff < post.minday) {
    swal({
      title: `Số đêm được chọn nhỏ nhất là ${post.minday}`,
      icon: "warning",
      timer: 2000,
    });
    errors++;
  }
  if (Number(child.value) + Number(person.value) > post.tourists) {
    swal({
      title: `Số người lớn cộng số trẻ em không lớn hơn ${post.tourists}`,
      icon: "warning",
      timer: 2000,
    });

    errors++;
  }

  if (errors == 0) {
    const currentUser2 = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser2);
    if (!!currentUser2) {
      if (currentUser2.isLogin == false) {
        swal({
          title: "Tài khoản của bạn đã bị khóa",
          icon: "error",
          timer: 2000,
        });
      } else {
        let foundCurentUserOrder = orders.find(
          (e) =>
            e.userId == currentUser.id &&
            e.homestayId == id &&
            e.isComplete == true
        );
        if (!!foundCurentUserOrder) {
          swal({
            title: "Bạn đã đặt homestay này rồi",
            icon: "error",
            timer: 2000,
          });
        } else {
          location.href = `/checkOrder.html?homestay_id=${id}&check_in=${formOrder.begindate.value}&check_out=${formOrder.enddate.value}&adults=${person.value}&childrens=${child.value}&babys=${baby.value}&pets=${petInput.value}`;
        }
      }
    } else {
      swal({
        title: "Bạn cần đăng nhập để đặt phòng",
        icon: "error",
        timer: 2000,
      });
    }
  }
});

formOrder.addEventListener("change", (e) => {
  let startDate = new Date(formOrder.begindate.value);
  let endDate = new Date(formOrder.enddate.value);
  let startTimestamp = startDate.getTime();
  let endTimestamp = endDate.getTime();

  // Tính số milliseconds chênh lệch giữa hai ngày
  let timeDiff = endTimestamp - startTimestamp;

  // Chuyển đổi milliseconds thành số ngày
  let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  totalPrice.textContent = `$ ${daysDiff * post.pricePerDay}`;
});

if (!!currentUser) {
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
