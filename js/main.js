(function () {
  const body = document.body;
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav-links]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('[data-branch-tabs]').forEach((group) => {
    group.querySelectorAll('[data-branch]').forEach((button) => {
      button.addEventListener('click', () => {
        group.querySelectorAll('[data-branch]').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');

        const target = button.dataset.branch;
        document.querySelectorAll('[data-branch-content]').forEach((content) => {
          content.classList.toggle('hidden', content.dataset.branchContent !== target);
        });
      });
    });
  });

  const scheduleFilters = document.querySelector('[data-schedule-filters]');
  if (scheduleFilters) {
    const classSelect = scheduleFilters.querySelector('[data-filter-class]');
    const levelSelect = scheduleFilters.querySelector('[data-filter-level]');
    const coachSelect = scheduleFilters.querySelector('[data-filter-coach]');
    const reset = scheduleFilters.querySelector('[data-filter-reset]');
    const rows = Array.from(document.querySelectorAll('[data-class-row]'));

    const applyFilters = () => {
      const selectedClass = classSelect.value;
      const selectedLevel = levelSelect.value;
      const selectedCoach = coachSelect.value;

      rows.forEach((row) => {
        const classMatch = selectedClass === 'all' || row.dataset.classType === selectedClass;
        const levelMatch = selectedLevel === 'all' || row.dataset.level === selectedLevel;
        const coachMatch = selectedCoach === 'all' || row.dataset.coach === selectedCoach;
        row.classList.toggle('hidden', !(classMatch && levelMatch && coachMatch));
      });

      document.querySelectorAll('[data-day-group]').forEach((group) => {
        const visibleRows = group.querySelectorAll('[data-class-row]:not(.hidden)').length;
        group.classList.toggle('hidden', visibleRows === 0);
      });
    };

    [classSelect, levelSelect, coachSelect].forEach((select) => {
      select.addEventListener('change', applyFilters);
    });

    reset.addEventListener('click', () => {
      classSelect.value = 'all';
      levelSelect.value = 'all';
      coachSelect.value = 'all';
      applyFilters();
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
})();
