/* Render a restrained studio product film from complete photographic scenes.
 * The scene stays physically consistent: no floating cutout or artificial spin. */
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const sharp = require('sharp');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const W=1600,H=900,FPS=24,DURATION=10;
const ease=x=>x*x*(3-2*x);
function shot(ctx,img,zoom,pivotX=.76,pivotY=.5,pan=0){
 const scale=Math.max(W/img.width,H/img.height)*zoom;
 const iw=img.width*scale,ih=img.height*scale;
 ctx.drawImage(img,W*pivotX-iw*pivotX+pan,H*pivotY-ih*pivotY,iw,ih);
}
(async()=>{
 const [studio,macro]=await Promise.all([
  loadImage(path.join(root,'artwork/hero-packshot-v2.png')),
  loadImage(path.join(root,'artwork/campaign-source.png'))
 ]);
 const canvas=createCanvas(W,H),ctx=canvas.getContext('2d');
 const output=path.join(root,'public/media/energy-film-v2.mp4');
 const ffmpeg=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','rawvideo','-pixel_format','rgba','-video_size',`${W}x${H}`,'-framerate',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-threads','2',output],{stdio:['pipe','inherit','inherit']});
 const finished=once(ffmpeg,'exit');
 for(let frame=0;frame<FPS*DURATION;frame++){
  const t=frame/FPS;
  ctx.fillStyle='#030304';ctx.fillRect(0,0,W,H);
  if(t<4.25){
   // A slow lens push while the can stays grounded in its photographic scene.
   const p=ease(t/4.25);shot(ctx,studio,1+p*.045,.76,.5,-p*5);
  }else if(t<6.75){
   // One clean editorial cut to the packaging detail. No doubled-can dissolve.
   const p=ease((t-4.25)/2.5);shot(ctx,macro,1.06+p*.055,.76,.48,8-p*18);
  }else{
   // Return to the full packshot; final pose matches the opening loop frame.
   const p=ease((t-6.75)/3.25);shot(ctx,studio,1.045*(1-p)+p,.76,.5,-5*(1-p));
  }
  const shade=ctx.createLinearGradient(0,0,W,0);
  shade.addColorStop(0,'rgba(3,3,4,.97)');shade.addColorStop(.34,'rgba(3,3,4,.94)');shade.addColorStop(.49,'rgba(3,3,4,.72)');shade.addColorStop(.64,'rgba(3,3,4,.03)');shade.addColorStop(1,'rgba(3,3,4,0)');
  ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);
  if(frame===0)await sharp(canvas.toBuffer('image/png')).webp({quality:92}).toFile(path.join(root,'public/media/film-poster-v2.webp'));
  const pixels=ctx.getImageData(0,0,W,H).data;
  if(!ffmpeg.stdin.write(Buffer.from(pixels.buffer,pixels.byteOffset,pixels.byteLength)))await once(ffmpeg.stdin,'drain');
  if(frame%60===0)console.log(`Rendered ${frame}/${FPS*DURATION} frames`);
 }
 ffmpeg.stdin.end();const [code]=await finished;if(code!==0)throw new Error(`ffmpeg exited ${code}`);
 const small=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',output,'-vf','scale=960:540','-an','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart','-threads','2',path.join(root,'public/media/energy-film-small-v2.mp4')],{stdio:'inherit'});
 const [smallCode]=await once(small,'exit');if(smallCode!==0)throw new Error(`Phone encode exited ${smallCode}`);
 console.log('Refined product film and phone version ready.');
})().catch(e=>{console.error(e);process.exit(1);});
