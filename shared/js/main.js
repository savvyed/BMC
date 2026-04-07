/**
 * main.js — BMC Digital Health Literacy Site
 *
 * Responsibilities:
 *  1. Read the ?lang= URL parameter and apply translated strings to the page
 *  2. Update all internal navigation links to preserve the lang parameter
 *  3. Manage the 3-step structure on challenge pages (show/hide panels)
 *  4. Handle checklist checkbox behavior on Step 3
 *  5. Handle character selector button state on Step 2
 *
 * No localStorage, no server calls, no dependencies.
 */

/* ============================================================
   ALL USER-FACING STRINGS — 5 languages
   Add new keys here; apply them via data-string-key="keyName" in HTML.
   Non-English languages use professional-quality translations.
   ============================================================ */
const strings = {

  en: {
    /* Language selector */
    welcomeHeading: "Welcome / Bienvenido / Bem-vindo / Byenveni / 欢迎",
    langIndicator: "English",

    /* Shared nav */
    footerHome: "🏠 Home",
    footerHelp: "🔍 Help",
    headerLogoAlt: "BMC Logo",

    /* Home screen */
    homeHeading: "What would you like to do today?",
    card1Label: "Learn MyChart step by step",
    card2Label: "Find help with a specific task",
    card3Label: "Open MyChart",
    card3Note: "Opens in a new tab",
    card4Label: "Open MassThrive",
    card4Note: "Opens in a new tab",

    /* Course home */
    courseHeading: "Learn MyChart step by step",
    startBtn: "Start",
    ch0Number: "Challenge 0",
    ch0Name: "Set up your email",
    ch0Time: "About 5–8 minutes",
    ch01Number: "Challenge 01",
    ch01Name: "Set up MyChart",
    ch01Time: "About 8 minutes",
    ch02Number: "Challenge 02",
    ch02Name: "Join a video visit",
    ch02Time: "About 10 minutes",
    ch03Number: "Challenge 03",
    ch03Name: "Common tasks",
    ch03Time: "About 10 minutes",
    ch04Number: "Challenge 04",
    ch04Name: "Manage your account",
    ch04Time: "About 8 minutes",
    ch05Number: "Challenge 05",
    ch05Name: "Find community resources",
    ch05Time: "About 8 minutes",

    /* Challenge page — shared */
    stepLabelTemplate: "Step {n} of 3",
    step1TabLabel: "Watch",
    step2TabLabel: "Practice",
    step3TabLabel: "Do it",
    nextBtn: "Next →",
    backStepBtn: "← Back",
    doneBtn: "Done — I finished",
    videoPH: "How-to clip",
    textPanelPH: "Text panel — translated steps appear here",
    scenarioPH: "Character scenario — H5P interaction or custom interaction goes here",
    charSelectorLabel: "Choose a character:",

    /* Challenge 02 — Telehealth (fully built) */
    ch02PageTitle: "Challenge 02 — Join a video visit",
    ch02Step1Label: "Step 1 of 3 — Watch",
    ch02Step1Heading: "How to join a video visit on your phone",
    ch02Step1VideoPH: "How-to clip — Join a video visit via MyChart app",
    ch02Step2Label: "Step 2 of 3 — Practice",
    ch02Step2Heading: "Help Marcus join his visit",
    ch02Step2Intro: "Marcus needs to join a video visit from his phone during his lunch break.",
    ch02Step2Intro2: "Help him find his appointment and tap Begin Visit.",
    ch02Step3Label: "Step 3 of 3 — Do it on your phone",
    ch02Step3Heading: "Now try it on your own MyChart",
    ch02Step3Intro: "Open MyChart on your phone and follow these steps:",
    ch02Check1: "Open the MyChart app on your phone.",
    ch02Check2: "Tap Appointments.",
    ch02Check3: "Find today's video visit in the list.",
    ch02Check4: "Tap Begin Visit.",
    ch02Check5: "Wait in the waiting room. Your provider will join you.",

    /* Stub notice */
    stubLabel: "Coming in Phase 2",
    stubText: "This challenge will be fully built during Phase 2A content development.",

    /* Knowledge base home */
    helpHeading: "Find help with a specific task",
    cat1Label: "Setting up your email",
    cat2Label: "Setting up MyChart",
    cat3Label: "Video visits",
    cat4Label: "Medications & refills",
    cat5Label: "Appointments",
    cat6Label: "Messages & your records",
    cat7Label: "Community resources",

    /* Category page */
    backToAllTopics: "← All topics",
    cat3PageHeading: "Video visits",
    topicTime: "2 min",
    vt1: "Join a video visit on your phone",
    vt2: "Join a video visit on a computer",
    vt3: "Set up your camera and microphone",
    vt4: "Troubleshoot: camera not working",
    vt5: "Troubleshoot: dropped connection",
    vt6: "Troubleshoot: wrong waiting room",
    vt7: "Join using the Pexip app (older phones)",
    vt8: "Schedule a video visit",

    /* Topic page */
    topicPageHeading: "How to join a video visit on your phone",
    topicBackLink: "← Video visits",
    topicVideoPH: "How-to video — Join a video visit on your phone",
    stepsHeading: "Steps",
    step1Text: "Open the MyChart app on your phone.",
    step2Text: "Tap Appointments.",
    step3Text: "Find your video visit in the list.",
    step4Text: "Tap Begin Visit.",
    step5Text: "Allow the app to use your camera and microphone if asked.",
    step6Text: "Wait in the waiting room. Your provider will join you soon.",
    moreHelpHeading: "Need more help?",
    textUsLabel: "📱 Text us for help",
    backToCourseLabel: "📘 Go back to the course",

    /* Character names — shared across challenges */
    char1: "Elena",
    char2: "Marcus",
    char3: "Rosa",
    char4: "Victor",

    /* Challenge 0 — Set up your email */
    ch0PageTitle: "Challenge 0 — Set up your email",
    ch0Step1Label: "Step 1 of 3 — Watch",
    ch0Step1Heading: "How to set up your Gmail account",
    ch0Step1VideoPH: "How-to clips — Create a Gmail account, set up a password, and complete phone verification",
    ch0Step2Label: "Step 2 of 3 — Practice",
    ch0Step2Heading: "Practice setting up an email account",
    ch0Step2Intro: "Rosa needs to create a Gmail account so she can register for MyChart.",
    ch0Step2Intro2: "Help her choose an email address, create a password, and verify her phone number.",
    ch0Step3Label: "Step 3 of 3 — Do it on your phone",
    ch0Step3Heading: "Now set up your own email account",
    ch0Step3Intro: "Open a web browser on your phone and follow these steps:",
    ch0Check1: "Open a web browser. Go to the Gmail website. Tap \"Create account.\" Enter your first and last name. Choose a new email address. Tap \"Next.\"",
    ch0Check2: "Type your chosen password. Type your password again to confirm. Tap \"Next.\"",
    ch0Check3: "Enter your phone number. Tap \"Next.\" Type the code you received in a text message. Tap \"Verify.\"",
    ch0Check4: "Write your email address on your card. Write your password on your card.",

    /* Challenge 01 — Set up MyChart */
    ch01PageTitle: "Challenge 01 — Set up MyChart",
    ch01Step1Label: "Step 1 of 3 — Watch",
    ch01Step1Heading: "How to set up your MyChart account",
    ch01Step1VideoPH: "How-to clips — Download MyChart, register, create a username and password, set up 2FA, log in, and set your language",
    ch01Step2Label: "Step 2 of 3 — Practice",
    ch01Step2Heading: "Help Rosa set up her language settings",
    ch01Step2Intro: "Rosa just registered for MyChart. She wants to make sure the app is in her preferred language.",
    ch01Step2Intro2: "Help her find the Settings menu and change her language and notification preferences.",
    ch01Step3Label: "Step 3 of 3 — Do it on your phone",
    ch01Step3Heading: "Now try it on your own MyChart",
    ch01Step3Intro: "Open MyChart on your phone and follow these steps:",
    ch01Check1: "Download the MyChart app or go to the BMC MyChart website.",
    ch01Check2: "Follow the prompts to register using your information or activation code.",
    ch01Check3: "Create your MyChart username and password.",
    ch01Check4: "Set up Two-Factor Authentication (2FA) using your phone number.",
    ch01Check5: "Log in to your new MyChart account.",
    ch01Check6: "Tap the Menu icon and go to \"Settings.\"",
    ch01Check7: "Tap \"Language\" and select your preferred language.",
    ch01Check8: "Tap \"Notifications\" and turn on the options you want (like text message reminders).",

    /* Challenge 03 — Common tasks */
    ch03PageTitle: "Challenge 03 — Common tasks",
    ch03Step1Label: "Step 1 of 3 — Watch",
    ch03Step1Heading: "How to manage your health in MyChart",
    ch03Step1VideoPH: "How-to clips — Request a medication refill, schedule a follow-up appointment, and send a secure message",
    ch03Step2Label: "Step 2 of 3 — Practice",
    ch03Step2Heading: "Help Elena manage Clara's care",
    ch03Step2Intro: "Elena manages her mother Clara's health. Clara needs a refill on her blood pressure medicine.",
    ch03Step2Intro2: "Help Elena find the Medications tile and send a message to Clara's doctor.",
    ch03Step3Label: "Step 3 of 3 — Do it on your phone",
    ch03Step3Heading: "Now try it on your own MyChart",
    ch03Step3Intro: "Open MyChart on your phone and follow these steps:",
    ch03Check1: "Tap the Medications tile. Find a medicine you are taking and practice tapping \"Request Refill.\" Stop before confirming.",
    ch03Check2: "Tap the Appointments tile. Tap \"Schedule a New Appointment.\" Practice selecting your doctor and choosing a date. Cancel before confirming.",
    ch03Check3: "Tap the Messages tile. Tap \"New Message.\" Select your Navigator Person as the recipient.",
    ch03Check4: "Type a short message, like \"Hello, I completed Challenge 03.\"",
    ch03Check5: "Tap \"Send.\"",

    /* Challenge 04 — Family account access */
    ch04PageTitle: "Challenge 04 — Family account access",
    ch04Step1Label: "Step 1 of 3 — Watch",
    ch04Step1Heading: "How to manage family accounts in MyChart",
    ch04Step1VideoPH: "How-to clips — Set up proxy access in Sharing Hub, switch between linked accounts, and review notification settings",
    ch04Step2Label: "Step 2 of 3 — Practice",
    ch04Step2Heading: "Help Elena set up access to Leo's account",
    ch04Step2Intro: "Elena needs to set up proxy access so she can see her grandson Leo's health information and book his appointments.",
    ch04Step2Intro2: "Help her find the Sharing Hub and set up her caregiver access.",
    ch04Step3Label: "Step 3 of 3 — Do it on your phone",
    ch04Step3Heading: "Now try it on your own MyChart",
    ch04Step3Intro: "Open MyChart on your phone and follow these steps:",
    ch04Check1: "Tap the Menu icon.",
    ch04Check2: "Tap \"Sharing Hub.\"",
    ch04Check3: "Practice finding the \"Invite Someone\" button. Do not send a real invite.",
    ch04Check4: "Tap your name or the Account icon at the top of the screen.",
    ch04Check5: "Practice selecting a linked family member's name (if you have one).",
    ch04Check6: "Go to \"Settings\" and review your \"Notifications\" one more time.",

    /* Challenge 05 — Find community resources */
    ch05PageTitle: "Challenge 05 — Find community resources",
    ch05Step1Label: "Step 1 of 3 — Watch",
    ch05Step1Heading: "How to find community resources with MassThrive",
    ch05Step1VideoPH: "How-to clips — Find MassThrive in MyChart, change language, search by ZIP code, read a program card, and contact an organization",
    ch05Step2Label: "Step 2 of 3 — Practice",
    ch05Step2Heading: "Help Victor find a food pantry",
    ch05Step2Intro: "Victor needs to find a food pantry close to his home using MassThrive.",
    ch05Step2Intro2: "Help him search by ZIP code and find the contact information on a program card.",
    ch05Step3Label: "Step 3 of 3 — Do it on your phone",
    ch05Step3Heading: "Now try it on your own phone",
    ch05Step3Intro: "Open MyChart on your phone and follow these steps:",
    ch05Check1: "Tap the Menu icon in MyChart.",
    ch05Check2: "Tap \"Community\" or \"Find Resources\" to open MassThrive.",
    ch05Check3: "Look for the language toggle on the MassThrive website and practice changing the language.",
    ch05Check4: "Type your ZIP code into the search bar.",
    ch05Check5: "Select a category (like Food or Housing) from the dropdown menu.",
    ch05Check6: "Tap on a program card and find the contact phone number.",
    ch05Check7: "Self-practice: Dial 2-1-1 on your phone, then hang up before anyone answers.",
  },

  es: {
    welcomeHeading: "Welcome / Bienvenido / Bem-vindo / Byenveni / 欢迎",
    langIndicator: "Español",
    footerHome: "🏠 Inicio",
    footerHelp: "🔍 Ayuda",
    headerLogoAlt: "Logo de BMC",
    homeHeading: "¿Qué le gustaría hacer hoy?",
    card1Label: "Aprenda MyChart paso a paso",
    card2Label: "Encuentre ayuda con una tarea específica",
    card3Label: "Abrir MyChart",
    card3Note: "Se abre en una nueva pestaña",
    card4Label: "Abrir MassThrive",
    card4Note: "Se abre en una nueva pestaña",
    courseHeading: "Aprenda MyChart paso a paso",
    startBtn: "Comenzar",
    ch0Number: "Reto 0",
    ch0Name: "Configure su correo electrónico",
    ch0Time: "Aproximadamente 5–8 minutos",
    ch01Number: "Reto 01",
    ch01Name: "Configure MyChart",
    ch01Time: "Aproximadamente 8 minutos",
    ch02Number: "Reto 02",
    ch02Name: "Únase a una visita por video",
    ch02Time: "Aproximadamente 10 minutos",
    ch03Number: "Reto 03",
    ch03Name: "Tareas comunes",
    ch03Time: "Aproximadamente 10 minutos",
    ch04Number: "Reto 04",
    ch04Name: "Administre su cuenta",
    ch04Time: "Aproximadamente 8 minutos",
    ch05Number: "Reto 05",
    ch05Name: "Encuentre recursos comunitarios",
    ch05Time: "Aproximadamente 8 minutos",
    stepLabelTemplate: "Paso {n} de 3",
    step1TabLabel: "Ver",
    step2TabLabel: "Practicar",
    step3TabLabel: "Hacerlo",
    nextBtn: "Siguiente →",
    backStepBtn: "← Atrás",
    doneBtn: "Listo — terminé",
    videoPH: "Video instructivo",
    textPanelPH: "Panel de texto — los pasos traducidos aparecen aquí",
    scenarioPH: "Escenario del personaje — la interacción H5P o personalizada va aquí",
    charSelectorLabel: "Elige un personaje:",
    ch02PageTitle: "Reto 02 — Únase a una visita por video",
    ch02Step1Label: "Paso 1 de 3 — Ver",
    ch02Step1Heading: "Cómo unirse a una visita por video en su teléfono",
    ch02Step1VideoPH: "Video instructivo — Unirse a una visita por video con la app MyChart",
    ch02Step2Label: "Paso 2 de 3 — Practicar",
    ch02Step2Heading: "Ayude a Marcus a unirse a su visita",
    ch02Step2Intro: "Marcus necesita unirse a una visita por video desde su teléfono durante su almuerzo.",
    ch02Step2Intro2: "Ayúdelo a encontrar su cita y toque Comenzar visita.",
    ch02Step3Label: "Paso 3 de 3 — Hágalo en su teléfono",
    ch02Step3Heading: "Ahora inténtelo en su propio MyChart",
    ch02Step3Intro: "Abra MyChart en su teléfono y siga estos pasos:",
    ch02Check1: "Abra la aplicación MyChart en su teléfono.",
    ch02Check2: "Toque Citas.",
    ch02Check3: "Encuentre la visita por video de hoy en la lista.",
    ch02Check4: "Toque Comenzar visita.",
    ch02Check5: "Espere en la sala de espera. Su proveedor se unirá pronto.",
    stubLabel: "Próximamente en la Fase 2",
    stubText: "Este reto se desarrollará completamente durante la Fase 2A.",
    helpHeading: "Encuentre ayuda con una tarea específica",
    cat1Label: "Configurar su correo electrónico",
    cat2Label: "Configurar MyChart",
    cat3Label: "Visitas por video",
    cat4Label: "Medicamentos y recargas",
    cat5Label: "Citas",
    cat6Label: "Mensajes y sus registros",
    cat7Label: "Recursos comunitarios",
    backToAllTopics: "← Todos los temas",
    cat3PageHeading: "Visitas por video",
    topicTime: "2 min",
    vt1: "Unirse a una visita por video en su teléfono",
    vt2: "Unirse a una visita por video en una computadora",
    vt3: "Configurar su cámara y micrófono",
    vt4: "Solución: cámara no funciona",
    vt5: "Solución: conexión interrumpida",
    vt6: "Solución: sala de espera incorrecta",
    vt7: "Unirse con la aplicación Pexip (teléfonos más antiguos)",
    vt8: "Programar una visita por video",
    topicPageHeading: "Cómo unirse a una visita por video en su teléfono",
    topicBackLink: "← Visitas por video",
    topicVideoPH: "Video instructivo — Unirse a una visita por video en su teléfono",
    stepsHeading: "Pasos",
    step1Text: "Abra la aplicación MyChart en su teléfono.",
    step2Text: "Toque Citas.",
    step3Text: "Encuentre su visita por video en la lista.",
    step4Text: "Toque Comenzar visita.",
    step5Text: "Permita que la aplicación use su cámara y micrófono si se lo pide.",
    step6Text: "Espere en la sala de espera. Su proveedor se unirá pronto.",
    moreHelpHeading: "¿Necesita más ayuda?",
    textUsLabel: "📱 Envíenos un mensaje de texto",
    backToCourseLabel: "📘 Volver al curso",

    /* Character names */
    char1: "Elena",
    char2: "Marcus",
    char3: "Rosa",
    char4: "Victor",

    /* Challenge 0 */
    ch0PageTitle: "Reto 0 — Configure su correo electrónico",
    ch0Step1Label: "Paso 1 de 3 — Ver",
    ch0Step1Heading: "Cómo configurar su cuenta de Gmail",
    ch0Step1VideoPH: "Videos instructivos — Crear una cuenta de Gmail, establecer una contraseña y completar la verificación telefónica",
    ch0Step2Label: "Paso 2 de 3 — Practicar",
    ch0Step2Heading: "Practica configurar una cuenta de correo electrónico",
    ch0Step2Intro: "Rosa necesita crear una cuenta de Gmail para poder registrarse en MyChart.",
    ch0Step2Intro2: "Ayúdela a elegir una dirección de correo, crear una contraseña y verificar su número de teléfono.",
    ch0Step3Label: "Paso 3 de 3 — Hágalo en su teléfono",
    ch0Step3Heading: "Ahora configure su propia cuenta de correo electrónico",
    ch0Step3Intro: "Abra un navegador web en su teléfono y siga estos pasos:",
    ch0Check1: "Abra un navegador web. Vaya al sitio web de Gmail. Toque \"Crear cuenta.\" Ingrese su nombre y apellido. Elija una nueva dirección de correo. Toque \"Siguiente.\"",
    ch0Check2: "Escriba su contraseña elegida. Escríbala de nuevo para confirmar. Toque \"Siguiente.\"",
    ch0Check3: "Ingrese su número de teléfono. Toque \"Siguiente.\" Escriba el código que recibió en un mensaje de texto. Toque \"Verificar.\"",
    ch0Check4: "Escriba su dirección de correo electrónico en su tarjeta. Escriba su contraseña en su tarjeta.",

    /* Challenge 01 */
    ch01PageTitle: "Reto 01 — Configure MyChart",
    ch01Step1Label: "Paso 1 de 3 — Ver",
    ch01Step1Heading: "Cómo configurar su cuenta de MyChart",
    ch01Step1VideoPH: "Videos instructivos — Descargar MyChart, registrarse, crear nombre de usuario y contraseña, configurar la verificación en dos pasos, iniciar sesión y configurar su idioma",
    ch01Step2Label: "Paso 2 de 3 — Practicar",
    ch01Step2Heading: "Ayude a Rosa a configurar su idioma",
    ch01Step2Intro: "Rosa acaba de registrarse en MyChart. Quiere asegurarse de que la aplicación esté en su idioma preferido.",
    ch01Step2Intro2: "Ayúdela a encontrar el menú de Configuración y cambiar su idioma y preferencias de notificaciones.",
    ch01Step3Label: "Paso 3 de 3 — Hágalo en su teléfono",
    ch01Step3Heading: "Ahora inténtelo en su propio MyChart",
    ch01Step3Intro: "Abra MyChart en su teléfono y siga estos pasos:",
    ch01Check1: "Descargue la aplicación MyChart o vaya al sitio web de BMC MyChart.",
    ch01Check2: "Siga las instrucciones para registrarse usando su información o código de activación.",
    ch01Check3: "Cree su nombre de usuario y contraseña de MyChart.",
    ch01Check4: "Configure la autenticación de dos factores (2FA) usando su número de teléfono.",
    ch01Check5: "Inicie sesión en su nueva cuenta de MyChart.",
    ch01Check6: "Toque el ícono de Menú y vaya a \"Configuración.\"",
    ch01Check7: "Toque \"Idioma\" y seleccione su idioma preferido.",
    ch01Check8: "Toque \"Notificaciones\" y active las opciones que desee (como recordatorios por mensaje de texto).",

    /* Challenge 03 */
    ch03PageTitle: "Reto 03 — Tareas comunes",
    ch03Step1Label: "Paso 1 de 3 — Ver",
    ch03Step1Heading: "Cómo administrar su salud en MyChart",
    ch03Step1VideoPH: "Videos instructivos — Solicitar una recarga de medicamento, programar una cita de seguimiento y enviar un mensaje seguro",
    ch03Step2Label: "Paso 2 de 3 — Practicar",
    ch03Step2Heading: "Ayude a Elena a gestionar el cuidado de Clara",
    ch03Step2Intro: "Elena administra la salud de su madre Clara. Clara necesita una recarga de su medicamento para la presión arterial.",
    ch03Step2Intro2: "Ayude a Elena a encontrar el icono de Medicamentos y enviar un mensaje al médico de Clara.",
    ch03Step3Label: "Paso 3 de 3 — Hágalo en su teléfono",
    ch03Step3Heading: "Ahora inténtelo en su propio MyChart",
    ch03Step3Intro: "Abra MyChart en su teléfono y siga estos pasos:",
    ch03Check1: "Toque el icono de Medicamentos. Encuentre un medicamento que esté tomando y practique tocar \"Solicitar recarga.\" Deténgase antes de confirmar.",
    ch03Check2: "Toque el icono de Citas. Toque \"Programar una nueva cita.\" Practique seleccionar a su médico y elegir una fecha. Cancele antes de confirmar.",
    ch03Check3: "Toque el icono de Mensajes. Toque \"Nuevo mensaje.\" Seleccione a su Persona Navegadora como destinataria.",
    ch03Check4: "Escriba un mensaje corto, como \"Hola, completé el Reto 03.\"",
    ch03Check5: "Toque \"Enviar.\"",

    /* Challenge 04 */
    ch04PageTitle: "Reto 04 — Acceso a cuentas familiares",
    ch04Step1Label: "Paso 1 de 3 — Ver",
    ch04Step1Heading: "Cómo administrar cuentas familiares en MyChart",
    ch04Step1VideoPH: "Videos instructivos — Configurar acceso de representante en el Centro de Compartir, cambiar entre cuentas vinculadas y revisar la configuración de notificaciones",
    ch04Step2Label: "Paso 2 de 3 — Practicar",
    ch04Step2Heading: "Ayude a Elena a configurar el acceso a la cuenta de Leo",
    ch04Step2Intro: "Elena necesita configurar un acceso de representante para poder ver la información de salud de su nieto Leo y reservar sus citas.",
    ch04Step2Intro2: "Ayúdela a encontrar el Centro de Compartir y configurar su acceso como cuidadora.",
    ch04Step3Label: "Paso 3 de 3 — Hágalo en su teléfono",
    ch04Step3Heading: "Ahora inténtelo en su propio MyChart",
    ch04Step3Intro: "Abra MyChart en su teléfono y siga estos pasos:",
    ch04Check1: "Toque el ícono de Menú.",
    ch04Check2: "Toque \"Centro de Compartir.\"",
    ch04Check3: "Practique encontrar el botón \"Invitar a alguien.\" No envíe una invitación real.",
    ch04Check4: "Toque su nombre o el ícono de Cuenta en la parte superior de la pantalla.",
    ch04Check5: "Practique seleccionar el nombre de un familiar vinculado (si tiene uno).",
    ch04Check6: "Vaya a \"Configuración\" y revise sus \"Notificaciones\" una vez más.",

    /* Challenge 05 */
    ch05PageTitle: "Reto 05 — Encuentre recursos comunitarios",
    ch05Step1Label: "Paso 1 de 3 — Ver",
    ch05Step1Heading: "Cómo encontrar recursos comunitarios con MassThrive",
    ch05Step1VideoPH: "Videos instructivos — Encontrar MassThrive en MyChart, cambiar idioma, buscar por código postal, leer una tarjeta de programa y contactar una organización",
    ch05Step2Label: "Paso 2 de 3 — Practicar",
    ch05Step2Heading: "Ayude a Victor a encontrar un banco de alimentos",
    ch05Step2Intro: "Victor necesita encontrar un banco de alimentos cerca de su casa usando MassThrive.",
    ch05Step2Intro2: "Ayúdelo a buscar por código postal y encontrar la información de contacto en una tarjeta de programa.",
    ch05Step3Label: "Paso 3 de 3 — Hágalo en su teléfono",
    ch05Step3Heading: "Ahora inténtelo en su propio teléfono",
    ch05Step3Intro: "Abra MyChart en su teléfono y siga estos pasos:",
    ch05Check1: "Toque el ícono de Menú en MyChart.",
    ch05Check2: "Toque \"Comunidad\" o \"Encontrar Recursos\" para abrir MassThrive.",
    ch05Check3: "Busque el interruptor de idioma en el sitio web de MassThrive y practique cambiar el idioma.",
    ch05Check4: "Escriba su código postal en la barra de búsqueda.",
    ch05Check5: "Seleccione una categoría (como Alimentos o Vivienda) del menú desplegable.",
    ch05Check6: "Toque una tarjeta de programa y encuentre el número de teléfono de contacto.",
    ch05Check7: "Autopráctica: Marque 2-1-1 en su teléfono y cuelgue antes de que alguien conteste.",
  },

  pt: {
    welcomeHeading: "Welcome / Bienvenido / Bem-vindo / Byenveni / 欢迎",
    langIndicator: "Português",
    footerHome: "🏠 Início",
    footerHelp: "🔍 Ajuda",
    headerLogoAlt: "Logotipo do BMC",
    homeHeading: "O que você gostaria de fazer hoje?",
    card1Label: "Aprenda o MyChart passo a passo",
    card2Label: "Encontre ajuda com uma tarefa específica",
    card3Label: "Abrir MyChart",
    card3Note: "Abre em uma nova aba",
    card4Label: "Abrir MassThrive",
    card4Note: "Abre em uma nova aba",
    courseHeading: "Aprenda o MyChart passo a passo",
    startBtn: "Começar",
    ch0Number: "Desafio 0",
    ch0Name: "Configure seu e-mail",
    ch0Time: "Aproximadamente 5–8 minutos",
    ch01Number: "Desafio 01",
    ch01Name: "Configure o MyChart",
    ch01Time: "Aproximadamente 8 minutos",
    ch02Number: "Desafio 02",
    ch02Name: "Participe de uma consulta por vídeo",
    ch02Time: "Aproximadamente 10 minutos",
    ch03Number: "Desafio 03",
    ch03Name: "Tarefas comuns",
    ch03Time: "Aproximadamente 10 minutos",
    ch04Number: "Desafio 04",
    ch04Name: "Gerencie sua conta",
    ch04Time: "Aproximadamente 8 minutos",
    ch05Number: "Desafio 05",
    ch05Name: "Encontre recursos comunitários",
    ch05Time: "Aproximadamente 8 minutos",
    stepLabelTemplate: "Etapa {n} de 3",
    step1TabLabel: "Assistir",
    step2TabLabel: "Praticar",
    step3TabLabel: "Fazer",
    nextBtn: "Próximo →",
    backStepBtn: "← Voltar",
    doneBtn: "Concluído",
    videoPH: "Clipe instrutivo",
    textPanelPH: "Painel de texto — as etapas traduzidas aparecem aqui",
    scenarioPH: "Cenário do personagem — a interação H5P ou personalizada fica aqui",
    charSelectorLabel: "Escolha um personagem:",
    ch02PageTitle: "Desafio 02 — Consulta por vídeo",
    ch02Step1Label: "Etapa 1 de 3 — Assistir",
    ch02Step1Heading: "Como participar de uma consulta por vídeo no seu telefone",
    ch02Step1VideoPH: "Clipe instrutivo — Participar de uma consulta por vídeo pelo aplicativo MyChart",
    ch02Step2Label: "Etapa 2 de 3 — Praticar",
    ch02Step2Heading: "Ajude Marcus a entrar na consulta dele",
    ch02Step2Intro: "Marcus precisa participar de uma consulta por vídeo pelo telefone durante o intervalo.",
    ch02Step2Intro2: "Ajude-o a encontrar o agendamento e tocar em Iniciar consulta.",
    ch02Step3Label: "Etapa 3 de 3 — Faça no seu telefone",
    ch02Step3Heading: "Agora tente no seu próprio MyChart",
    ch02Step3Intro: "Abra o MyChart no seu telefone e siga estas etapas:",
    ch02Check1: "Abra o aplicativo MyChart no seu telefone.",
    ch02Check2: "Toque em Consultas.",
    ch02Check3: "Encontre a consulta por vídeo de hoje na lista.",
    ch02Check4: "Toque em Iniciar consulta.",
    ch02Check5: "Aguarde na sala de espera. Seu médico entrará em breve.",
    stubLabel: "Em breve na Fase 2",
    stubText: "Este desafio será totalmente desenvolvido durante a Fase 2A.",
    helpHeading: "Encontre ajuda com uma tarefa específica",
    cat1Label: "Configurar seu e-mail",
    cat2Label: "Configurar o MyChart",
    cat3Label: "Consultas por vídeo",
    cat4Label: "Medicamentos e recargas",
    cat5Label: "Consultas",
    cat6Label: "Mensagens e seus registros",
    cat7Label: "Recursos comunitários",
    backToAllTopics: "← Todos os tópicos",
    cat3PageHeading: "Consultas por vídeo",
    topicTime: "2 min",
    vt1: "Participar de uma consulta por vídeo no telefone",
    vt2: "Participar de uma consulta por vídeo no computador",
    vt3: "Configurar câmera e microfone",
    vt4: "Solução: câmera não funciona",
    vt5: "Solução: conexão interrompida",
    vt6: "Solução: sala de espera errada",
    vt7: "Entrar usando o aplicativo Pexip (telefones mais antigos)",
    vt8: "Agendar uma consulta por vídeo",
    topicPageHeading: "Como participar de uma consulta por vídeo no seu telefone",
    topicBackLink: "← Consultas por vídeo",
    topicVideoPH: "Vídeo instrutivo — Participar de uma consulta por vídeo",
    stepsHeading: "Etapas",
    step1Text: "Abra o aplicativo MyChart no seu telefone.",
    step2Text: "Toque em Consultas.",
    step3Text: "Encontre sua consulta por vídeo na lista.",
    step4Text: "Toque em Iniciar consulta.",
    step5Text: "Permita que o aplicativo use sua câmera e microfone se solicitado.",
    step6Text: "Aguarde na sala de espera. Seu médico entrará em breve.",
    moreHelpHeading: "Precisa de mais ajuda?",
    textUsLabel: "📱 Envie uma mensagem de texto",
    backToCourseLabel: "📘 Voltar ao curso",

    /* Character names */
    char1: "Elena",
    char2: "Marcus",
    char3: "Rosa",
    char4: "Victor",

    /* Challenge 0 */
    ch0PageTitle: "Desafio 0 — Configure seu e-mail",
    ch0Step1Label: "Etapa 1 de 3 — Assistir",
    ch0Step1Heading: "Como configurar sua conta do Gmail",
    ch0Step1VideoPH: "Clipes instrutivos — Criar uma conta do Gmail, definir uma senha e concluir a verificação de telefone",
    ch0Step2Label: "Etapa 2 de 3 — Praticar",
    ch0Step2Heading: "Pratique configurar uma conta de e-mail",
    ch0Step2Intro: "Rosa precisa criar uma conta do Gmail para se registrar no MyChart.",
    ch0Step2Intro2: "Ajude-a a escolher um endereço de e-mail, criar uma senha e verificar seu número de telefone.",
    ch0Step3Label: "Etapa 3 de 3 — Faça no seu telefone",
    ch0Step3Heading: "Agora configure sua própria conta de e-mail",
    ch0Step3Intro: "Abra um navegador no seu telefone e siga estas etapas:",
    ch0Check1: "Abra um navegador. Acesse o site do Gmail. Toque em \"Criar conta.\" Digite seu nome e sobrenome. Escolha um novo endereço de e-mail. Toque em \"Próximo.\"",
    ch0Check2: "Digite sua senha. Digite-a novamente para confirmar. Toque em \"Próximo.\"",
    ch0Check3: "Digite seu número de telefone. Toque em \"Próximo.\" Digite o código recebido por mensagem de texto. Toque em \"Verificar.\"",
    ch0Check4: "Escreva seu endereço de e-mail no cartão. Escreva sua senha no cartão.",

    /* Challenge 01 */
    ch01PageTitle: "Desafio 01 — Configure o MyChart",
    ch01Step1Label: "Etapa 1 de 3 — Assistir",
    ch01Step1Heading: "Como configurar sua conta do MyChart",
    ch01Step1VideoPH: "Clipes instrutivos — Baixar o MyChart, registrar, criar nome de usuário e senha, configurar a autenticação de dois fatores, fazer login e definir seu idioma",
    ch01Step2Label: "Etapa 2 de 3 — Praticar",
    ch01Step2Heading: "Ajude Rosa a configurar o idioma",
    ch01Step2Intro: "Rosa acabou de se registrar no MyChart. Ela quer garantir que o aplicativo esteja no idioma preferido dela.",
    ch01Step2Intro2: "Ajude-a a encontrar o menu Configurações e alterar o idioma e as preferências de notificação.",
    ch01Step3Label: "Etapa 3 de 3 — Faça no seu telefone",
    ch01Step3Heading: "Agora tente no seu próprio MyChart",
    ch01Step3Intro: "Abra o MyChart no seu telefone e siga estas etapas:",
    ch01Check1: "Baixe o aplicativo MyChart ou acesse o site do BMC MyChart.",
    ch01Check2: "Siga as instruções para se registrar usando suas informações ou código de ativação.",
    ch01Check3: "Crie seu nome de usuário e senha do MyChart.",
    ch01Check4: "Configure a autenticação de dois fatores (2FA) usando seu número de telefone.",
    ch01Check5: "Faça login na sua nova conta do MyChart.",
    ch01Check6: "Toque no ícone do Menu e vá para \"Configurações.\"",
    ch01Check7: "Toque em \"Idioma\" e selecione seu idioma preferido.",
    ch01Check8: "Toque em \"Notificações\" e ative as opções desejadas (como lembretes por mensagem de texto).",

    /* Challenge 03 */
    ch03PageTitle: "Desafio 03 — Tarefas comuns",
    ch03Step1Label: "Etapa 1 de 3 — Assistir",
    ch03Step1Heading: "Como gerenciar sua saúde no MyChart",
    ch03Step1VideoPH: "Clipes instrutivos — Solicitar recarga de medicamento, agendar consulta de acompanhamento e enviar uma mensagem segura",
    ch03Step2Label: "Etapa 2 de 3 — Praticar",
    ch03Step2Heading: "Ajude Elena a gerenciar o cuidado de Clara",
    ch03Step2Intro: "Elena cuida da saúde de sua mãe Clara. Clara precisa de uma recarga do remédio para pressão arterial.",
    ch03Step2Intro2: "Ajude Elena a encontrar o bloco de Medicamentos e enviar uma mensagem ao médico de Clara.",
    ch03Step3Label: "Etapa 3 de 3 — Faça no seu telefone",
    ch03Step3Heading: "Agora tente no seu próprio MyChart",
    ch03Step3Intro: "Abra o MyChart no seu telefone e siga estas etapas:",
    ch03Check1: "Toque no bloco de Medicamentos. Encontre um medicamento que você toma e pratique tocar em \"Solicitar Recarga.\" Pare antes de confirmar.",
    ch03Check2: "Toque no bloco de Consultas. Toque em \"Agendar Nova Consulta.\" Pratique selecionar seu médico e escolher uma data. Cancele antes de confirmar.",
    ch03Check3: "Toque no bloco de Mensagens. Toque em \"Nova Mensagem.\" Selecione seu Navegador como destinatário.",
    ch03Check4: "Digite uma mensagem curta, como \"Olá, concluí o Desafio 03.\"",
    ch03Check5: "Toque em \"Enviar.\"",

    /* Challenge 04 */
    ch04PageTitle: "Desafio 04 — Acesso a contas familiares",
    ch04Step1Label: "Etapa 1 de 3 — Assistir",
    ch04Step1Heading: "Como gerenciar contas familiares no MyChart",
    ch04Step1VideoPH: "Clipes instrutivos — Configurar acesso por procuração no Hub de Compartilhamento, alternar entre contas vinculadas e revisar configurações de notificação",
    ch04Step2Label: "Etapa 2 de 3 — Praticar",
    ch04Step2Heading: "Ajude Elena a configurar o acesso à conta de Leo",
    ch04Step2Intro: "Elena precisa configurar acesso por procuração para ver as informações de saúde de seu neto Leo e agendar consultas para ele.",
    ch04Step2Intro2: "Ajude-a a encontrar o Hub de Compartilhamento e configurar seu acesso como cuidadora.",
    ch04Step3Label: "Etapa 3 de 3 — Faça no seu telefone",
    ch04Step3Heading: "Agora tente no seu próprio MyChart",
    ch04Step3Intro: "Abra o MyChart no seu telefone e siga estas etapas:",
    ch04Check1: "Toque no ícone do Menu.",
    ch04Check2: "Toque em \"Hub de Compartilhamento.\"",
    ch04Check3: "Pratique encontrar o botão \"Convidar Alguém.\" Não envie um convite real.",
    ch04Check4: "Toque no seu nome ou no ícone de Conta no topo da tela.",
    ch04Check5: "Pratique selecionar o nome de um familiar vinculado (se tiver um).",
    ch04Check6: "Vá para \"Configurações\" e revise suas \"Notificações\" mais uma vez.",

    /* Challenge 05 */
    ch05PageTitle: "Desafio 05 — Encontre recursos comunitários",
    ch05Step1Label: "Etapa 1 de 3 — Assistir",
    ch05Step1Heading: "Como encontrar recursos comunitários com o MassThrive",
    ch05Step1VideoPH: "Clipes instrutivos — Encontrar o MassThrive no MyChart, mudar idioma, pesquisar por CEP, ler um cartão de programa e contatar uma organização",
    ch05Step2Label: "Etapa 2 de 3 — Praticar",
    ch05Step2Heading: "Ajude Victor a encontrar uma despensa de alimentos",
    ch05Step2Intro: "Victor precisa encontrar uma despensa de alimentos perto de casa usando o MassThrive.",
    ch05Step2Intro2: "Ajude-o a pesquisar pelo CEP e encontrar as informações de contato no cartão de programa.",
    ch05Step3Label: "Etapa 3 de 3 — Faça no seu telefone",
    ch05Step3Heading: "Agora tente no seu próprio telefone",
    ch05Step3Intro: "Abra o MyChart no seu telefone e siga estas etapas:",
    ch05Check1: "Toque no ícone do Menu no MyChart.",
    ch05Check2: "Toque em \"Comunidade\" ou \"Encontrar Recursos\" para abrir o MassThrive.",
    ch05Check3: "Procure o seletor de idioma no site do MassThrive e pratique mudar o idioma.",
    ch05Check4: "Digite seu CEP na barra de pesquisa.",
    ch05Check5: "Selecione uma categoria (como Alimentos ou Moradia) no menu suspenso.",
    ch05Check6: "Toque em um cartão de programa e encontre o número de telefone de contato.",
    ch05Check7: "Autoaprática: Disque 2-1-1 no seu telefone e desligue antes de alguém atender.",
  },

  ht: {
    welcomeHeading: "Welcome / Bienvenido / Bem-vindo / Byenveni / 欢迎",
    langIndicator: "Kreyòl ayisyen",
    footerHome: "🏠 Akèy",
    footerHelp: "🔍 Èd",
    headerLogoAlt: "Logo BMC",
    homeHeading: "Kisa ou ta renmen fè jodi a?",
    card1Label: "Aprann MyChart etap pa etap",
    card2Label: "Jwenn èd pou yon travay espesifik",
    card3Label: "Louvri MyChart",
    card3Note: "Louvri nan yon nouvel onglet",
    card4Label: "Louvri MassThrive",
    card4Note: "Louvri nan yon nouvel onglet",
    courseHeading: "Aprann MyChart etap pa etap",
    startBtn: "Kòmanse",
    ch0Number: "Defi 0",
    ch0Name: "Konfigire imèl ou",
    ch0Time: "Anviwon 5–8 minit",
    ch01Number: "Defi 01",
    ch01Name: "Konfigire MyChart",
    ch01Time: "Anviwon 8 minit",
    ch02Number: "Defi 02",
    ch02Name: "Rantre nan yon vizit videyo",
    ch02Time: "Anviwon 10 minit",
    ch03Number: "Defi 03",
    ch03Name: "Travay kouran",
    ch03Time: "Anviwon 10 minit",
    ch04Number: "Defi 04",
    ch04Name: "Jere kont ou",
    ch04Time: "Anviwon 8 minit",
    ch05Number: "Defi 05",
    ch05Name: "Jwenn resous kominotè",
    ch05Time: "Anviwon 8 minit",
    stepLabelTemplate: "Etap {n} nan 3",
    step1TabLabel: "Gade",
    step2TabLabel: "Pratike",
    step3TabLabel: "Fè li",
    nextBtn: "Pwochen →",
    backStepBtn: "← Tounen",
    doneBtn: "Fini",
    videoPH: "Klip enstriksyon",
    textPanelPH: "Panel tèks — etap tradui yo parèt isit la",
    scenarioPH: "Sèn pèsonaj — entèraksyon H5P oswa pèsonalize ale isit la",
    charSelectorLabel: "Chwazi yon pèsonaj:",
    ch02PageTitle: "Defi 02 — Rantre nan vizit videyo",
    ch02Step1Label: "Etap 1 nan 3 — Gade",
    ch02Step1Heading: "Kijan pou rantre nan yon vizit videyo sou telefòn ou",
    ch02Step1VideoPH: "Klip enstriksyon — Rantre nan vizit videyo via aplikasyon MyChart",
    ch02Step2Label: "Etap 2 nan 3 — Pratike",
    ch02Step2Heading: "Ede Marcus rantre nan vizit li",
    ch02Step2Intro: "Marcus bezwen rantre nan yon vizit videyo depi telefòn li pandan tan manje li.",
    ch02Step2Intro2: "Ede li jwenn randevou li epi tache Kòmanse Vizit.",
    ch02Step3Label: "Etap 3 nan 3 — Fè li sou telefòn ou",
    ch02Step3Heading: "Kounye a eseye sou pwòp MyChart ou",
    ch02Step3Intro: "Ouvri MyChart sou telefòn ou epi swiv etap sa yo:",
    ch02Check1: "Ouvri aplikasyon MyChart sou telefòn ou.",
    ch02Check2: "Tape Randevou.",
    ch02Check3: "Jwenn vizit videyo jodi a nan lis la.",
    ch02Check4: "Tape Kòmanse Vizit.",
    ch02Check5: "Tann nan sal datant. Founisè w la pral rantre avèk ou.",
    stubLabel: "Ap vini nan Faz 2",
    stubText: "Defi sa a pral devlope konplètman pandan Faz 2A.",
    helpHeading: "Jwenn èd pou yon travay espesifik",
    cat1Label: "Konfigire imèl ou",
    cat2Label: "Konfigire MyChart",
    cat3Label: "Vizit videyo",
    cat4Label: "Medikaman ak renouvèlman",
    cat5Label: "Randevou",
    cat6Label: "Mesaj ak dosye ou",
    cat7Label: "Resous kominotè",
    backToAllTopics: "← Tout sijè yo",
    cat3PageHeading: "Vizit videyo",
    topicTime: "2 min",
    vt1: "Rantre nan yon vizit videyo sou telefòn ou",
    vt2: "Rantre nan yon vizit videyo sou yon òdinatè",
    vt3: "Konfigire kamera ak mikwofòn ou",
    vt4: "Depannaj: kamera pa fonksyone",
    vt5: "Depannaj: koneksyon kase",
    vt6: "Depannaj: move sal datant",
    vt7: "Rantre ak aplikasyon Pexip (telefòn pi ansyen)",
    vt8: "Pwograme yon vizit videyo",
    topicPageHeading: "Kijan pou rantre nan yon vizit videyo sou telefòn ou",
    topicBackLink: "← Vizit videyo",
    topicVideoPH: "Videyo enstriksyon — Rantre nan vizit videyo sou telefòn ou",
    stepsHeading: "Etap yo",
    step1Text: "Ouvri aplikasyon MyChart sou telefòn ou.",
    step2Text: "Tape Randevou.",
    step3Text: "Jwenn vizit videyo ou nan lis la.",
    step4Text: "Tape Kòmanse Vizit.",
    step5Text: "Pèmèt aplikasyon an itilize kamera ak mikwofòn ou si yo mande.",
    step6Text: "Tann nan sal datant. Founisè w la pral rantre avèk ou.",
    moreHelpHeading: "Bezwen plis èd?",
    textUsLabel: "📱 Voye mesaj tèks pou jwenn èd",
    backToCourseLabel: "📘 Tounen nan kou a",

    /* Character names */
    char1: "Elena",
    char2: "Marcus",
    char3: "Rosa",
    char4: "Victor",

    /* Challenge 0 */
    ch0PageTitle: "Defi 0 — Konfigire imèl ou",
    ch0Step1Label: "Etap 1 nan 3 — Gade",
    ch0Step1Heading: "Kijan pou konfigire kont Gmail ou",
    ch0Step1VideoPH: "Klip enstriksyon — Kreye kont Gmail, mete yon modpas, epi fè verifikasyon telefòn",
    ch0Step2Label: "Etap 2 nan 3 — Pratike",
    ch0Step2Heading: "Pratike konfigire yon kont imèl",
    ch0Step2Intro: "Rosa bezwen kreye yon kont Gmail pou li ka enskri nan MyChart.",
    ch0Step2Intro2: "Ede li chwazi yon adrès imèl, kreye yon modpas, epi verifye nimewo telefòn li.",
    ch0Step3Label: "Etap 3 nan 3 — Fè li sou telefòn ou",
    ch0Step3Heading: "Kounye a konfigire pwòp kont imèl ou",
    ch0Step3Intro: "Ouvri yon navigatè entènèt sou telefòn ou epi swiv etap sa yo:",
    ch0Check1: "Ouvri yon navigatè entènèt. Ale sou sit Gmail. Tape \"Kreye kont.\" Antre non ou ak siyati ou. Chwazi yon nouvo adrès imèl. Tape \"Pwochen.\"",
    ch0Check2: "Tape modpas ou chwazi. Tape li ankò pou konfime. Tape \"Pwochen.\"",
    ch0Check3: "Antre nimewo telefòn ou. Tape \"Pwochen.\" Tape kòd ou resevwa nan mesaj tèks. Tape \"Verifye.\"",
    ch0Check4: "Ekri adrès imèl ou sou kat ou. Ekri modpas ou sou kat ou.",

    /* Challenge 01 */
    ch01PageTitle: "Defi 01 — Konfigire MyChart",
    ch01Step1Label: "Etap 1 nan 3 — Gade",
    ch01Step1Heading: "Kijan pou konfigire kont MyChart ou",
    ch01Step1VideoPH: "Klip enstriksyon — Telechaje MyChart, enskri, kreye non itilizatè ak modpas, konfigire otantifikasyon de faktè, konekte, epi chwazi lang ou",
    ch01Step2Label: "Etap 2 nan 3 — Pratike",
    ch01Step2Heading: "Ede Rosa konfigire paramèt lang li",
    ch01Step2Intro: "Rosa fèk enskri nan MyChart. Li vle asire ke aplikasyon an nan lang li prefere.",
    ch01Step2Intro2: "Ede li jwenn meni Paramèt epi chanje lang li ak preferans notifikasyon li.",
    ch01Step3Label: "Etap 3 nan 3 — Fè li sou telefòn ou",
    ch01Step3Heading: "Kounye a eseye sou pwòp MyChart ou",
    ch01Step3Intro: "Ouvri MyChart sou telefòn ou epi swiv etap sa yo:",
    ch01Check1: "Telechaje aplikasyon MyChart oswa ale sou sit entènèt BMC MyChart.",
    ch01Check2: "Swiv enstriksyon yo pou enskri avèk enfòmasyon ou oswa kòd aktivasyon ou.",
    ch01Check3: "Kreye non itilizatè ak modpas MyChart ou.",
    ch01Check4: "Konfigire Otantifikasyon de Faktè (2FA) avèk nimewo telefòn ou.",
    ch01Check5: "Konekte nan nouvo kont MyChart ou.",
    ch01Check6: "Tape ikòn Meni epi ale nan \"Paramèt.\"",
    ch01Check7: "Tape \"Lang\" epi chwazi lang ou prefere.",
    ch01Check8: "Tape \"Notifikasyon\" epi aktive opsyon ou vle yo (tankou rèlman mesaj tèks).",

    /* Challenge 03 */
    ch03PageTitle: "Defi 03 — Travay kouran",
    ch03Step1Label: "Etap 1 nan 3 — Gade",
    ch03Step1Heading: "Kijan pou jere sante ou nan MyChart",
    ch03Step1VideoPH: "Klip enstriksyon — Mande ranplasman medikaman, pwograme yon vizit swivi, epi voye yon mesaj sekirize",
    ch03Step2Label: "Etap 2 nan 3 — Pratike",
    ch03Step2Heading: "Ede Elena jere swen Clara",
    ch03Step2Intro: "Elena jere sante manman li Clara. Clara bezwen yon ranplasman medikaman pou tansyon li.",
    ch03Step2Intro2: "Ede Elena jwenn tablo Medikaman epi voye yon mesaj bay doktè Clara.",
    ch03Step3Label: "Etap 3 nan 3 — Fè li sou telefòn ou",
    ch03Step3Heading: "Kounye a eseye sou pwòp MyChart ou",
    ch03Step3Intro: "Ouvri MyChart sou telefòn ou epi swiv etap sa yo:",
    ch03Check1: "Tape tablo Medikaman. Jwenn yon medikaman w ap pran epi pratike tape \"Mande Ranplasman.\" Kanpe anvan ou konfime.",
    ch03Check2: "Tape tablo Randevou. Tape \"Pwograme yon Nouvo Randevou.\" Pratike chwazi doktè ou epi yon dat. Anile anvan ou konfime.",
    ch03Check3: "Tape tablo Mesaj. Tape \"Nouvo Mesaj.\" Chwazi Navigatè ou kòm destinatè.",
    ch03Check4: "Tape yon ti mesaj, tankou \"Bonjou, mwen fini Defi 03.\"",
    ch03Check5: "Tape \"Voye.\"",

    /* Challenge 04 */
    ch04PageTitle: "Defi 04 — Aksè ak kont fanmi",
    ch04Step1Label: "Etap 1 nan 3 — Gade",
    ch04Step1Heading: "Kijan pou jere kont fanmi nan MyChart",
    ch04Step1VideoPH: "Klip enstriksyon — Konfigire aksè manda nan Sant Pataj, chanje ant kont konekte, epi revize paramèt notifikasyon",
    ch04Step2Label: "Etap 2 nan 3 — Pratike",
    ch04Step2Heading: "Ede Elena konfigire aksè nan kont Leo",
    ch04Step2Intro: "Elena bezwen konfigire yon aksè manda pou li ka wè enfòmasyon sante pitit pitit gason li Leo epi rezève randevou pou li.",
    ch04Step2Intro2: "Ede li jwenn Sant Pataj epi konfigire aksè souyay li kòm gadyen.",
    ch04Step3Label: "Etap 3 nan 3 — Fè li sou telefòn ou",
    ch04Step3Heading: "Kounye a eseye sou pwòp MyChart ou",
    ch04Step3Intro: "Ouvri MyChart sou telefòn ou epi swiv etap sa yo:",
    ch04Check1: "Tape ikòn Meni.",
    ch04Check2: "Tape \"Sant Pataj.\"",
    ch04Check3: "Pratike jwenn bouton \"Envite Yon Moun.\" Pa voye yon envitasyon reyèl.",
    ch04Check4: "Tape non ou oswa ikòn Kont nan tèt ekran an.",
    ch04Check5: "Pratike chwazi non yon manm fanmi konekte (si ou genyen youn).",
    ch04Check6: "Ale nan \"Paramèt\" epi revize \"Notifikasyon\" ou yo yon fwa ankò.",

    /* Challenge 05 */
    ch05PageTitle: "Defi 05 — Jwenn resous kominotè",
    ch05Step1Label: "Etap 1 nan 3 — Gade",
    ch05Step1Heading: "Kijan pou jwenn resous kominotè ak MassThrive",
    ch05Step1VideoPH: "Klip enstriksyon — Jwenn MassThrive nan MyChart, chanje lang, fè rechèch pa kòd postal, li yon kat pwogram, epi kontakte yon òganizasyon",
    ch05Step2Label: "Etap 2 nan 3 — Pratike",
    ch05Step2Heading: "Ede Victor jwenn yon bank manje",
    ch05Step2Intro: "Victor bezwen jwenn yon bank manje pre kay li avèk MassThrive.",
    ch05Step2Intro2: "Ede li fè rechèch pa kòd postal epi jwenn enfòmasyon kontak sou yon kat pwogram.",
    ch05Step3Label: "Etap 3 nan 3 — Fè li sou telefòn ou",
    ch05Step3Heading: "Kounye a eseye sou pwòp telefòn ou",
    ch05Step3Intro: "Ouvri MyChart sou telefòn ou epi swiv etap sa yo:",
    ch05Check1: "Tape ikòn Meni nan MyChart.",
    ch05Check2: "Tape \"Kominotè\" oswa \"Jwenn Resous\" pou ouvri MassThrive.",
    ch05Check3: "Chèche entèruptè lang sou sit MassThrive epi pratike chanje lang.",
    ch05Check4: "Tape kòd postal ou nan ba rechèch la.",
    ch05Check5: "Chwazi yon kategori (tankou Manje oswa Lojman) nan meni deroulant lan.",
    ch05Check6: "Tape sou yon kat pwogram epi jwenn nimewo telefòn kontak la.",
    ch05Check7: "Otopratik: Rele 2-1-1 sou telefòn ou, epi rakwoche anvan yon moun repon.",
  },

  zh: {
    welcomeHeading: "Welcome / Bienvenido / Bem-vindo / Byenveni / 欢迎",
    langIndicator: "中文",
    footerHome: "🏠 主页",
    footerHelp: "🔍 帮助",
    headerLogoAlt: "BMC 标志",
    homeHeading: "今天您想做什么？",
    card1Label: "一步一步学习 MyChart",
    card2Label: "查找特定任务的帮助",
    card3Label: "打开 MyChart",
    card3Note: "在新标签页中打开",
    card4Label: "打开 MassThrive",
    card4Note: "在新标签页中打开",
    courseHeading: "一步一步学习 MyChart",
    startBtn: "开始",
    ch0Number: "挑战 0",
    ch0Name: "设置您的电子邮件",
    ch0Time: "约 5–8 分钟",
    ch01Number: "挑战 01",
    ch01Name: "设置 MyChart",
    ch01Time: "约 8 分钟",
    ch02Number: "挑战 02",
    ch02Name: "参加视频就诊",
    ch02Time: "约 10 分钟",
    ch03Number: "挑战 03",
    ch03Name: "常用功能",
    ch03Time: "约 10 分钟",
    ch04Number: "挑战 04",
    ch04Name: "管理您的账户",
    ch04Time: "约 8 分钟",
    ch05Number: "挑战 05",
    ch05Name: "查找社区资源",
    ch05Time: "约 8 分钟",
    stepLabelTemplate: "第 {n} 步，共 3 步",
    step1TabLabel: "观看",
    step2TabLabel: "练习",
    step3TabLabel: "操作",
    nextBtn: "下一步 →",
    backStepBtn: "← 返回",
    doneBtn: "完成",
    videoPH: "操作视频片段",
    textPanelPH: "文字说明栏 — 翻译后的步骤显示在此处",
    scenarioPH: "情景练习 — H5P 互动或自定义互动放置于此",
    charSelectorLabel: "选择一个角色：",
    ch02PageTitle: "挑战 02 — 参加视频就诊",
    ch02Step1Label: "第 1 步，共 3 步 — 观看",
    ch02Step1Heading: "如何在手机上参加视频就诊",
    ch02Step1VideoPH: "操作视频 — 通过 MyChart 应用参加视频就诊",
    ch02Step2Label: "第 2 步，共 3 步 — 练习",
    ch02Step2Heading: "帮助 Marcus 参加他的就诊",
    ch02Step2Intro: "Marcus 需要在午休时间用手机参加视频就诊。",
    ch02Step2Intro2: "帮他找到预约并点击\"开始就诊\"。",
    ch02Step3Label: "第 3 步，共 3 步 — 在您的手机上操作",
    ch02Step3Heading: "现在在您自己的 MyChart 上试一试",
    ch02Step3Intro: "在手机上打开 MyChart，按以下步骤操作：",
    ch02Check1: "在您的手机上打开 MyChart 应用程序。",
    ch02Check2: "点击\"预约\"。",
    ch02Check3: "在列表中找到今天的视频就诊预约。",
    ch02Check4: "点击\"开始就诊\"。",
    ch02Check5: "在候诊室等待。您的医生很快就会加入。",
    stubLabel: "第 2 阶段即将推出",
    stubText: "此挑战将在第 2A 阶段内容开发期间完整构建。",
    helpHeading: "查找特定任务的帮助",
    cat1Label: "设置您的电子邮件",
    cat2Label: "设置 MyChart",
    cat3Label: "视频就诊",
    cat4Label: "药物与补充",
    cat5Label: "预约",
    cat6Label: "消息与您的记录",
    cat7Label: "社区资源",
    backToAllTopics: "← 所有主题",
    cat3PageHeading: "视频就诊",
    topicTime: "2 分钟",
    vt1: "在手机上参加视频就诊",
    vt2: "在电脑上参加视频就诊",
    vt3: "设置摄像头和麦克风",
    vt4: "故障排除：摄像头无法使用",
    vt5: "故障排除：连接中断",
    vt6: "故障排除：进入了错误的候诊室",
    vt7: "使用 Pexip 应用参加（适用于旧款手机）",
    vt8: "预约视频就诊",
    topicPageHeading: "如何在手机上参加视频就诊",
    topicBackLink: "← 视频就诊",
    topicVideoPH: "操作视频 — 在手机上参加视频就诊",
    stepsHeading: "步骤",
    step1Text: "在您的手机上打开 MyChart 应用程序。",
    step2Text: "点击\"预约\"。",
    step3Text: "在列表中找到您的视频就诊预约。",
    step4Text: "点击\"开始就诊\"。",
    step5Text: "如果系统询问，请允许应用程序使用您的摄像头和麦克风。",
    step6Text: "在候诊室等待。您的医生很快就会加入。",
    moreHelpHeading: "需要更多帮助？",
    textUsLabel: "📱 发短信给我们获取帮助",
    backToCourseLabel: "📘 返回课程",

    /* Character names */
    char1: "Elena",
    char2: "Marcus",
    char3: "Rosa",
    char4: "Victor",

    /* Challenge 0 */
    ch0PageTitle: "挑战 0 — 设置您的电子邮件",
    ch0Step1Label: "第 1 步，共 3 步 — 观看",
    ch0Step1Heading: "如何设置您的 Gmail 账户",
    ch0Step1VideoPH: "操作视频 — 创建 Gmail 账户、设置密码并完成手机验证",
    ch0Step2Label: "第 2 步，共 3 步 — 练习",
    ch0Step2Heading: "练习设置电子邮件账户",
    ch0Step2Intro: "Rosa 需要创建一个 Gmail 账户才能注册 MyChart。",
    ch0Step2Intro2: "帮助她选择电子邮件地址、创建密码并验证手机号码。",
    ch0Step3Label: "第 3 步，共 3 步 — 在您的手机上操作",
    ch0Step3Heading: "现在设置您自己的电子邮件账户",
    ch0Step3Intro: "在手机上打开网络浏览器，按以下步骤操作：",
    ch0Check1: "打开网络浏览器。访问 Gmail 网站。点击"创建账户"。输入您的名字和姓氏。选择新的电子邮件地址。点击"下一步"。",
    ch0Check2: "输入您选择的密码。再次输入密码以确认。点击"下一步"。",
    ch0Check3: "输入您的手机号码。点击"下一步"。输入收到的短信验证码。点击"验证"。",
    ch0Check4: "将您的电子邮件地址写在卡片上。将您的密码写在卡片上。",

    /* Challenge 01 */
    ch01PageTitle: "挑战 01 — 设置 MyChart",
    ch01Step1Label: "第 1 步，共 3 步 — 观看",
    ch01Step1Heading: "如何设置您的 MyChart 账户",
    ch01Step1VideoPH: "操作视频 — 下载 MyChart、注册、创建用户名和密码、设置双重验证、登录并设置语言",
    ch01Step2Label: "第 2 步，共 3 步 — 练习",
    ch01Step2Heading: "帮助 Rosa 设置语言设置",
    ch01Step2Intro: "Rosa 刚刚注册了 MyChart。她想确保应用程序使用她偏好的语言。",
    ch01Step2Intro2: "帮助她找到设置菜单并更改语言和通知偏好。",
    ch01Step3Label: "第 3 步，共 3 步 — 在您的手机上操作",
    ch01Step3Heading: "现在在您自己的 MyChart 上试一试",
    ch01Step3Intro: "在手机上打开 MyChart，按以下步骤操作：",
    ch01Check1: "下载 MyChart 应用程序或访问 BMC MyChart 网站。",
    ch01Check2: "按照提示使用您的信息或激活码进行注册。",
    ch01Check3: "创建您的 MyChart 用户名和密码。",
    ch01Check4: "使用您的手机号码设置双重身份验证 (2FA)。",
    ch01Check5: "登录您的新 MyChart 账户。",
    ch01Check6: "点击菜单图标，然后转到"设置"。",
    ch01Check7: "点击"语言"并选择您偏好的语言。",
    ch01Check8: "点击"通知"并开启您想要的选项（例如短信提醒）。",

    /* Challenge 03 */
    ch03PageTitle: "挑战 03 — 常用功能",
    ch03Step1Label: "第 1 步，共 3 步 — 观看",
    ch03Step1Heading: "如何在 MyChart 中管理您的健康",
    ch03Step1VideoPH: "操作视频 — 申请药物补充、预约复诊并发送安全消息",
    ch03Step2Label: "第 2 步，共 3 步 — 练习",
    ch03Step2Heading: "帮助 Elena 管理 Clara 的护理",
    ch03Step2Intro: "Elena 负责管理她母亲 Clara 的健康。Clara 需要补充血压药。",
    ch03Step2Intro2: "帮助 Elena 找到药物板块并向 Clara 的医生发送消息。",
    ch03Step3Label: "第 3 步，共 3 步 — 在您的手机上操作",
    ch03Step3Heading: "现在在您自己的 MyChart 上试一试",
    ch03Step3Intro: "在手机上打开 MyChart，按以下步骤操作：",
    ch03Check1: "点击药物板块。找到您正在服用的药物，练习点击"申请补充"。确认前停止。",
    ch03Check2: "点击预约板块。点击"预约新门诊"。练习选择您的医生和日期。确认前取消。",
    ch03Check3: "点击消息板块。点击"新消息"。选择您的导航员作为收件人。",
    ch03Check4: "输入一条简短消息，例如"您好，我完成了挑战 03。"",
    ch03Check5: "点击"发送"。",

    /* Challenge 04 */
    ch04PageTitle: "挑战 04 — 家庭账户访问",
    ch04Step1Label: "第 1 步，共 3 步 — 观看",
    ch04Step1Heading: "如何在 MyChart 中管理家庭账户",
    ch04Step1VideoPH: "操作视频 — 在共享中心设置代理访问、切换关联账户并查看通知设置",
    ch04Step2Label: "第 2 步，共 3 步 — 练习",
    ch04Step2Heading: "帮助 Elena 设置对 Leo 账户的访问权限",
    ch04Step2Intro: "Elena 需要设置代理访问权限，以便她可以查看孙子 Leo 的健康信息并预约他的门诊。",
    ch04Step2Intro2: "帮助她找到共享中心并设置她的护理人员访问权限。",
    ch04Step3Label: "第 3 步，共 3 步 — 在您的手机上操作",
    ch04Step3Heading: "现在在您自己的 MyChart 上试一试",
    ch04Step3Intro: "在手机上打开 MyChart，按以下步骤操作：",
    ch04Check1: "点击菜单图标。",
    ch04Check2: "点击"共享中心"。",
    ch04Check3: "练习找到"邀请他人"按钮。不要发送真实邀请。",
    ch04Check4: "点击屏幕顶部的您的姓名或账户图标。",
    ch04Check5: "练习选择已关联家庭成员的姓名（如果有的话）。",
    ch04Check6: "进入"设置"并再次查看您的"通知"设置。",

    /* Challenge 05 */
    ch05PageTitle: "挑战 05 — 查找社区资源",
    ch05Step1Label: "第 1 步，共 3 步 — 观看",
    ch05Step1Heading: "如何通过 MassThrive 查找社区资源",
    ch05Step1VideoPH: "操作视频 — 在 MyChart 中找到 MassThrive、更改语言、按邮政编码搜索、阅读项目卡片并联系组织",
    ch05Step2Label: "第 2 步，共 3 步 — 练习",
    ch05Step2Heading: "帮助 Victor 找到食物银行",
    ch05Step2Intro: "Victor 需要使用 MassThrive 找到离家近的食物银行。",
    ch05Step2Intro2: "帮助他按邮政编码搜索，并在项目卡片上找到联系信息。",
    ch05Step3Label: "第 3 步，共 3 步 — 在您的手机上操作",
    ch05Step3Heading: "现在在您自己的手机上试一试",
    ch05Step3Intro: "在手机上打开 MyChart，按以下步骤操作：",
    ch05Check1: "点击 MyChart 中的菜单图标。",
    ch05Check2: "点击"社区"或"查找资源"以打开 MassThrive。",
    ch05Check3: "在 MassThrive 网站上查找语言切换按钮，练习更改语言。",
    ch05Check4: "在搜索栏中输入您的邮政编码。",
    ch05Check5: "从下拉菜单中选择一个类别（如食物或住房）。",
    ch05Check6: "点击一张项目卡片，找到联系电话号码。",
    ch05Check7: "自我练习：拨打手机上的 2-1-1，然后在有人接听之前挂断。",
  }

}; /* end strings */

