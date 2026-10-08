export type Lang = "es" | "en";

/** A featured project. Optional fields render only when present, so each project shows what it has. */
type Project = {
  name: string; tag: string; desc: string; problem: string; features: string[]; stack: string[]; status: string;
  role?: string;
  /** Used instead of `role` for team projects. */
  participation?: string;
  origin?: string;
  /** Engineering concepts (not technologies); shown apart from the stack. */
  concepts?: string[];
  /** A key technical decision, highlighted on its own. */
  decision?: { title: string; text: string };
  /** Public links; without them the card shows the private-repo row and the "coming soon" note. */
  links?: { demo: string; repo: string };
  /** Real screenshots in /public/projects/<name>/ (e.g. { src: "/projects/wayra/dashboard.webp", alt, width, height }).
   *  While empty, the generated mockup is shown instead. */
  shots?: { src: string; alt: string; width: number; height: number }[];
};

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
    num: "02", label: "Sobre mí", title: "Ingeniería con criterio de producto.",
    p1: "Trabajo en frontend y backend con la misma atención: modelos de datos claros, APIs predecibles e interfaces que se sienten simples. Me interesa construir productos completos, no piezas aisladas.",
    p2: "Me atrae la arquitectura de software — cómo las decisiones de hoy afectan la mantenibilidad de mañana. Priorizo código legible, calidad verificable y una experiencia de usuario cuidada.",
    p3: "Tengo tecnologías preferidas, pero mi valor está en los fundamentos y en aprender nuevos stacks con rapidez.",
    quote: "Las herramientas cambian. La capacidad para construir soluciones no.",
    photoAlt: "Retrato en blanco y negro de Cristian Ramirez",
  },
  stats: [
    { v: "10+", l: "Tecnologías utilizadas" },
    { v: "2", l: "Proyectos destacados" },
    { v: "Full-Stack", l: "Frontend + Backend" },
    { v: "B2", l: "Nivel de inglés" },
  ],
  projects: {
    num: "01", label: "Proyectos destacados", title: "Casos de estudio.",
    problem: "Problema", role: "Rol", features: "Funciones clave", stack: "Stack", status: "Estado", repo: "Repositorio", private: "Privado / no público", cta: "Ver caso de estudio", soon: "Caso de estudio próximamente", mock: "Maqueta de la interfaz",
    origin: "Origen", participation: "Mi participación", concepts: "Conceptos aplicados", decision: "Decisión técnica", demo: "Ver demo", github: "GitHub", newTab: "(se abre en una pestaña nueva)",
    items: [
      {
        name: "Wayra Travel", tag: "SaaS · Hospitality Tech · Full-Stack",
        desc: "SaaS multitenant para centralizar y gestionar la operación de establecimientos de alojamiento desde una única plataforma.",
        origin: "Surgió a partir de un proyecto académico y evolucionó posteriormente como producto SaaS.",
        problem: "Muchos establecimientos gestionan reservas, huéspedes, habitaciones, pagos, inventario y otros procesos mediante información distribuida entre hojas de cálculo, registros físicos y herramientas independientes, dificultando la consistencia, trazabilidad y consulta de los datos.",
        participation: "Desarrollo conjunto del producto como parte de un equipo de dos desarrolladores, participando de forma transversal en levantamiento de requisitos, arquitectura, modelado de datos, backend, frontend, autenticación y autorización, multitenancy, experiencia de usuario, pruebas, documentación y despliegue.",
        features: ["Reservas y disponibilidad", "Huéspedes y habitaciones", "Facturación, pagos y cargos", "Servicios, paquetes y promociones", "Inventario y egresos", "Reportes y control operativo", "Configuración del establecimiento", "Notificaciones"],
        stack: ["Django", "Angular", "PostgreSQL", "Docker"],
        concepts: ["REST", "RBAC", "Multitenancy", "Diseño relacional"],
        decision: { title: "Aislamiento multitenant", text: "La plataforma separa la información por establecimiento para evitar cruces de datos entre organizaciones, complementando esta separación con control de acceso basado en roles y recursos." },
        status: "En fase de pruebas",
        links: WAYRA_LINKS,
        shots: [],
      },
      { name: "UniguajiraTest", tag: "EdTech · Saber Pro", desc: "Plataforma de preparación y evaluación para las pruebas Saber Pro.", problem: "Los estudiantes carecen de un entorno estructurado para diagnosticar y entrenar sus competencias antes del examen.", role: "Desarrollo full-stack y diseño de la experiencia.", features: ["Práctica y diagnóstico", "Entrenamiento por competencias", "Simulacros", "Retroalimentación y analítica"], stack: ["Django", "Angular", "PostgreSQL"], status: "En desarrollo" },
    ] as Project[],
  },
  stack: {
    num: "03", label: "Stack", title: "Organizado por dominio.",
    principal: "Principal", exp: "Experiencia",
    groups: [
      { name: "Backend", items: [["Django", "p"], ["Python", "p"], ["ASP.NET Core (.NET)", "e"], ["Node.js", "e"]] },
      { name: "Frontend", items: [["Angular", "p"], ["TypeScript", "p"], ["React", "e"], ["JavaScript", "e"]] },
      { name: "Datos", items: [["PostgreSQL", ""], ["MySQL", ""], ["SQL Server", ""]] },
      { name: "Herramientas", items: [["Docker", ""], ["Git", ""], ["Postman", ""], ["WSL", ""]] },
    ] as { name: string; items: [string, string][] }[],
    adaptTitle: "Stack flexible. Fundamentos sólidos.",
    adaptText: "Los patrones se transfieren: HTTP, modelado de datos, componentes, estado, testing. Por eso paso de un framework a otro sin empezar de cero.",
  },
  experience: {
    num: "04", label: "Experiencia", title: "Donde aplico lo que sé.", company: "ALGORITHM S.A.S.", role: "Full-Stack Developer", start: "2026-06-01", present: "Actualidad", current: "Actual",
    items: ["Desarrollo y mantenimiento de funcionalidades frontend y backend.", "Diseño y consumo de APIs e integración de datos.", "Depuración, pruebas y mejora de calidad del código.", "Colaboración con el equipo e iteración continua del producto."],
    note: "Los detalles de proyectos internos se mantienen confidenciales.",
  },
  education: {
    num: "05", label: "Formación y logros", title: "Base académica y resultados.", degree: "Ingeniería de Sistemas", school: "Universidad de La Guajira", statusL: "Estado", status: "Etapa final / décimo semestre", interestsL: "Intereses",
    interests: ["Arquitectura de software", "Desarrollo web", "Ingeniería de software", "Inteligencia Artificial"], englishL: "Inglés", english: "B2",
  },
  achievements: {
    label: "Logros",
    items: [
      { t: "Alto desempeño Saber Pro", d: "Resultado destacado en la evaluación nacional de educación superior.", k: "Académico" },
      { t: "Ganador de hackatón universitaria", d: "Primer lugar construyendo una solución funcional bajo presión de tiempo.", k: "Hackatón" },
      { t: "Top 10 en hackatón nacional", d: "Entre los diez mejores equipos a nivel nacional.", k: "Hackatón" },
    ],
  },
  github: {
    num: "06", label: "GitHub", title: "Panel de ingeniería.", placeholder: "Datos en vivo pendientes",
    profile: "Perfil", repos: "Repositorios destacados", langs: "Mezcla de lenguajes", activity: "Actividad", oss: "Open source",
    ossText: "Espacio reservado para contribuciones open source. Se mostrarán cuando estén disponibles.",
    slot: "Slot de repositorio", connect: "Conectar perfil de GitHub", ph: "pendiente", stats: ["Repos", "Estrellas", "Seguidores"],
  },
  services: { num: "07", label: "Qué hago", items: [
    { t: "Desarrollo Full-Stack", d: "Aplicaciones web completas, del modelo de datos a la interfaz." },
    { t: "Backend & APIs", d: "APIs REST claras, seguras y mantenibles." },
    { t: "Frontend", d: "Interfaces rápidas, accesibles y consistentes." },
    { t: "Productos / MVPs y SaaS", d: "Del concepto a una primera versión que se puede usar." },
  ] },
  blog: { num: "08", label: "Blog", title: "Próximamente.", text: "Notas sobre arquitectura, Django, Angular, bases de datos, decisiones técnicas y lecciones aprendidas.", topics: ["Arquitectura", "Django", "Angular", "Full-Stack", "Bases de datos", "Decisiones técnicas"] },
  contact: {
    num: "09", label: "Contacto", title: "Construyamos algo juntos.", text: "¿Tienes un producto, una oportunidad o una idea? Escríbeme.",
    name: "Nombre", email: "Email", message: "Mensaje", send: "Enviar mensaje",
    errName: "Escribe tu nombre.", errEmail: "Escribe un email válido.", errMsg: "El mensaje debe tener al menos 10 caracteres.", ok: "Gracias. Se abrirá tu cliente de correo para enviar el mensaje.", okFallback: "¿No se abrió? Escríbeme directamente a",
  },
  brand: { logo: "Logo", banner: "Banner de marca", bannerAlt: "Logotipo de Cristian Ramirez, Full-Stack Developer" },
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
    num: "02", label: "About", title: "Engineering with product judgment.",
    p1: "I work across frontend and backend with equal care: clear data models, predictable APIs and interfaces that feel simple. I care about building complete products, not isolated pieces.",
    p2: "I’m drawn to software architecture — how today’s decisions shape tomorrow’s maintainability. I prioritize readable code, verifiable quality and a considered user experience.",
    p3: "I have preferred technologies, but my value lies in fundamentals and learning new stacks fast.",
    quote: "Tools change. The ability to build solutions doesn’t.",
    photoAlt: "Black-and-white portrait of Cristian Ramirez",
  },
  stats: [
    { v: "10+", l: "Technologies used" },
    { v: "2", l: "Featured projects" },
    { v: "Full-Stack", l: "Frontend + Backend" },
    { v: "B2", l: "English level" },
  ],
  projects: {
    num: "01", label: "Featured projects", title: "Case studies.",
    problem: "Problem", role: "Role", features: "Key features", stack: "Stack", status: "Status", repo: "Repository", private: "Private / not public", cta: "View Case Study", soon: "Case study coming soon", mock: "Interface mockup",
    origin: "Origin", participation: "My contribution", concepts: "Applied concepts", decision: "Technical decision", demo: "View demo", github: "GitHub", newTab: "(opens in a new tab)",
    items: [
      {
        name: "Wayra Travel", tag: "SaaS · Hospitality Tech · Full-Stack",
        desc: "Multitenant SaaS for centralizing and managing lodging operations from a single platform.",
        origin: "Originally developed from an academic project and later evolved into a SaaS product.",
        problem: "Many properties manage bookings, guests, rooms, payments, inventory and other processes with information scattered across spreadsheets, paper records and disconnected tools, which makes data hard to keep consistent, trace and look up.",
        participation: "Built jointly as part of a two-developer team, contributing across requirements gathering, architecture, data modeling, backend, frontend, authentication and authorization, multitenancy, user experience, testing, documentation and deployment.",
        features: ["Bookings & availability", "Guests & rooms", "Billing, payments & charges", "Services, packages & promotions", "Inventory & expenses", "Reports & operational control", "Property settings", "Notifications"],
        stack: ["Django", "Angular", "PostgreSQL", "Docker"],
        concepts: ["REST", "RBAC", "Multitenancy", "Relational design"],
        decision: { title: "Multitenant isolation", text: "The platform separates data by property to prevent information from crossing organizational boundaries, complementing this isolation with role- and resource-based access control." },
        status: "Testing phase",
        links: WAYRA_LINKS,
        shots: [],
      },
      { name: "UniguajiraTest", tag: "EdTech · Saber Pro", desc: "Preparation and assessment platform for the Saber Pro exams.", problem: "Students lack a structured environment to diagnose and train their skills before the exam.", role: "Full-stack development and experience design.", features: ["Practice & diagnosis", "Skill-based training", "Mock exams", "Feedback & analytics"], stack: ["Django", "Angular", "PostgreSQL"], status: "In development" },
    ] as Project[],
  },
  stack: {
    num: "03", label: "Stack", title: "Organized by domain.",
    principal: "Primary", exp: "Experience",
    groups: [
      { name: "Backend", items: [["Django", "p"], ["Python", "p"], ["ASP.NET Core (.NET)", "e"], ["Node.js", "e"]] },
      { name: "Frontend", items: [["Angular", "p"], ["TypeScript", "p"], ["React", "e"], ["JavaScript", "e"]] },
      { name: "Data", items: [["PostgreSQL", ""], ["MySQL", ""], ["SQL Server", ""]] },
      { name: "Tools", items: [["Docker", ""], ["Git", ""], ["Postman", ""], ["WSL", ""]] },
    ],
    adaptTitle: "Flexible stack. Solid fundamentals.",
    adaptText: "Patterns transfer: HTTP, data modeling, components, state, testing. That’s why I move between frameworks without starting from zero.",
  },
  experience: {
    num: "04", label: "Experience", title: "Where I put it to work.", company: "ALGORITHM S.A.S.", role: "Full-Stack Developer", start: "2026-06-01", present: "Present", current: "Current",
    items: ["Building and maintaining frontend and backend features.", "Designing and consuming APIs and integrating data.", "Debugging, testing and improving code quality.", "Collaborating with the team and iterating on the product."],
    note: "Internal project details remain confidential.",
  },
  education: {
    num: "05", label: "Education & achievements", title: "Academic foundation & results.", degree: "Systems Engineering", school: "Universidad de La Guajira", statusL: "Status", status: "Final stage / tenth semester", interestsL: "Interests",
    interests: ["Software architecture", "Web development", "Software engineering", "Artificial Intelligence"], englishL: "English", english: "B2",
  },
  achievements: {
    label: "Achievements",
    items: [
      { t: "High Saber Pro performance", d: "Outstanding result in Colombia’s national higher-education assessment.", k: "Academic" },
      { t: "University hackathon winner", d: "First place building a working solution under time pressure.", k: "Hackathon" },
      { t: "Top 10 national hackathon", d: "Among the ten best teams nationwide.", k: "Hackathon" },
    ],
  },
  github: {
    num: "06", label: "GitHub", title: "Engineering dashboard.", placeholder: "Live data pending",
    profile: "Profile", repos: "Featured repositories", langs: "Language mix", activity: "Activity", oss: "Open source",
    ossText: "Reserved space for open-source contributions. They’ll appear here once available.",
    slot: "Repository slot", connect: "Connect GitHub profile", ph: "placeholder", stats: ["Repos", "Stars", "Followers"],
  },
  services: { num: "07", label: "What I do", items: [
    { t: "Full-Stack Development", d: "Complete web apps, from data model to interface." },
    { t: "Backend & APIs", d: "Clear, secure, maintainable REST APIs." },
    { t: "Frontend", d: "Fast, accessible, consistent interfaces." },
    { t: "Products / MVPs & SaaS", d: "From concept to a first usable version." },
  ] },
  blog: { num: "08", label: "Blog", title: "Writing soon.", text: "Notes on architecture, Django, Angular, databases, technical decisions and lessons learned.", topics: ["Architecture", "Django", "Angular", "Full-Stack", "Databases", "Tech decisions"] },
  contact: {
    num: "09", label: "Contact", title: "Let’s build something together.", text: "Have a product, an opportunity or an idea? Get in touch.",
    name: "Name", email: "Email", message: "Message", send: "Send Message",
    errName: "Please enter your name.", errEmail: "Please enter a valid email.", errMsg: "Message must be at least 10 characters.", ok: "Thanks. Your email client will open to send the message.", okFallback: "Didn’t open? Email me directly at",
  },
  brand: { logo: "Logo", banner: "Brand banner", bannerAlt: "Cristian Ramirez, Full-Stack Developer logo" },
};

export const dict = { es, en };
export type Dict = typeof es;

export const CONTACT = {
  name: "Cristian Ramirez",
  initials: "CR",
  email: "cristiandanrave@gmail.com",
  linkedin: "https://www.linkedin.com/in/cristian-daniel-ramirez-vega-17783a3b9",
  github: "https://github.com/CrixxCode",
  githubUser: "CrixxCode",
};
