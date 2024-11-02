// document
//   .getElementById("toggleButton")
//   .addEventListener("click", toggleLayoutMode);

function toggleLayoutMode() {
  console.log(1);
  const htmlElement = document.documentElement; // Lấy thẻ <html>
  const currentMode = htmlElement.getAttribute("data-layout-mode"); // Lấy giá trị hiện tại của thuộc tính data-layout-mode

  // Kiểm tra giá trị hiện tại và thay đổi
  if (currentMode == "light") {
    htmlElement.setAttribute("data-layout-mode", "dark");
  } else {
    htmlElement.setAttribute("data-layout-mode", "light");
  }
}

// Đảm bảo hàm này có thể được gọi từ bất kỳ đâu
window.toggleLayoutMode = toggleLayoutMode;
