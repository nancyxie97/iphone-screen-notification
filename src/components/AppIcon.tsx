import React, {useState, useEffect}from 'react'
import '../styles/AppIcon.css'

const AppIcon = (props: {index: number, line: {name : string, img: string, hasNotification: boolean, count:number, isBottom:boolean} , setImage: Function}  ) => {
    const [clicked, setClicked ] = useState<boolean>(false);
    // handles the clicking 
    function handleClick  (e: React.MouseEvent<HTMLDivElement>) {
    
        
        props.line.count =0 ;
        const icon = document.querySelector(`.${props.line.name.replace(' ','-')}`);
        const overlay = document.getElementById('overlay');

        //handles the css movement of the clicking of the app
        if(!clicked){
            
            icon?.classList.add('center');
            overlay?.classList.add('active');  
             
        }else{
            icon?.classList.remove('center');
            overlay?.classList.remove('active');  
        }
        setClicked(!clicked)
        
        props.setImage(props.index, props.line);
    }
    //resizing of the window helps with chainging the notifications 

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      function handleResize() {
        
        setScreenWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    //formatting of the app itself from the notification,icon, and text
    return (
   
    <div className={'appIcon ' + `${props.line.name?.replace(' ', '-')}`} onClick={handleClick}>
        {props.line.hasNotification && props.line.count != 0 && screenWidth < 1100 &&  <span className="notification">{props.line.count}</span>}
        <img key={props.line.name} src={props.line.img} alt="" />
        {!props.line.isBottom && ( screenWidth < 1100 ?  <div>{props.line.name}</div> : props.line.count != 0 ? <div>{props.line.name }({props.line.count })</div> :  <div>{props.line.name}</div>)}

    </div>
  )
}

export default AppIcon