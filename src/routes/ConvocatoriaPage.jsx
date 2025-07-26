import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavBarConvo from "../components/navBarConvo";

import cale1 from '../assets/icons/cale1.svg'
import cale2 from '../assets/icons/cale2.svg'
import Llama from '../components/Llama';

import lamp from '../assets/icons/lamp.svg'
import pen from '../assets/icons/pen.svg'
import opt from '../assets/icons/opt.svg'
import docu from '../assets/icons/docu.svg'
import other from '../assets/other42.png'
import useTheme from "../hooks/useTheme";
import { Link } from "react-router-dom";


function ConvocatoriaPage() {
  const {isDark} = useTheme()

  return (
    <>
      <Navbar />
      <NavBarConvo />


    <div
    className="p-4 mt-5"
      style={{
        backgroundColor: isDark ? '#1b1a1aff' : '#f8f9fa',
      }}
    >
      {/* Sección Información */}
      <section id="informacion" className="py-2">
        <div className="container">
          <div className="card shadow-sm text-center">
             <Llama />
             
            <div className="card-body">
              <h2 className="card-title fs-2 fw-bold">
                PARTICIPA Y GANA HASTA<br />
                <span className="text-danger">280 USD EN EFECTIVO</span>
              </h2>
              <p className="card-text text-muted mt-3">
                La Convocatoria Internacional de Oneshots y Relatos de Reizu Comics se celebra dos veces al año (Enero y Julio). Participa enviando un oneshot o relato según la categoría, habrá 4 ganadores con premios garantizados. ¡No pierdas la oportunidad!
              </p>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/convocatoria/reglas" className="btn btn-danger">Ver Reglas</Link>
                <Link to="/convocatoria/formulario" className="btn btn-secondary">Ir al Formulario</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Calendario */}
      <section id="reglas" className="py-2"
      >
        <div className="container text-center ">
          <div className="card p-4">
            <Llama />
          <h3 className="mb-4  d-inline-block pb-2 fw-bold">
            CALENDARIO DE LA CONVOCATORIA
          </h3>
          <div className="row justify-content-center g-4 mt-3">
            <div className="col-md-4 col-lg-3">
              <div className=" shadow-sm h-100 text-center">
                <div >
                  <img src={cale1} alt="" className="mb-2" />
                  <h5 className="card-title fw-bold">PRIMER PERIODO</h5>
                  <p className="text-danger fw-bold">DEL 20 DE ENERO HASTA<br/>EL 22 DE MARZO</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className=" shadow-sm h-100 text-center">
                <div >
                  <img src={cale2} alt=""  className="mb-2"/>
                  <h5 className="card-title fw-bold">SEGUNDO PERIODO</h5>
                  <p className="text-danger fw-bold">DEL 20 DE JULIO HASTA<br/>EL 20 DE SEPTIEMBRE</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Sección Premios */}
      <section id="premios" className="py-2">
        <div className="container">
          <div className="card p-4">
             <Llama />
          <div className="text-center mb-4 ">
            <h3 className="fw-bold">DESCUBRE LOS DIFERENTES PREMIOS</h3>
          </div>
          <div className="row justify-content-center">
            <CardPremio number={"1er lugar"} premios={[
              "280 USD o el equivalente a su moneda local, entrega rápida y accesible.",
              "Publicación en la Plataforma Web de Reizu Comics (con derecho a serialización).",
              "Aparición en la Revista Digital Oneshot+."
            ]} />
            <CardPremio number={"2do Lugar"} premios={[
            "50 USD o el equivalente a su moneda local, que se le hará llegar de forma rápida y accesible.",
            "Mención en nuestras redes sociales.",
            "Aparecerá en la Revista digital Oneshot+."
            ]} />
            <CardPremio number={"3er Lugar"} premios={[
              "20 USD o el equivalente a su moneda local, que se le hará llegar de forma rápida y accesible.",
              "Mención en nuestras redes sociales.",
              "Aparecerá en la Revista digital Oneshot+"
            ]} />
           


      <div className="col-md-4 mb-4">
      <div className="card h-100 border-0 text-center shadow-sm">
        <div className="card-body">
          <h2 className="display-6 text-danger fw-bold">Relato</h2>
          <hr className="border-danger border-3 w-50 mx-auto my-3" />
          <ul className="list-unstyled text-start">
              <li 
              className="mb-2">50 USD o el equivalente a su moneda local, que sele hará llegar de forma rápida y accesible.
              </li>
              <li 
              className="mb-2">
