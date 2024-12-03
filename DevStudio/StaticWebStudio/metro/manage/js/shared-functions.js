
//Function for  Mermaid Data to Graphics Conversion
async function Mermaid() { try { await mermaid.run({ nodes: document.querySelectorAll('.class-mermaid'), }); } catch (err) { } }

//Function for Highlighting Code Segments
function HighlightCode() { document.querySelectorAll('div.code').forEach(el => { hljs.highlightElement(el); }); }

function ScrollToTop() { window.scrollTo(0, 0); }
function enableScroll() { window.onscroll = function () { }; }
function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        window.onscroll = function () { window.scrollTo(scrollLeft, scrollTop); };
}

function str2bytes(str) {
    var bytes = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

//Load Metro
async function LoadMetro() {
    const pathCss = './metro/css/metro-all.min.css';
    //const pathThemeCss = './metro/css/schemes/sky-net.css';
    const pathJs = './metro/js/metro.4.5.2.min.js?v=4.5.2';

    const dataCss = await fetch(pathCss).then((r) => r.text());
    //const dataThemeCss = await fetch(pathThemeCss).then((r) => r.text());

    const myFont = new FontFace('metro', "url('./metro/mif/metro.svg') format('svg'), url('./metro/mif/metro.woff') format('woff'), url('./metro/mif/metro.ttf') format('truetype')");
    await myFont.load(); document.fonts.add(myFont);

    const dataJs = await fetch(pathJs).then((r) => r.text())

    const style = document.createElement("style")
    style.textContent = dataCss
    document.querySelector("head").appendChild(style)

    //style.textContent = dataThemeCss
    //document.querySelector("head").appendChild(style)

    new Function(dataJs)();
    Metro.init();
    Metro.toast.create("Metro 4 did loaded successful!", { showTop: true, clsToast: "success" });
    $("#a1").accordion()
}

//Unload Metro 
function UnloadMetro() {
    delete Metro;
}

