var selects = ["custom-select-2", "custom-select-2-full"];
$(selects).each(function (item) {
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
      c.addEventListener("click", function (e) {
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
    a.addEventListener("click", function (e) {
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

// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })

function format(d) {
  return 'Lorem ipsum dolor';
}

$(document).ready(function () {
  var blotterTable = $('#main-blotter').DataTable({
    "ajax": "blotter.txt",
    "pagingType": "full_numbers",
    "searchable": false,
    "columns": [
      {
        "className": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
      },
      { "data": "trade_id", "orderable": false, },
      {
        "data": "trade_status", "orderable": false, render: function (datum, type, row) {
          var status = "confirmed";
          if (row.trade_status == "No status / Voice") {
            status = "default";
          }
          return '<div class="trade-status"><span class="status ' + status + '"></span> ' + row.trade_status + '</div>';
        }
      },
      { "data": "side", "orderable": false, },
      { "data": "isue", "orderable": false, },
      { "data": "cusip", "orderable": false, },
      { "data": "trade_date", "orderable": false, },
      { "data": "start_date", "orderable": false, },
      { "data": "end_date", "orderable": false, },
      { "data": "rate", "orderable": false, },
      { "data": "price", "orderable": false, },
      { "data": "principal", "orderable": false, },
      {
        "mRender": function (data, type, row) {
          // id = row.trade_id
          return '<a href="javascript:void(0)" class="mr-1 d-inline-block" data-toggle="tooltip" data-placement="bottom" title="Accept"><img class="table-action" src="img/accept.svg" alt="accept"></a>' +
            '<a href="javascript:void(0)" class="d-inline-block" data-toggle="tooltip" data-placement="bottom" title="Reject"><img class="table-action" src="img/reject.svg" alt="reject"></a>';
        }
      },
    ],
    "ordering": false,
  });

  blotterTable.on('draw', function () {
    var total_records = blotterTable.rows().count();
    var page_length = blotterTable.page.info().length;
    var total_pages = Math.ceil(total_records / page_length);
    var current_page = blotterTable.page.info().page + 1;
    $('.paginate_button.first').html("<img src='img/paginate-first.svg' alt='first'>");
    $('.paginate_button.last').html("<img src='img/paginate-last.svg' alt='last'>");
    $('.paginate_button.previous').html("<img src='img/paginate-prev.svg' alt='prev'>");
    $('.paginate_button.next').html("<img src='img/paginate-next.svg' alt='next'>");

    var content = "Page " + current_page + " of " + (page_length < 0 ? 1 : total_pages);

    if ($('#main-blotter_wrapper .pages').length > 0) {
      $('#main-blotter_wrapper .pages').html(content)
    } else {
      $('#main-blotter_wrapper .dataTables_paginate.paging_full_numbers').after("<div class='pages'>" + content + "</div>");
    }

    $('#main-blotter_wrapper .dataTables_paginate.paging_full_numbers').after($("select[name='main-blotter_length']"))
    $('#main-blotter_length').remove();
    $('#main-blotter_info').html('<div class="custom-control custom-checkbox expand-all">' +
      '<input type="checkbox" class="custom-control-input" id="expandAll" name="expand-all">' +
      '<label class="custom-control-label" for="expandAll">Expand All GT</label>' +
      '</div>');
  });

  setTimeout(function () {
    $('[data-toggle="tooltip"]').tooltip()
  }, 5000)

  // Add event listener for opening and closing details
  $('#main-blotter tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = blotterTable.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    }
    else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass('shown');
    }
  });

  $('#main-blotter').on('page.dt', function () {
    setTimeout(function () {
      $('[data-toggle="tooltip"]').tooltip()
    }, 2000)
  });

  var instrumentReportTable = $('#instrument-report-table').DataTable({
    "ajax": "instrument-report.txt",
    "pagingType": "full_numbers",
    "columns": [
      { "data": "id", "orderable": false, },
      { "data": "cusip", "orderable": false, },
      { "data": "nickname", "orderable": false, },
      {
        "data": "is_enabled", "orderable": false, "className": 'text-center', render: function (datum, type, row) {
          return (row.is_enabled == 1)
            ? '<img class="table-action" src="img/accept.svg" alt="accept">'
            : '<img class="table-action" src="img/reject.svg" alt="reject">';
        }
      },
      {
        "data": "is_enabled_2", "orderable": false, "className": 'text-center', render: function (datum, type, row) {
          return (row.is_enabled == 1)
            ? '<img class="table-action" src="img/accept.svg" alt="accept">'
            : '<img class="table-action" src="img/reject.svg" alt="reject">';
        }
      },
      {
        "data": "weightedavgshown", "orderable": false, "className": 'text-center', render: function (datum, type, row) {
          return (row.weightedavgshown == 1)
            ? '<img class="table-action" src="img/accept.svg" alt="accept">'
            : '<img class="table-action" src="img/reject.svg" alt="reject">';
        }
      },
      {
        "data": "is_enabled_2", "orderable": false, "className": 'text-center', render: function (datum, type, row) {
          return (row.isgcshell == 1)
            ? '<img class="table-action" src="img/accept.svg" alt="accept">'
            : '<img class="table-action" src="img/reject.svg" alt="reject">';
        }
      },
      {
        "mRender": function (data, type, row) {
          // id = row.trade_id
          return '<a href="javascript:void(0)" class="mr-1 d-inline-block" data-toggle="tooltip" data-placement="bottom" title="Zoom"><img class="table-action" src="img/zoom.svg" alt="zoom"></a>' +
            '<a href="javascript:void(0)" class="mr-1 d-inline-block" data-toggle="tooltip" data-placement="bottom" title="Edit"><img class="table-action" src="img/edit.svg" alt="edit"></a>' +
            '<a href="javascript:void(0)" class="d-inline-block" data-toggle="tooltip" data-placement="bottom" title="Delete"><img class="table-action" src="img/delete.svg" alt="delete"></a>';
        }
      },
    ],
    "ordering": false,
  });

  instrumentReportTable.on('draw', function () {
    var total_records = instrumentReportTable.rows().count();
    var page_length = instrumentReportTable.page.info().length;
    var total_pages = Math.ceil(total_records / page_length);
    var current_page = instrumentReportTable.page.info().page + 1;
    $('.paginate_button.first').html("<img src='img/paginate-first.svg' alt='first'>");
    $('.paginate_button.last').html("<img src='img/paginate-last.svg' alt='last'>");
    $('.paginate_button.previous').html("<img src='img/paginate-prev.svg' alt='prev'>");
    $('.paginate_button.next').html("<img src='img/paginate-next.svg' alt='next'>");

    var content = "Page " + current_page + " of " + (page_length < 0 ? 1 : total_pages);

    if ($('#instrument-report-table_wrapper .pages').length > 0) {
      $('#instrument-report-table_wrapper .pages').html(content)
    } else {
      $('#instrument-report-table_wrapper .dataTables_paginate.paging_full_numbers').after("<div class='pages'>" + content + "</div>");
    }

    $('#instrument-report-table_wrapper .dataTables_paginate.paging_full_numbers').after($("select[name='instrument-report-table_length']"))
    $('#instrument-report-table_length').remove();
    $('#instrument-report-table_info').remove();
  });

  setTimeout(function () {
    $('[data-toggle="tooltip"]').tooltip()
  }, 5000)

  instrumentReportTable.on('page.dt', function () {
    setTimeout(function () {
      $('[data-toggle="tooltip"]').tooltip()
    }, 2000)
  });
});

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

$('#main-blotter_wrapper .row:last-of-type').css("width", $('#main-blotter').width() + 2 + "px");

$(window).on('resize', function () {
  $('#main-blotter_wrapper .row:last-of-type').css("width", $('#main-blotter').width() + 2 + "px");
});
