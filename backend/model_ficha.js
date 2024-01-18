const mongoose = require("mongoose");

const ficha1Schema = new mongoose.Schema({
  fi_codestu: {
    type: Number,
    required: true,
  },
  fi_nombre: {
    type: String,
   required: true,
  },
  fi_apepat: {
    type: String,
    required: true,
  },
  fi_sexo: {
    type: String,
    required: true,
  },
  fi_edad: {
    type: Number,
    required: true,
    validate: {
        validator: function (value) {
            return value > 0;
            },
            message: () => "Por favor ingrese una edad valida",
        },
  },
  fi_direstu: {
    type: String,
    required: true,
  },
  fi_gradodoc: {
    type: String,
    required: true,
  },
    fi_alergia: {
      type: String,
      required: true, 
 },
   fi_nombrepapa: {
  type: String,
  required: true,
},
  fi_nombremama: {
  type: String,
  required: true,
},
 fi_celuapoderado: {
  type: Number,
  required: true,
},
 fi_nombredoce: {
  type: String,
  required: true,
},

});

//const ficha1 = mongoose.model("fichaestu", fichaSchema,);
//const ficha1 = mongoose.model("fichaestu", fichaSchema, "fichaestus");

mongoose.pluralize(null); // Deshabilita la pluralización automática
const ficha1 = mongoose.model("fichaestu", ficha1Schema, "fichaestu");

module.exports = { ficha1 };