<template>
    <div class='users'>
        <h2>Sistema Integrado de Gestión de Información Estudiantil - SIGESINES</h2>
        <ul>
            <li v-for='ficha in fichaestu'> 
               {{ficha.fi_codestu}} - {{ ficha.fi_apepat }} - {{ ficha.fi_nombre }} - {{ ficha.fi_edad }}
               {{ficha.fi_direstu }} - {{ ficha.fi_gradodoc }} - {{ ficha.fi_nombrepapa }} - {{ ficha.fi_nombremama }}
               {{ ficha.fi_celuapoderado }} - {{ ficha.fi_nombredoce }} - {{ ficha.fi_sexo }} - {{ ficha.fi_alergia }}
               <button v-on:click='editaficha(ficha)' style='background-color: #445ce2; color :white; padding:  5px 20px; border-radius: 10px;'>
                Editar</button>

                            
            </li>
        </ul>
    
        
        <form v-if="isEditing" v-on:submit.prevent='guardafichaEditada' style="background-color: #445ce2; padding: 20px; border-radius: 10px;">

        <!--<form v-if="isEditing" v-on:submit='guardafichaEditada' style="background-color: #445ce2; padding: 20px; border-radius: 10px;">-->
            <label><strong>Actualiza registro de estudiantes</strong></label><br>
            <label><strong>Cod. del estudiante:</strong></label>
           <input type='text' v-model='editficha.fi_codestu' size='3' maxlength='9'>
           <label><strong>Nom. del estudiante:</strong></label>
           <input type='text' v-model='editficha.fi_nombre' size='6' maxlength='12'>
           <label><strong>Ape. pat. del estudiante:</strong></label>
           <input type='text' v-model='editficha.fi_apepat' size='6' maxlength='15'>
           <label> <strong>    Sexo del estud.: </strong></label>
            <input type='text' v-model='editficha.fi_sexo' size='3' maxlength='1' ><br>
            <label> <strong>    Edad del estud.: </strong></label>
            <input type='text' v-model='editficha.fi_edad' size='3' maxlength='2' >
            <label> <strong>    Direc. del estud.:</strong> </label> 
            <input type='text' v-model='editficha.fi_direstu' size='7' maxlength='20'>
            <label> <strong>    Grado del estud.:</strong> </label>
            <input type='text' v-model='editficha.fi_gradodoc' size='5' maxlength='12'>
            <label><strong>Alergia del estud.: </strong></label>
            <input type='text' v-model='editficha.fi_alergia' size='5' maxlength='15'><br>
            <label><strong>Nom. padre.: </strong></label>
            <input type='text' v-model='editficha.fi_nombrepapa' size='8' maxlength='20'>
            <label><strong>Nom. madre.: </strong></label>
            <input type='text' v-model='editficha.fi_nombremama' size='8' maxlength='20' >
            <label><strong>Cel. apoderado.:</strong></label>
            <input type='text' v-model='editficha.fi_celuapoderado' size='4' maxlength='9' >
            <label><strong>Nom. docente.: </strong></label>
            <input type='text' v-model='editficha.fi_nombredoce' size='8' maxlength='20'>
                 
            
            <!-- Agrega los otros campos de edición aquí -->
            <button type='submit' style='background-color: #3278f8; color: white; padding: 10px 20px; border: none; border-radius: 5px;'>
            Guardar </button>
            
            <button v-on:click='cancelarEdicion' style='background-color: #3278f8; color: white; padding: 10px 20px; border: none; border-radius: 5px;'>
            Cancelar</button>

            


        </form>
    </div>
</template>

<script>
import axios from "axios";

export default{    
    data(){ 
        return {            
            fichaestu: [],
            newficha1: {},
            editficha: {},
            isEditing: false,
            backend_server: 'http://127.0.0.1:3000'
        }
    },
    methods:{
            editaficha(ficha){
            // Copiar el objeto ficha en editficha para editar
            this.editficha = Object.assign({}, ficha);
            this.isEditing = true;
        },

        guardafichaEditada(e) {
           e.preventDefault();
              const config_request = {
              headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'
        }
    };

    axios.put(this.backend_server + '/fichaestu/' + this.editficha._id, this.editficha, config_request)
        .then(res => {
            const index = this.fichaestu.findIndex(item => item._id === this.editficha._id);
            if (index !== -1) {
                this.$set(this.fichaestu, index, res.data);
            }
            this.editficha = {};
            this.isEditing = false;
        })
        .catch(error => {
            console.log('Error al actualizar la ficha de estudiante:', error);
        });
     
    },
    cancelarEdicion(){
            // Cancelar la edición y resetear valores
            this.editedFicha = {};
            this.isEditing = false;
        }
    },

    created() {               
        axios.get(this.backend_server + "/fichaestu")
        .then(res => {
            this.fichaestu = res.data;
            console.log(this.fichaestu);
        });
    }
}


</script>
