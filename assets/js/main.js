// S'MORE redesign — mobile nav, opening hours, menu rendering, booking form.
(function () {
  "use strict";

  // Opening hours from smoreasia.com. Day 0 = Sunday. Times in minutes.
  var WEEKDAY = [[12 * 60, 15 * 60], [17 * 60, 21 * 60]];
  var WEEKEND = [[12 * 60, 21 * 60]];
  function sessionsFor(day) { return day === 0 || day === 6 ? WEEKEND : WEEKDAY; }

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var suffix = h >= 12 ? "pm" : "am";
    var h12 = h % 12 || 12;
    return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + suffix;
  }

  // The restaurant is in London, so read the clock there.
  function londonNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      }).formatToParts(new Date());
      var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
      var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
      return { day: day, mins: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function statusText() {
    var now = londonNow();
    var today = sessionsFor(now.day);
    for (var i = 0; i < today.length; i++) {
      var s = today[i];
      if (now.mins >= s[0] && now.mins < s[1]) return { state: "open", text: "Open now until " + fmt(s[1]) };
      if (now.mins < s[0]) return { state: "closed", text: "Closed now · opens " + fmt(s[0]) + " today" };
    }
    var tomorrow = sessionsFor((now.day + 1) % 7)[0][0];
    return { state: "closed", text: "Closed now · opens " + fmt(tomorrow) + " tomorrow" };
  }

  document.querySelectorAll("[data-open-status]").forEach(function (el) {
    var s = statusText();
    el.dataset.state = s.state;
    el.textContent = s.text;
  });
  var todayRow = document.querySelector('.hours tr[data-days~="' + londonNow().day + '"]');
  if (todayRow) todayRow.setAttribute("data-today", "");

  // ---------- Mobile nav ----------
  var nav = document.getElementById("mobile-nav");
  var openBtn = document.querySelector("[data-nav-open]");
  function setNav(open) {
    if (!nav) return;
    nav.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
    if (open) { var c = nav.querySelector("[data-nav-close]"); if (c) c.focus(); }
    else if (openBtn) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener("click", function () { setNav(true); });
  document.querySelectorAll("[data-nav-close]").forEach(function (b) {
    b.addEventListener("click", function () { setNav(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav && !nav.hidden) setNav(false);
  });

  // ---------- Menu page ----------
  var menuRoot = document.getElementById("menu-root");
  var ORDER_URL = "https://www.smoreasia.com/order-online";
  if (menuRoot && window.SMORE_MENU) {
    var esc = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
    };
    var price = function (p) { return "£" + p.toFixed(2); };
    var zh = function (i) { return i.zh ? '<span class="dish__zh" lang="zh-Hant">' + esc(i.zh) + "</span>" : ""; };
    var veg = function (i) { return i.veg ? ' <abbr title="Vegetarian" class="veg">(V)</abbr>' : ""; };

    var card = function (i) {
      return '<article class="dish">' +
        (i.img ? '<div class="dish__img"><img src="assets/img/dishes/' + i.img + '.jpg" alt="' + esc(i.name) + '" loading="lazy" width="900" height="506"></div>' : "") +
        '<div class="dish__body"><div class="dish__top"><h3 class="dish__name">' + esc(i.name) + veg(i) + '</h3><span class="price">' + price(i.price) + "</span></div>" +
        zh(i) + (i.desc ? '<p class="dish__desc">' + esc(i.desc) + "</p>" : "") + "</div></article>";
    };
    var row = function (i) {
      return '<div class="dish-row"><div><h3 class="dish__name">' + esc(i.name) + veg(i) + "</h3>" + zh(i) + '</div><span class="price">' + price(i.price) + "</span>" +
        (i.desc ? '<p class="dish__desc">' + esc(i.desc) + "</p>" : "") + "</div>";
    };

    // Cards with photos first, then dishes without one, so the grid stays even.
    var html = window.SMORE_MENU.map(function (cat) {
      var withImg = cat.items.filter(function (i) { return i.img; });
      var noImg = cat.items.filter(function (i) { return !i.img; }).concat(cat.more || []);
      var body;
      if (cat.layout === "list") body = '<div class="dish-list">' + cat.items.map(row).join("") + "</div>";
      else {
        // Fill the last row of the tray so no compartment is left empty.
        var n = withImg.length, f3 = (3 - n % 3) % 3, f2 = n % 2;
        var filler = (f3 || f2) ? '<a class="dish dish--fill' + (f3 ? "" : " no3") + (f2 ? "" : " no2") + '" style="--f3:' + (f3 || 1) + ';--f2:1" href="' + ORDER_URL + '" target="_blank" rel="noopener">' +
          '<span class="han" lang="zh-Hant" aria-hidden="true">外帶</span><span class="dish__name">Order for pickup</span><span>Ready in about 20 minutes →</span></a>' : "";
        body = '<div class="dish-grid">' + withImg.map(card).join("") + filler + "</div>" +
        (noImg.length ? '<div class="dish-list" style="margin-top:12px">' + noImg.map(row).join("") + "</div>" : "");
      }
      return '<section class="menu-cat" id="' + cat.id + '" aria-labelledby="' + cat.id + '-h">' +
        '<div class="wrap"><div class="menu-cat__head"><span class="seal" lang="zh-Hant" aria-hidden="true">' + esc(cat.zh) + "</span>" +
        '<div><h2 class="display display--lg" id="' + cat.id + '-h">' + esc(cat.name) + "</h2><p>" + esc(cat.intro) + "</p></div></div>" +
        body + "</div></section>";
    }).join("");
    menuRoot.innerHTML = html;

    // Highlight the chip for the section in view.
    var chips = document.querySelectorAll(".menu-nav .chip");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          chips.forEach(function (c) {
            var on = c.getAttribute("href") === "#" + en.target.id;
            c.setAttribute("aria-current", on ? "true" : "false");
            if (on && c.scrollIntoView) c.parentElement.scrollTo({ left: c.offsetLeft - 20, behavior: "smooth" });
          });
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      menuRoot.querySelectorAll(".menu-cat").forEach(function (s) { io.observe(s); });
      window.addEventListener("scroll", function () {
        if (window.scrollY > 300) return;
        chips.forEach(function (c, i) { c.setAttribute("aria-current", i === 0 ? "true" : "false"); });
        chips[0].parentElement.scrollLeft = 0;
      }, { passive: true });
    }
  }

  // ---------- Booking form ----------
  var booking = document.getElementById("booking-form");
  if (booking) {
    var dateInput = booking.querySelector("#b-date");
    var slotBox = booking.querySelector("#b-slots");
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var iso = function (d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
    var today = new Date();
    dateInput.min = iso(today);
    var max = new Date(today); max.setDate(max.getDate() + 60);
    dateInput.max = iso(max);
    if (!dateInput.value) dateInput.value = iso(today);

    // Online booking windows, 15-minute slots and 10 minutes' notice,
    // matching the restaurant's Wix Table Reservations settings.
    var BOOK_WEEKDAY = [[12 * 60, 14 * 60 + 15], [17 * 60, 20 * 60 + 30]];
    var BOOK_WEEKEND = [[12 * 60, 20 * 60 + 30]];
    function renderSlots() {
      var parts = dateInput.value.split("-");
      if (parts.length !== 3) { slotBox.innerHTML = ""; return; }
      var d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      var now = londonNow();
      var isToday = iso(d) === iso(today);
      var html = "";
      var day = d.getDay();
      (day === 0 || day === 6 ? BOOK_WEEKEND : BOOK_WEEKDAY).forEach(function (s) {
        for (var t = s[0]; t <= s[1]; t += 15) {
          if (isToday && t < now.mins + 10) continue;
          var id = "slot-" + t;
          html += '<label for="' + id + '"><input type="radio" name="time" id="' + id + '" value="' + fmt(t) + '" required>' + fmt(t) + "</label>";
        }
      });
      slotBox.innerHTML = html || '<p class="slots__empty">No more tables today. Try another date.</p>';
      return !!html;
    }
    dateInput.addEventListener("change", renderSlots);
    var deposit = booking.querySelector("#b-deposit");
    function renderDeposit() {
      var n = +(booking.querySelector('input[name="party"]:checked') || {}).value || 0;
      deposit.hidden = n < 10;
      deposit.textContent = "Groups of 10 pay a deposit of £10 per guest (£" + n * 10 + ") to confirm.";
    }
    booking.querySelectorAll('input[name="party"]').forEach(function (r) { r.addEventListener("change", renderDeposit); });
    renderDeposit();
    // Late in the day, start on tomorrow instead of an empty list.
    if (!renderSlots() && dateInput.value === iso(today)) {
      var next = new Date(today); next.setDate(next.getDate() + 1);
      dateInput.value = iso(next);
      renderSlots();
    }
  }

  // Concept forms: no backend, so confirm on the page and say so.
  document.querySelectorAll("form[data-concept]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var done = document.getElementById(form.dataset.concept);
      var data = new FormData(form);
      var summary = done.querySelector("[data-summary]");
      if (summary && data.get("time")) {
        var d = new Date(data.get("date") + "T12:00:00");
        summary.textContent = data.get("party") + " guests · " +
          d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) + " · " + data.get("time");
      }
      form.hidden = true;
      done.hidden = false;
      done.focus();
    });
  });
})();
