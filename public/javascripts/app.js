;(function() {
  var emailInput = document.getElementById('email');

  emailInput.addEventListener('keydown', handleEmail);

  function handleEmail(e) {
    if (e.which === 13 && e.target.value.length > 2) {
      renderLandline(e.target.value);
    }
  }
})();
