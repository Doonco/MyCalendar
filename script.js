const calendarHeader = document.getElementById("calendar-header");
const calendarDays = document.getElementById("calendar-days");
const calendarDates = document.getElementById("calendar-dates");

const imageModal = document.getElementById("imageModal");
const imageInput = document.getElementById("imageInput");
const imageSizeSelect = document.getElementById("imageSizeSelect");
const applyImageBtn = document.getElementById("applyImageBtn");
const cancelImageBtn = document.getElementById("cancelImageBtn");

let selectedCell = null;
let uploadedImageFile = null;

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const days = ["일", "월", "화", "수", "목", "금", "토"];
days.forEach(day => {
  const div = document.createElement("div");
  div.textContent = day;
  calendarDays.appendChild(div);
});

calendarHeader.textContent = `${year}년 ${month + 1}월`;

const firstDayOfMonth = new Date(year, month, 1).getDay();
const lastDate = new Date(year, month + 1, 0).getDate();

// 빈칸
for (let i = 0; i < firstDayOfMonth; i++) {
  calendarDates.appendChild(document.createElement("div"));
}

// 날짜 칸 생성
for (let i = 1; i <= lastDate; i++) {
  const dateDiv = document.createElement("div");
  dateDiv.textContent = i;

  dateDiv.addEventListener("click", () => {
    selectedCell = dateDiv;
    imageInput.value = "";
    uploadedImageFile = null;
    imageModal.style.display = "block";
  });

  calendarDates.appendChild(dateDiv);
}

// 파일 업로드 시 이미지 저장
imageInput.addEventListener("change", () => {
  uploadedImageFile = imageInput.files[0];
});

// 적용 버튼
applyImageBtn.addEventListener("click", () => {
  if (!uploadedImageFile || !selectedCell) return;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(uploadedImageFile);
  img.classList.add("thumbnail");

  const sizeClass = imageSizeSelect.value;
  img.classList.add(sizeClass);

  selectedCell.innerHTML = ""; // 날짜 제거
  selectedCell.appendChild(img);

  imageModal.style.display = "none";
});

// 취소 버튼
cancelImageBtn.addEventListener("click", () => {
  imageModal.style.display = "none";
});
