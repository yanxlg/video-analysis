/**
 * 直播video分析，支持默认图片设置
 * 控制为每秒60帧，较少浏览器压力
 */
import * as React from "react";
import "web-library/es/polyfills/animationFrame";


export declare interface IVideoClip{
    x:number;
    y:number;
    width:number;
    height:number;
}

export declare interface ClipVideo{
    video:HTMLVideoElement;
    clip?:IVideoClip;
}



export declare interface IVideoAnalysisProps{
    clipVideo:ClipVideo|(()=>ClipVideo);
    poster:string;
    className?:string;
    style?:any;
}


class VideoSnapShot{
    public canvas:HTMLCanvasElement;
    public canvasContext:CanvasRenderingContext2D;
    private canvasWidth:number=1920;
    private canvasHeight:number=1080;
    constructor(canvasWidth:number,canvasHeight:number){
        this.canvas=document.createElement("canvas");
        this.canvas.height=this.canvasHeight=canvasHeight;
        this.canvas.width=this.canvasWidth=canvasWidth;
        this.canvas.style.width=canvasHeight + "px";
        this.canvas.style.height=canvasWidth + "px";
        this.canvasContext=(this.canvas as any).getContext("2d");
    }
    public takeSnapShot(video:HTMLVideoElement,clip?:IVideoClip){
        this.canvasContext.clearRect(0,0,this.canvasWidth,this.canvasHeight);//清除
        clip?this.canvasContext.drawImage(video,clip.x,clip.y,clip.width,clip.height,0,0,this.canvasWidth,this.canvasHeight)
            :this.canvasContext.drawImage(video,0,0,this.canvasWidth,this.canvasHeight)
    }
    
}

