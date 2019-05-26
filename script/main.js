function addFullscreenButton()
{
	document.getElementsByClassName("dweet-actions")[0].innerHTML
  += `<a style="border: 0px; margin: 0px; margin-left: 10px; padding: 0px;" class="dweet-option fullscreen-button" href="javascript:;" target="_blank">fullscreen</a>`
}
addFullscreenButton()
