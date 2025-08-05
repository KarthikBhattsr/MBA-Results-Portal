// JavaScript for index.html (USN Lookup)
let students = [];

// Load and process student data
fetch('../data/students_data.json')
  .then(res => res.json())
  .then(data => {
    students = data.map((s, idx) => ({
      ...s,
      CGPA: ((s.SGPA1 + s.SGPA2 + s.SGPA3) / 3),
    }));
    students.sort((a, b) => b.CGPA - a.CGPA);
    students.forEach((s, i) => s.Rank = i + 1);
  })
  .catch(err => console.error(err));

// Form handling
const form = document.getElementById('lookup-form');
const result = document.getElementById('result');
const errorEl = document.getElementById('error');
const btn = document.querySelector('button[type="submit"]');
const spinner = document.getElementById('btn-spinner');
const btnText = document.getElementById('btn-text');

form.addEventListener('submit', e => {
  e.preventDefault();
   // Check reCAPTCHA
  if (grecaptcha.getResponse().length === 0) {
    errorEl.textContent = 'Please complete the CAPTCHA.';
    errorEl.classList.remove('hidden');
    return;
  }

  // Show spinner
  spinner.classList.remove('hidden');
  btnText.textContent = 'Loading...';

  const usn = document.getElementById('usn').value.trim().toUpperCase();
  const student = students.find(s => s.USN.toUpperCase() === usn);

 if (!student) {
    result.classList.add('hidden');
    errorEl.textContent = 'USN not found.';
    errorEl.classList.remove('hidden');
    spinner.classList.add('hidden');
    btnText.textContent = 'Lookup';
    return;
  }

  // Show student info
  errorEl.classList.add('hidden');
  document.getElementById('name').textContent = student.Name;
  document.getElementById('specialization').textContent = student.Specialization;
  document.getElementById('sgpa1').textContent = student.SGPA1.toFixed(2);
  document.getElementById('sgpa2').textContent = student.SGPA2.toFixed(2);
  document.getElementById('sgpa3').textContent = student.SGPA3.toFixed(2);
  document.getElementById('cgpa').textContent = student.CGPA.toFixed(2);
  document.getElementById('rank').textContent = student.Rank;

  result.classList.remove('hidden');

  // Hide spinner
  spinner.classList.add('hidden');
  btnText.textContent = 'Lookup';
});

