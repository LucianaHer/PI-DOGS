import React from 'react';
import  {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {postDog, getTemperaments} from "../../actions";
import Styles from './DogForm.module.css'




 //validaciones
  function validate(objForm) {

    var errores = {};
    var arrW= objForm.weight.split('-');
    var arrH= objForm.height.split('-');
    var mjeWeigth="El peso minimo debe ser menor que el máximo!!"
    var mjeHeight="La altura mínima debe ser menor que la máxima!!"


    if(arrW[0] && arrW[1]){
        if(arrW[0].length>arrW[1].length)  {
            errores.weight=mjeWeigth;
        }else if(arrW[0].length===arrW[1].length) {
            if(arrW[0]>arrW[1]){
                errores.weight=mjeWeigth;
            }
        }
    } 
    if(arrH[0] && arrH[1]){
        if(arrH[0].length>arrH[1].length)  {
            errores.height=mjeHeight;
        }else if(arrH[0].length===arrH[1].length) {
            if(arrH[0]>arrH[1]){
                errores.height=mjeHeight;
            }
        }
    } 
        
    if(objForm.life_span > 25){
        errores.life_span="Los perros no pueden vivir tanto (hasta 25 años aceptado) !!!"
    }

    return errores;
  };


export default function Dog_Form() {
    const dispatch = useDispatch();
    const history=useHistory();//para redirigir a alguna ruta
    const allTemps = useSelector((state) => state.temps); 
    var inputTemp1;

    const [errors, setErrors]=useState({});
    
    const[objForm, setObjForm]= useState({
        name:"",
        height:"",
        weight:"",
        life_span:"",
        temperaments: []
    })

    useEffect(() => { //para llenar el estado temperaments disparando la action getTemperaments
        dispatch(getTemperaments());
      }, [dispatch]);

    
    function handleInputChange(e){
        setObjForm({
            ...objForm,
            [e.target.name] : e.target.value
        })

        setErrors(validate({
            ...objForm,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        e.preventDefault();
   
        setObjForm({
            ...objForm,
            temperaments: [ ...objForm.temperaments, e.target.value]
        })
        

    }

    function handleDelete(el){
        setObjForm({
            ...objForm,
            temperaments: objForm.temperaments.filter(t => t !== el)
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

        setErrors({})
    }
   
    function handleSubmit(e){
        e.preventDefault();
        
        console.log("DATOS A ENVIAR: ",objForm);
        
        console.log("Temperamentos del estado localobjForm: ",objForm.temperaments)
        dispatch(postDog(objForm));
        alert("Raza creada con éxito!!");
        
        //history.push('/home');// me redirige al Home
    }

    return (
      <div>
        <h1>Creación de una nueva raza!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre Raza:</label> 
            <input
              className={Styles}
              type="text"
              value={objForm.name}
              name="name"
              placeholder="Nombre de la raza..."
              pattern="[a-zA-Z]{2,20}"
              title="Solo letras, hasta 20 caracteres ej: Abc..." 
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label>Peso:</label> 
            <input
              type="text"
              value={objForm.weight}
              name="weight"
              placeholder="00-90...(Kgs :Minimo-Máximo)"
              pattern="[0-9]{1,2}[-][0-9]{1,2}" 
              title="solo numeros, formato permitido: ej: 0-90 " 
              required 
              onChange={(e) => handleInputChange(e)}
            /> 
            {errors.weight && (
                <p className={Styles.error}> {errors.weight} </p>
            )}         
          </div>

          <div>
            <label>Altura:</label> 
            <input
              type="text"
              value={objForm.height}
              name="height"
              placeholder="00-90 (Cms: Altura min-Altura max)"
              pattern="[0-9]{1,2}[-][0-9]{1,2}" 
              title="solo numeros, formato permitido: ej: 0-90 " 
              required 
              onChange={(e) => handleInputChange(e)}
            />
            {errors.height && (
                <p className={Styles.error}> {errors.height} </p>
            )}
          </div>

          <div>
            <label>Años de Vida promedio:</label>{" "}
            <input
              type="text"
              value={objForm.life_span}
              name="life_span"
              placeholder="10 Años...(promedio de vida)"
              pattern="[0-9]{1,2}" 
              title="Solo números, de 1 a 2 digitos ej: 15 (Años promedio de vida)" 
              onChange={(e) => handleInputChange(e)}
            />
            {errors.life_span && (
                <p className={Styles.error}> {errors.life_span} </p>
            )}
          </div>

          <div>
            <label>Crear Temperamento/s:</label>        
            <input
              type="text"
              value={inputTemp1}
              name="temp1"
              //required
              placeholder="Temperamento..."
              pattern="[a-zA-Z]{2,10}"
              title="Valores permitidos ej: Abc...(hasta 10 caracteres)"         
              onDoubleClick={(e)=>handleSelect(e)}
            />
            
            <select name="temps" onChange={(e) => handleSelect(e)}>
              <option  key={100}>
                Seleccionar Temparamentos
              </option>
              {allTemps.map((t) => (
                <option  key={t.id} value={t.nameTemp}>
                  {t.nameTemp}
                </option>
              ))}
            </select>
              <br/><label>(dobleclick p/agregar)</label>
            {/* <ul>
              <li> {objForm.temperaments.map((el) => el + ", ")} </li>
            </ul> */}
            {/* renderiza la lista con los seleccionados */}
            {objForm.temperaments.map(el=> 
                <div>
                    <span className={Styles.temps}>{el}</span>
                    <button type='button' className={Styles.tDelete} key={el.id} onClick={()=>handleDelete(el)}> X </button>
                </div>     
                )}
          </div>

          <div>
            <button key="sub" type="submit"> CREAR! </button>
          </div>

          {/* podria haber otro input para una imagen, si en la tabla hay campo imagen, o no aca y ponerla x default cdo se renderiza */}
          <input type="reset" value="Crear otra raza" onClick={clearForm}></input>
        </form>
        <Link to="/home">
          <button>Volver</button>
        </Link>
      </div>
    );
};
   





