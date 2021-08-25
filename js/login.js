var button = document.querySelector('#btnLogin');
var userExists = true;

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

button.addEventListener('click', () => {
  const login = document.querySelector('#inputUsuario').value;
  const senha = document.querySelector('#inputSenha').value;

  const option = {
    method: 'GET',
  };

  fetch(`http://localhost:3000/usuarios`, option)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((result) => {
      for (const user in result) {
        if (result[user].login == login && result[user].senha) {
          location.href = '../views/dashboard.html';
        } else {
          userExists = false;
        }
      }
      if (userExists == false) {
        //toastr["error"]("usuario não existe");
        alert('Usuário ou senha inexiste!');
        document.querySelector('#inputUsuario').value = '';
        const senha = (document.querySelector('#inputSenha').value = '');
      }
    })
    .catch((err) => err.Error);
});
