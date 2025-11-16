import { imageMap }  from '../lib/assetLoader';

export const projects = [
    {
        id: 1,
        title: "Diabetes Predictor For Females",
        shortDescription: "ML Powered Web app to estimate diabetes risk in women via an intuitive health-metric input form",
        description: `
        <br>
        <p>This application enables female users to input essential health indicators such as Glucose level, BMI, pregnancies, insulin, age and others to receive an estimated probability of diabetes using trained classification model.</p>
        <p>Built with "Python" & "Streamlit", emphasizing accessibility & readability, making health-tech insights available with a clean UI.</p>
        <p>Hosted on Hugging Face Spaces & full source on Github.</p>
        <p>The project demonstrates, front-end integration & real-world data handling.<p/>

        <p>Key Features:</p>
        <ul>
            <li>ML inference in a web interface.</li>
            <li>Real-time feedback based on input metrics.</li>
            <li>Clean layout & mobile-friendly design.</li>
        </ul>
        <br>
        `,
        image: imageMap['diabetes_predictor.png'],
        tags: ["Python", "Streamlit"],
        demoUrl: "https://huggingface.co/spaces/karthi1048/diabetes-predictor-for-females",
        githubUrl: "https://github.com/karthi1048/diabetes-predictor.git",
    },
    {
        id: 2,
        title: "MyKanban",
        shortDescription: "A lightweight, offline-ready Progressive Web App for task management with drag-and-drop & persistent state.",
        description: `
        <br>
        <p>MyKanban is a fully responsive task management application built with React, Tailwind & Vite that function seamlessly as a PWA. It allows users to create, update, move & delete tasks across columns using an drag-and-drop interface.</p>
        <p>This app leverages service workers for offline access & persistent data storage, enabling users to mange tasks even without internet connectivity. It follows a component-driven architecture & efficiently handles nested state management between boards, columns & tasks.</p>
        <p>This project demonstrates practical use react hooks, SWR for state validation, PWA caching strategies making it a strong showcase of front-end engineering & user experience design principles.</p>

        <p>Key features:</p>
        <ul>
            <li>Drag-and-drop task management.</li>
            <li>Offline functionality & local persistence.</li>
            <li>Responsive & installable PWA experience.</li>
            <li>Fast & modular architecture using vite + Tailwind.</li>
        </ul>
        <br>
        `,
        image: imageMap['kanban_pwa.png'],
        tags: ["React", "Tailwind", "Vite SWR"],
        demoUrl: "https://kanban-pwa.netlify.app/",
        githubUrl: "https://github.com/karthi1048/kanban-PWA.git",
    },
    {
        id: 3,
        title: "Render Gallery",
        shortDescription: "a dynamic image gallery built with vanilla JS, Bootstrap, featuring filtering, modals & responsive layout",
        description: `
        <br>
        <p>Render Gallery is an image & video art showcasing application created using plain Javascript and Bootstrap designed for optimal performance & minimal dependencies.</p>
        <p>Users can browse a grid of rendered images & videos, filter by category, share or download them, & toggle modal views.</p>
        <p>This project demonstrates advanced DOM manipulation, event-driven UI, responsive grids & performance-aware rendering --all without relying on large frameworks.</p>
        <p>Hosted via Github pages, it emphasize simple tooling, fast load times & agile development.</p>

        <p>Key feature:</p>
        <ul>
            <li>Category filtering & dynamic gallery updates.</li>
            <li>Modal implementation for enlarged viewing.</li>
            <li>Share & download availability.</li>
            <li>Responsive grid layout with Bootstrap.</li>
            <li>Vanilla JS event handlers & minimal library overhead.</li>
        </ul>
        <br>
        `,
        image: imageMap['render_gallery.png'],
        tags: ["Javascript", "Bootstrap"],
        demoUrl: "https://karthi1048.github.io/render-gallery/",
        githubUrl: "https://github.com/karthi1048/render-gallery.git",
    },
    {
        id: 4,
        title: "2048 Game",
        shortDescription: "A browser-based recreation of the 2048 puzzle game using Javascript, local storage & smooth UI for desktop & mobile.",
        description: `
        <br>
        <p>This project reinvents the popular 2048 game using Javascript, HTML & CSS.</p>
        <p>It supports keyboard arrow keys & touch swipe controls, merges tiles algorithmically, maintains score in local storage & offers responsive interface for desktop & mobile users.</p>
        <p>The architecture showcases game logic using JS Classes, state management, persistence all implemented from scratch.</p>
        <p>Published on Github & playable in the browser, it highlights mastery of interactive UI development & game mechanics.</p>

        <p>Key features:</p>
        <ul>
            <li>Merge logic & tile spawning algorithm.</li>
            <li>Swipe & keyboard controls.</li>
            <li>Score tracking & localStorage.</li>
            <li>Adaptive design and smooth animations.</li>
        </ul>
        <br>
        `,
        image: imageMap['2048_game.png'],
        tags: ["Javascript"],
        demoUrl: "https://karthi1048.github.io/2048/",
        githubUrl: "https://github.com/karthi1048/2048.git",
    },
    {
        id: 5,
        title: "Tic Tac Toe Game",
        shortDescription: "Playful JS-based Tic-Tac-Toe game featuring two-player mode, win detection & an easy-to-read UI.",
        description: `
        <br>
        <p>This compact yet polished game brings back the classic Tic-Tac-Toe experience, implemented with Javascript, HTMl & CSS.</p>
        <p>It offers two-player capability, real-time win/draw detection, board reset functionality.</p>
        <p>The UI stresses clarity & simplicity, making it accessible while demonstrating clean state management & logic flow.</p>
        <p>Deployed on Github pages, this project underscores competency in interactive UI development & programming fundamentals.</p>

        <p>Key features:</p>
        <ul>
            <li>Player move management & turn switching.</li>
            <li>Win/draw detection & visual highlights.</li>
            <li>Responsive layout & mobile-friendly controls.</li>
            <li>Clean modular code structure for ease of learning.</li>
        </ul>
        <br>
        `,
        image: imageMap['tic_tac_toe_game.png'],
        tags: ["Javascript"],
        demoUrl: "https://karthi1048.github.io/Tic-Tac-Toe/",
        githubUrl: "https://github.com/karthi1048/Tic-Tac-Toe.git",
    },
    {
        id: 6,
        title: "Rock Paper Scissors Game",
        shortDescription: "A browser-based Rock-Paper-Scissors game built in Javascript with animations, score tracking & simple UI logic.",
        description: `
        <br>
        <p>This project delivers a polished Rock-Paper-Scissors experience in the browser, using Javascript, CSS & HTML without external frameworks.</p>
        <p>Users choose their option, the computers respond randomly, & the outcome is displayed alongside maintained scores.</p>
        <p>The interface features immediate feedback, emphasizing user-centric design & straightforward logic.</p>
        <p>Hosted online & open-source, it represents how core programming concepts & Ui interaction can be elegantly packaged.</p>

        <p>Key features:</p>
        <ul>
            <li>Randomized computer choice & user selection logic.</li>
            <li>Score tracking.</li>
            <li>Lightweight code & accessible gameplay.</li>
        </ul>
        <br>
        `,
        image: imageMap['rock_paper_scissors_game.png'],
        tags: ["Javascript"],
        demoUrl: "https://karthi1048.github.io/RPS-Project/",
        githubUrl: "https://github.com/karthi1048/RPS-Project.git",
    },
];