<template>
  <div class="container" id="contenedor">
    <h2 id="titulo">Ultimo Sismo</h2>
    <form
      :key="index"
      v-for="(sismo, index) in sismos2"
      v-on:submit.prevent="actualizarSismo"
    >
      <div class="row">
        <div class="col-2">
          <div class="text-center">
            <h2 id="inten">{{ sismo.intensidad }}</h2>
          </div>
        </div>
        <div class="col-10">
          <h3 id="referr">Referencia:</h3>
          <h3>
            {{ sismo.referencia }}
          </h3>
        </div>
      </div>
      <h1 class="Referencia"></h1>

      <l-map
        style="height: 600px"
        :zoom="zoom"
        :center="[sismo.latitud, sismo.longitud]"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="[sismo.latitud, sismo.longitud]">
          <l-popup>
            <h5 class="text-primary m-0 font-weight-bold">
              {{ sismo.referencia }}
            </h5>
            <br />
            <b> Latitud: </b> {{ sismo.latitud }} <br />
            <b> Longitud </b> {{ sismo.longitud }}
          </l-popup>
        </l-marker>
      </l-map>
      <div class="container">
        <h2 id="bott">Latitud: {{ sismo.latitud }} | Longitud: {{sismo.longitud}} | Profundidad: {{sismo.profundidad}}</h2>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 7,
      center: [47.31322, -1.319482],
      sismos2: [],
    };
  },

  mounted: function () {
    axios.get("http://localhost/sismos/?ultimo-sismo").then((r) => {
      this.sismos2 = r.data;
    });
  },

  methods: {
    coordenadas(lat, long) {
      return L.latLng(lat, long);
    },
  },
};
</script>

<style>
#bott {
  align-items: center;
  text-align: center;
  margin: 0px auto;
  padding: 0%;
  position: relative;
  top: 15px;
    font-family: "Comic Sans", "Verdana", "Monaco", sans-serif;
  font-weight: bold;
}
#contenedor {
  background-color: #00ff0d;
  border-radius: 20px;
  border: solid;
  border-color: #000000;
  width: 100%;
  padding: 25px 10px;
}

#referr {
  font-family: "Comic Sans", "Verdana", "Monaco", sans-serif;
  font-weight: bold;
  color: #000;
}
#inten {
  border-radius: 100%;
  background: red;
  border-color: #fff;
  color: #fff;
  border-style: solid;
  float: left;
  align-items: center;
  text-align: center;
  margin: 0px auto;
  padding: 15%;
  position: relative;
  top: -15px;
  left: 45px;
  font-weight: bold;
}
#titulo {
  color: #000;
  float: inherit;
  background-color: #00ff0d;
  margin: auto;
  text-align: center;
  font-size: 70px;
  position: static;
  padding: 1%;
  font-family: FuturaStd_Book, Arial, Helvetica, Poppins;
  font-weight: bold;
  font-family: "Comic Sans", "Verdana", "Monaco", sans-serif;
}
#refeTit {
  color: #fff;
  float: left;
  padding: 0%;
  text-indent: 10px;
  font-size: x-large;
}

</style>