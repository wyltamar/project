var idOs = null;
var idCliente = null;

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

function buscarIdOs() {
  let id = document.getElementById('pesquisa-os');
  idOs = id.value;
}

function InserirOS() {
  var situacaoOs = document.getElementById('situacaoOs').value;
  var idCliente = document.getElementById('idCliente').value;
  var equipamento = document.getElementById('equipamento').value;
  var defeito = document.getElementById('defeito').value;
  var servico = document.getElementById('servico').value;
  var tecnico = document.getElementById('tecnico').value;
  var valor = document.getElementById('valor').value;
  var checkOs = document.getElementsByClassName('check-os')[0].checked;

  switch (situacaoOs) {
    case '1':
      situacaoOs = 'Selecione';
      break;
    case '2':
      situacaoOs = 'Aguardando execução';
      break;
    case '3':
      situacaoOs = 'Executada';
      break;
    case '4':
      situacaoOs = 'Na bancada';
      break;
    default:
      situacaoOs = 'Aguardando peças';
      break;
  }

  var tipo = null;
  checkOs ? (tipo = 'OS') : (tipo = 'Orçamento');

  //prettier-ignore
  var os = {
    tipo: tipo,
    situacao: situacaoOs,
    idCli: idCliente,
    equipamento: equipamento,
    defeito: defeito,
    servico: servico,
    tecnico: tecnico,
    valor: valor
  };
  const url = `http://localhost:3000/os`;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('box-content').innerHTML = this.responseText;
    }
  };

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(os));

  limpaCampos();
  toastr['success']('Ordem de serviço inserida com sucesso');
}

function atualizarOs(numOs, os) {
  if (confirm('Deseja atualizar os dados da Ordem de Serviço?')) {
    var numOs = document.getElementById('numberOs').value;
    var situacaoOs = document.getElementById('situacaoOs').value;
    var idCliente = document.getElementById('idCliente').value;
    var equipamento = document.getElementById('equipamento').value;
    var defeito = document.getElementById('defeito').value;
    var servico = document.getElementById('servico').value;
    var tecnico = document.getElementById('tecnico').value;
    var valor = document.getElementById('valor').value;
    var checkOs = document.getElementsByClassName('check-os')[0].checked;

    switch (situacaoOs) {
      case '1':
        situacaoOs = 'Selecione';
        break;
      case '2':
        situacaoOs = 'Aguardando execução';
        break;
      case '3':
        situacaoOs = 'Executada';
        break;
      case '4':
        situacaoOs = 'Na bancada';
        break;
      default:
        situacaoOs = 'Aguardando peças';
        break;
    }

    var tipo = null;
    checkOs ? (tipo = 'OS') : (tipo = 'Orçamento');

    //prettier-ignore
    var os = {
      numOs: numOs,
      tipo: tipo,
      situacao: situacaoOs,
      idCli: idCliente,
      equipamento: equipamento,
      defeito: defeito,
      servico: servico,
      tecnico: tecnico,
      valor: valor
    };

    //prettier-ignore
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(os)
    };

    fetch(`http://localhost:3000/os` + '/' + numOs, options)
      .then((response) => {
        if (!response.ok) throw Error('ERROR!');
        return response.json().then((response) => {
          response.send('Ordem de Serviço Atualizada com sucesso!');
        });
      })
      .catch((Error) => Error);

    limpaCampos();
    toastr['success']('Ordem de serviço atualizada com sucesso');
  }
}

function listarOSs() {
  const option = {
    method: 'GET',
  };
  fetch(`http://localhost:3000/os`, option)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((result) => {
      for (const dados in result) {
        const html = `
        <div class = os>
          <p>Número da OS: ${result[dados].numOs}</p>
          <p>Data: ${result[dados].dataOs}</p>
          <p>Tipo: ${result[dados].tipo}</p>
          <p>Situação: ${result[dados].situacao}</p>
          <p>Id do Cliente: ${result[dados].idCli}</p>
          <p>Equipamento: ${result[dados].equipamento}</p>
          <p>Defeito: ${result[dados].defeito}</p>
          <p>Serviço: ${result[dados].servico}</p>
          <p>Técnico: ${result[dados].tecnico}</p>
          <p>Valor do Serviço: ${result[dados].valor.toFixed(2)}</p>
        </div>`;
        //prettier-ignore
        document.querySelector("#all-os").insertAdjacentHTML('afterbegin', html);
      }
    })
    .catch((Error) => {
      console.log(Error);
    });
}

