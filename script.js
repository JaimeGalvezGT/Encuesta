const allColors = ['Negro', 'Naranja', 'Celeste', 'Amarillo', 'Fucsia'];

function updateOptions() {
    const selectedColors = [
        document.getElementById('equipo1').value,
        document.getElementById('equipo2').value,
        document.getElementById('equipo3').value,
        document.getElementById('equipo4').value,
        document.getElementById('equipo5').value,
    ].filter(color => color);

    const availableColors = allColors.filter(color => !selectedColors.includes(color));

    // Actualiza las opciones en los select
    [document.getElementById('equipo1'), document.getElementById('equipo2'), document.getElementById('equipo3'), document.getElementById('equipo4'), document.getElementById('equipo5')].forEach(select => {
        for (let i = 1; i < select.options.length; i++) {
            const option = select.options[i];
            option.style.display = availableColors.includes(option.value) ? 'block' : 'none';
        }
    });
}

function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('https://script.google.com/macros/s/AKfycbx-0MapYQ5iQQn2SAKgJcMiLjDnQlCqrRDc2dNB_e7ZQdkLhLmcHtvcTFV1QQQcD7qN/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        alert('Encuesta enviada con éxito!');
        event.target.reset();
        updateOptions(); // Reset options
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar la encuesta.');
    });
}