import Chart from 'chart.js';
import $ from 'jquery';
import Generator from './Generator';
import MainPage from './MainPage';


const mainPage = new MainPage();

mainPage.render();
mainPage.mount();
document.querySelector('.containerForm').style.display = 'none';