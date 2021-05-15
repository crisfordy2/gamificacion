function updateInputProgress() {
  let filledFields = 0;
  $("#input-progress")
    .find(".form-control")
    .each(function () {
      if ($(this).val() != "") {
        filledFields++;
      }
    });

  let percent = Math.ceil((100 * filledFields) / totalFields);
  $("#progress-inputs .progress-bar")
    .attr("aria-valuenow", percent)
    .width(percent + "%")
    .find(".sr-only")
    .html(percent + "% Completado");

  return percent;
}

//Input Progress
let totalFields = $("#input-progress").find(".form-control").length;
$("#input-progress").change(function () {
  updateInputProgress();
});
$("#input-progress .btn-primary").click(function () {
  const percent = updateInputProgress();
  if (percent == 100) {
    alert("¡Creado con éxito!");
  } else {
    alert("Hay campos sin completar.");
  }
});

function cargarActividades() {
  console.log("cargadas");
}

$(document).ready(updateInputProgress());
