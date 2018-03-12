$(document).ready(function(){
    $('.btn-reinicio').on('click',function(){
      this.innerHTML = 'Reiniciar';
      Tablero.inicarJuego();
    });
})

var filas = 7;
var columnas = 7;
var movimientos = 0;

var Tablero = {

  inicarJuego: function(){
    for (var i = 1; i <= filas; i++) {
      for (var j = 1; j <= columnas; j++) {
        var index = Math.floor(Math.random() * (5 - 1)) + 1;
        var elemento = $('<img src="image/'+index+'.png" class="elemento" data-item="bloque-'+index+'" />');
        $('.col-'+i).append(elemento);
        this.agrEventos(elemento);
      }
    }
  },
  agrEventos: function(elemento){
    var seal = this;
    $(elemento).draggable({ grid: [ 130, 100 ], revert: "invalid", snap: ".elemento", snapMode: "inner", zIndex:9, helper: "clone", cursor:"move"  });
    $(elemento).droppable({
      drop: function(event, ui ) {
        var dragElem = $(ui.draggable).clone().replaceAll(this);
        $(this).replaceAll(ui.draggable);
        seal.agrEventos(this);
        seal.agrEventos(dragElem);
        // Validar elementos
        seal.validarMov(dragElem);
        //seal.validarMov(this);
      }
    });
  },
  validarMov: function(elemento){
    /*var actual = $(elemento);
    var prev = $(elemento).prev();
    var next = $(elemento).next();

    console.log(actual,prev,next);
    var oB1 = actual.attr('data-item');
    var oB2 = prev.attr('data-item');
    var oB3 = next.attr('data-item');
    if(oB1 == oB2 && oB1 == oB3){
      actual.css('background-color','gray');
      prev.css('background-color','gray');
      next.css('background-color','gray');
    }
    */
    var dulces = $('.elemento');
    for (var i = 0; i < filas; i++) {
      for (var j = 0; j < columnas; j++) {
        console.log(dulces[i+j]);
      }
    }

  }

}
