const admin = JSON.parse(localStorage.getItem("admin"));
let homestays = JSON.parse(localStorage.getItem("homestays")) || [];
const categories = JSON.parse(localStorage.getItem("categories")) || [];

const titleDropdown = document.getElementById("title-drop-down");
const updateForm = document.getElementById("update-homestay");
const homestayTypeBox = document.getElementById("homestay-type-box");

const imagesError = document.querySelector(".images-error");
const contentError = document.querySelector(".content-error");

// Lấy URL hiện tại
let url = new URL(window.location.href);

// Lấy giá trị homestayId từ tham số truy vấn (query parameter)
let homestayId = url.searchParams.get("homestayId");

console.log(homestayId);

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

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = 0;

    if (!updateForm.content.value) {
      contentError.style.display = "block";
      contentError.textContent = "Không để trống";
      errors++;
    } else {
      contentError.style.display = "none";
    }
    if (
      !updateForm.images.value ||
      updateForm.images.value.split(",").length < 5
    ) {
      imagesError.style.display = "block";
      imagesError.textContent =
        "Không để trống, các link ảnh cách nhau bằng dấu phẩy và có ít nhất 5 ảnh";
      errors++;
    } else {
      imagesError.style.display = "none";
    }
    if (errors == 0) {
      homestays.forEach((element) => {
        if (element.id == homestayId) {
          element.images = updateForm.images.value.split(",");
          element.content = updateForm.content.value;
        }
      });

      localStorage.setItem("homestays", JSON.stringify(homestays));
      swal({
        title: "Đã cập nhật thành công",
        icon: "success",
        timer: 2000,
      });
      updateForm.reset();
    }
  });
} else {
  location.href = "/admin/login.html";
}
