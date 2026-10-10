/* ==========================================================
   OceanWatch Technology Lab
   Browser-only prototype.
   ========================================================== */

/* ---------- Small helpers ---------- */

const photoInput = document.getElementById("photoInput");
const previewBox = document.getElementById("previewBox");

const trashType = document.getElementById("trashType");
const detectionMessage = document.getElementById("detectionMessage");

const trashAmount = document.getElementById("trashAmount");
const trashUnit = document.getElementById("trashUnit");
const wasteType = document.getElementById("wasteType");

const analyzeButton = document.getElementById("analyzeButton");

const locationText = document.getElementById("locationText");
const coordinateText = document.getElementById("coordinateText");
const locationButton = document.getElementById("locationButton");

const notificationTitle = document.getElementById("notificationTitle");
const notificationText = document.getElementById("notificationText");
const notificationStatus = document.getElementById("notificationStatus");
const notifyButton = document.getElementById("notifyButton");

let selectedPhotoName = "";
let currentLocation = "Location not recorded";
let currentCoordinates = "—";
let detectedWaste = "Plastic bottles";
let detectedAmount = "0 kg";

/* ---------- Demo location records ---------- */
/*
    These are intentionally labelled demo records.
    Replace the locations and values with your team's
    real field observations before final submission.
*/

const records = [
    {
        location: "Demo Site A — Riverbank",
        waste: "Plastic bottles",
        amount: "6.2 kg",
        photo: "Riverbank",
        status: "In Progress"
    },
    {
        location: "Demo Site B — Beach Zone",
        waste: "Mixed waste",
        amount: "11.5 kg",
        photo: "Beach",
        status: "Done"
    },
    {
        location: "Demo Site C — Drain Outlet",
        waste: "Plastic packaging",
        amount: "4.1 kg",
        photo: "Drain",
        status: "Not Yet Started"
    },
    {
        location: "Demo Site D — Fishing Area",
        waste: "Fishing / rope waste",
        amount: "8.0 kg",
        photo: "Fishing",
        status: "In Progress"
    },
    {
        location: "Demo Site E — Coastal Path",
        waste: "Mixed waste",
        amount: "3.6 kg",
        photo: "Coast",
        status: "Not Yet Started"
    }
];

/* ---------- Image upload ---------- */

photoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) {
        return;
    }

    selectedPhotoName = file.name;

    const imageUrl = URL.createObjectURL(file);

    previewBox.innerHTML = `
        <img src="${imageUrl}" alt="Uploaded pollution evidence">
    `;

    previewBox.classList.add("visible");

    document.getElementById("stepPhoto").textContent = "Ready";
    document.getElementById("stepPhoto").style.color = "#6fe4a8";

    detectionMessage.textContent =
        `${file.name} is ready for the demo detection step.`;
});

/* ---------- Demo trash detection ---------- */

analyzeButton.addEventListener("click", function () {
    if (!selectedPhotoName) {
        detectionMessage.textContent =
            "Please upload a photo before running the detector.";
        return;
    }

    detectedWaste = wasteType.value;

    const amount = Number(trashAmount.value);

    if (amount > 0) {
        detectedAmount = `${amount} ${trashUnit.value}`;
    } else {
        detectedAmount = "Amount not entered";
    }

    trashType.textContent = detectedWaste;

    detectionMessage.textContent =
        `Demo classification complete. Recorded amount: ${detectedAmount}.`;

    document.getElementById("stepTrash").textContent = "Detected";
    document.getElementById("stepTrash").style.color = "#6fe4a8";

    /* Small visual feedback */
    analyzeButton.textContent = "Detection complete ✓";

    setTimeout(function () {
        analyzeButton.textContent = "Analyze photo";
    }, 1600);
});

/* ---------- Browser location ---------- */

