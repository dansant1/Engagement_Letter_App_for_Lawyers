

Template.DrawSignature.onRendered(() => {
    let template = Template.instance()
    template.signature = new ReactiveVar("")
    template.font = new ReactiveVar("Great Vibes")
    template.canvas =  document.getElementById("signature__text");
    template.ctx = template.canvas.getContext("2d");
    let canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', 500);
    canvas.setAttribute('height', 400);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);

    let clickX = new Array();
    let clickY = new Array();
    let clickDrag = new Array();
    let paint;

    let redraw = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
      
      context.strokeStyle = "#000000";
      context.lineJoin = "round";
      context.lineWidth = 2;
            
      for (let i = 0; i < clickX.length; i++) {        
        context.beginPath();
        if (clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
        } else{
          context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
      }
    }
    
    let addClick = (x, y, dragging) => {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }
    
    if (typeof G_vmlCanvasManager != 'undefined') canvas = G_vmlCanvasManager.initElement(canvas)

    context = canvas.getContext("2d");

    $('#canvas').mousedown(function(e){
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
            
      paint = true;
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      redraw();
    });

    $('#canvas').mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        } 
    });

    $('#canvas').mouseup(function(e){
        paint = false;
    });

    $('#canvas').mouseleave(function(e){
        paint = false;
    });

    template.autorun( () => {
      template.ctx.font = `30px ${template.font.get()}`
      template.ctx.fillText(template.signature.get(), 10, 50);
    })
    
    
})


Template.DrawSignature.events({
  'keyup [name="signature"]'(e, t) {
    
    t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height);  
    t.signature.set(e.target.value)

  },
  'click .sf'(e, t) {
    let font = $( e.target ).data( "font" )

    $( '.sd' ).prop('disabled', false)      

    $( e.target ).prop('disabled', true)
    switch (font) {
      case "01": 
        $('.drop span').text('Type 01')
        t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height); 
        t.font.set('Great Vibes') 
        break;
      
      case "02": 
        $('.drop span').text('Type 02')
        t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height);
        t.font.set('Playball') 
        break;
      
      case "03": 
        $('.drop span').text('Type 03')
        t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height);
        t.font.set('Marck Script') 
        break;
      
    }
  }
})