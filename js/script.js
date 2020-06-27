$(document).ready(function() {
    
    $("#show-password").on('click', function() {
        var x = document.getElementById("password");
        x.type = (x.type === "password") ? "text" : "password";
    });
});


var selects = ["custom-select-2", "custom-select-2-full"];
$(selects).each(function(item) {
  var className = selects[item];
  x = document.getElementsByClassName(className);
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    var start = (className === "custom-select-2") ? 1 : 0;
    for (j = start; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
})


function closeAllSelect(elmnt) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);

$(function () {
  $('.datepicker').datepicker({
      todayBtn: true,
      format: "yyyy/mm/dd",
      templates: {
        leftArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">' +
            '<g fill="none" fill-rule="evenodd">' +
                '<path d="M0 0H12V12H0z"/>' +
                '<path fill="#2D4056" fill-opacity=".54" d="M6.505 10.895c-.174.193-.47.208-.662.035L.78 6.372C.673 6.275.62 6.14.625 6.006c-.005-.134.047-.27.155-.366L5.843 1.08c.192-.173.488-.157.662.035.173.192.157.489-.035.662L1.775 6.006l4.695 4.227c.192.174.208.47.035.662z"/>' +
                '<path fill="#2D4056" fill-opacity=".54" d="M10.505 10.895c-.174.193-.47.208-.662.035L4.78 6.372c-.107-.097-.16-.232-.155-.366-.005-.134.047-.27.155-.366L9.843 1.08c.192-.173.488-.157.662.035.173.192.157.489-.035.662L5.775 6.006l4.695 4.227c.192.174.208.47.035.662z"/>' +
            '</g>' +
        '</svg>',
        rightArrow: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">' +
            '<g fill="none" fill-rule="evenodd">' +
                '<path d="M0 0H12V12H0z" transform="matrix(-1 0 0 1 12 0)"/>' +
                '<path fill="#2D4056" fill-opacity=".54" d="M6.505 10.895c-.174.193-.47.208-.662.035L.78 6.372C.673 6.275.62 6.14.625 6.006c-.005-.134.047-.27.155-.366L5.843 1.08c.192-.173.488-.157.662.035.173.192.157.489-.035.662L1.775 6.006l4.695 4.227c.192.174.208.47.035.662z" transform="matrix(-1 0 0 1 12 0)"/>' +
                '<path fill="#2D4056" fill-opacity=".54" d="M10.505 10.895c-.174.193-.47.208-.662.035L4.78 6.372c-.107-.097-.16-.232-.155-.366-.005-.134.047-.27.155-.366L9.843 1.08c.192-.173.488-.157.662.035.173.192.157.489-.035.662L5.775 6.006l4.695 4.227c.192.174.208.47.035.662z" transform="matrix(-1 0 0 1 12 0)"/>' +
            '</g>' +
        '</svg>'
      }
  });
});
