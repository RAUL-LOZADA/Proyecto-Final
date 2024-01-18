const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');   // cross origin


const { ficha1 } = require("./model_ficha");

const app = express();

app.use(express.json());

app.use(cors());

const path = __dirname + '/views/';
app.use(express.static(path));
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});



//01** Muestra todos los documentos de la tabla **/
app.get("/fichaestu", async (req, res) => {
  try {
    const allficha = await ficha1.find();
    return res.status(200).json(allficha);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });

  }
});

//02** Adiciona documento en la tabla - form **/
app.post("/fichaestu", async (req, res) => {
  const newAdi = new ficha1({ ...req.body });
  const insertedAdi = await newAdi.save();
  return res.status(201).json(insertedAdi);
});

//03** Elimina documento de la tabla - form **/
app.delete("/fichaestu/:id", async (req, res) => {
  const { id } = req.params;
  const deletedficha1= await ficha1.findByIdAndDelete(id);
  return res.status(200).json(deletedficha1);
});


//04** Muestra de la tabla documentos segun nro de celular de emergencia */
app.get("/fichaestu0/:celular", async (req, res) => {
  try {
    const { celular } = req.params;

    // Construir el objeto de filtro basado en el código proporcionado
    const filtro = { fi_celuapoderado: celular };

    // Utilizar findOne para obtener un solo documento
    const resultado = await ficha1.findOne(filtro).select('fi_nombre fi_apepat fi_celuapoderado fi_direstu fi_nombrepapa fi_nombremama fi_alergia');

    if (resultado) {
      // Se encontró un documento con éxito
      return res.status(200).json(resultado);
    } else {
      // No se encontró ningún documento
      return res.status(404).json({ message: "No se encontró ningún documento con el código proporcionado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});



//05** Muestra de la tabla documento segun su nombre y apellido paterno **/
app.get("/fichaestu1/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombre) {
      filtro.fi_nombre = nombre;
    }
    if (apellido) {
      filtro.fi_apepat = apellido;
    }

    // Utilizar findOne en lugar de find
    const resultado = await ficha1.findOne(filtro).select('fi_nombre fi_apepat');

    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//06** Busca por codigo del estudiante y nos muestra sus nombres celeular y direccion */
app.get("/fichaestu2/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;
    // Construir el objeto de filtro basado en el código proporcionado
    const filtro = { fi_codestu: codigo };
    // Utilizar findOne para obtener un solo documento
    const resultado = await ficha1.findOne(filtro).select('fi_nombre fi_apepat fi_celuapoderado fi_direstu');
    if (resultado) {
      // Se encontró un documento con éxito
      return res.status(200).json(resultado);
    } else {
      // No se encontró ningún documento
      return res.status(404).json({ message: "No se encontró ningún documento con el código proporcionado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//07** Muestra de la tabla varios documentos segun su nombre y apellido paterno **/
app.get("/fichaestu3/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;

           // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombre) {
      filtro.fi_nombre = nombre;
    }
    if (apellido) {
      filtro.fi_apepat = apellido;
    }
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_gradodoc fi_celuapoderado');
    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//08** Muestra de la tabla varios documentos segun su nombre,apellido paterno, grado de estu y edad **/
app.get("/fichaestu4/:nombre/:apellido/:grado/:edad", async (req, res) => {
  try {
    const { nombre, apellido, grado, edad } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombre) {
      filtro.fi_nombre = nombre;
    }
    if (apellido) {
      filtro.fi_apepat = apellido;
    }
    if (grado) {
      filtro.fi_gradodoc = grado;
    }
    if (nombre) {
      filtro.fi_edad = edad;
    }

    // Utilizar find en lugar de findOne para obtener múltiples documentos
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_gradodoc fi_edad');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//09** Ingresa nombre y apellido del alumno y muestra datos de los padres celu y otros **/
app.get("/fichaestu5/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;
    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombre) {
      filtro.fi_nombre = nombre;
    }
    if (apellido) {
      filtro.fi_apepat = apellido;
    }
    // Seleccionar también los campos de los padres
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_nombrepapa fi_nombremama fi_celuapoderado fi_alergia fi_direstu');
    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//10** ingresa nombre y apellido del estudiante y muestra celular, grado y edad del estu.*/
app.get("/fichaestu6/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombre) {
      filtro.fi_nombre = nombre;
    }
    if (apellido) {
      filtro.fi_apepat = apellido;
    }

    // Seleccionar los campos específicos del alumno
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_celuapoderado fi_gradodoc fi_edad');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//11** ingresa nombre del padre y muestra los datos del estudiante **/
app.get("/fichaestu7/:nombrepapa", async (req, res) => {
  try {
    const { nombrepapa } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombrepapa) {
      filtro.fi_nombrepapa = nombrepapa;
    }

    // Seleccionar los campos específicos del estudiante
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_gradodoc');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//12** Actualiza codigo del estudiante segun nombre y apellido del alumno ***//

app.patch("/fichaestu/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;
    const { fi_codestu } = req.body;
// Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
        if (nombre) {
           filtro.fi_nombre = nombre;
        }
        if (apellido) {
           filtro.fi_apepat = apellido;
        }
    
    const actualizacion = { $set: { fi_codestu } };

    const resultado = await ficha1.updateOne(filtro, actualizacion);

    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

//13** Elimina documento segun nombre del estudiante (deleteone)*/
app.delete("/fichaestu8/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = { fi_nombre: nombre };

    // Eliminar el documento con el nombre proporcionado
    const resultado = await ficha1.deleteOne(filtro);

    if (resultado.deletedCount > 0) {
      // Documento eliminado con éxito
      return res.status(200).json({ message: "Documento eliminado con éxito." });
    } else {
      // No se encontró el documento
      return res.status(404).json({ message: "No se encontró ningún documento para eliminar." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//14** Elimina documento segun nombre y apellido del alumno **/
app.delete("/fichaestu9/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = { fi_nombre: nombre, fi_apepat: apellido };

    // Eliminar el documento con el nombre y apellido proporcionados
    const resultado = await ficha1.deleteOne(filtro);

    if (resultado.deletedCount > 0) {
      // Documento eliminado con éxito
      return res.status(200).json({ message: "Documento eliminado con éxito." });
    } else {
      // No se encontró el documento
      return res.status(404).json({ message: "No se encontró ningún documento para eliminar." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});


//15** Elimina varios documentos o registros segun nombre del alumno (deleteMany)**/
app.delete("/fichaestu10/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = { fi_nombre: nombre };

    // Eliminar todos los documentos con el nombre proporcionado
    const resultado = await ficha1.deleteMany(filtro);

    if (resultado.deletedCount > 0) {
      // Documentos eliminados con éxito
      return res.status(200).json({ message: `Se eliminaron ${resultado.deletedCount} documentos con éxito.` });
    } else {
      // No se encontraron documentos
      return res.status(404).json({ message: "No se encontraron documentos para eliminar." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//16*** Ingresa nombre del alumno y muestra los datos del docente***/
app.get("/fichaestu11/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombre) {
      filtro.fi_nombre = nombre;
    }
    if (apellido) {
      filtro.fi_apepat = apellido;
    }

    // Seleccionar los campos específicos del docente
    const resultados = await ficha1.find(filtro).select('fi_nombredoce fi_gradodoc');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//17** Ingresa nombre del docente  y muestra los datos de los alumnos***/
app.get("/fichaestu12/:docente", async (req, res) => {
  try {
    const { docente } = req.params;

    // Construir el objeto de filtro basado en el parámetro proporcionado
    const filtro = {};
    if (docente) {
      filtro.fi_nombredoce = docente;
    }

    // Seleccionar los campos específicos del alumno
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_codestu fi_gradodoc fi_direstu');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//18** Ingresa nombre del docente  y muestra datos de los padres de familia **/

app.get("/fichaestu13/:docente", async (req, res) => {
  try {
    const { docente } = req.params;

    // Construir el objeto de filtro basado en el parámetro proporcionado
    const filtro = {};
    if (docente) {
      filtro.fi_nombredoce = docente;
    }

    // Seleccionar los campos específicos de los papás 
    const resultados = await ficha1.find(filtro).select('fi_nombrepapa fi_nombremama fi_celuapoderado');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//19** Ingresa nombre del estudiante para verificar su alergia **/
app.get("/fichaestu14/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;

   // Construir el objeto de filtro basado en los parámetros proporcionados
      const filtro = {};
      if (nombre) {
       filtro.fi_nombre = nombre;
     }
      if (apellido) {
       filtro.fi_apepat = apellido;
     }

    // Seleccionar los campos específicos de los estudiantes
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_alergia');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//20** Muestra las alergias por gardo de estudio **/
app.get("/fichaestu15/:grado", async (req, res) => {
  try {
    const { grado } = req.params;

   // Construir el objeto de filtro basado en los parámetros proporcionados
      const filtro = {};
      if (grado) {
       filtro.fi_gradodoc = grado;
     }
      
    // Seleccionar los campos específicos de los estudiantes 
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_alergia');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});


//21** Cuenta el total de documentos por sexo, dependiendo del gardo de estudio **/
app.get("/conteo1/:grado", async (req, res) => {
  try {
    const { grado } = req.params;

    // Construir el pipeline de agregación
    const pipeline = [
      {
        $match: {
          fi_gradodoc: grado // Filtrar por grado de estudios
        }
      },
      {
        $group: {
          _id: "$fi_sexo", // Agrupar por sexo
          count: { $sum: 1 } // Contar la cantidad de documentos en cada grupo
        }
      }
    ];

    // Ejecutar la agregación en la colección
    const resultados = await ficha1.aggregate(pipeline);

    // Imprimir en la consola del servidor
    console.log(`Conteo de estudiantes por sexo en el grado ${grado}:`, resultados);

    // Obtener el total de estudiantes por sexo
    const totalPorSexo = resultados.reduce((total, grupo) => total + grupo.count, 0);

    // Crear un mensaje personalizado
    const mensaje = `Total de estudiantes por sexo en el grado ${grado}: ${totalPorSexo}`;

    // Enviar la respuesta al cliente con el mensaje
    return res.status(200).json({ mensaje, resultados });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//22** Cuenta el total de estudiantes por edad **/
app.get("/conteo2/:edad", async (req, res) => {
  try {
    const { edad } = req.params;

    // Convertir la edad a un número (puedes ajustar esto según tu modelo de datos)
    const edadNumero = parseInt(edad);

    // Construir el pipeline de agregación
    const pipeline = [
      {
        $match: {
          fi_edad: edadNumero // Filtrar por edad
        }
      },
      {
        $group: {
          _id: "$fi_edad", // Agrupar por edad
          count: { $sum: 1 } // Contar la cantidad de documentos en cada grupo
        }
      }
    ];

    // Ejecutar la agregación en la colección
    const resultados = await ficha1.aggregate(pipeline);

    // Imprimir en la consola del servidor
    console.log(`Conteo de estudiantes por edad ${edad}:`, resultados);

    // Obtener el total de estudiantes por edad
    const totalPorEdad = resultados.reduce((total, grupo) => total + grupo.count, 0);

    // Crear un mensaje personalizado
    const mensaje = `Total de estudiantes de ${edad} años: ${totalPorEdad}`;

    // Enviar la respuesta al cliente con el mensaje
    return res.status(200).json({ mensaje, resultados });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//23** Actualiza el celuar de emergencia o apoderado **//
app.patch("/fichaestu16/:celular", async (req, res) => {
  try {
    const { celular } = req.params;
    const { fi_celuapoderado } = req.body;
// Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
        if (celular) {
           filtro.fi_celuapoderado = celular;
        }
    const actualizacion = { $set: { fi_celuapoderado } };
    const resultado = await ficha1.updateOne(filtro, actualizacion);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
 
//24** Ingresa nombre del docente, su grado y muestra los datos de los alumnos **/
app.get("/fichaestu17/:docente/:grado", async (req, res) => {
  try {
    const { docente, grado} = req.params;

    // Construir el objeto de filtro basado en el parámetro proporcionado
    const filtro = {};
    if (docente) {
      filtro.fi_nombredoce = docente;
    }
    if (grado) {
      filtro.fi_gradodoc = grado;
    }

    // Seleccionar los campos específicos del alumno
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_codestu fi_gradodoc fi_direstu');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//25** ingresa el grado de estudio y muestra los estudiantes **/
app.get("/fichaestu18/:grado", async (req, res) => {
  try {
    const { grado} = req.params;

    // Construir el objeto de filtro basado en el parámetro proporcionado
    const filtro = {};
    if (grado) {
      filtro.fi_gradodoc = grado;
    }

    // Seleccionar los campos específicos del estudinate
    const resultados = await ficha1.find(filtro).select('fi_gradodoc fi_nombre fi_apepat fi_codestu fi_direstu fi_nombredoce');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//26** Ingresa nombre del docente, su grado y muestra los datos de los padres de familia o apoderados***/
app.get("/fichaestu19/:docente/:grado", async (req, res) => {
  try {
    const { docente, grado} = req.params;

    // Construir el objeto de filtro basado en el parámetro proporcionado
    const filtro = {};
    if (docente) {
      filtro.fi_nombredoce = docente;
    }
    if (grado) {
      filtro.fi_gradodoc = grado;
    }

    // Seleccionar los campos específicos de los padres de familia
    const resultados = await ficha1.find(filtro).select('fi_nombrepapa fi_nombremama fi_celuapoderado fi_gradodoc fi_direstu');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//27** Ingresa nombre de la mamá y muestra los datos del estudiante **/
app.get("/fichaestu20/:nombremama", async (req, res) => {
  try {
    const { nombremama } = req.params;
1
    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
    if (nombremama) {
      filtro.fi_nombremama = nombremama;
    }

    // Seleccionar los campos específicos del estudiante
    const resultados = await ficha1.find(filtro).select('fi_nombre fi_apepat fi_gradodoc');

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//28** Elimina documento segun codigo del estudiante (deleteone) **/
app.delete("/fichaestu21/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = { fi_codestu: codigo };

    // Eliminar el documento con el nombre proporcionado
    const resultado = await ficha1.deleteOne(filtro);

    if (resultado.deletedCount > 0) {
      // Documento eliminado con éxito
      return res.status(200).json({ message: "Documento eliminado con éxito." });
    } else {
      // No se encontró el documento
      return res.status(404).json({ message: "No se encontró ningún documento para eliminar." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//29** Elimina varios documentos o registros segun grado de estudios (deleteMany)**/
app.delete("/fichaestu22/:grado", async (req, res) => {
  try {
    const { grado } = req.params;

    // Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = { fi_gradodoc: grado };

    // Eliminar todos los documentos con el nombre proporcionado
    const resultado = await ficha1.deleteMany(filtro);

    if (resultado.deletedCount > 0) {
      // Documentos eliminados con éxito
      return res.status(200).json({ message: `Se eliminaron ${resultado.deletedCount} documentos con éxito.` });
    } else {
      // No se encontraron documentos
      return res.status(404).json({ message: "No se encontraron documentos para eliminar." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Interno del Servidor" });
  }
});

//30** Actualiza nombre del padre segun nombre y apellido del alumno **//
app.patch("/fichaestu23/:nombre/:apellido", async (req, res) => {
  try {
    const { nombre, apellido } = req.params;
    const { fi_nombrepapa } = req.body;
// Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
        if (nombre) {
           filtro.fi_nombre = nombre;
        }
        if (apellido) {
           filtro.fi_apepat = apellido;
        }
    const actualizacion = { $set: { fi_nombrepapa } };
    const resultado = await ficha1.updateOne(filtro, actualizacion);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

//31** Actualiza el grado de estudio **//
app.patch("/fichaestu24/:grado", async (req, res) => {
  try {
    const { grado } = req.params;
    const { fi_gradodoc } = req.body;
// Construir el objeto de filtro basado en los parámetros proporcionados
    const filtro = {};
        if (grado) {
           filtro.fi_gradodoc = grado;
        }
    const actualizacion = { $set: { fi_gradodoc } };
    const resultado = await ficha1.updateMany(filtro, actualizacion);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/prueba"
    );
    app.listen(3000, () => console.log("El servidor se inició en el puerto 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();