/* ============================================================
   CMS CONTENT OVERRIDES
   Loads /content/challenges.json (edited via Decap CMS) and
   merges any updated strings into the active language's strings
   object. Falls back silently if the file is unavailable.
   ============================================================ */
(function applyCmsOverrides() {
  try {
    var lang = (new URLSearchParams(window.location.search).get('lang') || 'en');

    /* Only fetch on challenge pages — each challenge has its own content file.
       Which file to fetch is determined by data-challenge-id on the <main> element.
       Non-challenge pages (home, course index, help) use JS fallback strings only. */
    var mainEl = document.getElementById('main');
    var challengeId = mainEl ? mainEl.getAttribute('data-challenge-id') : null;
    if (!challengeId) return;

    /* Map data-challenge-id values to their content file paths */
    var fileMap = {
      'ch0':  '/content/challenge-0.json',
      'ch01': '/content/challenge-01.json',
      'ch02': '/content/challenge-02.json',
      'ch03': '/content/challenge-03.json',
      'ch04': '/content/challenge-04.json',
      'ch05': '/content/challenge-05.json'
    };
    var challengeFile = fileMap[challengeId];
    if (!challengeFile) return;

    /* Synchronous XHR so strings are ready before applyStrings() runs */
    var xhr = new XMLHttpRequest();
    xhr.open('GET', challengeFile, false);
    xhr.send();
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      /* Merge English base layer first, then the requested language on top */
      if (data['en']) Object.assign(strings['en'], data['en']);
      if (lang !== 'en' && data[lang]) Object.assign(strings[lang], data[lang]);
    }
  } catch (e) { /* local file:// dev — no-op */ }
})();

