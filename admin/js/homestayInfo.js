let admin = JSON.parse(localStorage.getItem("admin"));
let homestays = JSON.parse(localStorage.getItem("homestays"));

const homestayInfo = document.getElementById("homestay-info");
const modalBodyBox = document.getElementById("modal-body-box");
const datatablesSimple = document.getElementById("datatablesSimple");

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
  console.log(e.target);
  if (e.target.classList.contains("show-modal-box-btn")) {
    let selectId =
      e.target.parentElement.parentElement.querySelector("td").textContent;
    let foundHomestay = homestays.find((e) => e.id == selectId);
    console.log(foundHomestay);
  }
});
