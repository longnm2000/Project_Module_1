let admin = JSON.parse(localStorage.getItem("admin"));
let categories = JSON.parse(localStorage.getItem("categories")) || [];
const homestays = JSON.parse(localStorage.getItem("homestays"));

const categoryInfo = document.getElementById("category-info");
const datatablesSimple = document.getElementById("datatablesSimple");
const titleDropdown = document.querySelector("#title-drop-down");

const logOut = document.querySelector("#log-out");

function renderData() {
  categoryInfo.innerHTML = "";
  categories.forEach((category) => {
    categoryInfo.innerHTML += `
          <tr>
              <td>${category.id}</td>
              <td>${category.title}</td>
              <td>${category.typeCategory}</td>
              <td><img width="96px" src="${category.image}"></td>

              <td>
                <div>
                <button class="btn btn-primary update-category-btn">Update</button>
                <button class="btn btn-danger delete-category-btn">Delete</button>
                </div>
              </td>
          </tr>
        
        `;
  });
}

const AddCategoryForm = document.getElementById("add-category-form");

if (admin.isLogin == true) {
  //Hiển thị tên  admin
  let firstword = admin.name.split(" ")[0];
  titleDropdown.innerHTML = `<i class="fa-solid fa-user me-2" style="color: #ffffff;"></i> ${firstword}`;
  logOut.textContent = "Logout";

  //Chức năng đăng xuất admin
  const logout = document.getElementById("log-out");
  logout.addEventListener("click", () => {
    admin.isLogin = false;
    localStorage.setItem("admin", JSON.stringify(admin));
  });
  renderData();
  datatablesSimple.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-category-btn")) {
      if (confirm("Bạn có chắc là muốn xóa không")) {
        const categoryDeleteId =
          e.target.parentElement.parentElement.parentElement.querySelector(
            "td"
          ).textContent;
        if (!!categoryDeleteId) {
          const findCategory = categories.find((e) => e.id == categoryDeleteId);
          if (!!findCategory) {
            const includeTypeHomestay = homestays.filter((e) =>
              e.typeHomestay.includes(findCategory.typeCategory)
            );
            console.log(includeTypeHomestay);
            if (includeTypeHomestay.length !== 0) {
              swal({
                title:
                  "Không thể xóa bởi vì có Homestay thuộc loại Category này",
                icon: "error",
                timer: 2000,
              });
            } else {
              const findDeleteIndex = categories.findIndex(
                (e) => e.id == findCategory.id
              );

              categories.splice(findDeleteIndex, 1);
              localStorage.setItem("categories", JSON.stringify(categories));
              swal({
                title: "Xóa thành công!",
                icon: "success",
                timer: 2000,
              }).then(() => {
                location.href = "/admin/categoryInfo.html";
              });
            }
          }
        }
      }
    }
    if (e.target.classList.contains("update-category-btn")) {
      const categoryUpdateId =
        e.target.parentElement.parentElement.parentElement.querySelector(
          "td"
        ).textContent;
      if (!!categoryUpdateId) {
        const findUpdateCategory = categories.find(
          (e) => (e.id = categoryUpdateId)
        );
        if (!!findUpdateCategory) {
          location.href = `/admin/updateCategory.html?categoryId=${findUpdateCategory.id}`;
        }
      }
    }
  });
} else {
  location.href = "/admin/login.html";
}