locationButton.addEventListener("click", function () {
    if (!navigator.geolocation) {
        locationText.textContent = "Geolocation unavailable";
        return;
    }

    locationText.textContent = "Requesting location…";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            currentLocation = "Current device location";
            currentCoordinates =
                `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

            locationText.textContent = currentLocation;
            coordinateText.textContent = currentCoordinates;

            document.getElementById("stepLocation").textContent = "Attached";
            document.getElementById("stepLocation").style.color = "#6fe4a8";
        },

        function () {
            currentLocation = "Location permission denied";
            currentCoordinates = "—";

            locationText.textContent = currentLocation;
            coordinateText.textContent = currentCoordinates;
        }
    );
});

/* ---------- Cleanup notification ---------- */

notifyButton.addEventListener("click", function () {
    if (!selectedPhotoName) {
        notificationStatus.textContent =
            "Upload a photo first.";
        return;
    }

    if (currentLocation === "Location not recorded") {
        notificationStatus.textContent =
            "Add a location first.";
        return;
    }

    notificationTitle.textContent =
        `Cleanup required at ${currentLocation}`;

    notificationText.textContent =
        `${detectedWaste} detected (${detectedAmount}). ` +
        `A cleanup task has been created for this location.`;

    notificationStatus.textContent =
        "Cleanup notification created ✓";

    notificationStatus.style.color = "#6fe4a8";

    document.getElementById("stepNotify").textContent = "Created";
    document.getElementById("stepNotify").style.color = "#6fe4a8";

    /*
        Browser notifications require permission.
        If permission is allowed, we also show a real
        browser notification.
    */
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            new Notification("OceanWatch cleanup alert", {
                body: `${detectedWaste} detected at ${currentLocation}.`
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    new Notification("OceanWatch cleanup alert", {
                        body: `${detectedWaste} detected at ${currentLocation}.`
                    });
                }
            });
        }
    }
});

/* ---------- Records table ---------- */

function statusClass(status) {
    if (status === "Done") {
        return "status-done";
    }

    if (status === "In Progress") {
        return "status-progress";
    }

    return "status-not-started";
}

function renderRecords() {
    const tableBody = document.getElementById("recordsBody");

    tableBody.innerHTML = "";

    records.forEach(function (record, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${record.location}</strong>
            </td>

            <td>
                ${record.waste}
            </td>

            <td>
                ${record.amount}
            </td>

            <td>
                <div class="record-photo" title="${record.photo}">
                    ${record.photo.slice(0, 1)}
                </div>
            </td>

            <td>
                <select class="status-select ${statusClass(record.status)}">
                    <option ${record.status === "Done" ? "selected" : ""}>
                        Done
                    </option>

                    <option ${record.status === "In Progress" ? "selected" : ""}>
                        In Progress
                    </option>

                    <option ${record.status === "Not Yet Started" ? "selected" : ""}>
                        Not Yet Started
                    </option>
                </select>
            </td>

            <td>
                <button class="button secondary record-save">
                    Save
                </button>
            </td>
        `;

        const statusSelect = row.querySelector(".status-select");
        const saveButton = row.querySelector(".record-save");

        statusSelect.addEventListener("change", function () {
            statusSelect.className =
                `status-select ${statusClass(statusSelect.value)}`;
        });

        saveButton.addEventListener("click", function () {
            records[index].status = statusSelect.value;

            saveButton.textContent = "Saved ✓";

            updateSummary();
            renderChart();

            setTimeout(function () {
                saveButton.textContent = "Save";
            }, 1200);
        });

        tableBody.appendChild(row);
    });

    updateSummary();
}

function updateSummary() {
    const done = records.filter(
        record => record.status === "Done"
    ).length;

    const inProgress = records.filter(
        record => record.status === "In Progress"
    ).length;

    const notStarted = records.filter(
        record => record.status === "Not Yet Started"
    ).length;

    document.getElementById("recordCount").textContent =
        records.length;

    document.getElementById("doneCount").textContent =
        done;

    document.getElementById("progressCount").textContent =
        inProgress;

    document.getElementById("notStartedCount").textContent =
        notStarted;
}


/* ---------- Live record chart ---------- */

function renderChart() {
    const chart = document.getElementById("barChart");

    if (!chart) {
        return;
    }

    chart.innerHTML = "";

    const numericRecords = records.map(function (record) {
        const amount = parseFloat(record.amount);

        return {
            ...record,
            numericAmount: Number.isNaN(amount) ? 0 : amount
        };
    });

    const maximumAmount = Math.max(
        ...numericRecords.map(record => record.numericAmount),
        1
    );

    numericRecords.forEach(function (record) {
        const bar = document.createElement("div");
        bar.className = "chart-bar";

        const height = Math.max(
            (record.numericAmount / maximumAmount) * 210,
            8
        );

        bar.innerHTML = `
            <span class="chart-bar-value">
                ${record.amount}
            </span>

            <div
                class="chart-bar-fill"
                style="height: ${height}px"
                title="${record.location}: ${record.amount}"
            ></div>

            <span class="chart-bar-label">
                ${record.location.replace("Demo Site ", "Site ")}
            </span>

            <span class="chart-bar-status">
                ${record.status}
            </span>
        `;

        chart.appendChild(bar);
    });
}

document.getElementById("chartRefresh")?.addEventListener(
    "click",
    function () {
        renderChart();
    }
);


/* ---------- Custom cursor ---------- */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", function (event) {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;

    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, select, input, .upload-area")
    .forEach(function (element) {
        element.addEventListener("mouseenter", function () {
            cursorRing.classList.add("active");
        });

        element.addEventListener("mouseleave", function () {
            cursorRing.classList.remove("active");
        });
    });

/* ---------- Start the page ---------- */

renderRecords();
renderChart();
