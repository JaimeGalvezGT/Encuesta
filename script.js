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
    if (selectedValue) {
        // Si hay un nuevo valor seleccionado, actualizar selectedColors
        selectedColors[selectId] = selectedValue;
    } else {
        // Si no hay selección, eliminar del objeto
        delete selectedColors[selectId];
    }

    // Habilitar todas las opciones
    const allOptions = ['black', 'orange', 'skyblue', 'yellow', 'fuchsia'];
    const colorsInUse = Object.values(selectedColors);

    // Deshabilitar las opciones ya seleccionadas
    allOptions.forEach(color => {
        const isDisabled = colorsInUse.includes(color);
        const isSelectedInThisSelect = selectElement.value === color;

        // Deshabilitar el color si ya está en uso y no es el seleccionado
        const option = selectElement.querySelector(`option[value="${color}"]`);
        if (option) {
            option.disabled = isDisabled && !isSelectedInThisSelect;
        }
    });

    // Actualizar las otras selecciones
    Object.keys(selectedColors).forEach(key => {
        if (key !== selectId) {
            const select = document.getElementById(key);
            allOptions.forEach(color => {
                const option = select.querySelector(`option[value="${color}"]`);
                if (option) {
                    option.disabled = colorsInUse.includes(color);
                }
            });
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
