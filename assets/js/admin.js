const URL_BASE = "https://skateparkserver.onrender.com/apiV1/admin";
const skaters = document.querySelector("#skaters");
const btnLogout = document.querySelector("#logout");
const tabla = document.querySelector("#tablaSkaters");

tabla.addEventListener("click", async (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    const estado = e.target.checked;
    const id = e.target.dataset.id;
    await updateState(estado, id);
  }
});

btnLogout.addEventListener("click", () => {
  logoutAdmin();
});

if (window.location.href.includes("/SkateParkClient/Admin.html") && !sessionStorage.getItem("token") && !sessionStorage.getItem("admin")) {
  location.replace("./Login.html");
}

const getSkatersAdmin = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${URL_BASE}?token=${token}`);
    response.data.datos.list.forEach((user, i) => {
      let skaterEstado = "";
      if (user.estado === false) {
        skaterEstado += `<td><input type="checkbox" data-id="${user.id}" /></td>`;
      } else {
        skaterEstado += `<td><input type="checkbox" data-id="${user.id}" checked /></td>`;
      }
      skaters.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td><img src="${user.foto}" alt="${user.nombre}"></td>
          <td>${user.nombre}</td>
          <td>${user.anos_experiencia}</td>
          <td>${user.especialidad}</td>
          ${skaterEstado}
        </tr>`;
    });
    if (!response.data.is_Admin) {
      logoutAdmin();
    } else {
      return;
    }
  } catch (error) {
    logoutAdmin();
    console.error("Error en Login: " + error);
  }
};

const updateState = async (estado, id) => {
  try {
    const token = sessionStorage.getItem("token");
    const data = {
      estado,
      id,
      token,
    };
    const response = await axios.put(`${URL_BASE}`, data);
    if (!response.data.is_Admin) {
      logoutAdmin();
    } else {
      return
    }
  } catch (error) {
    logoutAdmin();
    console.error("Error en Login: " + error);
  }
};

const logoutAdmin = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("admin");
  location.replace("./LoginAdmin.html");
};
getSkatersAdmin();
