//Lacal Definitions

//Startup Load Local Database
require(['./metro/js/sql.js'], function (module) {
    window.SQLO = module;

        fetch('./database/staticwebstudio.db3').then(res => res.arrayBuffer()).then(arrayBuffer => {
            var uInt8Array = new Uint8Array(arrayBuffer);
            var db = new window.SQL.Database(uInt8Array);

            var res = db.exec("SELECT * FROM HtmlTemplateFileList ORDER BY [Default] DESC");
            let templates = JSON.parse(JSON.stringify(res))[0].values;
            Metro.storage.setItem('HtmlTemplateList', JSON.parse(JSON.stringify(res))[0].values);
            let selector = "";
            templates.forEach(template => { selector += "<option>" + template[1] + "</option>"; });
            Metro.storage.setItem('TemplateSelectorList', selector);

            var res = db.exec("SELECT * FROM ConfigurationList");
            let cfg = JSON.parse(JSON.stringify(res))[0].values;
            Metro.storage.setItem('ConfigurationList', cfg);
            cfg.forEach(config => {
                if (config[1] == "int") { Metro.storage.setItem(config[2], config[3]); }
                else if (config[1] == "bit") { Metro.storage.setItem(config[2], JSON.parse(config[3].toLowerCase())); }
                else { Metro.storage.setItem(config[2], config[3]); }
            });

            var res = db.exec("SELECT * FROM InfoBoxList");
            let infos = JSON.parse(JSON.stringify(res))[0].values;
            Metro.storage.setItem('InfoBoxList', infos);
            infos.forEach(info => {
                if (info[3] == "html") { $("#" + info[1]).html(info[2]); }
                else if (info[3] == "iframe") { $("#" + info[1])[0].srcdoc = info[2]; }
            });

            var res = db.exec("SELECT * FROM StartPanelList ORDER BY [Group] ");
            let tools = JSON.parse(JSON.stringify(res))[0].values;
            Metro.storage.setItem('StartPanelToolsList', infos);
            let prevGroup = null; let htmlcode = ""; panelNumber = 1; let panelIndex = 0;
            tools.forEach((tool) => {

                if (prevGroup == null || prevGroup != tool[2]) {
                    if (prevGroup != null) { panelIndex++; htmlcode += "</div>"; }
                    if (panelNumber < 3 && ((panelIndex) / (3 * panelNumber) == 1)) { $("#startpanel_" + panelNumber.toString()).html(htmlcode); htmlcode = ""; panelNumber = panelNumber + 1; }

                    if (panelNumber < 3) { htmlcode += "<div class='tiles-grid tiles-group size-2 fg-white' data-group-title='" + tool[2] + "'>"; }
                    else { htmlcode += "<div class='tiles-grid size-7 fg-white zoom-12' data-group-title='" + tool[2] + "'>"; }
                }
                if (panelNumber < 3) {
                    htmlcode += "<div data-role='tile' onclick=\"RegisterStaticFrameWindow('" + tool[3] + "','" + tool[1] + "','" + tool[4] + "','" + tool[5] + "')\" class='bg-cyan fg-white shadowed'><span class='mif-" + tool[4] + " icon' data-role='hint' data-hint-position='top' data-hint-text='" + tool[6] + "'></span><span class='branding-bar'></span><span class='badge-bottom'>" + tool[3] + "</span></div>";
                } else {
                    htmlcode += "<div data-role='tile' data-size='small' onclick=\"RegisterStaticFrameWindow('" + tool[3] + "','" + tool[1] + "','" + tool[4] + "','" + tool[5] + "')\" class='bg-cyan fg-white shadowed'><span class='branding-bar'></span><span class='badge-bottom'>" + tool[3] + "</span></div>";
                }

               

                prevGroup = tool[2];
            }); $("#startpanel_" + panelNumber.toString()).html(htmlcode);
            //$("#StartPanelAreas").html(htmlcode);

            ShowNotify("Načtení Dat z Databáze Proběhlo Úspěšně", "Info");
        }).catch((er) => { ShowNotify("Načtení Šablon z Databáze se Nezdařilo\n" + er, "error"); });

});




