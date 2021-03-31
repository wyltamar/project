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

function listarUsuarios() {
  //prettier-ignore
  const option = {
    method: 'GET'
    
  }
  fetch(`http://localhost:3000/usuarios`, option)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((result) => {
      for (const user in result) {
        const html = ` 
          <div class= user>
            <p>Id: ${result[user].idUsu}</p>
            <p>Nome: ${result[user].nomeUsu}</p>
            <p>Login: ${result[user].login}</p>
            <p>Senha: ${result[user].senha}</p>
            <p>Telefone: ${result[user].telefone}</p>
            <p>Perfil: ${result[user].perfil}</p>
          </div>`;
        //prettier-ignore
        document.querySelector('#users').innerHTML = html;
      }
    })
    .catch((Error) => {
      console.log(Error);
    });
}
