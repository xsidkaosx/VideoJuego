var filas = 7;
var columnas = 7;
var movimientos = 0;
var score = 0;
var tablero = [];
var seal = null;
var banderaF = false;
var banderaC = false;
var interval;

$(document).ready(function(){
    $('.btn-reinicio').on('click',function(){
      if(this.innerHTML == 'Iniciar'){
        this.innerHTML = 'Reiniciar';
        Tablero.inicarJuego();
      }else{
        Tablero.reiniciarJuego();
      }
    });
});

var Tablero = {
  inicarJuego: function(){
    seal = this;
    for (var i = 0; i < filas; i++) {
      var fila = [];
      for (var j = 0; j < columnas; j++) {
        var index = Math.floor(Math.random() * (5 - 1)) + 1;
        var elemento = $('<img id="'+i+'-'+j+'" src="image/'+index+'.png" class="elemento" data-item="bloque-'+index+'" />');
        fila[j] = elemento;
        $('.col-'+(j+1)).append(elemento);
        this.agrEventos(elemento);
      }
      tablero[i] = fila;
    }
    var deadline = new Date(Date.parse(new Date()) + 2* 60 * 1000);
    initializeClock('timer', deadline);
    // Validar elementos
    this.validarColumnas();
    this.validarFilas();
    interval = setInterval(seal.agregarFichas, 1000);
  },
  agrEventos: function(elemento){
    var seal = this;
    $(elemento).draggable({ grid: [ 130, 100 ], revert: "invalid", snap: ".elemento", snapMode: "inner", zIndex:9, helper: "clone", cursor:"move"  });
    $(elemento).droppable({
      drop: function(event, ui ) {
        movimientos++;
        $('#movimientos-text').html(movimientos);

        var idItemA = ui.draggable.attr('id');
        var idItemB = $(this).attr('id');
        var posItemA = idItemA.split('-');
        var posItemB = idItemB.split('-');

        var dragElem = $(ui.draggable).clone().replaceAll(this);
        $(this).replaceAll(ui.draggable);

        dragElem.attr('id',idItemB);
        $(this).attr('id',idItemA);

        tablero[posItemA[0]][posItemA[1]] = $(this);
        tablero[posItemB[0]][posItemB[1]] = dragElem;

        seal.agrEventos(this);
        seal.agrEventos(dragElem);
        // Validar elementos
        seal.validarColumnas();
        seal.validarFilas();
      }
    });
  },
  validarColumnas: function(){
    for (var i = 0; i < filas; i++) {
      var tmpPrev,tmpNext = null
      for (var j = 0; j < columnas; j++) {
          var actual = tablero[i][j];
          if(j!=0){
            tmpPrev = tablero[i][j-1]
          }else {
            tmpPrev = null;
          }
          if(j!=(columnas-1)){
            tmpNext = tablero[i][j+1];
          }else{
            tmpNext = null;
          }
          if(tmpPrev && tmpNext){
            var oB1 = actual.attr('data-item');
            var oB2 = tmpPrev.attr('data-item');
            var oB3 = tmpNext.attr('data-item');

            if(oB1 == oB2 && oB1 == oB3){
              score += 100;
              $('#score-text').html(score);
              this.removerElementos(tmpPrev);
              this.removerElementos(actual);
              this.removerElementos(tmpNext);
            }
          }
        }
    }
    banderaC = true;
  },
  validarFilas: function(){
    var banderaRemover = false;
    for (var i = 0; i < columnas; i++) {
      var tmpPrev,tmpNext = null
      for (var j = 0; j < filas; j++) {
          var actual = tablero[j][i];
          tmpPrev = null
          if(j!=0){
            tmpPrev = tablero[j-1][i]
          }else {
            tmpPrev = null;
          }
          if(j!=(filas-1)){
            tmpNext = tablero[j+1][i];
          }else{
            tmpNext = null;
          }
          if(tmpPrev && tmpNext){
            var oB1 = actual.attr('data-item');
            var oB2 = tmpPrev.attr('data-item');
            var oB3 = tmpNext.attr('data-item');

            if(oB1 == oB2 && oB1 == oB3){
              score += 100;
              banderaRemover = true;
              $('#score-text').html(score);
              this.removerElementos(tmpPrev);
              this.removerElementos(actual);
              this.removerElementos(tmpNext);
            }
          }
        }
    }
    banderaF =true;
  },
  removerElementos: function(elemento,bandera) {
      elemento
        .animate(
          {
            width: "-=0px"
          },{
            step: function(now, fx){
              $(this).addClass('animacion');
            },
            duration: 2000,
            complete: function() {
              $(this).removeClass('animacion');
              $(this).remove();
            }
          }
        )

  },
  agregarFichas: function(){
    //clearInterval(interval);
    if(banderaF==true && banderaC ==true){
        for (var j = 0; j < columnas; j++) {
          var col = $('.col-'+(j+1)+' > img');
          for (var i = col.length; i < columnas; i++) {
            var index = Math.floor(Math.random() * (5 - 1)) + 1;
            var elemento = $('<img src="image/'+index+'.png" class="elemento" data-item="bloque-'+index+'" />');
            $('.col-'+(j+1)).prepend(elemento);
            seal.agrEventos(elemento);
          }
        }
        var i=0;
        var j=-1;
        $('.elemento').each(function(index, el) {
          if(index%columnas == 0){
            j++;
            i=0;
          }else{
            i++;
          }
          $(el).attr('id',i+"-"+j);
          tablero[i][j] = $(el);
        });
        banderaF=false;
        banderaC=false;
        seal.validarFilas();
        seal.validarColumnas();
      }
  },
  reiniciarJuego: function(){
    for (var i = 0; i < columnas; i++) {
      $('.col-'+(i+1)).empty();
    }
    $('#movimientos-text').html('0');
    $('#score-text').html('0');
    filas = 7;
    columnas = 7;
    movimientos = 0;
    score = 0;
    tablero = [];
    seal = null;
    banderaF = false;
    banderaC = false;
    interval;
    this.inicarJuego();
  }

}
