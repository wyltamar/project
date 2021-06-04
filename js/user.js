var idUsuario;

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

function pegarIdUsu() {
  idUsuario = document.getElementById('idUsuario').value;
}

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
    idUsu: id,
    nomeUsu: nome,
    login: login,
    senha: senha,
    telefone: fone,
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

  toastr['success']('Usuário cadstrado com sucesso');
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
        document.querySelector('#all-users').insertAdjacentHTML('afterbegin', html);
      }
    })
    .catch((Error) => {
      console.log(Error);
    });
}

function buscarUsuario() {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };

  fetch(`http://localhost:3000/usuarios`, options)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((data) => {
      for (const dado in data) {
        if (idUsuario == data[dado].idUsu) {
          document.getElementsByName('inputId')[0].value = data[dado].idUsu;
          document.getElementsByName('inputNameUser')[0].value =
            data[dado].nomeUsu;
          document.getElementsByName('inputLoginUser')[0].value =
            data[dado].login;
          document.getElementsByName('inputSenhaUser')[0].value =
            data[dado].senha;
          document.getElementsByName('inputTelephoneUser')[0].value =
            data[dado].telefone;

          let perfil = data[dado].perfil;
          switch (perfil) {
            case 'Administrador':
              document.getElementsByName('selectPerfil')[0].value = 1;
              break;

            case 'Usuário':
              document.getElementsByName('selectPerfil')[0].value = 2;
              break;

            default:
              document.getElementsByName('selectPerfil')[0].value = 2;
              break;
          }
        }
      }
    })
    .catch((Error) => Error);
}

function atualizarUsuario(id, usuario) {
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
    idUsu: id,
    nomeUsu: nome,
    login: login,
    senha: senha,
    telefone: fone,
    perfil: perfil
  };

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(usuario),
  };
  fetch('http://localhost:3000/usuarios' + '/' + usuario.idUsu, options)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => err.Error);

  toastr['success']('Usuário atualizado com sucesso');
}

function excluirUsuario(id) {
  if (window.confirm('Você realmente deseja excluir este Usuário?')) {
    var idUsu = document.getElementById('idUsuario').value;

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    };

    fetch('http://localhost:3000/usuarios' + '/' + idUsu, options)
      .then((response) => {
        if (!response.ok) throw Error('ERROR!');
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((err) => err.Error);
    toastr['success']('Usuário excluído com sucesso');
  }
}
function limparCamposUsuario() {
  document.getElementsByName('inputId')[0].value = '';
  document.getElementsByName('inputNameUser')[0].value = '';
  document.getElementsByName('inputLoginUser')[0].value = '';
  document.getElementsByName('inputSenhaUser')[0].value = '';
  document.getElementsByName('inputTelephoneUser')[0].value = '';
  document.getElementsByName('selectPerfil')[0].value = '';
}

function validaCampoId() {
  const id = document.getElementsByName('inputId')[0].value;

  if (id == '') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    toastr['warning']('Informe o Id!');
  } else {
    document.getElementsByClassName('btn btn-primary')[0].disabled = false;
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  }
}

function validaCampoNome() {
  const nome = document.getElementsByName('inputNameUser')[0].value;

  if (nome == '') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    toastr['warning']('Infomre o nome!');
  } else {
    document.getElementsByClassName('btn btn-primary')[0].disabled = false;
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  }
}
function validaCampoLogin() {
  const login = document.getElementsByName('inputLoginUser')[0].value;

  if (login == '') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    toastr['warning']('Informe o login!');
  } else {
    document.getElementsByClassName('btn btn-primary')[0].disabled = false;
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  }
}
function validaCampoSenha() {
  const senha = document.getElementsByName('inputSenhaUser')[0].value;

  if (senha == '') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    toastr['warning']('Informe a senha!');
  } else {
    document.getElementsByClassName('btn btn-primary')[0].disabled = false;
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  }
}
function validaCampoPerfil() {
  const perfil = document.getElementsByName('selectPerfil')[0].value;

  if (perfil == '1' || perfil == '2') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = false;
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  } else {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    toastr['warning']('Selecione um perfil válido!');
  }
}
