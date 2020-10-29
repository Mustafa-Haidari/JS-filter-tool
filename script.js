// Get elements
const subjects = Array.from(document.querySelectorAll(".div1 input"));
const yearLvlsParent = document.getElementById("yearLevel");
const yearLvls = Array.from(document.querySelectorAll(".div2 select#yearLevel option"));
const descriptions = Array.from(document.querySelectorAll(".div3 label input"));
const inputs = document.querySelectorAll(".div3 input");
const currDivs = document.querySelectorAll(".curriculum > .subject .contentDiv");
const currDivsCards = document.querySelectorAll(".curriculum > .subject .container-field.contentDiv .card");
const clearFilter = document.querySelector('.theFiltering .row form');
const clearFilterBtn = document.querySelector('.theFiltering .clearFilterBtn');
const hiddenDivContent = document.querySelectorAll('.hiddenDivs .hiddenContent');
const expandDivs = document.querySelectorAll('.hiddenDivs .expandTitle');
const theTitle = document.getElementById("theTitle");
const currWrap = document.querySelector(".currWrap");
const printBtn = document.querySelector(".printBtn");
const separatedDivs = document.querySelectorAll(".border-around .separatedDivs");


function printPageArea(areaID) {
	var printContent = document.getElementById(areaID);
	var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
	WinPrint.document.write('<link rel="stylesheet" type="text/css" href="https://mustafa-haidari.github.io/JS-filter-tool/style.css">');
	WinPrint.document.write('<link rel="stylesheet" type="text/css" href="https://mustafa-haidari.github.io/JS-filter-tool/style2.css">');
	WinPrint.document.write('<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
	WinPrint.document.write(printContent.innerHTML);
	WinPrint.document.write('<script src="https://mustafa-haidari.github.io/JS-filter-tool/script2.js"></script>');
	WinPrint.document.title = "Curriculum - " + forPrintTitle;
	WinPrint.document.close();
	WinPrint.focus();
}


// x element on cards
const closeCard = document.createElement("span");
closeCard.innerHTML = "X";
closeCard.setAttribute("class", "closeCardsBtn")
currDivsCards.forEach((currCard) => {
	currCard.appendChild(closeCard.cloneNode(true))
})
const xCardBtn = document.querySelectorAll(".closeCardsBtn");
xCardBtn.forEach((closeCardBtn) => {
	closeCardBtn.addEventListener("click", (e) => {
		e.target.parentElement.classList.add("hideCardDisplay")
	})
})

// x separatedDivs on cards
const closeSeparatedDivs = document.createElement("span");
closeSeparatedDivs.innerHTML = "X";
closeSeparatedDivs.setAttribute("class", "closeSeparatedBtn");
separatedDivs.forEach((theSeparated) => {
	theSeparated.appendChild(closeSeparatedDivs.cloneNode(true))
})
const xSeparatedBtn = document.querySelectorAll(".closeSeparatedBtn");
xSeparatedBtn.forEach((closeSeparatedBtn) => {
	closeSeparatedBtn.addEventListener("click", (e) => {
		e.target.parentElement.classList.add("separatedDivsDisplay")
	})
})


// reset expanded containers
function hideAllExpanded() {
	hiddenDivContent.forEach(currCards => {
		currCards.classList.remove("showHiddenContent");
	});
}

// disable next levels
function disableNext() {
	yearLvls.forEach((yearLvl) => {
		yearLvl.setAttribute('disabled', true)
	})
	descriptions.forEach((desc) => {
		desc.setAttribute('disabled', true)
	})
}
disableNext()

//remove display
function removeDisplay() {
	currDivs.forEach((thisDiv) => {
		thisDiv.classList.remove("displayThis");
	})
}

//remove display
function deselectRadio() {
	subjects.forEach((subject) => {
		subject.checked = false;
	})
}

// reset title
function resetTitle() {
	theTitle.innerHTML = " ";
}

// reset closed cards
function resetClosedCards() {
	xCardBtn.forEach((closeCardBtn) => {
		var parentthing = closeCardBtn.parentElement;
		parentthing.classList.remove("hideCardDisplay")
	})
}

// reset closed separatedDivs
function resetSeparatedDivs() {
	separatedDivs.forEach((resetIt) => {
		resetIt.classList.remove("separatedDivsDisplay")
	})
}

function disableYearLvl() {
	yearLvls.forEach((yearLvl) => {
		yearLvl.setAttribute('disabled', true)
	})
}

function disableChecklist() {
	descriptions.forEach((desc) => {
		desc.setAttribute('disabled', true)
	})
}

function unselectYearLvl() {
	yearLvls.forEach((yearLvl) => {
		yearLvl.selected = false;
	})
}

function uncheckChecklist() {
	descriptions.forEach((desc) => {
		desc.checked = false;
	})
}

// ==========================================

// clear selected filters with button
clearFilterBtn.addEventListener('click', (e) => {
	deselectRadio();
	removeDisplay();
	unselectYearLvl();
	uncheckChecklist();
	disableYearLvl();
	disableChecklist();
	resetTitle();
	resetClosedCards();
	hideAllExpanded();
	resetSeparatedDivs();
})


// Save the values to the dataset
yearLvls.forEach((yearLvl) => {
	yearLvl.dataset.defaultValue = yearLvl.value;
});
descriptions.forEach((desc) => {
	desc.dataset.defaultValue = desc.name;
})

// ==========================================

// toggle hidden content
expandDivs.forEach(expandDiv => {
	expandDiv.addEventListener("click", (e) => {
		if (e.target.classList.contains("expandTitle")) {
			const testing = e.target.parentElement.lastElementChild;
			testing.classList.toggle("showHiddenContent")
		}
	})
});

// ==========================================

// Add on click listeners to Subjects
subjects.forEach((subject) => {
	subject.addEventListener("click", (e) => {
		var subjectValue = e.target.value;
		yearLvls.forEach((yrLvl) => {
			yrLvl.value = subjectValue + "-" + yrLvl.dataset.defaultValue;
			yrLvl.removeAttribute('disabled');
			removeDisplay();
			unselectYearLvl();
			uncheckChecklist();
			resetTitle();
			resetClosedCards();
			hideAllExpanded();
		});
	});
});

// year level event
var forPrintTitle;
yearLvlsParent.addEventListener("change", (e) => {
	var yearLvlValue = e.target.value;
	var thething = yearLvlValue;
	forPrintTitle = theTitle.innerHTML = yearLvlValue.replace(/-/g, ' ');
	descriptions.forEach((desc) => {
		desc.removeAttribute('disabled');
		desc.name = yearLvlValue + "-" + desc.dataset.defaultValue;
		removeDisplay();
		uncheckChecklist();
		resetClosedCards()
		hideAllExpanded();
	})
})

// display the data
inputs.forEach((checkbox) => {
	checkbox.addEventListener("click", (e) => {
		currDivs.forEach((c) => {
			if (e.target.checked == true) {
				if (c.dataset.category === e.target.name) {
					c.classList.add("displayThis")
				}
			} else if (e.target.checked !== true && c.dataset.category === e.target.name) {
				c.classList.remove("displayThis")
			}
		});
	})
})