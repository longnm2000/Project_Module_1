const admin = JSON.parse(localStorage.getItem("admin"));
let homestays = JSON.parse(localStorage.getItem("homestays")) || [];
const categories = JSON.parse(localStorage.getItem("categories")) || [];

const titleDropdown = document.getElementById("title-drop-down");
const addForm = document.getElementById("add-homestay");
const homestayTypeBox = document.getElementById("homestay-type-box");

const nameError = document.querySelector(".name-error");
const ownerError = document.querySelector(".owner-error");
const addressError = document.querySelector(".address-error");
const typesError = document.querySelector(".types-error");
const touristsError = document.querySelector(".tourists-error");
const babysError = document.querySelector(".babys-error");
const petsError = document.querySelector(".pets-error");
const bedroomsError = document.querySelector(".bedrooms-error");
const bathroomsError = document.querySelector(".bathrooms-error");
const mindayError = document.querySelector(".minday-error");
const priceError = document.querySelector(".price-error");
const imagesError = document.querySelector(".images-error");
const contentError = document.querySelector(".content-error");

function checkDuplicate(key, value, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i][key]) {
      return true;
    }
  }
  return false;
}

if (admin.isLogin == true) {
  //Hiển thị tên  admin
  let firstword = admin.name.split(" ")[0];
  titleDropdown.innerHTML = `<i class="fa-solid fa-user me-2" style="color: #ffffff;"></i> ${firstword}`;

  //Chức năng đăng xuất admin
  const logout = document.getElementById("log-out");
  logout.addEventListener("click", () => {
    admin.isLogin = false;
    localStorage.setItem("admin", JSON.stringify(admin));
    logout.textContent = "Login";
  });

  categories.forEach((category) => {
    homestayTypeBox.innerHTML += `
        <div class="form-check form-check-inline">
            <input name="typeHomestay" class="form-check-input" type="checkbox" id="inlineCheckbox${category.id}" value="${category.typeCategory}">
            <label class="form-check-label" for="inlineCheckbox1">${category.title}</label>
        </div>
    `;
  });
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedCategories = Array.from(
      addForm.querySelectorAll('input[name="typeHomestay"]:checked')
    ).map((checkbox) => checkbox.value);

    let errors = 0;
    if (!addForm.name.value) {
      nameError.style.display = "block";
      nameError.textContent = "Không để trống";
      errors++;
    } else {
      nameError.style.display = "none";
    }
    if (!addForm.owner.value) {
      ownerError.style.display = "block";
      ownerError.textContent = "Không để trống";
      errors++;
    } else {
      ownerError.style.display = "none";
    }
    if (!addForm.address.value) {
      addressError.style.display = "block";
      addressError.textContent = "Không để trống";
      errors++;
    } else {
      addressError.style.display = "none";
    }
    if (selectedCategories.length == 0) {
      typesError.style.display = "block";
      typesError.textContent = "Chọn ít nhất 1 cái";
      errors++;
    } else {
      typesError.style.display = "none";
    }
    if (
      (+addForm.tourists.value % 2 == 0 || +addForm.tourists.value % 2 == 1) &&
      +addForm.tourists.value > 0 &&
      +addForm.tourists.value <= 50
    ) {
      touristsError.style.display = "none";
    } else {
      touristsError.style.display = "block";
      touristsError.textContent =
        "Số lớn hơn 1 và nhỏ hơn bằng 50 và là số nguyên";
      errors++;
    }
    if (
      (+addForm.babys.value % 2 == 0 || +addForm.babys.value % 2 == 1) &&
      +addForm.babys.value >= 0 &&
      +addForm.babys.value <= 50 &&
      !!addForm.babys.value
    ) {
      babysError.style.display = "none";
    } else {
      babysError.style.display = "block";
      babysError.textContent =
        "Số lớn hơn 0 và nhỏ hơn bằng 50 và là số nguyên";
      errors++;
    }
    if (
      (+addForm.pets.value % 2 == 0 || +addForm.pets.value % 2 == 1) &&
      +addForm.pets.value >= 0 &&
      +addForm.pets.value <= 50 &&
      !!addForm.pets.value
    ) {
      petsError.style.display = "none";
    } else {
      petsError.style.display = "block";
      petsError.textContent =
        "Số lớn hơn bằng 0 và nhỏ hơn bằng 50 và là số nguyên";
      errors++;
    }
    if (
      (+addForm.bedrooms.value % 2 == 0 || +addForm.bedrooms.value % 2 == 1) &&
      +addForm.bedrooms.value > 0 &&
      +addForm.bedrooms.value <= 50
    ) {
      bedroomsError.style.display = "none";
    } else {
      bedroomsError.style.display = "block";
      bedroomsError.textContent =
        "Số lớn hơn bằng 1 và nhỏ hơn bằng 50 và là số nguyên";
      errors++;
    }
    if (
      (+addForm.bathrooms.value % 2 == 0 ||
        +addForm.bathrooms.value % 2 == 1) &&
      +addForm.bathrooms.value > 0 &&
      +addForm.bathrooms.value <= 50
    ) {
      bathroomsError.style.display = "none";
    } else {
      bathroomsError.style.display = "block";
      bathroomsError.textContent =
        "Số lớn hơn bằng 1 và nhỏ hơn bằng 50 và là số nguyên";
      errors++;
    }
    if (
      (+addForm.minday.value % 2 == 0 || +addForm.minday.value % 2 == 1) &&
      +addForm.minday.value > 0 &&
      +addForm.minday.value <= 50
    ) {
      mindayError.style.display = "none";
    } else {
      mindayError.style.display = "block";
      mindayError.textContent =
        "Số lớn hơn bằng 1 và nhỏ hơn bằng 50 và là số nguyên";
      errors++;
    }
    if (+addForm.pricePerNight.value > 0) {
      priceError.style.display = "none";
    } else {
      priceError.style.display = "block";
      priceError.textContent = "Số lớn hơn  0";
      errors++;
    }
    if (!addForm.content.value) {
      contentError.style.display = "block";
      contentError.textContent = "Không để trống";
      errors++;
    } else {
      contentError.style.display = "none";
    }
    if (!addForm.images.value || addForm.images.value.split(",").length < 5) {
      imagesError.style.display = "block";
      imagesError.textContent =
        "Không để trống, các link ảnh cách nhau bằng dấu phẩy và có ít nhất 5 ảnh";
      errors++;
    } else {
      imagesError.style.display = "none";
    }
    if (errors == 0) {
      let randomId = Math.floor(Math.random() * 1000000000);
      while (checkDuplicate("id", randomId, homestays)) {
        randomId = Math.floor(Math.random() * 1000000000);
      }
      let newHomestay = {
        id: randomId,
        name: addForm.name.value,
        address: addForm.address.value,
        typeHomestay: selectedCategories,
        owner: addForm.owner.value,
        tourists: +addForm.tourists.value,
        babys: +addForm.babys.value,
        pets: +addForm.pets.value,
        bedrooms: +addForm.bedrooms.value,
        bathrooms: +addForm.bathrooms.value,
        minday: +addForm.minday.value,
        pricePerDay: +addForm.pricePerNight.value,
        isOrder: false,
        images: addForm.images.value.split(","),
        content: addForm.content.value,
      };
      homestays.unshift(newHomestay);
      localStorage.setItem("homestays", JSON.stringify(homestays));
      swal({
        title: "Đã thêm thành công",
        icon: "success",
        timer: 2000,
      });

      addForm.reset();
    }
  });
} else {
  location.href = "/admin/login.html";
}
