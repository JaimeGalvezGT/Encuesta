let selectedColors = {};
const imageFiles = [
    'person1.png',
    'person2.png',
    'person3.png',
    'person4.png',
    'person5.png',
    'gameover.png' // Agregar la nueva imagen
];

function updateSelection(selectElement) {
    const selectedValue = selectElement.value;
    const selectId = selectElement.id;

    // Limpiar colores previamente seleccionados
    Object.keys(selectedColors).forEach(key => {
        if (key !== selectId) {
            const option = document.getElementById(key).querySelector(`option[value="${selectedValue}"]`);
            if (option) option.disabled = false;
        }
    });

    // Guardar selección actual
    if (selectedValue) {
        selectedColors[selectId] = selectedValue;
    } else {
        delete selectedColors[selectId];
    }

    // Deshabilitar opción seleccionada en otros selects
    Object.keys(selectedColors).forEach(key => {
        if (key !== selectId) {
            const option = document.getElementById(key).querySelector(`option[value="${selectedColors[key]}"]`);
            if (option) option.disabled = true;
        }
    });

    // Actualizar opciones
    updateOptions();
}

function updateOptions() {
    const allSelected = Object.values(selectedColors);
    const allOptions = ['orange', 'black', 'skyblue', 'yellow', 'fuchsia'];

    allOptions.forEach(color => {
        const isDisabled = allSelected.includes(color);
        for (let i = 1; i <= 5; i++) {
            const option = document.getElementById(`team${i}`).querySelector(`option[value="${color}"]`);
            if (option) option.disabled = isDisabled;
        }
    });
}

function validateSelections() {
    const teams = ['team1', 'team2', 'team3', 'team4', 'team5'];
    for (const team of teams) {
        const select = document.getElementById(team);
        if (!select.value) {
            alert('Por favor, selecciona un color para todos los equipos.');
            return false;
        }
    }
    return true;
}

function createImage() {
    if (!validateSelections()) return; // Validar antes de crear la imagen

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Ajustar el tamaño del lienzo
    const canvasWidth = 600; // Ancho del lienzo
    const canvasHeight = 400; // Altura del lienzo
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Definir el tamaño de los rectángulos
    const squareWidth = canvasWidth / 3; // Ancho para 3 columnas
    const squareHeight = canvasHeight / 2; // Altura para 2 filas

    // Dibuja las imágenes con colores de fondo
    const colors = [...Object.values(selectedColors), 'gray']; // Agregar gris para la última imagen
    colors.forEach((color, index) => {
        const x = (index % 3) * squareWidth; // Posición horizontal
        const y = Math.floor(index / 3) * squareHeight; // Posición vertical

        ctx.fillStyle = color;
        ctx.fillRect(x, y, squareWidth, squareHeight);

        const img = new Image();
        img.src = imageFiles[index];
        img.onload = () => {
            if (index === 5) { // Para gameover.png
                ctx.drawImage(img, x + squareWidth * 0.1, y + squareHeight * 0.1, squareWidth * 0.8, squareHeight * 0.8);
            } else {
                ctx.drawImage(img, x, y, squareWidth, squareHeight);
            }
        };
    });

    showDownloadButton(); // Mostrar el botón de descarga
}

function showDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.style.display = 'block'; // Mostrar el botón
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'mi_imagen.png'; // Nombre del archivo a descargar
    link.href = canvas.toDataURL('image/png'); // Convierte el canvas a una imagen PNG
    link.click(); // Simula un clic para iniciar la descarga
}

// Añadir el evento de descarga al botón
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

// Añadir el evento al botón de validar selección
document.querySelector('button[type="button"]').addEventListener('click', createImage);
