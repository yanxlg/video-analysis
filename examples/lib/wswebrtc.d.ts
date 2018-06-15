import {PROFILE_ENUM, WSWebRTCEvents} from '../WSRTC';

declare interface WSInitInitParams{
    host:string;
    appId:string;
    appKey:string;
    userId:string;
    userRole:0|1;
    sdkType?:"MIC_LINK"|"STREAMER_SDK",
}

declare interface WSInitInitResult{
    code:number;
    message:string;
}

/**
 * 初始化模块
 */
class WSInit {
    static init(params: WSInitInitParams,callback: (result: WSInitInitResult) => void): void;
    static destory(): void;
}

/**
 * 销毁模块
 */
class WSDestroy{
    static destroy():void;
}

/**
 * 事件模块
 */
class WSEmitter {
    static listenTo(eventName: string, callback: Function): void;
    static removeTo(eventName: string, callback: Function): void;
    static removeToAll(): void;
    static trigger(eventName: string,...data:any): void;
}



declare interface WSPlayerSEIConfig{
    isSei:boolean;
    seiCallback:(obj:Object<any>)=>void
}

declare interface WSPlayerPlayParams{
    url:string;
    userId?:string;
    isLiveCatch?:boolean;
    enableAudioStrategy?:boolean;
    seiConfig:WSPlayerSEIConfig
}
/**
 * 播放合流模块
 */
class WSPlayer {
    static play(params:WSPlayerPlayParams): void;
    static destroy():void;
}



declare interface WSStreamPreviewParams{
    width:number;
    height:number;
    profile:PROFILE_ENUM;
    deviceId:string
}


declare interface AudioConfig{
    bitrate?:number;
    echoCancellation?:boolean;
}



declare interface VideoConfig{
    profile:string;
    bitrate:number;
    framerate:number;
    deviceId:string;
    isBrControl:boolean;
    brFactor?:number;
    landscape?:boolean;
}

declare interface CamConfig{
    audio?:boolean|AudioConfig;
    video:boolean|VideoConfig
}

declare interface Resolution{
    width:number;
    height:number;
}

declare interface LayoutConfig{
    x:number;
    y:number;
    width:number;
    height:number
}

declare interface Peer{
    name:string;
    layout_index:number;
}

declare interface MixConfig{
    layout?:1|2|11|22|0;
    resolution:Resolution;
    maxBitrate?:number;
    framerate?:number;
    sei:0|1;
    fill?:0|1|2;
    idle?:number;
    layoutIndex?:number;
    layout_content?:LayoutConfig[];
    roomUrl:string;
    peers?:Peer[]
}

declare interface WSStreamPushParams{
    channelId:string;
    userId:string;
    url?:string;
    userRole:0|1;
    isMix:boolean;
    isSei:boolean;
    camConfig:CamConfig,
    mixConfig?:MixConfig
}


declare interface WSStreamMixParams{
    roomId:string;
    userId:string;//主播
}

declare interface MixPeer{
    layout_index:number;
    name:string;// "host/appId_channelId/userId"
}

declare interface WSStreamMixConfig extends MixConfig{
    peers?:MixPeer[]
}

declare interface WSStreamMixJoinParams{
    userId:string;
    roomId:string;
}


declare interface WSStreamMixStateParams{
    roomId:string;
}

declare interface WSStreamMixDestoryParams{
    roomId:string;
}

export class WSStream {
    static startPreview(params: WSStreamPreviewParams): void;
    static stopPreview();
    static startPush(params: WSStreamPushParams):void;
    static stopPush();
    static startMix(params: WSStreamMixParams);
    static stopMix();
    static mixCreate(params: WSStreamMixConfig);
    static mixModify(params: WSStreamMixConfig);
    static mixJoin(params:WSStreamMixJoinParams);
    static mixQuit(params:WSStreamMixJoinParams);
    static mixStatus(params:WSStreamMixStateParams);
    static mixDestory(params:WSStreamMixDestoryParams);
    static destory();
}




declare interface StreamConfig{
    isMix:boolean;
    camConfig:CamConfig;
    mixConfig?:MixConfig;
    isSei?:boolean;
}
declare interface WSChannelCreateConfig{
    streamConfig:StreamConfig
}

declare interface WSChannelJoinConfig{
    isDirectLink:boolean;//是否直连，直连不播放合流
    streamConfig:StreamConfig;
    playConfig?:WSPlayerPlayParams
}

/**
 * 互动频道模块
 */
class WSChannel{
    static init(params?:any);
    static startPreview(params:WSStreamPreviewParams);
    static stopPreview();
    static createChannel(channelId:string,userId:string,config:WSChannelCreateConfig);//主播创建频道
    static destroyChannel();
    static joinChannel(channelId:string,userId:string,config:WSChannelJoinConfig);//观众加入互动频道
    static quitChannel();
    static destory();
    static sendMessage(userId:string,params:any);
}


class WSUtil{
    static version:string;
    static getMediaDevices(Function);
    static setVideoVolume(videoElementId:string,volume:number);
    static setVideoDisplay(videoElements:null|string|string[],display:"fill"|"contain");
}

class WSEvent{
    static Event:any;
    static SkinEvent:any;
    static LINK_EVENT:any;
    static PlayEvent:any;
    static LinkEvent:any;
    static SignalEvent:any;
}




class WSWebRTC{
    static WSInit=WSInit;
    static WSDestroy=WSDestroy;
    static WSEmitter=WSEmitter;
    static WSPlayer=WSPlayer;
    static WSStream=WSStream;
    static WSChannel=WSChannel;
    static WSUtil=WSUtil;
    static WSEvent=WSEvent;
}


export {WSWebRTC}