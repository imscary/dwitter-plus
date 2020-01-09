// important constants
const editor = document.getElementById("editor");
const fInterval = 1;
const isNews = window.location.pathname=='/news';
const user = document.getElementsByClassName("name")[0].innerText;

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

function addNewsButton() {
	document.getElementsByClassName("top-sort-list")[0].innerHTML+="<li><a href=\"/news\">news</a></li>"
}

function addCredits()
{
	document.getElementById("settings-list").innerHTML += "<li><a href=\"https://github.com/kipkat/dwitter-plus\">Dwitter +</a></li>"
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
	if (!isNews) toolBox.innerHTML += `<button class="tool button" onclick="${action}" style="${toolStyle}"> ${caption} </button>`;
}

// interval loop
function loop()
{
	addPercent();
	addSilentRemixButtons();
	addUncompressionButtons();
}

// small mods execution
changeHeaderText();
addCredits();
if (!isNews) {
	addFullscreenButton();
	newDefault();
	addTools();
	addNewsButton();
	setInterval(loop, fInterval);
	document.getElementsByClassName("function-wrap")[0].innerHTML = "u=t=> {";
}

if (!isNews) {
	// constants for tools
	prelus = document.getElementsByClassName('dweet-code')[0].children[0];
}

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

// notifications & latest news

let latestn = {};
const limit = 100;
let api_ = "https://www.dwitter.net/api/"
let newsBox = document.getElementsByClassName("content-div")[0];

function showLoading() {
	newsBox.innerHTML="<h3>Dwitter +</h3><h1>Loading news...</h1>";
}

if (isNews) {
	console.log("News page");
	showLoading();
	fetch(`${api_}dweets/?limit=${limit}`).then(x=>x.text().then(j=>{
	    latestn["dweets"]=JSON.parse(j);
	    fetch(`${api_}comments/?limit=1`).then(x=>x.text().then(j=>{
	        latestn["ccount"]=JSON.parse(j).count
	        fetch(`${api_}comments/?offset=${latestn.ccount-limit*3}&limit=${limit*3}`).then(x=>x.text().then(j=>{
	            latestn["comments"]=JSON.parse(j)
	            loadNews();
	        }))
	    }))
	}))
}

function hyperlinkify(dweetId) {
	return `<a href="d/${dweetId}">d/${dweetId}</a>`
}

function userify(username) {
	return `<a href="u/${username}">u/${username}</a>`
}

function addNewsItem(item) {
	newsBox.innerHTML += `<p>${item}</p>`
}

function loadNews() {
	madeByYou = [];
	newsBox.innerHTML="<h3>News - generated using Dwitter +</h3>";
	
	// caculate & show most liked recent dweet
	let mostLiked = {awesome_count: 1};
	let yourMostLiked = {awesome_count: 1};
	for (dweet of latestn.dweets.results) {
	    if (dweet.awesome_count > mostLiked.awesome_count) mostLiked=dweet; // select max
	    if (dweet.author.username == user) {
	    	madeByYou.push(dweet.id); // save the ones made by u
	    	if (dweet.awesome_count > yourMostLiked.awesome_count) yourMostLiked = dweet;
	    }
	}
	
	addNewsItem(`Most liked recent dweet: ${hyperlinkify(mostLiked.id)} (has ${mostLiked.awesome_count} likes) made by ${userify(mostLiked.author.username)}`);
	addNewsItem(`Your most liked recent dweet: ${hyperlinkify(yourMostLiked.id)} (has ${yourMostLiked.awesome_count} likes)`);
	
	addNewsItem(`<h4>Your recent comments</h4>`);
	for (commentID = latestn.comments.results.length-1; commentID >= 0; commentID--) {
		let comment = latestn.comments.results[commentID]
		if (madeByYou.indexOf(comment.reply_to)!=-1) { 
			// if it's a reply to your creation
			if (comment.author != user) {
				// and it's not yours
				addNewsItem(`${userify(comment.author)} left a comment on ${hyperlinkify(comment.reply_to)}:
				<br><li>${comment.urlized_text}</li>`)
			}
		}
	}
	
	addNewsItem(`<h4>Recent remixes</h4>`);
	for (dweet of latestn.dweets.results) {
		if (madeByYou.indexOf(dweet.remix_of)!=-1) {
			if (dweet.author.username != user) {
				addNewsItem(`${userify(dweet.author.username)} remixed ${hyperlinkify(dweet.remix_of)}
					-> ${hyperlinkify(dweet.id)}`)
			}
		}
	}
}