/* ============================================================
   TOPIC CATALOG — knowledge base content for all 7 categories
   Each topic has a slug (used in ?topic= URL param), a title,
   and an array of step strings rendered by initTopic().
   ============================================================ */
var topicCatalog = {

  'email': {
    titleKey: 'cat1Label',
    topics: [
      {
        slug: 'gmail-create-account',
        title: 'Create a Gmail account',
        steps: [
          'Open a web browser on your phone.',
          'Go to the Gmail website.',
          'Tap "Create account."',
          'Enter your first name. Enter your last name.',
          'Choose a new email address.',
          'Tap "Next."'
        ]
      },
      {
        slug: 'gmail-password',
        title: 'Create and confirm your password',
        steps: [
          'Type your chosen password.',
          'Type your password again to confirm.',
          'Tap "Next."'
        ]
      },
      {
        slug: 'gmail-phone-verify',
        title: 'Complete phone verification',
        steps: [
          'Enter your phone number.',
          'Tap "Next."',
          'Type the code you received in a text message.',
          'Tap "Verify."'
        ]
      },
      {
        slug: 'gmail-record-info',
        title: 'Write down your email and password',
        steps: [
          'Write your email address on your card.',
          'Write your password on your card.',
          'Keep your card in a safe place.'
        ]
      }
    ]
  },

  'mychart-setup': {
    titleKey: 'cat2Label',
    topics: [
      {
        slug: 'mychart-download',
        title: 'Download the MyChart app',
        steps: [
          'Open the App Store (iPhone) or Play Store (Android).',
          'Search for "MyChart."',
          'Tap "Get" or "Install."',
          'Wait for the app to finish downloading.',
          'Tap "Open" to launch MyChart.'
        ]
      },
      {
        slug: 'mychart-register',
        title: 'Register with your personal information',
        steps: [
          'Open the MyChart app or go to the BMC MyChart website.',
          'Tap "Sign Up" or "Create Account."',
          'Enter your full name.',
          'Enter your birth date.',
          'Enter your email address.',
          'Tap "Next."'
        ]
      },
      {
        slug: 'mychart-activation-code',
        title: 'Enter your activation code',
        steps: [
          'Find your activation code in the email or letter from BMC.',
          'Type the code into the box.',
          'Tap "Submit."'
        ]
      },
      {
        slug: 'mychart-username-password',
        title: 'Create your username and password',
        steps: [
          'Type your chosen username.',
          'Type your chosen password.',
          'Type your password again to confirm.',
          'Tap "Submit."'
        ]
      },
      {
        slug: 'mychart-2fa',
        title: 'Set up two-factor authentication (2FA)',
        steps: [
          'Enter your phone number.',
          'Tap "Send Code."',
          'Type the code you received in a text message.',
          'Tap "Verify."'
        ]
      },
      {
        slug: 'mychart-login',
        title: 'Log in to MyChart',
        steps: [
          'Open the MyChart app.',
          'Enter your username.',
          'Enter your password.',
          'Tap the "Sign In" button.'
        ]
      },
      {
        slug: 'mychart-language',
        title: 'Set your language preference',
        steps: [
          'Tap the Menu icon.',
          'Tap "Settings."',
          'Tap "Language."',
          'Select your preferred language.'
        ]
      },
      {
        slug: 'mychart-notifications',
        title: 'Set your notification preferences',
        steps: [
          'Tap the Menu icon.',
          'Tap "Settings."',
          'Tap "Notifications."',
          'Turn on or off the notification options.'
        ]
      },
      {
        slug: 'mychart-proxy',
        title: 'Set up access for a family member',
        steps: [
          'Tap the Menu icon.',
          'Tap "Sharing Hub."',
          'Tap "Invite Someone."',
          'Enter the caregiver\'s email address.',
          'Tap "Confirm" to send the invitation.'
        ]
      },
      {
        slug: 'mychart-switch-accounts',
        title: 'Switch between linked accounts',
        steps: [
          'Tap your name or the Account icon at the top of the screen.',
          'Select the linked family member\'s name.'
        ]
      }
    ]
  },

  'video-visits': {
    titleKey: 'cat3Label',
    topics: [
      {
        slug: 'join-video-phone',
        title: 'Join a video visit on your phone',
        steps: [
          'Open the MyChart app on your phone.',
          'Tap Appointments.',
          'Find your video visit in the list.',
          'Tap Begin Visit.',
          'Allow the app to use your camera and microphone if asked.',
          'Wait in the waiting room. Your provider will join you soon.'
        ]
      },
      {
        slug: 'join-video-computer',
        title: 'Join a video visit on a computer',
        steps: [
          'Open a recommended web browser (Chrome for Windows or Android; Safari for iPhone or iPad).',
          'Navigate to the MyChart website.',
          'Find your visit under "Appointments."',
          'Click "Begin Visit."'
        ]
      },
      {
        slug: 'camera-mic-setup',
        title: 'Set up your camera and microphone',
        steps: [
          'When MyChart asks to use your camera, tap "Allow."',
          'When MyChart asks to use your microphone, tap "Allow."',
          'If you do not see the prompt, go to your phone\'s Settings.',
          'Find MyChart in your list of apps.',
          'Tap "Permissions" and make sure Camera and Microphone are turned on.'
        ]
      },
      {
        slug: 'troubleshoot-camera',
        title: 'Troubleshoot: camera not working',
        steps: [
          'Close the MyChart app.',
          'Go to your phone\'s Settings.',
          'Find MyChart in your list of apps.',
          'Tap "Permissions."',
          'Make sure the Camera toggle is turned On.',
          'Re-open MyChart and try again.'
        ]
      },
      {
        slug: 'troubleshoot-connection',
        title: 'Troubleshoot: dropped connection',
        steps: [
          'Close the MyChart app.',
          'Check your Wi-Fi or cellular connection.',
          'Re-open MyChart.',
          'Go to the "Appointments" tile.',
          'Find your visit and tap to re-enter the waiting room.'
        ]
      },
      {
        slug: 'troubleshoot-waiting-room',
        title: 'Troubleshoot: wrong waiting room',
        steps: [
          'Check the name and time of your appointment.',
          'Go to the "Appointments" tile.',
          'Find the correct appointment.',
          'Tap "Begin Visit."'
        ]
      },
      {
        slug: 'pexip-app',
        title: 'Join using the Pexip app (older phones)',
        steps: [
          'Open the App Store or Play Store.',
          'Search for "Pexip" and install the app.',
          'Go to the "Appointments" tile in MyChart.',
          'Find your visit and tap the link to open Pexip.',
          'Tap "Join" to enter your visit.'
        ]
      },
      {
        slug: 'schedule-video-visit',
        title: 'Schedule a video visit',
        steps: [
          'Tap "Appointments."',
          'Tap "Schedule a New Appointment."',
          'Select a provider.',
          'Select "Video Visit" as the type.',
          'Choose a date and time.',
          'Tap "Confirm."'
        ]
      }
    ]
  },

  'medications': {
    titleKey: 'cat4Label',
    topics: [
      {
        slug: 'request-refill',
        title: 'Request a medication refill',
        steps: [
          'Tap the "Medications" tile.',
          'Select the medication you need.',
          'Tap "Request Refill."',
          'Tap "Confirm."'
        ]
      }
    ]
  },

  'appointments': {
    titleKey: 'cat5Label',
    topics: [
      {
        slug: 'schedule-telehealth',
        title: 'Schedule a telehealth appointment',
        steps: [
          'Tap "Appointments."',
          'Tap "Schedule a New Appointment."',
          'Select a provider.',
          'Select "Video Visit" as the type.',
          'Choose a date and time.',
          'Tap "Confirm."'
        ]
      },
      {
        slug: 'schedule-follow-up',
        title: 'Schedule a follow-up appointment',
        steps: [
          'Tap "Appointments."',
          'Tap "Schedule a New Appointment."',
          'Select your provider.',
          'Select the reason for the visit.',
          'Choose a date and time.',
          'Tap "Confirm."'
        ]
      },
      {
        slug: 'schedule-new-provider',
        title: 'Schedule with a new provider',
        steps: [
          'Tap "Appointments."',
          'Tap "Schedule a New Appointment."',
          'Search for a provider by name or specialty.',
          'Select the new provider.',
          'Continue the scheduling steps.'
        ]
      },
      {
        slug: 'choose-appointment-type',
        title: 'Choose your appointment type',
        steps: [
          'During the scheduling process, look for the appointment type screen.',
          'Select "Video" for a video visit.',
          'Select "Phone" for a phone call.',
          'Select "In-Person" for an office visit.',
          'Tap "Next" to continue.'
        ]
      }
    ]
  },

  'messages': {
    titleKey: 'cat6Label',
    topics: [
      {
        slug: 'send-secure-message',
        title: 'Send a secure message',
        steps: [
          'Tap the "Messages" tile.',
          'Tap "New Message."',
          'Select your care team member.',
          'Type your message in the box.',
          'Tap "Send."'
        ]
      },
      {
        slug: 'view-visit-summary',
        title: 'View a past visit summary',
        steps: [
          'Tap the "Visits" tile.',
          'Select the date of the past visit.',
          'Scroll down to see the summary or notes.'
        ]
      },
      {
        slug: 'view-after-visit-summary',
        title: 'Download your After Visit Summary',
        steps: [
          'Tap the "Visits" tile.',
          'Select the date of the past visit.',
          'Scroll to the "After Visit Summary" section.',
          'Tap to open or download the file.'
        ]
      },
      {
        slug: 'view-test-results',
        title: 'View your test results',
        steps: [
          'Tap the "Test Results" tile.',
          'Select the name of the test result you want to see.',
          'Read the detail screen.'
        ]
      },
      {
        slug: 'check-billing',
        title: 'Check your billing balance',
        steps: [
          'Tap the "Billing" tile.',
          'Read the balance shown on the screen.'
        ]
      },
      {
        slug: 'pay-bill',
        title: 'Pay a bill online',
        steps: [
          'Tap the "Billing" tile.',
          'Tap "Pay Now."',
          'Enter your payment method information.',
          'Tap "Confirm Payment."'
        ]
      }
    ]
  },

  'community': {
    titleKey: 'cat7Label',
    topics: [
      {
        slug: 'find-massthrive',
        title: 'Find MassThrive through MyChart',
        steps: [
          'Tap the Menu icon.',
          'Tap "Community" or "Find Resources."',
          'Tap the MassThrive link.'
        ]
      },
      {
        slug: 'massthrive-language',
        title: 'Change language on MassThrive',
        steps: [
          'Look for the language toggle in the header of the MassThrive website.',
          'Tap the toggle.',
          'Select your preferred language.'
        ]
      },
      {
        slug: 'massthrive-search',
        title: 'Search for resources by ZIP code',
        steps: [
          'Type your ZIP code into the search bar.',
          'Select a category from the dropdown menu (for example, Food or Housing).',
          'Tap "Search" or press Enter to see results.'
        ]
      },
      {
        slug: 'massthrive-program-card',
        title: 'Read a program card',
        steps: [
          'Tap on the program card.',
          'Scroll down to the "Contact" section.',
          'Read the organization\'s name, address, and phone number.'
        ]
      },
      {
        slug: 'massthrive-contact',
        title: 'Contact an organization',
        steps: [
          'Find the program card for the organization you want to contact.',
          'Tap the phone number on the card.',
          'Your phone will open the dialer automatically.',
          'Tap "Call" to connect.'
        ]
      },
      {
        slug: 'massthrive-share',
        title: 'Share a program card',
        steps: [
          'Tap on the program card.',
          'Tap the "Share" icon.',
          'Choose how you want to share the card (email, text message, etc.).'
        ]
      },
      {
        slug: 'call-211',
        title: 'Use 2-1-1 for more resources',
        steps: [
          'Dial 2-1-1 on your phone.',
          'Wait for a person to answer.',
          'Ask for help finding resources in your area.'
        ]
      }
    ]
  }

}; /* end topicCatalog */

