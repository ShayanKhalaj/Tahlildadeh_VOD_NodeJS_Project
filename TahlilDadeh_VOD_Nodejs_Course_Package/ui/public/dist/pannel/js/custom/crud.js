// unobtrusive library

// search

$(document).ready(function () {
  $('[data-btn-search="true"]').click(function (e) {
    e.preventDefault();
    var getUrl = $(this).attr("data-get-url");
    var formId = "#" + $(this).attr("data-form-id");
    var formData = $(formId).serialize();
    var gridId = "#" + $(this).attr("data-grid-id");
    $.get(getUrl, formData, function (data) {
      $(gridId).html(data);
    });
  });
});

// show create modal

$(document).ready(function () {
  $('[data-show-create-modal="true"]').click(function () {
    var url = $(this).attr("data-get-url");
    $.get(url, null, function (data) {
      $('[data-modal-content="true"]').html(data);
      $('[data-modal="true"]').modal("show");
    });
  });
});

// create

$(document).on("click", '[data-btn-create="true"]', function (e) {
  e.preventDefault();
  var postUrl = $(this).attr("data-post-url");
  var getUrl = $(this).attr("data-get-url");
  var formId = "#" + $(this).attr("data-form-id");
  var formData = $(formId).serialize();
  var gridId = "#" + $(this).attr("data-grid-id");
  var alertId = "#" + $(this).attr("data-alert-id")
  $.post(postUrl, formData, function (op) {
    if(op.validationResult===false){
      $(`#${op.label}Error`).html(op.message)
      return
    }
    if (op.success === true) {
      alert(op.message);
      $('[data-modal="true"]').modal("hide");
      $.get(getUrl, null, function (data) {

        $(gridId).html(data);
      });
    } else {
      $(alertId).addClass('alert alert-danger')
      $(alertId).html(op.message)
    }
  });
});

// show edit modal

$(document).ready(function () {
  $('[data-show-edit-modal="true"]').click(function () {
    var getUrl = $(this).attr("data-get-url");
    var fieldId = $(this).attr("data-id");
    $.get(getUrl, { fieldId: fieldId }, function (data) {
      console.log(data);
      if (data.success === false) {
        alert(data.message);
      }
      $('[data-modal-content="true"]').html(data);
      $('[data-modal="true"]').modal("show");
    });
  });
});

// edit

$(document).on("click", '[data-btn-edit="true"]', function (e) {
  e.preventDefault();
  var postUrl = $(this).attr("data-post-url");
  var formId = "#" + $(this).attr("data-form-id");
  var formData = $(formId).serialize();
  var getUrl = $(this).attr("data-get-url");
  var gridId = "#" + $(this).attr("data-grid-id");
  var alertId = "#" + $(this).attr("data-alert-id")
  $.post(postUrl, formData, function (op) {
    if(op.validationResult===false){
      $(`#${op.label}Error`).html(op.message)
      return
    }
    if (op.success === true) {
      alert(op.message);
      $('[data-modal="true"]').modal("hide");
      $.get(getUrl, null, function (data) {
        $(gridId).html(data);
      });
    } else {
      $(alertId).addClass('alert alert-danger')
      $(alertId).html(op.message)
    }
  });
});

//delete

$(document).on("click", "[data-delete=true]", function () {
  var postUrl = $(this).attr("data-post-url");
  var fieldId = $(this).attr("data-id");
  var getUrl = $(this).attr("data-get-url");
  var gridId = "#" + $(this).attr("data-grid-id");
  var confirmMessage = $(this).attr("data-confirm-message");
  if (confirm(confirmMessage)) {
    $.post(postUrl, { fieldId: fieldId }, function (op) {
      if (op.success === true) {
        alert(op.message);
        $.get(getUrl, null, function (data) {
          $(gridId).html(data);
        });
      } else {
        alert(op.message);
      }
    });
  }
});
