<template>

  <div id="nav navbar-nav ">
   <nav class="navbar navbar-dark bg-dark mb-5">
     <div class="container">
       <router-link to="/listarsismos" class="navbar-brand text-secondary"><b><i class="fa-solid fa-earth-americas"></i> Murphy Sismos v.1.0</b></router-link>
       <router-link to="/crearsismos" class="btn btn-success">Agregar ultimo sismo</router-link>
      <router-link to="/listarsismos" class="text-white ">Lista Sismos</router-link>

     </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
</script>
<style>

</style>