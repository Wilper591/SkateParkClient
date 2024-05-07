const URL_BASE = "https://skateparkserver.onrender.com/apiV1/admin/login";
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const ingresarBtn = document.querySelector("#ingresarAdmin");
let errorMsj = document.querySelector("#errorMsj");

ingresarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginAdmin();
});

const loginAdmin = async () => {
  try {
    limpiarMsjLoginAdmin(errorMsj);
    if (inputEmail.value === "" || inputPassword.value === "") {
      errorMsj.innerHTML += `<p class="mt-4">Ingresa un email y/o password</p>`;
      setTimeout(() => {
        limpiarMsjLoginAdmin(errorMsj);
      }, 3000);
      return;
    }

    const data = await axios.get(`${URL_BASE}?email=${inputEmail.value}&password=${inputPassword.value}`);

    if (data.status === 204) {
      errorMsj.innerHTML += `<p>Usuario o contraseña incorrectos</p>`;
      setTimeout(() => {
        limpiarMsjLoginAdmin(errorMsj);
      }, 3000);
      return;
    } else {
      const DBuser = String(data.data.loginAdmin.result.map(data => data.email));
      const DBpass = String(data.data.loginAdmin.result.map(data => data.password));
      const token = data.data.token;
      const isAdmin = data.data.is_Admin;

      if (inputEmail.value === DBuser && inputPassword.value === DBpass) {
        sessionStorage.setItem("token", `${token}`);
        sessionStorage.setItem("admin", `${isAdmin}`);
        window.location.replace("./Admin.html");
      } else {
        errorMsj.innerHTML += `<p>Validación de datos errónea</p>`;
        setTimeout(() => {
          limpiarMsjLoginAdmin(errorMsj);
        }, 3000);
        return;
      }
    }
  } catch (error) {
    errorMsj.innerHTML += `<p>Usuario o contraseña incorrectos</p>`;
    setTimeout(() => {
      limpiarMsjLoginAdmin(errorMsj);
    }, 3000);
    console.error("Error en Login: " + error);
  }
};

const limpiarMsjLoginAdmin = (mensaje) => {
  while (mensaje.firstChild) {
    mensaje.removeChild(mensaje.firstChild);
  }
};
