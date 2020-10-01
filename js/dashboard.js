function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('box-content').innerHTML = this.responseText;
    }
  };

  xhttp.open('GET', url, true);
  xhttp.send();
}

var data = new Date();
document.getElementById('lblData').innerHTML = `Data: ${
  data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()
}`;
