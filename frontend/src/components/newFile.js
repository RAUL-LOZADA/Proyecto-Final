import axios from "axios";

export default (await import('vue')).defineComponent({
data() {
return {
fichaestu: [],
newficha1: {},
backend_server: 'http://127.0.0.1:3000'
};
},
methods: {
adicionaficha(e) {
e.preventDefault();
var config_request = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

axios.post(this.backend_server + '/fichaestu', this.newficha1, { config_request })
.then(res => {
this.fichaestu.push(res.data);
this.newficha1 = {};
})
.catch((error) => {
console.log(error);
});

},

eliminaficha(ficha) {
var config_request = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

axios.delete(this.backend_server + '/fichaestu/' + ficha._id, {}, { config_request })
.then(res => {
this.fichaestu.splice(this.fichaestu.indexOf(ficha), 1);
})
.catch((error) => {
console.log(error);
});
}
},
created() {
axios.get(this.backend_server + "/fichaestu")
.then(res => {
this.fichaestu = res.data;
console.log(this.fichaestu);
});
}
});
