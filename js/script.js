// 4) Welcoming speech on Home Page “Hi Name” use JavaScript for fill the “Name”
(function welcomeName() {
  // Ambil nama dari localStorage jika sudah pernah submit form
  const saved = localStorage.getItem('lastName') || '';
  const title = document.getElementById('welcomeTitle');
  if (saved) title.textContent = `Hi ${saved}, Welcome To Website`;
})();

// 5) Validate Form “Message Us” & show value when submit with JavaScript
const form = document.getElementById('contactForm');
const resultList = document.getElementById('resultList');
const currentTime = document.getElementById('currentTime');

function showNow() {
  const now = new Date();
  currentTime.textContent = `Current time: ${now.toLocaleString('id-ID', { hour12: false })}`;
}
showNow();
setInterval(showNow, 60 * 1000); // refresh tiap menit

function validate(formData) {
  const errors = [];

  const name = formData.get('name')?.trim();
  if (!name) errors.push('Nama wajib diisi');

  const dob = formData.get('dob');
  if (!dob) errors.push('Tanggal lahir wajib diisi');

  const gender = formData.get('gender');
  if (!gender) errors.push('Jenis kelamin wajib dipilih');

  const email = formData.get('email')?.trim();
  const emailOk = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$/i.test(email || '');
  if (!email || !emailOk) errors.push('Email tidak valid');

  const phone = formData.get('phone')?.trim();
  const phoneOk = /^0[0-9]{9,13}$/.test(phone || '');
  if (!phone || !phoneOk) errors.push('Nomor HP tidak valid');

  const message = formData.get('message')?.trim();
  if (!message) errors.push('Message wajib diisi');

  return { errors, values: { name, dob, gender, email, phone, message } };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const { errors, values } = validate(fd);

  // Tampilkan error sederhana via alert atau bisa dibuat list di bawah form
  if (errors.length) {
    alert('Periksa data:\n- ' + errors.join('\\n- '));
    return;
  }

  // Simpan nama agar greeting di banner terisi
  localStorage.setItem('lastName', values.name);
  const title = document.getElementById('welcomeTitle');
  title.textContent = `Hi ${values.name}, Welcome To Website`;

  // Tampilkan hasil pada panel kanan
  resultList.innerHTML = `
    <li>Nama: ${values.name}</li>
    <li>Tanggal Lahir: ${values.dob}</li>
    <li>Jenis Kelamin: ${values.gender}</li>
    <li>Email: ${values.email}</li>
    <li>Nomor HP: ${values.phone}</li>
    <li>Message: ${values.message}</li>
    <li id="currentTime">Current time: ${new Date().toLocaleString('id-ID', { hour12: false })}</li>
  `;
});

