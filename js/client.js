function validaNome() {
  var nome = document.getElementsByName('inputName')[0].value;
  if (nome == '') {
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    window.alert('O campo nome é obrigatório!');
  } else document.getElementsByClassName('btn btn-primary')[1].disabled = false;
}

function validaTelefone() {
  validaNome();
  var telefone = document.getElementsByName('inputTelephone')[0].value;
  if (telefone == '') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    window.alert('O campo telefone é obrigatório!');
  } else document.getElementsByClassName('btn btn-primary')[0].disabled = false;
}

//inderir cliente
function inserirCliente() {
  var nome = document.getElementsByName('inputName')[0].value;
  var endereco = document.getElementsByName('inputAddress')[0].value;
  var telefone = document.getElementsByName('inputTelephone')[0].value;
  var email = document.getElementsByName('inputEmail')[0].value;
  //prettier-ignore
  var cliente = {
    nome: nome,
    endereco: endereco,
    telefone: telefone,
    email: email
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

//prettier-ignore
function limparCamposCliente(){
  document.getElementsByName('inputName')[0].value = "";
  document.getElementsByName('inputAddress')[0].value = "";
  document.getElementsByName('inputTelephone')[0].value = "";
  document.getElementsByName('inputEmail')[0].value = "";

}