/* ============================================================
   CHALLENGE TOPIC REFS — maps each challenge to the topic atoms
   that appear in its Step 1 how-to section. Each entry is an
   array of {cat, slug} objects referencing topicCatalog above.
   The CMS can override this via content/topics.json.
   ============================================================ */
var challengeTopicRefs = {
  'ch0':  [
    {cat: 'email', slug: 'gmail-create-account'},
    {cat: 'email', slug: 'gmail-password'},
    {cat: 'email', slug: 'gmail-phone-verify'},
    {cat: 'email', slug: 'gmail-record-info'}
  ],
  'ch01': [
    {cat: 'mychart-setup', slug: 'mychart-download'},
    {cat: 'mychart-setup', slug: 'mychart-register'},
    {cat: 'mychart-setup', slug: 'mychart-activation-code'},
    {cat: 'mychart-setup', slug: 'mychart-username-password'},
    {cat: 'mychart-setup', slug: 'mychart-2fa'},
    {cat: 'mychart-setup', slug: 'mychart-login'},
    {cat: 'mychart-setup', slug: 'mychart-language'}
  ],
  'ch02': [
    {cat: 'video-visits', slug: 'join-video-phone'},
    {cat: 'video-visits', slug: 'camera-mic-setup'}
  ],
  'ch03': [
    {cat: 'medications',  slug: 'request-refill'},
    {cat: 'appointments', slug: 'schedule-telehealth'},
    {cat: 'messages',     slug: 'send-secure-message'},
    {cat: 'messages',     slug: 'view-test-results'}
  ],
  'ch04': [
    {cat: 'mychart-setup', slug: 'mychart-proxy'},
    {cat: 'mychart-setup', slug: 'mychart-switch-accounts'},
    {cat: 'mychart-setup', slug: 'mychart-notifications'}
  ],
  'ch05': [
    {cat: 'community', slug: 'find-massthrive'},
    {cat: 'community', slug: 'massthrive-language'},
    {cat: 'community', slug: 'massthrive-search'},
    {cat: 'community', slug: 'massthrive-program-card'},
    {cat: 'community', slug: 'massthrive-contact'}
  ]
};

