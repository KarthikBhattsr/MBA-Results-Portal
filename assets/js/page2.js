// JavaScript for topper-list.html (Filters & Table)
let students2 = [];

// Load and process data
fetch('data/students_data.json')
  .then(res => res.json())
  .then(data => {
    students2 = data.map(s => ({
      ...s,
      CGPA: ((s.SGPA1 + s.SGPA2 + s.SGPA3) / 3),
    }));
    initialRender();
  })
  .catch(err => console.error(err));

const sectionFilter = document.getElementById('section-filter');
const specFilter = document.getElementById('spec-filter');
const tableBody = document.getElementById('table-body');

function renderTable(data) {
  tableBody.innerHTML = '';
  // sort and recalculate rank within filtered set
  data.sort((a, b) => b.CGPA - a.CGPA).forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-green-50 transition';
    tr.innerHTML = `
      <td class="p-3">${s.USN}</td>
      <td class="p-3">${s.Name}</td>
      <td class="p-3">${s.Specialization}</td>
      <td class="p-3">${s.SGPA1.toFixed(2)}</td>
      <td class="p-3">${s.SGPA2.toFixed(2)}</td>
      <td class="p-3">${s.SGPA3.toFixed(2)}</td>
      <td class="p-3">${s.CGPA.toFixed(2)}</td>
      <td class="p-3">${idx + 1}</td>
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
