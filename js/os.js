function InserirOS() {
  var situacaoOs = document.getElementById('situacaoOs').value;
  var cliente = document.getElementById('cliente').value;
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

  var tipo = '';
  checkOs ? (tipo = 'OS') : (tipo = 'Orçamento');

  console.log(situacaoOs);
  console.log(tipo);
  console.log(cliente);
  console.log(idCliente);
  console.log(equipamento);
  console.log(defeito);
  console.log(servico);
  console.log(tecnico);
  console.log(valor);
}
function marcaDesmarca(caller) {
  var checks = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = checks[i] == caller;
  }
}
