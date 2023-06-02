const numberBtns = document.querySelector(".number-buttons");
const person = document.getElementById("adult-input");
const baby = document.querySelector("baby-input");
const petInput = document.getElementById("pet-input");

let totalCustomer = 7;
let babyNumber = 3;
let petNumber = 10;
let personNumber = 5;
let childNumber;

if (petNumber == 0) {
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
  const downBtn = e.target.parentElement.querySelector(".subtraction");
  let inputElement = e.target.parentElement.querySelector("input");

  if (e.target.classList.contains("subtraction")) {
    inputElement.value = +inputElement.value - 1;
    totalCustomer += +inputElement.value;
    if (inputElement.value == 0) {
      e.target.classList.add("disabled");
    }
    if (person.value == 1) {
      e.target.classList.add("disabled");
    }
  }
  if (e.target.classList.contains("summation")) {
    let totalCustomer2 = totalCustomer;
    inputElement.value = +inputElement.value + 1;
    console.log(totalCustomer);
    totalCustomer -= +inputElement.value;
    console.log(totalCustomer2);
    if (inputElement.value == 0) {
      downBtn.classList.add("disabled");
    } else {
      downBtn.classList.remove("disabled");
    }
  }
  console.log(totalCustomer);
});
