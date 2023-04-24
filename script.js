import { Planets } from './planets.js';

// Selectors
const navbarLinksWrapper = document.querySelector('.navbar-link-wrapper');
const buttonsContainer = document.querySelector('.buttons-container');
const planetInfo = document.querySelector('.planet-info');
const planetImage = document.querySelector('.overview-image');
const surfacePlanetImage = document.querySelector('.surface-image');
const planetTitle = document.querySelector('.planet-title');
const planetDetail = document.querySelector('.planet-detail');
const wikiLink = document.querySelector('.planet-wikilink');
const menuIcon = document.querySelector('.menu-icon');
const planetsBody = document.querySelector('.planets-wrapper');

const infoData = [
 { header: 'Rotation Time', class: 'rotation' },
 { header: 'Revolution Time', class: 'revolution' },
 { header: 'Radius', class: 'radius' },
 { header: 'Average Temp.', class: 'temperature' },
];

const geologicalFeatures = [
 'Overview',
 'Internal structure',
 'Surface geology',
];

let activePlanet = null;
let isMobileView = false;

const loadPlanet = () => {
 activePlanet = Planets[0];
 createNavbarLinks();
 createPlanetButtons();
 createInfoItems();
 setActivePlanet(activePlanet.name);
 setPlanetInfo('Overview', activePlanet);
};

window.addEventListener('DOMContentLoaded', loadPlanet);
isMobileView = window.innerWidth < 768;

const createNavbarLinks = () => {
 Planets.forEach((planet) => {
  const newLink = document.createElement('li');
  newLink.classList.add('navbar-link', planet.name.toLowerCase());
  planet.name === activePlanet.name ? newLink.classList.add('active') : '';
  newLink.addEventListener('click', () => {
   const currentActiveLink = document.querySelector('.navbar-link.active');
   if (currentActiveLink) {
    currentActiveLink.classList.remove('active');
   }
   setActivePlanet(planet.name);
   setPlanetInfo('Overview', planet);
   if (isMobileView) {
    toggleMenu();
   }
   newLink.classList.add('active');
  });
  newLink.innerHTML = `
    <div class="navbar-box">
      <div class="planet"></div>
      <div class="title">${planet.name}</div>
    </div>
    <div class="arrow-icon">
      <img src="./assets/icon-chevron.svg" alt="arrow">
    </div> 
  `;
  navbarLinksWrapper.appendChild(newLink);
 });
};

const createPlanetButtons = () => {
 geologicalFeatures.forEach((feature, i) => {
  const button = document.createElement('button');
  const featureBtnClassName = feature.split(' ')[1] || feature.split(' ')[0];
  button.classList.add('btn', featureBtnClassName.toLowerCase());
  feature === 'Overview' ? button.classList.add('active') : '';
  button.addEventListener('click', () => {
   const activeButton = document.querySelector('.btn.active');
   if (activeButton) {
    activeButton.classList.remove('active');
   }
   setPlanetInfo(feature, activePlanet);
   button.classList.add('active');
  });

  const span = document.createElement('span');
  span.textContent = ('0' + (i + 1)).slice(-2);

  const btnText = document.createElement('div');
  btnText.classList.add('text');
  const buttonText = document.createTextNode(` ${feature}`);

  button.appendChild(span);
  btnText.appendChild(buttonText);
  button.appendChild(btnText);
  buttonsContainer.appendChild(button);
 });
};

const createInfoItems = () => {
 infoData.forEach((info) => {
  const container = document.createElement('div');
  container.classList.add('info-container');

  const header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = info.header;

  const value = document.createElement('div');
  value.classList.add(info.class, 'value');

  container.appendChild(header);
  container.appendChild(value);
  planetInfo.appendChild(container);
 });
};

const setActivePlanet = (planetName) => {
 const filteredPlanet = Planets.filter((planet) => planet.name === planetName);
 activePlanet = filteredPlanet[0];
 setActivePlanetColor();
 setOverviewPlanetInfo();
 setPlanetImage(activePlanet);
 setDescription(activePlanet);
 setGeneralInfo(activePlanet);
};

const setActivePlanetColor = () => {
 const activePlanetColor = document.querySelector('.planets-container');
 if (activePlanetColor.hasAttribute('id')) {
  activePlanetColor.removeAttribute('id');
 }
 activePlanetColor.setAttribute('id', activePlanet.name.toLowerCase());
};

const setOverviewPlanetInfo = () => {
 const buttons = document.querySelectorAll('.btn');
 buttons.forEach((button) => {
  button.classList.remove('active');
 });
 const overviewButton = document.querySelector('.btn');
 overviewButton.classList.add('active');
};

const setPlanetImage = (planet) => {
 planetImage.src = planet.images.planet;
 surfacePlanetImage.src = planet.images.geology;
};

const setDescription = (planet) => {
 planetTitle.textContent = planet.name;
 planetDetail.textContent = planet.overview.content;
 wikiLink.href = planet.overview.source;
};

const setGeneralInfo = (planet) => {
 const rotationInfo = document.querySelector('.rotation');
 const revolutionInfo = document.querySelector('.revolution');
 const radiusInfo = document.querySelector('.radius');
 const temperatureInfo = document.querySelector('.temperature');
 rotationInfo.textContent = planet.rotation;
 revolutionInfo.textContent = planet.revolution;
 radiusInfo.textContent = planet.radius;
 temperatureInfo.textContent = planet.temperature;
};

const setPlanetInfo = (feature, activePlanet) => {
 switch (feature) {
  case 'Overview':
   planetImage.src = activePlanet.images.planet;
   surfacePlanetImage.style.display = 'none';
   planetDetail.textContent = activePlanet.overview.content;
   wikiLink.href = activePlanet.overview.source;
   break;
  case 'Internal structure':
   planetImage.src = activePlanet.images.internal;
   surfacePlanetImage.style.display = 'none';
   planetDetail.textContent = activePlanet.structure.content;
   wikiLink.href = activePlanet.structure.source;
   break;
  case 'Surface geology':
   planetImage.src = activePlanet.images.planet;
   surfacePlanetImage.style.display = 'block';
   planetDetail.textContent = activePlanet.geology.content;
   wikiLink.href = activePlanet.geology.source;
   break;
  default:
   console.error('Invalid feature: ' + feature);
   break;
 }
};

// Menu icon
const toggleMenu = () => {
 menuIcon.classList.toggle('active');
 navbarLinksWrapper.classList.toggle('active');
 planetsBody.classList.toggle('hide');
};

menuIcon.addEventListener('click', toggleMenu);

const setIsMobileView = () => {
 isMobileView = window.innerWidth < 768;
 if (!isMobileView) {
  menuIcon.classList.remove('active');
  navbarLinksWrapper.classList.remove('active');
  planetsBody.classList.remove('hide');
 }
};

window.addEventListener('resize', setIsMobileView);
