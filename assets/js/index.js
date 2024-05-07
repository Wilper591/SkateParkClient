const URL_BASE = "https://skateparkserver.onrender.com/apiV1/main";
const skaters = document.querySelector(".skaters");

const getSkaters = async () => {
  try {
    const response = await axios.get(`${URL_BASE}`);
    response.data.list.forEach((user, i) => {
      let skaterEstado = "";
      if (user.estado === false) {
        skaterEstado += `<td class="text-warning fw-bold">En Revisión</td>`;
      } else {
        skaterEstado += `<td class="text-success fw-bold">Aprobado</td>`;
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
  } catch (error) {
    console.error("Error: " + error.message);
  }
};
getSkaters();
