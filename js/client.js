var idCliente;

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

function pegarId() {
  let id = document.getElementById('id').value;
  idCliente = id;
}

function validaNome() {
  var nome = document.getElementsByName('inputName')[0].value;

  if (nome == '') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    toastr['warning']('Por favor, infomre o nome!');
  } else {
    document.getElementsByClassName('btn btn-primary')[0].disabled = false;
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  }
}

function validaTelefone() {
  let telefone = document.getElementsByName('inputTelephone')[0].value;
  if (telefone == '') {
    document.getElementsByClassName('btn btn-primary')[0].disabled = true;
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    toastr['warning']('Por favor, informe o telefone!');
  } else {
    document.getElementsByClassName('btn btn-primary')[0].disabled = false;
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  }
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

  toastr['success']('Cliente cadastrado com sucesso!');
}

function listarClientes() {
  fetch(`http://localhost:3000/clientes`)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((data) => {
      for (const dado in data) {
        const html = `
        <div class= client>
          <p>Id: ${data[dado].id}</p>
          <p>Nome: ${data[dado].nome}</p>
          <p>Endereço: ${data[dado].endereco}</p>
          <p>Telefone: ${data[dado].telefone}</p>
          <p>Email: ${data[dado].email}</p>
        </div>`;
        //prettier-ignore
        document.querySelector('#all-clients').insertAdjacentHTML('afterbegin', html);
      }
    })
    .catch((Error) => {
      console.log(Error);
    });
}

function buscarCliente() {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };

  fetch(`http://localhost:3000/clientes`, options)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((data) => {
      for (const dado in data) {
        if (idCliente == data[dado].id) {
          document.getElementById('id').value = data[dado].id;
          document.getElementById('nome').value = data[dado].nome;
          document.getElementById('endereco').value = data[dado].endereco;
          document.getElementById('telefone').value = data[dado].telefone;
          document.getElementById('email').value = data[dado].email;
        }
      }
    })
    .catch((Error) => Error);
}

function update(id, cliente) {
  if (window.confirm('Deseja realmente atualizar os dados do cliente?')) {
    var id = document.getElementsByName('inputId')[0].value;
    var nome = document.getElementsByName('inputName')[0].value;
    var endereco = document.getElementsByName('inputAddress')[0].value;
    var telefone = document.getElementsByName('inputTelephone')[0].value;
    var email = document.getElementsByName('inputEmail')[0].value;

    //prettier-ignore
    var cliente = {
      id: id,
      nome: nome,
      endereco: endereco,
      telefone: telefone,
      email: email
    };
    //prettier-ignore
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(cliente)
    };

    //prettier-ignore
    fetch(`http://localhost:3000/clientes` + "/" + cliente.id, options)
    .then((response)=>{
      if (!response.ok) throw Error('ERROR!');
      return response.json().then(response=>{
      response.send("Cliente atualizado com sucesso!")
      })
    })
    .catch(Error=> Error)
    toastr['success']('Cliente atualizado com sucesso!');
  }

  function excluirCliente(id) {
    if (window.confirm('Deseja realmente remover o cliente?')) {
      var id = document.getElementsByName('inputId')[0].value;

      //prettier-ignore
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        },
        body: null
      }

      fetch(`http://localhost:3000/clientes` + '/' + id, options)
        .then((response) => {
          if (!response.ok) throw Error('ERROR!');
          return response.json();
        })
        .then((dado) => {
          console.log(dado);
        })
        .catch((Error) => Error);

      toastr['success']('Cliente removido com sucesso!');
    }
  }
}

//prettier-ignore
function limparCamposCliente(){
  document.getElementsByName('inputName')[0].value = "";
  document.getElementsByName('inputAddress')[0].value = "";
  document.getElementsByName('inputTelephone')[0].value = "";
  document.getElementsByName('inputEmail')[0].value = "";
  document.getElementById('id').value = "";

}

function verificaIdVazio() {
  let id = document.getElementById('id').value;

  if (id === '') {
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
  } else {
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
  }
}
