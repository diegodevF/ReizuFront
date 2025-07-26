import React, { useState } from 'react';
import useTheme from '../hooks/useTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import reizu15 from '../assets/Emotes/reizu15.png'
import "./qs.css"

export default function QuestionFrequent() {
  const { isDark } = useTheme();
  const categories = [
    { key: 'plataforma', label: 'Plataforma/Reizu Comics' },
    { key: 'contenido', label: 'Contenido' },
    { key: 'publicacion', label: 'Publicación' },
    { key: 'coins', label: 'Reizu Coins/Monetización' },
    { key: 'cuenta', label: 'Cuenta' },
  ];

  const faqs = {
    plataforma: [
      {
        q: '¿Qué significa Reizu?',
        a: `
          <p>Reizu viene del verbo inglés Raise, que en japonés es Reizu “レイズ” que significa alzar, elevar o levantar. Elegimos este verbo, ya que nuestra meta es elevar el talento latino y mostrarlo al mundo.</p>
        `
      },
      {
        q: '¿Son Editorial Física?',
        a: `
          <p>Todo el enfoque, aplicaciones y trabajos se hacen de forma digital, ya que somos un servicio de plataforma en internet. No obstante, estamos interesados en proyectos físicos como revistas, tomos recopilatorios y mercancías para quienes quieran disfrutar del contenido de Reizu de forma tangible.</p>
        `
      },
      {
        q: '¿De qué nacionalidad es la editorial?',
        a: `
          <p>Reizu Comics LLC está registrada en el estado de Florida, Estados Unidos. Sin embargo, al ser una plataforma digital, nuestra audiencia y/o consumidores están dirigidos a países de habla hispana, por lo que puede participar cualquier artista latinoamericano o hispanohablante.</p>
        `
      },
      {
        q: 'No me aparece la opción para marcar favorito ni comentar una obra',
        a: `
          <p>Para acceder a todas las opciones como comentar, marcar favoritos, historial de visitas y ganar Reizu Coins, debes registrar una cuenta e iniciar sesión en la plataforma.</p>
        `
      },
      {
        q: '¿Dónde puedo reportar alguna duda o inconveniente con mi cuenta, una obra/capítulo o la plataforma en general?',
        a: `
          <p>Puedes entrar a nuestro servidor de Discord, activo 24/7, y abrir un ticket de soporte para que un administrador o moderador te ayude. <a href="https://discord.gg/..." target="_blank" rel="noopener noreferrer">Clic aquí para ir</a>.</p>
          <p>Si no utilizas Discord, también puedes enviarnos un correo a soporte@reizucomics.com explicando tu problema.</p>
        `
      },
      {
        q: '¿Cuándo está disponible el equipo de soporte?',
        a: `
          <p>El soporte de la plataforma está disponible 24/7, así que puedes informar un problema o aclarar una duda en cualquier momento.</p>
          <p>No obstante, el tiempo de respuesta puede ser de 1 a 24 horas, dependiendo del volumen de solicitudes.</p>
        `
      }
    ],
    contenido: [
      {
        q: '¿Reizu crea obras originales?',
        a: `
          <p>Normalmente, las obras vendrán de artistas que quieran publicar en Reizu, pero también existe la posibilidad de que reunamos a algunos artistas para crear una obra nacida y producida por la plataforma.</p>
        `
      },
      {
        q: '¿Hay obras de otras franquicias conocidas?',
        a: `
          <p>Lamentablemente Reizu Comics no permite el contenido basado o que use referencias, franquicias, novelas, series, obras de teatro, videojuegos, películas u otros formatos ya comerciales, para no infringir los derechos de autor y la propiedad intelectual.</p>
          <p>Todas las obras de Reizu Comics están construidas en mundos e ideas totalmente originales.</p>
        `
      },
      {
        q: '¿Todos los contenidos de Reizu Comics están protegidos por la ley de derechos de autor?',
        a: `
          <p>Sí, todas las obras que se publican en Reizu Comics están protegidas por la ley de derechos de autor. El uso no autorizado, la distribución o la duplicación de contenido está prohibido y puede ser sancionado.</p>
          <p>La venta de nuestros contenidos sin la autorización del autor o Reizu Comics no está permitida. Las cuentas que violen nuestros Términos de uso podrán ser canceladas.</p>
          <p>Si tu cuenta es cancelada por infringir las reglas, no se te recompensará por compras realizadas y Reizu Coins dentro de la plataforma.</p>
        `
      },
      {
        q: '¿Puedo compartir una obra de Reizu Comics a través de las redes sociales?',
        a: `
          <p>Todo el contenido publicado en Reizu Comics está protegido por la ley de derechos de autor. El uso, la distribución o la duplicación de cualquier parte sin autorización puede ser sancionado.</p>
          <p>No obstante, puedes compartir los trabajos mediante enlaces directos de Reizu Comics.</p>
        `
      },
      {
        q: '¿Por qué una obra no se ha actualizado?',
        a: `
          <p>Es posible que haya habido problemas con el horario o disponibilidad del artista de la serie en particular.</p>
          <p>Verifica si la obra tiene la etiqueta “Emisión”, “Pausado” o “Finalizado” en su perfil, o consulta los boletines informativos y redes sociales para anuncios de pausas o retrasos.</p>
        `
      },
      {
        q: '¿Se puede cancelar una obra en Reizu Comics?',
        a: `
          <p>Sí, si una obra incumple nuestras normativas, puede ser dada de baja de la plataforma.</p>
          <p>Las salidas de obras o autores también pueden ocurrir por motivos personales o diferencias, no solo por incumplimientos.</p>
        `
      },
      {
        q: '¿Hay un error con una obra/capítulo?',
        a: `
          <p>Lamentamos el inconveniente. Por favor, repórtalo rápidamente a través de nuestros canales de soporte en Discord o envía un correo a soporte@reizucomics.com.</p>
        `
      }
    ],
    publicacion: [
      {
        q: '¿Cómo hago para enviar mi trabajo?',
        a: `
          <p>Hay dos formas de enviar tu trabajo para publicar:</p>
          <p>La primera es mediante las convocatorias de Oneshots, que se realizan bianualmente, con el fin de que los artistas quieran mostrar su talento, ponerse a prueba y dar lo mejor de sí, mediante historias cortas autoconclusivas, o pilotos para posible continuación para una serie y sobre todo recibir una recompensa.</p>
          <p>La segunda es enviándonos un correo llenando el formulario de esta sección: <a href="https://reizucomics.com/publicar/" target="_blank" rel="noopener noreferrer">https://reizucomics.com/publicar/</a>. La obra en cuestión pasará a ser revisada y se le notificará por el correo que usó para el formulario si su obra puede publicarse en la plataforma.</p>
        `
      },
      {
        q: '¿Qué tipo de trabajos se pueden enviar?',
        a: `
          <p>Buscamos cualquier tipo de trabajo que englobe la narrativa gráfica, o el arte de contar historias mediante apoyo visual o por solamente texto. Como ejemplo están los mangas, manwhas, comics, webcómics, novelas, 4komas, entre otras.</p>
          <p>Siempre buscando ese tipo de trabajos, para todas las edades, géneros y demografías. Como el contenido se dirige para todo el público, las escenas de sexo o desnudo explícito no están permitidas.</p>
        `
      },
      {
        q: '¿Puedo publicar obras de tercero?',
        a: `
          <p>No, al enviar una obra para publicar, afirmas que eres creador de la obra y tienes propiedad de todos los derechos de autor de la misma, así como de la trama, historia y personajes. No se aceptan obras que tengan indicios de plagio, robo o uso de herramientas fraudulentas; cualquier obra que se sospeche puede ser retirada de la plataforma sin previo aviso. Ayúdanos a reportar obras que puedan infringir esta normativa.</p>
        `
      },
      {
        q: '¿Cuál es el tiempo de respuesta de aceptación?',
        a: `
          <p>El tiempo de respuesta regular para que tu obra sea revisada y se envíe un correo en caso de que sea aprobada o rechazada es de 1 a 15 días.</p>
          <p>El tiempo puede verse afectado por el flujo de trabajos enviados o circunstancias externas. Si tu obra no recibe respuesta durante el periodo regular, puedes preguntar por el progreso en cualquier medio de información.</p>
        `
      },
      {
        q: '¿Hay algún rango de edad límite?',
        a: `
          <p>No creemos en un rango mínimo o máximo de edad; creemos en el talento del artista. Si el artista es menor de edad, sus padres o representante legal deben estar conscientes de la actividad.</p>
        `
      },
      {
        q: '¿Cuando envío mi trabajo para evaluar tiene que estar completo?',
        a: `
          <p>Debes enviar la mejor versión de tu trabajo para que se entienda correctamente y haya suficiente material para revisar. También puedes enviar un borrador o muestra para una revisión rápida.</p>
        `
      },
      {
        q: '¿Al publicar en Reizu puedo publicar en otro lado?',
        a: `
          <p>Si la obra no tiene carácter de exclusividad, puedes publicar la obra en otras plataformas o de otras plataformas, además de Reizu Comics.</p>
        `
      },
      {
        q: '¿Qué pasa con la propiedad intelectual y los derechos de autor?',
        a: `
          <p>Reizu Comics no adquiere ni compra los derechos de la obra; los derechos siguen perteneciendo al autor.</p>
          <p>La plataforma utiliza tu obra en préstamos, donde el autor otorga el poder de actuar y reclamar en caso de infracción de derechos de autor, convirtiendo a Reizu Comics en un agente colaborador para exposición, monetización y publicidad.</p>
          <p>El autor y la editorial llegan a un acuerdo donde el autor se compromete a actualizar la obra; cualquier acción será notificada al autor. El autor conserva el derecho de distribución y reproducción (en caso de exclusividad, revisa los términos).</p>
          <p>Si el autor decide dejar de publicar en Reizu Comics, puede hacerlo bajo restricciones del contrato de exclusividad, notificando a la editorial.</p>
        `
      },
      {
        q: '¿Pueden rechazar mi obra?',
        a: `
          <p>La obra pasa por un proceso de evaluación; si no cumple con los estándares de calidad o términos de contenido, puede ser rechazada.</p>
        `
      },
      {
        q: '¿Si mi obra es rechazada puedo volver a enviarla?',
        a: `
          <p>Si corriges los puntos mencionados en el correo, puedes volver a enviar la obra. Si no haces cambios, la obra volverá a ser rechazada.</p>
        `
      },
      {
        q: '¿Hay un mínimo de páginas por capítulo?',
        a: `
          <p>Para publicar un capítulo pedimos:</p>
          <ul>
            <li>Manga/Cómic: 4 páginas (8 si es exclusivo)</li>
            <li>Manwha/Webcomic: 16 paneles</li>
            <li>Novela: 2 páginas</li>
          </ul>
        `
      },
      {
        q: '¿Cómo debo entregar mi capítulo?',
        a: `
          <p>Los capítulos deben estar terminados y presentables; bocetos o borradores serán rechazados. Deben estar entintados y escaneados si son tradicionales; los diálogos digitales no son obligatorios.</p>
        `
      },
      {
        q: '¿Hay algún tema o contenido que no se pueda publicar?',
        a: `
          <p>No excluimos temas, pero no permitimos escenas de sexo o desnudos explícitos. Ecchi y gore moderado sí están permitidos. Si dudas, abre un ticket en nuestro Discord: <a href="https://discord.gg/..." target="_blank" rel="noopener noreferrer">Clic aquí para ir</a>.</p>
        `
      },
      {
        q: '¿Cada cuánto puedo actualizar un capítulo?',
        a: `
          <p>Al rellenar el formulario de publicación, elige la periodicidad: Semanal, Quincenal, Mensual o Bimensual. Debes seguir la fecha programada; contacta con Reizu Comics para cambios.</p>
        `
      },
      {
        q: '¿Puedo actualizar más de un capítulo?',
        a: `
          <p>No recomendamos actualizar varios capítulos al mismo tiempo; afecta el flujo de interacción. Si deseas hacerlo, consulta tu caso con la plataforma.</p>
        `
      }
    ],
    coins: [
      {
        q: '¿Qué son las Reizu Coins?',
        a: `
          <p>Son una moneda digital de uso único en la plataforma, creada con el fin de poder adquirir servicios y productos dentro del mismo, desbloquear capítulos de tus obras favoritas, comisiones de tus artistas o mostrar tu apoyo regalando parte de tus Reizu Coins.</p>
        `
      },
      {
        q: '¿Cómo se pueden obtener?',
        a: `
          <p>Se pueden obtener de muchas y divertidas formas, totalmente accesible para cualquier tipo de usuario:</p>
          <ul>
            <li>Comprando directamente en la plataforma.</li>
            <li>Mediante concursos, sorteos y actividades en redes sociales o Discord.</li>
            <li>De forma gratuita en la plataforma mediante misiones y logros (visitar, comentar, leer, compartir, etc.).</li>
          </ul>
          <p>Visita la página “Misiones y Logros” para más información.</p>
        `
      },
      {
        q: '¿Qué puedo canjear con las Reizu Coins?',
        a: '<p>Contenido del conmutador</p>'
      },
      {
        q: '¿Puedo donar mis Reizu Coins?',
        a: '<p>Contenido del conmutador</p>'
      },
      {
        q: '¿Cuántos Reizu Coins puedo donar?',
        a: '<p>Contenido del conmutador</p>'
      },
      {
        q: '¿Puedo ver mis movimientos al momento?',
        a: `<p>Todos los movimientos de canje, donación o compra son inmediatos, aunque puede tardar un poco en reflejarse en tu cuenta.</p>
            <p>Si encuentras algún problema, completa el formulario de abajo.</p>`
      },
      {
        q: '¿Cómo puedo monetizar mis obras?',
        a: `
          <p>Trabajamos en un sistema de monetización que valora la constancia y el trabajo:</p>
          <h6>Monetización por capítulo:</h6>
          <p><a href="https://reizucomics.com/capitulos/monetizacion-de-capitulos/" target="_blank" rel="noopener noreferrer">https://reizucomics.com/capitulos/monetizacion-de-capitulos/</a></p>
          <h6>Monetización con Reizu Coins:</h6>
          <p>Los autores desde la primera publicación reciben 200 Reizu Coins, y pueden ganar más con donaciones, misiones especiales (comentarios, visitas, compras), que luego pueden retirar en efectivo.</p>
        `
      }
    ],
    cuenta: [
      { q: '¿Cómo puedo crear una cuenta?', a: `
        
        <p>La creación de una cuenta en la plataforma es totalmente gratuita, al ingresar a la plataforma para poder disfrutar de todas las herramientas y beneficios que ofrece la Plataforma </p>
         <p> Puede Ir a la parte superior derecha de la plataforma donde dice registrarse o ir a este enlace,<span style="color:red">"https://reizucomics.com/registrarse/"</span> llenar sus datos correspondientes o registrarse mediante una cuenta de Google</p>` },
      { q: 'Olvidé mi contraseña', a: 'Si olvido su contraseña en cualquier momento puede ir a [Mi cuenta]en la opción de [Editar perfil] como también puede editar cualquier información personal en cualquier momento.' },
      { q: '¿Puedo eliminar mi cuenta?', a: `Sí, tiene que tomar en cuenta que al desactivar la cuenta se eliminara toda la información de la cuenta, datos personales, historial, obras favoritas, comentarios, compras, reizu coins y si es autor tanto las obras como capítulos publicados,

Las cuentas no pueden ser recuperadas, solo hacerlo si está totalmente seguro de hacerlo.` },
      { q: '¿Cómo elimino mi cuenta?', a: 'Para eliminar una cuenta tiene que enviar un correo a soporte@reizucomics.com con el asunto “solicitud de eliminación de cuenta” Reizu Comics, después de confirmar que desea realmente eliminar su cuenta, se encargara de borrar de forma permanente toda la información pertinente.' },
      { q: '¿Puedo crearme otra cuenta una vez eliminada?', a: `Sí, si el motivo de la eliminación de la cuenta no sea por incumplimiento de los términos de uso y políticas, puede volver a crear una nueva cuenta. 

No obstante, no puede abusar de este recurso, hay un límite en el cual puede crear una cuenta si ha eliminado una anteriormente.` },
    ],
  };
  const [active, setActive] = useState('cuenta');

  return (
    <>
    <Navbar/>


    <div
      style={{
        accentColor:"red"
      }}
    
    className={`container py-5 ${isDark ? 'bg-dark text-light' : ''}`}>  
      <h2 className="text-center mb-4">Preguntas <span className="fw-normal">Frecuentes</span></h2>
      <div className={`card ${isDark ? ' text-light' : ''}`}>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {categories.map(cat => (
              <li className="nav-item" key={cat.key}>
                <button
                  className={`nav-link ${
                    active === cat.key
                      ? 'active text-danger'
                      : isDark
                        ? 'text-light'
                        : 'text-dark'
                  }`}
                  onClick={() => setActive(cat.key)}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">
          {categories.map(cat => (
            <div key={cat.key} className={`${active === cat.key ? '' : 'd-none'}`}>             
              {faqs[cat.key].length === 0 ? (
                <p className="text-center text-muted">No hay preguntas disponibles.</p>
              ) : (
                <div


                  className="accordion
                  
                  " id={`faq-${cat.key}`}>
                  {faqs[cat.key].map((item, idx) => (
                    <div
                      className="accordion-item " key={idx}>
                      <h2 className="accordion-header " id={`heading-${cat.key}-${idx}`}>
                        <button
                          className={`acr accordion-button collapsed ${isDark ? 'bg-dark text-light' : ''}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${cat.key}-${idx}`}
                          aria-expanded="false"
                          aria-controls={`collapse-${cat.key}-${idx}`}
                        >{item.q}</button>
                      </h2>
                      <div
                        id={`collapse-${cat.key}-${idx}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${cat.key}-${idx}`}
                        data-bs-parent={`#faq-${cat.key}`}
                      >
                        <div className={`
                        text-start p-4
                        accordion-body ${isDark ? 'bg-dark text-light' : ''}`}
                          dangerouslySetInnerHTML={{ __html: item.a }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Tarjeta final con invitación al Discord */}
    <div className={`container ${isDark ? 'bg-dark text-light' : ''}`}>  
      <div className="card my-5 d-flex flex-row align-items-center p-4">
        <div className="flex-grow-1 text-danger text-center">
          <p className="mb-3 fs-4">
            Para obtener una respuesta más extensa sobre alguno de estos temas o si no pudo conseguir su pregunta, en este apartado puede entrar a nuestro servidor de Discord y abrir un ticket de soporte
          </p>
          <a
            href="https://discord.gg/..."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger"
          >
            Haz clic aquí
          </a>

        </div>
          <img src={reizu15} alt="Llama" width={400} height={400} />

      </div>
    </div>
    <Footer/>
    </>
  );
}