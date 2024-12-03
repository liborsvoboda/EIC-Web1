//Startup
require.config({ paths: { 'vs': './tools/monaco-editor/min/vs' } });
require(['./tools/mermaid/js/mermaid.min.cdn.js'], function (module) { window.mermaid = module; });



//Registration Types
function RegisterStaticWebStudio(codeContent = "") {
    let temp_tool = {
        Id: GetNewIdForRegisterStudio(),
        Name: " Static Web Studio + Online Náhled",
        Icon: "<span class='d-flex mif-creative-commons'> Studio:" + GetNewIdForRegisterStudio() + " </span>",
        InitContent: "<div class='d-flex h-100' >" +
            "<div class='paneheader'>" +
            "<div class='selectbox' ><select onchange=StaticWebStudioSetLanguage(" + GetNewIdForRegisterStudio() + ",this.value) ><option>html</option><option>javascript</option><option>css</option><option>csharp</option><option>sql</option><option>markdown</option></select></div>" +
            "<div class='selectbox' ><select onchange=StaticWebStudioSetTheme(" + GetNewIdForRegisterStudio() + ",this.value) ><option>vs-dark</option><option>vs</option><option>hc-black</option><option>hc-light</option></select></div>" +
            "<div class='selectbox' ><select onchange=StaticWebStudioSetTemplate(" + GetNewIdForRegisterStudio() + ",this.value) >" + Metro.storage.getItem('TemplateSelectorList', null) + "</select></div>" +
            "</div> " +
            "<div id='SourceContainer_" + GetNewIdForRegisterStudio() + "' class= 'h-100' style='width: 50%; border: 1px solid grey' > <div id='SourceContainerLangs_" + GetNewIdForRegisterStudio() + "'></div></div > " +
            "<iframe id='TargetContainer_" + GetNewIdForRegisterStudio() + "' srcdoc='' class='h-100' style='width: 50%; border: 1px solid grey' ></iframe>" +
            "</div>",
        SelectedTemplate: (Metro.storage.getItem('HtmlTemplateList', null) != null ? Metro.storage.getItem('HtmlTemplateList', null)[0][1] : null),
        CodeContent: codeContent,
        SourceToolObject: null,
        TargetToolObject: null,
        UsedTemplateName: Metro.storage.getItem('HtmlTemplateList', null)[0][1],
        InitOnShow: function () {
            require(['vs/editor/editor.main'], function () {
                RegisteredStudioList[RegisteredStudioList.length - 1].SourceToolObject = monaco.editor.create($("#SourceContainer_" + RegisteredStudioList[RegisteredStudioList.length - 1].Id)[0], {
                    value: codeContent, language: 'html', theme: 'vs-dark', automaticLayout: true, fixedOverflowWidgets: true
                });
                if (Metro.storage.getItem('HtmlTemplateList', null) != null) { $("#TargetContainer_" + RegisteredStudioList[RegisteredStudioList.length - 1].Id)[0].srcdoc = Metro.storage.getItem('HtmlTemplateList', null)[0][3]; }
                RegisteredStudioList[RegisteredStudioList.length - 1].SourceToolObject.onDidChangeModelContent(e => { StaticWebStudioRefreshPreview(RegisteredStudioList[RegisteredStudioList.length - 1].Id); });
            });
        }
    };
    RegisteredStudioList.push(temp_tool);
    CreateStudioWindow(temp_tool);
    setTimeout(function () { StaticWebStudioRefreshPreview(RegisteredStudioList[RegisteredStudioList.length - 1].Id); }, 1000);
}


function RegisterStaticFrameWindow(title,taskbarName,icon,url) {
    let temp_tool = {
        Id: GetNewIdForRegisterFrame(),
        Name: title,
        Icon: "<span class='d-flex mif-" + icon + "'> " + taskbarName + ":" + GetNewIdForRegisterFrame() + " </span>",
        Url: url,
        InitContent: "<iframe id='FrameWindow_" + GetNewIdForRegisterFrame() + "' class='w-100 h-100' src='" + url + "' ></iframe>",
    };
    RegisteredFrameList.push(temp_tool);
    OpenFrameWindow(temp_tool);
    ShowHideStartPanel(false);
}






//Global Functions

function GetNewIdForRegisterStudio() { return RegisteredStudioList.length.toString(); }
function GetNewIdForRegisterFrame() { return RegisteredFrameList.length.toString(); }

function UnRegisterStudio(id) { RegisteredStudioList.splice(id, 1); }
function UnRegisterFrame(id) { RegisteredFrameList.splice(id, 1); }

