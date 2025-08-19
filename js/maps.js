// Simple data set for demo pins
const DIGIBAIL_PROPERTIES = [
  { id: 1, type: 'Appartement', district: 'Gounghin', city: 'Ouagadougou', price: 250000, lat: 12.36566, lng: -1.53388, area: 90, rooms: 4, equip: ['securite', 'garage'], irf: 'a_jour', photos: [] },
  { id: 2, type: 'Maison', district: 'Tampouy', city: 'Ouagadougou', price: 180000, lat: 12.40121, lng: -1.5389, area: 120, rooms: 5, equip: ['jardin'], irf: 'en_attente', photos: [] },
  { id: 3, type: 'Studio', district: 'Patte d’Oie', city: 'Ouagadougou', price: 90000, lat: 12.3511, lng: -1.5165, area: 35, rooms: 1, equip: ['securite'], irf: 'a_jour', photos: [] }
];

let mapInstance;
let markers = [];

function initDigibailMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  mapInstance = new google.maps.Map(mapEl, {
    center: { lat: 12.3686, lng: -1.5272 },
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false,
  });
  renderMarkers(DIGIBAIL_PROPERTIES);
  bindFilters();
  setupViewToggle();
}

function renderMarkers(list) {
  // Clear old
  markers.forEach(m => m.setMap(null));
  markers = [];
  const info = new google.maps.InfoWindow();
  list.forEach(p => {
    const marker = new google.maps.Marker({ position: { lat: p.lat, lng: p.lng }, map: mapInstance, title: p.type });
    marker.addListener('click', () => {
      info.setContent(`<div style="min-width:200px">
        <strong>${p.type}</strong><br/>
        Quartier: ${p.district}<br/>
        Prix: ${formatFcfa(p.price)}
      </div>`);
      info.open(mapInstance, marker);
    });
    markers.push(marker);
  });
  const count = document.getElementById('resultsCount');
  if (count) count.textContent = `${list.length} bien(s) trouvé(s)`;
  renderList(list);
}

function formatFcfa(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' Fcfa';
}

function bindFilters() {
  const applyBtn = document.getElementById('applyFilters');
  const resetBtn = document.getElementById('resetFilters');
  applyBtn?.addEventListener('click', () => applyFilters());
  resetBtn?.addEventListener('click', () => {
    document.getElementById('filterCity').value = 'Ouagadougou';
    document.getElementById('filterDistrict').value = '';
    document.getElementById('filterType').value = '';
    document.getElementById('filterMin').value = '';
    document.getElementById('filterMax').value = '';
    document.getElementById('filterIrf').value = '';
    document.querySelectorAll('.equip').forEach(c => (c.checked = false));
    renderMarkers(DIGIBAIL_PROPERTIES);
  });
}

function applyFilters() {
  const city = document.getElementById('filterCity').value;
  const district = document.getElementById('filterDistrict').value.trim().toLowerCase();
  const type = document.getElementById('filterType').value;
  const min = Number(document.getElementById('filterMin').value || 0);
  const max = Number(document.getElementById('filterMax').value || Infinity);
  const irf = document.getElementById('filterIrf').value;
  const equipSelected = Array.from(document.querySelectorAll('.equip:checked')).map(i => i.value);

  const list = DIGIBAIL_PROPERTIES.filter(p =>
    p.city === city &&
    (district ? p.district.toLowerCase().includes(district) : true) &&
    (type ? p.type === type : true) &&
    p.price >= min && p.price <= max &&
    (irf ? p.irf === irf : true) &&
    (equipSelected.length ? equipSelected.every(e => p.equip.includes(e)) : true)
  );

  renderMarkers(list);
}

function setupViewToggle() {
  const listBtn = document.getElementById('viewList');
  const mapBtn = document.getElementById('viewMap');
  const listEl = document.getElementById('propertiesList');
  const mapEl = document.getElementById('map');
  listBtn?.addEventListener('click', () => {
    listEl.style.display = 'block';
    mapEl.style.display = 'none';
  });
  mapBtn?.addEventListener('click', () => {
    listEl.style.display = 'none';
    mapEl.style.display = 'block';
  });
}

function renderList(list) {
  const container = document.getElementById('propertiesList');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid #e1e5e9;border-radius:12px;padding:12px;margin-bottom:8px;background:#fff;';
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong>${p.type}</strong> — ${p.district}, ${p.city}<br/>
          <small>${p.area} m² • ${p.rooms} pièce(s) • ${p.equip.join(', ') || '—'}</small>
        </div>
        <div>
          <span style="font-weight:600;">${formatFcfa(p.price)}</span><br/>
          <span class="badge" style="display:inline-block;margin-top:4px;padding:2px 8px;border-radius:999px;font-size:12px;${p.irf==='a_jour' ? 'background:#ecfdf3;color:#15803d;border:1px solid #bbf7d0' : 'background:#fff7ed;color:#9a3412;border:1px solid #fed7aa'}">${p.irf==='a_jour' ? 'IRF à jour' : 'IRF en attente'}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// expose init for Google Maps callback
window.initDigibailMap = initDigibailMap;


