class API {
    async obtenerDatos() {

        //limite de mis resultados
        const total = 1000
        //obtener los datos desde la api
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`)

        //retornar los datos como json
        const respuestaJSON = await datos.json()

        return respuestaJSON
    }
}