function buscarOs() {
  buscarIdOs();
  const option = {
    metoth: 'GET',
  };
  fetch(`http://localhost:3000/os`, option)
    .then((response) => {
      if (!response.ok) throw Error('ERROR!');
      return response.json();
    })
    .then((result) => {
      for (const os in result) {
        if (idOs == result[os].numOs) {
          idCliente = result[os].idCli;

          document.getElementById('numberOs').value = result[os].numOs;
          document.getElementById('data').value = result[os].dataOs;
          //document.getElementById('cliente').value = '';
          document.getElementById('idCliente').value = result[os].idCli;
          document.getElementById('equipamento').value = result[os].equipamento;
          document.getElementById('defeito').value = result[os].defeito;
          document.getElementById('servico').value = result[os].servico;
          document.getElementById('tecnico').value = result[os].tecnico;
          document.getElementById('valor').value = result[os].valor;

          if (result[os].tipo == 'OS') {
            document.getElementById('checkOS').checked = true;
          } else {
            document.getElementById('checkOrcamento').checked = true;
          }

          switch (result[os].situacao) {
            case 'Selecione':
              document.getElementById('situacaoOs').value = '1';
              break;

            case 'Aguardando execução':
              document.getElementById('situacaoOs').value = '2';
              break;

            case 'Executada':
              document.getElementById('situacaoOs').value = '3';
              break;

            case 'Na bancada':
              document.getElementById('situacaoOs').value = '4';
              break;

            default:
              document.getElementById('situacaoOs').value = '5';
              break;
          }
        }
      }
    })
    .catch((Error) => {
      console.log(Error);
    });

  buscarClienteOs();
}

function buscarClienteOs() {
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
          document.getElementById('cliente').value = data[dado].nome;
          document.getElementById('telefone').value = data[dado].telefone;
        }
      }
    })
    .catch((Error) => Error);
}

function excluirOs(numOs) {
  if (window.confirm('Você realmente deseja excluir esta Ordem de Serviço?')) {
    numOs = document.getElementById('numberOs').value;

    //prettier-ignore
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
      body: null
    }

    fetch(`http://localhost:3000/os` + '/' + numOs, options)
      .then((response) => {
        if (!response.ok) throw Error('ERROR!');
        response.json();
      })
      .then((osExcluida) => {
        console.log(osExcluida);
      })
      .catch(() => Error);

    limpaCampos();
    toastr['success']('Ordem de serviço excluída com sucesso');
  }
}

function limpaCampos() {
  document.getElementById('numberOs').value = '';
  document.getElementById('data').value = '';
  document.getElementById('situacaoOs').value = '';
  document.getElementById('cliente').value = '';
  document.getElementById('idCliente').value = '';
  document.getElementById('telefone').value = '';
  document.getElementById('equipamento').value = '';
  document.getElementById('defeito').value = '';
  document.getElementById('servico').value = '';
  document.getElementById('tecnico').value = '';
  document.getElementById('valor').value = '';
  document.getElementsByClassName('check-os')[0].checked = false;
}

function marcaDesmarca(caller) {
  var checks = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = checks[i] == caller;
  }
}

function limpaBuscarPorId() {
  document.getElementById('pesquisa-os').value = '';
}

function validaTipo() {
  const checkOs = document.getElementsByClassName('check-os')[0].checked;
  const checkOrcamento = document.getElementsByClassName('check-orcamento')[0]
    .checked;

  if (checkOs == false && checkOrcamento == false) {
    toastr['warning'](
      'É obrigatório selecionar um dos checks acima: Ordem de Serviço ou Orçamento'
    );
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    document.getElementsByClassName('btn btn-primary')[3].disabled = true;
  } else {
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
    document.getElementsByClassName('btn btn-primary')[3].disabled = false;
  }
}

function validaIdCli() {
  const idCliente = document.getElementById('idCliente');

  if (idCliente.value.trim().length == 0) {
    toastr['warning']('O Id do Cliente é obrigatório');
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    document.getElementsByClassName('btn btn-primary')[3].disabled = true;
  } else {
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
    document.getElementsByClassName('btn btn-primary')[3].disabled = false;
  }
}

function validaTipoEquipamento() {
  const equipamento = document.getElementById('equipamento');

  if (equipamento.value.trim().length == 0) {
    toastr['warning']('O campo equipamento é obrigatório');
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    document.getElementsByClassName('btn btn-primary')[3].disabled = true;
  } else {
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
    document.getElementsByClassName('btn btn-primary')[3].disabled = false;
  }
}

function validaDefeito() {
  const defeito = document.getElementById('defeito');

  if (defeito.value.trim().length == 0) {
    toastr['warning']('O campo defeito é obrigatório');
    document.getElementsByClassName('btn btn-primary')[1].disabled = true;
    document.getElementsByClassName('btn btn-primary')[2].disabled = true;
    document.getElementsByClassName('btn btn-primary')[3].disabled = true;
  } else {
    document.getElementsByClassName('btn btn-primary')[1].disabled = false;
    document.getElementsByClassName('btn btn-primary')[2].disabled = false;
    document.getElementsByClassName('btn btn-primary')[3].disabled = false;
  }
}
