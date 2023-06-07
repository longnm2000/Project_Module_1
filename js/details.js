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

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// const homestays = [
//   {
//     id: 1,
//     name: "2BR Angsana Sky-pool",
//     address: "tt. Lăng Cô, Thừa Thiên Huế, Việt Nam",
//     typeHomestay: ["beach", "room", "tiny-home", "amazing-view"],
//     owner: "Nguyễn Mạnh Long",
//     tourists: 4,
//     babys: 5,
//     pets: 0,
//     bedrooms: 2,
//     bathrooms: 2,
//     minday: 5,
//     pricePerDay: 300,
//     isOrder: false,
//     images: [
//       "https://a0.muscache.com/im/pictures/a376509b-3fbb-4be5-9a5f-320869e4ac26.jpg?im_w=960",
//       "https://a0.muscache.com/im/pictures/506b7523-072b-4b40-9370-688332ac4c0f.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/09452ccd-6452-45d4-8aa8-3bebf9f3f6ab.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/8f4a02ee-0e2a-4e15-b719-3157ab496a11.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/3c11394e-f3f7-4213-ae60-2727bfd23036.jpg?im_w=720",
//     ],
//     content: `250 cho 2BR. Tận hưởng căn gác bể bơi trên trời tại Angsana Resort tại Lăng Cô, Đà Nẵng với mức giá thấp hơn 30% so với thị trường. Mang đến cho bạn bởi Sanctuary Residences.
//     Chỗ ở
//     Sống cuộc sống ở thời điểm tuyệt vời nhất với hồ bơi vô tận của riêng bạn và tầm nhìn tuyệt vời về rừng và biển. Với tường kính bao quanh căn hộ hai tầng này, bạn có thể tận hưởng khung cảnh tuyệt đẹp từ khu vực khách, phòng ăn, hai phòng ngủ và bồn tắm. Căn gác này có một sàn bể bơi gỗ, sảnh ngoài trời và hai phòng tắm được trang bị bồn tắm. Căn gác 179 mét vuông có một phòng ngủ chính với một chiếc giường cỡ lớn và một phòng ngủ thứ hai với hai giường đôi.
//     Tiện nghi khách có quyền sử dụng
//     Tỉnh dậy với khung cảnh đầy cảm hứng của dãy núi Trường Sơn ở một bên và màu xanh sữa của biển bất tận ở bên kia khách sạn Angsana Lăng Cô. Đi bộ đường dài qua các dãy núi và đua với bạn bè và gia đình bạn trên máy bay phản lực. Vượt qua mặt nước và cảm nhận sự gia tăng adrenaline. Tham quan ba Di sản Thế giới của UNESCO – thị trấn cổ Hội An quyến rũ, thành phố Huế và các Thánh địa Vương quốc Chăm của Mỹ Sơn. Nếu bạn yêu golf, hãy chuẩn bị sẵn sàng để được hân hoan tại sân golf vô địch Laguna Lăng Cô 18 lỗ do Sir Nick Faldo thiết kế, kết hợp một sân chơi đầy thử thách với sự quyến rũ mộc mạc của những cánh đồng lúa và dòng suối bong bóng.`,
//   },
//   {
//     id: 2,
//     name: "Hoa Damwon (Học viện Hoa Damwon)",
//     address: "Koh Samui, Surat Thani, Thailand",
//     typeHomestay: ["tiny-home", "mountain"],
//     owner: "Flower & Garden Center",
//     tourists: 6,
//     babys: 3,
//     pets: 0,
//     bedrooms: 3,
//     bathrooms: 3,
//     minday: 3,
//     pricePerDay: 600,
//     isOrder: false,
//     images: [
//       "https://a0.muscache.com/im/pictures/c0b5943a-9c0c-449c-ab3b-cf148b8471c3.jpg?im_w=960",
//       "https://a0.muscache.com/im/pictures/e40a3f76-fefd-4fbb-893c-e1e2b2c6c8ca.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/9df73161-3743-4cdb-bc98-864e408af6f0.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/788ec8d8-fdd2-4c45-b6ed-a8b44d98a8df.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/6713071b-519d-49ad-bc64-76db60d8de9d.jpg?im_w=720",
//     ],
//     content: `Là ngôi nhà độc lập hình vòng cung với 20m2 không gian nội thất (phòng ngủ, nhà bếp, phòng tắm) và 40m2 sàn gỗ ở tầng hai. Đây là công viên quốc gia, nơi trú ẩn của đom đóm và duy trì môi trường tự nhiên tốt nhất để sống bên kia con lạch phía trước. Lý tưởng cho nghỉ ngơi gia đình và MT theo nhóm, nhà kính mái vòm cung cấp một hội thảo mỗi ngày cho tối đa 30 người.
//     Chỗ ở
//     Một ngôi nhà gỗ có mái vòm với tầng hai, bồn rửa tay, bếp, nhà vệ sinh và phòng tắm bên trong. Bên ngoài, có một boong rộng rãi, và toàn bộ nằm trong vườn hoa, và lúc nào cũng có hoa.
//     Tiện nghi khách có quyền sử dụng
//     Đi bộ, quan sát có hoa và tự phục vụ và ngủ đều nằm trong nhà khách.
//     Những điều cần lưu ý khác
//     Hoa là những nơi đẹp với hoa và vườn hoa. Chúc bạn tận hưởng những bông hoa, khu vườn và thiên nhiên tươi đẹp một cách trọn vẹn.`,
//   },
//   {
//     id: 3,
//     name: "Castle Oodeypore",
//     address: "Bujra, Rajasthan, Ấn Độ",
//     typeHomestay: ["castle"],
//     owner: "Nirmal",
//     tourists: 16,
//     babys: 4,
//     pets: 3,
//     bedrooms: 8,
//     bathrooms: 7,
//     minday: 5,
//     pricePerDay: 800,
//     isOrder: false,
//     images: [
//       "https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/f0f0a291-65a9-442b-9036-45b7e5e25676.jpeg?im_w=960",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/df0ef78a-3f63-4d16-a5ac-abff6b82f49b.jpeg?im_w=720",
//       "https://a0.muscache.com/im/pictures/53ed423f-f4c4-4be5-9bf9-e52861167c0f.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/364832c8-45ba-45ae-b1f0-5632f033c5a9.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/35f1327f-8a5d-4a5c-9343-c23856368531.jpg?im_w=720",
//     ],
//     content: `Castle Oodeypore là một homestay nguy nga, mang đến trải nghiệm độc đáo. Đó là một ngôi nhà đón tiếp những người đẹp và kết nối gia đình, bạn bè và khách du lịch, một lâu đài nhắc bạn về thời đại đã qua, một nơi để khách tận hưởng vẻ đẹp vượt thời gian của thiên nhiên.

