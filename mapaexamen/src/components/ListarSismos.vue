<template>
  <div class="container">

          <router-link to="/crearsismos" class="btn btn-success">Agregar ultimo sismo</router-link>
    <div class="card">
      <div class="card-header">SISMOS</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Profundidad</th>
              <th>Intensidad</th>
              <th>Referencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sismo in sismos" :key="sismo.id">
              <td>{{ sismo.id }}</td>
              <td>{{ sismo.latitud }}</td>
              <td>{{ sismo.longitud }}</td>
              <td>{{ sismo.profundidad }}</td>
              <td>{{ sismo.intensidad }}</td>
              <td>{{ sismo.referencia }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link
                    :to="{ name: 'MapaFinal', params: { id: sismo.id } }"
                    class="btn btn-info"
                    >Visualizar</router-link
                  >
                  <button
                    type="button"
                    v-on:click="borrarSismo(sismo.id)"
                    class="btn btn-danger"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sismos: [],
    };
  },

  created: function () {
    this.consultarSismos();
  },
  methods: {
    consultarSismos() {
      fetch("http://localhost/sismos/")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.sismos = [];
          if (typeof datosRespuesta[0].success === "undefined") {
            this.sismos = datosRespuesta;
          }
        })
        .catch(console.log);
    },
    borrarSismo(id) {
      console.log(id);
      fetch("http://localhost/sismos/?borrar=" + id)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          window.location.href = "listarsismos";
        })
        .catch(console.log);
    },
  },
};
</script>
