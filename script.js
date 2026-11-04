
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // TRADUÇÕES
  // =====================================

  const translations = {
    en: {
      navHome: "Home",
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Projects",
      navPublications: "Publications",
      navContact: "Contact",

      heroEyebrow: "SOFTWARE DEVELOPER / SALVADOR, BRAZIL",
      heroRole: "Backend Developer · C# · .NET",
      heroDescription:
        "Software development and artificial intelligence. " +
        "Turning real-world problems into technology solutions.",
      exploreProjects: "Explore projects",
      downloadCV: "Download résumé",

      aboutNumber: "01 / ABOUT",
      aboutTitle: "A little about me.",
      aboutLead:
        "I'm a software developer with a bachelor's degree in " +
        "Computer Science, currently pursuing postgraduate studies " +
        "in Software Engineering with Agile Methods.",
      aboutP1:
        "I worked as a .NET developer at the Public Prosecutor's " +
        "Office of the State of Bahia (2024–2025), building backend " +
        "solutions with C#, .NET 6, SQL Server, Entity Framework " +
        "Core, and NHibernate.",
      aboutP2:
        "I developed an automation service integrated with Active " +
        "Directory via LDAP and an administrative module in ASP.NET " +
        "WebForms. I also used Angular, GitLab, and CI/CD on " +
        "projects at MPBA.",
      aboutP3:
        "Beyond backend development, I explore artificial " +
        "intelligence, computer vision, and IoT through projects " +
        "and academic research.",

      education: "EDUCATION",
      educationValue: "Computer Science",
      experience: "EXPERIENCE",
      experienceValue: "Public Prosecutor's Office of Bahia",
      location: "LOCATION",
      locationValue: "Salvador, Brazil",

      skillsNumber: "02 / EXPERTISE",
      skillsTitle: "Technologies & tools.",
      aspStudies: "ASP.NET Core and MVC (studies)",
      toolsTitle: "Tools & AI",
      dockerLearning: "Docker (learning)",

      projectsNumber: "03 / WORK",
      projectsTitle: "Selected projects.",
      projectsIntro:
        "Backend development, computer vision, web applications, " +
        "and the Internet of Things.",

      // TASKFLOW
      taskflowCategory: "BACKEND / REST API / PERSONAL PROJECT",
      taskflowDescription:
        "Backend API for managing users and projects, " +
        "developed with C# and ASP.NET Core. " +
        "Organized into API, application, and infrastructure " +
        "layers, with data persistence and authentication " +
        "implementation in progress.",

      // WALLEYE AI
      walleyeCategory:
        "ARTIFICIAL INTELLIGENCE / COMPUTER VISION",
      walleyeDescription:
        "A project for detecting cracks in concrete structures " +
        "using YOLOv8n-seg, PyTorch, and Raspberry Pi 5. " +
        "My contributions included designing the solution and " +
        "training the AI model; the web platform was developed " +
        "collaboratively.",

      viewRepository: "View repository",

      // QUALIDADE DO AR
      airCategory: "INTERNET OF THINGS / EMBEDDED SYSTEMS",
      airTitle: "Air Quality Monitoring",
      airDescription:
        "An IoT project using ESP8266 and gas sensors to " +
        "classify air quality and send readings to cloud " +
        "services, including ThingSpeak.",

      // PSICOCONNECT
      webCategory: "WEB DEVELOPMENT",
      psicoDescription:
        "A web platform simulating psychological care, with " +
        "multiple user roles, specialties, and real-time " +
        "messaging via Firebase.",

      // AUTOMAÇÃO MPBA
      automationCategory: "BACKEND / AUTOMATION / MPBA",
      automationTitle: "Automated Account Deactivation Service",
      automationDescription:
        "A .NET 6 Worker Service that deactivates accounts of " +
        "interns and volunteers with expired contracts. It checks " +
        "for other active affiliations and integrates with Active " +
        "Directory via LDAP, Entity Framework Core, and SQL Server.",
      automationNote:
        "Developed during my internship at MPBA; " +
        "no public repository is available.",

      // PUBLICAÇÕES
      publicationsNumber: "04 / RESEARCH",
      publicationsTitle: "Academic publications.",
      publicationsIntro:
        "Research on artificial intelligence and " +
        "structural monitoring.",

      conapecTitle:
        "Structural Crack Recognition Using Artificial " +
        "Intelligence with Raspberry Pi",
      conapecDescription:
        "Research abstract presented at II CONAPEC 2025 " +
        "and published in the conference proceedings " +
        "in February 2026.",
      computerVision: "Computer Vision",
      conapecLink: "Read publication (DOI)",

      siintecDescription:
        "Research presented in a poster session at the " +
        "XII International Symposium on Innovation and " +
        "Technology (SIINTEC), SENAI CIMATEC, in 2026.",
      siintecLink: "View conference paper",

      // CONTATO E RODAPÉ
      contactNumber: "05 / CONTACT",
      contactTitle1: "Let's build",
      contactTitle2: "something together?",
      contactDescription:
        "I'm open to software development opportunities, " +
        "especially backend roles using C# and .NET.",
      email: "Email",
      downloadCVPDF: "Download résumé (PDF)",

      footerBuilt: "Built with HTML, CSS, and JavaScript.",
      backToTop: "Back to top ↑"
    }
  };

  // =====================================
  // ELEMENTOS
  // =====================================

  const root = document.documentElement;

  const botaoMenu = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav");

  const linksMenu = document.querySelectorAll(
    '.nav a[href^="#"]'
  );

  const secoes = document.querySelectorAll(
    "main section[id]"
  );

  const botoesIdioma = document.querySelectorAll(
    ".lang-btn"
  );

  const botaoTema = document.querySelector(
    ".theme-toggle"
  );

  // Guarda os textos originais em português.
  const textosOriginais = {};

  document.querySelectorAll("[data-i18n]").forEach((elemento) => {
    const chave = elemento.dataset.i18n;

    if (!(chave in textosOriginais)) {
      textosOriginais[chave] = elemento.textContent.trim();
    }
  });

  // =====================================
  // ARMAZENAMENTO SEGURO
  // =====================================

  const storage = {
    get(chave) {
      try {
        return localStorage.getItem(chave);
      } catch {
        return null;
      }
    },

    set(chave, valor) {
      try {
        localStorage.setItem(chave, valor);
      } catch {
        // O site continua funcionando.
      }
    }
  };

  // =====================================
  // PREFERÊNCIAS INICIAIS
  // =====================================

  const idiomaSalvo = storage.get("portfolio-language");

  let idioma = ["pt", "en"].includes(idiomaSalvo)
    ? idiomaSalvo
    : navigator.language.toLowerCase().startsWith("pt")
      ? "pt"
      : "en";

  const temaSalvo = storage.get("portfolio-theme");

  let tema = ["light", "dark"].includes(temaSalvo)
    ? temaSalvo
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  // =====================================
  // ALTERAR IDIOMA
  // =====================================

  function aplicarIdioma(novoIdioma) {
    idioma = novoIdioma;

    root.lang = idioma === "pt" ? "pt-BR" : "en";

    document.querySelectorAll("[data-i18n]").forEach((elemento) => {
      const chave = elemento.dataset.i18n;

      const traducao = idioma === "en"
        ? translations.en[chave]
        : textosOriginais[chave];

      if (traducao !== undefined) {
        elemento.textContent = traducao;
      }
    });

    botoesIdioma.forEach((botao) => {
      const ativo = botao.dataset.lang === idioma;

      botao.classList.toggle("active", ativo);
      botao.setAttribute("aria-pressed", String(ativo));
    });

    document.title = idioma === "pt"
      ? "Rodrigo Abade | Desenvolvedor Backend .NET"
      : "Rodrigo Abade | .NET Backend Developer";

    const metaDescricao = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescricao) {
      metaDescricao.content = idioma === "pt"
        ? "Rodrigo Abade — Desenvolvedor Backend .NET. Projetos em C#, inteligência artificial e IoT."
        : "Rodrigo Abade — .NET Backend Developer. Projects in C#, artificial intelligence, and IoT.";
    }

    document.querySelectorAll("a[download]").forEach((link) => {
      link.title = idioma === "pt"
        ? "Baixar currículo em português (PDF)"
        : "Download résumé in Portuguese (PDF)";
    });

    atualizarRotulos();

    storage.set("portfolio-language", idioma);
  }

  // =====================================
  // ALTERAR TEMA
  // =====================================

  function aplicarTema(novoTema) {
    tema = novoTema;

    root.dataset.theme = tema;

    const escuro = tema === "dark";

    if (botaoTema) {
      const icone = botaoTema.querySelector(".theme-icon");

      if (icone) {
        icone.textContent = escuro ? "☀" : "☾";
      }

      botaoTema.setAttribute(
        "aria-pressed",
        String(escuro)
      );
    }

    const metaTema = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (metaTema) {
      metaTema.content = escuro
        ? "#171c1a"
        : "#f5f4f0";
    }

    atualizarRotulos();

    storage.set("portfolio-theme", tema);
  }

  // =====================================
  // RÓTULOS ACESSÍVEIS
  // =====================================

  function atualizarRotulos() {
    const menuAberto = menu?.classList.contains("menu-open");

    if (botaoMenu) {
      botaoMenu.setAttribute(
        "aria-label",
        menuAberto
          ? idioma === "pt" ? "Fechar menu" : "Close menu"
          : idioma === "pt" ? "Abrir menu" : "Open menu"
      );
    }

    if (botaoTema) {
      const escuro = tema === "dark";

      const rotulo = escuro
        ? idioma === "pt"
          ? "Ativar modo claro"
          : "Switch to light mode"
        : idioma === "pt"
          ? "Ativar modo escuro"
          : "Switch to dark mode";

      botaoTema.setAttribute("aria-label", rotulo);
      botaoTema.setAttribute("title", rotulo);
    }
  }

  // =====================================
  // EVENTOS DOS CONTROLES
  // =====================================

  botoesIdioma.forEach((botao) => {
    botao.addEventListener("click", () => {
      aplicarIdioma(botao.dataset.lang);
    });
  });

  if (botaoTema) {
    botaoTema.addEventListener("click", () => {
      aplicarTema(
        tema === "light" ? "dark" : "light"
      );
    });
  }

  aplicarIdioma(idioma);
  aplicarTema(tema);

  // =====================================
  // MENU MOBILE E TABLET
  // =====================================

  if (botaoMenu && menu) {
    const fecharMenu = () => {
      menu.classList.remove("menu-open");
      botaoMenu.classList.remove("active");

      botaoMenu.setAttribute(
        "aria-expanded",
        "false"
      );

      atualizarRotulos();
    };

    botaoMenu.addEventListener("click", () => {
      const aberto = menu.classList.toggle("menu-open");

      botaoMenu.classList.toggle("active", aberto);

      botaoMenu.setAttribute(
        "aria-expanded",
        String(aberto)
      );

      atualizarRotulos();
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (evento) => {
      if (
        evento.key === "Escape" &&
        menu.classList.contains("menu-open")
      ) {
        fecharMenu();
        botaoMenu.focus();
      }
    });

    document.addEventListener("click", (evento) => {
      if (
        menu.classList.contains("menu-open") &&
        !evento.target.closest(".site-header")
      ) {
        fecharMenu();
      }
    });

    const telaDesktop = window.matchMedia(
      "(min-width: 1025px)"
    );

    telaDesktop.addEventListener("change", (evento) => {
      if (evento.matches) {
        fecharMenu();
      }
    });
  }

  // =====================================
  // SEÇÃO ATIVA NA NAVBAR
  // =====================================

  const atualizarMenu = () => {
    let secaoAtual = secoes[0]?.id;

    secoes.forEach((secao) => {
      const posicao = secao.getBoundingClientRect();

      if (posicao.top <= window.innerHeight * 0.35) {
        secaoAtual = secao.id;
      }
    });

    linksMenu.forEach((link) => {
      const ativo =
        link.getAttribute("href") === `#${secaoAtual}`;

      link.classList.toggle("active", ativo);

      if (ativo) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener(
    "scroll",
    atualizarMenu,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    atualizarMenu
  );

  atualizarMenu();

  // =====================================
  // ANIMAÇÕES AO ROLAR
  // =====================================

  const elementos = document.querySelectorAll(
    ".section-heading, " +
    ".section-body, " +
    ".section-top, " +
    ".skill-group, " +
    ".project, " +
    ".contact-section .container"
  );

  const reduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    "IntersectionObserver" in window &&
    !reduzido
  ) {
    elementos.forEach((elemento) => {
      elemento.classList.add("reveal");
    });

    const observador = new IntersectionObserver(
      (entradas, observer) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observer.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    elementos.forEach((elemento) => {
      observador.observe(elemento);
    });
  }
});
