window.addEventListener('load', function() {      
    if ($('#password-form').length) {
        // Lista de hashes y páginas asociadas
        const accessMap = {
            "d0c9fbbb5eee8313fd880d191d3259d100da3833f003fe8043a96e147769cf72": "/gambit.html",
            "5b53eed9be94bdfec231517f1a110a3343a5211aa8702a0ea2f90630efd9abb1": "/fantasy.html"
        };

        async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
        }

        // Recuperamos accesos ya guardados (array)
        // 
        let savedAccess = JSON.parse(localStorage.getItem("accessPages")) || [];

        document.getElementById("loginBtn").addEventListener("click", async function(e) {
            e.preventDefault();
            const pass = document.getElementById("password").value;
            const passHash = await hashPassword(pass);

            if (accessMap[passHash]) {
                const page = accessMap[passHash];

                // Si no estaba ya en la lista, lo agregamos
                if (!savedAccess.includes(page)) {
                    savedAccess.push(page);
                    localStorage.setItem("accessPages", JSON.stringify(savedAccess));
                }

                window.location.href = page;
            } else {
                $('.alert-message').fadeIn();
            }
        });
    }


    // Date Picker initializer 
    $(function(){
        $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            duration: "fast"
        });
    }); 

    // Fix navbar when scroll
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $('nav').addClass('scrolled');
        } 
        else {
            $('nav').removeClass('scrolled');
        }
    });

    // Animations
    let animatedElements = new Set(); // Para evitar reanimaciones

    let observer = new IntersectionObserver((entries) => {
        const toAnimate = entries
            .filter(entry => entry.isIntersecting && !animatedElements.has(entry.target))
            .map(entry => entry.target);

        if (toAnimate.length > 0) {
            gsap.to(toAnimate, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.3
            });

            toAnimate.forEach(el => {
                animatedElements.add(el);
                observer.unobserve(el);
            });
        }
    }, {
        threshold: 0.3
    });

    document.querySelectorAll("[data-fade]").forEach((el) => {
        observer.observe(el);
    });


    // Form
    if ($('#waitlist-form').length) {
        $(function () {
            const scriptURL =
                'https://script.google.com/macros/s/AKfycbzYh7a-zZceUqj-V3_grsTBWgK3Dam0cumUPkVV-CDlmkuoKVP7AnLSnUi8o13fkHH7/exec';
            const form = document.getElementById('waitlist-form');
        
            form.addEventListener('submit', (e) => {
                $('#waitlist-form').addClass('disabled');
        
                // Sending status
                $('#waitlist-form').addClass('readonly');
                $('#waitlist-form input.button').val("Sending Information");
        
                e.preventDefault();
        
                // Crear FormData para incluir archivo y otros campos
                const formData = new FormData(form);
        
                fetch(scriptURL, { method: 'POST', body: formData })
                .then((response) => {
                    $('.success-form').addClass('visible');
                    $('#waitlist-form').addClass('readonly');
                    $('.wrapper-reserve-area').addClass('readonly');
                    $('#waitlist-form input.button').val("Submitted");
                })
                .catch((error) => {
                    console.error('Error!', error.message);
                    $('.success-form').removeClass('visible');
                    $('#waitlist-form').removeClass('readonly');
                    $('.wrapper-reserve-area').removeClass('readonly');
                    $('#waitlist-form input.button').val("Submit");
                });
            });
        });
    }
});


