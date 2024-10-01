let selectedColors = {};
const imageFiles = [
    'person1.png',
    'person2.png',
    'person3.png',
    'person4.png',
    'person5.png'
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

function createImage() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 100;

    const teams = Object.keys(selectedColors);
    const colors = Object.values(selectedColors);

    const squareWidth = canvas.width / teams.length;

    // Dibuja las imágenes con colores de fondo
    colors.forEach((color, index) => {
        // Dibuja un rectángulo de color
        ctx.fillStyle = color;
        ctx.fillRect(index * squareWidth, 0, squareWidth, canvas.height);

        // Carga la imagen
        const img = new Image();
        img.src = imageFiles[index];
        img.onload = () => {
            ctx.drawImage(img, index * squareWidth, 0, squareWidth, canvas.height);
        };
    });

    document.getElementById('result').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = 'imagen_colores.png';
    link.click();
}
