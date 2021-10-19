/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/




/**
 * Define Global Variables
 * 
*/


let nav = document.querySelector('#navbar__list');
let sections = document.querySelectorAll('section');
let header = document.querySelector('header');

const addsectionbutton = document.querySelector('#btn');
const scrolltotop = document.querySelector('#top');

var isScrolling;
let isScrolled = false;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description
* Automatically add a new section depending how many sections we already have, as the follow
* Clone the latest section and change attributes values
* Insert the cloned element after the last element
* Also, it add a new item in the navigation bar 
* @constructor
* @param 
*/

function AddNewSection() {
    var idValue = `section${sections.length + 1}`;
    var dataNavVal = `Section ${sections.length + 1}`;

    var cln = sections[sections.length - 1].cloneNode(true);
    cln.setAttribute('id', idValue);
    cln.setAttribute('data-nav', dataNavVal);
    cln.querySelector('h2').innerText = dataNavVal;

    sections[sections.length - 1].insertAdjacentElement('afterend', cln);

    // Add new navigation item
    let newElem = CreateNavItem(dataNavVal, idValue);
    nav.appendChild(newElem);

    //Re-assign the variable sections after adding the element
    sections = document.querySelectorAll('section');

    window.clearTimeout( isScrolling );
}

/**
* @description Check if the element in the viewport or not
* @constructor
* @param {HTMLElement} element: The element we need to check
* @returns {boolean} Does the element located in the viewport or not
*/
function isLocatedInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


/**
* @description Create the element that should be inserted as navigation item
* @constructor
* @param {string} datanav: Value for the data-nav attribute
* @param {string} id: Value for id attribute
* @returns {HTMLElement}: The element that should be added in the navigation list 
*/

function CreateNavItem(datanav, id) {
    let newElem = document.createElement('li');
    newElem.style.cssText = 'float:left;';

    let newA = document.createElement('a');
    newA.style.cssText = 'display:block; padding:8px; background-color:#dddddd';
    newA.innerText = datanav;
    newA.setAttribute('href', `#${id}`);
    newA.setAttribute('data-nav', id);
    newElem.appendChild(newA)
    return newElem;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav



const wrapper = document.createDocumentFragment();
sections.forEach((section) => {
    let newElem = CreateNavItem(section.getAttribute('data-nav'), section.getAttribute('id'));
    wrapper.appendChild(newElem);
});

nav.appendChild(wrapper);


// Add class 'active' to section when near top of viewport


window.addEventListener('scroll', () => {
    sections.forEach(element => {
        if (isLocatedInViewport(element)) {
            element.classList.add('your-active-class');
            let activeLink = nav.querySelector(`[data-nav=${element.id}]`);
            activeLink.classList.add("active-link");
        }
        else {
            element.classList.remove('your-active-class');
            let activeLink = nav.querySelector(`[data-nav=${element.id}]`);
            activeLink.classList.remove("active-link");
        }
    });
    
    scrolltotop.style.visibility = window.scrollY >= 400 ? "visible" : "hidden";

    //Condition to prevent changing display throughout all scrolls while its already displayed.
    //Kind of optimization
    if (!isScrolled) {
        header.style.display = 'block';
        isScrolled = true;
    }

    // Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {
		// Run the callback
        isScrolled = false;
        header.style.display = 'none';
	}, 5000);
});




// Scroll to anchor ID using scrollTO event

nav.addEventListener('click', (event) => {
    event.preventDefault();
    window.clearTimeout( isScrolling );
    if (event.target.getAttribute('data-nav')) {
        document
            .getElementById(`${event.target.getAttribute('data-nav')}`)
            .scrollIntoView({ behavior: "smooth" });
    }
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

scrolltotop.addEventListener('click', () => {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
});

addsectionbutton.addEventListener('click', AddNewSection);


// Build menu 

// Scroll to section on link click

// Set sections as active


