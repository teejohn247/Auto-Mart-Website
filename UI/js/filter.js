const filterContainer = document.getElementById('filter-container');
const filterDdBtn = document.getElementById('filter-dd-btn');

filterDdBtn.addEventListener('click', () => {
  const icons = document.querySelectorAll('#filter-dd-btn i');
  icons.forEach((icon) => {
    // function defined in general.js
    toggleClass(icon, 'hide');
  });
  filterContainer.style.display = filterContainer.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('resize', () => {
	if (window.innerWidth > 800) {
    filterContainer.style.display = 'block';
	} else {
    filterContainer.style.display = 'none';
    filterDdBtn.firstChild.classList.remove('hide');
    filterDdBtn.lastChild.classList.add('hide');
  }
});