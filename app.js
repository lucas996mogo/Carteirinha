(function () {
  "use strict";

  var DEMO = { matricula: "20240001", senha: "teste1234" };

  var STUDENT = {
    name: "Lucas Rodrigues Correa",
    course: "Análise e Desenvolvimento de Sistemas",
    mat: "20240001",
    val: "12/2026"
  };

  var GRADES = [
    { subject: "Engenharia de Software", grade: 8.5 },
    { subject: "Banco de Dados", grade: 9.0 },
    { subject: "Programação Web", grade: 9.5 },
    { subject: "Redes de Computadores", grade: 6.8 },
    { subject: "Gestão de Projetos", grade: 8.0 }
  ];

  var SCHEDULE = {
    "Segunda": [["19:00", "Programação Web", "Lab 3"], ["20:50", "Banco de Dados", "Sala 12"]],
    "Terça": [["19:00", "Engenharia de Software", "Sala 8"]],
    "Quarta": [["19:00", "Redes de Computadores", "Lab 1"], ["20:50", "Gestão de Projetos", "Sala 5"]],
    "Quinta": [["19:00", "Banco de Dados", "Lab 2"]],
    "Sexta": [["19:00", "Programação Web", "Lab 3"]]
  };

  var $ = function (id) { return document.getElementById(id); };

  // ---------- login ----------
  function tryLogin() {
    var ok = $("lg-mat").value.trim() === DEMO.matricula && $("lg-pass").value === DEMO.senha;
    $("lg-err").hidden = ok;
    if (!ok) return;
    $("login").classList.remove("active");
    $("app").hidden = false;
    fillHeader();
    renderCard();
  }
  $("lg-btn").addEventListener("click", tryLogin);
  [$("lg-mat"), $("lg-pass")].forEach(function (el) {
    el.addEventListener("keydown", function (e) { if (e.key === "Enter") tryLogin(); });
  });
  $("logout").addEventListener("click", function () {
    $("app").hidden = true;
    $("login").classList.add("active");
    $("lg-pass").value = "";
  });

  // ---------- abas ----------
  document.querySelectorAll(".bottom button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".bottom button").forEach(function (b) { b.classList.remove("on"); });
      document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
      btn.classList.add("on");
      $("tab-" + btn.dataset.tab).classList.add("active");
      window.scrollTo(0, 0);
    });
  });

  function fillHeader() {
    $("hello-name").textContent = STUDENT.name.split(" ")[0];
    $("hello-course").textContent = STUDENT.course;

    var days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    var today = SCHEDULE[days[new Date().getDay()]];
    var ul = $("today-list");
    ul.innerHTML = "";
    if (!today) {
      ul.innerHTML = '<li><span class="muted">Sem aulas hoje.</span></li>';
    } else {
      today.forEach(function (a) {
        var li = document.createElement("li");
        li.innerHTML = "<div><b></b><span class='muted small'></span></div><span class='muted small'></span>";
        li.querySelector("b").textContent = a[1];
        li.querySelectorAll("span")[0].textContent = a[2];
        li.querySelectorAll("span")[1].textContent = a[0];
        ul.appendChild(li);
      });
    }
  }

  (function renderGrades() {
    var ul = $("grades-list");
    GRADES.forEach(function (g) {
      var li = document.createElement("li");
      var name = document.createElement("span");
      name.textContent = g.subject;
      var val = document.createElement("span");
      val.className = "grade" + (g.grade < 7 ? " low" : "");
      val.textContent = g.grade.toFixed(1).replace(".", ",");
      li.appendChild(name);
      li.appendChild(val);
      ul.appendChild(li);
    });
  })();

  (function renderSchedule() {
    var box = $("schedule");
    Object.keys(SCHEDULE).forEach(function (day) {
      var wrap = document.createElement("div");
      wrap.className = "day";
      var h = document.createElement("h4");
      h.textContent = day;
      var ul = document.createElement("ul");
      ul.className = "list";
      SCHEDULE[day].forEach(function (a) {
        var li = document.createElement("li");
        var left = document.createElement("div");
        var b = document.createElement("b");
        b.textContent = a[1];
        var s = document.createElement("span");
        s.className = "muted small";
        s.textContent = a[2];
        left.appendChild(b);
        left.appendChild(s);
        var t = document.createElement("span");
        t.className = "muted small";
        t.textContent = a[0];
        li.appendChild(left);
        li.appendChild(t);
        ul.appendChild(li);
      });
      wrap.appendChild(h);
      wrap.appendChild(ul);
      box.appendChild(wrap);
    });
  })();

  // ---------- carteirinha ----------
  var card = $("card");
  function flip() { card.classList.toggle("flipped"); }
  card.addEventListener("click", flip);
  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
  });

  function renderQR(s) {
    var box = $("qr");
    if (!box) return;
    box.innerHTML = "";
    if (typeof qrcode !== "function") return;
    var qr = qrcode(0, "M");
    qr.addData("PROTOTIPO-ACADEMICO|" + s.mat);
    qr.make();
    box.innerHTML = qr.createSvgTag({ scalable: true });
  }

  function renderCard() {
    $("c-name").textContent = STUDENT.name;
    $("c-course").textContent = STUDENT.course;
    $("c-mat").textContent = STUDENT.mat;
    $("c-val").textContent = STUDENT.val;
    renderQR(STUDENT);
    loadPhoto();
  }

  function loadPhoto() {
  var photoElem = $("photo");
    photoElem.style.backgroundImage = "url('images/lucas.jpeg')";
    photoElem.classList.add("has");
  }
  
})();