var fs = require("fs");
var configTmp = {};

exports.GENERAL = {
  puertoWeb: null,
  puertoServidor: null,
};

exports.LOG = {
  ruta: null,
  activo: null,
};

exports.DATABASE = {
  user: null,
  password: null,
  server: null,
  database: null,
  options:{
    enableArithAbort:null
  }
}

exports.SESION = {
  tokenSecret: null,
  tiempo: null,
  tiempoUnidad: null
}




/**
 * Carga en memoria la configuración del sistema (Se debe correr al inicio del hilo)
 */
exports.cargarConfiguracion = function () {
  configTmp = leerArchivoConfiguracion();

  try {
    this.GENERAL.puertoWeb = configTmp.GENERAL.puertoWeb;
    this.GENERAL.puertoServidor = process.env.PORT || configTmp.GENERAL.puertoServidor;

    this.LOG.ruta = configTmp.LOG.ruta;
    this.LOG.activo = configTmp.LOG.activo;

    this.DATABASE.user = configTmp.DATABASE.user;
    this.DATABASE.password = configTmp.DATABASE.password;
    this.DATABASE.server = configTmp.DATABASE.server;
    this.DATABASE.database = configTmp.DATABASE.database;
    this.DATABASE.options = configTmp.DATABASE.options;

    this.SESION.tokenSecret = configTmp.SESION.tokenSecret;
    this.SESION.tiempo = configTmp.SESION.tiempo;
    this.SESION.tiempoUnidad = configTmp.SESION.tiempoUnidad;


    
    return this;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Accede al fichero de configuración "/config.json" y retorna un objeto
 */
function leerArchivoConfiguracion() {
  try {
    var archivoConfiguracion = {};
    let cjson = fs.readFileSync(__dirname + "/../config.json");
    archivoConfiguracion = JSON.parse(cjson);
  } catch (e) {
    if (e.toString().indexOf("SyntaxError") >= 0) {
      console.log("ERROR en el formato del archivo './config'");
      return 0;
    } else {
      console.log("No se pudo leer el archivo de configuración.");
    }
  }
  return archivoConfiguracion;
}
