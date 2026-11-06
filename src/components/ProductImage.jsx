import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
const base=import.meta.env.BASE_URL;
export default function ProductImage(){
 const host=useRef(null), control=useRef({paused:false}),[loaded,setLoaded]=useState(false),[paused,setPaused]=useState(false),[active,setActive]=useState(false);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setActive(true);observer.disconnect();}},{rootMargin:"240px"});
  observer.observe(host.current);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(!active)return;
  let disposed=false, cleanup=()=>{};
  import('three').then(T=>{
   if(disposed)return;
   const el=host.current;let renderer;
   try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch(error){el.dataset.fallbackReason=error.message;return;}
   renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=T.SRGBColorSpace;renderer.setClearColor(0x000000,0);el.appendChild(renderer.domElement);
   const scene=new T.Scene(),camera=new T.PerspectiveCamera(30,1,.1,30);camera.position.set(0,.2,8.5);camera.lookAt(0,0,0);
   const group=new T.Group();scene.add(group);
   const metal=new T.MeshStandardMaterial({color:0xb9bec4,metalness:.88,roughness:.26});
   const bodyMat=new T.MeshStandardMaterial({color:0xffffff,metalness:.26,roughness:.36});
   const body=new T.Mesh(new T.CylinderGeometry(.66,.66,2.95,128,1,true,-Math.PI),bodyMat);group.add(body);
   const texture=new T.TextureLoader().load(base+'media/can-body.png',()=>{if(disposed)return;texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();bodyMat.map=texture;bodyMat.needsUpdate=true;setLoaded(true);});
   for(const y of [-1.51,1.51]){
    const rim=new T.Mesh(new T.TorusGeometry(.635,.039,12,96),metal);rim.rotation.x=Math.PI/2;rim.position.y=y;group.add(rim);
    const cap=new T.Mesh(new T.CylinderGeometry(.63,.63,.055,96),metal);cap.position.y=y;group.add(cap);
    const shoulder=new T.Mesh(new T.CylinderGeometry(y>0?.63:.66,y>0?.66:.63,.08,96),metal);shoulder.position.y=y>0?1.475:-1.475;group.add(shoulder);
   }
   const tab=new T.Mesh(new T.TorusGeometry(.13,.035,8,40),metal);tab.rotation.x=Math.PI/2;tab.scale.z=1.8;tab.position.set(0,1.55,.06);group.add(tab);
   scene.add(new T.HemisphereLight(0xffffff,0x34343a,2));
   const key=new T.DirectionalLight(0xffffff,4);key.position.set(-3,4,5);scene.add(key);
   const red=new T.PointLight(0xef3434,16,12);red.position.set(2,1,-1);scene.add(red);
   const strip=new T.PointLight(0xddeaff,12,12);strip.position.set(-2,2,3);scene.add(strip);
   let visible=false,frame=0,last=0,time=0,scroll=0,drag=0,down=false,start=0,angle=0;
   const reduced=matchMedia('(prefers-reduced-motion: reduce)');
   function size(){const {width,height}=el.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}const ro=new ResizeObserver(size);ro.observe(el);size();
   function draw(now){frame=requestAnimationFrame(draw);const dt=Math.min((now-last)/1000,.04);last=now;if(!visible||document.hidden)return;
    const animate=!reduced.matches&&!control.current.paused;
    if(animate)time+=dt;
    const rect=el.getBoundingClientRect();scroll=Math.max(-1,Math.min(1,(innerHeight*.5-(rect.top+rect.height*.5))/innerHeight));
    const target=drag+(animate?Math.sin(time*.5)*.20+scroll*.24:0);angle+=(target-angle)*.065;
    group.rotation.set(-.045+(animate?scroll*.055:0),angle,-.065+(animate?scroll*.07:0));
    strip.position.x=-2+Math.sin(time*.6)*1.4;renderer.render(scene,camera);
   }frame=requestAnimationFrame(draw);
   const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;},{rootMargin:'80px'});io.observe(el);
   const pointerDown=e=>{down=true;start=e.clientX;el.setPointerCapture(e.pointerId);};
   const pointerMove=e=>{if(down){drag=Math.max(-.5,Math.min(.5,drag+(e.clientX-start)*.006));start=e.clientX;}};
   const pointerUp=()=>{down=false;};
   el.addEventListener('pointerdown',pointerDown);el.addEventListener('pointermove',pointerMove);el.addEventListener('pointerup',pointerUp);el.addEventListener('pointercancel',pointerUp);
   const keys=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();drag=Math.max(-.5,Math.min(.5,drag+(e.key==='ArrowLeft'?-.12:.12)));}};el.addEventListener('keydown',keys);
   cleanup=()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();el.removeEventListener('pointerdown',pointerDown);el.removeEventListener('pointermove',pointerMove);el.removeEventListener('pointerup',pointerUp);el.removeEventListener('pointercancel',pointerUp);el.removeEventListener('keydown',keys);scene.traverse(o=>{o.geometry?.dispose();});bodyMat.dispose();metal.dispose();texture.dispose();renderer.dispose();renderer.domElement.remove();};
  }).catch(error=>{if(host.current)host.current.dataset.fallbackReason=error.message;});
  return()=>{disposed=true;cleanup();};
 },[active]);
 return <figure className={'product-campaign-photo product-model '+(loaded?'model-ready':'')}>
  <img className="model-fallback" src={base+'can-refined.webp'} alt="Original ENERGY can, 250 ml" width="1211" height="1299" loading="lazy"/>
  <div ref={host} className="model-canvas" tabIndex={loaded?0:-1} role={loaded?"img":undefined} aria-label={loaded?"Interactive Original ENERGY can. Drag or use left and right arrow keys to turn.":undefined}/>
  <figcaption><span>ORIGINAL / 250 ML</span><span className="model-hint">Drag to turn</span></figcaption>
  {loaded&&<button className="model-pause" type="button" aria-label={paused?'Resume can animation':'Pause can animation'} onClick={()=>{control.current.paused=!paused;setPaused(!paused);}}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>}
 </figure>;
}
