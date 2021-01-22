//prettier-ignore
[].slice.call(document.querySelectorAll('#minha-tabela'), 1).forEach(function (row) {
    row.addEventListener('click', function () {
      var ths = document.querySelectorAll('#minha-tabela td');
      var obj = [].reduce.call(
        ths,
        function (obj, th, i) {
          obj[th.textContent] = row.cells[i].textContent;
          return obj;
        },
        {}
      );
      console.log(obj);
    });
  });
