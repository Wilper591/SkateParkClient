const URL_BASE = "https://skateparkserver.onrender.com/apiV1/login";
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const ingresarBtn = document.querySelector("#ingresar");
let errorMsj = document.querySelector("#errorMsj");

ingresarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

const login = async () => {
  try {
    limpiarMsjLogin(errorMsj);
    if (inputEmail.value === "" || inputPassword.value === "") {
      errorMsj.innerHTML += `<p class="mt-4">Ingresa un email y/o password</p>`;
      setTimeout(() => {
        limpiarMsjLogin(errorMsj);
      }, 3000);
      return;
    }

    const data = await axios.get(`${URL_BASE}?email=${inputEmail.value}&password=${inputPassword.value}`);

    const token = data.data.token;
    const DBid = String(data.data.loginData.result.map(data => data.id))
    const DBuser = String(data.data.loginData.result.map((data) => data.email));
    const DBpass = String(data.data.loginData.result.map((data) => data.password));

    if (inputEmail.value === DBuser && inputPassword.value === DBpass) {
      sessionStorage.setItem("token", `${token}`);
      sessionStorage.setItem("id", `${DBid}`);
      window.location.replace("./Datos.html");
    }
  } catch (error) {
    errorMsj.innerHTML += `<p class="mt-4">Usuario o contraseña incorrectos</p>`;
    setTimeout(() => {
      limpiarMsjLogin(errorMsj);
    }, 3000);
    return;
  }
};

const limpiarMsjLogin = (mensaje) => {
  while (mensaje.firstChild) {
    mensaje.removeChild(mensaje.firstChild);
  }
};
