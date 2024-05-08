const URL_BASE = "https://skateparkserver.onrender.com/apiV1/registro";
/* const URL_BASE = "http://localhost:3000/apiV1/registro"; */

const email = document.querySelector("#email");
const nombre = document.querySelector("#nombre");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const anos_experiencia = document.querySelector("#anos_experiencia");
const especialidad = document.querySelector("#especialidad");
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

    if (email.value === "" || nombre.value === "" || password.value === "" || password2.value === "" || anos_experiencia.value === "" || especialidad.value === "") {
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
    if (!emailRegex.test(email.value)) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Ingresa un email válido</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }
    if (!nombreRegex.test(nombre.value)) {
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
    if (password.value.length < 8 || password.value.length > 25 || password2.value.length < 8 || password2.value.length > 25) {
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
    if (!especialidadRegex.test(especialidad.value)) {
      errorMsj.innerHTML += `<p class="mt-3 fs-5 text-black">Las especialidad no puede contener carácteres especiales</p>`;
      setTimeout(() => {
        limpiarMsjRegistro(errorMsj);
      }, 3000);
      return;
    }

    let formData = new FormData();
    formData.append("email", email.value);
    formData.append("nombre", nombre.value);
    formData.append("password", password.value);
    formData.append("anos_experiencia", anos_experiencia.value);
    formData.append("especialidad", especialidad.value);
    formData.append("foto", foto.files[0]);

    const response = await axios.post(`${URL_BASE}`, formData);

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
