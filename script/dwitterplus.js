// important constants
const editor = document.getElementById("editor");
const fInterval = 1;

// functions
function addFullscreenButton()
{
	document.getElementsByClassName("dweet-actions")[0].innerHTML
  += `<a style="border: 0px; margin: 0px; margin-left: 10px; padding: 0px;" class="dweet-option fullscreen-button" href="javascript:;" target="_blank">fullscreen</a>`;
}

function changeHeaderText()
{
	document.getElementById("dwitter-header-text").innerHTML += " +";
}

function addCredits()
{
	document.getElementById("settings-list").innerHTML += "<li><a href='https://github.com/kipkat/dwitter-plus'>Dwitter +</a></li>"
}

function newDefault()
{
	editor.innerHTML = `c.width*=1;for(i=9;i--;)x.fillRect(400+i*100+S(t)*300,400,50,200)`;
}

function addPercent()
{
	ccount = document.getElementsByClassName("character-count")[0]
	if (ccount.innerText.indexOf("%")==-1)
	{
		ccount.innerHTML+=` ${(Math.round(prelus.value.length/140*1000)/10).toString()}%`;
	}
}

function addTools()
{
	editorSection = document.getElementsByClassName("dark-section")[0];
	editorSection.innerHTML += '<div id="toolbox"></div>';
	toolBox = document.getElementById("toolbox");
}

function createTool(caption, action, toolStyle = `font-size: 14px; background: #000; color: white; margin: 5px; padding: 2px; border: solid black 1px;`)
{
	toolBox.innerHTML += `<button class='tool button' onclick="${action}" style="${toolStyle}"> ${caption} </button>`;
}

// interval loop
function loop()
{
	addPercent();
}

// small mods execution
addFullscreenButton();
changeHeaderText();
addCredits();
newDefault();
setInterval(loop, fInterval);
addTools();
document.getElementsByClassName("function-wrap")[0].innerHTML = "u=t=> {";

// constants for tools
prelus = document.getElementsByClassName('dweet-code')[0].children[0];

// functions of tools
function tool_OneLine()
{
	prelus.value = prelus.value.split('\n').join(';');
}

function tool_MoreLines()
{
	prelus.value = prelus.value.split(';').join('\n');
}

function tool_Greekify()
{
	prelus.value = prelus.value
		.split("delta").join("Δ")
		.split("pi").join("π")
		.split("phi").join("Φ")
		.split("theta").join("θ")
		.split("epsilon").join("ε")
		.split("lambda").join("λ");
}

function tool_RevOb()
{
	prelus.value = "/*\u202E*/" + prelus.value;
}

function tool_Compress()
{
	// the following function is made by xem
	// https://github.com/xem/obfuscatweet
	compressAscii=function(b,c,a){c="";if(b.length%2)b+=" ";f=String.fromCharCode;for(a=0;b.length>a;a+=2)c+=f(55296+b[e="charCodeAt"](a))+f(56320+b[e](a+1));return c}
	prelus.value = "eval(unescape(escape`" + compressAscii(prelus.value) + "`.replace(/uD./g,'')))";
}

// tools
createTool("delete all", `prelus.value=''`);
createTool("one line", `tool_OneLine()`);
createTool("more lines", `tool_MoreLines()`);
createTool("greekify", `tool_Greekify()`);
createTool("reverse obfuscate", `tool_RevOb()`);
createTool("compress", `tool_Compress()`);
createTool("save code", `localStorage['savedCode'] = prelus.value`);
createTool("load code", `prelus.value = localStorage['savedCode']`);
