export type Lang = "es" | "en";

/** A featured project. Optional fields render only when present, so each project shows what it has. */
type Project = {
  name: string; tag: string; desc: string; features: string[]; stack: string[]; status: string;
  problem?: string;
  /** Institutional or business context of the project. */
  context?: string;
  /** Job title on the project, e.g. "Junior Full-Stack Developer · Independent contractor". */
  roleTitle?: string;
  /** How I took part in the project. */
  participation?: string;
  origin?: string;
  /** Engineering concepts (not technologies); shown apart from the stack. */
  concepts?: string[];
  /** Kind of technical work done (QA, refactoring…); also shown apart from the stack. */
  work?: string[];
  /** A key technical decision, highlighted on its own. */
  decision?: { title: string; text: string };
  /** Public links (demo / repository). Private projects simply omit them. */
  links?: { demo: string; repo: string };
  /** Real screenshots in /public/projects/<name>/ (e.g. { src: "/projects/wayra/dashboard.webp", thumb, alt, width, height }).
   *  The first one is shown large; with more than one, thumbnails switch between them. While empty, the generated mockup is shown. */
  shots?: { src: string; thumb: string; alt: string; width: number; height: number }[];
};

/** A blog article. Add `url` once it is published: only then the card links to it and shows "Read article". */
type Post = { title: string; status: string; desc: string; topics: string[]; url?: string };

/** A public repository shown in the GitHub section. Only real, verifiable data: no stars, forks or activity. */
type Repo = { name: string; type: string; desc: string; url: string; stack: string[];
  /** Secondary labels (concepts, testing, CI) shown apart from the stack, only when the repo documents them. */
  extra?: string[];
  /** The main repository gets more visual weight. */
  featured?: boolean };

/** A program in "Education & Achievements". `current` adds the "in progress" badge below the period. */
type Program = { degree: string; school: string; period: string; current?: boolean; details: [string, string][] };

/** A competition result in "Education & Achievements". */
type Achievement = { icon: "trophy" | "medal"; t: string; meta: string; result: string; d: string; org?: string };

/** A technology column in the Stack section. Each item is [name, usage]: "p" primary stack,
 *  "w" professional use, "h" hands-on experience, "" no label. Usage context, never a skill level. */
type StackGroup = { name: string; items: [string, "p" | "w" | "h" | ""][] };

/** A professional experience entry. Optional fields render only when present. */
type Job = {
  org: string; role: string; summary: string; items: string[]; stack: string[];
  /** ISO date (YYYY-MM-DD); null while the real start date is not known (only "Present" is shown). */
  start: string | null;
  /** Contract type, e.g. "Prestación de servicios" / "Independent contractor". */
  mode?: string;
  /** Kinds of work done (shown after the summary). */
  work?: string;
  /** The project worked on, in a highlighted box. Client work stays anonymized (no client or product names). */
  project?: { label: string; text: string };
  /** Practices and concepts, shown as plain text apart from the stack. */
  concepts?: string[];
  note?: string;
};

// Start date at Universidad de La Guajira (null would show only "Present").
const UNIGUAJIRA_START: string | null = "2026-09-01";

const WAYRA_LINKS = { demo: "https://wayra-travel.com/", repo: "https://github.com/CrixxCode/wayra-gh" };

