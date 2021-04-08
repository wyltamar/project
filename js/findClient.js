var idCliente;

function pegarId() {
  let id = document.getElementById('id').value;
  idCliente = id;
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
}

function excluirCliente(id) {
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
}

function limparCamposCliente() {
  document.getElementsByName('inputId')[0].value = '';
  document.getElementsByName('inputName')[0].value = '';
  document.getElementsByName('inputAddress')[0].value = '';
  document.getElementsByName('inputTelephone')[0].value = '';
  document.getElementsByName('inputEmail')[0].value = '';
}
