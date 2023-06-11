const admin = JSON.parse(localStorage.getItem("admin"));
let categories = JSON.parse(localStorage.getItem("categories")) || [];

const titleDropdown = document.getElementById("title-drop-down");
const updateForm = document.getElementById("update-category");

const imageError = document.querySelector(".image-error");
const titleError = document.querySelector(".title-error");

const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

// Lấy URL hiện tại
let url = new URL(window.location.href);

// Lấy giá trị homestayId từ tham số truy vấn (query parameter)
let sendCategoryId = url.searchParams.get("categoryId");

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

  let findUpdateCategory = categories.find((e) => {
    return e.id == sendCategoryId;
  });
  console.log(sendCategoryId);
  if (!!findUpdateCategory) {
    updateForm.title.value = findUpdateCategory.title;
    updateForm.image.value = findUpdateCategory.image;
  }

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let errors = 0;
    if (updateForm.title.value.trim() == "") {
      titleError.style.display = "block";
      titleError.textContent = `Không để trống`;
      errors++;
    } else {
      titleError.style.display = "none";
    }
    if (imageRegex.test(updateForm.image.value.trim()) == false) {
      imageError.style.display = "block";
      imageError.textContent = `Không phải là ảnh do cuối chuỗi không có đuôi của ảnh`;
      errors++;
    } else {
      imageError.style.display = "none";
    }
    console.log(categories);
    if (errors == 0) {
      categories.forEach((e) => {
        if (e.id == sendCategoryId) {
          e.title = updateForm.title.value.trim();
          e.image = updateForm.image.value;
        }
      });
      localStorage.setItem("categories", JSON.stringify(categories));
      swal({
        title: "Đã cập nhật thành công",
        icon: "success",
        timer: 2000,
      }).then(() => {
        location.href = "/admin/categoryInfo.html";
      });
    }
  });
} else {
  location.href = "/admin/login.html";
}