function StaticWebStudioSetTheme(id, theme) { RegisteredStudioList[id].SourceToolObject._themeService.setTheme(theme); }
function StaticWebStudioSetLanguage(id, language) { monaco.editor.setModelLanguage(RegisteredStudioList[id].SourceToolObject.getModel(), language); }
function StaticWebStudioSetTemplate(id, templateName) {
    let templates = Metro.storage.getItem('HtmlTemplateList', null);
    if (templates != null) {
        templates.forEach(template => {
            if (template[1] == templateName) {
                RegisteredStudioList[id].SelectedTemplate = templateName;
                $("#TargetContainer_" + id)[0].srcdoc = template[3];
                //StaticWebStudioRefreshPreview(id);
            }
        });
    }
}
function StaticWebStudioRefreshPreview(id) {
    let template = "<body></body>";let templates = Metro.storage.getItem('HtmlTemplateList', null);
    if (templates != null) { templates.forEach(temp => { if (temp[1] == RegisteredStudioList[id].SelectedTemplate) { template = temp[3]; } }); }
    template = template.split("<body>")[0] + "<body>" + RegisteredStudioList[id].SourceToolObject.getValue() + "</body>" + template.split("</body>")[1];
    $("#TargetContainer_" + id)[0].srcdoc = template;
}


function ShowHideStartPanel(startInit) {
    if (startInit) { $("#StartPanel").show(); }
    else { $("#StartPanel").hide(); }
}


// type: Info,Error,Success
function ShowNotify(message, title) {
    var notify = Metro.notify; notify.setup({ width: 300, timeout: Metro.storage.getItem('NotifyShowTime', null), duration: 500 });
    notify.create(message, title, { cls: title == "Info" ? "" : title == "Success" ? "success" : "alert" }); notify.reset();
}


//Globální funkce Otevření Okna Konzole
function OpenGlobalConsole() {
    if ($("#GlobalConsoleWindow")[0] == undefined) {
        ScrollToTop();
        Metro.window.create({
            id: 'GlobalConsoleWindow', title: "Console", shadow: true, draggable: true, modal: true, clsWindow: "supertop",
            icon: "<span class=\"mif-info\"</span>", btnClose: true, width: '40%', height: 600, place: "center",
            content: "<iframe id=\"GlobalConsole\" src=\"./tools/console/index.html\" style=\"width:100%;height:550px\"></iframe>"
        });
    }
}

//Golbal System Logger Window For Develoer Support
function GlobalConsoleLogWindow(startNow) {
    if ((startNow || Metro.storage.getItem('LoggerEnabled', null) == true) && $("#GlobalConsoleLogWindow")[0] == undefined) {

        Metro.window.create({
            id: 'GlobalConsoleLogWindow', title: "System Logger",
            width: 350, height: 250, clsWindow: "supertop pos-absolute",
            icon: "<span class='mif-windows'></span>",
            content: "<div id=\"log-container\"><pre id=\"log\"></pre></div>",
            draggable: true, shadow: true, modal: false, place: "top-left",
            onShow: function () { window.scrollTo(0, 0); Metro.storage.setItem('LoggerEnabled', true); }, onClose: function () { Metro.storage.setItem("LoggerEnabled", false) },
            clsCaption: "bg-red", dragArea: "#body",
        });

        
        rewireLoggingToElement(() => document.getElementById("log"), () => document.getElementById("log-container"), true);
        function rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll) {
            fixLoggingFunc('log'); fixLoggingFunc('debug'); fixLoggingFunc('warn'); fixLoggingFunc('error'); fixLoggingFunc('info');

            function fixLoggingFunc(name) {
                console['old' + name] = console[name];
                console[name] = function (...arguments) {
                    const output = produceOutput(name, arguments); const eleLog = eleLocator();

                    if (autoScroll) {
                        const eleContainerLog = eleOverflowLocator();
                        const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
                        eleLog.innerHTML += output + "<br>";
                        if (isScrolledToBottom) {
                            eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
                        }
                    } else { eleLog.innerHTML += output + "<br>"; }

                    window.onunhandledrejection = event => {
                        console.warn(`UNHANDLED PROMISE REJECTION: ${(typeof event == "object" ? JSON.stringify(event) : event.reason)}`);
                    };
                    window.onerror = (error) => {
                        console.error(`UNHANDLED ERROR: ${(typeof error == "object" ? JSON.stringify(error) : error.log)}`);
                    };
                    window.onerror = (event, url, line, column, error) => {
                        let msg = ""; msg += error; console.error(error, msg + "\n" + msg + "\n" + url + "\n" + line);
                    };
                };
            }
            function produceOutput(name, args) {
                return args.reduce((output, arg) => {
                    return output + "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" + (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) + "</span>&nbsp;";
                }, '');
            }
        }
        
    } else { Metro.storage.setItem('LoggerEnabled', false); }
}




//Control Translation Panel
function ShowToolPanel(close) {
    $("#UserAutomaticTranslate").val('checked')[0].checked = Metro.storage.getItem('UserAutomaticTranslate', null);
    if (close) { { Metro.bottomsheet.close($('#toolPanel')); } } else {
        if (Metro.bottomsheet.isOpen($('#toolPanel'))) { Metro.bottomsheet.close($('#toolPanel')); }
        else { Metro.bottomsheet.open($('#toolPanel')); }
    }
}