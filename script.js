// Get elements
const subjects = Array.from(document.querySelectorAll(".div1 input"));
const yearLvlsParent = document.getElementById("yearLevel");
const yearLvls = Array.from(document.querySelectorAll(".div2 select#yearLevel option"));
const descriptions = Array.from(document.querySelectorAll(".div3 label input"));
const inputs = document.querySelectorAll(".div3 input");
const currDivs = document.querySelectorAll(".curriculum > .subject .contentDiv");
const currDivsCards = document.querySelectorAll(".curriculum > .subject .contentDiv .card");
const clearFilter = document.querySelector('.theFiltering .row form')
const clearFilterBtn = document.querySelector('.theFiltering .clearFilterBtn')
const expandDivs = document.querySelectorAll('.hiddenDivs .expandTitle')
const theTitle = document.getElementById("theTitle")

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
		e.target.parentElement.classList.add("toggleCardDisplay")
	})
})


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
function resetTitle(){
	theTitle.innerHTML = " ";
}

// reset closed cards
function resetClosedCards(){
	xCardBtn.forEach((closeCardBtn) => {
		var parentthing = closeCardBtn.parentElement;
		parentthing.classList.remove("toggleCardDisplay")
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
	resetClosedCards()
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
		//		console.log(e.target.preventDefault())
		e.target.parentElement.lastElementChild.classList.toggle("showHiddenContent")
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
			removeDisplay()
			unselectYearLvl();
			uncheckChecklist();
			resetTitle();
			resetClosedCards()
		});
	});
});

// year level event
yearLvlsParent.addEventListener("change", (e) => {
	var yearLvlValue = e.target.value;
	var thething = yearLvlValue;
	theTitle.innerHTML = yearLvlValue.replace(/-/g, ' ');
	descriptions.forEach((desc) => {
		desc.removeAttribute('disabled');
		desc.name = yearLvlValue + "-" + desc.dataset.defaultValue;
		removeDisplay();
		uncheckChecklist();
		resetClosedCards()
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