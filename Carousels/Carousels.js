
import { useEffect, useState } from "react"
import style from "./Carousels.module.css"
import { AiFillBackward, AiFillForward, AiOutlinePause } from "react-icons/ai";


export default function Carousel({children, height, width, interval, auto = false}){
    const [index, setIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(auto)
    useEffect(() =>{
        if(isPlaying) {
            let i = setTimeout(() =>{
                setIndex((index + 1)%children.length)
            },interval)
            return () =>{
                clearTimeout(i)
            }
        }
    },[auto, children.length, index, interval, isPlaying])
    function onPause(){
        setIsPlaying(!isPlaying)
    }
    function onNext(){
        setIndex((index + children.length + 1)%children.length)
    }
    function onBack(){
        setIndex((index + children.length - 1)%children.length)
    }
    function onSwitch(i){
        setIndex(i)
    }   
    return(
        <div className = {style.container} style = {{
            height: height,
            width: width,
        }}>  
            <div className = {style["tool-bar"]} style ={{
                justifyContent: "center",
                top: height-50
            }}>
                {children.map((e,i) => 
                    <svg height = "20" width = "20" className = {style["icon-2"]} onClick = {() => onSwitch(i)} key = {i}>
                        <circle cx = "10" cy = "10" r ={(index === i) ? "8" : "5"}  fill="black" stroke = {(index === i) ? "white" : "none"} strokeWidth = "3px"/>
                    </svg>
                )}
            </div>
            <div className = {style["tool-bar"]} style ={{
                top: height-25
            }}>
                <AiFillBackward onClick = {onBack} size = {25} className = {style.icon}/>
                <AiOutlinePause onClick = {onPause} size = {25} className = {style.icon}/>
                <AiFillForward onClick = {onNext} size = {25} className = {style.icon}/>
                
            </div>
            {children.map((e,i) =>
                <div 
                key = {i}
                className = {style.children}
                style = {{
                    position: "relative",
                    right: width*index,
                    height: height,
                    width: width,
                }}>
                    {e}
                </div>
                )}

        </div>
    )
}