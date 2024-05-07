const URL_BASE = "http://localhost:3000/apiV1/datos";
const inputEmail = document.querySelector("#email");
const inputNombre = document.querySelector("#nombre");
const inputPassword = document.querySelector("#password");
const inputPassword2 = document.querySelector("#password2");
const inputAnosExp = document.querySelector("#anos_experiencia");
const inputEspecialidad = document.querySelector("#especialidad");
const mensaje = document.querySelector("#mensaje");
const actualizarBtn = document.querySelector("#actualizar");
const eliminarBtn = document.querySelector("#eliminar");
const salirBtn = document.querySelector("#logout");

actualizarBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await editDatos();
  await getDatos();
});

eliminarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteDatos();
});

salirBtn.addEventListener("click", () => {
  loggedOut();
});

if ( window.location.href.includes("/client/views/datos.html") && !sessionStorage.getItem("token")) {
  location.replace("/client/views/index.html");
}

const getDatos = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const loggedIn = sessionStorage.getItem("id");
    const response = await axios.get(`${URL_BASE}?token=${token}&id=${loggedIn}`);

    if (response.status === 200) {
      inputEmail.value = response.data.datos.result.map((data) => data.email);
      inputNombre.value = response.data.datos.result.map((data) => data.nombre);
      inputPassword.value = response.data.datos.result.map((data) => data.password);
      inputPassword2.value = response.data.datos.result.map((data) => data.password);
      inputAnosExp.value = response.data.datos.result.map((data) => data.anos_experiencia);
      inputEspecialidad.value = response.data.datos.result.map((data) => data.especialidad);
    } else {
      sessionStorage.deleteItem("token");
      sessionStorage.deleteItem("id");
      mensaje = "";
      mensaje.innerHTML += `<p>Error al obtener datos</p>`;
      setTimeout(() => {
        location.replace("/client/views/login.html");
      }, 3000);
    }
  } catch (error) {
    mensaje.innerHTML += `<p>Error al obtener datos, vuelve a iniciar sesion</p>`;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    console.error("Error en Login: " + error);
    setTimeout(() => {
      location.replace("/client/views/login.html");
    }, 3000);
  }
};

const editDatos = async () => {
  try {
    limpiarMsjDatos(mensaje);
    const nombreRegex = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ]+$/;
    const especialidadRegex = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ\d]+$/;
    if (!nombreRegex.test(inputNombre.value)) {
      mensaje.innerHTML += `<p class="mt-3 fs-5 text-black">El nombre solo debe contener letras y espacios</p>`;
      setTimeout(() => {
        limpiarMsjDatos(mensaje);
      }, 3000);
      return;
    }
    if (inputPassword.value !== inputPassword2.value) {
      mensaje.innerHTML += `<p class="mt-3 fs-5 text-black">Las contraseñas ingresadas no son iguales</p>`;
      setTimeout(() => {
        limpiarMsjDatos(mensaje);
      }, 3000);
      return;
    }
    if (password.value.length < 8 || password.value.length > 25 || password2.value.length < 8 || password2.value.length > 25) {
      mensaje.innerHTML += `<p class="mt-3 fs-5 text-black">La contraseña debe tener entre 8 y 25 carácteres</p>`;
      setTimeout(() => {
          limpiarMsjDatos(mensaje);
      }, 3000);
      return;
    }
    if (!especialidadRegex.test(inputEspecialidad.value)) {
      mensaje.innerHTML += `<p class="mt-3 fs-5 text-black">Las especialidad no puede contener carácteres especiales</p>`;
      setTimeout(() => {
        limpiarMsjDatos(mensaje);
      }, 3000);
      return;
    }

    const token = sessionStorage.getItem("token");
    const loggedIn = sessionStorage.getItem("id");
    let data = {
      nombre: inputNombre.value,
      password: inputPassword.value,
      anos_experiencia: inputAnosExp.value,
      especialidad: inputEspecialidad.value,
      id: loggedIn,
    };
    const response = await axios.put(`${URL_BASE}?token=${token}`, data);
    console.log(response);
  } catch (error) {
    mensaje.innerHTML += `<p>Error al editar datos, vuelve a iniciar sesion</p>`;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    console.error("Error en Login: " + error);
    setTimeout(() => {
      location.replace("/client/views/login.html");
    }, 3000);
  }
};

const deleteDatos = async () => {
  const token = sessionStorage.getItem("token");
  const loggedIn = sessionStorage.getItem("id");
  const response = await axios.delete(`${URL_BASE}?token=${token}&id=${loggedIn}`);
  console.log(response);
  if(response.status === 204) {
    mensaje.innerHTML += `<p class="text-black m-3">Token caducado, vuelve a iniciar sesión</p>`;
    setTimeout(() => {
      loggedOut();
    }, 2000);
  } else {
    mensaje.innerHTML += `<p class="text-black m-3">${response.data.message}</p>`;
    setTimeout(() => {
      loggedOut();
    }, 2000);
  }
};

const loggedOut = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("id");
  location.replace("/client/views/login.html");
};

const limpiarMsjDatos = (mensaje) => {
  while (mensaje.firstChild) {
    mensaje.removeChild(mensaje.firstChild);
  }
};

getDatos();