const es = {
  nav: { home: "Inicio", about: "Sobre mí", experience: "Experiencia", projects: "Proyectos", stack: "Stack", education: "Formación", github: "GitHub", contact: "Contacto", cta: "Hablemos", menu: "Menú", close: "Cerrar", label: "Principal", skip: "Saltar al contenido", switchLang: "Cambiar idioma a inglés", toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro" },
  hero: {
    label: "Full-Stack Developer",
    title: "Construyo productos digitales de principio a fin.",
    sub: "Diseño y desarrollo productos web desde la comprensión del problema hasta una solución funcional: requisitos, arquitectura, datos, backend, frontend y experiencia de usuario.",
    stackNote: "Mi stack principal es Django + Angular, pero trabajo con fundamentos que me permiten adaptarme a diferentes tecnologías y necesidades de producto.",
    cta: "Hablemos", cta2: "Ver proyectos", status: "Disponible para proyectos y colaboraciones",
  },
  about: {
    num: "03", label: "Sobre mí", title: "Ingeniería con criterio de producto.",
    p1: "Me gusta involucrarme en un producto desde antes de escribir la primera línea de código. Entender el problema, levantar requisitos, diseñar la solución y tomar decisiones sobre arquitectura, datos e interfaz forma parte de mi manera de desarrollar.",
    p2: "Trabajo tanto en frontend como en backend y disfruto especialmente los problemas que conectan ambas partes: arquitectura, APIs, modelos de datos y experiencias de usuario coherentes.",
    p3: "Django + Angular es mi stack principal, pero no defino mi trabajo por un framework. Me interesa construir fundamentos sólidos que pueda trasladar entre tecnologías y seguir creciendo hacia la arquitectura de software.",
    quote: "Las herramientas cambian. La capacidad para construir soluciones no.",
    photoAlt: "Retrato en blanco y negro de Cristian Ramirez",
  },
  stats: [
    { v: "Full-Stack", l: "Frontend + Backend" },
    { v: "End-to-End", l: "Del problema al producto" },
    { v: "1.er puesto", l: "Maratón de Programación" },
    { v: "B2", l: "Inglés · Saber Pro" },
  ],
  projects: {
    num: "01", label: "Proyectos destacados", title: "Casos de estudio.",
    problem: "Problema", features: "Funciones clave", stack: "Stack", status: "Estado", mock: "Maqueta de la interfaz", showShot: "Ver captura",
    context: "Contexto", myRole: "Mi rol", work: "Trabajo técnico",
    origin: "Origen", participation: "Mi participación", concepts: "Conceptos aplicados", decision: "Decisión técnica", demo: "Ver demo", github: "GitHub", newTab: "(se abre en una pestaña nueva)",
    items: [
      {
        name: "Wayra Travel", tag: "SaaS · Hospitality Tech · Full-Stack",
        desc: "SaaS multitenant para centralizar y gestionar la operación de establecimientos de alojamiento desde una única plataforma.",
        origin: "Surgió a partir de un proyecto académico y evolucionó posteriormente como producto SaaS.",
        problem: "Muchos establecimientos gestionan reservas, huéspedes, habitaciones, pagos, inventario y otros procesos mediante información distribuida entre hojas de cálculo, registros físicos y herramientas independientes, dificultando la consistencia, trazabilidad y consulta de los datos.",
        participation: "Desarrollo conjunto del producto como parte de un equipo de dos desarrolladores, participando de forma transversal en levantamiento de requisitos, arquitectura, modelado de datos, backend, frontend, autenticación y autorización, multitenancy, experiencia de usuario, pruebas, documentación y despliegue.",
        features: ["Reservas y disponibilidad", "Huéspedes y habitaciones", "Facturación, pagos y cargos", "Servicios, paquetes y promociones", "Inventario y egresos", "Reportes y control operativo", "Configuración e identidad visual por establecimiento", "Notificaciones"],
        stack: ["Django", "Angular", "PostgreSQL", "Docker"],
        concepts: ["REST", "RBAC", "Multitenancy", "Diseño relacional"],
        decision: { title: "Aislamiento multitenant", text: "La plataforma separa la información por establecimiento para evitar cruces de datos entre organizaciones, complementando esta separación con control de acceso basado en roles y recursos." },
        status: "En fase de pruebas",
        links: WAYRA_LINKS,
        shots: [
          { src: "/projects/wayra/dashboard.webp", thumb: "/projects/wayra/dashboard-thumb.webp", width: 1440, height: 1000,
            alt: "Dashboard de Wayra Travel con ocupación, ingresos del día, huéspedes, RevPAR y gráficas de ocupación semanal e ingresos diarios (datos de demostración)." },
          { src: "/projects/wayra/reservas.webp", thumb: "/projects/wayra/reservas-thumb.webp", width: 1440, height: 1000,
            alt: "Módulo de reservas de Wayra Travel con indicadores, filtros por estado y tarjetas de reserva con acciones de check-in y check-out (datos de demostración)." },
          { src: "/projects/wayra/habitaciones.webp", thumb: "/projects/wayra/habitaciones-thumb.webp", width: 1440, height: 1000,
            alt: "Tablero de habitaciones de Wayra Travel con indicadores de check-ins, salidas, limpieza, mantenimiento y cobros, y filtros por estado y piso (datos de demostración)." },
          { src: "/projects/wayra/facturacion.webp", thumb: "/projects/wayra/facturacion-thumb.webp", width: 1440, height: 1000,
            alt: "Detalle de factura en Wayra Travel con cargos de alojamiento y servicios, pagos registrados y saldo pendiente de la estancia (datos de demostración)." },
          { src: "/projects/wayra/limpieza.webp", thumb: "/projects/wayra/limpieza-thumb.webp", width: 1440, height: 1000,
            alt: "Módulo de limpieza y mantenimiento de Wayra Travel con tareas por habitación, tareas atrasadas y filtros por estado, tipo y habitación (datos de demostración)." },
        ],
      },
      {
        name: "Ejercitador Saber Pro", tag: "EdTech · Universidad de La Guajira · Full-Stack",
        desc: "Plataforma institucional orientada a la preparación, entrenamiento y evaluación de competencias genéricas de las pruebas Saber Pro.",
        context: "Proyecto de la Vicerrectoría de Docencia de la Universidad de La Guajira orientado al fortalecimiento de las competencias genéricas evaluadas en las pruebas Saber Pro.",
        roleTitle: "Desarrollador Full-Stack Jr. · Prestación de servicios",
        participation: "Me incorporé al proyecto durante una etapa de desarrollo ya existente. Mi trabajo se ha enfocado en QA funcional y técnico, ejecución de pruebas transversales, detección y corrección de errores, revisión del comportamiento de los distintos módulos y refactorización de componentes de la arquitectura para apoyar la evolución del sistema.",
        features: ["Práctica y diagnóstico", "Entrenamiento por competencias", "Simulacros", "Gamificación", "Integración de inteligencia artificial", "Retroalimentación y analítica", "Gestión del banco de preguntas"],
        stack: ["Django", "FastAPI", "React", "MySQL"],
        work: ["QA", "Pruebas funcionales", "Refactorización", "Corrección de errores"],
        status: "En desarrollo",
      },
    ] as Project[],
  },
  stack: {
    num: "04", label: "Stack", title: "Stack flexible. Fundamentos sólidos.", byDomain: "Organizado por dominio",
    // Usage context, not skill level: p = primary stack, w = professional use, h = hands-on experience
    levels: { p: "Stack principal", w: "Uso profesional", h: "Experiencia práctica" },
    groups: [
      { name: "Backend", items: [["Django", "p"], ["Python", "p"], ["ASP.NET Core / .NET", "w"], ["C#", "w"], ["Node.js", "h"], ["Java", "h"]] },
      { name: "Frontend", items: [["Angular", "p"], ["TypeScript", "p"], ["React", "w"], ["JavaScript", ""]] },
      { name: "Datos", items: [["PostgreSQL", "p"], ["MySQL", "h"], ["SQL Server", "w"]] },
      { name: "Herramientas", items: [["Docker", ""], ["Git", ""], ["Postman", ""], ["WSL", ""], ["Railway", ""]] },
    ] as StackGroup[],
    fundamentalsTitle: "Fundamentos transferibles",
    fundamentalsText: "Trabajo sobre fundamentos que se mantienen entre tecnologías: HTTP, APIs, modelado relacional, componentes, estado, autenticación, autorización y separación de responsabilidades. Eso me permite moverme entre distintos stacks sin depender exclusivamente de un framework.",
    conceptsTitle: "Conceptos aplicados",
    concepts: ["REST", "RBAC", "Multitenancy", "Monolito modular", "Clean Architecture", "MVC", "Diseño relacional"],
  },
  experience: {
    num: "02", label: "Experiencia", title: "Donde aplico lo que sé.", present: "Actualidad", current: "Actual",
    jobs: [
      {
        org: "ALGORITHM S.A.S.", role: "Desarrollador Full-Stack Jr.", mode: "Prestación de servicios", start: "2026-06-01",
        summary: "Participo en el desarrollo y evolución de aplicaciones web para clientes de la compañía, trabajando tanto en backend con ASP.NET Core/.NET como en frontend con React.",
        work: "Mi trabajo ha incluido QA y estabilización de soluciones existentes, además de participación en el ciclo completo de desarrollo de una nueva aplicación actualmente en fase de pruebas.",
        project: { label: "Proyecto para cliente", text: "Aplicación web multitenant orientada a la búsqueda y reserva de alojamientos." },
        items: [
          "Desarrollo y mantenimiento de funcionalidades backend con ASP.NET Core/.NET.",
          "Desarrollo de interfaces y flujos frontend con React.",
          "Diseño y consumo de APIs REST.",
          "Integración con servicios y APIs de terceros.",
          "Levantamiento, análisis y refinamiento de requerimientos.",
          "Diseño de interfaces y apoyo en decisiones de experiencia de usuario.",
          "Ejecución de QA funcional y pruebas transversales.",
          "Detección, análisis y corrección de errores.",
        ],
        stack: ["ASP.NET Core", ".NET", "React", "Git"],
        concepts: ["APIs REST", "Integraciones", "QA"],
        note: "Los nombres, código y detalles internos de proyectos desarrollados para clientes se mantienen confidenciales.",
      },
      {
        org: "Universidad de La Guajira", role: "Desarrollador Full-Stack Jr.", mode: "Prestación de servicios", start: UNIGUAJIRA_START,
        summary: "Vinculado a la Vicerrectoría de Docencia de la Universidad de La Guajira para apoyar el desarrollo y evolución técnica del Ejercitador Saber Pro.",
        work: "Trabajo como desarrollador Full-Stack sobre una base de código existente, con foco en QA, pruebas, corrección de errores y refactorización.",
        project: { label: "Proyecto institucional", text: "Ejercitador Saber Pro: plataforma orientada a la preparación, entrenamiento y evaluación de competencias genéricas de las pruebas Saber Pro." },
        items: [
          "QA funcional y técnico del sistema.",
          "Ejecución de pruebas transversales entre módulos.",
          "Detección, documentación y corrección de errores.",
          "Revisión de flujos existentes y validación de comportamiento.",
          "Refactorización de componentes de la arquitectura existente.",
          "Apoyo en la evolución técnica y funcional del producto.",
        ],
        stack: ["Django", "FastAPI", "React", "MySQL"],
        concepts: ["QA", "Pruebas", "Refactorización"],
        note: "El repositorio del Ejercitador Saber Pro es privado, por eso no tiene enlace público.",
      },
    ] as Job[],
  },
  education: {
    num: "05", label: "Formación y logros", title: "Formación, resultados y crecimiento técnico.", currentL: "En curso",
    programs: [
      { degree: "Ingeniería de Sistemas", school: "Universidad de La Guajira", period: "2022 – Actualidad", current: true,
        details: [["Semestre", "Décimo"], ["Graduación estimada", "Primer semestre de 2027"]] },
      { degree: "Técnico en Sistemas", school: "SENA", period: "2020 – 2021", details: [["Estado", "Finalizado"]] },
    ] as Program[],
    interestsL: "Intereses", interests: ["Arquitectura de software", "Ingeniería de software", "Desarrollo de productos digitales", "Inteligencia Artificial"],
    englishL: "Inglés", english: "B2 · Saber Pro",
  },
  achievements: {
    label: "Logros",
    items: [
      { icon: "trophy", t: "Maratón de Programación", meta: "2023", result: "1.er puesto", d: "Primer lugar en una competencia orientada a la resolución de problemas mediante el diseño e implementación de algoritmos.", org: "Organizada por el programa de Ingeniería de Sistemas de la Universidad de La Guajira" },
      { icon: "medal", t: "Hackathon Colombia 5.0", meta: "2026 · Bogotá", result: "Top 10 a nivel nacional", d: "Clasificación entre los diez mejores equipos a nivel nacional en una competencia de innovación y desarrollo tecnológico." },
    ] as Achievement[],
    saber: {
      t: "Saber Pro", globalL: "Puntaje global", global: 188,
      scores: [[204, "Competencias ciudadanas"], [200, "Lectura crítica"], [186, "Razonamiento cuantitativo"], [181, "Inglés"], [168, "Comunicación escrita"]] as [number, string][],
    },
  },
  github: {
    num: "06", label: "GitHub", title: "Código que también cuenta la historia.",
    intro: "Mantengo repositorios públicos de proyectos personales, académicos y ejercicios técnicos donde documento parte de mi trabajo y evolución como desarrollador.",
    cta: "Ver repositorio", profileCta: "Ver perfil en GitHub", newTab: "(se abre en una pestaña nueva)",
    activityTitle: "Actividad en el último año", contributionsL: "contribuciones", reposL: "repositorios públicos", less: "Menos", more: "Más", source: "Datos públicos de GitHub · se actualizan a diario",
    repos: [
      { name: "Wayra Travel", type: "Producto SaaS", featured: true, url: "https://github.com/CrixxCode/wayra-gh",
        desc: "Repositorio del SaaS de gestión hotelera que evolucionó a partir de un proyecto académico y que actualmente se encuentra en fase de pruebas.",
        stack: ["Django", "Angular", "PostgreSQL", "Docker"], extra: ["RBAC", "Multitenancy"] },
      { name: "Sistema de gestión para laboratorio clínico", type: "Proyecto académico", url: "https://github.com/CrixxCode/ProyectoLabClinico",
        desc: "Aplicación full-stack desarrollada como proyecto académico para gestionar procesos relacionados con pacientes, médicos, órdenes, exámenes, muestras y resultados.",
        stack: ["Node.js", "TypeScript", "Express", "Angular"] },
      { name: "Proyecto Full-Stack .NET", type: "Proyecto técnico", url: "https://github.com/CrixxCode/prueba-fullstack-jr",
        desc: "Aplicación full-stack construida como ejercicio técnico utilizando ASP.NET Core, Angular, SQL Server, autenticación y herramientas de contenedores.",
        stack: ["ASP.NET Core", "Angular", "SQL Server", "Docker"], extra: ["Testing", "GitHub Actions"] },
    ] as Repo[],
  },
  services: { num: "07", label: "Cómo puedo aportar", cta: "Hablemos de tu proyecto", items: [
    { t: "Desarrollo Full-Stack", d: "Construcción y evolución de aplicaciones web, participando desde los requisitos y el diseño técnico hasta frontend, backend y pruebas." },
    { t: "Análisis y apoyo técnico", d: "Apoyo en análisis de requerimientos, modelado de datos, diseño de APIs, revisión técnica y mejora de soluciones existentes." },
    { t: "Colaboración en productos", d: "Integración a equipos y proyectos en desarrollo para implementar funcionalidades, realizar QA, corregir problemas y continuar la evolución técnica del producto." },
  ] },
  blog: {
    num: "08", label: "Blog", title: "Notas sobre lo que construyo y aprendo.",
    intro: "Espacio para documentar decisiones técnicas, arquitectura, datos y aprendizajes surgidos durante el desarrollo de productos y proyectos reales.",
    read: "Leer artículo", newTab: "(se abre en una pestaña nueva)",
    posts: [
      {
        title: "Arquitectura, modelo de datos y diseño funcional de una plataforma web para la gestión de información hotelera en Riohacha",
        status: "En preparación",
        desc: "Análisis de las decisiones de arquitectura, modelo de datos y diseño funcional utilizadas en la construcción de una plataforma orientada a centralizar procesos de gestión de información hotelera.",
        topics: ["Arquitectura de software", "Modelado de datos", "Diseño funcional", "Hospitality Tech", "Sistemas de información"],
      },
    ] as Post[],
  },
  contact: {
    num: "09", label: "Contacto", title: "Construyamos algo juntos.", text: "Estoy disponible para proyectos, colaboraciones y oportunidades donde pueda aportar desde el desarrollo Full-Stack y seguir creciendo como ingeniero de software.",
    remote: "Disponible para trabajo remoto", subject: "Portafolio", newTab: "(se abre en una pestaña nueva)",
    name: "Nombre", email: "Email", message: "Mensaje", send: "Enviar mensaje",
    errName: "Escribe tu nombre.", errEmail: "Escribe un email válido.", errMsg: "El mensaje debe tener al menos 10 caracteres.", ok: "Se abrirá tu cliente de correo para completar el envío.", okFallback: "¿No se abrió? Escríbeme directamente a",
  },
  footer: { tagline: "Diseñado y construido con intención.", newTab: "(se abre en una pestaña nueva)" },
  brand: { logo: "Logo", banner: "Banner de marca", bannerAlt: "Logotipo de Cristian Ramirez, Full-Stack Developer" },
  // Text inside the illustrative project mockups (Mocks.tsx)
  mocks: {
    hotelNav: ["Dashboard", "Reservas", "Clientes", "Habitaciones", "Facturación", "Reportes"], hotelTitle: "Reservas · Octubre", hotelNew: "+ Nueva",
    hotelKpis: ["Ocupación", "Check-ins", "Habitaciones"],
    examSession: "simulacro · 24/35", examQuestion: "Lectura crítica · P24", examDiagnosis: "Diagnóstico", examAreas: ["LC", "RC", "CC", "IN", "CE"],
  },
  // CV generated by cv/build.mjs from this same content
  cv: { label: "Descargar CV", href: "/cv/Cristian_Ramirez_CV_ES.pdf", hint: "(PDF)" },
  errors: { notFound: "Página no encontrada", notFoundText: "La página que buscas no existe o se movió.", failed: "Esta página no cargó", failedText: "Algo falló de nuestro lado. Intenta de nuevo o vuelve al inicio.", retry: "Intentar de nuevo", home: "Volver al inicio" },
};

const en: typeof es = {
  nav: { home: "Home", about: "About", experience: "Experience", projects: "Projects", stack: "Stack", education: "Education", github: "GitHub", contact: "Contact", cta: "Let’s Talk", menu: "Menu", close: "Close", label: "Main", skip: "Skip to content", switchLang: "Switch language to Spanish", toLight: "Switch to light mode", toDark: "Switch to dark mode" },
  hero: {
    label: "Full-Stack Developer",
    title: "I build digital products end to end.",
    sub: "I design and build web products from understanding the problem to delivering a functional solution — requirements, architecture, data, backend, frontend and user experience.",
    stackNote: "My primary stack is Django + Angular, but I work from solid fundamentals that let me adapt to different technologies and product needs.",
    cta: "Let’s Talk", cta2: "View Projects", status: "Available for projects and collaborations",
  },
  about: {
    num: "03", label: "About", title: "Engineering with product judgment.",
    p1: "I like getting involved in a product before the first line of code is written. Understanding the problem, gathering requirements, designing the solution, and making decisions about architecture, data and interfaces are all part of how I approach development.",
    p2: "I work across both frontend and backend, and I especially enjoy problems that connect the two: architecture, APIs, data models and coherent user experiences.",
    p3: "Django + Angular is my primary stack, but I don’t define my work by a framework. I focus on building solid fundamentals that transfer across technologies while continuing to grow toward software architecture.",
    quote: "Tools change. The ability to build solutions doesn’t.",
    photoAlt: "Black-and-white portrait of Cristian Ramirez",
  },
  stats: [
    { v: "Full-Stack", l: "Frontend + Backend" },
    { v: "End-to-End", l: "From problem to product" },
    { v: "1st place", l: "Programming Marathon" },
    { v: "B2", l: "English · Saber Pro" },
  ],
  projects: {
    num: "01", label: "Featured projects", title: "Case studies.",
    problem: "Problem", features: "Key features", stack: "Stack", status: "Status", mock: "Interface mockup", showShot: "Show screenshot",
    context: "Context", myRole: "My role", work: "Technical work",
    origin: "Origin", participation: "My contribution", concepts: "Applied concepts", decision: "Technical decision", demo: "View Demo", github: "GitHub", newTab: "(opens in a new tab)",
    items: [
      {
        name: "Wayra Travel", tag: "SaaS · Hospitality Tech · Full-Stack",
        desc: "Multitenant SaaS for centralizing and managing lodging operations from a single platform.",
        origin: "Originally developed from an academic project and later evolved into a SaaS product.",
        problem: "Many properties manage bookings, guests, rooms, payments, inventory and other processes with information scattered across spreadsheets, paper records and disconnected tools, which makes data hard to keep consistent, trace and look up.",
        participation: "Built jointly as part of a two-developer team, contributing across requirements gathering, architecture, data modeling, backend, frontend, authentication and authorization, multitenancy, user experience, testing, documentation and deployment.",
        features: ["Bookings & availability", "Guests & rooms", "Billing, payments & charges", "Services, packages & promotions", "Inventory & expenses", "Reports & operational control", "Per-property settings & branding", "Notifications"],
        stack: ["Django", "Angular", "PostgreSQL", "Docker"],
        concepts: ["REST", "RBAC", "Multitenancy", "Relational design"],
        decision: { title: "Multitenant isolation", text: "The platform separates data by property to prevent information from crossing organizational boundaries, complementing this isolation with role- and resource-based access control." },
        status: "Testing phase",
        links: WAYRA_LINKS,
        shots: [
          { src: "/projects/wayra/dashboard.webp", thumb: "/projects/wayra/dashboard-thumb.webp", width: 1440, height: 1000,
            alt: "Wayra Travel dashboard with occupancy, today’s revenue, guests, RevPAR and charts of weekly occupancy and daily revenue (demo data)." },
          { src: "/projects/wayra/reservas.webp", thumb: "/projects/wayra/reservas-thumb.webp", width: 1440, height: 1000,
            alt: "Wayra Travel bookings module with summary metrics, status filters and booking cards with check-in and check-out actions (demo data)." },
          { src: "/projects/wayra/habitaciones.webp", thumb: "/projects/wayra/habitaciones-thumb.webp", width: 1440, height: 1000,
            alt: "Wayra Travel rooms board with check-in, departure, housekeeping, maintenance and billing indicators, plus status and floor filters (demo data)." },
          { src: "/projects/wayra/facturacion.webp", thumb: "/projects/wayra/facturacion-thumb.webp", width: 1440, height: 1000,
            alt: "Wayra Travel invoice detail with lodging and service charges, recorded payments and the stay’s outstanding balance (demo data)." },
          { src: "/projects/wayra/limpieza.webp", thumb: "/projects/wayra/limpieza-thumb.webp", width: 1440, height: 1000,
            alt: "Wayra Travel housekeeping and maintenance module with tasks per room, overdue tasks and filters by status, type and room (demo data)." },
        ],
      },
      {
        name: "Ejercitador Saber Pro", tag: "EdTech · Universidad de La Guajira · Full-Stack",
        desc: "Institutional platform focused on preparing, training and assessing the generic competencies evaluated in Colombia’s Saber Pro exams.",
        context: "Project led by the Vice-Rector’s Office for Teaching at Universidad de La Guajira to strengthen the generic competencies assessed in the Saber Pro exams.",
        roleTitle: "Junior Full-Stack Developer · Independent contractor",
        participation: "I joined the project during an existing development stage. My work has focused on functional and technical QA, cross-module testing, bug detection and correction, reviewing system behavior, and refactoring architectural components to support the platform’s continued evolution.",
        features: ["Practice & diagnostics", "Competency-based training", "Mock exams", "Gamification", "AI integration", "Feedback & analytics", "Question bank management"],
        stack: ["Django", "FastAPI", "React", "MySQL"],
        work: ["QA", "Functional Testing", "Refactoring", "Bug Fixing"],
        status: "In development",
      },
    ] as Project[],
  },
  stack: {
    num: "04", label: "Stack", title: "Flexible stack. Solid fundamentals.", byDomain: "Organized by domain",
    levels: { p: "Primary stack", w: "Professional use", h: "Hands-on experience" },
    groups: [
      { name: "Backend", items: [["Django", "p"], ["Python", "p"], ["ASP.NET Core / .NET", "w"], ["C#", "w"], ["Node.js", "h"], ["Java", "h"]] },
      { name: "Frontend", items: [["Angular", "p"], ["TypeScript", "p"], ["React", "w"], ["JavaScript", ""]] },
      { name: "Data", items: [["PostgreSQL", "p"], ["MySQL", "h"], ["SQL Server", "w"]] },
      { name: "Tools", items: [["Docker", ""], ["Git", ""], ["Postman", ""], ["WSL", ""], ["Railway", ""]] },
    ] as StackGroup[],
    fundamentalsTitle: "Transferable fundamentals",
    fundamentalsText: "I work from fundamentals that stay consistent across technologies: HTTP, APIs, relational data modeling, components, state, authentication, authorization and separation of concerns. That lets me move between different stacks without depending exclusively on a single framework.",
    conceptsTitle: "Applied concepts",
    concepts: ["REST", "RBAC", "Multitenancy", "Modular monolith", "Clean Architecture", "MVC", "Relational design"],
  },
  experience: {
    num: "02", label: "Experience", title: "Where I put it to work.", present: "Present", current: "Current",
    jobs: [
      {
        org: "ALGORITHM S.A.S.", role: "Junior Full-Stack Developer", mode: "Independent contractor", start: "2026-06-01",
        summary: "I contribute to the development and evolution of web applications for company clients, working on backend development with ASP.NET Core/.NET and frontend development with React.",
        work: "My work has included QA and stabilization of existing solutions, as well as taking part in the full development cycle of a new application that is currently in its testing phase.",
        project: { label: "Client project", text: "Multitenant web application for searching and booking accommodation." },
        items: [
          "Building and maintaining backend features with ASP.NET Core/.NET.",
          "Building frontend interfaces and flows with React.",
          "Designing and consuming REST APIs.",
          "Integrating third-party services and APIs.",
          "Gathering, analyzing and refining requirements.",
          "Designing interfaces and supporting user experience decisions.",
          "Running functional QA and cross-module testing.",
          "Detecting, analyzing and fixing bugs.",
        ],
        stack: ["ASP.NET Core", ".NET", "React", "Git"],
        concepts: ["REST APIs", "Integrations", "QA"],
        note: "Client names, source code and internal project details remain confidential.",
      },
      {
        org: "Universidad de La Guajira", role: "Junior Full-Stack Developer", mode: "Independent contractor", start: UNIGUAJIRA_START,
        summary: "Working with the Vice-Rector’s Office for Teaching at Universidad de La Guajira to support the development and technical evolution of the Ejercitador Saber Pro platform.",
        work: "I work as a full-stack developer on an existing codebase, focusing on QA, testing, bug fixing and refactoring.",
        project: { label: "Institutional project", text: "Ejercitador Saber Pro: a platform for preparing, training and assessing the generic competencies evaluated in Colombia’s Saber Pro exams." },
        items: [
          "Functional and technical QA of the system.",
          "Running cross-module tests.",
          "Detecting, documenting and fixing bugs.",
          "Reviewing existing flows and validating behavior.",
          "Refactoring components of the existing architecture.",
          "Supporting the product’s technical and functional evolution.",
        ],
        stack: ["Django", "FastAPI", "React", "MySQL"],
        concepts: ["QA", "Testing", "Refactoring"],
        note: "The Ejercitador Saber Pro repository is private, so it has no public link.",
      },
    ] as Job[],
  },
  education: {
    num: "05", label: "Education & Achievements", title: "Education, results and technical growth.", currentL: "In progress",
    programs: [
      { degree: "Systems Engineering", school: "Universidad de La Guajira", period: "2022 – Present", current: true,
        details: [["Semester", "Tenth"], ["Expected graduation", "First half of 2027"]] },
      { degree: "Systems Technician", school: "SENA", period: "2020 – 2021", details: [["Status", "Completed"]] },
    ],
    interestsL: "Interests", interests: ["Software Architecture", "Software Engineering", "Digital Product Development", "Artificial Intelligence"],
    englishL: "English", english: "B2 · Saber Pro",
  },
  achievements: {
    label: "Achievements",
    items: [
      { icon: "trophy", t: "Programming Marathon", meta: "2023", result: "1st place", d: "First place in a competition focused on problem solving through algorithm design and implementation.", org: "Organized by the Systems Engineering program at Universidad de La Guajira" },
      { icon: "medal", t: "Hackathon Colombia 5.0", meta: "2026 · Bogotá", result: "National Top 10", d: "Ranked among the ten best teams nationwide in an innovation and technology development competition." },
    ] as Achievement[],
    saber: {
      t: "Saber Pro", globalL: "Overall score", global: 188,
      scores: [[204, "Citizenship Skills"], [200, "Critical Reading"], [186, "Quantitative Reasoning"], [181, "English"], [168, "Written Communication"]] as [number, string][],
    },
  },
  github: {
    num: "06", label: "GitHub", title: "Code that also tells the story.",
    intro: "I keep public repositories for personal projects, academic work and technical exercises that document part of my work and growth as a developer.",
    cta: "View Repository", profileCta: "View GitHub Profile", newTab: "(opens in a new tab)",
    activityTitle: "Activity in the last year", contributionsL: "contributions", reposL: "public repositories", less: "Less", more: "More", source: "Public GitHub data · refreshed daily",
    repos: [
      { name: "Wayra Travel", type: "SaaS product", featured: true, url: "https://github.com/CrixxCode/wayra-gh",
        desc: "Repository for the hotel management SaaS that evolved from an academic project and is currently in its testing phase.",
        stack: ["Django", "Angular", "PostgreSQL", "Docker"], extra: ["RBAC", "Multitenancy"] },
      { name: "Clinical laboratory management system", type: "Academic project", url: "https://github.com/CrixxCode/ProyectoLabClinico",
        desc: "Full-stack application developed as an academic project to manage workflows related to patients, physicians, orders, exams, samples and results.",
        stack: ["Node.js", "TypeScript", "Express", "Angular"] },
      { name: "Full-Stack .NET Project", type: "Technical project", url: "https://github.com/CrixxCode/prueba-fullstack-jr",
        desc: "Full-stack application built as a technical exercise using ASP.NET Core, Angular, SQL Server, authentication and container tooling.",
        stack: ["ASP.NET Core", "Angular", "SQL Server", "Docker"], extra: ["Testing", "GitHub Actions"] },
    ] as Repo[],
  },
  services: { num: "07", label: "How I can contribute", cta: "Let’s Talk About Your Project", items: [
    { t: "Full-Stack Development", d: "Building and evolving web applications, contributing from requirements and technical design through frontend, backend and testing." },
    { t: "Technical analysis & support", d: "Support with requirements analysis, data modeling, API design, technical reviews and improvements to existing solutions." },
    { t: "Product collaboration", d: "Joining existing teams and products to implement features, perform QA, resolve issues and support the product’s continued technical evolution." },
  ] },
  blog: {
    num: "08", label: "Blog", title: "Notes on what I build and learn.",
    intro: "A space to document technical decisions, architecture, data and lessons learned while building real products and projects.",
    read: "Read Article", newTab: "(opens in a new tab)",
    posts: [
      {
        title: "Architecture, Data Model and Functional Design of a Web Platform for Hotel Information Management in Riohacha",
        status: "In preparation",
        desc: "An analysis of the architecture, data model and functional design decisions used to build a platform focused on centralizing hotel information management processes.",
        topics: ["Software Architecture", "Data Modeling", "Functional Design", "Hospitality Tech", "Information Systems"],
      },
    ] as Post[],
  },
  contact: {
    num: "09", label: "Contact", title: "Let’s build something together.", text: "I’m available for projects, collaborations and opportunities where I can contribute as a Full-Stack Developer while continuing to grow as a software engineer.",
    remote: "Available for remote work", subject: "Portfolio", newTab: "(opens in a new tab)",
    name: "Name", email: "Email", message: "Message", send: "Send Message",
    errName: "Please enter your name.", errEmail: "Please enter a valid email.", errMsg: "Message must be at least 10 characters.", ok: "Your email client will open so you can complete the message.", okFallback: "Didn’t open? Email me directly at",
  },
  footer: { tagline: "Designed and built with intention.", newTab: "(opens in a new tab)" },
  brand: { logo: "Logo", banner: "Brand banner", bannerAlt: "Cristian Ramirez, Full-Stack Developer logo" },
  mocks: {
    hotelNav: ["Dashboard", "Bookings", "Guests", "Rooms", "Billing", "Reports"], hotelTitle: "Bookings · October", hotelNew: "+ New",
    hotelKpis: ["Occupancy", "Check-ins", "Rooms"],
    examSession: "practice test · 24/35", examQuestion: "Critical reading · Q24", examDiagnosis: "Diagnostics", examAreas: ["CR", "QR", "CC", "EN", "WC"],
  },
  cv: { label: "Download CV", href: "/cv/Cristian_Ramirez_CV_EN.pdf", hint: "(PDF)" },
  errors: { notFound: "Page not found", notFoundText: "The page you’re looking for doesn’t exist or has moved.", failed: "This page didn’t load", failedText: "Something went wrong on our side. Try again or go back home.", retry: "Try Again", home: "Back to Home" },
};

export const dict = { es, en };
export type Dict = typeof es;

export const CONTACT = {
  name: "Cristian Ramirez",
  email: "cristiandanrave@gmail.com",
  linkedin: "https://www.linkedin.com/in/cristian-daniel-ramirez-vega-17783a3b9",
  github: "https://github.com/CrixxCode",
  githubUser: "CrixxCode",
  instagram: "https://instagram.com/crixxcode",
};
