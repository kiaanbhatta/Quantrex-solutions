const WHATSAPP = '9779848460294';

window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 650);
});

document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modal = document.getElementById('orderModal');
const modalTitle = document.getElementById('modalTitle');
const customerName = document.getElementById('customerName');
const customerNote = document.getElementById('customerNote');
let selectedPlan = '';

document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedPlan = btn.dataset.plan;
    modalTitle.textContent = selectedPlan;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => customerName.focus(), 80);
  });
});
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('modalSend').addEventListener('click', () => {
  const name = customerName.value.trim() || 'A customer';
  const note = customerNote.value.trim() || 'I would like to discuss this package.';
  const message = `Hello Quantrex Solutions!%0A%0AName: ${encodeURIComponent(name)}%0APackage: ${encodeURIComponent(selectedPlan)}%0AProject details: ${encodeURIComponent(note)}%0A%0AI'd like to get started.`;
  closeModal();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => { window.open(`https://wa.me/${WHATSAPP}?text=${message}`, '_blank', 'noopener'); }, 250);
  setTimeout(() => toast.classList.remove('show'), 2600);
});



/* =========================================================
   PREMIUM QUANTREX LOADER
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("premium-loader");
    const progress = document.getElementById("loaderProgress");
    const percent = document.getElementById("loaderPercent");
    const status = document.getElementById("loaderStatus");

    if (!loader) return;

    document.body.classList.add("loading");

    let value = 0;

    const interval = setInterval(() => {

        value += Math.floor(Math.random() * 12) + 8;

        if (value >= 100) {
            value = 100;
            clearInterval(interval);

            progress.style.width = "100%";
            percent.textContent = "100%";
            status.textContent = "WELCOME TO QUANTREX";

            setTimeout(() => {
                loader.classList.add("loader-hidden");

                document.body.classList.remove("loading");
                document.body.style.overflow = "";

                setTimeout(() => {
                    loader.remove();
                }, 700);

            }, 250);
        }

        progress.style.width = value + "%";
        percent.textContent = value + "%";

        if (value < 30) {
            status.textContent = "INITIALIZING SYSTEM";
        } else if (value < 55) {
            status.textContent = "LOADING QUANTREX";
        } else if (value < 80) {
            status.textContent = "PREPARING EXPERIENCE";
        } else if (value < 100) {
            status.textContent = "ALMOST READY";
        }

    }, 90);
});


// const WHATSAPP = "9779848460294";

// const loader = document.getElementById("loader");

// window.addEventListener("load", () => {
//     requestAnimationFrame(() => {
//         setTimeout(() => {
//             loader.classList.add("done");
//         }, 250);
//     });
// });


// /* Footer year */
// const year = document.getElementById("year");

// if (year) {
//     year.textContent = new Date().getFullYear();
// }


// /* Mobile menu */
// const menuToggle = document.getElementById("menuToggle");
// const navLinks = document.getElementById("navLinks");

// if (menuToggle && navLinks) {

//     menuToggle.addEventListener("click", () => {

//         const open = navLinks.classList.toggle("open");

//         menuToggle.classList.toggle("active", open);

//         menuToggle.setAttribute(
//             "aria-expanded",
//             String(open)
//         );
//     });

//     navLinks.querySelectorAll("a").forEach(link => {

//         link.addEventListener("click", () => {

//             navLinks.classList.remove("open");
//             menuToggle.classList.remove("active");

//             menuToggle.setAttribute(
//                 "aria-expanded",
//                 "false"
//             );
//         });

//     });
// }


// /* Scroll reveal — desktop only */
// if (window.matchMedia("(min-width: 701px)").matches) {

//     const observer = new IntersectionObserver(
//         entries => {

//             entries.forEach(entry => {

//                 if (entry.isIntersecting) {

//                     entry.target.classList.add("visible");

//                     observer.unobserve(entry.target);
//                 }

//             });

//         },
//         {
//             threshold: 0.08
//         }
//     );

//     document
//         .querySelectorAll(".reveal")
//         .forEach(element => observer.observe(element));
// }


// /* Order modal */
// const modal = document.getElementById("orderModal");
// const modalTitle = document.getElementById("modalTitle");
// const customerName = document.getElementById("customerName");
// const customerNote = document.getElementById("customerNote");

// let selectedPlan = "";


// document.querySelectorAll(".order-btn").forEach(button => {

//     button.addEventListener("click", () => {

//         selectedPlan = button.dataset.plan;

//         modalTitle.textContent = selectedPlan;

//         modal.classList.add("open");

//         modal.setAttribute("aria-hidden", "false");

//         customerName.focus();
//     });

// });


// function closeModal() {

//     modal.classList.remove("open");

//     modal.setAttribute("aria-hidden", "true");
// }


// document.getElementById("modalClose")
//     .addEventListener("click", closeModal);


// modal.querySelector(".modal-backdrop")
//     .addEventListener("click", closeModal);


// document.addEventListener("keydown", event => {

//     if (event.key === "Escape") {
//         closeModal();
//     }

// });


// /* WhatsApp order */
// document.getElementById("modalSend")
//     .addEventListener("click", () => {

//         const name =
//             customerName.value.trim() ||
//             "A customer";

//         const note =
//             customerNote.value.trim() ||
//             "I would like to discuss this package.";

//         const message =
//             `Hello Quantrex Solutions!%0A%0A` +
//             `Name: ${encodeURIComponent(name)}%0A` +
//             `Package: ${encodeURIComponent(selectedPlan)}%0A` +
//             `Project details: ${encodeURIComponent(note)}%0A%0A` +
//             `I'd like to get started.`;

//         closeModal();

//         window.open(
//             `https://wa.me/${WHATSAPP}?text=${message}`,
//             "_blank",
//             "noopener"
//         );
//     });