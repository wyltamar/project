function inserirUsuario() {
  var id = document.getElementsByName('inputId')[0].value;
  var nome = document.getElementsByName('inputNameUser')[0].value;
  var login = document.getElementsByName('inputLoginUser')[0].value;
  var senha = document.getElementsByName('inputSenhaUser')[0].value;
  var fone = document.getElementsByName('inputTelephoneUser')[0].value;
  var perfil = document.getElementsByName('selectPerfil')[0].value;

  switch (perfil) {
    case '1':
      perfil = 'Administrador';
      break;
    case '2':
      perfil = 'Usuário';
      break;

    default:
      perfil = 'Selecione';
      break;
  }

  //prettier-ignore
  var usuario = {
    id: id,
    nome: nome,
    login: login,
    senha: senha,
    fone: fone,
    perfil: perfil
  };

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('box-content').innerHTML = this.responseText;
    }
  };

  xhttp.open('POST', 'http://localhost:3000/usuarios', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(usuario));
}
