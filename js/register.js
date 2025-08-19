document.addEventListener('DOMContentLoaded', function() {
  const steps = Array.from(document.querySelectorAll('.wizard-step'));
  const indicators = Array.from(document.querySelectorAll('.steps-indicator .step'));
  let currentStep = 1;

  function showStep(stepNumber) {
    steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === stepNumber));
    indicators.forEach(i => i.classList.toggle('active', Number(i.dataset.step) === stepNumber));
    currentStep = stepNumber;
  }

  // Step 1: choose account type
  const accountButtons = document.querySelectorAll('.account-type-card');
  const profileButtons = document.querySelectorAll('.profile-card');
  const accountTypeInput = document.getElementById('accountType');
  const userRoleInput = document.getElementById('userRole');
  const toStep2Btn = document.getElementById('toStep2');
  const selectionSummary = document.getElementById('selectionSummary');
  const step1Error = document.getElementById('step1Error');
  accountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      accountButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const type = btn.getAttribute('data-type');
      accountTypeInput.value = type;
      updateStep1UI();
    });
  });

  profileButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      profileButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      userRoleInput.value = btn.getAttribute('data-role');
      updateStep1UI();
    });
  });

  toStep2Btn?.addEventListener('click', () => {
    // Validate both role and account type
    if (!userRoleInput.value || !accountTypeInput.value) {
      if (step1Error) step1Error.hidden = false;
      return;
    }
    // Adjust form for entreprise/bailleur
    const isEntreprise = accountTypeInput.value === 'entreprise';
    const isBailleur = userRoleInput.value === 'bailleur';
    document.querySelectorAll('.entreprise-only').forEach(el => el.hidden = !isEntreprise);
    document.querySelectorAll('.bailleur-only').forEach(el => el.hidden = !isBailleur);
    const title = document.getElementById('infoTitle');
    if (title) {
      title.textContent = isEntreprise ? 'Informations de l’entité' : 'Vos informations';
    }
    showStep(2);
  });

  function updateStep1UI() {
    const role = userRoleInput.value;
    const type = accountTypeInput.value;
    toStep2Btn.disabled = !(role && type);
    if (selectionSummary) {
      if (role || type) {
        selectionSummary.hidden = false;
        const roleLabel = role === 'bailleur' ? 'Bailleur' : role === 'locataire' ? 'Locataire' : '—';
        const typeLabel = type === 'entreprise' ? 'Personne morale' : type === 'particulier' ? 'Personne physique' : '—';
        selectionSummary.textContent = `Sélection: ${roleLabel} — ${typeLabel}`;
      } else {
        selectionSummary.hidden = true;
      }
    }
    if (step1Error) step1Error.hidden = true;
  }

  // Generic next/prev handlers
  document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => showStep(currentStep + 1)));
  document.querySelectorAll('[data-prev]').forEach(btn => btn.addEventListener('click', () => showStep(currentStep - 1)));

  // Step visibility for documents depending on account type
  function updateDocsVisibility() {
    const type = accountTypeInput.value;
    const docsPart = document.querySelector('.docs-particulier');
    const docsEnt = document.querySelector('.docs-entreprise');
    if (!docsPart || !docsEnt) return;
    if (type === 'particulier') {
      docsPart.hidden = false;
      docsEnt.hidden = true;
    } else if (type === 'entreprise') {
      docsPart.hidden = true;
      docsEnt.hidden = false;
    }
  }

  // When entering step 3, adjust docs
  const toStep4 = document.getElementById('toStep4');
  if (toStep4) {
    // Intercept to validate and then go to step 4
    toStep4.addEventListener('click', () => {
      // Minimal validation for uploads based on type
      const type = accountTypeInput.value;
      const role = userRoleInput.value;
      let valid = true;
      if (type === 'particulier') {
        // At least one of CNI or Passport
        const cni = document.getElementById('cni');
        const pass = document.getElementById('passport');
        if ((!cni || cni.files.length === 0) && (!pass || pass.files.length === 0)) {
          alert('Veuillez ajouter la CNI ou le Passeport.');
          valid = false;
        }
      } else if (type === 'entreprise') {
        const rccm = document.getElementById('rccm');
        const ifu = document.getElementById('ifu');
        if (!rccm || rccm.files.length === 0 || !ifu || ifu.files.length === 0) {
          alert('Veuillez ajouter le RCCM et l’IFU.');
          valid = false;
        }
      }
      // Bailleur optional guidance
      if (role === 'bailleur') {
        // No hard requirement, but we can suggest RIB if missing
        const rib = document.getElementById('rib');
        if (rib && !rib.value) {
          console.log('Suggestion: renseigner le RIB pour accélérer les versements.');
        }
      }
      if (!valid) return;
      showStep(4);
      // Simulate server validation
      const loading = document.getElementById('confirmationLoading');
      const content = document.getElementById('confirmationContent');
      setTimeout(() => {
        if (loading) loading.style.display = 'none';
        if (content) content.hidden = false;
        if (window.launchConfetti) window.launchConfetti();
      }, 1600);
    });
  }

  // Navigate to step 3 reveals proper docs
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(updateDocsVisibility, 0);
    });
  });

  // File preview helpers
  function createPreviewItem(file) {
    const container = document.createElement('div');
    container.className = 'preview-item';
    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      container.appendChild(img);
    } else {
      const icon = document.createElement('div');
      icon.className = 'file-icon';
      icon.innerHTML = '<i class="fa-solid fa-file-pdf" style="color:#ef4444"></i>';
      container.appendChild(icon);
    }
    const name = document.createElement('span');
    name.textContent = file.name;
    container.appendChild(name);
    return container;
  }

  function bindPreview(inputId, previewContainerId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewContainerId);
    if (!input || !preview) return;
    input.addEventListener('change', () => {
      preview.innerHTML = '';
      Array.from(input.files).forEach(f => preview.appendChild(createPreviewItem(f)));
    });
  }

  bindPreview('cni', 'previewParticulier');
  bindPreview('passport', 'previewParticulier');
  bindPreview('rccm', 'previewRccm');
  bindPreview('ifu', 'previewIfu');
});


