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
            if (option) {
                option.disabled = false; // Habilitar opción si no se selecciona
            }
        }
    });

    // Guardar selección actual
    if (selectedValue) {
        selectedColors[selectId] = selectedValue;
    } else {
        delete selectedColors[selectId]; // Eliminar si no hay selección
    }

    // Deshabilitar opción seleccionada en otros selects
    const colorsInUse = Object.values(selectedColors);
    Object.keys(selectedColors).forEach(key => {
        const select = document.getElementById(key);
        Array.from(select.options).forEach(option => {
            option.disabled = colorsInUse.includes(option.value) && option.value !== select.value;
        });
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
    if (!validateSelections()) return;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 300;

    const teams = Object.keys(selectedColors);
    const colors = Object.values(selectedColors);

    const squareWidth = canvas.width / teams.length;

    // Dibuja las imágenes con colores de fondo
    colors.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.fillRect(index * squareWidth, 0, squareWidth, canvas.height);
        
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
    link.href = canvas.toDataURL();
    link.download = 'imagen_colores.png';
    link.click();
}
