# OceanWatch-Marine-Pollution-Monitoring-Cleanup-Tracker
🌊 OceanWatch — Using technology to spread awareness about ocean pollution and promote cleaner oceans.
# OceanWatch — Ocean Pollution Awareness Using Technology

OceanWatch is a student project that explores how computer science and digital tools can support ocean-pollution awareness. The website combines an educational research page with a browser-based technology prototype for recording pollution observations and organizing cleanup tasks.

## Project Overview

Ocean pollution is caused by waste such as plastic packaging, discarded fishing gear, and other debris entering marine and coastal environments. OceanWatch presents information about the problem and demonstrates a possible digital workflow for turning pollution observations into cleanup actions.

The project has two main parts:

- **Awareness website (`index.html`)** — introduces ocean pollution, presents visual information and data, explains technology that can help monitor pollution, and describes a pollution-focused timeline and project concept.
- **Technology Lab (`technology.html`)** — lets a user select a pollution photo, enter a waste type and amount, optionally attach the device's location, create a cleanup notification, and manage sample cleanup records.

## Features

### Awareness Website
- Responsive, dark ocean-inspired interface.
- Sections covering the pollution problem, visuals, data, technology, timeline, computer-science concept, team, and project records.
- Animated section reveals, number counters, and a rotating visual slider.
- Navigation between the awareness page and Technology Lab.

### Technology Lab Prototype
- Upload a local image and preview it in the browser.
- Select a waste category and enter an observed amount and unit.
- Use browser geolocation to attach coordinates, with permission.
- Create a cleanup notification based on the entered information.
- View sample pollution records and change their cleanup status.
- See a summary of task statuses and a chart of recorded waste amounts.
- Optionally display a browser notification if permission is granted.

## Built With

- **HTML5** — page structure and content.
- **CSS3** — responsive styling, layout, animations, and visual effects.
- **Vanilla JavaScript** — image preview, form interactions, browser geolocation, notification handling, record updates, counters, and chart rendering.
- **Browser APIs** — File input, Geolocation API, and Notifications API where supported.

No package installation or build step is required.

## Project Structure

```text
ocean watch extra/
├── index.html
├── style.css
├── script.js
├── technology.html
├── technology.css
└── technology.js
```

## How to Run

1. Download or clone this repository.
2. Keep all six files in the same project folder.
3. Open `index.html` in a modern browser to view the awareness website.
4. Select **Technology** in the navigation to open the Technology Lab.

For the most reliable results, run the folder through a local development server (for example, the **Live Server** extension in Visual Studio Code). Browser geolocation and notifications generally require a secure context such as `localhost` or HTTPS, and the browser may ask for permission.

## How to Use the Technology Lab

1. Open `technology.html`.
2. Upload a pollution-related image.
3. Choose the waste type and enter the observed amount and unit.
4. Select the location option and allow browser location access if you want coordinates attached.
5. Create a cleanup notification.
6. Use the records table to change a sample cleanup task's status and save it.
7. Refresh the chart to view the recorded amounts.

## Important Limitations

This project is a **front-end educational prototype**, not a live pollution-monitoring service.

- The photo analysis is simulated: the website does **not** run an AI or computer-vision model to identify waste in an image. The waste category and amount are entered by the user and displayed as a demo classification.
- The cleanup records are sample data stored in JavaScript. Changes are held in page memory and are not saved to a database; reloading the page resets them.
- Creating a cleanup notification updates the page and may trigger a browser notification if permission is granted. It does not contact a real cleanup team or send a server-side alert.
- Location access depends on browser support and the user's permission.
- The sample locations and quantities are illustrative demo records, not verified field measurements or live global statistics. Replace them with properly sourced research or real observations before presenting them as factual results.
- No backend, account system, or external database is connected.

## Future Improvements

- Integrate a trained computer-vision model for waste detection.
- Connect the prototype to a secure backend and database.
- Store observations and cleanup-status changes persistently.
- Add an interactive map with verified field reports.
- Connect alerts to authorized cleanup organizations.
- Add source links and publication dates to research statistics.
- Test accessibility, mobile layouts, and browser compatibility.

## Academic Use

OceanWatch is intended for an educational project connecting **B.Tech Computer Science and Engineering** with **Environmental Studies**. It demonstrates how web development and data presentation can communicate an environmental issue and illustrate a possible reporting workflow.

## Team

Add or update your team members and contributions here before publishing the repository.

## Disclaimer

OceanWatch is an awareness and learning project. It is not an official environmental authority, and its sample records should not be treated as verified environmental data. AI detection, live monitoring, and real-world cleanup coordination are proposed future enhancements unless separately implemented and connected.

## License

No license is currently specified. Add a `LICENSE` file if you want to define how others may use, modify, and distribute this project.
