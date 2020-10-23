function inserirCliente() {
  var nome = document.getElementsByName('inputName')[0].value;
  var endereco = document.getElementsByName('inputAddress')[1].value;
  var telefone = document.getElementsByName('inputTelephone')[2].value;
  var email = document.getElementsByName('inputEmail')[3].value;

  var cliente = {
    nome: nome,
    endereco: endereco,
    telefone: telefone,
    email: email,
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
