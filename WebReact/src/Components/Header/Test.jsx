import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import './Test.css'

import { NavLink, Link } from "react-router-dom";


function Test({passFinalImage, imagen}) {
    const cookies = new Cookies();
    const [uwu, setUwu] = React.useState(
        {
            clicking: false,
            scale: 1,
            initial_pos: {
              X: 0,
              Y: 0,
            },
            current_pos: {
              X: 0,
              Y: 0,
            },
            to_move: {
              X: 0,
              Y: 0
            }
        }
    )
    const [styles, setStyles] = React.useState({});
    const [zoom, setZoom] = React.useState("0")
    const [srctest, setsrc] = React.useState("")


    function handleSetZoom(value){
        uwu["scale"] = (parseInt(value)*0.03) +1
        moveImage()
        setZoom(value)   
    }

    function moveImage(){
        const X = -1* uwu["to_move"]["X"]/uwu["scale"]
        const Y = -1* uwu["to_move"]["Y"]/uwu["scale"]
        setStyles({
            transform: `scale(${uwu["scale"]})`,
            objectPosition: `${X}px ${Y}px`
        })
      }

    function handleMouseDown(e){
        uwu["clicking"] = true
        uwu["initial_pos"] = {
            X: e.clientX,
            Y: e.clientY,
          }
    }

    function handleMouseMove(e){
        if( uwu["clicking"]){
            uwu["to_move"] = {
              X: uwu["initial_pos"]["X"] - e.clientX + uwu["current_pos"]["X"],
              Y: uwu["initial_pos"]["Y"] - e.clientY + uwu["current_pos"]["Y"]
            }
            moveImage()
          }
    }

    async function saveIMG(){
        const image = toDataURL()
        passFinalImage(image)
        //setsrc(image)
        console.log(image)
    }
    const toDataURL = () => {
        const canvas = document.createElement('canvas');
        const image = document.getElementById("img");

        

        // We use naturalWidth and naturalHeight to get the real image size vs the size at which the image is shown on the page
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        console.log(image.width, image.naturalWidth, image.offsetWidth, image.scale, image.offsetTop)


        var w = image.width * uwu["scale"];
        var h = image.height * uwu["scale"];

        
        const ctx = canvas.getContext('2d')
        ctx.scale(uwu["scale"],uwu["scale"])

        ctx.drawImage(image, 
            (image.width/uwu["scale"])/2 - canvas.width /2 - uwu["to_move"]["X"]/uwu["scale"], 
            (image.height/uwu["scale"])/2 - canvas.height /2 - uwu["to_move"]["Y"]/uwu["scale"]
        );



        const dataURL = canvas.toDataURL();

        return dataURL

    };
    function handleMouseUp(e){
        uwu["clicking"] = false
        uwu["current_pos"] = uwu["to_move"]
        toDataURL()
    }

    React.useEffect(()=>{
        window.addEventListener("mousemove", (e)=>{
            handleMouseMove(e)           
          })

        window.addEventListener("mouseup", (e)=>{
            handleMouseUp(e)
          })
    },[])




    return (
        <div className="Test flex">
            <div className="border border-black border-4 flex flex-col p-24">
                <div className="relative img-bg"  style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
                    <div className="img-container border border-4 border-black rounded-full" id="mydiv">
                        <img src={imagen} onMouseDown={(e)=>handleMouseDown(e)} draggable="false" style={styles} className={`img`} id="img"/>
                        
                    </div>
                </div>

                <input className="py-2" type="range" onChange={(e)=> handleSetZoom(e.target.value)} value={zoom} max="100"/>
                
                <div className="flex justify-between w-full">
                    <button className="select-none bg-red-500 text-white font-bold hover:bg-red-600">Cancelar</button>
                    <button onClick={()=>saveIMG()}>Aceptar</button>
                </div>
                <img src={srctest} alt="" />
            </div>
                
        </div>
    );
}

export default Test;
