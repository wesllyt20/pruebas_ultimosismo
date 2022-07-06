<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Agregar nuevo Sismo</div>
      <div class="card-body">
        <form v-on:submit.prevent="agregarSismo">

          <div class="form-group">
            <label for="latitud" >LATITUD:</label>
            <input
              type="text"
              class="form-control"
              name="latitud"
              v-model="sismo.latitud"
              id="latitud"
              aria-describedby="helpId"
              placeholder=""
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe la latitud</small
            >
          </div>

          <div class="form-group">
            <label for="longitud">LONGITUD:</label>
            <input
              type="text"
              class="form-control"
              name="longitud"
              v-model="sismo.longitud"
              id="longitud"
              aria-describedby="helpId"
              placeholder=""
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe la longitud</small
            >
          </div>

          <div class="form-group">
            <label for="profundidad">PROFUNDIDAD:</label>
            <input
              type="text"
              class="form-control"
              name="profundidad"
              v-model="sismo.profundidad"
              id="profundidad"
              aria-describedby="helpId"
              placeholder=""
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe la profundidad</small
            >
          </div>

          <div class="form-group">
            <label for="intensidad">INTENSIDAD:</label>
            <input
              type="text"
              class="form-control"
              name="intensidad"
              v-model="sismo.intensidad"
              id="intensidad"
              aria-describedby="helpId"
              placeholder=""
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe la intensidad</small
            >
          </div>

          <div class="form-group">
            <label for="referencia">REFERENCIA:</label>
            <input
              type="text"
              class="form-control"
              name="referencia"
              v-model="sismo.referencia"
              id="referencia"
              aria-describedby="helpId"
              placeholder=""
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe la referencia</small
            >
          </div>

          <div class="btn-group" role="group" aria-label="">
            <button type="submit" class="btn btn-success">Agregar</button>

            <router-link :to="{ name: 'mapafinal' }" class="btn btn-warning"
              >Cancelar</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "CrearSismos",
      sismo: {},
    };
  },
  methods: {
    agregarSismo() {
      console.log(this.sismo);
      var datosEnviar = {
        latitud: this.sismo.latitud,
        longitud: this.sismo.longitud,
        profundidad: this.sismo.profundidad,
        intensidad: this.sismo.intensidad,
        referencia: this.sismo.referencia,
      };

      fetch("http://localhost/sismos/?insertar=1", {
        method: "POST",
        body: JSON.stringify(datosEnviar),
      })
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          window.location.href = "mapafinal";
        });
    },
  },
};
</script>
<style>
.form-group{
    font-weight: bold;
}
.card-header{
    font-weight: bold;
    font-size: x-large;
    

}
</style>
