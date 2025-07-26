import React from 'react';
import Navbar from '../components/Navbar';
import NavBarConvo from '../components/navBarConvo';
import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';
import { Link } from 'react-router-dom';



const ConvoRules = () => {
  const {isDark} = useTheme();


  return (
    <>
      <Navbar />
      <NavBarConvo />

      <div
       style={{
        backgroundColor: isDark ? '#1b1a1aff' : '#f8f9fa',
      }}
      >
      <div className="container py-5">
        <div className='card p-4'>
        <h2 className=" text-center text-danger fw-bold mb-4">
          REGLAS / BASES OFICIALES DE LA CONVOCATORIA
        </h2>
        <div className="shadow-sm">
          <div className="elementor-widget-container">
									<p><strong>REGLAS</strong><b> OFICIALES DE LA CONVOCATORIA DE&nbsp;ONESHOT Y RELATOS SÉPTIMA EDICIÓN POR&nbsp;REIZU COMICS.&nbsp; &nbsp;</b></p><p>&nbsp;<b>1. PATROCINADOR Y ADMINISTRADOR DEL CONCURSO.</b>&nbsp;</p><p>El administrador de este concurso es&nbsp;<a href="http://reizucomics.com" target="_blank" rel="noopener">REIZU COMICS LLC</a>, aliados y colaboradores&nbsp;<a href="https://sketchi-editorial.net" target="_blank" rel="noopener">SKETCHI</a>, <a href="https://www.instagram.com/deword_editions/">DEWORD EDITIONS</a> y patrocinado por <a href="https://www.xp-pen.com/la-clstore/">XP-PEN LATINOAMÉRICA</a></p><p>&nbsp;<b>2. PERÍODO DE PARTICIPACIÓN.</b>&nbsp;</p><p>Los trabajos destinados a la convocatoria de Oneshots y relatos serán recibidos en dos periodos. Cada periodo es independiente uno de otro, por lo que cada convocatoria tiene diversos ganadores y posibles premios, dependiendo de las campañas activas y/o colaboraciones que hemos implementado en ese momento. Por lo tanto, se pueden otorgar dos oportunidades al año para enviar su obra o decidir en qué periodo desea participar y preparar con anticipación su trabajo.&nbsp;</p><p><em>PERIODO I – Primera Mitad del año&nbsp;</em><br />Desde el 20 de enero hasta el 22 de marzo, los ganadores serán anunciados el 29 de abril. El cierre oficial de la convocatoria, incluidos todos los períodos de selección de ganadores, será el 29 de abril.</p><p><em>PERIODO II – Segunda mitad del año – <strong>(próximo)</strong></em><br />Desde el 8 de agosto hasta el 8 de octubre, los ganadores serán anunciados el 18 de noviembre. El cierre oficial de la convocatoria, incluidos todos los períodos de selección de ganadores, será el 18 de noviembre.</p><p>Al enviar un trabajo, los participantes aceptan las reglas oficiales y declaran haberlas leído en su totalidad, en la cual su participación cumple con todos los requisitos establecidos en las reglas oficiales. Cualquier obra que no cumpla con los siguientes parámetros a continuación, Reizu Comics. Está en todo el derecho de descalificar la participación de dichas obras.</p><p>
              <span className="text-danger">
                Consultar siempre las fechas y nuestras redes sociales para saber qué periodo de participación está activa o no.&nbsp;
              </span>
            </p><p><b>3. REQUISITOS PARA PARTICIPAR.</b>&nbsp;</p><ul><li>Se puede participar desde cualquier lugar de habla hispana.&nbsp;</li><li>La obra a enviar tiene que estar escrita en el idioma español o, en su defecto, traducida al mismo.</li><li>La convocatoria está abierta a participantes de todos los países del mundo de habla hispana, grandes y pequeños artistas.&nbsp;</li><li>Seguir las redes sociales para estar al tanto de la información respecto a las convocatorias y otras novedades.</li><li>Compartir la publicación de la convocatoria en de <a href="https://www.facebook.com/ReizuComics" target="_blank" rel="noopener">Facebook,</a>&nbsp;<a href="https://www.instagram.com/reizucomics/">Instagram</a> o <a href="https://twitter.com/ReizuComics">X</a>.</li><li>Los trabajos pueden presentarse a nombre de un artista individual o de un grupo de artistas, no obstante, todos los participantes deben tener al menos catorce (14) años cumplidos al momento de finalizar el Período de Participación, tanto de forma individual como grupal. Los participantes menores de dieciocho (18) años deben contar con la autorización de su madre, padre o tutor legal para participar en la convocatoria y recibir el premio.&nbsp;</li><li>Al momento de participar solo puede hacerlo en una de las categorías, ya sea en relato u Oneshot. Al elegir una de ellas, no puede participar en la otra durante la misma edición.</li></ul><div>&nbsp;</div><p>&nbsp;<b>4. REQUISITOS PARA LA PRESENTACIÓN DE TRABAJOS</b>&nbsp;</p><p>&nbsp;Cada participante o grupo de participantes deberá presentar su trabajo e incluir la información personal que se solicita en el proceso de inscripción en la convocatoria (<a href="https://reizucomics.com/convocatoria-oneshots" target="_blank" rel="noopener">ver formulario aquí</a>). Los requisitos de presentación son los siguientes:&nbsp;</p><p><b>Requisitos Básicos:&nbsp;</b></p><ul><li>No se aceptan obra a medio completar, borradores, bocetos, a lápiz, fotografiadas y/o mal escaneadas, el trabajo debe ser un trabajo final y completamente entintado.</li><li>La historia tiene que ser original, no se aceptan ideas que usen personajes o tramas de franquicias comerciales de películas, videojuegos, series y/o cualquier otro medio, aun si la obra o personaje no tiene derechos de autor.</li><li>El Oneshot debe tener un mínimo de 12 páginas y máximo 40 + Portada a color para dar un resultado final de 41 páginas como máximo.<ul><li>Para los relatos, el mínimo es 2400 palabras, máximo 3800.</li><li>Para Webcomic/Manwha mínimo 20 paneles máximos 80.</li></ul></li><li>El tamaño de la hoja o papel para el Oneshot, tiene que ser 6.25 x 9.25 pulgadas (15.875 x 23.495 cm) mínimo 600 DPI&nbsp;<a href="https://drive.google.com/drive/folders/1t2XjTonAJX-mz_atGRGr-fvSHpRAre2z?usp=sharing" target="_blank" rel="noopener">(Descargar Plantilla).</a></li><li>La obra debe venir con una portada y la primera página obligatoriamente a color (no cuenta página dedicatoria, ilustración, extra o anteportada, tiene que ser la primera página del cómic a color), el resto puede ser blanco/negro, escala de grises, un tono, o toda la obra a color, como guste.</li><li>La lectura tiene que ser obligatoriamente de izquierda a derecha (Occidental).</li><li>Buena ortografía y gramática.</li><li>Diálogos en digital,&nbsp; la tipografía para los textos de diálogo es Laffayette Comic Pro o Canted Comics (<a href="https://drive.google.com/drive/folders/1Lx_gsIHJsOvf2ENaPIVKU3WrTRAl4yOt?usp=drive_link">descargar</a>), Onomatopeyas u otros textos, puede usar la tipografía que le guste.</li></ul><div>&nbsp;</div><div><p><b>Requisitos Técnicos:</b></p><ul><li>La temática es a libre elección para que puedan plasmar toda su creatividad.</li><li>Los participantes deben entregar un Oneshot o relato escrito que inicie y cierre la trama, situación, o arco argumental que se plantea durante toda la historia, puede tener un final ambiguo o sin una conclusión clara, eso sí, no confundir un final abierto, con una historia incompleta o primer capítulo.</li><li>En los relatos no son obligatorios el uso de portada o ilustración de apoyo, si los autores lo quieren proporcionar, esto no va a influir ni darle puntos extras a la hora de la evaluación.</li><li>Cualquier subgénero, demografía o formato está permitido.</li><li>Escena de sexo o partes íntimas explícitas no está permitida. El desnudo parcial, gore y ecchi sí está permitido siempre y cuando tenga sentido dentro de la historia, como también se use de forma moderada.</li><li>El archivo a presentar es en formato PDF para una mejor y rápida lectura (guardar una versión separada en JPG o PNG a 600DPI en caso de que la obra en cuestión gane, usarlo para la publicación de la edición física de la revista y proyectos futuros como promociones).&nbsp;&nbsp;</li><li>Los derechos de autor sobre el trabajo presentado deben pertenecer a la persona o grupo que lo envía, no se permite el envío de obra de terceros.&nbsp;</li><li>La obra no puede haber sido publicada en algún otro sitio, tiene que ser creado exclusivamente para la convocatoria Reizu Comics, es decir, una obra inédita.&nbsp;</li></ul></div><p><b>&nbsp;</b></p><p><b>5. ¿CÓMO PARTICIPAR?</b></p><p>Durante el período de participación, los postulantes deben ingresar a <a href="https://reizucomics.com/convocatoria-oneshots/">https://reizucomics.com/convocatoria-oneshots/</a>&nbsp;y llenar el formulario con una<br />cuenta iniciada, subir su Oneshot o relato en formato PDF en nuestra plataforma junto con la imagen de la portada de la obra (si es un oneshot), dentro de unos días recibirá por correo un mensaje de que su obra fue recibida y está siendo evaluada.</p><p>Durante el periodo de inscripción deberá estar muy atento a un segundo correo después de la confirmación de recibido, ya que en caso de que su obra no cumpla con alguno de los “Requisitos Básicos” de presentación de la obra.</p><p>&nbsp;Se le estará avisando del mismo para que haga cambios pertinentes si es posible y tener una oportunidad de volver a enviar su trabajo una única vez, por lo que si su obra no cumple con uno o más los requisitos básicos al enviarlo nuevamente, será descalificado, asegurarse de corregirlos todos antes de enviarlo nuevamente.</p><p><b>6. SELECCIÓN DE GANADORES.</b>&nbsp;</p><p>La convocatoria se basa en la calidad del trabajo, y la suerte no incide en la elección de los ganadores. Las posibilidades de ganar dependerán de la cantidad de trabajos que se reciban y la calidad de las mismas. Cabe recalcar que el ganador será la mejor obra enviada y que cumpla con todos los requisitos dentro de los trabajos que se hayan enviado en ese momento.</p><p>Un panel de jueces compuesto por el Equipo de calidad de Reizu Comics y varios jueces invitados evaluarán cada una de las obras, estos se encargarán de elegir al&nbsp;ganador de la categoría Oneshot tanto como al 2.º y 3.ª mejor obra presentada y&nbsp;el ganador único del Relato, los jurados harán su evaluación en conformidad con los siguientes criterios:</p><ul><li><strong>ORIGINALIDAD:</strong> La historia no debe basarse en un universo o una trama ya existente, es decir, no se puede trabajar en el mundo de Dragon ball, Boku no Hero Academia o Shingeki no Kyojin, ni tampoco usar arcos o tramas argumentales para el desarrollo de su trama, tiene que ser una historia con un universo nuevo y original.</li><li><strong>TÉCNICA:</strong> La narrativa gráfica también tiene sus parámetros que se deben implementar. Se evaluará la composición y distribución de las páginas, el uso de los tipos de vistas y encuadres, como también el uso de pinceles y materiales digitales y/o tradicionales.</li><li><strong>DIBUJO:</strong> Manejo de la línea y entintado, proporción, estilo de dibujos estéticamente buenos, diseño de personajes y que tenga un fácil entendimiento de los objetos o figura que quiere interpretar, como también el uso de poses o perspectivas arriesgadas.</li><li><strong>NARRATIVA:</strong> Todas las historias deben tener un sentido, por lo que evaluaremos, la trama, lo que nos intenta contar, el ritmo de la narrativa, el desarrollo de los personajes y la resolución del conflicto o problema que estipulo.</li></ul><p><strong><em>&nbsp;</em></strong></p><p><strong><em>La</em></strong> <strong><em>elección</em></strong> <strong><em>del</em></strong> <strong><em>ganador</em></strong> <strong><em>pasará</em></strong> <strong><em>por</em></strong> <strong><em>3</em></strong> <strong><em>rondas</em></strong></p><ol><li><ol><li><strong>ª</strong>&nbsp;<strong>Ronda: </strong>Comenzará una vez haya cerrado el formulario para enviar sus trabajos, dentro de esa fecha durante 20 días, a las 10 mejores obras de todas las que se han entregado en la categoría de Oneshots y las 5 mejores de relato, se le estará enviando un correo a cada artista si ha pasado a la siguiente (si no recibe un correo durante ese periodo quiere decir que no ha clasificado).</li><li><strong>ª</strong>&nbsp;<strong>Ronda: </strong>De los 10 que llegaron a la primera ronda de Oneshots y 5 en relato, estas se publicarán de forma pública en la plataforma para que puedan visitarlos, leerlos, opinar y votar. El público también tiene voz y voto para elegir a los ganadores. Su voto será recogido durante 7 días y según lo que vote el público y el jurado habrá un ganador. El porcentaje será repartido de la siguiente forma: 25% Público, 75% Jurado Invitado.</li><li><strong>ª&nbsp;Ronda:</strong> Esta es la ronda final, donde en directo el día 18 de noviembre el jurado o equipo de Reizu Comics estará haciendo sus comentarios respecto a las 15 obras y cosas que se podrían mejorar, y en ese mismo directo se anunciará a los ganadores.&nbsp;</li></ol></li></ol><p>&nbsp;</p><p><b>6.2. JURADOS INVITADOS</b></p><p>La convocatoria contará con la participación de grandes artistas y autores talentosos, ########,&nbsp; ###### ###, ###### ####, ###### ####### y Deword Editions</p><p><b>7. PREMIOS DE LA CONVOCATORIA.</b>&nbsp;</p><p>Los premios varían según las campañas y colaboraciones activas durante esas fechas. Siempre consultar nuestras redes sociales o en la página de convocatoria, los premios disponibles,&nbsp; los premios de la CONVOCATORIA DE ONESHOT/RELATOS VIII EDICIÓN son los siguientes:</p><p><strong>GANADOR</strong>&nbsp;<strong>DE</strong>&nbsp;<strong>ONESHOT:</strong>&nbsp;</p><ul><li>El premio principal será 280 USD o el equivalente a su moneda local, que se le hará llegar de forma rápida y accesible (Reizu Comics se hará cargo de los costes de comisión).</li><li>De parte de XP-PEN una tableta digitalizadora marca Deco Pro Gen2 LW que llegará a su lugar de residencias sin costes de envío y/o aranceles.</li><li>&nbsp;De parte de las Editoriales Físicas Sketchi y Deword Editions, tendrá una publicación física en una revista recopilatoria de sus respectivas editoriales que estará publicándose en la edición 2026 (Contrato con regalías y también tendrá un ejemplar gratuito para colección)</li><li>Publicación en la plataforma web de Reizu cómics, contando con todos los beneficios de autor que ello conlleva (con derecho a serialización)</li><li>Aparecerá dentro de la Revista Digital Oneshot+ como obra principal.</li></ul><p>&nbsp;</p><p><strong>2.º</strong>&nbsp;<strong>LUGAR</strong> <strong>DE</strong> <strong>ONESHOT:</strong>&nbsp;</p><ul><li>50 USD o el equivalente a su moneda local, que se le hará llegar de forma rápida y accesible (Reizu Comics se hará cargo de los costes de comisión)</li><li>De parte de XP-PEN una tableta digitalizadora Deco 01 V3 que llegará a su lugar de residencias sin costes de envío y/o aranceles.</li><li>Mención en nuestras redes sociales y aparecerá en la revista digital Oneshot+.</li></ul><p>&nbsp;</p><p><strong>3.°</strong>&nbsp;<strong>LUGAR</strong> <strong>DE</strong> <strong>ONESHOT:</strong>&nbsp;</p><ul><li>20 USD o el equivalente a su moneda local, que se le hará llegar de forma rápida y accesible (Reizu Comics se hará cargo de los costes de comisión)</li><li>De parte de XP-PEN una tableta digitalizadora Deco Mini 7 V2 que llegará a su lugar de residencias sin costes de envío y/o aranceles.</li><li>Mención en nuestras redes sociales y aparecerá en la revista digital Oneshot+.</li></ul><p>&nbsp;</p><p><strong>GANADOR</strong> <strong>DE</strong> <strong>RELATO:</strong></p><ul><li>El premio principal será 50 USD o el equivalente a su moneda local, que se le hará llegar de forma rápida y accesible (Reizu Comics se hará cargo de los costes de comisión). Publicación en la plataforma web de Reizu Comics contando con todos los beneficios de autor que ello conlleva &nbsp;(con derecho a serialización).</li><li>De parte de XP-PEN una tableta digitalizadora marca Deco Pro Gen2 LW que llegará a su lugar de residencias sin costes de envío y/o aranceles.</li><li>Aparecerá dentro de la Revista Digital Oneshot+.&nbsp;</li></ul><p>&nbsp;</p><p><span>Nota: Adicionalmente, a eso, las 4 obras ganadoras y publicadas en la revista ONESHOT PLUS, podrían tener una edición física. Cada autor recibirá una copia impresa y el porcentaje de las ventas por copias vendidas de la edición en la que participaron.&nbsp;</span></p><p><b>¿QUÉ TOMAR EN CUENTA ANTES DE ENVIAR?</b></p><ul><li>El ganador de la convocatoria&nbsp;anterior no puede participar, tendrá que esperar al menos dos ediciones siguientes a esta&nbsp;para volver a participar, como también no tener publicado una obra/serie en la plataforma.</li><li>Solo se puede enviar un oneshot o relato por artista.</li><li>Si se trabaja en equipo, el premio no se duplica, este será divido equitativamente por todos los miembros que lo componen o enviado al encargado del equipo y luego decidirán cómo repartir el premio.&nbsp;</li><li>Durante el proceso de la convocatoria no se puede publicar ni mostrar el oneshot o relato presentado, solo después de que haya terminado la convocatoria son libres de usar su material como gusten (publicar avances y borradores en sus redes sociales está permitido, pero únicamente material incompleto, no se puede publicar páginas completas).</li><li>El trabajo ganador pasará a convertirse en un exclusivo permanente de Reizu comics en función de publicación del material presentado, los derechos de su idea, personajes o trama utilizada, siguen perteneciendo al autor, por lo que si quisiera hacer una serie fuera de la plataforma puede hacerlo siempre y cuando se notifique a la editorial los planes, no obstante, el oneshot presentado no puede ser publicado en otro sitio.&nbsp;</li><li>Ninguna obra enviada será utilizada o usada para promociones, publicidad o reproducción a menos que sea el ganador, haya quedado en los 10 finalistas de oneshot y 5 en relato que estarán subidos públicamente en la plataforma o recibamos el permiso del autor de poder usarlo.</li><li>Al estar en publicado el top 10 de Oneshots y top 5 de Novelas, estas pueden ser revisadas en cualquier momento en stream para dar pequeñas impresiones.&nbsp;</li><li>Se pueden enviar trabajos tanto digitales como tradicionales. Si tiene una obra tradicional, tiene que enviar una versión escaneada, con sus debidas correcciones y limpieza, como también el texto en digital, con la tipografía recomendada para poder pasar el filtro preliminar.&nbsp;</li></ul><ul><li>Reizu Comics no se hace responsable de cómo o en que se utilicen los premios de la convocatoria. Una vez entregados los premios, ya no es responsabilidad de Reizu Comics, lo que suceda a posterioridad.</li></ul><div>&nbsp;</div><div><span className="text-danger">
                MOTIVOS DE DESCALIFICACIÓN O CANCELACIÓN DEL PREMIO.
              </span></div><div>&nbsp;</div><ol>
              <li className="text-danger">Publicar la obra en otros medios durante el proceso de la convocatoria.</li>
              <li className="text-danger">Enviar trabajos que no sigan las reglas antes mencionadas.</li>
              <li className="text-danger">No tener una autorización firmada de sus padres si es menor de edad para recibir el premio.&nbsp;</li>
              <li className="text-danger">No responder ni ponerse en contacto con Reizu Comics 5 días después de ser anunciado como ganador.&nbsp;</li>
              <li className="text-danger">Si hay alguna sospecha de que esté usando técnicas fraudulentas, robo de imagen, plagio y/o polémicas.</li>
              <li className="text-danger">El uso de inteligencia artificial de cualquier índole no está permitido.</li>
              <li className="text-danger">Si no se reciben suficientes obras o la mayoría no cumple requisitos, Reizu Comics puede cancelar la convocatoria.</li>
            </ol>

            <b
             className='text-center'
             style={{
              color: isDark ? 'gray' : '#000',
             }}
            >Sin más nada de qué decir, le deseamos suerte a todos los artistas que participen. Cualquier otra duda o aclaración de alguna regla puede contactarnos con gusto; responderemos a todas las preguntas. Les dejamos el canal&nbsp; de ayuda, sugerencias y/o contacto en caso de que quiera hablar con el equipo de Reizu Comics. <a href="https://discord.gg/aakp7Sj8yQ">Entrar al servidor de Discord</a></b>
          
             
            
          
          
          </div>
           <Link
            to="/convocatoria/formulario"
            className="btn btn-danger mt-4 d-block mx-auto w-25 py-2"
          >
            Ir al formulario
          </Link>

          {/* Nueva card de consulta */}
          <div
            className="mt-5 p-4"
          >
            <div className="row align-items-center">
              <div className="col-md-6 text-center mb-3 mb-md-0">
                <h3 className="text-danger fw-bold">
                  CUALQUIER DUDA O MÁS INFORMACIÓN PUEDE ENVIAR ESTA CONSULTA Y LE RESPONDEREMOS
                </h3>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Puede poner su nombre de artista"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo de Contacto</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Escribir aquí su duda"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-danger w-100">
                    Consulta
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ConvoRules;