/* ============================================================
   CMS TOPICS OVERRIDE
   Fetches content/topics.json (edited via Decap CMS) and merges
   it over the JS fallback topicCatalog and challengeTopicRefs.
   Runs synchronously so data is ready before initChallengeTopic().
   Falls back silently when running from the local file system.
   ============================================================ */
(function applyCmsTopicsOverrides() {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/content/topics.json', false); /* synchronous */
    xhr.send();
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      /* Replace individual catalog categories with CMS versions */
      if (data.catalog) {
        Object.keys(data.catalog).forEach(function(cat) {
          topicCatalog[cat] = data.catalog[cat];
        });
      }
      /* Replace challenge topic ref lists with CMS versions */
      if (data.challengeTopicRefs) {
        Object.keys(data.challengeTopicRefs).forEach(function(ch) {
          challengeTopicRefs[ch] = data.challengeTopicRefs[ch];
        });
      }
    }
  } catch (e) { /* local file:// dev — no-op */ }
})();

/* ============================================================
   LANGUAGE HELPERS
   ============================================================ */

/**
 * Gets the current language from the URL ?lang= parameter.
 * Falls back to 'en' if the param is missing or unrecognized.
 */
function getLang() {
  const param = new URLSearchParams(window.location.search).get('lang');
  return (param && strings[param]) ? param : 'en';
}

