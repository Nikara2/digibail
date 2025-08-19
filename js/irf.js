function computeIrf(amount) {
  const rate = amount <= 200000 ? 0.18 : 0.25;
  const irf = Math.round(amount * rate);
  const net = amount - irf;
  return { rate, irf, net };
}

function formatFcfa(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}

// Render table rows where data-amount is present
function renderIrfTables(root = document) {
  root.querySelectorAll('[data-irf-table] [data-amount]').forEach(row => {
    const amount = Number(row.getAttribute('data-amount'));
    const { rate, irf, net } = computeIrf(amount);
    const cells = row.querySelectorAll('td');
    if (cells.length >= 3) {
      cells[0].textContent = formatFcfa(amount);
      cells[1].textContent = `${formatFcfa(irf)} (${Math.round(rate*100)}%)`;
      cells[2].textContent = formatFcfa(net);
    }
  });
}

// Add inline badges next to any payment element with data-amount
function renderIrfBadges(root = document) {
  root.querySelectorAll('[data-amount][data-show-irf-badge="true"]').forEach(el => {
    const amount = Number(el.getAttribute('data-amount'));
    const { rate, irf, net } = computeIrf(amount);
    let badge = el.querySelector('.irf-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'irf-badge';
      badge.style.cssText = 'margin-left:8px; padding:2px 8px; border-radius:999px; font-size:12px; background:#eef2ff; color:#3730a3; border:1px solid #c7d2fe;';
      el.appendChild(badge);
    }
    badge.textContent = `IRF: ${formatFcfa(irf)} (${Math.round(rate*100)}%) • Net: ${formatFcfa(net)}`;
  });
}

function initIrf() {
  renderIrfTables();
  renderIrfBadges();
}

document.addEventListener('DOMContentLoaded', initIrf);

// Expose helpers if needed elsewhere
window.computeIrf = computeIrf;
window.renderIrfTables = renderIrfTables;
window.renderIrfBadges = renderIrfBadges;


