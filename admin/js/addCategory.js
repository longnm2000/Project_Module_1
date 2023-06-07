const admin = JSON.parse(localStorage.getItem("admin"));
let categories = JSON.parse(localStorage.getItem("categories"));

const addCategoryForm = document.getElementById("add-category-form");
const typeError = document.querySelector(".type-error");
const titleError = document.querySelector(".title-error");
const imageError = document.querySelector(".images-error");
const titleDropdown = document.getElementById("title-drop-down");

// Kiểm tra xem phần tử định thêm vào có key bằng với 1 phần tử nào đó trong mảng hay không
function checkDuplicate(key, value, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i][key]) {
      return true;
    }
  }
  return false;
}

function checkKeyValue(key, value, categories) {
  let same = categories.find((e) => {
    return e[key] == value;
  });
  return !!same;
}

const titleRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const typeRegex = /^[a-z]+(-[a-z]+)*$/;
const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

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

  addCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let errors = 0;
    if (titleRegex.test(addCategoryForm.titleCategory.value) == false) {
      titleError.style.display = "block";
      titleError.textContent = `Chỉ chứa chữ và dấu cách, dấu cách không đứng ở đầu và cuối, không có nhiều dấu cách ở cạnh nhau`;
      errors++;
    } else {
      titleError.style.display = "none";
    }
    if (typeRegex.test(addCategoryForm.type.value) == false) {
      console.log(addCategoryForm.type.value);
      typeError.style.display = "block";
      typeError.textContent = `Chỉ chứa chữ thường và dấu "-", dấu "-" không đứng ở đầu và cuối, không có nhiều dấu "-" ở cạnh nhau`;
      errors++;
    } else {
      typeError.style.display = "none";
    }
    if (imageRegex.test(addCategoryForm.image.value) == false) {
      imageError.style.display = "block";
      imageError.textContent = `Không phải là ảnh do cuối chuỗi không có đuôi của ảnh`;

      errors++;
    } else {
      imageError.style.display = "none";
    }

    if (
      !!checkKeyValue("typeCategory", addCategoryForm.type.value, categories)
    ) {
      typeError.style.display = "block";
      typeError.textContent = `Đã có type of category này rồi`;
      errors++;
    } else {
      typeError.style.display = "none";
    }

    if (
      !!checkKeyValue("title", addCategoryForm.titleCategory.value, categories)
    ) {
      titleError.style.display = "block";
      titleError.textContent = `Đã có title này rồi`;
      errors++;
    } else {
      titleError.style.display = "none";
    }
    if (errors == 0) {
      let randomId = Math.floor(Math.random() * 1000000000);
      while (checkDuplicate("id", randomId, categories)) {
        randomId = Math.floor(Math.random() * 1000000000);
      }

      let newCategory = {
        id: randomId,
        image: addCategoryForm.image.value,
        title: addCategoryForm.titleCategory.value,
        typeCategory: addCategoryForm.type.value,
      };
      addCategoryForm.reset();
      categories.unshift(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));
      swal({
        title: "Thêm thành công",
        icon: "success",
        timer: 2000,
      });
    }
  });
} else {
  location.href = "/admin/login.html";
}
