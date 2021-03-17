// buscar cliente pelo 'id'
var id = document.getElementById('id');

id.addEventListener('blur', () => {
  console.log(id.value);
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
        if (id.value == data[dado].id) {
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
