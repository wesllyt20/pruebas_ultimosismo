<template>
  <div >
    <div class="container" id="mapa">
      <router-link to="/crearsismos" class="btn btn-danger"
        >Agregar ultimo sismo</router-link
      >
      <div class="card-header" id="titulo">
        ULTIMO SISMO REGISTRADO
        <form v-on:submit.prevent="actualizarSismo">
          <div>
            <h1 class="Intensidad" id="inten">{{sismo.intensidad}}</h1>
          </div>
          <h1 class="Referencia" id="contenedorrefe">
            <b id="refeTit">Referencia:</b>
            <b id="referencia">{{sismo.referencia}}</b>
          </h1>
          <l-map
            :zoom="zoom"
            :center="center"
            style="height: 500px; width: 100%"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-geo-json
              v-if="show"
              :geojson="geojson"
              :options="options"
              :options-style="styleFunction"
            />
            <l-marker :lat-lng="marker" />
          </l-map>
        </form>
      </div>
    </div>
<div class="container" id="bott">
  <h1 class="Intensidad" id="">Latitud:{{sismo.latitud}} | Longitud:{{sismo.longitud}} | Profundidad:{{sismo.profundidad}}</h1> 
</div>
  </div>

</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 6,
      center: [-10.39, -79.24],
      geojson: null,
      fillColor: "#e4ce7f",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(-10.39, -79.24),
      sismo: {},
    };
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1,
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>code:" +
            feature.properties.code +
            "</div><div>nom: " +
            feature.properties.nom +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    },
  },
  async created() {
    this.loading = true;
    const response = await fetch(
      "https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson"
    );
    this.obtenerInformacionID();

    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  },

  // created: function () {
  //    this.obtenerInformacionID();
  //   }
  methods: {
    obtenerInformacionID() {
      fetch("http://localhost/sismos/?consultar=" + this.$route.params.id)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.sismo = datosRespuesta[0];
        })
        .catch(console.log);
    },
    actualizarSismo() {
      var datosEnviar = {
        id: this.$route.params.id,
        latitud: this.sismo.latitud,
        longitud: this.sismo.longitud,
        profundidad: this.sismo.profundidad,
        intensidad: this.sismo.intensidad,
        referencia: this.sismo.nombre,
      };

      fetch(
        "http://localhost/empleados-main/?actualizar=" + this.$route.params.id,
        {
          method: "POST",
          body: JSON.stringify(datosEnviar),
        }
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          window.location.href = "../listar";
        });
    },
  },
};
</script>


<style>
#bott{
    align-items: center;
  text-align: center;
  margin: 0px auto;
  padding: 2%;
  position: relative;
  top: -15px;
}
#mapa {
  background-color: rgb(7, 214, 52);
  border-radius: 20px;
  width: 100%;
  padding: 25px 10px;
}
#inten {
  border-radius: 50%;
  background: red;
  border-color: #fff;
  color: #fff;
  border-style: solid;
  float: left;

  align-items: center;
  text-align: center;
  margin: 0px auto;
  padding: 2%;
  position: relative;
  top: -15px;
}
#titulo {
  color: #fff;
  float: inherit;
  background-color: rgb(7, 214, 52);
  margin: auto;

  text-align: center;
  font-size: xx-large;
}
#refeTit {
  color: #fff;
  float: left;
  padding: 0%;
  text-indent: 10px;
    font-size: x-large;
}
#referencia {
  font-size: large;
  color: #fff;
  font-size: x-large;
   line-height:190%;

  text-indent: -120px;
  float: left;

  margin: -1px auto;
  padding: 2px;
  line-height: 290%;

  padding: 1%;
}
</style>
