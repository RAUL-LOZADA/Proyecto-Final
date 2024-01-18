<template>
    <div class='users'>
        <h2> Sistema integrado de gestion de informacion estudiantil - SIGESINES</h2>
        <ul>
            <li v-for='ficha in fichaestu'> 
               {{ficha.fi_codestu}} - {{ ficha.fi_apepat }} - {{ ficha.fi_nombre }} - {{ ficha.fi_edad }}
               {{ficha.fi_direstu }} - {{ ficha.fi_gradodoc }} - {{ ficha.fi_nombrepapa }} - {{ ficha.fi_nombremama }}
               {{ ficha.fi_celuapoderado }} - {{ ficha.fi_nombredoce }} - {{ ficha.fi_sexo }} - {{ ficha.fi_alergia }}
               <button v-on:click='eliminaficha(ficha)' style='background-color: #445ce2; color :white; padding:  5px 20px; border-radius: 10px;'>
                Eliminar</button>

            </li>
        </ul>
    
       <!---<form v-on:submit='adicionaficha'>   -->     
        <form v-on:submit='adicionaficha' style="background-color: #445ce2; padding: 20px; border-radius: 10px;">  
            <label> <strong>Registro de estudiantes</strong></label><br>
            <label> <strong>Cod. del estud.:</strong></label>
           <input type='text' v-model='newficha1.fi_codestu' size='3' maxlength='9'>
           <label>   <strong>   Nom. del estud.:</strong> </label>
           <input type='text' v-model='newficha1.fi_nombre' size='6' maxlength='12'>
           <label> <strong>     Ape.pat.del estud.: </strong></label>
            <input type='text' v-model='newficha1.fi_apepat' size='6' maxlength='15'>
            <label> <strong>    Sexo del estud.: </strong></label>
            <input type='text' v-model='newficha1.fi_sexo' size='3' maxlength='1' ><br>
            <label> <strong>    Edad del estud.: </strong></label>
            <input type='text' v-model='newficha1.fi_edad' size='3' maxlength='2' >
            <label> <strong>    Direc. del estud.:</strong> </label> 
            <input type='text' v-model='newficha1.fi_direstu' size='7' maxlength='20'>
            <label> <strong>    Grado del estud.:</strong> </label>
            <input type='text' v-model='newficha1.fi_gradodoc' size='5' maxlength='12'>
            <label><strong>Alergia del estud.: </strong></label>
            <input type='text' v-model='newficha1.fi_alergia' size='5' maxlength='15'><br>
            <label><strong>Nom. padre.: </strong></label>
            <input type='text' v-model='newficha1.fi_nombrepapa' size='8' maxlength='20'>
            <label><strong>Nom. madre.: </strong></label>
            <input type='text' v-model='newficha1.fi_nombremama' size='8' maxlength='20' >
            <label><strong>Cel. apoderado.:</strong></label>
            <input type='text' v-model='newficha1.fi_celuapoderado' size='4' maxlength='9' >
            <label><strong>Nom. docente.: </strong></label>
            <input type='text' v-model='newficha1.fi_nombredoce' size='8' maxlength='20'><br><br>
            <button type='submit' style='background-color: #3278f8; color: white; padding: 10px 20px; border: none; border-radius: 5px;'>
             Adicionar</button>

            </form> <br>
    </div>
</template>

<script>
import axios from "axios";

export default{    
    data(){ 
        return {            
            fichaestu: [],
            newficha1: {},
            backend_server: 'http://127.0.0.1:3000'
        }
    },
    methods:{
        adicionaficha(e){
            e.preventDefault(); 
            var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}

            axios.post(this.backend_server + '/fichaestu', this.newficha1, { config_request })
            .then(res => {                                         
                this.fichaestu.push(res.data);
                this.newficha1 = {};
            })
            .catch((error) => {
                console.log(error)
            });    
            
        },

        eliminaficha(ficha){
            var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}

            axios.delete(this.backend_server + '/fichaestu/' + ficha._id, {}, { config_request })
            .then(res => {                                         
                this.fichaestu.splice(this.fichaestu.indexOf(ficha), 1);
            })
            .catch((error) => {
                console.log(error)
            });  
        }
    },
    created(){                
        axios.get(this.backend_server + "/fichaestu")
        .then(res => {
            this.fichaestu = res.data;
            console.log(this.fichaestu);
        });
    }

}
</script>