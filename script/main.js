// important constants
editor = document.getElementById("editor")

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
	document.getElementById("settings-list").innerHTML += "<li><a style='color: red;' href='kipkat'>Dwitter +</a></li>"
}

function newDefault()
{
	editor.innerHTML = `c.width*=1;for(i=9;i--;)x.fillRect(400+i*100+S(t)*300,400,50,200)`
}

// execution
addFullscreenButton();
changeHeaderText();
addCredits();
newDefault();
