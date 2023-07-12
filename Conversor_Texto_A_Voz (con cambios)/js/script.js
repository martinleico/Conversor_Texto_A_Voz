//veo si los elementos estan disponibles antes de acceder a ellos con el evento DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
  const hablarBtn = document.getElementById('hablar');
  const vozSelect = document.getElementById('voz');

  
  // Evento click del botón "Enviar"
  hablarBtn.addEventListener('click', () => {
    const texto = document.getElementById('texto').value;
    const vozSeleccionada = vozSelect.value;
    const velocidad = parseFloat(document.getElementById('velocidad').value);
     const volumen = parseFloat(document.getElementById('volumen').value);
  const tonalidad = parseFloat(document.getElementById('tonalidad').value);

    decir(texto, vozSeleccionada, velocidad, volumen, tonalidad);
    
  });
  
  // Obtener las voces disponibles al cargar la página
  speechSynthesis.onvoiceschanged = () => {
    cargarVoces();
  };
  
  // Cargo las voces en el elemento select
  function cargarVoces() {
    const voces = speechSynthesis.getVoices();
    
    if (voces.length === 0) {
      // Si no se cargaron las voces, intentara cargarlas de nuevo en un retraso de 100 ms.
      setTimeout(cargarVoces, 100);
      return;
    }
    
    voces.forEach(voz => {
      const opcion = document.createElement('option');
      opcion.textContent = voz.name;
      opcion.value = voz.name;
      vozSelect.appendChild(opcion);
    });
  }
  
  // Función para que se diga el texto utilizando la voz y la velocidad que se definio por el usuario.
  function decir(texto, vozSeleccionada, velocidad, volumen, tonalidad) {
    const mensaje = new SpeechSynthesisUtterance(texto);
  
    if (vozSeleccionada) {
      const voces = speechSynthesis.getVoices();
      const voz = voces.find(v => v.name === vozSeleccionada);
      mensaje.voice = voz;
    }
  
    if (velocidad) {
      mensaje.rate = velocidad;
    }
    if (volumen) {
    mensaje.volume = volumen;
  }

  if (tonalidad) {
    mensaje.pitch = tonalidad;
  }
  
    speechSynthesis.speak(mensaje);
  }

});



