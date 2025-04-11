
import './App.css'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import { useState, useEffect } from "react";
import { GrInstagram } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";

import { db } from "./firebase-config"; // Importa la configuración de Firebase
import { collection, addDoc } from "firebase/firestore"; // Importa las funciones necesarias de Firestore


function App() {
  const targetDate = new Date("2025-12-31T00:00:00"); // Establece la fecha de tu evento (por ejemplo, 31 de diciembre de 2025)
  
  // Función que calcula el tiempo restante
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    // Calcula los días, horas, minutos y segundos restantes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Estado para el tiempo restante
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState(""); // Estado para el correo electrónico ingresado
  const [message, setMessage] = useState(""); // Estado para el mensaje después de enviar el correo


  // Actualiza el estado cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      // Guarda el correo electrónico en Firestore
      await addDoc(collection(db, "emails"), {
        email: email,
        timestamp: new Date(), // Agrega un timestamp
      });

      // Si la adición fue exitosa, limpia el campo de correo
      console.log("Correo guardado correctamente");
      setMessage("Correo completado");
      setEmail("");

      // Después de 3 segundos, borra el mensaje de éxito
      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error("Error al guardar el correo:", error);
      setMessage("Hubo un error al registrar el correo");
    }
  };
  return (
    <>
     
  <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">

  {/* Shader Gradient */}
  <ShaderGradientCanvas
    style={{
      position: 'absolute', // Correcto
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0, // Por debajo del texto
    }}
  >
    <ShaderGradient
      grain='on'
      control="query"
      urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.1&cPolarAngle=90&cameraZoom=1&color1=%23e40000&color2=%237b0000&color3=%23a00000&destination=onCanvas&embedMode=off&envPreset=lobby&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=env&pixelDensity=1.2&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.2&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&toggleAxis=false&type=waterPlane&uAmplitude=0&uDensity=2.2&uFrequency=5.5&uSpeed=0.1&uStrength=5&uTime=0&wireframe=false&zoomOut=false"
    />
  </ShaderGradientCanvas>
   {/* Encabezado */}
      <div className="relative z-11 flex justify-between items-center p-4 bg-black/30">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <a href='mailto:trg.studio.dance@gmail.com'>
        <button className="bg-white text-black font-semibold py-2 px-4 rounded-full text-sm transition-transform transform hover:scale-105 hover:bg-gray-400 hover:text-white">
         CONTACT US!
        </button>
        </a>
      </div>

   {/* Contenido Central */}
      <div className="relative z-10 flex flex-col justify-center items-center h-[90vh] ">

        <div className="bg-black/15 backdrop-blur-md rounded-3xl px-10 py-8 border border-white/30 shadow-2xl text-center w-[300px] md:w-[1000px] sm:w-[600px]">
          <p className="text-4xl font-light tracking-widest py-2.5  mx-5">
            <span className="text-white">{timeLeft.days}</span>{" "}
            <span className="text-red-400 font-light">DAYS</span>{" "}
            <span className="text-white">{timeLeft.hours}</span>{" "}
            <span className="text-red-400 font-light">HOURS</span>{" "}
            <span className="text-white">{timeLeft.minutes}</span>{" "}
            <span className="text-red-400 font-light">MIN</span>{" "}
            <span className="text-white">{timeLeft.seconds}</span>{" "}
            <span className="text-red-400 font-light">SEC</span>
          </p>

          <div className='flex justify-center items-center py-5'>
            <img src='/today.png' className='h-auto w-[550px]'></img>
          </div>
          
        </div>

        {/* Formulario de registro de correo electrónico */}
      <div className="relative z-10 flex justify-center items-center py-10">
       
          <form className='flex' onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[150px] sm:w-[300px] p-2 mb-4bg-transparent border-b-1 border-white text-white focus:outline-none"
              placeholder={message ? message : "Enter your e-mail"}
              required
              autoComplete="off"
            />
            <button
              type="submit"
              className="mx-3 w-[150px] py-2 px-4 bg-white text-black font-semibold rounded-full hover:bg-gray-400 hover:text-white transition-transform transform hover:scale-105"
            >
              NOTIFY ME!
            </button>
        
          </form>
      </div>

      <div className='flex'>
      <a href="https://www.instagram.com/triggers.studio/" target="_blank" rel="noopener noreferrer" className='px-16'>
      <GrInstagram className="text-white text-4xl hover:text-gray-400 transition" />
      </a>
      <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"  className='px-16'>
      <FaTiktok className="text-white text-4xl hover:text-gray-400 transition" />
      </a>
      </div>


      </div>
      
  </div>



    </>
  )
}

export default App
