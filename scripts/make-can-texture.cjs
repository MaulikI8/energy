const {createCanvas,loadImage}=require('@napi-rs/canvas');
const fs=require('fs');
(async()=>{const im=await loadImage('public/can-refined.png');const c=createCanvas(2048,2048),x=c.getContext('2d');x.fillStyle='#08090b';x.fillRect(0,0,2048,2048);for(let i=0;i<2048;i++){const a=-Math.PI+i/2048*Math.PI*2;if(Math.cos(a)>0){const sx=603+Math.sin(a)*260;x.drawImage(im,sx,74,2,1155,i,0,2,2048);}}fs.writeFileSync('public/media/can-body.png',c.toBuffer('image/png'));})();
