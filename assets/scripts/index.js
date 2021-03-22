const $form = document.querySelector('#form-set-password');
const $password = document.querySelector('#password');
const $confirm_password = document.querySelector('#confirmpassword');
const $loading = document.querySelector('#loading');
// const _URL_SERVER = 'http://localhost:3000/api';
const _URL_SERVER = 'https://vicon-api.herokuapp.com/api';
let _HOST_ID;
let _HOST_TOKEN = '0f4ac2645d797acbc65e036042006904364ed2a8a4ec0348c6e67c7204ff197b';

const $div_success = document.querySelector('#success');
const $div_error = document.querySelector('#error');
const $lottie = document.querySelector('#lottie');

(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  _HOST_ID = urlParams.get('_id');
  $div_success.style.display = 'none';
  $div_error.style.display = 'none';
  $lottie.style.display = 'none';
  bodymovin.loadAnimation({
    container: document.getElementById('lottie2'),
    path: './assets/static/logo.json',
    renderer: 'svg/canvas/html',
    loop: true,
    autoplay: true,
  });
  setTimeout(() => {
    $loading.style.display = 'none';
  }, 1500);
})();

$form.addEventListener('submit', e => {
  e.preventDefault();
  $password.value != $confirm_password.value ? dontMatch() : activeAccount($password.value);
});

const activeAccount = async password => {
  document.querySelector('.logo').setAttribute('hidden', true);
  document.querySelector('#form-set-password').setAttribute('hidden', true);
  document.querySelector('#title').setAttribute('hidden', true);
  $lottie.style.display = 'block';

  bodymovin.loadAnimation({
    container: document.getElementById('lottie'),
    path: './assets/static/logo.json',
    renderer: 'svg/canvas/html',
    loop: true,
    autoplay: true,
  });
  const data = {
    password,
    mobile_access_enable: true,
  };
  await axios
    .put(`${_URL_SERVER}/auth-host/activate/${_HOST_ID}?token=${_HOST_TOKEN}`, data)
    .then(() => {
      $form.reset();
      setTimeout(() => {
        $div_success.style.display = 'block';
        $lottie.style.display = 'none';
      }, 1000);
    })
    .catch(e => {
      $div_error.style.display = 'block';
      $lottie.style.display = 'none';
      console.log(e);
    });
};

const dontMatch = () => {
  $confirm_password.classList.add('error_input');
  $confirm_password.addEventListener('input', e => {
    e.target.value === $password.value ? $confirm_password.classList.remove('error_input') : null;
  });
};
