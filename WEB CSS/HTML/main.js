
    function saludo() {
      alert("¡Bienvenido al test futbolero!");
    }

    function enviarFormulario(event) {
      event.preventDefault();
      alert("Formulario enviado correctamente. ¡Gracias por participar!");
      document.getElementById("futbolForm").reset();
    }
