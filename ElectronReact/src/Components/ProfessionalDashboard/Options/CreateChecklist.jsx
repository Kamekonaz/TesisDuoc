
import React from "react";
import ProfessionalSidebar from "../ProfessionalSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


function CreateChecklist() {
  const cookies = new Cookies();
  const [displayOptions, setDisplayOptions] = React.useState([])
  const [optionValue, setOptionValue] = React.useState('')
  const [position, setPosition] = React.useState(1)
  const [title, setTitle] = React.useState("")
  

  function utilizePosition(){
    const currentPosition = position+0;
    setPosition(position+1)
    return currentPosition;
  }

  function deleteOption(position){
    const newOption = JSON.parse(JSON.stringify(displayOptions))
    const optionsResult = newOption.filter((uwu) => uwu["key"] !== position)
    setDisplayOptions(optionsResult)
  }

  async function guardar(){
    //console.log(title, "titleee")
    const data = {
      sessionKey: cookies.get("appsessionKey"),
      title: title,
      options: displayOptions
    }
    //console.log(data)
    await axios.post("http://localhost:3001/makeChecklist",data).then(
      Swal.fire({
          title: "<h5 style='color:white'>Exito</h5>",
          html: "<p style='color:white'>Checklist creado exitosamente</p>",
          icon: 'success',
          background: '#272727',
          showCancelButton: false,
          confirmButtonColor: '#7BCA6F',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.reload()
          }
      })
  );
    
  }

  function addOption(value){
    const newDisplayElement = {
      key: utilizePosition(),
      content: value
    }
    setDisplayOptions(oldDisplay => [...oldDisplay, newDisplayElement])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value
      if (value.length > 0){
        addOption(value)
        setOptionValue('')
      } 
    }
  };
  

  return (
    <div style={{height: '100vh'}} >
        <ProfessionalSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col pt-6 pl-6" style={{height: "100vh"}}>
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título de checklist</label>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" style={{maxWidth: "450px"}} className="bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Ingresar título" />
                </div>

                <div className="flex flex-col mt-10 w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Añadir opciones</label>
                    <input value={optionValue} onChange={(e) => setOptionValue(e.target.value)} onKeyDown={handleKeyDown} type="text" style={{maxWidth: "450px"}} className="bg-gray-800 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Ingresar descripción"/>
                    <div className="pl-2 text-white h-6">{optionValue.length > 0 ? "Presiona enter para añadir" : ""}</div>
                </div>
                <div className="flex flex-col mt-10 space-y-2 pl-3 overflow-y-auto" style={{maxHeight: "600px",minHeight: "600px"}}>
                  <div className="text-white">{displayOptions.length} opciones</div>
                  {
                    displayOptions.map((displayOption, index) => {
                      return (
                        <div className="flex" key={displayOption["key"]}>
                        <div className="bg-gray-800 border border-gray-900 text-gray-200 text-sm rounded-lg shadow-lg block w-full p-2.5 flex" style={{maxWidth: "600px"}}>
                            <div className="font-bold text-start" style={{minWidth: "20px"}}>{index+1}</div>
                            <div>{displayOption["content"]}</div>
                
                        </div>
                        <div onClick={()=>deleteOption(displayOption["key"])} className="p-2 my-auto -ml-8 text-red-600 font-bold select-none hover:text-red-700">
                            X
                        </div>
                    </div>
                      );
                    })
                  }              
                </div>
                {/* HACER EL CREAR */}
                <div className="w-full flex pr-12 rounded-lg">
                    <div onClick={()=> guardar()} className="ml-auto text-white font-bold bg-blue-400 hover:bg-blue-500 px-6 py-2 select-none">Crear</div>
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default CreateChecklist;