/**
 * Returns the translated string for a given key.
 * Falls back to English if the key is missing in the selected language.
 */
function t(key) {
  const lang = getLang();
  if (strings[lang] && strings[lang][key] !== undefined) {
    return strings[lang][key];
  }
  return strings['en'][key] || key;
}

/**
 * Builds a URL that preserves the current ?lang= parameter.
 * Example: withLang('../home.html') → '../home.html?lang=es'
 */
function withLang(url) {
  const lang = getLang();
  if (lang === 'en') return url; /* en is default, no param needed */
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}lang=${lang}`;
}

/**
 * Replaces the {n} placeholder in step label strings.
 * Example: formatStepLabel(2) → "Step 2 of 3" (or equivalent in current language)
 */
function formatStepLabel(n) {
  return t('stepLabelTemplate').replace('{n}', String(n));
}

/* ============================================================
   APPLY STRINGS TO PAGE
   ============================================================ */

/**
 * Reads all [data-string-key] elements and sets their text content
 * to the translated string for the current language.
 * Also sets the html[lang] attribute for accessibility.
 */
function applyStrings() {
  /* Set document language attribute */
  const lang = getLang();
  document.documentElement.lang = lang;

  /* Apply string keys */
  document.querySelectorAll('[data-string-key]').forEach(function(el) {
    var key = el.getAttribute('data-string-key');
    var val = t(key);
    el.textContent = val;
  });

  /* Update links that should include the lang parameter */
  document.querySelectorAll('[data-lang-href]').forEach(function(el) {
    var base = el.getAttribute('data-lang-href');
    el.href = withLang(base);
  });
}

/* ============================================================
   LANGUAGE SELECTOR PAGE (index.html)
   ============================================================ */

/**
 * Attaches click handlers to all .lang-option buttons.
 * Clicking a language button navigates to home.html?lang=xx.
 */
function initLangSelector() {
  document.querySelectorAll('.lang-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lang = btn.getAttribute('data-lang');
      window.location.href = 'home.html?lang=' + lang;
    });
  });
}

/* ============================================================
   STEP NAVIGATION (challenge pages)
   ============================================================ */

/**
 * Manages the 3-step panel structure on challenge pages.
 * Reads .challenge-step elements (one per step) and shows/hides them.
 * Updates the step indicator dots to reflect the current step.
 */
function initSteps() {
  var steps = document.querySelectorAll('.challenge-step');
  if (!steps.length) return; /* Not a challenge page */

  var currentStep = 1;
  var totalSteps = steps.length;

  /**
   * Shows the step panel for step number n (1-indexed).
   * Hides all other panels.
   */
  function showStep(n) {
    steps.forEach(function(panel, i) {
      panel.hidden = (i + 1 !== n);
    });

    /* Update step indicator dots */
    document.querySelectorAll('.step-dot').forEach(function(dot, i) {
      dot.classList.remove('active', 'done');
      if (i + 1 === n) dot.classList.add('active');
      if (i + 1 < n)  dot.classList.add('done');
    });

    currentStep = n;
    window.scrollTo(0, 0);
  }

  /* Next buttons — advance to the next step */
  document.querySelectorAll('.btn-next').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (currentStep < totalSteps) {
        showStep(currentStep + 1);
      }
    });
  });

  /* Back-within-step buttons — go to previous step or course home */
  document.querySelectorAll('.btn-back-step').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      } else {
        window.location.href = withLang('../course/index.html');
      }
    });
  });

  /* Done button — return to course home */
  var doneBtn = document.querySelector('.btn-done');
  if (doneBtn) {
    doneBtn.addEventListener('click', function() {
      window.location.href = withLang('../course/index.html');
    });
  }

  showStep(1);
}

/* ============================================================
   CHECKLIST (Step 3 of challenge pages)
   ============================================================ */

/**
 * Makes checklist items toggleable via checkbox or by clicking the row.
 * State is not saved — resets on page reload (per brief: no localStorage).
 */
function initChecklist() {
  document.querySelectorAll('.checklist-item').forEach(function(item) {
    var checkbox = item.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    /* Toggle checked class when checkbox changes */
    checkbox.addEventListener('change', function() {
      item.classList.toggle('checked', checkbox.checked);
    });

    /* Tapping anywhere on the row also toggles the checkbox */
    item.addEventListener('click', function(e) {
      if (e.target === checkbox) return; /* already handled */
      checkbox.checked = !checkbox.checked;
      item.classList.toggle('checked', checkbox.checked);
    });
  });
}

/* ============================================================
   CHARACTER SELECTOR (Step 2 of challenge pages)
   ============================================================ */

/**
 * Highlights the selected character button.
 * Visual only in the prototype — no routing or content change.
 */
function initCharSelector() {
  var buttons = document.querySelectorAll('.char-btn');
  if (!buttons.length) return;

  /* Default: select Marcus (index 1) since that's the featured character */
  if (buttons[1]) buttons[1].classList.add('selected');

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      buttons.forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
    });
  });
}

/* ============================================================
   CHALLENGE TOPIC EMBED (course/challenge-*.html — Step 1)
   ============================================================ */

/**
 * Reads the data-challenge-id attribute from <main> to find which
 * challenge this page is, then looks up its topic refs and injects
 * each how-to atom (video placeholder + numbered steps) into the
 * #topic-embed container in Step 1.
 *
 * This is what makes challenge pages pull from the shared content pool
 * instead of duplicating content from the Knowledge Base.
 */
function initChallengeTopic() {
  var embed = document.getElementById('topic-embed');
  if (!embed) return; /* Not a challenge page, or embed slot missing */

  /* Read which challenge this page is from the <main> element */
  var main = document.getElementById('main');
  var challengeId = main ? main.getAttribute('data-challenge-id') : null;
  if (!challengeId) return;

  var refs = challengeTopicRefs[challengeId];
  if (!refs || !refs.length) return;

  embed.innerHTML = ''; /* Clear any placeholder content */

  refs.forEach(function(ref) {
    /* Look up the category and find the matching topic by slug */
    var catData = topicCatalog[ref.cat];
    if (!catData) return;

    var topicItem = null;
    for (var i = 0; i < catData.topics.length; i++) {
      if (catData.topics[i].slug === ref.slug) {
        topicItem = catData.topics[i];
        break;
      }
    }
    if (!topicItem) return;

    /* Build the topic atom: title + per-step video placeholders + step list */
    var atom = document.createElement('div');
    atom.className = 'topic-atom';

    /* Step-by-step text panel */
    var stepsDiv = document.createElement('div');
    stepsDiv.className = 'topic-steps-panel';
    stepsDiv.setAttribute('aria-label', topicItem.title + ' \u2014 step-by-step instructions');

    var groupTitle = document.createElement('p');
    groupTitle.className = 'task-group-title';
    groupTitle.textContent = topicItem.title;

    var ol = document.createElement('ol');
    ol.className = 'task-steps-inline';
    topicItem.steps.forEach(function(step, idx) {
      /* Normalise across three historical step formats:
         1. plain string         — original JS fallback
         2. {text, video}        — first CMS schema
         3. {text, mediaType, mediaUrl} — current schema          */
      var stepText  = (typeof step === 'string') ? step : (step.text || '');
      var mediaType = (typeof step === 'string') ? ''
                    : (step.mediaType || (step.video ? 'video' : ''));
      var mediaUrl  = (typeof step === 'string') ? ''
                    : (step.mediaUrl  || step.video || '');

      var li = document.createElement('li');
      li.className = 'topic-step-item';

      /* Per-step media — rendered only when both type and URL are present */
      if (mediaType && mediaUrl) {
        if (mediaType === 'video') {
          var vDiv = document.createElement('div');
          vDiv.className = 'video-placeholder video-placeholder--step';
          vDiv.setAttribute('role', 'img');
          vDiv.setAttribute('aria-label', 'Video for step ' + (idx + 1) + ' \u2014 ' + topicItem.title);
          vDiv.innerHTML =
            '<span class="video-placeholder-icon" aria-hidden="true">\u25B6</span>' +
            '<span class="video-placeholder-label">Step ' + (idx + 1) + ' \u2014 video</span>';
          li.appendChild(vDiv);
        } else if (mediaType === 'image') {
          var img = document.createElement('img');
          img.className = 'step-image';
          img.src = mediaUrl;
          img.alt = 'Image for step ' + (idx + 1) + ' \u2014 ' + topicItem.title;
          img.loading = 'lazy';
          li.appendChild(img);
        }
      }

      var textSpan = document.createElement('span');
      textSpan.className = 'step-text';
      textSpan.textContent = stepText;
      li.appendChild(textSpan);

      ol.appendChild(li);
    });

    stepsDiv.appendChild(groupTitle);
    stepsDiv.appendChild(ol);
    atom.appendChild(stepsDiv);
    embed.appendChild(atom);
  });
}

/* ============================================================
   CATEGORY PAGE (help/category.html)
   ============================================================ */

/**
 * Reads the ?cat= URL parameter and dynamically renders the topic list
 * for that category using topicCatalog data.
 */
function initCategory() {
  var topicList = document.getElementById('topic-list');
  if (!topicList) return; /* Not the category page */

  var cat = new URLSearchParams(window.location.search).get('cat') || 'video-visits';
  var heading = document.getElementById('category-heading');
  var headerTitle = document.getElementById('category-title');
  var stubNotice = document.getElementById('stub-topic-notice');

  var catData = topicCatalog[cat] || topicCatalog['video-visits'];
  var headingText = t(catData.titleKey);

  if (heading)     heading.textContent = headingText;
  if (headerTitle) headerTitle.textContent = headingText;
  if (stubNotice)  stubNotice.hidden = true;

  /* Clear static HTML and render topics dynamically from topicCatalog */
  topicList.innerHTML = '';
  topicList.hidden = false;

  catData.topics.forEach(function(topic) {
    var a = document.createElement('a');
    a.className = 'topic-item';
    a.href = withLang('topic.html?cat=' + cat + '&topic=' + topic.slug);
    a.setAttribute('aria-label', topic.title + ' — 2 min');
    a.innerHTML =
      '<span class="topic-item-title">' + topic.title + '</span>' +
      '<span class="topic-item-time">2 min</span>' +
      '<span class="topic-item-chevron" aria-hidden="true">\u203a</span>';
    topicList.appendChild(a);
  });
}

/* ============================================================
   TOPIC PAGE (help/topic.html)
   ============================================================ */

/**
 * Reads the ?cat= and ?topic= URL parameters and renders the topic page.
 * Updates the heading, back links, steps list, and course link.
 */
function initTopic() {
  var stepsList = document.getElementById('steps-list');
  if (!stepsList) return; /* Not the topic page */

  var params = new URLSearchParams(window.location.search);
  var cat = params.get('cat') || 'video-visits';
  var topicSlug = params.get('topic') || 'join-video-phone';

  var catData = topicCatalog[cat] || topicCatalog['video-visits'];

  /* Find the matching topic */
  var topicItem = catData.topics[0];
  for (var i = 0; i < catData.topics.length; i++) {
    if (catData.topics[i].slug === topicSlug) { topicItem = catData.topics[i]; break; }
  }

  /* Update page heading and document title */
  var heading = document.getElementById('topic-heading');
  if (heading) heading.textContent = topicItem.title;
  document.title = topicItem.title + ' — BMC Digital Health';

  /* Update all back links to point to the correct category */
  var catHref = 'category.html?cat=' + cat;
  document.querySelectorAll('[data-back-cat]').forEach(function(link) {
    link.href = withLang(catHref);
    link.setAttribute('data-lang-href', catHref);
    var label = link.querySelector('[data-back-cat-label]');
    if (label) label.textContent = t(catData.titleKey);
  });

  /* Render steps — normalises across all three historical step formats
     (plain string / {text,video} / {text,mediaType,mediaUrl}).        */
  stepsList.innerHTML = '';
  topicItem.steps.forEach(function(step, idx) {
    var stepText  = (typeof step === 'string') ? step : (step.text || '');
    var mediaType = (typeof step === 'string') ? ''
                  : (step.mediaType || (step.video ? 'video' : ''));
    var mediaUrl  = (typeof step === 'string') ? ''
                  : (step.mediaUrl  || step.video || '');

    var li = document.createElement('li');
    li.className = 'topic-step-item';

    /* Per-step media — rendered only when both type and URL are present */
    if (mediaType && mediaUrl) {
      if (mediaType === 'video') {
        var vDiv = document.createElement('div');
        vDiv.className = 'video-placeholder video-placeholder--step';
        vDiv.setAttribute('role', 'img');
        vDiv.setAttribute('aria-label', 'Video for step ' + (idx + 1));
        vDiv.innerHTML =
          '<span class="video-placeholder-icon" aria-hidden="true">\u25B6</span>' +
          '<span class="video-placeholder-label">Step ' + (idx + 1) + ' \u2014 video</span>';
        li.appendChild(vDiv);
      } else if (mediaType === 'image') {
        var img = document.createElement('img');
        img.className = 'step-image';
        img.src = mediaUrl;
        img.alt = 'Image for step ' + (idx + 1);
        img.loading = 'lazy';
        li.appendChild(img);
      }
    }

    var textSpan = document.createElement('span');
    textSpan.className = 'step-text';
    textSpan.textContent = stepText;
    li.appendChild(textSpan);

    stepsList.appendChild(li);
  });

  /* Update "Go back to course" link */
  var catChallengeMap = {
    'email':         '../course/challenge-0.html',
    'mychart-setup': '../course/challenge-01.html',
    'video-visits':  '../course/challenge-02.html',
    'medications':   '../course/challenge-03.html',
    'appointments':  '../course/challenge-03.html',
    'messages':      '../course/challenge-03.html',
    'community':     '../course/challenge-05.html'
  };
  var courseLink = document.querySelector('.more-help-link[data-course-link]');
  if (courseLink && catChallengeMap[cat]) {
    var chHref = catChallengeMap[cat];
    courseLink.href = withLang(chHref);
    courseLink.setAttribute('data-lang-href', chHref);
  }
}

/* ============================================================
   INIT — runs on every page
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  applyStrings();
  initLangSelector();    /* no-op if .lang-option buttons are not present */
  initSteps();           /* no-op if .challenge-step panels are not present */
  initChecklist();       /* no-op if .checklist-item elements are not present */
  initCharSelector();    /* no-op if .char-btn buttons are not present */
  initChallengeTopic();  /* no-op if #topic-embed is not present */
  initCategory();        /* no-op if #topic-list is not present */
  initTopic();           /* no-op if #steps-list is not present */
});
