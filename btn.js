function init() {
    const buttons = document.getElementsByClassName('btn');
    for( let i=0; i<buttons.length; i++)
    {
      const canvas = document.createElement('canvas');

      canvas.width = buttons[i].clientWidth;
      canvas.height = buttons[i].clientHeight;
      canvas.dataset.endpos = 0;
      canvas.dataset.mode = 0;
      canvas.dataset.drawTimer = 0;

      const style = window.getComputedStyle(buttons[i]);
      canvas.dataset.borderColor = style.borderColor;
      canvas.dataset.fillColor = style.backgroundColor;
      buttons[i].style.backgroundColor = 'transparent';
      buttons[i].style.borderColor = 'transparent';

      canvas.dataset.font = style.font;
      canvas.dataset.text = buttons[i].textContent;
      buttons[i].textContent = "";

      canvas.classList.add('btn-canvas');
      canvas.addEventListener('mouseover', canvasOnMouseOver);
      canvas.addEventListener('mouseleave', canvasOnMouseLeave);
  
      clearAndDrawCanvasFace(canvas);
      buttons[i].appendChild(canvas);
    }
  }

  function canvasOnMouseOver() {
    this.dataset.mode = 1;
    clearInterval(parseInt(this.dataset.drawTimer));
    this.dataset.drawTimer = String(setInterval(drawCanvasOnTimer, 5, this));
  }

  function canvasOnMouseLeave() {
    this.dataset.mode = 2;
    clearInterval(parseInt(this.dataset.drawTimer));
    this.dataset.drawTimer = String(setInterval(drawCanvasOnTimer, 5, this));
  }

  window.onload = init;

  function drawCanvasOnTimer(obj) {
    clearAndDrawCanvasFace(obj);
    drawCanvasBorder(obj);

    let endpos = parseFloat(obj.dataset.endpos);

    const mode = parseInt(obj.dataset.mode);
    const d_angle = Math.PI * 2.0 / 100.0;

    if(mode == 1) {
      if(endpos >= Math.PI * 2.0) {
        endpos = Math.PI * 2.0;
    clearInterval(parseInt(obj.dataset.drawTimer));            
        obj.dataset.mode = 0;
      }
      else {
        endpos = Math.min(Math.PI * 2.0, endpos + d_angle);
      }
    }

    if(mode == 2) {
      if(endpos <= 0.0) {
        endpos = 0.0;
        clearInterval(parseInt(obj.dataset.drawTimer));
        obj.dataset.mode = 0;
      }
      else {
        endpos = Math.max(0.0, endpos - d_angle);
      }
    }

    obj.dataset.endpos = String(endpos);
  }

  function clearAndDrawCanvasFace(obj) {
    const ctx = obj.getContext('2d');
    const width = obj.width;
    const height = obj.height;
    ctx.clearRect(0, 0, width, height);
    const size = Math.min(width, height) - 2;
    ctx.beginPath();
    ctx.fillStyle = obj.dataset.fillColor;
    ctx.arc(width/2, height/2, size/2, 0, Math.PI*2.0, false);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.font = obj.dataset.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = obj.dataset.borderColor;
    ctx.fillText(obj.dataset.text, width/2, height/2);
  }

  function drawCanvasBorder(obj) {
    const ctx = obj.getContext('2d');
    const width = obj.width;
    const height = obj.height;
    const size = Math.min(width, height) - 2;
    
    let endpos = parseFloat(obj.dataset.endpos);

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.strokeStyle = obj.dataset.borderColor;
    ctx.arc(width/2, height/2, size/2, 0, endpos, false);
    ctx.stroke();
  }