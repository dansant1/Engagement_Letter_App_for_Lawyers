import convertCanvasToPNG from '../../../utilities/convertCanvas'
import uploadSignature from '../../../utilities/upload'


Template.DrawSignature.onRendered(() => {
    let template = Template.instance()
    template.signature = new ReactiveVar("")
    template.font = new ReactiveVar("Great Vibes")
    template.canvas =  document.getElementById("signature__text");
    template.ctx = template.canvas.getContext("2d");
    let canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    template.canvas2 = canvas
    canvas.setAttribute('width', 500);
    canvas.setAttribute('height', 200);
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
      template.ctx.font = `70px ${template.font.get()}`
      template.ctx.fillText(template.signature.get(), 30, 80);
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
  },
  'click [name="save"]'(e, t) {

    let $button = $('[name="save"]')
    
    $button.text('Loading...')
    $button.prop('disabled', true)
    
    let fromOf = $(e.target).data('from')
   

    if ( Session.get('fromOf') ) {

      if (Session.get('isClient')) {
        fromOf === "draw" ? convertCanvasToPNG(t.canvas2, $button, Session.get('isClient'), Session.get('clientId')) :  convertCanvasToPNG(t.canvas, $button, Session.get('isClient'), Session.get('clientId')) 
        FlowRouter.go('/client/sign_letter/' + Session.get('fromOf'))
        Session.set('fromOf', undefined)
      } else {
        fromOf === "draw" ? convertCanvasToPNG(t.canvas2, $button) :  convertCanvasToPNG(t.canvas, $button) 
        FlowRouter.go('/new_letter/step_5/' + Session.get('fromOf'))
        Session.set('fromOf', undefined)
      }

      Bert.alert('Signed', 'success')

    } else {
      fromOf === "draw" ? convertCanvasToPNG(t.canvas2, $button) :  convertCanvasToPNG(t.canvas, $button) 
      FlowRouter.go('/home')

      Bert.alert('Signed', 'success')
    }
    

  }
})

Template.signature.onCreated( () => {
  let template = Template.instance()

  Session.setDefault('fromOf', undefined) 

  template.autorun( () => {
    template.subscribe('Signature')
  }) 
}) 

Template.signature.helpers({
  signature() {
    return Signatures.findOne()
  }
})

Template.signature.events({
  'click [name="draw"]'(e, t) {
    let letterId = FlowRouter.getParam('letterId')
    Session.set('fromOf', letterId) 
    FlowRouter.go('/draw_signature')
  }
})