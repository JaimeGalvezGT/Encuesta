let selectedColors = {};
let userName = '';
const imageFiles = [
    'equipo2.png',
    'equipo1.png',
    'equipo3.png',
    'equipo4.png',
    'equipo5.png',
    'gameover.png' // Agregar la nueva imagen
];

function startSurvey() {
    const nameInput = document.getElementById('userName');
    userName = nameInput.value.trim();

    if (userName) {
        document.getElementById('teamSelections').style.display = 'block';
        document.querySelector('.name-entry').style.display = 'none'; // Ocultar la entrada del nombre
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
}

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
    const canvasHeight = 440; // Altura del lienzo (aumentamos la altura para el cintillo)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Definir el tamaño de los rectángulos
    const squareWidth = canvasWidth / 3; // Ancho para 3 columnas
    const squareHeight = (canvasHeight - 40) / 2; // Altura para 2 filas (ajustamos para el cintillo)

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
                // Dibujar imagen más pequeña
                ctx.drawImage(img, x + squareWidth * 0.1, y + squareHeight * 0.1, squareWidth * 0.8, squareHeight * 0.8);
            } else {
                // Dibujar imagen normal
                ctx.drawImage(img, x, y, squareWidth, squareHeight);
            }

            // Después de cargar la última imagen, dibujar el nombre
            if (index === colors.length - 1) {
                // Cintillo negro
                ctx.fillStyle = 'black';
                ctx.fillRect(0, canvasHeight - 40, canvasWidth, 40);
                
                // Escribir el nombre
                ctx.fillStyle = 'white'; // Color del texto
                ctx.font = '20px Arial'; // Fuente
                ctx.textAlign = 'center'; // Alinear el texto al centro
                ctx.fillText(userName, canvasWidth / 2, canvasHeight - 15); // Escribir el nombre
            }
        };
    });

    document.getElementById('result').style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'imagen_encuesta.png';
    link.href = canvas.toDataURL();
    link.click();
}
