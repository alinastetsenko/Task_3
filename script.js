document.addEventListener("DOMContentLoaded", function () {
  const paletteContainer = document.getElementById("palette-container");
  const colorModal = document.getElementById("color-modal");
  const colorModalContent = document.getElementById("color-modal-content");
  const paletteSelect = document.getElementById("palette-select");
  paletteSelect.value = "flat-ui-colors-v1";
  // Запит на отримання даних палітр
  fetch('pallete.json')
    .then(response => response.json())
    .then(data => {
      // Робіть що-небудь з отриманими даними палітр
      console.log(data);

      // Функція для створення блоків кольорів
      function createColorBox(color) {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color");
        colorBox.style.backgroundColor = color.color;
        colorBox.title = color.name;
        const colorName = document.createElement("div");
        colorName.classList.add("color-name");
        colorName.textContent = color.name;

        colorBox.appendChild(colorName);
        colorBox.addEventListener("click", function () {
          copyColorToClipboard(color.color);
          showColorModal(color.color);
        });
        return colorBox;
      }

// Функция для воспроизведения звука
function playClickSound() {
  const clickSound = document.getElementById("click-sound");
  clickSound.currentTime = 0; // Сбросить текущее время воспроизведения
  clickSound.play();
}

// Обработчик клика на цвет
paletteContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("color")) {
    const color = event.target.style.backgroundColor;
    playClickSound(); // Воспроизвести звук при клике на цвет
    // Добавьте другие действия, которые должны произойти при клике на цвет
  }
});
    
      // Функція для копіювання кольору в буфер обміну
      function copyColorToClipboard(color) {
        navigator.clipboard.writeText(color)
          .then(() => console.log('Color copied to clipboard'))
          .catch(err => console.error('Failed to copy color: ', err));
      }

      // Функція для відображення модального вікна з кольором
      function showColorModal(color) {
        colorModal.style.display = "block";
        colorModalContent.style.backgroundColor = color;

        // При кліку на колір на всьому екрані, відображаємо знову палітру
        colorModalContent.addEventListener("click", function () {
          closeColorModal();
        });
      }

      // Функція для закриття модального вікна
      function closeColorModal() {
        colorModal.style.display = "none";
      }

      // Функція для відображення палітри
      function displayPalette(palette) {
        // Очищаем контейнер с палитрой перед отображением новой
        paletteContainer.innerHTML = "";

        // Создаем и отображаем блоки цветов для выбранной палитры
        const paletteDiv = document.createElement("div");
        paletteDiv.classList.add("palette");
        palette.colors.forEach(color => {
          const colorBox = createColorBox(color);
          paletteDiv.appendChild(colorBox);
        });
        paletteContainer.appendChild(paletteDiv);
      }

      // Заполняем select палитрами
      data.forEach(palette => {
        const option = document.createElement("option");
        option.value = palette.id;
        option.textContent = palette.paletteName;
        paletteSelect.appendChild(option);
      });

      // Обработчик изменения выбранной палитры
      paletteSelect.addEventListener("change", function () {
        const selectedPaletteId = paletteSelect.value;
        const selectedPalette = data.find(palette => palette.id === selectedPaletteId);
        if (selectedPalette) {
          displayPalette(selectedPalette);
        }
      });
    })
    .catch(error => console.error('Failed to fetch palette data: ', error));
});
