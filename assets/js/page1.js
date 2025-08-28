// Load and process student data
fetch('data/students_data.json')
  .then(res => res.json())
  .then(data => {
    // Just assign, no recalculation
    students = data;
  })
  .catch(err => console.error(err));

// Form handling (unchanged)
form.addEventListener('submit', e => {
  e.preventDefault();

  if (grecaptcha.getResponse().length === 0) {
    errorEl.textContent = 'Please complete the CAPTCHA.';
    errorEl.classList.remove('hidden');
    return;
  }

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

  errorEl.classList.add('hidden');
  document.getElementById('name').textContent = student.Name;
  document.getElementById('specialization').textContent = student.Specialization;
  document.getElementById('sgpa1').textContent = student.SGPA1.toFixed(2);
  document.getElementById('sgpa2').textContent = student.SGPA2.toFixed(2);
  document.getElementById('sgpa3').textContent = student.SGPA3.toFixed(2);
  document.getElementById('sgpa4').textContent = student.SGPA4.toFixed(2);
  document.getElementById('cgpa').textContent = student.CGPA.toFixed(2);
  document.getElementById('rank').textContent = student.Rank;

  result.classList.remove('hidden');

  spinner.classList.add('hidden');
  btnText.textContent = 'Lookup';
});