//     Được xây dựng vào năm 2021 Castle Oodeypore là một kỳ quan kiến trúc giữa chân đồi của Aravallis, được làm từ đá sa thạch đỏ của Bikaner, khiến nó trở thành chỗ ở bằng đá sa thạch đỏ duy nhất ở Udaipur.`,
//   },
//   {
//     id: 4,
//     name: "Villa Amylia",
//     address: "Koh Samui, Surat Thani, Thái Lan",
//     typeHomestay: ["luxe", "beach"],
//     owner: "Nirmal",
//     tourists: 16,
//     babys: 5,
//     pets: 0,
//     bedrooms: 9,
//     bathrooms: 9,
//     minday: 10,
//     pricePerDay: 1000,
//     isOrder: false,
//     images: [
//       "https://a0.muscache.com/im/pictures/miso/Hosting-820954888871612167/original/f37e01a9-cb1a-446d-be7e-c1d62d1f1c23.jpeg?im_w=1200",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-820954888871612167/original/2232b68f-86df-4ccd-9854-9baccb89df7b.jpeg?im_w=1200",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-820954888871612167/original/f0dcbfd9-ad5e-4eb8-bdc4-03fb5d3a0452.jpeg?im_w=1200",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-820954888871612167/original/60d32528-f911-4e0f-847e-ea571f2d860f.jpeg?im_w=1200",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-820954888871612167/original/a6670765-9def-4cdc-bb76-55da3556356f.jpeg?im_w=720",
//     ],
//     content: `Chỗ ở
//     Bao gồm Villa Ruby và Villa Emerald, nhà nghỉ dưỡng cho thuê tuyệt đẹp này hoàn hảo cho những kỳ nghỉ nhóm lớn ở Bắc Chaweng. Nằm trong khu phố Narayan Heights, Villa Amylia chụp được khung cảnh tuyệt đẹp của đại dương, đảo và núi. Biệt thự chỉ cách bãi biển 250 m và có 2 hồ bơi, không gian cho 20 người và sân thượng có thể đón tiếp tối đa 40 khách.

