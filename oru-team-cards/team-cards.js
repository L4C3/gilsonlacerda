/* ============================================================
   team-cards.js
   Renders the four-column peacock-card team grid from a data
   array, and re-implements the scroll-reveal behavior that the
   three-column starter markup assumes exists elsewhere in the
   site's shared JS (it ships the class names but no script).
   ============================================================ */

(function () {
  "use strict";

  /* ---------- DATA ----------
     Modeled directly on the directory export. Missing fields are
     left out (not stored as "—") so the render function has one
     clear signal to branch on: presence vs. absence of the key. */
  const TEAM = [
    {
      name: "Maya Chen",
      title: "Lecturer",
      dept: "Department of Art",
      phone: "(918) 555-0142",
      email: "maya.chen@example.edu",
    },
    {
      name: "Bartholomew Throckmorton-Whitfield III",
      title: "Associate Professor of Mechanical and Aerospace Engineering",
      dept: "College of Science, Engineering & Technology",
      phone: "(918) 555-0177",
      email: "bartholomew.throckmorton-whitfield@example.edu",
    },
    {
      name: "James Okafor",
      title: "Resident Assistant",
      dept: "Wesley Residence Hall",
      phone: "(918) 555-0163",
      email: "james.okafor@example.edu",
    },
    {
      name: "Sofía Reyes",
      title: "Adjunct Instructor",
      dept: "Department of Music",
      phone: "(918) 555-0119",
      email: null,
    },
    {
      name: "Daniel Kim",
      title: "Professor",
      dept: "Department of Theology",
      phone: null,
      email: "daniel.kim@example.edu",
    },
    {
      name: "Grace Abara",
      title: "Department Chair",
      dept: "Department of Biology",
      phone: null,
      email: null,
    },
    {
      name: "Robert Williams",
      title: "Director of Undergraduate Admissions & Enrollment Services",
      dept: "Office of Admissions",
      phone: "(918) 555-0188",
      email: "robert.williams@example.edu",
    },
    {
      name: "Li Wei",
      title: "Postdoctoral Research Fellow",
      dept: "Department of Chemistry & Biochemistry",
      phone: "(918) 555-0150",
      email: "li.wei@example.edu",
    },
  ];

  /* Brand-colored initials avatar. Deterministic per name, no
     external headshot/face service dependency — see DECISIONS.md
     for why this was chosen over a random-face placeholder. */
  function avatarUrl(name) {
    const params = new URLSearchParams({
      name: name,
      background: "041E41", // brand-primary-blue
      color: "C39236", // brand-accent-tan
      size: "300",
      "font-size": "0.33",
      bold: "true",
    });
    return "https://ui-avatars.com/api/?" + params.toString();
  }

  function telHref(phone) {
    return "tel:+1" + phone.replace(/[^\d]/g, "");
  }

  function contactListMarkup(person) {
    const rows = [];
    if (person.phone) {
      rows.push(
        '<li><a href="' +
          telHref(person.phone) +
          '">' +
          person.phone +
          "</a></li>"
      );
    }
    if (person.email) {
      rows.push(
        '<li><a href="mailto:' +
          person.email +
          '">' +
          person.email +
          "</a></li>"
      );
    }
    // Deliberately render nothing when both are missing (e.g. Grace
    // Abara) rather than an empty <ul> or an em dash placeholder —
    // see DECISIONS.md.
    return rows.length ? '<ul class="contact-list">' + rows.join("") + "</ul>" : "";
  }

  function cardMarkup(person, index) {
    return (
      '<div class="item">' +
      '<div class="block">' +
      '<div class="image mb-3">' +
      '<img src="' +
      avatarUrl(person.name) +
      '" alt="Photo of ' +
      person.name +
      '" loading="lazy">' +
      "</div>" +
      '<h3 class="name">' +
      person.name +
      "</h3>" +
      '<p class="role">' +
      person.title +
      "</p>" +
      '<p class="dept">' +
      person.dept +
      "</p>" +
      contactListMarkup(person) +
      "</div>" +
      "</div>"
    );
  }

  function render() {
    const grid = document.getElementById("team-grid");
    if (!grid) return;
    grid.innerHTML = TEAM.map(cardMarkup).join("");
  }

  /* ---------- SCROLL REVEAL ----------
     The three-column starter markup ships pre-marked with
     "scroll-reveal is-visible", implying a shared site script
     toggles the visible class on intersection. That script isn't
     part of the starter files, so this reimplements the minimum
     needed for the component to behave the same way standalone. */
  function initScrollReveal() {
    const targets = document.querySelectorAll(".scroll-reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    initScrollReveal();
  });
})();