class VideoAnalysis extends React.Component<IVideoAnalysisProps>{
    // private playing:boolean=false;
    private videoSnapShot:VideoSnapShot;
    private canvasWidth:number=1920;
    private canvasHeight:number=1080;
    private placeholderImage:HTMLImageElement;
    private canvas:HTMLCanvasElement;
    private canvasContext:CanvasRenderingContext2D;
    private getClipVideo:()=>ClipVideo;
    private analysisCanvas:HTMLCanvasElement;
    private analysisContext:CanvasRenderingContext2D;
    private enableLoop:boolean=false;
    private showPoster:boolean=false;
    constructor(props:IVideoAnalysisProps){
        super(props);
        const clipVideo = props.clipVideo;
        this.getClipVideo=typeof clipVideo=== "function"?()=>clipVideo():()=>clipVideo;
        // this.playing=true;
      /*  this.onPlay=this.onPlay.bind(this);
        this.onPause=this.onPause.bind(this);
        this.onStop=this.onStop.bind(this);
        this.onAbort=this.onAbort.bind(this);
        this.onError=this.onError.bind(this);
        this.onEnd=this.onEnd.bind(this);
        this.onStalled=this.onStalled.bind(this);
        this.onSuspend=this.onSuspend.bind(this);
        this.onEmptied=this.onEmptied.bind(this);*/
       /* this.video.addEventListener("play",this.onPlay);
        this.video.addEventListener("pause",this.onPause);
        this.video.addEventListener("stop",this.onStop);
        this.video.addEventListener("abort",this.onAbort);
        this.video.addEventListener("error",this.onError);
        this.video.addEventListener("end",this.onEnd);
        this.video.addEventListener("stalled",this.onStalled);
        this.video.addEventListener("suspend",this.onSuspend);
        this.video.addEventListener("emptied",this.onEmptied);*/
        this.videoSnapShot=new VideoSnapShot(this.canvasWidth,this.canvasHeight);//大小可变怎么处理
        this.analysisCanvas=this.videoSnapShot.canvas;
        this.analysisContext=this.videoSnapShot.canvasContext;
        
        
        
        const image=new Image();
        image.src=props.poster;
        image.onload=()=>{
            this.placeholderImage=image;
            //需要显示占位图
          /*  this.canvasContext.drawImage(this.placeholderImage,0,0,this.placeholderImage.width,this.placeholderImage.height,0, 0, this.width, this.height);
            this.showPlaceholder=true;
            this.imageWidth=this.placeholderImage.width;
            this.imageHeight=this.placeholderImage.height;*/
        }
    }
/*    private onPlay(){
        this.playing=true;
    }
    private onPause(){
        this.playing=false;
    }
    private onStop(){
        this.playing=false;
    }
    private onAbort(){
        this.playing=false;
    }
    private onError(){
        this.playing=false;
    }
    private onEnd(){
        this.playing=false;
    }
    private onStalled(){
        this.playing=false;
    }
    private onSuspend(){
        this.playing=false;
    }
    private onEmptied(){
        this.playing=false;
    }*/
    componentDidMount(){
        this.canvasContext=(this.canvas as any).getContext("2d");
    }
    private analysis(){
        const canvas =this.analysisCanvas;
        const context = this.analysisContext;
        const point1=context.getImageData(0,0,1,1).data;
        let colorStr="";
        colorStr=point1.toString();
        if("0,0,0,255"!==colorStr&&"0,0,0,0"!==colorStr){
            return true;
        }
        const point2=context.getImageData(canvas.width/2-1,canvas.height/2-1,1,1).data;
        colorStr=point2.toString();
        if("0,0,0,255"!==colorStr&&"0,0,0,0"!==colorStr){
            return true;
        }
    
        const point3=context.getImageData(canvas.width-1,0,1,1).data;
        colorStr=point3.toString();
        if("0,0,0,255"!==colorStr&&"0,0,0,0"!==colorStr){
            return true;
        }
        const point4=context.getImageData(0,canvas.height-1,1,1).data;
        colorStr=point4.toString();
        if("0,0,0,255"!==colorStr&&"0,0,0,0"!==colorStr){
            return true;
        }
        const point5=context.getImageData(canvas.width-1,canvas.height-1,1,1).data;
        //[0,0,0,255]
        colorStr=point5.toString();
        if("0,0,0,255"!==colorStr&&"0,0,0,0"!==colorStr){
            return true;
        }
        //采样
        const length=Math.floor(canvas.width/50);
        const depth=Math.floor(canvas.height/50);
        for(let i =1;i<length;i++){
            for(let j =1;j<depth;j++){
                const point = context.getImageData(50*i-1,50*j-1,1,1).data;
                colorStr=point.toString();
                if("0,0,0,255"!==colorStr&&"0,0,0,0"!==colorStr){
                    return true;
                }
            }
        }
        return false;
    }
    private loop(){
        //loop 算法
        setTimeout(()=>{
            const clipVideo = this.getClipVideo();
            const {video,clip}=clipVideo;
            video?(this.videoSnapShot.takeSnapShot(video,clip),this.analysis()?
                    (this.canvasContext.drawImage(this.analysisCanvas,0,0,this.canvasWidth,this.canvasHeight),this.showPoster=false)
                    :this.placeholderImage&&!this.showPoster?(this.canvasContext.drawImage(this.placeholderImage,0,0,this.canvasWidth,this.canvasHeight),this.showPoster=true):null
            ):this.placeholderImage&&!this.showPoster?(this.canvasContext.drawImage(this.placeholderImage,0,0,this.canvasWidth,this.canvasHeight),this.showPoster=true):null;
            if(this.enableLoop){
                this.loop();//loop提前，加速运行
            }
        },0);
/*        window.requestAnimationFrame(()=>{
            if(this.enableLoop){
                this.loop();//loop提前，加速运行
            }
            const clipVideo = this.getClipVideo();
            const {video,clip}=clipVideo;
            video?(this.videoSnapShot.takeSnapShot(video,clip),this.analysis()?
                    (this.canvasContext.drawImage(this.analysisCanvas,0,0,this.canvasWidth,this.canvasHeight),this.showPoster=false)
                    :this.placeholderImage&&!this.showPoster?(this.canvasContext.drawImage(this.placeholderImage,0,0,this.canvasWidth,this.canvasHeight),this.showPoster=true):null
            ):this.placeholderImage&&!this.showPoster?(this.canvasContext.drawImage(this.placeholderImage,0,0,this.canvasWidth,this.canvasHeight),this.showPoster=true):null;
        });*/
    }
    private startLoop(){
        this.enableLoop=true;
        this.loop();
    }
    private stopLoop(){
        this.enableLoop=false;
    }
    
    public startPlay(){
        if(!this.canvasContext||!this.canvas){
            console.error("不允许提前调用");
        }else{
            this.startLoop();
        }
    }
    public stopPlay(){
        this.stopLoop();
    }
    shouldComponentUpdate(){
        return false;//不支持更新属性
    }
    render(){
        const {className,style} = this.props;
        return <canvas ref={(ref:HTMLCanvasElement)=>this.canvas=ref} width={this.canvasWidth} height={this.canvasHeight} className={className} style={style}/>
    }
}

export default VideoAnalysis;