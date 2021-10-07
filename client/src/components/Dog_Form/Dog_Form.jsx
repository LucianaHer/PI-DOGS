import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {postDog, getTemperaments} from "../../actions";



export default function Dog_Form() {
    const dispatch = useDispatch();
    const history=useHistory();//para redirigir a alguna ruta
    const allTemps = useSelector((state) => state.temps); 
    

    useEffect(() => { //para llenar el estado temperaments disparando la action getTemperaments
        dispatch(getTemperaments());
      }, [dispatch]);

    //{nombre, altura, peso, años, temperaments}
    const[objForm, setObjForm]= useState({
        name:"",
        height:"",
        weight:"",
        life_span:"",
        temperaments: []
    })
    // var[inputTemp1,setInputTemp1]=useState("")
    // var[inputTemp2,setInputTemp2]=useState("")
    // var[inputTemp3,setInputTemp3]=useState("")
    var inputTemp1;


    function handleInputChange(e){
        setObjForm({
            ...objForm,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        e.preventDefault();
        inputTemp1="";
        setObjForm({
            ...objForm,
            temperaments: [ ...objForm.temperaments, e.target.value]
        })
        

    }

    function clearForm(){
        setObjForm({
              name: "",
              height: "",
              weight: "",
              life_span: "",
              temperaments: [],
            });
    }
   
    function handleSubmit(e){
        e.preventDefault();
        
        console.log("DATOS A ENVIAR: ",objForm);
        
        console.log("Temperamentos del estado localobjForm: ",objForm.temperaments)
        dispatch(postDog(objForm));
        alert("Raza creada con éxito!!");
        // setObjForm({
        //   name: "",
        //   height: "",
        //   weight: "",
        //   life_span: "",
        //   temperaments: [],
        // });
        //history.push('/home');// me redirige al Home
    }

    return (
      <div>
        <h1>Creación de una nueva raza!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre Raza:</label> {/* campo obligatorio */}
            <input
              type="text"
              value={objForm.name}
              name="name"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label>Peso:</label> {/* campo obligatorio */}
            <input
              type="text"
              value={objForm.weight}
              name="weight"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label>Altura:</label> {/* campo obligatorio */}
            <input
              type="text"
              value={objForm.height}
              name="height"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label>Años de Vida:</label>{" "}
            {/* puede estar vacio, no es obligatorio, pero si está, controlar q sean nros */}
            <input
              type="text"
              value={objForm.life_span}
              name="life_span"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label>Crear Temperamento/s:</label>
            
            <input
              type="text"
              value={inputTemp1}
              name="temp1"
              onDoubleClick={(e)=>handleSelect(e)}
            />
            

            <select name="temps" onChange={(e) => handleSelect(e)}>
              <option  key={100}>
                Seleccionar Temparamentos
              </option>
              {allTemps.map((t) => (
                <option key={t.id} value={t.nameTemp}>
                  {t.nameTemp}
                </option>
              ))}
            </select>
              <br/><label>(dobleclick p/agregar)</label>
            <ul>
              <li> {objForm.temperaments.map((el) => el + ", ")} </li>
            </ul>{" "}
            {/* renderiza la lista con los seleccionados */}
          </div>

          <div>
            <button type="submit"> CREAR! </button>
          </div>

          {/* podria haber otro input para una imagen, si en la tabla hay campo imagen, o no aca y ponerla x default cdo se renderiza */}
          <input type="reset" value="Crear otra raza" onClick={clearForm}></input>
        </form>
        <Link to="/home">
          {" "}
          <button>Volver</button>{" "}
        </Link>
        {/* <button onClick= {clearForm} >Crear otra raza</button> */}
        

        {/* en vez de Volver puede ser ina imagen */}
      </div>
    );

    //validaciones
    
}