Publicación en la Plataforma Web de Reizu comics (con derecho a serialización).
</li>
<li className="mb-2">
También Aparecerá dentro de la Revista Digital Oneshot+
              </li>
          
          </ul>
        </div>
      </div>
    </div>
           
            </div>
          </div>
        </div>
      </section>
      

 
      <section  className="py-2">
        <div className="container">
          <div className="card p-5">
             <Llama />
          <div className="text-center mb-4 ">
            <h3 className="fw-bold">PAUTAS A EVALUAR <br/> <span
            style={{color: "#FF2020"}}
            
            >
                TEMÁTICA A  LIBRE ELECCIÓN
              
              </span> 
              <br/>
            <span
            className="fs-5"
            style={{color: "#8B8B8B"}}
            >
              Como tambien la demografia y genero, deja volar tu imaginacion

            </span>
              
              </h3>
          </div>

          <div className="row">

          <CardGuidelines icon={lamp} title={"ORIGINALIDAD"} description={"No necesariamente buscamos obras innovadoras, nos gustan las historias creativas, con temas posiblemente simples, pero que tengan su toque especial que pueda atrapar a cualquiera a seguir leyendo."} />
          <CardGuidelines icon={opt} title={"TÉCNICA"} description={"Al hablar de técnica nos referimos al manejo de materiales, pinceles, Distintos tipos de planos, encuadres, paneling (distribucion de paginas), Narrativa visual como las herramientas de entintado y tramas."} />
          <CardGuidelines icon={docu} title={"NARRATIVA"} description={"El uso de un buen ritmo al contar la historia, personajes creíbles, con buen trasfondo y que encaje con lo que intenta contar la historia, manejo del inicio, clímax y desenlace."} />
          <CardGuidelines icon={pen} title={"DIBUJO"} description={"Buen diseño de personajes como atractivos a la vista, versatilidad ya sea en entorno, personaje, objetos y animales, trazos firmes y pulidos, manejo de proporciones, poses y expresiones varias."} />

            </div>


          </div>
          </div>
          </section>



           <section  className="py-2">
        <div className="container">
          <div className="card p-5 flex flex-column align-items-center gap-2">
             <Llama />

              <img src={other} alt="" width={350} height={350} />
              <p
               className="text-center fs-5"
              >CUALQUIER DUDA O PARA AMPLIAR LA INFORMACIÓN PUEDE ENVIAR UNA COREO A <a 
               className="text-danger"
              href="mailto:CONVOCATORIA@REIZUCOMICS.COM">CONVOCATORIA@REIZUCOMICS.COM</a> O ABRIR UN TICKET EN NUESTRO SERVIDOR DE DISCORD <span className="text-danger">“COMUNIDAD REIZU COMICS”</span> Y CON GUSTO LE RESPONDEREMOS.</p>

            </div>
            </div>
            </section>




            </div>

      <Footer />
    </>
  );
}

export default ConvocatoriaPage;




const CardPremio = ({number,premios}) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 border-0 text-center shadow-sm">
        <div className="card-body">
          <h2 className="display-6 text-danger fw-bold">{number}</h2>
          <hr className="border-danger border-3 w-50 mx-auto my-3" />
          <ul className="list-unstyled text-start">
            {premios.map((premio, index) => (
              <li 
                className="mb-2"
              key={index}>{premio}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};



const CardGuidelines = ({icon,title,description}) => {
  return (
    <div className="col-6 col-md-3 mb-4">
      <div className="card h-100 border-0 text-center shadow-sm">
        <div className="card-body">
          <img src={icon} alt={title} className="mb-3" />
          <h5 className="card-title fw-bold text-danger">{title}</h5>
          <p className="card-text text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}