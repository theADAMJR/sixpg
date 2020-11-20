import { loadImage, Canvas } from 'canvas';

export default class ImageGenerator 
{
    async addBackgroundToCanvas(ctx, canvas, backgroundURL: string) {
        if (backgroundURL && backgroundURL.includes('api'))
            throw Error('I don\'t think that\'s a good idea... 🤔');

        try {
          const background = await loadImage(backgroundURL || 'api/modules/image/wallpaper.png') 
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        }
        catch {}
    }
    applyText(canvas: Canvas, text: string)
    {
      const context = canvas.getContext('2d');
      let fontSize = 70;

      do
        context.font = `${fontSize -= 8}px Roboto, sans-serif`;
      while (context.measureText(text).width > canvas.width - 275);
      return context.font;
    }
    wrapText(ctx, text: string, x: number, y: number, maxWidth: number, lineHeight = 15) 
    {
      let words = text.split(' ');
      let line = '';

      for(let n = 0; n < words.length; n++) 
      {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else
          line = testLine;
      }
      ctx.fillText(line, x, y);
    }
}
