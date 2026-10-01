/* =========================================
   HOSPITAL MANAGEMENT SYSTEM
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item[data-page]");
    const pages = document.querySelectorAll(".page");

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");

    const patientModal = document.getElementById("patientModal");
    const appointmentModal = document.getElementById("appointmentModal");

    const patientForm = document.getElementById("patientForm");
    const appointmentForm = document.getElementById("appointmentForm");

    const toast = document.getElementById("toast");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");

    /* =========================================
       PAGE CONFIGURATION
    ========================================= */

    const pageData = {

        dashboard: {
            title: "Dashboard",
            subtitle: "Hospital overview and daily activities"
        },

        patients: {
            title: "Patients",
            subtitle: "Manage patient records and information"
        },

        doctors: {
            title: "Doctors",
            subtitle: "Manage doctors and their availability"
        },

        appointments: {
            title: "Appointments",
            subtitle: "Schedule and manage patient appointments"
        },

        departments: {
            title: "Departments",
            subtitle: "Hospital departments and patient statistics"
        },

        billing: {
            title: "Billing & Payments",
            subtitle: "Manage hospital invoices and payments"
        },

        pharmacy: {
            title: "Pharmacy",
            subtitle: "Medicine inventory and stock management"
        },

        staff: {
            title: "Staff",
            subtitle: "Hospital staff and employee management"
        },

        reports: {
            title: "Reports",
            subtitle: "Hospital analytics and reports"
        }

    };


    /* =========================================
       PAGE NAVIGATION
    ========================================= */

    function openPage(pageName) {

        if (!pageData[pageName]) {
            return;
        }

        pages.forEach(page => {
            page.classList.remove("active");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        const selectedPage = document.getElementById(pageName);

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        const selectedNav = document.querySelector(
            `.nav-item[data-page="${pageName}"]`
        );

        if (selectedNav) {
            selectedNav.classList.add("active");
        }

        pageTitle.textContent = pageData[pageName].title;
        pageSubtitle.textContent = pageData[pageName].subtitle;

        sidebar.classList.remove("open");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageName = item.dataset.page;

            openPage(pageName);

        });

    });


    /* =========================================
       TEXT LINKS THAT OPEN PAGES
    ========================================= */

    document.querySelectorAll("[data-page-link]").forEach(button => {

        button.addEventListener("click", () => {

            const pageName = button.dataset.pageLink;

            openPage(pageName);

        });

    });


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    document.addEventListener("click", event => {

        if (
            window.innerWidth <= 900 &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            sidebar.classList.remove("open");
        }

    });


    /* =========================================
       MODAL FUNCTIONS
    ========================================= */

    function openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add("show");

        document.body.style.overflow = "hidden";
    }


    function closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        document.body.style.overflow = "";
    }


    document.querySelectorAll("[data-close]").forEach(button => {

        button.addEventListener("click", () => {

            const modalId = button.dataset.close;

            closeModal(
                document.getElementById(modalId)
            );

        });

    });


    document.querySelectorAll(".modal-overlay").forEach(overlay => {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {

                closeModal(overlay);

            }

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            document.querySelectorAll(".modal-overlay.show")
                .forEach(modal => closeModal(modal));

        }

    });


    /* =========================================
       ADD PATIENT
    ========================================= */

    const addPatientBtn = document.getElementById("addPatientBtn");

    if (addPatientBtn) {

        addPatientBtn.addEventListener("click", () => {

            openModal(patientModal);

        });

    }


    /* =========================================
       NEW APPOINTMENT
    ========================================= */

    const newAppointmentBtn =
        document.getElementById("newAppointmentBtn");

    const dashboardAppointmentBtn =
        document.getElementById("dashboardAppointmentBtn");

    if (newAppointmentBtn) {

        newAppointmentBtn.addEventListener("click", () => {

            openModal(appointmentModal);

        });

    }


    if (dashboardAppointmentBtn) {

        dashboardAppointmentBtn.addEventListener("click", () => {

            openPage("appointments");

            setTimeout(() => {
                openModal(appointmentModal);
            }, 250);

        });

    }


    /* =========================================
       PATIENT FORM
    ========================================= */

    if (patientForm) {

        patientForm.addEventListener("submit", event => {

            event.preventDefault();

            const firstName =
                document.getElementById("firstName").value.trim();

            const lastName =
                document.getElementById("lastName").value.trim();

            const age =
                document.getElementById("patientAge").value;

            const gender =
                document.getElementById("patientGender").value;

            const phone =
                document.getElementById("patientPhone").value;

            const department =
                document.getElementById("patientDepartment").value;

            const email =
                document.getElementById("patientEmail").value;

            const fullName =
                `${firstName} ${lastName}`.trim();

            addPatientToTable({
                name: fullName,
                age,
                gender,
                phone,
                department,
                email
            });

            closeModal(patientModal);

            patientForm.reset();

            showToast(
                "Patient Added",
                `${fullName} has been added successfully.`
            );

        });

    }


    /* =========================================
       ADD PATIENT TO TABLE
    ========================================= */

    function addPatientToTable(patient) {

        const table =
            document.querySelector("#patientTable tbody");

        if (!table) {
            return;
        }

        const initials =
            patient.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

        const patientId =
            "#PT-" + Math.floor(10000 + Math.random() * 89999);

        const colors = [
            "pink",
            "blue",
            "green",
            "yellow"
        ];

        const randomColor =
            colors[Math.floor(Math.random() * colors.length)];

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>
                <div class="table-person">

                    <div class="small-avatar ${randomColor}">
                        ${initials}
                    </div>

                    <div>
                        <strong>${escapeHTML(patient.name)}</strong>
                        <span>
                            ${escapeHTML(patient.email || "No email")}
                        </span>
                    </div>

                </div>
            </td>

            <td>${patientId}</td>

            <td>${escapeHTML(patient.age)}</td>

            <td>${escapeHTML(patient.gender)}</td>

            <td>${escapeHTML(patient.department)}</td>

            <td>${escapeHTML(patient.phone)}</td>

            <td>
                <span class="status confirmed">
                    Active
                </span>
            </td>

            <td>
                <button class="action-btn">•••</button>
            </td>

        `;

        table.prepend(row);

    }


    /* =========================================
       APPOINTMENT FORM
    ========================================= */

    if (appointmentForm) {

        appointmentForm.addEventListener("submit", event => {

            event.preventDefault();

            closeModal(appointmentModal);

            appointmentForm.reset();

            showToast(
                "Appointment Scheduled",
                "The appointment has been scheduled successfully."
            );

        });

    }


    /* =========================================
       PATIENT SEARCH
    ========================================= */

    const patientSearch =
        document.getElementById("patientSearch");

    if (patientSearch) {

        patientSearch.addEventListener("input", () => {

            const searchTerm =
                patientSearch.value
                    .toLowerCase()
                    .trim();

            const rows =
                document.querySelectorAll("#patientTable tbody tr");

            rows.forEach(row => {

                const text =
                    row.textContent.toLowerCase();

                row.style.display =
                    text.includes(searchTerm)
                        ? ""
                        : "none";

            });

        });

    }


    /* =========================================
       GLOBAL SEARCH
    ========================================= */

    const globalSearch =
        document.getElementById("globalSearch");

    if (globalSearch) {

        globalSearch.addEventListener("keydown", event => {

            if (event.key !== "Enter") {
                return;
            }

            const query =
                globalSearch.value
                    .trim()
                    .toLowerCase();

            if (!query) {
                return;
            }

            const searchablePages = [
                "patients",
                "doctors",
                "appointments",
                "departments",
                "billing",
                "pharmacy",
                "staff",
                "reports"
            ];

            const match =
                searchablePages.find(page => {

                    return page.includes(query);

                });

            if (match) {

                openPage(match);

                showToast(
                    "Search",
                    `Opened ${pageData[match].title}.`
                );

            } else {

                showToast(
                    "Search",
                    `No section found for "${query}".`
                );

            }

        });

    }


    /* =========================================
       ACTION BUTTONS
    ========================================= */

    document.addEventListener("click", event => {

        const actionBtn =
            event.target.closest(".action-btn");

        if (actionBtn) {

            showToast(
                "Patient Options",
                "Patient action menu selected."
            );

        }

    });


    /* =========================================
       LOGOUT
    ========================================= */

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout =
                confirm("Are you sure you want to logout?");

            if (!confirmLogout) {
                return;
            }

            showToast(
                "Logged Out",
                "You have been logged out."
            );

        });

    }


    /* =========================================
       PRINT REPORT
    ========================================= */

    const printReport =
        document.getElementById("printReport");

    if (printReport) {

        printReport.addEventListener("click", () => {

            window.print();

        });

    }


    /* =========================================
       CALENDAR ARROWS
    ========================================= */

    document.querySelectorAll(".calendar-arrow")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "Calendar",
                    "Calendar navigation is ready for backend integration."
                );

            });

        });


    /* =========================================
       GENERIC BUTTON FEEDBACK
    ========================================= */

    document.querySelectorAll(
        ".doctor-card .outline-btn, .report-card .outline-btn"
    ).forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Action",
                "This feature is ready for backend integration."
            );

        });

    });


    /* =========================================
       TOAST
    ========================================= */

    let toastTimer;

    function showToast(title, message) {

        if (!toast) {
            return;
        }

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

    }


    /* =========================================
       SECURITY / HTML ESCAPING
    ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =========================================
       INITIALIZATION
    ========================================= */

    openPage("dashboard");

});
