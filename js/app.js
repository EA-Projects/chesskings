window.addEventListener('load', function() {      
    if ($('#xdqzweñwq').length) {
        const cfg = {
            "G!312zadsa": "U2FsdGVkX199ibcJETdR++zM/M46vrMmDs+L7fbDAgQ=",
            "FqEXzxf!drt": "U2FsdGVkX198ZMLCCrvE6pR4FvSNWHvgY3tdUZ6atZM="
        };
        const routes = {
            "G!312zadsa": "/gambit.html",
            "FqEXzxf!drt": "/fantasy.html"
        };
        let sess = JSON.parse(localStorage.getItem("__cfg_x9")) || [];
        document.getElementById("loginBtn").addEventListener("click", function(e) {
            e.preventDefault();
            const paxxaqss = document.getElementById("xgDaQeñwXq").value;

            let success = false;
            for (const key in cfg) {
                const encrypted = cfg[key];
                try {
                    const bytes = CryptoJS.AES.decrypt(encrypted, paxxaqss);
                    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                    if (decrypted === "token") {
                        if (!sess.includes(key)) {
                            sess.push(key);
                            localStorage.setItem("__cfg_x9", JSON.stringify(sess));
                        }
                        window.location.href = routes[key];
                        success = true;
                        break;
                    }
                } catch (err) {
                }
            }
            if (!success) {
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
                'https://script.google.com/macros/s/AKfycbzCSHLaHFsrDWEDG7GBOPHRtHarjytI3giK00V2RjdgzKpadU0qChAhZ98qcLnhGQwsEA/exec';
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


