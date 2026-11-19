const DEBUG = true;
const API_KEY = 'sk_live_FAKE_51Hx0LabOnly0000';   // مفتاح وهمي للتجربة
const $ = id => document.getElementById(id);
let mode = 'login';

const users = () => JSON.parse(localStorage.users || '[{"u":"admin","p":"Admin@123","role":"admin"}]');

document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
  mode = t.dataset.m;
  document.querySelectorAll('.tab').forEach(x => x.classList.toggle('on', x == t));
  $('go').textContent = mode == 'login' ? 'دخول' : 'إنشاء حساب';
  say('');
});

$('f').onsubmit = e => {
  e.preventDefault();
  const u = $('u').value, p = $('p').value, list = users();
  if (DEBUG) console.log('محاولة:', mode, u, p, API_KEY);

  if (mode == 'register') {
    if (list.some(x => x.u == u)) return say('اسم المستخدم مستخدم بالفعل');
    list.push({ u, p, role: $('role').value });
    localStorage.users = JSON.stringify(list);
    return say('تم إنشاء الحساب، سجّل دخولك الآن', 1);
  }

  const x = list.find(x => x.u == u);
  if (!x) return say('المستخدم غير موجود');
  if (x.p != p) return say('كلمة السر غير صحيحة');
  localStorage.session = JSON.stringify(x);
  show(x);
};

function show(x) {
  document.querySelector('main').innerHTML =
    `<h1>أهلاً ${x.u}</h1><p>الصلاحية: ${x.role}</p>` +
    `<p style="color:#e5202c;font-weight:700">مبروك يا حمار لقد اثبت غباءك , الم اقل لك امان متفوق علي فيسبوك</p>` +
    (x.role == 'admin' ? `<p>لوحة الأدمن · مفتاح الـ API: ${API_KEY}</p>` : '') +
    `<button class="out" onclick="localStorage.removeItem('session');location.reload()">خروج</button>`;
}

function say(t, ok) { $('msg').textContent = t; $('msg').className = ok ? 'ok' : ''; }

if (localStorage.session) show(JSON.parse(localStorage.session));
