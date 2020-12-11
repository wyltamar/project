var nome = document.getElementsByName('inputName')[0];
var endereco = document.getElementsByName('inputAddress')[0];
var telefone = document.getElementsByName('inputTelephone')[0];
var email = document.getElementsByName('inputEmail')[0];

function inserirCliente(cliente) {
  //prettier-ignore
  var cliente = {
    nome: nome.value,
    endereco: endereco.value,
    telefone: telefone.value,
    email: email.value
  };

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('box-content').innerHTML = this.responseText;
    }
  };

  xhttp.open('POST', 'http://localhost:3000/clientes', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(cliente));
}
