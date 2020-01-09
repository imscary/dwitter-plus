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
	editor.innerHTML = `for(c.width|=i=9;z=400,i--;)x.fillRect(z+i*99+S(t)*z,z,50,200)`;
}

function addPercent()
{
	ccount = document.getElementsByClassName("character-count")[0]
	if (ccount.innerText.indexOf("%")==-1)
	{
		ccount.innerHTML+=` ${(Math.round(prelus.value.length/140*1000)/10).toString()}%`;
		ccount.innerHTML+=` tglf:${(Math.round((prelus.value.length-140)/140*1000)/10).toString()}%`;
		ccount.innerHTML+=` ctglf:${(Math.round((prelus.value.length-194)/194*1000)/10).toString()}%`;
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
	addSilentRemixButtons();
	addUncompressionButtons();
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
function refreshDweet()
{
	document.getElementsByClassName("dweet-create-form-title-label")[0].click()
}

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

function addSilentRemixButtons()
{
	da = document.getElementsByClassName("dweet-actions");
	for (o in da)
	{
		m = da[o];
		try
		{
			if (m.innerHTML.split("Silent").length<2 && o > 0) m.innerHTML+=
`<button class='dweet-option' style='color: red; background: #000;' onclick='prelus.value = this.parentElement.parentElement.children[4].children[1].children[1].children[0].value; window.scrollTo({ top: 0, behavior: "smooth" });document.getElementsByClassName("dweet-create-form-title-label")[0].click()'>Silent Remix</button>`;
		}
		catch (e)
		{
			// actually nothing	
		}
	}
}

function addUncompressionButtons() {
	da = document.getElementsByClassName("dweet-actions");
	for (o in da)
	{
		m = da[o];
		try
		{
			if (m.innerHTML.split("Uncompress").length<2 && o > 0) m.innerHTML+=
`<button class='dweet-option' style='color: red; background: #000;' onclick='this.parentElement.parentElement.children[4].children[1].children[1].children[0].value=eval(this.parentElement.parentElement.children[4].children[1].children[1].children[0].value.split("eval").join(""))'>Uncompress</button>`;
		}
		catch (e)
		{
			// actually nothing	
		}
	}
}

// tools
createTool("delete all", `prelus.value=''; refreshDweet()`);
createTool("one line", `tool_OneLine(); refreshDweet()`);
createTool("more lines", `tool_MoreLines(); refreshDweet()`);
createTool("greekify", `tool_Greekify(); refreshDweet()`);
createTool("reverse obfuscate", `tool_RevOb(); refreshDweet()`);
createTool("compress", `tool_Compress(); refreshDweet()`);
createTool("base64 obfuscate", `prelus.value = 'eval(atob\`'+btoa(prelus.value)+'\`)'; refreshDweet()`);
createTool("save code", `localStorage['savedCode'] = prelus.value; refreshDweet()`);
createTool("load code", `prelus.value = localStorage['savedCode']; refreshDweet()`);
createTool("fill until 140", `while(prelus.value.length<140) prelus.value += '/'; refreshDweet()`);
createTool("hide until 140", `while(prelus.value.length<140) prelus.value = '\\r\\n' + prelus.value; refreshDweet()`);
