const URL_BASE = "https://skateparkserver.onrender.com/apiV1/registro";
/* const URL_BASE = "http://localhost:3000/apiV1/registro"; */

let emailInput = document.querySelector("#email");
let nombreInput = document.querySelector("#nombre");
let password = document.querySelector("#password");
let password2 = document.querySelector("#password2");
let anos_experiencia = document.querySelector("#anos_experiencia");
let especialidadInput = document.querySelector("#especialidad");
const foto = document.querySelector('input[type="file"]');
const registrarBtn = document.querySelector("#registro");
const errorMsj = document.querySelector("#errorMsj");

registrarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registrarSkater();
});

const registrarSkater = async () => {
  try {
    limpiarMsjRegistro(errorMsj);

    const nombreRegex = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ]+$/;
    const especialidadRegex = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ\d]+$/;
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const anosExpRegex = /^\d+$/;
    
    let email = emailInput.value.toLowerCase();
    let nombre = nombreInput.value.toLowerCase().replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });
    let especialidad = especialidadInput.value.toLowerCase().replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });

    if (
      email === "" ||
      nombre === "" ||
      password.value === "" ||
      password2.value === "" ||
      anos_experiencia.value === "" ||
      especialidad === ""
    ) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Debes rellenar todos los campos</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (foto.value === "") {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Debes cargar una foto de perfil</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (!emailRegex.test(email)) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Ingresa un email válido</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (!nombreRegex.test(nombre)) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">El nombre solo debe contener letras y espacios</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (password.value !== password2.value) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Las contraseñas ingresadas no son iguales</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (
      password.value.length < 8 ||
      password.value.length > 25 ||
      password2.value.length < 8 ||
      password2.value.length > 25
    ) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">La contraseña debe tener entre 8 y 25 carácteres</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (!anosExpRegex.test(anos_experiencia.value)) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Solo puedes ingresar números en años de experiencia</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (!especialidadRegex.test(especialidad)) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Las especialidad no puede contener carácteres especiales</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    console.log(email);
    console.log(nombre);
    console.log(especialidad);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("nombre", nombre);
    formData.append("password", password.value);
    formData.append("anos_experiencia", anos_experiencia.value);
    formData.append("especialidad", especialidad);
    formData.append("foto", foto.files[0]);

    const response = await axios.post(`${URL_BASE}`, formData);
    console.log(response);
    if (response.data.status === "Success") {
      location.replace("./Login.html");
    } else {
      errorMsj = "";
      errorMsj.innerHTML += "Error al crear usuario";
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
    }
  } catch (error) {
    console.error("Error: ", error.message);
    console.error("Error en registro: " + error);
  }
};

const limpiarMsjRegistro = (mensaje) => {
  while (mensaje.firstChild) {
    mensaje.removeChild(mensaje.firstChild);
  }
};
