// buscar cliente pelo 'id'
var id = document.getElementById('id');
var idCliente;

id.addEventListener('blur', () => {
  idCliente = id.value;
  console.log(idCliente);
});

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
        console.log('dentro do for');
        console.log(data[dado]);
        console.log('imprimiu os dados');

        if (idCliente == data[dado].id) {
          console.log('Entrou no if');
          document.getElementById('id').value = data[dado].id;
          document.getElementById('nome').value = data[dado].nome;
          document.getElementById('endereco').value = data[dado].endereco;
          document.getElementById('telefone').value = data[dado].telefone;
          document.getElementById('email').value = data[dado].email;
        }
      }
    })
    .catch((Error) => {
      console.log('Error');
    });
}

buscarCliente();
