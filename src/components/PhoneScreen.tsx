import React, {useEffect, useState,useRef} from 'react'
import AppIcon from './AppIcon'
import '../styles/PhoneScreen.css'



const PhoneScreen = () => {
  const notifIndex : number[] = [];
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>();
  const [image, setImage]= useState<any>({});

  //importing the paths of the images + the names of the apps through the file name in the folder 
  //also establishes if it is an app that has notifications + the initial notification count 
  function importAll(r: __WebpackModuleApi.RequireContext)  {
    let images : any = {};
    r.keys().map((item,index) => { 
      const i = item.slice(2).split('-96x96-')[0].replace('-', ' ');
      const notif = ['app-store', 'calendar', 'facetime', 'message','mail', 'reminders'].includes(i);
      let count = 0;
      if(notif){
        notifIndex.push(+index);
        count = Math.floor(Math.random() * 101);
      }
      images[index] = {img: r(item), name: i, hasNotification: notif, count: count }; });
    return images;
  }
  //calls the import all function with certain extensions 
  const img = importAll(require.context('../assets/ios-icons', false, /\.(png|jpe?g|svg)$/));
  const bottomIcons = importAll(require.context('../assets/bottom-bar', false, /\.(png|jpe?g|svg)$/));

  //sets the home page images 
  useEffect(() => {
    setImage(img);

  }, []);

  if (intervalIdRef.current) {
    clearInterval(intervalIdRef.current);
  }

  // An interval timer that randomly changes the alerts for certain apps 
  intervalIdRef.current = setInterval(() => {
    
  const rand : number = Math.floor(Math.random() * notifIndex.length);
  const index = notifIndex[rand];
  
 
  
  if(image.length != 0 && image[`${index}`] &&index){
    image[`${index}`].count = image[`${index}`].count + 1;
    changeNotification(index, image[index]);}
  }, 5000);


  const changeNotification = (index: number, line : {name : string, img: string, hasNotification: boolean, count:number}) => {
   
    setImage({...image, [index]: line})
  }

  const url = '../assets/ios-icons/'
  return (
    <div className="PhoneScreen">
      <>
      <div className="notch"></div>
      <div className="HomeScreen">
        <div className="appGrid">
        {Object.keys(image).map(key => {
          let k: number = +key;
          
         
          
          return <AppIcon index={k} line= {{...image[`${k}`], isBottom: false}} setImage={changeNotification}/>
            
            
        })}
        </div>
        
        
      <div className="bottom">
        <div className="bottomIcons">
        {Object.keys(bottomIcons).map(key => {
          let k: number = +key;
          
         
          
          return <AppIcon index={k} line= {{...image[`${k}`], isBottom: true}} setImage={changeNotification}/>
            
            
        })}
        </div>
      
      </div>
      <div id="overlay"></div>
      </div>
      </>

      
    </div>
  )
}

export default PhoneScreen