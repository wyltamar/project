function fetchData() {
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
        document
          .querySelector('#all-clients')
          .insertAdjacentHTML('afterbegin', html);
      }
    })
    .catch((Error) => {
      console.log(Error);
    });
}

fetchData();
