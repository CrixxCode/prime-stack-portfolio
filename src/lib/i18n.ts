export type Lang = "es" | "en";

const es = {
  nav: { home: "Inicio", about: "Sobre mí", experience: "Experiencia", projects: "Proyectos", stack: "Stack", education: "Formación", github: "GitHub", contact: "Contacto", cta: "Hablemos", menu: "Menú", close: "Cerrar", label: "Principal", skip: "Saltar al contenido", switchLang: "Cambiar idioma a inglés", toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro" },
  hero: {
    label: "Full-Stack Developer",
    title: "Construyo productos digitales de principio a fin.",
    sub: "Diseño y desarrollo aplicaciones web modernas, escalables y orientadas a producto — desde la arquitectura y las APIs hasta la interfaz final.",
    stackNote: "Mi stack más fuerte es Django + Angular, pero mi stack es flexible: me adapto rápido a la herramienta que el proyecto necesita.",
    cta: "Hablemos", cta2: "Ver proyectos", status: "Disponible para oportunidades",
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
    { v: "B2", l: "English Level" },
  ],
  projects: {
    num: "01", label: "Proyectos destacados", title: "Casos de estudio.",
    problem: "Problema", role: "Rol", features: "Funciones clave", stack: "Stack", status: "Estado", repo: "Repositorio", private: "Privado / no público", cta: "Ver caso de estudio", soon: "Caso de estudio próximamente", mock: "Maqueta de la interfaz",
    items: [
      { name: "Plataforma de gestión hotelera", tag: "Riohacha · Académico", desc: "Plataforma web full-stack para centralizar la información operativa de hoteles en Riohacha.", problem: "La gestión de reservas, clientes y habitaciones dispersa en hojas de cálculo genera errores y poca visibilidad.", role: "Desarrollo full-stack: modelado de datos, API y frontend.", features: ["Reservas y disponibilidad", "Clientes y habitaciones", "Facturación (concepto)", "Reportes operativos"], stack: ["Django", "Angular", "PostgreSQL"], status: "Caso académico / producto" },
      { name: "UniguajiraTest", tag: "EdTech · Saber Pro", desc: "Plataforma de preparación y evaluación para las pruebas Saber Pro.", problem: "Los estudiantes carecen de un entorno estructurado para diagnosticar y entrenar sus competencias antes del examen.", role: "Desarrollo full-stack y diseño de la experiencia.", features: ["Práctica y diagnóstico", "Entrenamiento por competencias", "Simulacros", "Retroalimentación y analítica"], stack: ["Django", "Angular", "PostgreSQL"], status: "En desarrollo" },
    ],
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
  footer: { tagline: "Diseñado y construido con intención." },
};

const en: typeof es = {
  nav: { home: "Home", about: "About", experience: "Experience", projects: "Projects", stack: "Stack", education: "Education", github: "GitHub", contact: "Contact", cta: "Let’s Talk", menu: "Menu", close: "Close", label: "Main", skip: "Skip to content", switchLang: "Switch language to Spanish", toLight: "Switch to light mode", toDark: "Switch to dark mode" },
  hero: {
    label: "Full-Stack Developer",
    title: "I build digital products end to end.",
    sub: "I design and develop modern, scalable, product-oriented web applications — from architecture and APIs to the final interface.",
    stackNote: "My strongest stack is Django + Angular, but my stack is flexible: I adapt quickly to whatever the project needs.",
    cta: "Let’s Talk", cta2: "View Projects", status: "Open to opportunities",
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
    items: [
      { name: "Hotel management platform", tag: "Riohacha · Academic", desc: "Full-stack web platform to centralize hotel operations data in Riohacha.", problem: "Reservations, clients and rooms scattered across spreadsheets cause errors and poor visibility.", role: "Full-stack development: data modeling, API and frontend.", features: ["Reservations & availability", "Clients & rooms", "Billing (concept)", "Operational reports"], stack: ["Django", "Angular", "PostgreSQL"], status: "Academic / product case" },
      { name: "UniguajiraTest", tag: "EdTech · Saber Pro", desc: "Preparation and assessment platform for the Saber Pro exams.", problem: "Students lack a structured environment to diagnose and train their skills before the exam.", role: "Full-stack development and experience design.", features: ["Practice & diagnosis", "Skill-based training", "Mock exams", "Feedback & analytics"], stack: ["Django", "Angular", "PostgreSQL"], status: "In development" },
    ],
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
  footer: { tagline: "Designed & built with intention." },
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
