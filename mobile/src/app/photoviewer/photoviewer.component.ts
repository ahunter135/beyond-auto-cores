import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { PhotoViewer, Image, ViewerOptions, capEchoResult,
 capShowOptions, capShowResult} from '@capacitor-community/photoviewer';
import { Capacitor } from '@capacitor/core';
import { Toast } from '@capacitor/toast';
import { ModalController } from '@ionic/angular';

@Component({
 selector: 'app-photoviewer',
 templateUrl: './photoviewer.component.html',
 styleUrls: ['./photoviewer.component.scss'],
})
export class PhotoviewerComponent implements OnInit, AfterViewInit {
  @Input("url") url;
 platform: string;
 imageList: Image[];
 mode: string = "one";
 startFrom: number = 0;
 options: ViewerOptions = {} as ViewerOptions;

 constructor(private modalCtrl: ModalController) {
   this.platform = Capacitor.getPlatform();
  }

 async ngOnInit() {
   this.imageList = [
     {url: this.url, title: ''}
   ];
 }
 async ngAfterViewInit() {
   const show = async (imageList: Image[], mode: string,
             startFrom: number, options?: ViewerOptions
             ): Promise<capShowResult> => {
     const opt: capShowOptions = {} as capShowOptions;
     opt.images = imageList;
     opt.mode = mode;
     options.share = false;
     options.title = false;
     if( mode === 'one' || mode === 'slider') {
       opt.startFrom = startFrom;
     }
     if(options) {
       opt.options = options;
     }
     try {
         const ret = await PhotoViewer.show(opt);
         console.log(`in const show ret: ${JSON.stringify(ret)}`);
         if(ret.result) {
             console.log(`in const show ret true: ${JSON.stringify(ret)}`);
             return Promise.resolve(ret);
         } else {
             console.log(`in const show ret false: ${JSON.stringify(ret)}`);
             return Promise.reject(ret.message);
         }
     } catch (err) {
         const ret: capShowResult = {} as capShowResult;
         ret.result = false;
         ret.message = err.message;
         console.log(`in const show catch err: ${JSON.stringify(ret)}`);
         return Promise.reject(err.message);
     }
   };
   const showToast = async (message: string) => {
     await Toast.show({
         text: message,
         position: 'center',
     });
   };

   const echo = await PhotoViewer.echo({value:'Hello from PhotoViewer'});
  
   try {
     this.mode = "one";
     this.startFrom = 2;
     // **************************************
     // here you defined the different options
     // **************************************
     // uncomment the following desired lines below
     // options.title = false;
     // options.share = false;
     // options.transformer = "depth";
     // options.spancount = 2
     this.options.maxzoomscale = 3;
     this.options.compressionquality = 0.6;
     this.options.movieoptions = {mode: 'portrait', imagetime: 3};
     // **************************************
     // here you defined url or Base64 images
     // **************************************
     // comment or uncomment as you wish
     // http images call
     const result = await show(this.imageList, this.mode,
                               this.startFrom,this.options);
     this.modalCtrl.dismiss();
     
   } catch (err) {
       console.log(`in catch before toast err: ${err}`);
       if(this.platform === 'web' || this.platform === 'electron') {
           window.location.reload();
       }
   }

 }
}