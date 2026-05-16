document.addEventListener("DOMContentLoaded", () => {
    
    const todosOsPlanos = [
        "AMIL", "APUB", "ASFEB", "ASSEFAZ", "ASSEBA", "ASTEBA", "BANCO CENTRAL", 
        "CAMED", "CAPESAÚDE", "CASEMBRAPA", "CASSI", "CASSEB", "CODEVASF", 
        "CONAB", "FACHESF", "FUSEX", "GAMA SAÚDE", "GEAP SAÚDE", "HOSPITAL NAVAL", 
        "LIFE EMPRESARIAL", "NORDESTE SAUDE", "POSTAL SAÚDE", "PASA", 
        "PLANO HOSPITALAR", "PETROBRAS AMS", "PLAN ASSIST", "PLANSERV", 
        "PORTO SEGURO", "PROSOCIAL", "SAÚDE CAIXA", "SELECT", "SEPACO", 
        "TELOS", "TRT5", "UNAFISCO", "VALE DO RIO DOCE"
    ];

    const planosSalvador = [
        "AMIL", "BRADESCO", "TRT5", "UNIMED SEGUROS", "SULAMÉRICA", "CENTRAL NACIONAL UNIMED", "GAMA SAÚDE",
    ];

    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    const header = document.getElementById("navbar");
    const modal = document.getElementById("convenios-modal");
    const btnsOpenModal = document.querySelectorAll(".open-modal-btn");
    const btnCloseModal = document.querySelector(".close-btn");
    const modalTitle = document.getElementById("modal-title");
    const searchInput = document.getElementById("search-convenio");
    const conveniosContainer = document.getElementById("convenios-list");

    function renderizarPlanos(lista) {
        conveniosContainer.innerHTML = ""; 

        const cardParticular = document.createElement("div");
        cardParticular.className = "convenio-card";
        cardParticular.style.background = "var(--primary-green)";
        cardParticular.style.color = "white";
        cardParticular.textContent = "PARTICULAR";
        conveniosContainer.appendChild(cardParticular);

        lista.sort().forEach(plano => {
            const card = document.createElement("div");
            card.className = "convenio-card";
            card.textContent = plano;
            conveniosContainer.appendChild(card);
        });
    }

    mobileBtn.addEventListener("click", () => navLinks.classList.toggle("active"));
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("active"));
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.85)";
            header.style.boxShadow = "none";
        }
    });

    btnsOpenModal.forEach(btn => {
        btn.addEventListener("click", () => {
            const clinica = btn.getAttribute("data-clinica");
            modalTitle.innerText = `Planos Aceitos - ${clinica}`;
            
            if (clinica === "Clínica Salvador") {
                renderizarPlanos(planosSalvador);
            } else {
                renderizarPlanos(todosOsPlanos);
            }

            modal.style.display = "block";
            document.body.style.overflow = "hidden"; 
            searchInput.value = ""; 
        });
    });

    const fecharModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };
    btnCloseModal.addEventListener("click", fecharModal);
    window.addEventListener("click", (e) => { if (e.target == modal) fecharModal(); });

    searchInput.addEventListener("input", function(e) {
        const termoBusca = e.target.value.toLowerCase();
        const cards = conveniosContainer.querySelectorAll(".convenio-card");
        cards.forEach(card => {
            const nome = card.textContent.toLowerCase();
            card.style.display = nome.includes(termoBusca) ? "block" : "none";
        });
    });

    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -20px 0px" };
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    document.querySelectorAll('.reveal').forEach(reveal => revealOnScroll.observe(reveal));
});