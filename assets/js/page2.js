// JavaScript for topper-list.html (Filters & Table)
let students2 = [];

// Load and process data
fetch('data/students_data.json')
  .then(res => res.json())
  .then(data => {
    students2 = data; // use CGPA & Rank directly from JSON
    initialRender();
  })
  .catch(err => console.error(err));

const sectionFilter = document.getElementById('section-filter');
const specFilter = document.getElementById('spec-filter');
const tableBody = document.getElementById('table-body');

function renderTable(data) {
  tableBody.innerHTML = '';
  // keep original ordering by Rank from JSON
  data.sort((a, b) => a.Rank - b.Rank).forEach(s => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-green-50 transition';
    tr.innerHTML = `
      <td class="p-3">${s.USN}</td>
      <td class="p-3">${s.Name}</td>
      <td class="p-3">${s.Specialization}</td>
      <td class="p-3">${s.SGPA1.toFixed(2)}</td>
      <td class="p-3">${s.SGPA2.toFixed(2)}</td>
      <td class="p-3">${s.SGPA3.toFixed(2)}</td>
      <td class="p-3">${s.SGPA4.toFixed(2)}</td>
      <td class="p-3">${s.CGPA.toFixed(2)}</td>
      <td class="p-3">${s.Rank}</td>
    `;
    tableBody.appendChild(tr);
  });
}

function applyFilters() {
  let filtered = [...students2];
  if (sectionFilter.value !== 'all') filtered = filtered.filter(s => s.Section === sectionFilter.value);
  if (specFilter.value !== 'all') filtered = filtered.filter(s => s.Specialization === specFilter.value);
  renderTable(filtered);
}

function initialRender() {
  sectionFilter.addEventListener('change', applyFilters);
  specFilter.addEventListener('change', applyFilters);
  applyFilters();
}
