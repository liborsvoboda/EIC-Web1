import './mirrorsharp.css';
import './index.03f3867e.css';


* {
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
}

body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

nav {
    display: flex;
    font-family: 'Open Sans', sans-serif;
}

    nav ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;
    }

    nav li {
        margin-left: 10px;
    }

a {
    text-decoration: none;
}

    a:hover {
        text-decoration: underline;
    }

.CodeMirror {
    flex-grow: 1;
    margin-top: 10px;
    border: 1px solid #ddd;
}
