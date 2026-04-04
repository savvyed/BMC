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
  }

}; /* end strings */

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
   CATEGORY PAGE (help/category.html)
   ============================================================ */

/**
 * Reads the ?cat= URL parameter and updates the category page accordingly.
 * The "video-visits" category is fully built — all others show a stub notice.
 */
function initCategory() {
  var topicList = document.getElementById('topic-list');
  if (!topicList) return; /* Not the category page */

  var cat = new URLSearchParams(window.location.search).get('cat') || 'video-visits';
  var heading = document.getElementById('category-heading');
  var headerTitle = document.getElementById('category-title');
  var stubNotice = document.getElementById('stub-topic-notice');

  /* Map category slugs to their string key for the heading */
  var catHeadingKeys = {
    'email':           'cat1Label',
    'mychart-setup':   'cat2Label',
    'video-visits':    'cat3Label',
    'medications':     'cat4Label',
    'appointments':    'cat5Label',
    'messages':        'cat6Label',
    'community':       'cat7Label'
  };

  var headingKey = catHeadingKeys[cat] || 'cat3Label';
  var headingText = t(headingKey);

  if (heading)     heading.textContent = headingText;
  if (headerTitle) headerTitle.textContent = headingText;

  /* Only video-visits has a built-out topic list — hide list for all others */
  if (cat !== 'video-visits') {
    if (topicList)  topicList.hidden = true;
    if (stubNotice) stubNotice.hidden = false;
  }
}

/* ============================================================
   INIT — runs on every page
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  applyStrings();
  initLangSelector();  /* no-op if .lang-option buttons are not present */
  initSteps();         /* no-op if .challenge-step panels are not present */
  initChecklist();     /* no-op if .checklist-item elements are not present */
  initCharSelector();  /* no-op if .char-btn buttons are not present */
  initCategory();      /* no-op if #topic-list is not present */
});
