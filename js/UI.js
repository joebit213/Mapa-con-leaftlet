class UI {
  constructor() {

      //instanciar la API
      this.api = new API()

      //crear los markers con layerGroup
      this.markers = new L.LayerGroup()

      //iniciar el mapa
      this.mapa = this.inicializarMapa();

  }

  inicializarMapa() {
       // Inicializar y obtener la propiedad del mapa
       const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
       const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
       L.tileLayer(
           'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; ' + enlaceMapa + ' Contributors',
           maxZoom: 18,
           }).addTo(map);
       return map;

  }

  mostrarEstablecimientos() {
    this.api.obtenerDatos()
    .then(datos => {
      console.log(datos)
      const resultado = datos.results

      //ejecutar la funcion para mostrar los pines
      this.mostrarPines(resultado)
    })
  }

  mostrarPines(datos) {
    //limpiar los markers -- siempre se limpiena los markes antes de llamarlos
    this.markers.clearLayers()

    //recorrer los establecimientos
    datos.forEach(datos => {
      //destructuring
      const {latitude, longitude, calle, regular, premium} = datos;

      //crear nuevo POPUP
      const opcionesPopUp = L.popup()
            .setContent(`
              <p>Calle: ${calle}</p>
              <p><b>Regular: ${regular}</b></p>
              <p><b>Premium: ${premium}</b></p>
            `)

      //agregar el PIN
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopUp)
      this.markers.addLayer(marker)
    })

    this.markers.addTo(this.mapa)

  }

  obtenerSugerencias(busqueda) {
    this.api.obtenerDatos()
    .then(datos => {
      //obtener los datos
      const resultados = datos.results
      //console.log(resultados)

      //enviar el JSON y la busqueda para el filtrado
      this.filtrarSugerencias(resultados, busqueda)
    })
  }

  //filtrar las sugerencias en base al input

  filtrarSugerencias(resultado, busqueda) {
    //filtrar con .filter
    //.filter recorre cada objeto, le decimos que encuentre calle y con idexOf nos va a decir si lo que estamos buscando concuerda
    //si lo encuentra va a retornarnos la posicion en la que se encuentra, si no lo encuentra nos va a retornar -1

    //.filter itera en cada uno de los regstros y trae lo que le definas (!== -1)
    const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1)
    console.log(filtro)
    //mostrar los pines
    this.mostrarPines(filtro)
  }

}