//     Bản quyền © Luxury Retreats. Bảo lưu mọi quyền.

//     PHÒNG NGỦ & PHÒNG TẮM
//     • Phòng ngủ 1 - Chính: Giường cỡ King, Phòng tắm khép kín với vòi sen độc lập, TV, Tầm nhìn ra biển
//     • Phòng ngủ 2: Giường cỡ King, Phòng tắm khép kín với vòi sen độc lập, TV, Ban công, Nhìn ra biển
//     • Phòng ngủ 3: Giường cỡ King, Phòng tắm khép kín với vòi sen độc lập, TV, Tầm nhìn ra biển
//     • Phòng ngủ 4: 2 giường đôi (có thể được chuyển đổi thành một vị vua), phòng tắm riêng với vòi sen độc lập, TV, tầm nhìn ra biển
//     • Phòng ngủ 5: Giường cỡ King, Phòng tắm khép kín có vòi sen độc lập, TV, Sân thượng
//     • Phòng ngủ 6: 2 giường đơn trên giường tầng đôi, phòng tắm khép kín với vòi sen độc lập, TV
//     • Phòng ngủ 7: giường cỡ queen, phòng tắm khép kín với vòi sen độc lập, TV, tầm nhìn ra biển
//     • Phòng ngủ 8: Giường cỡ King, Phòng tắm khép kín với vòi sen độc lập, TV, Tầm nhìn ra biển
//     • Phòng ngủ 9: giường cỡ queen, phòng tắm khép kín với vòi sen độc lập, TV, tầm nhìn ra biển

//     TÍNH NĂNG & TIỆN NGHI
//     • Máy làm lạnh rượu vang

//     ĐẶC ĐIỂM NGOÀI TRỜI
//     • Sân thượng

//     NHÂN VIÊN và DỊCH VỤ

//     đã bao gồm:
//     • Người làm vườn

//     Phụ phí (có thể yêu cầu thông báo trước):
//     • Đưa đón sân bay
//     • Các hoạt động và chuyến du ngoạn
//     • Masseuse`,
//   },
// ];

// localStorage.setItem("homestays", JSON.stringify(homestays));

let homestays = JSON.parse(localStorage.getItem("homestays"));

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
  console.log(errors);
  if (errors == 0) {
    if (!!currentUser) {
      if (currentUser.isLogin == false) {
        swal({
          title: "Tài khoản của bạn đã bị khóa",
          icon: "error",
          timer: 2000,
        });
      } else {
        location.href = `/checkOrder.html?homestay_id=${id}&check_in=${formOrder.begindate.value}&check_out=${formOrder.enddate.value}&adults=${person.value}&childrens=${child.value}&babys=${baby.value}&pets=${petInput.value}`;
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
  console.log(removeCurrent);

  removeCurrent.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
  });
}
