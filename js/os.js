function InserirOS() {
  var situacaoOs = document.getElementById('situacaoOs').value;
  var checkOs = document.getElementsByClassName('check-os')[0].checked;
  var checkOrcamento = document.getElementsByClassName('check-orcamento')[0]
    .checked;
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

  console.log(tipo);
}
function marcaDesmarca(caller) {
  var checks = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = checks[i] == caller;
  }
}
