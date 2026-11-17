// app-entry.generated.mjs
var css = document.createElement("link");
css.rel = "stylesheet";
css.href = "app.css?v=d72c428df9";
document.head.appendChild(css);
document.body.innerHTML = '\n<aside class="sidebar" id="sidebar">\n  <div class="sb-logo">\n    <div class="sb-dots"><div class="sb-dot" style="background:#f59e0b"></div><div class="sb-dot" style="background:#3b82f6"></div></div>\n    <div class="sb-brand">\u6A02\u884D <small>\u5317\u5340\u5DE5\u4F5C\u7BA1\u7406</small></div>\n  </div>\n  <nav>\n    <div class="nav-item" data-page="dashboard"><span class="nav-icon">\u{1F4CA}</span> \u6D3E\u5DE5\u7E3D\u89BD</div>\n    \n    <div class="nav-item" data-page="dispatch"><span class="nav-icon">\u{1F527}</span> \u5831\u4FEE\u6D3E\u5DE5</div>\n    <div class="nav-item" data-page="calendar"><span class="nav-icon">\u{1F4C5}</span> \u884C\u4E8B\u66C6</div>\n    <div class="nav-item" data-page="line"><span class="nav-icon">\u{1F4AC}</span> LINE \u8A2D\u5B9A<span class="line-badge" id="line-nav-badge" hidden></span></div>\n    <div class="nav-item" data-page="settings"><span class="nav-icon">\u{1F465}</span> \u4EBA\u54E1\u540D\u55AE</div>\n  </nav>\n  <div class="sb-footer"><div>\u4E92\u52D5\u539F\u578B \xB7 \u7B2C\u4E8C\u968E\u6BB5</div><div style="color:#3b82f6;margin-top:2px">v2.0 \xB7 \u672C\u6A5F\u793A\u7BC4</div></div>\n</aside>\n<div class="overlay" id="overlay"></div>\n<div class="app">\n  <header class="topbar">\n    <button class="menu-btn" id="menuBtn">\u2630</button>\n    <div class="page-title" id="pageTitle">\u5100\u8868\u677F</div>\n    <div style="display:flex;align-items:center;gap:10px;margin-left:auto">\n      <span class="date-chip" id="todayDate"></span>\n      <span class="user-pill">\u5317\u5340\u7D93\u7406</span>\n    </div>\n  </header>\n  <div style="padding:10px 24px;background:#fff7ed;color:#9a3412;font-size:13px">\u5DE5\u4F5C\u7BA1\u7406\uFF5C\u8CC7\u6599\u4F9D\u767B\u5165\u5E33\u865F\u4FDD\u5B58\u5728\u96F2\u7AEF\uFF1B\u672A\u4E32\u63A5Google\u884C\u4E8B\u66C6\u3002LINE\u901A\u77E5\u8ACB\u65BC\u300CLINE \u8A2D\u5B9A\u300D\u7D81\u5B9A\u3002</div><div class="content" id="content"></div>\n</div>\n';
(function() {
  var CASES = [];
  var DISPATCH = [];
  var STATUS_MAP = {
    "\u6D3D\u8AC7": { color: "#64748b", bg: "#f1f5f9" },
    "\u5831\u50F9": { color: "#3b82f6", bg: "#eff6ff" },
    "\u7C3D\u7D04": { color: "#8b5cf6", bg: "#f5f3ff" },
    "\u6536\u8A02\u91D1": { color: "#f59e0b", bg: "#fffbeb" },
    "\u65BD\u5DE5": { color: "#f97316", bg: "#fff7ed" },
    "\u9A57\u6536": { color: "#06b6d4", bg: "#ecfeff" },
    "\u6536\u5C3E\u6B3E": { color: "#10b981", bg: "#f0fdf4" },
    "\u7D50\u6848": { color: "#334155", bg: "#e2e8f0" }
  };
  var DS = {
    "\u5F85\u6D3E\u5DE5": { color: "#f59e0b", bg: "#fffbeb" },
    "\u5DF2\u6D3E\u5DE5": { color: "#3b82f6", bg: "#eff6ff" },
    "\u9032\u884C\u4E2D": { color: "#f97316", bg: "#fff7ed" },
    "\u5DF2\u5B8C\u6210": { color: "#10b981", bg: "#f0fdf4" }
  };
  var STAGES = ["\u6D3D\u8AC7", "\u5831\u50F9", "\u7C3D\u7D04", "\u6536\u8A02\u91D1", "\u65BD\u5DE5", "\u9A57\u6536", "\u6536\u5C3E\u6B3E", "\u7D50\u6848"];
  var PAGE = "dashboard", FILTER = "all", SEL = null;
  function fmt(n) {
    return n == null ? "\u2014" : "NT$" + Number(n).toLocaleString();
  }
  function fmtD(d) {
    return d ? d.replace(/-/g, "/") : "\u2014";
  }
  function badge(s) {
    var m = STATUS_MAP[s] || { color: "#64748b", bg: "#f1f5f9" };
    return "<span class=badge style=color:" + m.color + ";background:" + m.bg + ">" + s + "</span>";
  }
  function dbadge(s) {
    var m = DS[s] || { color: "#64748b", bg: "#f1f5f9" };
    return "<span class=badge style=color:" + m.color + ";background:" + m.bg + ">" + s + "</span>";
  }
  function sbar(idx) {
    return "<div class=stage-bar>" + STAGES.map(function(_, i) {
      return "<div class='stage-dot" + (i < idx ? " done" : i === idx ? " active" : "") + "'></div>";
    }).join("") + "</div>";
  }
  document.querySelectorAll(".nav-item").forEach(function(el) {
    el.addEventListener("click", function() {
      go(el.dataset.page);
    });
  });
  document.getElementById("menuBtn").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
  });
  document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
  });
  document.getElementById("content").addEventListener("click", function(e) {
    var el = e.target.closest("[data-nav]");
    if (el) {
      go(el.dataset.nav);
      return;
    }
    el = e.target.closest("[data-filter]");
    if (el) {
      FILTER = el.dataset.filter;
      SEL = null;
      render();
      return;
    }
    el = e.target.closest("[data-case]");
    if (el) {
      SEL = SEL === el.dataset.case ? null : el.dataset.case;
      render();
      return;
    }
    el = e.target.closest("[data-close-detail]");
    if (el) {
      SEL = null;
      render();
    }
  });
  function go(page) {
    PAGE = page;
    SEL = null;
    PREVEAL = {};
    document.querySelectorAll(".nav-item").forEach(function(el) {
      el.classList.toggle("active", el.dataset.page === page);
    });
    var t = { dashboard: "\u6D3E\u5DE5\u7E3D\u89BD", dispatch: "\u5831\u4FEE\u6D3E\u5DE5", calendar: "\u884C\u4E8B\u66C6", line: "LINE \u8A2D\u5B9A", settings: "\u4EBA\u54E1\u540D\u55AE" };
    document.getElementById("pageTitle").textContent = t[page] || page;
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
    render();
    window.scrollTo(0, 0);
  }
  function ph(icon, name, desc) {
    document.getElementById("content").innerHTML = "<div class=placeholder><div class=placeholder-icon>" + icon + "</div><h3>" + name + " \u2014 \u5EFA\u7F6E\u4E2D</h3><p>" + desc + "</p></div>";
  }
  function render() {
    if (PAGE === "dashboard") renderDispatchDashboard();
    else if (PAGE === "cases") {
      PAGE = "dashboard";
      renderDispatchDashboard();
    } else if (PAGE === "dispatch") renderDispatch();
    else if (PAGE === "calendar") renderSchedule();
    else if (PAGE === "line") renderLine();
    else if (PAGE === "settings") renderRosterManager();
  }
  var P2KEY = "leyan-dispatch-demo-v2", JOBS = [], DSEL = null, SEARCH = "", RF = "\u5168\u90E8", SF = "\u5168\u90E8", CALREG = "\u5168\u90E8";
  var ENGINEERS = { "\u96D9\u5317|\u5F31\u96FB\u7DAD\u8B77": "\u6731\u79B9\u52F3", "\u96D9\u5317|\u786C\u9AD4\u7DAD\u8B77": "\u8D99\u842C\u5EAD", "\u6843\u7AF9|\u5F31\u96FB\u7DAD\u8B77": "\u8521\u93AE\u5B87", "\u6843\u7AF9|\u786C\u9AD4\u7DAD\u8B77": "\u9EC3\u667A\u7FA4" };
  var COUNTIES = ["\u81FA\u5317\u5E02", "\u65B0\u5317\u5E02", "\u57FA\u9686\u5E02", "\u6843\u5712\u5E02", "\u65B0\u7AF9\u5E02", "\u65B0\u7AF9\u7E23", "\u82D7\u6817\u7E23", "\u81FA\u4E2D\u5E02", "\u5F70\u5316\u7E23", "\u5357\u6295\u7E23", "\u96F2\u6797\u7E23", "\u5609\u7FA9\u5E02", "\u5609\u7FA9\u7E23", "\u81FA\u5357\u5E02", "\u9AD8\u96C4\u5E02", "\u5C4F\u6771\u7E23", "\u5B9C\u862D\u7E23", "\u82B1\u84EE\u7E23", "\u81FA\u6771\u7E23", "\u6F8E\u6E56\u7E23", "\u91D1\u9580\u7E23", "\u9023\u6C5F\u7E23"];
  var DEFAULT_ROSTER = [
    { id: "legacy-north-weak", name: "\u6731\u79B9\u52F3", regions: ["\u81FA\u5317\u5E02", "\u65B0\u5317\u5E02"], primaryRegions: ["\u81FA\u5317\u5E02", "\u65B0\u5317\u5E02"], skills: ["\u5F31\u96FB\u7DAD\u8B77"], active: true },
    { id: "legacy-north-hard", name: "\u8D99\u842C\u5EAD", regions: ["\u81FA\u5317\u5E02", "\u65B0\u5317\u5E02"], primaryRegions: ["\u81FA\u5317\u5E02", "\u65B0\u5317\u5E02"], skills: ["\u786C\u9AD4\u7DAD\u8B77"], active: true },
    { id: "legacy-taozhu-weak", name: "\u8521\u93AE\u5B87", regions: ["\u6843\u5712\u5E02", "\u65B0\u7AF9\u5E02", "\u65B0\u7AF9\u7E23"], primaryRegions: ["\u6843\u5712\u5E02", "\u65B0\u7AF9\u5E02", "\u65B0\u7AF9\u7E23"], skills: ["\u5F31\u96FB\u7DAD\u8B77"], active: true },
    { id: "legacy-taozhu-hard", name: "\u9EC3\u667A\u7FA4", regions: ["\u6843\u5712\u5E02", "\u65B0\u7AF9\u5E02", "\u65B0\u7AF9\u7E23"], primaryRegions: ["\u6843\u5712\u5E02", "\u65B0\u7AF9\u5E02", "\u65B0\u7AF9\u7E23"], skills: ["\u786C\u9AD4\u7DAD\u8B77"], active: true }
  ];
  var initialRoster = window.leyanRoster ? window.leyanRoster.list() : null;
  var TITLES = ["\u7E3D\u76E3", "\u57F7\u884C\u9577", "\u5340\u7D93\u7406", "\u884C\u653F\u52A9\u7406", "\u5F31\u96FB\u5DE5\u7A0B\u5E2B", "\u7DAD\u8B77\u5DE5\u7A0B\u5E2B", "\u696D\u52D9", "\u57F9\u8A13", "\u958B\u696D\u9867\u554F"], ENG_TITLES = ["\u5F31\u96FB\u5DE5\u7A0B\u5E2B", "\u7DAD\u8B77\u5DE5\u7A0B\u5E2B"];
  var ROSTER_ONLY = !!window.leyanRosterOnly, OWNER_EMAIL = String(window.leyanRoster && window.leyanRoster.ownerEmail || "").toLowerCase(), SELF_EMAIL = String(window.leyanRoster && window.leyanRoster.selfEmail || "").toLowerCase();
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  }
  function isOwnerRow(e) {
    return !!OWNER_EMAIL && String(e.account || "").trim().toLowerCase() === OWNER_EMAIL;
  }
  function hasAdmin(e) {
    return isOwnerRow(e) || !!e.admin && isEmail(e.account);
  }
  function normCounty(x) {
    var s = String(x || "").trim().replace(/台/g, "\u81FA");
    if (COUNTIES.includes(s)) return s;
    if (s.length >= 2 && s !== "\u65B0\u7AF9" && s !== "\u5609\u7FA9") {
      var hit = COUNTIES.filter(function(c) {
        return c.slice(0, -1) === s;
      });
      if (hit.length === 1) return hit[0];
    }
    return "";
  }
  function countyList(v) {
    var out = [];
    (Array.isArray(v) ? v : []).forEach(function(x) {
      var c = normCounty(x);
      if (c && out.indexOf(c) < 0) out.push(c);
    });
    return out;
  }
  function regionsOf(e) {
    return (e.primaryRegions || []).concat(e.supportRegions || []);
  }
  function isEngineer(e) {
    return !!e && (ENG_TITLES.indexOf(e.title) >= 0 || !e.title && !!e.legacyEngineer);
  }
  function normPerson(e) {
    var o = Object.assign({}, e);
    o.employeeId = o.employeeId == null ? "" : String(o.employeeId);
    if (o.account == null) o.account = "";
    if (o.password == null) o.password = "";
    if (o.active == null) o.active = true;
    o.admin = !!o.admin;
    var t = o.title == null ? null : String(o.title).trim().replace(/台/g, "\u81FA");
    if (t !== null && TITLES.indexOf(t) >= 0) {
      o.title = t;
      delete o.legacyEngineer;
      delete o.legacyTitle;
    } else if (t === null || t.indexOf("\u5DE5\u7A0B\u5E2B") >= 0) {
      var sk = Array.isArray(o.skills) ? o.skills : [], weak = sk.indexOf("\u5F31\u96FB\u7DAD\u8B77") >= 0, hard = sk.indexOf("\u786C\u9AD4\u7DAD\u8B77") >= 0;
      if (weak && !hard) o.title = "\u5F31\u96FB\u5DE5\u7A0B\u5E2B";
      else if (hard && !weak) o.title = "\u7DAD\u8B77\u5DE5\u7A0B\u5E2B";
      else {
        o.title = "";
        o.legacyEngineer = true;
        if (t) o.legacyTitle = t;
      }
      if (o.title) {
        delete o.legacyEngineer;
        delete o.legacyTitle;
      }
    } else if (t) {
      o.legacyTitle = t;
      o.title = "";
    } else o.title = "";
    var prim = countyList(o.primaryRegions), sup = countyList(Array.isArray(o.supportRegions) ? o.supportRegions : o.regions);
    if (!prim.length && !sup.length && o.area) {
      var a = String(o.area).trim();
      if (a === "\u96D9\u5317") prim = ["\u81FA\u5317\u5E02", "\u65B0\u5317\u5E02"];
      else if (a === "\u6843\u7AF9") prim = ["\u6843\u5712\u5E02", "\u65B0\u7AF9\u5E02", "\u65B0\u7AF9\u7E23"];
      else {
        var parts = a.split(/[、,，\/\s]+/).filter(Boolean), cs = parts.map(normCounty);
        if (parts.length && cs.every(Boolean)) prim = countyList(cs);
        else o.legacyArea = a;
      }
    }
    o.primaryRegions = prim;
    o.supportRegions = sup.filter(function(c) {
      return prim.indexOf(c) < 0;
    });
    delete o.regions;
    delete o.area;
    return o;
  }
  var ROSTER = (initialRoster === null ? JSON.parse(JSON.stringify(DEFAULT_ROSTER)) : initialRoster).map(normPerson);
  function engineerRoster() {
    return ROSTER.filter(isEngineer);
  }
  function countForDay(name, day) {
    return JOBS.filter(function(j) {
      return j.engineer === name && j.start && j.status !== "\u5DF2\u53D6\u6D88" && localDate(new Date(j.start)) === day;
    }).length;
  }
  function isSameCounty(j, county) {
    var r = String(j.region || "").replace(/台/g, "\u81FA");
    if (r === county) return true;
    if (r === "\u96D9\u5317" || r === "\u6843\u7AF9") {
      var inferred = regionFromText(String(j.client || "") + " " + String(j.note || ""));
      return inferred === county;
    }
    return false;
  }
  function supportsEngineer(e, county, category) {
    return isEngineer(e) && !!e.active && regionsOf(e).includes(county) && Array.isArray(e.skills) && e.skills.includes(category);
  }
  function suggestEngineers(draft) {
    var staff = ROSTER.filter(function(e) {
      return supportsEngineer(e, draft.region, draft.category);
    }), plans = [];
    staff.forEach(function(e) {
      var test = Object.assign({}, draft, { engineer: e.name });
      var candidateSlots = slots(test);
      candidateSlots.forEach(function(slot) {
        var day = localDate(new Date(slot.start)), same = JOBS.some(function(j) {
          return j.engineer === e.name && j.start && j.status !== "\u5DF2\u53D6\u6D88" && localDate(new Date(j.start)) === day && isSameCounty(j, draft.region);
        });
        plans.push({ name: e.name, slot, primary: (e.primaryRegions || []).includes(draft.region), same, count: countForDay(e.name, day) });
      });
    });
    plans.sort(function(a, b) {
      return Number(b.primary) - Number(a.primary) || Number(b.same) - Number(a.same) || a.count - b.count || a.slot.start.localeCompare(b.slot.start) || a.name.localeCompare(b.name, "zh-Hant");
    });
    return { people: staff, plans };
  }
  function renderDispatchDashboard() {
    var today = localDate(/* @__PURE__ */ new Date()), jobs = JOBS.filter(function(j) {
      return j.start && localDate(new Date(j.start)) === today && j.status !== "\u5DF2\u53D6\u6D88";
    });
    var pending = JOBS.filter(function(j) {
      return j.status === "\u5F85\u6D3E\u5DE5";
    }).length;
    document.getElementById("content").innerHTML = '<div class="p2-head"><div><h2>\u6D3E\u5DE5\u7E3D\u89BD</h2><div class="p2-sub">\u4EE5\u5DE5\u7A0B\u5E2B\u3001\u670D\u52D9\u5340\u57DF\u8207\u5DE5\u55AE\u638C\u63E1\u4ECA\u65E5\u6D3E\u5DE5\u3002</div></div><button class="p2-btn" data-p2="new">\uFF0B \u65B0\u589E\u6D3E\u5DE5</button></div><div id="line-inbox-banner"></div><div class="p2-grid"><div class="p2-stat"><b>' + jobs.length + '</b><span>\u4ECA\u65E5\u884C\u7A0B</span></div><div class="p2-stat"><b>' + pending + '</b><span>\u5F85\u6D3E\u5DE5</span></div><div class="p2-stat"><b>' + engineerRoster().filter(function(e) {
      return e.active;
    }).length + '</b><span>\u555F\u7528\u5DE5\u7A0B\u5E2B</span></div><div class="p2-stat"><b>' + LINE.inbox.length + '</b><span>LINE \u5F85\u8655\u7406</span></div></div><section class="card p2-panel"><div class="p2-head"><h3>\u4ECA\u65E5\u884C\u7A0B</h3><button class="p2-btn secondary" data-p2="calendar">\u958B\u555F\u884C\u4E8B\u66C6</button></div>' + (jobs.length ? jobs.map(function(j) {
      return '<div class="line-row"><div><b>' + esc(hm(j.start)) + "\u3000" + esc(j.engineer) + '</b><div class="p2-sub">' + esc(j.client) + " \xB7 " + esc(j.region) + " \xB7 " + esc(j.note) + '</div></div><button class="p2-btn secondary" data-job="' + esc(j.id) + '">\u67E5\u770B</button></div>';
    }).join("") : '<p class="p2-sub">\u4ECA\u5929\u6C92\u6709\u5DF2\u5B89\u6392\u7684\u5DE5\u55AE\u3002</p>') + '</section><section class="card p2-panel"><div class="p2-head"><h3>\u5F85\u8FA6\u63D0\u9192</h3></div><div class="line-row"><div><b>\u5F85\u6D3E\u5DE5 ' + pending + ' \u4EF6</b><div class="p2-sub">\u5C1A\u5F85\u5B89\u6392\u6642\u6BB5\u6216\u5DE5\u7A0B\u5E2B</div></div><button class="p2-btn secondary" data-p2="dispatch">\u67E5\u770B\u5DE5\u55AE</button></div><div class="line-row"><div><b>\u5F85\u518D\u8A2A ' + JOBS.filter(function(j) {
      return j.status === "\u5F85\u518D\u8A2A";
    }).length + ' \u4EF6</b><div class="p2-sub">\u9700\u8FFD\u8E64\u5F8C\u7E8C\u670D\u52D9</div></div><button class="p2-btn secondary" data-p2="dispatch">\u67E5\u770B\u5DE5\u55AE</button></div><div class="line-row"><div><b>LINE \u8A0A\u606F</b><div class="p2-sub">\u8ACB\u78BA\u8A8D\u4E26\u8655\u7406\u6536\u5230\u7684\u8A0A\u606F</div></div><button class="p2-btn secondary" data-nav="line">\u67E5\u770B LINE</button></div></section>';
    lineBanner();
    loadLine(false);
  }
  var PQ = "", PCOUNTY = "\u5168\u90E8", PPRIMARY = false, PTITLE = "\u5168\u90E8", PSORT = "asc", PREVEAL = {}, IMPORT_PLAN = null, IMPORT_FILE_TEXT = null;
  function lc(v) {
    return String(v == null ? "" : v).trim().toLowerCase();
  }
  function peopleRows() {
    var q = PQ.trim().toLowerCase();
    var list = ROSTER.filter(function(e) {
      if (PCOUNTY === "__none") {
        if (regionsOf(e).length) return false;
      } else if (PCOUNTY !== "\u5168\u90E8") {
        var inP = (e.primaryRegions || []).indexOf(PCOUNTY) >= 0, inS = (e.supportRegions || []).indexOf(PCOUNTY) >= 0;
        if (!(inP || !PPRIMARY && inS)) return false;
      }
      if (PTITLE === "__eng") {
        if (!isEngineer(e)) return false;
      } else if (PTITLE === "__none") {
        if (e.title) return false;
      } else if (PTITLE !== "\u5168\u90E8" && e.title !== PTITLE) return false;
      if (!q) return true;
      return [e.employeeId, e.name, e.title, e.account, regionsOf(e).join(" ")].some(function(x) {
        return String(x || "").toLowerCase().indexOf(q) >= 0;
      });
    });
    return list.sort(function(a, b) {
      var x = String(a.employeeId || ""), y = String(b.employeeId || "");
      if (!x !== !y) return x ? -1 : 1;
      var c = x.localeCompare(y, "zh-Hant", { numeric: true });
      return (PSORT === "asc" ? c : -c) || String(a.name).localeCompare(String(b.name), "zh-Hant");
    });
  }
  function personTitle(e) {
    if (e.title) return esc(e.title);
    return '<span class="badge people-missing">\u8ACB\u9078\u64C7\u8077\u4F4D</span>' + (e.legacyTitle ? '<div class="p2-sub">\u539F\u8077\u4F4D\uFF1A' + esc(e.legacyTitle) + "</div>" : "") + (e.legacyEngineer ? '<div class="p2-sub">\u9078\u5B9A\u524D\u4ECD\u53EF\u6D3E\u5DE5</div>' : "");
  }
  function personRegions(e) {
    var p = e.primaryRegions || [], s = e.supportRegions || [];
    var html = p.length ? '<div class="region-primary">' + p.map(function(r) {
      return "<span>" + esc(r) + "</span>";
    }).join("") + "</div>" : s.length ? '<span class="p2-sub">\u672A\u8A2D\u5B9A\u4E3B\u8981\u8CA0\u8CAC</span>' : '<span class="p2-sub">\u672A\u8A2D\u5B9A</span>';
    if (s.length) html += '<div class="region-support">\u652F\u63F4\uFF1A' + esc(s.join("\u3001")) + "</div>";
    if (e.legacyArea) html += '<div class="p2-sub">\u539F\u5340\u57DF\uFF1A' + esc(e.legacyArea) + "\uFF08\u8ACB\u91CD\u65B0\u9078\u64C7\uFF09</div>";
    return '<span class="region-cell">' + html + "</span>";
  }
  function personAdmin(e) {
    if (isOwnerRow(e)) return '<label class="admin-flag"><input type="checkbox" checked disabled aria-label="\u64C1\u6709\u8005\u6C38\u9060\u5177\u5099\u7BA1\u7406\u6B0A\u9650"> \u64C1\u6709\u8005</label>';
    return hasAdmin(e) ? '<span class="badge admin-yes">\u2713 \u7BA1\u7406\u6B0A\u9650</span>' : '<span class="p2-sub">\u2014</span>';
  }
  function personDispatch(e) {
    if (!isEngineer(e)) return '<span class="p2-sub">\u4E0D\u53C3\u8207\u6D3E\u5DE5</span>';
    return '<span class="roster-state ' + (e.active ? "is-active" : "") + '">' + (e.active ? "\u555F\u7528\u4E2D" : "\u5DF2\u505C\u7528") + '</span><div class="p2-sub">' + esc((e.skills || []).join("\u3001") || "\u672A\u8A2D\u5B9A\u985E\u5225") + "</div>" + (regionsOf(e).length ? "" : '<div class="p2-sub">\u672A\u8A2D\u5B9A\u7E23\u5E02</div>');
  }
  function personPassword(e) {
    if (!e.password) return '<span class="p2-sub">\u672A\u8A2D\u5B9A</span>';
    var shown = !!PREVEAL[e.id];
    return '<span class="pw-cell"><span class="pw-val' + (shown ? " is-shown" : "") + '">' + (shown ? esc(e.password) : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022") + '</span><span class="pw-btns"><button type="button" class="btn-sm" data-people="reveal" data-id="' + esc(e.id) + '" aria-pressed="' + shown + '" aria-label="' + (shown ? "\u96B1\u85CF" : "\u986F\u793A") + esc(e.name) + '\u7684\u5BC6\u78BC">' + (shown ? "\u96B1\u85CF" : "\u986F\u793A") + '</button><button type="button" class="btn-sm" data-people="copy" data-id="' + esc(e.id) + '" aria-label="\u8907\u88FD' + esc(e.name) + '\u7684\u5BC6\u78BC">\u8907\u88FD</button></span></span>';
  }
  function renderPeopleList() {
    var box = document.getElementById("people-list");
    if (!box) return;
    var list = peopleRows(), arrow = PSORT === "asc" ? "\u2191" : "\u2193";
    box.innerHTML = (list.length ? '<div class="card people-card"><table class="people-table"><thead><tr><th aria-sort="' + (PSORT === "asc" ? "ascending" : "descending") + '"><button type="button" class="people-sort" data-people="sort">\u54E1\u5DE5\u7DE8\u865F ' + arrow + "</button></th><th>\u59D3\u540D</th><th>\u8077\u4F4D</th><th>\u5340\u57DF</th><th>\u5E33\u865F</th><th>\u5BC6\u78BC</th><th>\u7BA1\u7406\u6B0A\u9650</th><th>\u6D3E\u5DE5\u8A2D\u5B9A</th><th>\u64CD\u4F5C</th></tr></thead><tbody>" + list.map(function(e) {
      return '<tr data-person="' + esc(e.id) + '"><td data-label="\u54E1\u5DE5\u7DE8\u865F">' + (e.employeeId ? "<b>" + esc(e.employeeId) + "</b>" : '<span class="badge people-missing">\u5F85\u88DC\u7DE8\u865F</span>') + '</td><td data-label="\u59D3\u540D"><b>' + esc(e.name) + '</b></td><td data-label="\u8077\u4F4D">' + personTitle(e) + '</td><td data-label="\u5340\u57DF">' + personRegions(e) + '</td><td data-label="\u5E33\u865F">' + (e.account ? esc(e.account) : '<span class="p2-sub">\u672A\u8A2D\u5B9A</span>') + '</td><td data-label="\u5BC6\u78BC">' + personPassword(e) + '</td><td data-label="\u7BA1\u7406\u6B0A\u9650">' + personAdmin(e) + '</td><td data-label="\u6D3E\u5DE5\u8A2D\u5B9A">' + personDispatch(e) + '</td><td data-label="\u64CD\u4F5C"><span class="people-actions"><button type="button" class="btn-sm" data-roster="edit" data-id="' + esc(e.id) + '">\u7DE8\u8F2F</button>' + (isEngineer(e) ? '<button type="button" class="btn-sm" data-roster="toggle" data-id="' + esc(e.id) + '">' + (e.active ? "\u505C\u7528" : "\u555F\u7528") + "</button>" : "") + '<button type="button" class="btn-sm people-del" data-roster="delete" data-id="' + esc(e.id) + '">\u522A\u9664</button></span></td></tr>';
    }).join("") + "</tbody></table></div>" : '<p class="p2-empty card">' + (ROSTER.length ? "\u6C92\u6709\u7B26\u5408\u689D\u4EF6\u7684\u4EBA\u54E1\u3002" : "\u5C1A\u7121\u4EBA\u54E1\uFF0C\u8ACB\u5148\u65B0\u589E\u3002") + "</p>") + '<p class="p2-sub">\u5171 ' + ROSTER.length + " \u4F4D\uFF0C\u986F\u793A " + list.length + " \u4F4D \xB7 \u4F9D\u54E1\u5DE5\u7DE8\u865F" + (PSORT === "asc" ? "\u7531\u5C0F\u5230\u5927" : "\u7531\u5927\u5230\u5C0F") + "</p>";
  }
  function renderRosterManager() {
    var el = document.getElementById("content"), missing = ROSTER.filter(function(e) {
      return !e.employeeId;
    }).length, noTitle = ROSTER.filter(function(e) {
      return !e.title;
    }).length;
    function opt(v, l, cur) {
      return '<option value="' + esc(v) + '"' + (v === cur ? " selected" : "") + ">" + esc(l) + "</option>";
    }
    el.innerHTML = '<div class="p2-head"><div><h2>\u4EBA\u54E1\u540D\u55AE</h2><p class="p2-sub">\u5168\u9AD4\u4EBA\u54E1\u8CC7\u6599\u3002\u8077\u4F4D\u70BA\u300C\u5F31\u96FB\u5DE5\u7A0B\u5E2B\u300D\u300C\u7DAD\u8B77\u5DE5\u7A0B\u5E2B\u300D\u8005\u624D\u6703\u51FA\u73FE\u5728\u6D3E\u5DE5\u5EFA\u8B70\u3001\u884C\u4E8B\u66C6\u7BE9\u9078\u8207 LINE \u7D81\u5B9A\u3002\u5E33\u865F\u8207\u5BC6\u78BC\u50C5\u5177\u7BA1\u7406\u6B0A\u9650\u8005\u53EF\u898B\u3002</p></div><div class="people-head-actions"><button class="p2-btn secondary" data-roster="import">\u532F\u5165\u540D\u55AE</button><button class="p2-btn" data-roster="new">\uFF0B \u65B0\u589E\u4EBA\u54E1</button></div></div>' + (missing ? '<div class="p2-note" id="people-missing-note">\u6709 ' + missing + " \u4F4D\u4EBA\u54E1\u5C1A\u672A\u586B\u5BEB\u54E1\u5DE5\u7DE8\u865F\uFF08\u7531\u820A\u5DE5\u7A0B\u5E2B\u540D\u518A\u8F49\u5165\uFF09\uFF0C\u8ACB\u6309\u300C\u7DE8\u8F2F\u300D\u88DC\u4E0A\u3002</div>" : "") + (noTitle ? '<div class="p2-note" id="people-title-note">\u6709 ' + noTitle + " \u4F4D\u4EBA\u54E1\u9700\u8981\u9078\u64C7\u8077\u4F4D\uFF08\u820A\u8CC7\u6599\u7121\u6CD5\u81EA\u52D5\u5224\u65B7\uFF09\uFF0C\u8ACB\u6309\u300C\u7DE8\u8F2F\u300D\u9078\u64C7\u3002\u539F\u70BA\u5DE5\u7A0B\u5E2B\u8005\u5728\u9078\u5B9A\u524D\u4ECD\u53EF\u6D3E\u5DE5\u3002</div>" : "") + '<div class="p2-filters people-filters"><input id="people-search" type="search" placeholder="\u641C\u5C0B\u54E1\u5DE5\u7DE8\u865F\u3001\u59D3\u540D\u3001\u8077\u4F4D\u3001\u5E33\u865F\u3001\u7E23\u5E02" aria-label="\u641C\u5C0B\u4EBA\u54E1" value="' + esc(PQ) + '"><select id="people-county" aria-label="\u7E23\u5E02\u7BE9\u9078">' + opt("\u5168\u90E8", "\u5168\u90E8\u7E23\u5E02", PCOUNTY) + COUNTIES.map(function(c) {
      return opt(c, c, PCOUNTY);
    }).join("") + opt("__none", "\u672A\u8A2D\u5B9A\u5340\u57DF", PCOUNTY) + '</select><label class="people-primary-toggle"><input type="checkbox" id="people-primary"' + (PPRIMARY ? " checked" : "") + '> \u53EA\u770B\u4E3B\u8981\u8CA0\u8CAC</label><select id="people-title" aria-label="\u8077\u4F4D\u7BE9\u9078">' + opt("\u5168\u90E8", "\u5168\u90E8\u8077\u4F4D", PTITLE) + opt("__eng", "\u6D3E\u5DE5\u5DE5\u7A0B\u5E2B\uFF08\u5F31\u96FB\uFF0B\u7DAD\u8B77\uFF09", PTITLE) + opt("__none", "\u8ACB\u9078\u64C7\u8077\u4F4D\uFF08\u672A\u8A2D\u5B9A\uFF09", PTITLE) + TITLES.map(function(v) {
      return opt(v, v, PTITLE);
    }).join("") + '</select><button type="button" class="p2-btn secondary" data-people="sort">\u54E1\u5DE5\u7DE8\u865F ' + (PSORT === "asc" ? "\u2191" : "\u2193") + '</button></div><div id="people-list"></div>' + (OWNER_EMAIL ? '<p class="p2-sub people-owner-note">\u64C1\u6709\u8005\uFF08' + esc(OWNER_EMAIL) + "\uFF09\u6C38\u9060\u5177\u5099\u7BA1\u7406\u6B0A\u9650\uFF0C\u7121\u6CD5\u79FB\u9664\u3002\u52FE\u9078\u300C\u7BA1\u7406\u6B0A\u9650\u300D\u7684\u4EBA\u54E1\u4EE5\u5176\u5E33\u865F Email \u767B\u5165\u4E26\u5B8C\u6210\u9A57\u8B49\u5668\u5F8C\uFF0C\u53EA\u80FD\u6AA2\u8996\u8207\u7DE8\u8F2F\u4EBA\u54E1\u540D\u55AE\u3002</p>" : "");
    renderPeopleList();
  }
  async function saveRoster(next) {
    if (!window.leyanRoster) throw Error("\u7121\u6CD5\u9023\u7DDA\u4EBA\u54E1\u540D\u55AE\u3002");
    ROSTER = (await window.leyanRoster.save(next)).map(normPerson);
    return window.leyanRoster.syncWarning || "";
  }
  function countyChoice(name, selected, other) {
    return COUNTIES.map(function(x) {
      var on = selected.indexOf(x) >= 0, blocked = other.indexOf(x) >= 0;
      return '<label class="region-choice"><input type="checkbox" name="' + name + '" value="' + esc(x) + '"' + (on ? " checked" : "") + (blocked ? " disabled" : "") + "><span>" + esc(x) + "</span></label>";
    }).join("");
  }
  function rosterEditor(id) {
    var old = ROSTER.find(function(e) {
      return e.id === id;
    }), v = old || { employeeId: "", name: "", title: "", account: "", password: "", primaryRegions: [], supportRegions: [], skills: [], active: true, admin: false };
    var dialog = document.createElement("dialog");
    dialog.className = "p2-dialog";
    dialog.id = "roster-dialog";
    dialog.setAttribute("aria-label", old ? "\u7DE8\u8F2F\u4EBA\u54E1" : "\u65B0\u589E\u4EBA\u54E1");
    var prev = document.getElementById("roster-dialog");
    if (prev) prev.remove();
    document.body.appendChild(dialog);
    var lockName = !!old && (isEngineer(old) || JOBS.some(function(j) {
      return j.engineer === old.name;
    })), ownerRow = !!old && isOwnerRow(old), selfRow = ROSTER_ONLY && !!old && !!SELF_EMAIL && lc(old.account) === SELF_EMAIL;
    function choice(name, values, selected) {
      return values.map(function(x) {
        return '<label class="region-choice"><input type="checkbox" name="' + name + '" value="' + esc(x) + '"' + (selected.includes(x) ? " checked" : "") + "><span>" + esc(x) + "</span></label>";
      }).join("");
    }
    dialog.innerHTML = "<h2>" + (old ? "\u7DE8\u8F2F\u4EBA\u54E1" : "\u65B0\u589E\u4EBA\u54E1") + '</h2><form id="roster-form" autocomplete="off"><div class="p2-form"><label>\u54E1\u5DE5\u7DE8\u865F *<input name="employeeId" maxlength="30" required value="' + esc(v.employeeId || "") + '"></label><label>\u59D3\u540D *<input name="engineerName" maxlength="60" required value="' + esc(v.name) + '"' + (lockName ? " readonly" : "") + '></label><label>\u8077\u4F4D *<select name="title" required><option value="">\u8ACB\u9078\u64C7\u8077\u4F4D</option>' + TITLES.map(function(t) {
      return '<option value="' + esc(t) + '"' + (t === v.title ? " selected" : "") + ">" + esc(t) + "</option>";
    }).join("") + "</select>" + (v.legacyTitle ? '<span class="p2-sub">\u539F\u8077\u4F4D\uFF1A' + esc(v.legacyTitle) + "</span>" : "") + (v.legacyEngineer ? '<span class="p2-sub">\u539F\u70BA\u5DE5\u7A0B\u5E2B\uFF1B\u9078\u5B9A\u8077\u4F4D\u524D\u4ECD\u53EF\u6D3E\u5DE5\u3002</span>' : "") + '</label><label>\u5E33\u865F<input name="account" maxlength="120" autocomplete="off" placeholder="Email" value="' + esc(v.account || "") + '"' + (ownerRow || selfRow ? " readonly" : "") + '></label><label>\u5BC6\u78BC<span class="pw-edit"><input name="password" type="password" maxlength="200" autocomplete="new-password" value="' + esc(v.password || "") + '"><button type="button" class="btn-sm" data-people="pw-edit">\u986F\u793A</button></span></label><div class="p2-wide admin-box"><label class="admin-choice"><input type="checkbox" name="admin"' + (ownerRow || selfRow || v.admin ? " checked" : "") + "><span>\u7BA1\u7406\u6B0A\u9650" + (ownerRow ? "\uFF08\u64C1\u6709\u8005\uFF09" : "") + '</span></label><p class="p2-sub admin-hint"></p></div><fieldset class="roster-field p2-wide"><legend>\u4E3B\u8981\u8CA0\u8CAC\u5340\u57DF\uFF08\u53EF\u8907\u9078\uFF09</legend><div class="county-grid" data-group="primary">' + countyChoice("primaryRegions", v.primaryRegions || [], v.supportRegions || []) + '</div></fieldset><fieldset class="roster-field p2-wide"><legend>\u652F\u63F4\u5340\u57DF\uFF08\u53EF\u8907\u9078\uFF09</legend><div class="county-grid" data-group="support">' + countyChoice("supportRegions", v.supportRegions || [], v.primaryRegions || []) + '</div></fieldset><p class="p2-sub p2-wide">\u540C\u4E00\u7E23\u5E02\u53EA\u80FD\u662F\u300C\u4E3B\u8981\u8CA0\u8CAC\u300D\u6216\u300C\u652F\u63F4\u300D\u5176\u4E2D\u4E4B\u4E00\u3002\u6D3E\u5DE5\u6642\uFF0C\u4E3B\u8981\u8CA0\u8CAC\u8A72\u7E23\u5E02\u7684\u5DE5\u7A0B\u5E2B\u512A\u5148\u63A8\u85A6\u3002' + (v.legacyArea ? "\u539F\u5340\u57DF\uFF1A" + esc(v.legacyArea) + "\uFF0C\u8ACB\u91CD\u65B0\u52FE\u9078\u3002" : "") + '</p><div class="p2-wide eng-fields"><fieldset class="roster-field"><legend>\u5DE5\u4F5C\u985E\u5225\uFF08\u53EF\u8907\u9078\uFF09*</legend><div class="roster-tags">' + choice("skills", ["\u5F31\u96FB\u7DAD\u8B77", "\u786C\u9AD4\u7DAD\u8B77"], v.skills || []) + '</div></fieldset><p class="p2-sub">\u5DE5\u4F5C\u985E\u5225\u50C5\u9069\u7528\u5F31\u96FB\u5DE5\u7A0B\u5E2B\u8207\u7DAD\u8B77\u5DE5\u7A0B\u5E2B\u3002</p></div></div><p class="p2-sub">' + (lockName ? "\u59D3\u540D\u7528\u65BC\u65E2\u6709\u5DE5\u55AE\u53CA LINE \u7D81\u5B9A\uFF0C\u5DF2\u5EFA\u7ACB\u5F8C\u4E0D\u76F4\u63A5\u66F4\u6539\u3002" : "\u5F31\u96FB\u5DE5\u7A0B\u5E2B\u8207\u7DAD\u8B77\u5DE5\u7A0B\u5E2B\u6703\u52A0\u5165\u6D3E\u5DE5\u5EFA\u8B70\uFF1B\u59D3\u540D\u5EFA\u7ACB\u5F8C\u7528\u65BC\u5DE5\u55AE\u8207 LINE \u7D81\u5B9A\u3002") + '</p><p class="req-error" role="alert"></p><div class="p2-actions"><button class="p2-btn" type="submit">\u5132\u5B58\u4EBA\u54E1</button><button class="p2-btn secondary" type="button" data-roster="close">\u53D6\u6D88</button></div></form>';
    var form = dialog.querySelector("form"), engBox = dialog.querySelector(".eng-fields"), adminBox = form.elements.admin, adminHint = dialog.querySelector(".admin-hint");
    function engTitle() {
      var t = form.elements.title.value;
      return ENG_TITLES.indexOf(t) >= 0 || !t && !!v.legacyEngineer;
    }
    function syncEng() {
      engBox.hidden = !engTitle();
    }
    function syncAdmin() {
      if (ownerRow) {
        adminBox.checked = true;
        adminBox.disabled = true;
        adminHint.textContent = "\u64C1\u6709\u8005\u6C38\u9060\u5177\u5099\u7BA1\u7406\u6B0A\u9650\uFF0C\u7121\u6CD5\u79FB\u9664\u3002";
        return;
      }
      if (selfRow) {
        adminBox.checked = true;
        adminBox.disabled = true;
        adminHint.textContent = "\u7121\u6CD5\u79FB\u9664\u81EA\u5DF1\u7684\u7BA1\u7406\u6B0A\u9650\uFF1B\u8ACB\u7531\u64C1\u6709\u8005\u6216\u5176\u4ED6\u7BA1\u7406\u8005\u8ABF\u6574\u3002";
        return;
      }
      var ok = isEmail(form.elements.account.value);
      adminBox.disabled = !ok;
      if (!ok) adminBox.checked = false;
      adminHint.textContent = ok ? "\u52FE\u9078\u5F8C\uFF0C\u6B64 Email \u5B8C\u6210\u9A57\u8B49\u5668\u767B\u5165\u5F8C\u53EF\u6AA2\u8996\u8207\u7DE8\u8F2F\u4EBA\u54E1\u540D\u55AE\uFF08\u4E0D\u542B\u6D3E\u5DE5\u3001LINE \u7B49\u5176\u4ED6\u529F\u80FD\uFF09\u3002" : "\u5E33\u865F\u9808\u70BA\u6709\u6548 Email \u624D\u80FD\u52FE\u9078\u7BA1\u7406\u6B0A\u9650\u3002";
    }
    function syncRegions(changed) {
      if (changed && changed.checked) {
        var otherName = changed.name === "primaryRegions" ? "supportRegions" : "primaryRegions";
        var twin = form.querySelector("[name=" + otherName + '][value="' + CSS.escape(changed.value) + '"]');
        if (twin) twin.checked = false;
      }
      COUNTIES.forEach(function(c) {
        var p = form.querySelector('[name=primaryRegions][value="' + CSS.escape(c) + '"]'), s = form.querySelector('[name=supportRegions][value="' + CSS.escape(c) + '"]');
        s.disabled = p.checked;
        p.disabled = s.checked;
      });
    }
    syncEng();
    syncAdmin();
    syncRegions();
    form.elements.title.addEventListener("change", syncEng);
    form.elements.account.addEventListener("input", syncAdmin);
    form.addEventListener("change", function(ev) {
      var t = ev.target;
      if (t && (t.name === "primaryRegions" || t.name === "supportRegions")) syncRegions(t);
    });
    form.onsubmit = async function(ev) {
      ev.preventDefault();
      var f = ev.target, error = dialog.querySelector("[role=alert]"), empId = f.elements.employeeId.value.trim(), name = f.elements.engineerName.value.trim(), title = f.elements.title.value, account = f.elements.account.value.trim(), fd = new FormData(f), primary = countyList(fd.getAll("primaryRegions")), support = countyList(fd.getAll("supportRegions")), skills = fd.getAll("skills"), eng = ENG_TITLES.indexOf(title) >= 0;
      if (!empId || !name) {
        error.textContent = "\u8ACB\u586B\u5BEB\u54E1\u5DE5\u7DE8\u865F\u8207\u59D3\u540D\u3002";
        return;
      }
      if (!title) {
        error.textContent = "\u8ACB\u9078\u64C7\u8077\u4F4D\u3002";
        return;
      }
      if (ROSTER.some(function(e) {
        return e.id !== id && lc(e.employeeId) === empId.toLowerCase();
      })) {
        error.textContent = "\u54E1\u5DE5\u7DE8\u865F\u300C" + empId + "\u300D\u5DF2\u88AB\u4F7F\u7528\uFF0C\u8ACB\u78BA\u8A8D\u5F8C\u518D\u8F38\u5165\u3002";
        return;
      }
      if (ROSTER.some(function(e) {
        return e.id !== id && String(e.name || "").trim() === name;
      })) {
        error.textContent = "\u5DF2\u6709\u540C\u540D\u4EBA\u54E1\uFF1B\u8ACB\u7528\u53EF\u8FA8\u8B58\u7684\u59D3\u540D\uFF0C\u907F\u514D LINE \u901A\u77E5\u9001\u932F\u5C0D\u8C61\u3002";
        return;
      }
      if (account && ROSTER.some(function(e) {
        return e.id !== id && lc(e.account) === account.toLowerCase();
      })) {
        error.textContent = "\u5E33\u865F\u300C" + account + "\u300D\u5DF2\u88AB\u5176\u4ED6\u4EBA\u54E1\u4F7F\u7528\u3002";
        return;
      }
      if (primary.some(function(c) {
        return support.indexOf(c) >= 0;
      })) {
        error.textContent = "\u540C\u4E00\u7E23\u5E02\u4E0D\u80FD\u540C\u6642\u662F\u4E3B\u8981\u8CA0\u8CAC\u8207\u652F\u63F4\u3002";
        return;
      }
      if (eng && (!skills.length || !(primary.length + support.length))) {
        error.textContent = "\u5DE5\u7A0B\u5E2B\u8ACB\u81F3\u5C11\u52FE\u9078\u4E00\u9805\u5DE5\u4F5C\u985E\u5225\uFF0C\u53CA\u4E00\u500B\u4E3B\u8981\u8CA0\u8CAC\u6216\u652F\u63F4\u7E23\u5E02\u3002";
        return;
      }
      var admin = ownerRow || selfRow || !!f.elements.admin.checked && isEmail(account);
      var obj = Object.assign({}, old || {}, { id: old ? old.id : crypto.randomUUID(), employeeId: empId, name, title, account, password: f.elements.password.value, primaryRegions: primary, supportRegions: support, admin, active: old ? old.active !== false : true });
      delete obj.legacyEngineer;
      delete obj.legacyTitle;
      delete obj.legacyArea;
      delete obj.regions;
      delete obj.area;
      if (eng) obj.skills = skills;
      var next = old ? ROSTER.map(function(e) {
        return e.id === old.id ? obj : e;
      }) : ROSTER.concat([obj]);
      var button = f.querySelector("[type=submit]");
      button.disabled = true;
      try {
        var warn = await saveRoster(next);
        dialog.close();
        dialog.remove();
        renderRosterManager();
        notify(warn || "\u4EBA\u54E1\u540D\u55AE\u5DF2\u5132\u5B58\u3002");
      } catch (e) {
        error.textContent = e.message || "\u5132\u5B58\u5931\u6557\u3002";
        button.disabled = false;
      }
    };
    dialog.showModal();
  }
  var IMPORT_HEADERS = { "\u54E1\u5DE5\u7DE8\u865F": "employeeId", "\u59D3\u540D": "name", "\u8077\u4F4D": "title", "\u4E3B\u8981\u8CA0\u8CAC\u5340\u57DF": "primary", "\u4E3B\u8981\u8CA0\u8CAC": "primary", "\u4E3B\u8981\u8CA0\u8CAC\u7E23\u5E02": "primary", "\u652F\u63F4\u5340\u57DF": "support", "\u652F\u63F4": "support", "\u652F\u63F4\u7E23\u5E02": "support", "\u5E33\u865F": "account", "\u5BC6\u78BC": "password", "\u7BA1\u7406\u6B0A\u9650": "admin" };
  function parseDelimited(text) {
    text = String(text || "").replace(/^﻿/, "");
    var first = text.split(/\r?\n/, 1)[0] || "", d = first.indexOf("	") >= 0 ? "	" : ",";
    var rows = [], row = [], cell = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (q) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            cell += '"';
            i++;
          } else q = false;
        } else cell += c;
      } else if (c === '"' && cell.trim() === "") {
        cell = "";
        q = true;
      } else if (c === d) {
        row.push(cell);
        cell = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else cell += c;
    }
    if (cell !== "" || row.length) {
      row.push(cell);
      rows.push(row);
    }
    return rows.filter(function(r) {
      return r.some(function(x) {
        return String(x).trim() !== "";
      });
    });
  }
  function planImport(text) {
    var table = parseDelimited(text);
    if (table.length < 2) return { error: "\u6C92\u6709\u53EF\u532F\u5165\u7684\u8CC7\u6599\uFF08\u7B2C\u4E00\u5217\u9808\u70BA\u6A19\u984C\u5217\uFF0C\u7B2C\u4E8C\u5217\u8D77\u70BA\u4EBA\u54E1\uFF09\u3002" };
    var head = table[0].map(function(h) {
      return String(h).replace(/^﻿/, "").replace(/[\s*＊]/g, "");
    }), map = {};
    head.forEach(function(h, i) {
      var k = IMPORT_HEADERS[h];
      if (k && map[k] == null) map[k] = i;
    });
    var legacy = head.indexOf("\u5340\u57DF");
    if (legacy >= 0 && map.primary == null) map.primary = legacy;
    if (map.employeeId == null || map.name == null) return { error: "\u6A19\u984C\u5217\u9700\u5305\u542B\u300C\u54E1\u5DE5\u7DE8\u865F\u300D\u8207\u300C\u59D3\u540D\u300D\u6B04\u4F4D\u3002" };
    var body = table.slice(1), counts = {};
    body.forEach(function(r) {
      var k = lc(r[map.employeeId]);
      if (k) counts[k] = (counts[k] || 0) + 1;
    });
    var next = ROSTER.map(function(e) {
      return Object.assign({}, e);
    }), rows = [];
    body.forEach(function(r, idx) {
      var errors = [], warnings = [];
      function get(k) {
        return map[k] == null ? null : String(r[map[k]] == null ? "" : r[map[k]]).trim();
      }
      var empId = get("employeeId"), name = get("name");
      if (!empId) errors.push("\u7F3A\u5C11\u54E1\u5DE5\u7DE8\u865F");
      if (!name) errors.push("\u7F3A\u5C11\u59D3\u540D");
      if (empId && counts[lc(empId)] > 1) errors.push("\u6A94\u6848\u5167\u54E1\u5DE5\u7DE8\u865F\u91CD\u8907");
      var titleRaw = get("title"), title = null;
      if (titleRaw) {
        var t = titleRaw.replace(/台/g, "\u81FA");
        if (TITLES.indexOf(t) < 0) errors.push("\u8077\u4F4D\u300C" + titleRaw + "\u300D\u4E0D\u5728\u6E05\u55AE\u5167");
        else title = t;
      }
      function counties(raw, label) {
        if (!raw) return null;
        var out = [];
        raw.split(/[、,，\/\s;；]+/).filter(Boolean).forEach(function(p) {
          var c2 = normCounty(p);
          if (!c2) errors.push(label + "\u300C" + p + "\u300D\u4E0D\u662F\u81FA\u7063\u7E23\u5E02");
          else if (out.indexOf(c2) < 0) out.push(c2);
        });
        return out;
      }
      var prim = counties(get("primary"), "\u4E3B\u8981\u8CA0\u8CAC\u5340\u57DF"), sup = counties(get("support"), "\u652F\u63F4\u5340\u57DF");
      if (prim && sup) {
        var both = prim.filter(function(c2) {
          return sup.indexOf(c2) >= 0;
        });
        if (both.length) errors.push("\u300C" + both.join("\u3001") + "\u300D\u540C\u6642\u5728\u4E3B\u8981\u8CA0\u8CAC\u8207\u652F\u63F4");
      }
      var account = get("account"), password = get("password"), adminRaw = get("admin"), adminVal = null;
      if (adminRaw) {
        if (/^(是|有|y|yes|true|1|v|✓|✔|○)$/i.test(adminRaw)) adminVal = true;
        else if (/^(否|無|n|no|false|0|x|✗|-)$/i.test(adminRaw)) adminVal = false;
        else errors.push("\u7BA1\u7406\u6B0A\u9650\u8ACB\u586B\u300C\u662F\u300D\u6216\u300C\u5426\u300D");
      }
      var target = empId ? next.find(function(e) {
        return lc(e.employeeId) === lc(empId);
      }) : null;
      if (!target && name) {
        var c = next.filter(function(e) {
          return !e.employeeId && String(e.name).trim() === name;
        });
        if (c.length === 1) target = c[0];
      }
      var m = target ? Object.assign({}, target) : { id: crypto.randomUUID(), employeeId: "", name: "", title: "", account: "", password: "", primaryRegions: [], supportRegions: [], active: true, admin: false };
      if (target && name && name !== target.name && (isEngineer(target) || JOBS.some(function(j) {
        return j.engineer === target.name;
      }))) errors.push("\u59D3\u540D\u5DF2\u7528\u65BC\u5DE5\u55AE\u6216 LINE\uFF0C\u8ACB\u5728\u7CFB\u7D71\u5167\u4FEE\u6539");
      if (name && next.some(function(e) {
        return e !== target && String(e.name).trim() === name;
      })) errors.push("\u5DF2\u6709\u540C\u540D\u4EBA\u54E1");
      m.employeeId = empId || "";
      m.name = name || "";
      if (title) {
        m.title = title;
        delete m.legacyEngineer;
        delete m.legacyTitle;
      }
      if (account) m.account = account;
      if (password) m.password = password;
      if (prim) {
        m.primaryRegions = prim;
        if (!sup) m.supportRegions = (m.supportRegions || []).filter(function(c2) {
          return prim.indexOf(c2) < 0;
        });
        delete m.legacyArea;
      }
      if (sup) {
        m.supportRegions = sup;
        if (!prim) m.primaryRegions = (m.primaryRegions || []).filter(function(c2) {
          return sup.indexOf(c2) < 0;
        });
        delete m.legacyArea;
      }
      if (adminVal !== null) m.admin = adminVal;
      if (m.admin && !isEmail(m.account) && !isOwnerRow(m)) {
        if (adminVal) errors.push("\u7BA1\u7406\u6B0A\u9650\u9700\u8981\u6709\u6548 Email \u5E33\u865F");
        else m.admin = false;
      }
      if (m.account && next.some(function(e) {
        return e !== target && lc(e.account) === lc(m.account);
      })) errors.push("\u5E33\u865F\u5DF2\u88AB\u5176\u4ED6\u4EBA\u54E1\u4F7F\u7528");
      if (!m.title && !m.legacyEngineer) warnings.push("\u672A\u586B\u8077\u4F4D\uFF0C\u532F\u5165\u5F8C\u8ACB\u9078\u64C7\u8077\u4F4D");
      if (isEngineer(m) && !(m.skills || []).length) warnings.push("\u5DE5\u7A0B\u5E2B\u5C1A\u672A\u8A2D\u5B9A\u5DE5\u4F5C\u985E\u5225\uFF0C\u532F\u5165\u5F8C\u8ACB\u6309\u300C\u7DE8\u8F2F\u300D\u88DC\u4E0A");
      rows.push({ line: idx + 2, m, errors, warnings, action: errors.length ? "skip" : target ? "update" : "add" });
      if (!errors.length) {
        if (target) next[next.indexOf(target)] = m;
        else next.push(m);
      }
    });
    return { rows, next, add: rows.filter(function(x) {
      return x.action === "add";
    }).length, update: rows.filter(function(x) {
      return x.action === "update";
    }).length, skip: rows.filter(function(x) {
      return x.action === "skip";
    }).length };
  }
  function renderImportPreview(dialog) {
    var box = dialog.querySelector("#import-preview"), btn = dialog.querySelector("[data-import=confirm]"), error = dialog.querySelector("[role=alert]"), plan = IMPORT_PLAN;
    error.textContent = "";
    if (!plan) {
      box.innerHTML = "";
      btn.disabled = true;
      return;
    }
    if (plan.error) {
      box.innerHTML = "";
      error.textContent = plan.error;
      btn.disabled = true;
      return;
    }
    box.innerHTML = '<p class="import-summary" id="import-summary">\u65B0\u589E <b>' + plan.add + "</b> \u4F4D\u3001\u66F4\u65B0 <b>" + plan.update + "</b> \u4F4D\u3001\u7565\u904E <b>" + plan.skip + '</b> \u5217\uFF08\u6709\u932F\u8AA4\uFF09\u3002\u540D\u55AE\u4E2D\u672A\u51FA\u73FE\u7684\u4EBA\u54E1\u4E0D\u6703\u88AB\u522A\u9664\u3002</p><div class="import-scroll"><table class="import-table"><thead><tr><th>\u5217</th><th>\u54E1\u5DE5\u7DE8\u865F</th><th>\u59D3\u540D</th><th>\u8077\u4F4D</th><th>\u4E3B\u8981\u8CA0\u8CAC</th><th>\u652F\u63F4</th><th>\u5E33\u865F</th><th>\u5BC6\u78BC</th><th>\u7BA1\u7406\u6B0A\u9650</th><th>\u7D50\u679C</th></tr></thead><tbody>' + plan.rows.map(function(x) {
      var m = x.m;
      return '<tr class="' + (x.errors.length ? "import-bad" : "import-ok") + '" data-line="' + x.line + '"><td>' + x.line + "</td><td>" + esc(m.employeeId) + "</td><td>" + esc(m.name) + "</td><td>" + esc(m.title || "\u2014") + "</td><td>" + esc((m.primaryRegions || []).join("\u3001") || "\u2014") + "</td><td>" + esc((m.supportRegions || []).join("\u3001") || "\u2014") + "</td><td>" + esc(m.account || "\u2014") + "</td><td>" + (m.password ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "\u2014") + "</td><td>" + (isOwnerRow(m) ? "\u64C1\u6709\u8005" : hasAdmin(m) ? "\u662F" : "\u5426") + "</td><td>" + (x.errors.length ? '<b class="import-err">\u7565\u904E\uFF1A' + esc(x.errors.join("\uFF1B")) + "</b>" : x.action === "add" ? "\u65B0\u589E" : "\u66F4\u65B0") + (x.warnings.length ? '<div class="p2-sub">' + esc(x.warnings.join("\uFF1B")) + "</div>" : "") + "</td></tr>";
    }).join("") + "</tbody></table></div>";
    btn.disabled = !(plan.add + plan.update);
    btn.textContent = "\u78BA\u8A8D\u532F\u5165\uFF08" + (plan.add + plan.update) + " \u4F4D\uFF09";
  }
  function importDialog() {
    IMPORT_PLAN = null;
    IMPORT_FILE_TEXT = null;
    var prev = document.getElementById("import-dialog");
    if (prev) prev.remove();
    var dialog = document.createElement("dialog");
    dialog.className = "p2-dialog import-dialog";
    dialog.id = "import-dialog";
    dialog.setAttribute("aria-label", "\u532F\u5165\u540D\u55AE");
    document.body.appendChild(dialog);
    dialog.innerHTML = '<h2>\u532F\u5165\u540D\u55AE</h2><p class="p2-sub">\u4E0A\u50B3 CSV\uFF08UTF-8\uFF0C\u53EF\u542B BOM\uFF09\u6216\u5F9E Excel \u8907\u88FD\u5F8C\u8CBC\u4E0A\u3002\u7B2C\u4E00\u5217\u70BA\u6A19\u984C\uFF1A\u54E1\u5DE5\u7DE8\u865F\u3001\u59D3\u540D\u3001\u8077\u4F4D\u3001\u4E3B\u8981\u8CA0\u8CAC\u5340\u57DF\u3001\u652F\u63F4\u5340\u57DF\u3001\u5E33\u865F\u3001\u5BC6\u78BC\u3001\u7BA1\u7406\u6B0A\u9650\uFF08\u820A\u300C\u5340\u57DF\u300D\u6B04\u8996\u70BA\u4E3B\u8981\u8CA0\u8CAC\uFF1B\u5176\u4ED6\u6B04\u4F4D\u5FFD\u7565\uFF09\u3002\u591A\u500B\u7E23\u5E02\u4EE5\u300C\u3001\u300D\u300C,\u300D\u300C/\u300D\u6216\u7A7A\u767D\u5206\u9694\u3002\u4F9D\u54E1\u5DE5\u7DE8\u865F\u5408\u4F75\uFF1A\u5DF2\u5B58\u5728\u8005\u66F4\u65B0\u3001\u65B0\u7DE8\u865F\u65B0\u589E\uFF0C\u540D\u55AE\u5916\u7684\u4EBA\u54E1\u4E0D\u6703\u522A\u9664\uFF1B\u7A7A\u767D\u6B04\u4F4D\u4FDD\u7559\u539F\u8CC7\u6599\u3002\u6709\u932F\u8AA4\u7684\u5217\u6703\u7565\u904E\u3002</p><form id="import-form" autocomplete="off"><div class="p2-form"><label class="p2-wide">\u9078\u64C7 CSV \u6A94<input type="file" name="file" accept=".csv,.tsv,.txt,text/csv,text/plain"></label><label class="p2-wide">\u6216\u8CBC\u4E0A Excel \u5167\u5BB9<textarea name="text" rows="5" spellcheck="false" placeholder="\u54E1\u5DE5\u7DE8\u865F	\u59D3\u540D	\u8077\u4F4D	\u4E3B\u8981\u8CA0\u8CAC\u5340\u57DF	\u652F\u63F4\u5340\u57DF	\u5E33\u865F	\u5BC6\u78BC	\u7BA1\u7406\u6B0A\u9650"></textarea></label></div><p class="req-error" role="alert"></p><div id="import-preview"></div><div class="p2-actions"><button type="button" class="p2-btn secondary" data-import="preview">\u9810\u89BD</button><button type="button" class="p2-btn" data-import="confirm" disabled>\u78BA\u8A8D\u532F\u5165</button><button type="button" class="p2-btn secondary" data-import="close">\u53D6\u6D88</button></div></form>';
    var form = dialog.querySelector("form");
    form.elements.file.addEventListener("change", async function() {
      var file = form.elements.file.files[0];
      IMPORT_FILE_TEXT = null;
      if (!file) {
        IMPORT_PLAN = null;
        renderImportPreview(dialog);
        return;
      }
      if (file.size > 2e6) {
        IMPORT_PLAN = { error: "\u6A94\u6848\u904E\u5927\uFF08\u4E0A\u9650 2MB\uFF09\u3002" };
        renderImportPreview(dialog);
        return;
      }
      try {
        IMPORT_FILE_TEXT = await file.text();
        IMPORT_PLAN = planImport(IMPORT_FILE_TEXT);
      } catch (e) {
        IMPORT_PLAN = { error: "\u7121\u6CD5\u8B80\u53D6\u6A94\u6848\uFF0C\u8ACB\u78BA\u8A8D\u70BA UTF-8 CSV\u3002" };
      }
      renderImportPreview(dialog);
    });
    form.elements.text.addEventListener("input", function() {
      IMPORT_FILE_TEXT = null;
      form.elements.file.value = "";
      IMPORT_PLAN = null;
      renderImportPreview(dialog);
    });
    dialog.addEventListener("click", async function(ev) {
      var b = ev.target.closest("[data-import]");
      if (!b) return;
      var type = b.dataset.import;
      if (type === "close") {
        IMPORT_PLAN = null;
        IMPORT_FILE_TEXT = null;
        dialog.close();
        dialog.remove();
        return;
      }
      if (type === "preview") {
        var text = IMPORT_FILE_TEXT != null ? IMPORT_FILE_TEXT : form.elements.text.value;
        IMPORT_PLAN = text.trim() ? planImport(text) : { error: "\u8ACB\u9078\u64C7 CSV \u6A94\u6216\u8CBC\u4E0A Excel \u5167\u5BB9\u3002" };
        renderImportPreview(dialog);
        return;
      }
      if (type === "confirm") {
        var plan = IMPORT_PLAN;
        if (!plan || plan.error || !(plan.add + plan.update)) return;
        b.disabled = true;
        try {
          var warn = await saveRoster(plan.next);
          IMPORT_PLAN = null;
          IMPORT_FILE_TEXT = null;
          dialog.close();
          dialog.remove();
          renderRosterManager();
          notify("\u5DF2\u532F\u5165\uFF1A\u65B0\u589E " + plan.add + " \u4F4D\u3001\u66F4\u65B0 " + plan.update + " \u4F4D\u3001\u7565\u904E " + plan.skip + " \u5217\u3002" + (warn ? " " + warn : ""));
        } catch (e) {
          dialog.querySelector("[role=alert]").textContent = e.message || "\u532F\u5165\u5931\u6557\u3002";
          b.disabled = false;
        }
      }
    });
    dialog.showModal();
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function(ok, fail) {
      var t = document.createElement("textarea");
      t.value = text;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      var done = false;
      try {
        done = document.execCommand("copy");
      } catch (e) {
      }
      t.remove();
      done ? ok() : fail(Error("copy"));
    });
  }
  document.addEventListener("input", function(ev) {
    if (ev.target && ev.target.id === "people-search") {
      PQ = ev.target.value;
      renderPeopleList();
    }
  });
  document.addEventListener("change", function(ev) {
    var t = ev.target;
    if (!t) return;
    if (t.id === "people-county") {
      PCOUNTY = t.value;
      renderPeopleList();
    } else if (t.id === "people-primary") {
      PPRIMARY = t.checked;
      renderPeopleList();
    } else if (t.id === "people-title") {
      PTITLE = t.value;
      renderPeopleList();
    }
  });
  document.addEventListener("click", function(ev) {
    var b = ev.target.closest("[data-people]");
    if (!b) return;
    var type = b.dataset.people;
    if (type === "sort") {
      PSORT = PSORT === "asc" ? "desc" : "asc";
      var sb = document.querySelector(".people-filters [data-people=sort]");
      if (sb) sb.textContent = "\u54E1\u5DE5\u7DE8\u865F " + (PSORT === "asc" ? "\u2191" : "\u2193");
      renderPeopleList();
      return;
    }
    if (type === "pw-edit") {
      var input = b.parentNode.querySelector("input");
      var show = input.type === "password";
      input.type = show ? "text" : "password";
      b.textContent = show ? "\u96B1\u85CF" : "\u986F\u793A";
      return;
    }
    var item = ROSTER.find(function(e) {
      return e.id === b.dataset.id;
    });
    if (!item) return;
    if (type === "reveal") {
      PREVEAL[item.id] = !PREVEAL[item.id];
      renderPeopleList();
      var again = document.querySelector('[data-people=reveal][data-id="' + CSS.escape(item.id) + '"]');
      if (again) again.focus();
      return;
    }
    if (type === "copy") {
      copyText(String(item.password || "")).then(function() {
        notify("\u5DF2\u8907\u88FD\u300C" + item.name + "\u300D\u7684\u5BC6\u78BC\u3002");
      }, function() {
        notify("\u7121\u6CD5\u8907\u88FD\uFF0C\u8ACB\u6309\u300C\u986F\u793A\u300D\u5F8C\u624B\u52D5\u8907\u88FD\u3002");
      });
    }
  });
  document.addEventListener("click", async function(ev) {
    var b = ev.target.closest("[data-roster]");
    if (!b) return;
    var type = b.dataset.roster;
    if (type === "new") {
      rosterEditor();
      return;
    }
    if (type === "import") {
      importDialog();
      return;
    }
    if (type === "edit") {
      rosterEditor(b.dataset.id);
      return;
    }
    if (type === "close") {
      var d = document.getElementById("roster-dialog");
      if (d) {
        d.close();
        d.remove();
      }
      return;
    }
    var item = ROSTER.find(function(e) {
      return e.id === b.dataset.id;
    });
    if (!item) return;
    if (type === "toggle") {
      if (!confirm((item.active ? "\u505C\u7528" : "\u555F\u7528") + "\u300C" + item.name + "\u300D\uFF1F\u65E2\u6709\u5DE5\u55AE\u4E0D\u6703\u66F4\u52D5\u3002")) return;
      b.disabled = true;
      try {
        var w = await saveRoster(ROSTER.map(function(e) {
          return e.id === item.id ? Object.assign({}, e, { active: !e.active }) : e;
        }));
        renderRosterManager();
        notify(w || "\u5DE5\u7A0B\u5E2B\u72C0\u614B\u5DF2\u66F4\u65B0\u3002");
      } catch (e) {
        b.disabled = false;
        notify(e.message || "\u66F4\u65B0\u5931\u6557\u3002");
      }
      return;
    }
    if (type === "delete") {
      if (ROSTER_ONLY && SELF_EMAIL && lc(item.account) === SELF_EMAIL) {
        notify("\u7121\u6CD5\u522A\u9664\u81EA\u5DF1\u7684\u8CC7\u6599\uFF1B\u8ACB\u7531\u64C1\u6709\u8005\u6216\u5176\u4ED6\u7BA1\u7406\u8005\u8655\u7406\u3002");
        return;
      }
      if (!confirm("\u78BA\u5B9A\u522A\u9664\u300C" + item.name + "\u300D" + (item.employeeId ? "\uFF08" + item.employeeId + "\uFF09" : "") + "\uFF1F" + (isEngineer(item) ? "\u65E2\u6709\u5DE5\u55AE\u4ECD\u4FDD\u7559\u539F\u5DE5\u7A0B\u5E2B\u59D3\u540D\uFF0C\u4F46\u4E4B\u5F8C\u4E0D\u6703\u518D\u88AB\u63A8\u85A6\u6D3E\u5DE5\u3002" : "\u6B64\u52D5\u4F5C\u7121\u6CD5\u5FA9\u539F\u3002") + (hasAdmin(item) && !isOwnerRow(item) ? "\u5176\u7BA1\u7406\u6B0A\u9650\u4E5F\u6703\u4E00\u4F75\u79FB\u9664\u3002" : ""))) return;
      b.disabled = true;
      try {
        var w2 = await saveRoster(ROSTER.filter(function(e) {
          return e.id !== item.id;
        }));
        delete PREVEAL[item.id];
        renderRosterManager();
        notify(w2 || "\u5DF2\u522A\u9664\u300C" + item.name + "\u300D\u3002");
      } catch (e) {
        b.disabled = false;
        notify(e.message || "\u522A\u9664\u5931\u6557\u3002");
      }
    }
  });
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function localDate(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function localInput(d) {
    return localDate(d) + "T" + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function stamp(t) {
    return new Date(t).toLocaleString("zh-TW", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
  }
  function notify(msg) {
    var old = document.querySelector(".p2-toast");
    if (old) old.remove();
    var el = document.createElement("div");
    el.className = "p2-toast";
    el.setAttribute("role", "status");
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function() {
      el.remove();
    }, 4e3);
  }
  function persist() {
    try {
      window.leyanCloudStore.setItem(P2KEY, JSON.stringify(JOBS));
    } catch (e) {
      notify("\u700F\u89BD\u5668\u7121\u6CD5\u5132\u5B58\uFF1B\u672C\u6B21\u8B8A\u66F4\u5C1A\u672A\u5132\u5B58\uFF0C\u8ACB\u67E5\u770B\u540C\u6B65\u72C0\u614B\u3002");
    }
    DISPATCH = JOBS;
  }
  function history(j, text) {
    j.history = j.history || [];
    j.history.push({ at: (/* @__PURE__ */ new Date()).toISOString(), text });
  }
  function initJobs() {
    try {
      var data = JSON.parse(window.leyanCloudStore.getItem(P2KEY));
      if (Array.isArray(data) && data.every(function(j) {
        return j.id && j.client && j.received && Array.isArray(j.history);
      })) JOBS = data;
    } catch (e) {
    }
    if (!JOBS.length) {
      var now = /* @__PURE__ */ new Date();
      JOBS = DISPATCH.slice(0, 4).map(function(d, i) {
        return { id: d.id, client: "\u793A\u7BC4\u5BA2\u6236 " + (i + 1), region: d.region, category: d.category, engineer: ENGINEERS[d.region + "|" + d.category], received: now.toISOString(), date: "", start: null, end: null, hours: 2, buffer: 30, urgent: i === 0, status: "\u5F85\u6D3E\u5DE5", note: d.note, history: [{ at: now.toISOString(), text: "\u5EFA\u7ACB\u793A\u7BC4\u5831\u4FEE" }] };
      });
      persist();
    }
    DISPATCH = JOBS;
  }
  function opts(list, current) {
    return list.map(function(x) {
      return "<option" + (x === current ? " selected" : "") + ">" + esc(x) + "</option>";
    }).join("");
  }
  function statusLabel(j) {
    var due = new Date(new Date(j.received).getTime() + 72 * 36e5);
    return esc(j.status) + (j.status !== "\u5DF2\u5B8C\u6210" && due < /* @__PURE__ */ new Date() ? ' <span style="color:#b91c1c">\u903E\u671F</span>' : "");
  }
  function renderDispatch() {
    var shown = JOBS.filter(function(j) {
      return (RF === "\u5168\u90E8" || j.region === RF) && (SF === "\u5168\u90E8" || j.status === SF) && (!SEARCH || (j.id + j.client + j.note + j.engineer).toLowerCase().includes(SEARCH.toLowerCase()));
    });
    document.getElementById("content").innerHTML = '<div class="p2-head"><div><h2>\u5831\u4FEE\u6D3E\u5DE5</h2><div class="p2-sub">\u63A5\u55AE\u3001\u6392\u7A0B\u3001\u5230\u5834\u8207\u518D\u8A2A\uFF0C\u96C6\u4E2D\u8FFD\u8E64\u3002</div></div><button class="p2-btn" data-p2="new">\uFF0B \u65B0\u589E\u6D3E\u5DE5</button></div><div id="line-inbox-banner"></div><div class="p2-grid">' + ["\u5F85\u6D3E\u5DE5", "\u5DF2\u6D3E\u5DE5", "\u9032\u884C\u4E2D", "\u5F85\u6599"].map(function(st) {
      return '<div class="p2-stat"><b>' + JOBS.filter(function(j) {
        return j.status === st;
      }).length + "</b><span>" + st + "</span></div>";
    }).join("") + '</div><div class="p2-note">\u4E00\u822C\u6D3E\u5DE5\u907F\u958B\u9031\u516D\u3001\u9031\u65E5\u53CA\u570B\u5B9A\u5047\u65E5\uFF1B\u7DCA\u6025\u6D3E\u5DE5\u4E0D\u9650\u5047\u65E5\uFF0C\u512A\u5148\u5EFA\u8B70\u6700\u65E9\u7A7A\u6A94\u3002\u4E00\u822C\u6642\u6BB5 09:30\u300111:30\u300113:30\u300115:30\uFF0C\u6BCF\u4F4D\u5DE5\u7A0B\u5E2B\u6BCF\u65E5\u4E00\u822C\u6848\u4EF6\u6700\u591A 4 \u4EF6\uFF1B\u9810\u8A2D\u5DE5\u6642 1 \u5C0F\u6642\u3001\u4EA4\u901A\u7DE9\u885D 30 \u5206\u9418\u3002\u672A\u8B80\u53D6 Google \u884C\u4E8B\u66C6\u3002</div><div class="p2-filters"><input aria-label="\u641C\u5C0B\u5DE5\u55AE" id="p2-search" placeholder="\u641C\u5C0B\u5BA2\u6236\u3001\u5DE5\u55AE\u6216\u554F\u984C" value="' + esc(SEARCH) + '"><select id="p2-region" aria-label="\u5730\u5340">' + opts(["\u5168\u90E8", "\u96D9\u5317", "\u6843\u7AF9"].concat(COUNTIES), RF) + '</select><select id="p2-status" aria-label="\u5DE5\u55AE\u72C0\u614B">' + opts(["\u5168\u90E8", "\u5F85\u6D3E\u5DE5", "\u5DF2\u6D3E\u5DE5", "\u9032\u884C\u4E2D", "\u5F85\u6599", "\u5F85\u518D\u8A2A", "\u5DF2\u5B8C\u6210", "\u5DF2\u53D6\u6D88"], SF) + '</select><button class="p2-btn secondary" data-p2="calendar">\u67E5\u770B\u6392\u7A0B</button></div><div class="card p2-table"><table><thead><tr><th>\u5DE5\u55AE\uFF0F\u5BA2\u6236</th><th>\u5340\u57DF\uFF0F\u985E\u5225</th><th>\u5DE5\u7A0B\u5E2B</th><th>\u9810\u5B9A\u5230\u5834</th><th>\u72C0\u614B</th></tr></thead><tbody>' + shown.map(function(j) {
      return '<tr class="p2-row"><td><button style="text-align:left;padding:10px 0" data-job="' + esc(j.id) + '"><b>' + esc(j.client) + '</b><div class="p2-sub">' + esc(j.id) + (j.parent ? " \xB7 \u518D\u8A2A " + esc(j.parent) : "") + (j.urgent ? " \xB7 \u6025\u4EF6" : "") + "</div></button></td><td>" + esc(j.region) + "<br>" + esc(j.category) + "</td><td>" + esc(j.engineer) + "</td><td>" + (j.start ? stamp(j.start) : "\u5C1A\u672A\u5B89\u6392") + "</td><td>" + statusLabel(j) + "</td></tr>";
    }).join("") + "</tbody></table>" + (shown.length ? "" : '<div class="p2-empty">\u6C92\u6709\u7B26\u5408\u7684\u5DE5\u55AE</div>') + "</div>" + (DSEL ? jobPanel(JOBS.find(function(j) {
      return j.id === DSEL;
    })) : "");
    document.getElementById("p2-search").oninput = function(e) {
      var pos = e.target.selectionStart;
      SEARCH = e.target.value;
      renderDispatch();
      var f = document.getElementById("p2-search");
      f.focus();
      f.setSelectionRange(pos, pos);
    };
    document.getElementById("p2-region").onchange = function(e) {
      RF = e.target.value;
      renderDispatch();
    };
    document.getElementById("p2-status").onchange = function(e) {
      SF = e.target.value;
      renderDispatch();
    };
    lineBanner();
    loadLine(false);
  }
  function jobPanel(j) {
    if (!j) return "";
    var terminal = ["\u5DF2\u5B8C\u6210", "\u5DF2\u53D6\u6D88"].includes(j.status);
    return '<section class="card p2-panel" id="p2-detail"><div class="p2-head"><h3>' + esc(j.id) + " \xB7 " + esc(j.client) + '</h3><button data-p2="close">\u95DC\u9589\u8A73\u60C5 \u2715</button></div><p>' + esc(j.note) + '</p><p style="margin-top:12px">\u5831\u4FEE\uFF1A' + stamp(j.received) + "\u3000\u671F\u9650\uFF1A" + stamp(new Date(new Date(j.received).getTime() + 72 * 36e5)) + "</p>" + (j.requestedStart ? '<p class="p2-sub">\u6307\u5B9A\u5230\u5834\uFF1A' + stamp(j.requestedStart) + "</p>" : "") + '<p class="p2-sub">\u5DE5\u6642 ' + j.hours + " \u5C0F\u6642\uFF0F\u4EA4\u901A\u7DE9\u885D " + j.buffer + " \u5206\u9418\uFF5C" + esc(j.engineer) + '</p><div class="p2-actions">' + (!terminal ? '<button class="p2-btn" data-action="slots">' + (j.start ? "\u91CD\u65B0\u6392\u7A0B" : "\u67E5\u8A62\u7A7A\u6A94\uFF0F\u6D3E\u5DE5") + "</button>" + (!j.start && j.requestedStart ? '<button class="p2-btn secondary" data-action="clear-requested">\u6E05\u9664\u6307\u5B9A\u6642\u9593\uFF0C\u67E5\u8A62\u5176\u4ED6\u6642\u6BB5</button>' : "") : "") + (j.status === "\u5DF2\u6D3E\u5DE5" && j.start && !j.departedAt ? '<button class="p2-btn" data-action="depart">\u5DE5\u7A0B\u5E2B\u51FA\u767C</button>' : "") + (j.status === "\u5DF2\u6D3E\u5DE5" ? '<button class="p2-btn secondary" data-action="start">\u958B\u59CB\u8655\u7406</button>' : "") + (j.status === "\u9032\u884C\u4E2D" ? '<button class="p2-btn secondary" data-action="wait">\u6A19\u8A18\u5F85\u6599</button><button class="p2-btn" data-action="complete">\u78BA\u8A8D\u5B8C\u6210</button>' : "") + (["\u9032\u884C\u4E2D", "\u5F85\u6599"].includes(j.status) ? '<button class="p2-btn secondary" data-action="revisit">\u5EFA\u7ACB\u518D\u8A2A\u55AE</button>' : "") + (!terminal ? '<button class="p2-btn secondary" data-action="cancel">\u53D6\u6D88\u5DE5\u55AE</button>' : "") + (j.start && j.status !== "\u5DF2\u53D6\u6D88" ? '<button class="p2-btn secondary" data-job-calendar="' + esc(j.id) + '">\u5728\u6708\u66C6\u67E5\u770B</button>' : "") + '</div><div id="p2-slotbox"></div><h4 style="margin-top:20px">\u8655\u7406\u7D00\u9304</h4>' + (j.history || []).map(function(h) {
      return '<div class="p2-history">' + stamp(h.at) + "\u3000" + esc(h.text) + "</div>";
    }).join("") + '<p class="p2-sub">\u78BA\u8A8D\u3001\u6539\u671F\u3001\u53D6\u6D88\u3001\u51FA\u767C\u8207\u5B8C\u5DE5\u5728\u96F2\u7AEF\u5132\u5B58\u6210\u529F\u5F8C\uFF0C\u6703\u4EE5 LINE \u901A\u77E5\u5DF2\u7D81\u5B9A\u7684\u5DE5\u7A0B\u5E2B\uFF0F\u5BA2\u6236\uFF1B\u901A\u77E5\u5931\u6557\u4E0D\u5F71\u97FF\u5DE5\u55AE\u3002</p></section>';
  }
  var LEYAN_HOLIDAY_YEARS = [2026, 2027], LEYAN_HOLIDAYS = /* @__PURE__ */ new Set(["20260101", "20260216", "20260217", "20260218", "20260219", "20260220", "20260227", "20260403", "20260406", "20260501", "20260619", "20260925", "20260928", "20261009", "20261026", "20261225", "20270101", "20270204", "20270205", "20270208", "20270209", "20270210", "20270301", "20270405", "20270406", "20270430", "20270609", "20270915", "20270928", "20271011", "20271025", "20271224", "20271231"]);
  function extractRequestedTime(text, reference = /* @__PURE__ */ new Date()) {
    const s = String(text || "").replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 65248));
    const explicit = /(指定|預約|約定|希望|請於|請在|到場|[今明後]天|下週|下周|星期|週[一二三四五六日天]|周[一二三四五六日天]|\d{1,2}\s*月\s*\d{1,2}\s*[日號]|\d{1,2}[\/-]\d{1,2})/.test(s);
    const clock = s.match(/(凌晨|早上|早晨|上午|中午|下午|晚上|傍晚)?\s*(\d{1,2}|[零〇一二兩三四五六七八九十]{1,3})\s*(?:點|时|時|:|：)(?:\s*(半|\d{1,2}|[零〇一二兩三四五六七八九十]{1,3})\s*(?:分)?)?/);
    if (!clock) return { status: explicit && /(指定|預約|約定|希望|請於|請在|到場|安排.{0,6}[今明後]天|[今明後]天.{0,6}(安排|到場|報修))/.test(s) ? "unclear" : "none" };
    const number = (x) => {
      if (/^\d+$/.test(x || "")) return Number(x);
      const ds = { "\u96F6": 0, "\u3007": 0, "\u4E00": 1, "\u4E8C": 2, "\u5169": 2, "\u4E09": 3, "\u56DB": 4, "\u4E94": 5, "\u516D": 6, "\u4E03": 7, "\u516B": 8, "\u4E5D": 9 };
      if (!x) return 0;
      if (x.includes("\u5341")) {
        const [a, b] = x.split("\u5341");
        return (a ? ds[a] : 1) * 10 + (b ? ds[b] : 0);
      }
      return ds[x] ?? NaN;
    };
    let h = number(clock[2]), m = clock[3] === "\u534A" ? 30 : number(clock[3]);
    if (h > 23 || m > 59 || !Number.isFinite(h) || !Number.isFinite(m)) return { status: "unclear" };
    const period = clock[1];
    if (period === "\u4E0B\u5348" || period === "\u665A\u4E0A" || period === "\u508D\u665A") {
      if (h < 12) h += 12;
    } else if (period === "\u4E2D\u5348") {
      if (h < 11) h += 12;
    } else if (period === "\u51CC\u6668" && h === 12) h = 0;
    else if (!period && h >= 1 && h <= 12 && !/[：:]/.test(clock[0])) return { status: "unclear" };
    let d = new Date(reference);
    d.setHours(0, 0, 0, 0);
    let match = s.match(/(?:(\d{4})\s*[年\/-]\s*)?(\d{1,2})\s*(?:月|[\/-])\s*(\d{1,2})\s*[日號]?/);
    if (match) {
      const y = match[1] ? Number(match[1]) : d.getFullYear(), mo = Number(match[2]), day = Number(match[3]);
      d = new Date(y, mo - 1, day);
      if (d.getMonth() !== mo - 1 || d.getDate() !== day) return { status: "unclear" };
    } else if (/大後天/.test(s)) d.setDate(d.getDate() + 3);
    else if (/後天/.test(s)) d.setDate(d.getDate() + 2);
    else if (/明天/.test(s)) d.setDate(d.getDate() + 1);
    else if (/今天|今日/.test(s)) {
    } else {
      let w = s.match(/(下(?:週|周|星期)|本(?:週|周|星期)|這(?:週|周|星期)|星期|週|周)([一二三四五六日天])/);
      if (!w) return { status: "unclear" };
      let target = { "\u65E5": 0, "\u5929": 0, "\u4E00": 1, "\u4E8C": 2, "\u4E09": 3, "\u56DB": 4, "\u4E94": 5, "\u516D": 6 }[w[2]], dow = d.getDay(), offset = (target - dow + 7) % 7;
      if (w[1].startsWith("\u4E0B")) offset = 8 - (dow || 7) + (target === 0 ? 6 : target - 1);
      d.setDate(d.getDate() + offset);
    }
    d.setHours(h, m, 0, 0);
    return { status: "parsed", iso: d.toISOString() };
  }
  function slots(j) {
    var received = new Date(j.received), deadline = new Date(received.getTime() + 72 * 36e5), now = /* @__PURE__ */ new Date(), result = [], urgent = !!j.urgent;
    function eligible(a2, explicit) {
      var end = new Date(a2.getTime() + Number(j.hours) * 36e5), key = String(a2.getFullYear()) + String(a2.getMonth() + 1).padStart(2, "0") + String(a2.getDate()).padStart(2, "0");
      if (isNaN(a2) || a2 < now || a2 < received) return null;
      if (!urgent) {
        if (!LEYAN_HOLIDAY_YEARS.includes(a2.getFullYear()) || a2.getDay() === 0 || a2.getDay() === 6 || LEYAN_HOLIDAYS.has(key)) return null;
        if (a2.getHours() * 60 + a2.getMinutes() < 570 || end.getDate() !== a2.getDate() || end.getHours() * 60 + end.getMinutes() > 1080 || !explicit && end > deadline) return null;
        var count = JOBS.filter(function(k) {
          if (k.id === j.id || k.engineer !== j.engineer || !k.start || k.urgent || k.status === "\u5DF2\u53D6\u6D88") return false;
          return localDate(new Date(k.start)) === localDate(a2);
        }).length;
        if (count >= 4) return null;
      }
      var conflict = JOBS.some(function(k) {
        if (k.id === j.id || k.engineer !== j.engineer || !k.start || ["\u5DF2\u53D6\u6D88", "\u5DF2\u5B8C\u6210", "\u5F85\u518D\u8A2A"].includes(k.status)) return false;
        var pad = Math.max(Number(j.buffer), Number(k.buffer) || 0) * 6e4;
        return a2.getTime() < new Date(k.end).getTime() + pad && end.getTime() + pad > new Date(k.start).getTime();
      });
      return conflict ? null : { start: a2.toISOString(), end: end.toISOString() };
    }
    if (j.requestedStart && !j.start) {
      var only = eligible(new Date(j.requestedStart), true);
      return only ? [only] : [];
    }
    for (var day = 0; day < 5; day++) {
      var base = new Date(now);
      base.setHours(0, 0, 0, 0);
      base.setDate(base.getDate() + day);
      var starts = urgent ? [] : [570, 690, 810, 930];
      if (urgent) for (var m = day === 0 ? Math.ceil((now - base) / 6e4) : 0; m < 1440; m += 15) starts.push(m);
      for (var minute of starts) {
        var a = new Date(base);
        a.setMinutes(minute);
        var slot = eligible(a, false);
        if (slot) result.push(slot);
      }
    }
    return result;
  }
  function showSlots() {
    var j = JOBS.find(function(x) {
      return x.id === DSEL;
    }), list = slots(j);
    var box = document.getElementById("p2-slotbox");
    box.innerHTML = list.length ? '<div class="p2-slots">' + list.map(function(k) {
      return '<label class="p2-slot"><input type="radio" name="p2-slot" value="' + k.start + '"> ' + stamp(k.start) + "\u2013" + new Date(k.end).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false }) + "</label>";
    }).join("") + '</div><button class="p2-btn" style="margin-top:12px" data-action="assign">\u78BA\u8A8D\u6D3E\u5DE5\uFF08\u8B8A\u66F4\u5F85\u540C\u6B65\uFF09</button>' : '<div class="p2-note" style="margin-top:12px">' + (j.requestedStart && !j.start ? "\u6307\u5B9A\u6642\u9593\u76EE\u524D\u7121\u6CD5\u5B89\u6392\uFF0C\u8ACB\u8207\u5BA2\u6236\u5354\u8ABF\u6216\u6E05\u9664\u6307\u5B9A\u6642\u9593\u5F8C\u67E5\u8A62\u5176\u4ED6\u6642\u6BB5\u3002" : "\u4E09\u65E5\u5167\u6C92\u6709\u7B26\u5408\u689D\u4EF6\u7684\u7A7A\u6A94\u3002\u8ACB\u8207\u5BA2\u6236\u5354\u8ABF\u4E26\u8A18\u9304\u3002") + '</div><button class="p2-btn secondary" data-action="coordinate">\u8A18\u9304\u5354\u8ABF\u7D50\u679C</button>';
  }
  var CUSTOMER_SEEDS = DISPATCH.map(function(j) {
    return { client: j.client, region: j.region };
  });
  function normClient(t) {
    return String(t || "").toLowerCase().replace(/\s+/g, "").replace(/臺/g, "\u53F0");
  }
  function inferLineClient(text) {
    var raw = String(text || "").trim(), normalized = normClient(raw);
    var names = Array.from(new Set(CUSTOMER_SEEDS.concat(CASES, JOBS).map(function(x) {
      return String(x.client || "").trim();
    }).filter(function(n) {
      return normClient(n).length >= 2 && normalized.includes(normClient(n));
    })));
    var longest = names.filter(function(n) {
      return !names.some(function(m) {
        return n !== m && normClient(m).includes(normClient(n));
      });
    });
    if (longest.length === 1) return longest[0];
    if (longest.length > 1) return "";
    var explicit = raw.match(/(?:客戶(?:名稱)?|店名|診所名稱)\s*[:：]\s*([^，,。；;\n]{2,40})/);
    var before = raw.match(/^([^，,。；;\n]{2,30}?)(?:要|需要|來)?報修(?:[，,。；;\s]|$)/);
    var first = raw.match(/^([^，,。；;\n]{2,30})[，,。；;\n]/);
    var clinic = raw.match(/^(.{2,30}?(?:牙醫診所|牙醫|診所|醫院|門市|公司|商行|餐廳|飯店|學校|客戶))(?=的|監視器|攝影機|電話|喇叭|電腦|主機|SERVER|server|電視|讀卡機|印表機|網路|要|需要|報修|維修|[，,。；;\s])/i);
    var candidate = explicit && explicit[1] || before && before[1] || clinic && clinic[1] || first && /(客戶|牙醫|診所|醫院|門市|公司|商行|餐廳|飯店|學校)$/.test(first[1].trim()) && first[1] || "";
    candidate = String(candidate).trim().replace(/^(?:客戶|店名)\s*[:：]?\s*/, "").trim();
    return candidate.length >= 2 && !/^(我要|我想|需要|有問題|您好|你好|測試)$/.test(candidate) ? candidate : "";
  }
  function lineReportContent(text, client) {
    var raw = String(text || "").trim(), name = String(client || "").trim();
    if (!name) return raw;
    var prefix = raw.replace(/^(?:客戶(?:名稱)?|店名|診所名稱)\s*[:：]\s*/, "");
    if (!prefix.toLowerCase().startsWith(name.toLowerCase())) return raw;
    var rest = prefix.slice(name.length);
    if (rest && !/^[\s，,。；;:：]|^(?:要|需要|來)?(?:報修|維修)|^的?(?:監視器|攝影機|電話|喇叭|電腦|主機|server|伺服器|電視|讀卡機|印表機|網路)/i.test(rest)) return raw;
    rest = rest.replace(/^的(?=監視器|攝影機|電話|喇叭|電腦|主機|server|伺服器|電視|讀卡機|印表機|網路)/i, "");
    rest = rest.replace(/^[\s，,。；;:：]*/, "").replace(/^(?:要|需要|來)?(?:報修|維修)(?:內容|狀況|問題)?\s*[:：，,。；;]?\s*/, "").replace(/^(?:報修內容|報修狀況|狀況|問題)\s*[:：]\s*/, "").trim();
    rest = rest.replace(/(?:需要|要|請)?(?:安排)?(?:報修|維修)(?:工程師)?(?:於|在)?(?:台北|臺北|新北|桃園|新竹|基隆|台中|臺中|高雄|台南|臺南)?[。！!]?$/i, "").trim();
    return rest;
  }
  function regionFromText(t) {
    var n = normClient(t), hits = COUNTIES.filter(function(c) {
      var full = normClient(c), short = full.slice(0, -1);
      if (short === "\u65B0\u7AF9" || short === "\u5609\u7FA9") return n.includes(full);
      return n.includes(full) || n.includes(short);
    });
    return hits.length === 1 ? hits[0] : "";
  }
  function inferDispatch(client, problem, parent, sourceText) {
    var found = CUSTOMER_SEEDS.concat(CASES, JOBS).filter(function(j) {
      return normClient(j.client) === normClient(client);
    });
    var regions = Array.from(new Set(found.map(function(j) {
      return COUNTIES.includes(j.region) ? j.region : regionFromText(j.client);
    }).filter(Boolean)));
    var region = "", why = "";
    if (regions.length === 1) {
      region = regions[0];
      why = "\u7B26\u5408\u73FE\u6709\u5BA2\u6236\u7D00\u9304";
    } else if (regions.length > 1) {
      why = "\u540C\u540D\u5BA2\u6236\u6709\u591A\u500B\u5730\u5340\uFF0C\u8ACB\u78BA\u8A8D\u5206\u5E97";
    } else {
      region = regionFromText(client + " " + (sourceText || problem || ""));
      why = region ? "\u4F9D\u5BA2\u6236\u6216\u5831\u4FEE\u5167\u5BB9\u4E2D\u7684\u5730\u540D\u5224\u5B9A" : "\u5BA2\u6236\u7D00\u9304\u8207\u540D\u7A31\u672A\u63D0\u4F9B\u660E\u78BA\u5730\u5340";
    }
    var weak = problem.match(/弱電|監視|攝影機|攝像|網路|網絡|網線|交換器|路由器|wifi|wi-fi|廣播|門禁|電話|音響|喇叭|hdmi|對講|讀卡(?!機)|刷卡|網際網路/gi) || [], hard = problem.match(/硬體|電腦|主機|server|伺服器|服務器|電視|讀卡機|印表機|打印機|冷氣|空調|電梯|消防|水電|漏水|水管|馬桶|照明|燈具|燈泡|插座|配電|電源|鐵門|捲門|天花板|牆面|門鎖|排水|電箱/gi) || [];
    var category = "", catWhy = "";
    if (weak.length && !hard.length) {
      category = "\u5F31\u96FB\u7DAD\u8B77";
      catWhy = "\u554F\u984C\u5305\u542B\uFF1A" + Array.from(new Set(weak)).join("\u3001");
    } else if (hard.length && !weak.length) {
      category = "\u786C\u9AD4\u7DAD\u8B77";
      catWhy = "\u554F\u984C\u5305\u542B\uFF1A" + Array.from(new Set(hard)).join("\u3001");
    } else if (weak.length && hard.length) {
      catWhy = "\u540C\u6642\u5305\u542B\u5F31\u96FB\u8207\u786C\u9AD4\u554F\u984C\uFF0C\u8ACB\u78BA\u8A8D\u4E3B\u8981\u985E\u5225";
    } else if (parent && parent.category) {
      category = parent.category;
      catWhy = "\u6CBF\u7528\u539F\u5DE5\u55AE\u985E\u5225\uFF0C\u8ACB\u78BA\u8A8D";
    } else {
      catWhy = "\u554F\u984C\u63CF\u8FF0\u672A\u547D\u4E2D\u660E\u78BA\u985E\u5225\uFF0C\u8ACB\u78BA\u8A8D";
    }
    return { region, category, regionReason: why, categoryReason: catWhy };
  }
  function isUrgentDispatch(text) {
    var t = String(text || "").toLowerCase();
    return /緊急|急件|急修|主機.{0,8}(掛了|當機|故障|斷線|無法啟動|不能開)|(?:server|伺服器|服務器).{0,12}(無法打開|不能打開|打不開|無法啟動|無法開啟|不能開|掛了|當機|故障|斷線)|系統.{0,8}(不能用|無法使用|無法運作|不能運作|掛了|當機|癱瘓)/i.test(t);
  }
  function setupUrgentInput(dialog, draft) {
    var note = dialog.querySelector("[name=note]"), box = dialog.querySelector("[name=urgent]"), manual = false;
    box.checked = draft ? !!draft.urgent : isUrgentDispatch(note.value);
    box.onchange = function() {
      manual = true;
    };
    note.addEventListener("input", function() {
      if (!manual) box.checked = isUrgentDispatch(note.value);
    });
  }
  function newDialog(parent, prefill) {
    prefill = prefill || null;
    var old = document.getElementById("p2-dialog");
    if (old) old.remove();
    var dialog = document.createElement("dialog");
    dialog.className = "p2-dialog";
    dialog.id = "p2-dialog";
    dialog.setAttribute("aria-label", parent ? "\u5EFA\u7ACB\u518D\u8A2A\u55AE" : "\u65B0\u589E\u6D3E\u5DE5");
    document.body.appendChild(dialog);
    var draft = null;
    function inputStep(client, note) {
      dialog.innerHTML = "<h2>" + (parent ? "\u5EFA\u7ACB\u518D\u8A2A\u55AE" : "\u65B0\u589E\u6D3E\u5DE5") + "</h2>" + (prefill && prefill.source ? '<div class="p2-note" style="margin-top:12px">\u4F86\u6E90\uFF1A' + esc(prefill.source) + "\u3002\u8ACB\u78BA\u8A8D\u6216\u586B\u5165\u5BA2\u6236\u540D\u7A31\u3002" + (prefill.onCreated ? "\u5EFA\u7ACB\u5F8C\u6B64 LINE \u5E33\u865F\u6703\u7D81\u5B9A\u5230\u8A72\u5BA2\u6236\u3002" : "") + "</div>" : "") + '<p class="p2-sub" style="margin:10px 0 20px">\u53EA\u9700\u586B\u5BEB\u5BA2\u6236\u8207\u554F\u984C\uFF0C\u7CFB\u7D71\u6703\u5EFA\u8B70\u5730\u5340\u3001\u985E\u5225\u3001\u5DE5\u7A0B\u5E2B\u8207\u53EF\u7528\u6642\u6BB5\u3002\u78BA\u8A8D\u524D\u4E0D\u6703\u5EFA\u7ACB\u6D3E\u5DE5\u3002</p><form id="auto-input"><div class="p2-form"><label class="p2-wide">\u5BA2\u6236 *<input name="client" required maxlength="80" list="auto-customers" autocomplete="off" placeholder="\u4F8B\u5982\uFF1A\u53F0\u5317\u4FE1\u7FA9\u7259\u91AB\u8A3A\u6240" value="' + esc(client || "") + '"><datalist id="auto-customers">' + Array.from(new Set(CUSTOMER_SEEDS.concat(CASES, JOBS).map(function(j) {
        return j.client;
      }))).map(function(c) {
        return '<option value="' + esc(c) + '"></option>';
      }).join("") + '</datalist></label><label class="p2-wide"><input type="checkbox" name="urgent"> \u7DCA\u6025\u6D3E\u5DE5\uFF08\u5047\u65E5\u53CA\u591C\u9593\u4EA6\u53EF\u5B89\u6392\uFF09</label><label class="p2-wide">\u6307\u5B9A\u5230\u5834\u65E5\u671F\u8207\u6642\u9593\uFF08\u53EF\u7559\u7A7A\uFF09<input type="datetime-local" name="requested"></label><label class="p2-wide">\u554F\u984C *<textarea name="note" required rows="4" maxlength="1000" placeholder="\u4F8B\u5982\uFF1A\u76E3\u8996\u5668\u6C92\u6709\u756B\u9762">' + esc(note || "") + '</textarea></label></div><div class="p2-actions"><button type="button" id="voice-input" class="p2-btn secondary">\u8A9E\u97F3\u8F38\u5165</button><button type="button" id="voice-ai" class="p2-btn secondary">AI \u6574\u7406\u6587\u5B57</button><button class="p2-btn" type="submit">\u81EA\u52D5\u5224\u5B9A\u8207\u5B89\u6392 \u2192</button><button class="p2-btn secondary" type="button" data-p2="dialog-close">\u53D6\u6D88</button></div><p class="p2-sub" style="margin-top:15px">\u76EE\u524D\u4F9D\u793A\u7BC4\u5BA2\u6236\u7D00\u9304\u8207\u554F\u984C\u95DC\u9375\u5B57\u5224\u5B9A\uFF1B\u4E0D\u78BA\u5B9A\u6642\u7531\u4F60\u78BA\u8A8D\uFF0C\u4E0D\u6703\u81EA\u52D5\u731C\u6E2C\u3002\u8ACB\u52FF\u586B\u5165\u771F\u5BE6\u500B\u8CC7\u3002</p></form>';
      setupUrgentInput(dialog, draft);
      var noteInput = dialog.querySelector("[name=note]"), requestedInput = dialog.querySelector("[name=requested]"), requestedEdited = false;
      function syncRequested() {
        if (requestedEdited) return;
        var parsed = extractRequestedTime(noteInput.value, new Date(prefill && prefill.received || Date.now()));
        if (parsed.status === "parsed") {
          var dt = new Date(parsed.iso);
          requestedInput.value = localDate(dt) + "T" + String(dt.getHours()).padStart(2, "0") + ":" + String(dt.getMinutes()).padStart(2, "0");
          requestedInput.dataset.inferred = "1";
        } else {
          requestedInput.value = "";
          requestedInput.dataset.inferred = "";
        }
      }
      requestedInput.addEventListener("input", function() {
        requestedEdited = true;
      });
      noteInput.addEventListener("input", syncRequested);
      if (draft && draft.requestedStart) {
        var oldDate = new Date(draft.requestedStart);
        requestedInput.value = localDate(oldDate) + "T" + String(oldDate.getHours()).padStart(2, "0") + ":" + String(oldDate.getMinutes()).padStart(2, "0");
        requestedEdited = true;
      } else syncRequested();
      dialog.querySelector("#voice-input").onclick = function() {
        var Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Speech) {
          notify("\u76EE\u524D\u5E33\u865F\u4E0D\u652F\u63F4\u8A9E\u97F3\u8FA8\u8B58\uFF0C\u8ACB\u624B\u52D5\u8F38\u5165\u3002");
          return;
        }
        var recognition = new Speech();
        recognition.lang = "zh-TW";
        recognition.onresult = function(e) {
          var area = dialog.querySelector("[name=note]");
          area.value = (area.value + " " + e.results[0][0].transcript).trim();
          area.dispatchEvent(new Event("input", { bubbles: true }));
          notify("\u8A9E\u97F3\u5DF2\u8F49\u6210\u6587\u5B57\uFF0C\u8ACB\u6AA2\u67E5\u5167\u5BB9\u3002");
        };
        recognition.onerror = function() {
          notify("\u8A9E\u97F3\u8FA8\u8B58\u5931\u6557\uFF0C\u8ACB\u624B\u52D5\u8F38\u5165\u3002");
        };
        recognition.start();
      };
      dialog.querySelector("#voice-ai").onclick = async function() {
        var note2 = dialog.querySelector("[name=note]");
        if (!note2.value.trim()) {
          notify("\u8ACB\u5148\u8F38\u5165\u6216\u8AAA\u51FA\u5831\u4FEE\u5167\u5BB9\u3002");
          return;
        }
        if (!confirm("AI \u6574\u7406\u6703\u5C07\u6587\u5B57\u9001\u81F3 Google \u8655\u7406\u3002\u662F\u5426\u7E7C\u7E8C\uFF1F")) return;
        try {
          var result = await window.leyanFormatSpeech(note2.value.trim());
          if (result.client) dialog.querySelector("[name=client]").value = result.client;
          note2.value = result.note;
          note2.dispatchEvent(new Event("input", { bubbles: true }));
          notify("\u5DF2\u6574\u7406\uFF0C\u8ACB\u6838\u5C0D\u5167\u5BB9\u3002");
        } catch (err) {
          notify(err.message || "AI \u66AB\u6642\u7121\u6CD5\u4F7F\u7528\uFF0C\u53EF\u624B\u52D5\u586B\u5BEB\u3002");
        }
      };
      dialog.querySelector("form").onsubmit = function(e) {
        e.preventDefault();
        var f = e.target, client2 = f.elements.client.value.trim(), note2 = f.elements.note.value.trim();
        if (!client2 || !note2) {
          notify("\u8ACB\u586B\u5BEB\u5BA2\u6236\u8207\u554F\u984C\u3002");
          return;
        }
        var parsedTime = extractRequestedTime(note2, new Date(prefill && prefill.received || Date.now()));
        if (parsedTime.status !== "none" && !f.elements.requested.value) {
          notify("\u8A0A\u606F\u4E2D\u7684\u6642\u9593\u4E0D\u5B8C\u6574\uFF0C\u8ACB\u586B\u5BEB\u6307\u5B9A\u5230\u5834\u65E5\u671F\u8207\u6642\u9593\u3002");
          f.elements.requested.focus();
          return;
        }
        var requested = f.elements.requested.value ? new Date(f.elements.requested.value) : null;
        if (requested && isNaN(requested)) {
          notify("\u8ACB\u78BA\u8A8D\u6307\u5B9A\u5230\u5834\u6642\u9593\u3002");
          return;
        }
        var inference = inferDispatch(client2, note2, parent, prefill && prefill.originalText);
        draft = { id: "DRAFT", client: client2, note: note2, urgent: f.elements.urgent.checked, requestedStart: requested ? requested.toISOString() : null, region: inference.region, category: inference.category, received: prefill && prefill.received || (/* @__PURE__ */ new Date()).toISOString(), hours: parent ? parent.hours : 1, buffer: parent ? parent.buffer : 30, start: null, end: null };
        review(inference);
      };
    }
    function review(inference) {
      dialog.innerHTML = '<h2>\u78BA\u8A8D\u6D3E\u5DE5\u5EFA\u8B70</h2><p class="p2-sub" style="margin:10px 0 18px">\u78BA\u8A8D\u5F8C\u624D\u6703\u5EFA\u7ACB\u5DE5\u55AE\uFF0C\u4E26\u653E\u5230\u884C\u4E8B\u66C6\u3002</p><div class="p2-note"><b>' + esc(draft.client) + "</b><br>" + esc(draft.note) + '</div><form id="auto-review"><div class="p2-form"><label>\u5730\u5340' + (!draft.region ? " \xB7 \u9700\u4F60\u78BA\u8A8D" : " \xB7 \u5DF2\u5224\u5B9A") + '<select name="region" id="auto-region" required><option value="">\u8ACB\u78BA\u8A8D\u5730\u5340</option>' + opts(COUNTIES, draft.region) + '</select><span class="p2-sub">' + esc(inference.regionReason) + "</span></label><label>\u985E\u5225" + (!draft.category ? " \xB7 \u9700\u4F60\u78BA\u8A8D" : " \xB7 \u5DF2\u5224\u5B9A") + '<select name="category" id="auto-category" required><option value="">\u8ACB\u78BA\u8A8D\u985E\u5225</option>' + opts(["\u5F31\u96FB\u7DAD\u8B77", "\u786C\u9AD4\u7DAD\u8B77"], draft.category) + '</select><span class="p2-sub">' + esc(inference.categoryReason) + '</span></label></div><div id="auto-proposal" style="margin-top:16px"></div><div class="p2-actions"><button id="auto-confirm" class="p2-btn" type="submit">\u78BA\u8A8D\u6D3E\u5DE5\u4E26\u52A0\u5165\u6708\u66C6</button><button type="button" class="p2-btn secondary" id="auto-back">\u8FD4\u56DE\u4FEE\u6539</button><button class="p2-btn secondary" type="button" data-p2="dialog-close">\u53D6\u6D88</button></div><p class="p2-sub" style="margin-top:14px">\u4E00\u822C\u6D3E\u5DE5\u907F\u958B\u9031\u672B\u53CA\u570B\u5B9A\u5047\u65E5\uFF1B\u7DCA\u6025\u6D3E\u5DE5\u4E0D\u9650\u5047\u65E5\u8207\u4EF6\u6578\u3002\u6307\u5B9A\u6642\u9593\u4EE5\u5BE6\u969B\u78BA\u8A8D\u70BA\u6E96\u3002\u9810\u4F30\u5DE5\u6642 ' + draft.hours + " \u5C0F\u6642\uFF0C\u4EA4\u901A\u7DE9\u885D " + draft.buffer + " \u5206\u9418\uFF1B\u50C5\u6AA2\u67E5\u672C\u9801\u5DF2\u5B89\u6392\u5DE5\u55AE\uFF0C\u4E0D\u8B80\u5BEB Google \u884C\u4E8B\u66C6\uFF1B\u78BA\u8A8D\u5F8C\u4EE5 LINE \u901A\u77E5\u5DF2\u7D81\u5B9A\u7684\u5DE5\u7A0B\u5E2B\u8207\u5BA2\u6236\u3002</p></form>";
      var f = dialog.querySelector("form");
      f.elements.region.value = draft.region;
      f.elements.category.value = draft.category;
      function update() {
        var nr = f.elements.region.value, nc = f.elements.category.value;
        if (nr !== draft.region || nc !== draft.category) {
          draft.engineer = "";
          draft.manualEngineer = false;
        }
        draft.region = nr;
        draft.category = nc;
        proposal();
      }
      f.elements.region.onchange = update;
      f.elements.category.onchange = update;
      dialog.querySelector("#auto-back").onclick = function() {
        inputStep(draft.client, draft.note);
      };
      f.onsubmit = function(e) {
        e.preventDefault();
        if (!draft.region || !draft.category) return;
        if (!ROSTER.some(function(e2) {
          return e2.name === draft.engineer && supportsEngineer(e2, draft.region, draft.category);
        })) {
          notify("\u8ACB\u9078\u64C7\u6709\u652F\u63F4\u6B64\u7E23\u5E02\u8207\u985E\u5225\u7684\u5DE5\u7A0B\u5E2B\u3002");
          return;
        }
        var list = slots(draft), picked = dialog.querySelector("#auto-slot"), choice = picked ? picked.value : "";
        if (list.length && !list.some(function(k) {
          return k.start === choice;
        })) {
          proposal();
          notify("\u6642\u6BB5\u5DF2\u8B8A\u52D5\uFF0C\u8ACB\u78BA\u8A8D\u66F4\u65B0\u7684\u5EFA\u8B70\u5F8C\u518D\u9001\u51FA\u3002");
          return;
        }
        if (!list.length && choice) {
          proposal();
          notify("\u76EE\u524D\u5DF2\u7121\u5408\u9069\u7A7A\u6A94\uFF0C\u8ACB\u78BA\u8A8D\u5F85\u5354\u8ABF\u72C0\u614B\u3002");
          return;
        }
        var slot = list.find(function(k) {
          return k.start === choice;
        }), j = { id: "D" + Date.now().toString(36).toUpperCase(), client: draft.client, note: draft.urgent && !draft.note.includes("\u7DCA\u6025") ? "\u3010\u7DCA\u6025\u3011" + draft.note : draft.note, region: draft.region, category: draft.category, engineer: draft.engineer, received: draft.received, requestedStart: draft.requestedStart, hours: draft.hours, buffer: draft.buffer, start: slot ? slot.start : null, end: slot ? slot.end : null, date: slot ? localDate(new Date(slot.start)) : "", status: slot ? "\u5DF2\u6D3E\u5DE5" : "\u5F85\u6D3E\u5DE5", urgent: draft.urgent, history: [] };
        if (prefill && prefill.onApprove) {
          if (!slot) {
            notify("\u7533\u8ACB\u6838\u51C6\u5FC5\u9808\u5148\u9078\u64C7\u53EF\u7528\u6642\u6BB5\u3002");
            return;
          }
          history(j, "\u7D93\u7BA1\u7406\u8005\u78BA\u8A8D\u6D3E\u5DE5 " + stamp(j.start) + "\uFF0C" + j.engineer);
          history(j, "\u7533\u8ACB\u4F86\u6E90\uFF1A" + prefill.source);
          var confirmButton = dialog.querySelector("#auto-confirm");
          confirmButton.disabled = true;
          prefill.onApprove(j).then(function() {
            JOBS.unshift(j);
            dialog.close();
            go("dispatch");
            DSEL = j.id;
            renderDispatch();
            document.getElementById("p2-detail").scrollIntoView({ block: "start" });
            notify("\u5DF2\u6838\u51C6\u4E26\u52A0\u5165\u884C\u4E8B\u66C6\u3002");
            lineNotify({ event: "dispatch_confirmed", dispatchId: j.id });
          }).catch(function(err) {
            confirmButton.disabled = false;
            notify("\u6838\u51C6\u5931\u6557\uFF1A" + (err.message || "\u8ACB\u91CD\u8A66"));
          });
          return;
        }
        if (parent) {
          j.parent = parent.id;
          parent.status = "\u5F85\u518D\u8A2A";
          history(parent, "\u5EFA\u7ACB\u518D\u8A2A\u55AE " + j.id);
        }
        history(j, "\u5BA2\u6236\u8207\u554F\u984C\u81EA\u52D5\u5224\u5B9A\u5F8C\u7531\u4F7F\u7528\u8005\u78BA\u8A8D\uFF1A" + j.region + "\uFF0F" + j.category + "\uFF0F" + j.engineer);
        if (parent) history(j, "\u7531 " + parent.id + " \u5EFA\u7ACB\u518D\u8A2A\u5831\u4FEE");
        if (slot) history(j, "\u78BA\u8A8D\u6D3E\u5DE5 " + stamp(j.start) + "\uFF0C" + j.engineer);
        else history(j, j.requestedStart ? "\u6307\u5B9A\u6642\u9593\u7121\u6CD5\u5B89\u6392\uFF0C\u5F85\u8207\u5BA2\u6236\u5354\u8ABF" : "\u4E09\u65E5\u5167\u7121\u5408\u9069\u7A7A\u6A94\uFF0C\u5F85\u8207\u5BA2\u6236\u5354\u8ABF");
        if (prefill && prefill.source) history(j, "\u7531 " + prefill.source + " \u8F49\u5165");
        JOBS.unshift(j);
        persist();
        dialog.close();
        go("dispatch");
        DSEL = j.id;
        renderDispatch();
        document.getElementById("p2-detail").scrollIntoView({ block: "start" });
        notify(slot ? "\u5DF2\u78BA\u8A8D\u6D3E\u5DE5\u4E26\u52A0\u5165\u6708\u66C6\uFF08\u8B8A\u66F4\u5F85\u540C\u6B65\uFF09\u3002" : "\u5DF2\u5EFA\u7ACB\u5F85\u5354\u8ABF\u5DE5\u55AE\uFF0C\u5C1A\u672A\u52A0\u5165\u6708\u66C6\u3002");
        var ev = slot ? { event: "dispatch_confirmed", dispatchId: j.id } : null;
        if (prefill && prefill.onCreated) prefill.onCreated(j, ev);
        else if (ev) lineNotify(ev);
      };
      proposal();
    }
    function proposal() {
      var box = dialog.querySelector("#auto-proposal"), button = dialog.querySelector("#auto-confirm");
      if (!draft.region || !draft.category) {
        box.innerHTML = '<div class="p2-note">\u8CC7\u6599\u4E0D\u8DB3\uFF0C\u8ACB\u5148\u78BA\u8A8D\u7E23\u5E02\u8207\u985E\u5225\u3002</div>';
        button.disabled = true;
        return;
      }
      var suggestion = suggestEngineers(draft), people = suggestion.people, plans = suggestion.plans;
      if (!people.length) {
        draft.engineer = "";
        box.innerHTML = '<div class="p2-note">\u6C92\u6709\u555F\u7528\u4E14\u652F\u63F4\u6B64\u7E23\u5E02\u8207\u985E\u5225\u7684\u5DE5\u7A0B\u5E2B\uFF0C\u8ACB\u5148\u5230\u4EBA\u54E1\u540D\u55AE\u65B0\u589E\u6216\u8ABF\u6574\u3002</div>';
        button.disabled = true;
        return;
      }
      if (!draft.manualEngineer || !people.some(function(e) {
        return e.name === draft.engineer;
      })) {
        draft.engineer = plans.length ? plans[0].name : people[0].name;
        draft.manualEngineer = false;
      }
      var list = slots(draft), ranked = plans.find(function(x) {
        return x.name === draft.engineer;
      }), chosen = ranked ? ranked.slot.start : list[0] && list[0].start;
      box.innerHTML = '<label class="p2-sub">\u5DE5\u7A0B\u5E2B\uFF08\u53EF\u8ABF\u6574\uFF09<select id="auto-engineer" style="display:block;width:100%;padding:12px;margin:7px 0 12px;border:1px solid #cbd5e1;border-radius:6px;background:white;font:inherit">' + people.map(function(e) {
        return '<option value="' + esc(e.name) + '"' + (e.name === draft.engineer ? " selected" : "") + ">" + esc(e.name) + ((e.primaryRegions || []).includes(draft.region) ? " \xB7 \u4E3B\u8981\u5DE5\u7A0B\u5E2B" : "") + "</option>";
      }).join("") + '</select></label><p class="p2-sub">\u7B26\u5408\u689D\u4EF6\u6642\uFF0C\u4F9D\u4E3B\u8981\u5DE5\u7A0B\u5E2B\u3001\u7576\u5929\u540C\u7E23\u5E02\u884C\u7A0B\u53CA\u7576\u65E5\u6848\u4EF6\u8F03\u5C11\u6392\u5E8F\uFF1B\u53EF\u624B\u52D5\u9078\u64C7\u3002</p>' + (list.length ? '<label style="display:block;font-size:12px;font-weight:600;margin-top:16px">' + (draft.requestedStart ? "\u6307\u5B9A\u5230\u5834\u6642\u9593" : "\u5EFA\u8B70\u5230\u5834\u6642\u6BB5") + '<select id="auto-slot" style="display:block;width:100%;padding:12px;margin-top:7px;border:1px solid #cbd5e1;border-radius:6px;background:white;font:inherit">' + list.map(function(k) {
        return '<option value="' + k.start + '"' + (k.start === chosen ? " selected" : "") + ">" + stamp(k.start) + "\u2013" + hm(k.end) + "</option>";
      }).join("") + "</select></label>" : '<div class="p2-note" style="margin-top:14px">' + (draft.requestedStart ? "\u6307\u5B9A\u6642\u9593\u4E0D\u7B26\u5408\u5DE5\u4F5C\u65E5\u3001\u5DE5\u4F5C\u6642\u9593\u3001\u6BCF\u65E5\u4E0A\u9650\u6216\u5DF2\u6709\u885D\u7A81\uFF1B\u8ACB\u8FD4\u56DE\u4FEE\u6539\uFF0C\u6216\u5EFA\u7ACB\u5F85\u5354\u8ABF\u5DE5\u55AE\u3002" : "\u4E09\u65E5\u5167\u7121\u7B26\u5408\u898F\u5247\u7684\u7A7A\u6A94\uFF0C\u53EF\u78BA\u8A8D\u5EFA\u7ACB\u5F85\u5354\u8ABF\u5DE5\u55AE\u3002") + "</div>");
      box.querySelector("#auto-engineer").onchange = function(e) {
        draft.engineer = e.target.value;
        draft.manualEngineer = true;
        proposal();
      };
      button.disabled = false;
      button.textContent = list.length ? "\u78BA\u8A8D\u6D3E\u5DE5\u4E26\u52A0\u5165\u6708\u66C6" : "\u78BA\u8A8D\u5EFA\u7ACB\u5F85\u5354\u8ABF\u5DE5\u55AE";
    }
    inputStep(parent ? parent.client : prefill && prefill.client || "", prefill && prefill.note || "");
    dialog.showModal();
  }
  function action(type) {
    var j = JOBS.find(function(x) {
      return x.id === DSEL;
    });
    if (!j) return;
    var ev = null;
    if (type === "slots") {
      showSlots();
      return;
    }
    if (type === "clear-requested") {
      if (!confirm("\u6E05\u9664\u6307\u5B9A\u6642\u9593\u5F8C\uFF0C\u5C07\u53EF\u9078\u64C7\u5176\u4ED6\u6642\u6BB5\uFF1B\u662F\u5426\u7E7C\u7E8C\uFF1F")) return;
      history(j, "\u6E05\u9664\u6307\u5B9A\u5230\u5834\u6642\u9593 " + stamp(j.requestedStart));
      j.requestedStart = null;
      persist();
      renderDispatch();
      showSlots();
      return;
    }
    if (type === "assign") {
      var picked = document.querySelector('[name="p2-slot"]:checked');
      if (!picked) {
        notify("\u8ACB\u5148\u9078\u64C7\u5230\u5834\u6642\u9593\u3002");
        return;
      }
      var valid = slots(j).find(function(k) {
        return k.start === picked.value;
      });
      if (!valid) {
        notify("\u7A7A\u6A94\u5DF2\u8B8A\u52D5\uFF0C\u8ACB\u91CD\u65B0\u67E5\u8A62\u3002");
        showSlots();
        return;
      }
      var prev = j.start;
      j.start = valid.start;
      j.end = valid.end;
      j.date = localDate(new Date(valid.start));
      j.status = "\u5DF2\u6D3E\u5DE5";
      if (prev) {
        delete j.departedAt;
        history(j, "\u6539\u671F " + stamp(prev) + " \u2192 " + stamp(j.start) + "\uFF0C" + j.engineer);
        ev = { event: "dispatch_rescheduled", dispatchId: j.id, prevStart: prev };
      } else {
        history(j, "\u78BA\u8A8D\u6D3E\u5DE5 " + stamp(j.start) + "\uFF0C" + j.engineer);
        ev = { event: "dispatch_confirmed", dispatchId: j.id };
      }
    } else if (type === "revisit") {
      newDialog(j);
      return;
    } else if (type === "coordinate") {
      var note = prompt("\u8ACB\u8F38\u5165\u8207\u5BA2\u6236\u5354\u8ABF\u7684\u7D50\u679C\uFF08\u4E0D\u6703\u81EA\u52D5\u66F4\u6539\u539F\u671F\u9650\uFF09");
      if (!note || !note.trim()) return;
      history(j, "\u5354\u8ABF\u7D00\u9304\uFF1A" + note.trim());
    } else if (type === "cancel") {
      var reason = prompt("\u8ACB\u8F38\u5165\u53D6\u6D88\u539F\u56E0");
      if (!reason || !reason.trim()) return;
      j.status = "\u5DF2\u53D6\u6D88";
      history(j, "\u53D6\u6D88\uFF1A" + reason.trim());
      if (j.start) ev = { event: "dispatch_cancelled", dispatchId: j.id };
    } else if (type === "complete") {
      var result = prompt("\u8ACB\u8F38\u5165\u5B8C\u5DE5\uFF0F\u5BA2\u6236\u78BA\u8A8D\u7D00\u9304");
      if (!result || !result.trim()) return;
      j.status = "\u5DF2\u5B8C\u6210";
      history(j, "\u5B8C\u5DE5\u78BA\u8A8D\uFF1A" + result.trim());
      ev = { event: "job_completed", dispatchId: j.id };
      var parent = JOBS.find(function(k) {
        return k.id === j.parent;
      });
      if (parent && parent.status === "\u5F85\u518D\u8A2A") {
        parent.status = "\u5DF2\u5B8C\u6210";
        history(parent, "\u518D\u8A2A\u55AE " + j.id + " \u5B8C\u6210\uFF0C\u539F\u5DE5\u55AE\u540C\u6B65\u5B8C\u6210");
      }
    } else if (type === "depart") {
      if (j.status !== "\u5DF2\u6D3E\u5DE5" || !j.start || j.departedAt) return;
      j.departedAt = (/* @__PURE__ */ new Date()).toISOString();
      history(j, "\u5DE5\u7A0B\u5E2B\u51FA\u767C");
      ev = { event: "engineer_departed", dispatchId: j.id };
    } else if (type === "start") {
      j.status = "\u9032\u884C\u4E2D";
      history(j, "\u5DE5\u7A0B\u5E2B\u958B\u59CB\u8655\u7406");
    } else if (type === "wait") {
      j.status = "\u5F85\u6599";
      history(j, "\u5F85\u6599\uFF0C\u9700\u53E6\u5EFA\u518D\u8A2A\u55AE\u5B89\u6392\u5F8C\u7E8C");
    }
    persist();
    renderDispatch();
    notify("\u5DE5\u55AE\u5DF2\u66F4\u65B0\uFF08\u8B8A\u66F4\u5F85\u540C\u6B65\uFF09\u3002");
    if (ev) lineNotify(ev);
  }
  window.leyanReviewRequest = function(record, onApprove) {
    newDialog(null, { client: record.client, note: record.source === "line" ? lineReportContent(record.note, record.client) : record.note, originalText: record.note, source: { manual: "\u624B\u52D5", voice: "\u8A9E\u97F3", line: "LINE" }[record.source] || record.source, received: record.created_at, onApprove });
  };
  var LINE = { inbox: [], contacts: [], stats: null, quota: null, codes: {}, error: "", loading: null, at: 0 };
  function lineApi() {
    return window.leyanLine && window.leyanLine.available ? window.leyanLine : null;
  }
  function lineToast(msg) {
    var api = lineApi();
    if (api) api.toast(msg, "warn");
    else notify(msg);
  }
  function lineNotify(ev) {
    var api = lineApi();
    if (api) api.notify(ev);
  }
  function lineTime(t) {
    return t ? stamp(t) : "\u2014";
  }
  function lineRole(r) {
    return { engineer: "\u5DE5\u7A0B\u5E2B", manager: "\u7BA1\u7406\u8005", customer: "\u5BA2\u6236" }[r] || r;
  }
  function lineTargets() {
    return ROSTER.filter(function(e) {
      return isEngineer(e) && e.active;
    }).map(function(e) {
      return { role: "engineer", ref: e.name, label: regionsOf(e).join("\u3001") + " " + e.name };
    }).concat([{ role: "manager", ref: "\u5317\u5340\u7D93\u7406", label: "\u7BA1\u7406\u8005\uFF08\u6211\uFF09\u30FB\u6BCF\u65E5\u63D0\u9192" }]);
  }
  function lineBadge() {
    var b = document.getElementById("line-nav-badge");
    if (!b) return;
    b.textContent = String(LINE.inbox.length);
    b.hidden = !LINE.inbox.length;
  }
  function lineBanner() {
    var el = document.getElementById("line-inbox-banner");
    if (!el) return;
    var n = LINE.inbox.length;
    el.innerHTML = n ? '<div class="line-banner" role="status"><span>\u{1F4AC} LINE \u5831\u4FEE\u5F85\u78BA\u8A8D <b>' + n + '</b> \u5247</span><button class="p2-btn" data-nav="line">\u524D\u5F80\u8655\u7406</button></div>' : "";
  }
  function loadLine(force) {
    var api = lineApi();
    if (!api) return Promise.resolve();
    if (LINE.loading) return LINE.loading;
    if (!force && LINE.at && Date.now() - LINE.at < 3e4) return Promise.resolve();
    LINE.at = Date.now();
    LINE.loading = Promise.all([api.listInbox(), api.listContacts(), api.stats().catch(function() {
      return null;
    })]).then(function(r) {
      LINE.inbox = r[0] || [];
      LINE.contacts = r[1] || [];
      LINE.stats = r[2];
      LINE.error = "";
    }).catch(function(e) {
      LINE.error = e && e.message || "\u7121\u6CD5\u8B80\u53D6 LINE \u8CC7\u6599\u3002";
    }).then(function() {
      LINE.at = Date.now();
      LINE.loading = null;
      lineBadge();
      if (PAGE === "line") renderLine();
      else if (PAGE === "dispatch") lineBanner();
    });
    return LINE.loading;
  }
  function renderLine() {
    var api = lineApi(), c = document.getElementById("content");
    var head = '<div class="p2-head"><div><h2>LINE \u5B98\u65B9\u5E33\u865F</h2><div class="p2-sub">\u7D81\u5B9A\u5DE5\u7A0B\u5E2B\u8207\u81EA\u5DF1\u7684 LINE\u3001\u8655\u7406\u5BA2\u6236 LINE \u5831\u4FEE\u3001\u67E5\u770B\u672C\u6708\u63A8\u64AD\u7528\u91CF\u3002</div></div>' + (api ? '<button class="p2-btn secondary" data-line="refresh">\u91CD\u65B0\u6574\u7406</button>' : "") + "</div>";
    if (!api) {
      c.innerHTML = head + '<div class="p2-note">LINE \u529F\u80FD\u9700\u5728\u96F2\u7AEF\u767B\u5165\u7248\u4F7F\u7528\u3002</div>';
      return;
    }
    function bound(role, ref) {
      return LINE.contacts.filter(function(x) {
        return x.role === role && x.ref_name === ref;
      });
    }
    var engBound = lineTargets().filter(function(t) {
      return t.role === "engineer" && bound(t.role, t.ref).length;
    }).length, s = LINE.stats, q = LINE.quota;
    var quota = q ? q.type === "none" ? "\u7121\u4E0A\u9650" : (q.used == null ? "\u2014" : esc(q.used)) + (q.limit == null ? "" : "/" + esc(q.limit)) : "\u2014";
    c.innerHTML = head + (LINE.error ? '<div class="p2-note line-err" role="alert">' + esc(LINE.error) + "</div>" : "") + (LINE.loading && !LINE.contacts.length ? '<div class="p2-note">\u8B80\u53D6 LINE \u8CC7\u6599\u4E2D\u2026</div>' : "") + '<div class="p2-grid"><div class="p2-stat"><b id="line-stat-inbox">' + LINE.inbox.length + '</b><span>LINE \u5831\u4FEE\u5F85\u78BA\u8A8D</span></div><div class="p2-stat"><b>' + engBound + '/4</b><span>\u5DE5\u7A0B\u5E2B\u5DF2\u7D81\u5B9A</span></div><div class="p2-stat"><b id="line-push-count">' + (s ? Number(s.push_ok) || 0 : "\u2014") + "</b><span>\u672C\u6708\u63A8\u64AD\uFF08\u7CFB\u7D71\u7D00\u9304\uFF09" + (s && Number(s.push_error) ? "\u30FB\u5931\u6557 " + Number(s.push_error) : "") + '</span></div><div class="p2-stat"><b id="line-quota">' + quota + '</b><span>LINE \u5B98\u65B9\u672C\u6708\u7528\u91CF <button class="btn-sm" data-line="quota">\u67E5\u8A62</button></span></div></div><div class="p2-note">LINE \u5B98\u65B9\u5E33\u865F\u514D\u8CBB\u65B9\u6848\u6BCF\u6708\u63A8\u64AD\u5247\u6578\u6709\u9650\uFF08\u5BE6\u969B\u984D\u5EA6\u4EE5 LINE \u5B98\u65B9\u5E33\u865F\u5F8C\u53F0\u70BA\u6E96\uFF09\u3002\u6D3E\u5DE5\u901A\u77E5\u3001\u5BA2\u6236\u9032\u5EA6\u3001\u6BCF\u65E5\u63D0\u9192\u8207\u6E2C\u8A66\u8A0A\u606F\uFF0C\u6BCF\u4F4D\u6536\u4EF6\u4EBA\u5404\u7B97 1 \u5247\uFF1B\u81EA\u52D5\u56DE\u8986\u5BA2\u6236\u4F7F\u7528\u514D\u8CBB\u7684\u56DE\u8986\u8A0A\u606F\uFF0C\u4E0D\u4F54\u63A8\u64AD\u984D\u5EA6\u3002\u7BA1\u7406\u8005\u7D81\u5B9A\u5F8C\u4E5F\u53EF\u5728 LINE \u50B3\u300C\u63D0\u9192\u300D\u4EE5\u56DE\u8986\u65B9\u5F0F\u53D6\u5F97\u4ECA\u65E5\u63D0\u9192\u3002</div><section class="card p2-panel" id="line-inbox"><h3>\u5BA2\u6236 LINE \u5831\u4FEE\uFF08\u5F85\u78BA\u8A8D\uFF09</h3>' + (LINE.inbox.length ? LINE.inbox.map(function(m) {
      var cus = LINE.contacts.find(function(x) {
        return x.line_user_id === m.line_user_id && x.role === "customer";
      });
      return '<div class="line-item" data-inbox="' + esc(m.id) + '"><div><b>' + esc(m.display_name || "LINE \u4F7F\u7528\u8005") + "</b>" + (cus ? ' <span class="case-tag">\u5BA2\u6236\uFF1A' + esc(cus.ref_name) + "</span>" : "") + ' <span class="p2-sub">' + lineTime(m.received_at) + '</span><div class="line-text">' + esc(m.text) + '</div></div><div class="p2-actions" style="margin-top:0"><button class="p2-btn" data-line="convert" data-id="' + esc(m.id) + '">\u8F49\u6210\u5DE5\u55AE</button><button class="p2-btn secondary" data-line="ignore" data-id="' + esc(m.id) + '">\u5FFD\u7565</button></div></div>';
    }).join("") : '<p class="p2-empty">\u76EE\u524D\u6C92\u6709\u5F85\u78BA\u8A8D\u7684 LINE \u5831\u4FEE</p>') + '</section><section class="card p2-panel" id="line-bind"><h3>\u7D81\u5B9A LINE</h3><p class="p2-sub">\u7522\u751F\u4E00\u6B21\u6027\u7D81\u5B9A\u78BC\uFF0824 \u5C0F\u6642\u5167\u6709\u6548\u3001\u50C5\u80FD\u4F7F\u7528\u4E00\u6B21\uFF09\u3002\u8ACB\u5C0D\u65B9\u52A0\u5165\u5B98\u65B9\u5E33\u865F\u597D\u53CB\u5F8C\u50B3\u9001\u300C\u7D81\u5B9A \u4EE3\u78BC\u300D\u3002\u91CD\u65B0\u7522\u751F\u6703\u4F5C\u5EE2\u820A\u78BC\uFF1B\u91CD\u65B0\u7D81\u5B9A\u6703\u53D6\u4EE3\u539F\u672C\u7684 LINE \u5E33\u865F\u3002</p>' + lineTargets().map(function(t) {
      var b = bound(t.role, t.ref), code = LINE.codes[t.role + "|" + t.ref];
      if (code && b.some(function(x) {
        return Date.parse(x.bound_at) >= code.created;
      })) code = null;
      return '<div class="line-row" data-bind-target="' + esc(t.ref) + '"><div><b>' + esc(t.label) + '</b><div class="p2-sub">' + (b.length ? '<span class="line-ok">\u5DF2\u7D81\u5B9A</span> ' + esc(b.map(function(x) {
        return x.display_name || "LINE \u4F7F\u7528\u8005";
      }).join("\u3001")) : '<span class="line-no">\u672A\u7D81\u5B9A</span>') + "</div>" + (code ? '<div style="margin-top:8px">\u8ACB\u50B3\u9001\uFF1A<span class="line-code">\u7D81\u5B9A ' + esc(code.code) + '</span><div class="p2-sub">\u6709\u6548\u81F3 ' + lineTime(code.expires_at) + "</div></div>" : "") + '</div><button class="p2-btn secondary" data-line="code" data-role="' + esc(t.role) + '" data-ref="' + esc(t.ref) + '">' + (b.length ? "\u91CD\u65B0\u7D81\u5B9A" : "\u7522\u751F\u7D81\u5B9A\u78BC") + "</button></div>";
    }).join("") + '</section><section class="card p2-panel" id="line-contacts"><h3>\u5DF2\u7D81\u5B9A\u806F\u7D61\u4EBA</h3>' + (LINE.contacts.length ? LINE.contacts.map(function(x) {
      return '<div class="line-row" data-contact="' + esc(x.id) + '"><div><span class="case-tag">' + esc(lineRole(x.role)) + "</span> <b>" + esc(x.ref_name) + '</b><div class="p2-sub">LINE\uFF1A' + esc(x.display_name || "\uFF08\u672A\u53D6\u5F97\u540D\u7A31\uFF09") + "\u30FB\u7D81\u5B9A\u65BC " + lineTime(x.bound_at) + '</div></div><div class="p2-actions" style="margin-top:0"><button class="btn-sm" data-line="test" data-id="' + esc(x.id) + '" title="\u6703\u4F7F\u7528 1 \u5247\u63A8\u64AD\u984D\u5EA6">\u50B3\u9001\u6E2C\u8A66</button><button class="btn-sm" data-line="unbind" data-id="' + esc(x.id) + '">\u89E3\u9664\u7D81\u5B9A</button></div></div>';
    }).join("") : '<p class="p2-empty">\u5C1A\u672A\u7D81\u5B9A\u4EFB\u4F55 LINE \u5E33\u865F</p>') + '</section><p class="p2-sub" style="margin-top:12px">\u5BA2\u6236\u7684 LINE \u5831\u4FEE\u8F49\u6210\u5DE5\u55AE\u5F8C\u6703\u81EA\u52D5\u7D81\u5B9A\u8A72\u5BA2\u6236\uFF1B\u4E4B\u5F8C\u78BA\u8A8D\u6642\u9593\u3001\u6539\u671F\u3001\u5DE5\u7A0B\u5E2B\u51FA\u767C\u8207\u5B8C\u5DE5\u6703\u901A\u77E5\u5BA2\u6236\u3002</p>';
    loadLine(false);
  }
  document.addEventListener("click", function(e) {
    var b = e.target.closest("[data-line]");
    if (!b) return;
    var api = lineApi();
    if (!api) return;
    var type = b.dataset.line, id = b.dataset.id;
    function again() {
      if (PAGE === "line") renderLine();
    }
    if (type === "refresh") {
      loadLine(true);
      again();
      return;
    }
    if (type === "quota") {
      b.disabled = true;
      api.quota().then(function(q) {
        if (q && q.ok) LINE.quota = q;
        else lineToast("\u7121\u6CD5\u53D6\u5F97 LINE \u7528\u91CF\uFF1A" + (q && q.error || "\u8ACB\u78BA\u8A8D Edge Function \u5DF2\u90E8\u7F72"));
      }).catch(function(err) {
        lineToast("\u7121\u6CD5\u53D6\u5F97 LINE \u7528\u91CF\uFF1A" + err.message);
      }).then(again);
      return;
    }
    if (type === "code") {
      var role = b.dataset.role, ref = b.dataset.ref;
      b.disabled = true;
      api.createCode(role, ref).then(function(r) {
        r.created = Date.now();
        LINE.codes[role + "|" + ref] = r;
      }).catch(function(err) {
        lineToast(err.message);
      }).then(again);
      return;
    }
    if (type === "ignore") {
      b.disabled = true;
      api.ignoreInbox(id).then(function() {
        LINE.inbox = LINE.inbox.filter(function(m2) {
          return m2.id !== id;
        });
        lineBadge();
        api.toast("\u5DF2\u5FFD\u7565\u6B64 LINE \u8A0A\u606F\u3002");
      }).catch(function(err) {
        lineToast(err.message);
      }).then(again);
      return;
    }
    if (type === "test") {
      b.disabled = true;
      api.test(id).then(function() {
        b.disabled = false;
      });
      return;
    }
    if (type === "unbind") {
      var ct = LINE.contacts.find(function(x) {
        return x.id === id;
      });
      if (!ct || !confirm("\u78BA\u5B9A\u89E3\u9664\u300C" + ct.ref_name + "\u300D\u7684 LINE \u7D81\u5B9A\uFF1F\u4E4B\u5F8C\u4E0D\u6703\u518D\u901A\u77E5\u6B64\u5E33\u865F\u3002")) return;
      b.disabled = true;
      api.unbind(id).then(function() {
        LINE.contacts = LINE.contacts.filter(function(x) {
          return x.id !== id;
        });
        api.toast("\u5DF2\u89E3\u9664\u7D81\u5B9A\u3002");
      }).catch(function(err) {
        lineToast(err.message);
      }).then(again);
      return;
    }
    if (type === "convert") {
      var m = LINE.inbox.find(function(x) {
        return x.id === id;
      });
      if (!m) return;
      var cus = LINE.contacts.find(function(x) {
        return x.line_user_id === m.line_user_id && x.role === "customer";
      });
      var inferredClient = inferLineClient(m.text), clientName = inferredClient || (cus ? cus.ref_name : "");
      newDialog(null, { client: clientName, note: lineReportContent(m.text, clientName).slice(0, 1e3), originalText: String(m.text || ""), received: m.received_at, source: "LINE \u5831\u4FEE\uFF08" + (m.display_name || "LINE \u4F7F\u7528\u8005") + "\uFF09", onCreated: function(j, ev) {
        api.convertInbox(m.id, j.id, j.client).then(function() {
          LINE.inbox = LINE.inbox.filter(function(x) {
            return x.id !== m.id;
          });
          lineBadge();
          lineBanner();
        }).catch(function(err) {
          api.toast("\u5DE5\u55AE\u5DF2\u5EFA\u7ACB\uFF0C\u4F46 LINE \u5831\u4FEE\u72C0\u614B\u672A\u66F4\u65B0\uFF1A" + err.message, "warn");
        }).then(function() {
          if (ev) lineNotify(ev);
          loadLine(true);
        });
      } });
    }
  });
  var CALMONTH = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1), CALDAY = localDate(/* @__PURE__ */ new Date()), CALENGINEER = "\u5168\u90E8";
  function hm(t) {
    return new Date(t).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  function calendarJobs() {
    return JOBS.filter(function(j) {
      return j.start && j.end && !["\u5DF2\u53D6\u6D88", "\u5F85\u518D\u8A2A", "\u5F85\u6D3E\u5DE5"].includes(j.status) && (CALREG === "\u5168\u90E8" || j.region === CALREG) && (CALENGINEER === "\u5168\u90E8" || j.engineer === CALENGINEER);
    }).sort(function(a, b) {
      return a.start.localeCompare(b.start);
    });
  }
  function renderSchedule() {
    var jobs = calendarJobs(), year = CALMONTH.getFullYear(), month = CALMONTH.getMonth(), first = new Date(year, month, 1), begin = new Date(year, month, 1 - first.getDay()), today = localDate(/* @__PURE__ */ new Date());
    var visibleCount = jobs.filter(function(j) {
      var d = new Date(j.start);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length;
    var cells = "";
    for (var i = 0; i < 42; i++) {
      var day = new Date(begin);
      day.setDate(day.getDate() + i);
      var key = localDate(day), list = jobs.filter(function(j) {
        return localDate(new Date(j.start)) === key;
      });
      cells += '<div class="cal-day' + (day.getMonth() !== month ? " other-month" : "") + (day.getDay() === 6 ? " saturday" : "") + (key === CALDAY ? " selected" : "") + '" data-date="' + key + '"><button class="cal-date' + (key === today ? " today" : "") + '" data-cal-date="' + key + '" aria-label="' + key + "\uFF0C" + list.length + ' \u4EF6\u6D3E\u5DE5"' + (key === today ? ' aria-current="date"' : "") + ">" + day.getDate() + "</button>" + list.map(function(j) {
        return '<button class="cal-event' + (j.region === "\u6843\u7AF9" ? " region-peach" : "") + (j.status === "\u5DF2\u5B8C\u6210" ? " finished" : "") + '" data-job="' + esc(j.id) + '" aria-label="' + esc(hm(j.start) + "\u81F3" + hm(j.end) + " " + j.engineer + " " + j.client + " " + j.status) + '" title="' + esc(j.engineer + "\uFF5C" + j.client + "\uFF5C" + j.status) + '"><span class="cal-time">' + hm(j.start) + "\u2013" + hm(j.end) + "</span><span>" + esc(j.engineer) + '</span><span class="cal-customer">' + esc(j.client) + "</span></button>";
      }).join("") + "</div>";
    }
    var selected = jobs.filter(function(j) {
      return localDate(new Date(j.start)) === CALDAY;
    });
    document.getElementById("content").innerHTML = '<div class="p2-head"><div><h2>\u6D3E\u5DE5\u884C\u4E8B\u66C6</h2><p class="p2-sub">\u78BA\u8A8D\u6D3E\u5DE5\u5F8C\u81EA\u52D5\u986F\u793A\uFF0C\u672A\u5B89\u6392\u7684\u65E5\u671F\u7559\u767D\u3002\u9EDE\u65E5\u671F\u770B\u7576\u65E5\u660E\u7D30\uFF0C\u9EDE\u6D3E\u5DE5\u958B\u555F\u5DE5\u55AE\u3002</p></div><button class="p2-btn" data-p2="dispatch">\u5B89\u6392\u6D3E\u5DE5 \u2192</button></div><div class="cal-controls"><h3 class="cal-heading">' + year + " \u5E74 " + (month + 1) + ' \u6708</h3><button data-cal-move="-1" aria-label="\u4E0A\u500B\u6708">\u2039</button><button data-cal-today>\u4ECA\u5929</button><button data-cal-move="1" aria-label="\u4E0B\u500B\u6708">\u203A</button><select id="p2-calreg" aria-label="\u6392\u7A0B\u5730\u5340">' + opts(["\u5168\u90E8", "\u96D9\u5317", "\u6843\u7AF9"].concat(COUNTIES), CALREG) + '</select><select id="cal-engineer" aria-label="\u6392\u7A0B\u5DE5\u7A0B\u5E2B">' + opts(["\u5168\u90E8"].concat(Array.from(new Set(engineerRoster().map(function(e) {
      return e.name;
    }).concat(JOBS.map(function(j) {
      return j.engineer;
    }).filter(Boolean))))), CALENGINEER) + '</select></div><div class="cal-shell"><div class="cal-week">' + ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"].map(function(d) {
      return "<span>" + d + "</span>";
    }).join("") + '</div><div class="cal-grid">' + cells + '</div></div><div class="cal-legend"><span><i></i>\u96D9\u5317</span><span><i class="peach"></i>\u6843\u7AF9</span><span>\u7070\u8272\uFF1A\u5DF2\u5B8C\u6210</span><span>\u672C\u6708 ' + visibleCount + ' \u4EF6</span><span>\u4E00\u822C\u6D3E\u5DE5\u9031\u672B\u53CA\u570B\u5B9A\u5047\u65E5\u4E0D\u5B89\u6392</span></div><section class="card cal-selected"><h3>' + esc(CALDAY.replace(/-/g, " / ")) + " \xB7 " + selected.length + " \u4EF6\u6D3E\u5DE5</h3>" + (selected.length ? selected.map(function(j) {
      return '<div class="cal-agenda-item"><div><b>' + hm(j.start) + "\u2013" + hm(j.end) + "\u3000" + esc(j.engineer) + '</b><div class="p2-sub">' + esc(j.client) + " \xB7 " + esc(j.region) + "\uFF0F" + esc(j.category) + " \xB7 " + esc(j.status) + '</div></div><button class="p2-btn secondary" data-job="' + esc(j.id) + '">\u67E5\u770B\u5DE5\u55AE</button></div>';
    }).join("") : '<p class="cal-empty">\u7576\u65E5\u5C1A\u7121\u5B89\u6392\u6D3E\u5DE5</p>') + '</section><p class="p2-sub" style="margin-top:14px">\u50C5\u986F\u793A\u76EE\u524D\u5E33\u865F\u5DF2\u78BA\u8A8D\u7684\u6D3E\u5DE5\uFF1B\u65B0\u589E\u5F85\u6D3E\u5DE5\u4E0D\u6703\u5148\u5360\u7528\u6708\u66C6\u3002\u53D6\u6D88\u5373\u79FB\u9664\uFF0C\u91CD\u65B0\u5B89\u6392\u6703\u79FB\u81F3\u65B0\u6642\u6BB5\u3002\u672A\u4E32\u63A5 Google \u884C\u4E8B\u66C6\u3002</p>';
    document.getElementById("p2-calreg").onchange = function(e) {
      CALREG = e.target.value;
      renderSchedule();
    };
    document.getElementById("cal-engineer").onchange = function(e) {
      CALENGINEER = e.target.value;
      renderSchedule();
    };
  }
  document.addEventListener("click", function(e) {
    var move = e.target.closest("[data-cal-move]");
    if (move) {
      CALMONTH = new Date(CALMONTH.getFullYear(), CALMONTH.getMonth() + Number(move.dataset.calMove), 1);
      CALDAY = localDate(CALMONTH);
      renderSchedule();
      return;
    }
    if (e.target.closest("[data-cal-today]")) {
      var now = /* @__PURE__ */ new Date();
      CALMONTH = new Date(now.getFullYear(), now.getMonth(), 1);
      CALDAY = localDate(now);
      renderSchedule();
      return;
    }
    var day = e.target.closest("[data-cal-date]");
    if (day) {
      CALDAY = day.dataset.calDate;
      renderSchedule();
      return;
    }
    var show = e.target.closest("[data-job-calendar]");
    if (show) {
      var j = JOBS.find(function(k) {
        return k.id === show.dataset.jobCalendar;
      });
      if (!j || !j.start) return;
      var d = new Date(j.start);
      CALMONTH = new Date(d.getFullYear(), d.getMonth(), 1);
      CALDAY = localDate(d);
      CALREG = CALENGINEER = "\u5168\u90E8";
      go("calendar");
    }
  });
  document.addEventListener("click", function(e) {
    var job = e.target.closest("[data-job]");
    if (job) {
      go("dispatch");
      DSEL = job.dataset.job;
      renderDispatch();
      document.getElementById("p2-detail").scrollIntoView({ block: "start" });
      return;
    }
    var a = e.target.closest("[data-action]");
    if (a) {
      action(a.dataset.action);
      return;
    }
    var p = e.target.closest("[data-p2]");
    if (!p) return;
    var type = p.dataset.p2;
    if (type === "new") newDialog();
    else if (type === "close") {
      DSEL = null;
      renderDispatch();
    } else if (type === "dialog-close") document.getElementById("p2-dialog").close();
    else if (type === "calendar") go("calendar");
    else if (type === "dispatch") go("dispatch");
  });
  var CASEKEY = "leyan-cases-demo-v1";
  var CASE_TAGS = ["\u786C\u9AD4", "\u5F31\u96FB", "\u8EDF\u9AD4", "\u4EE3\u8FA6", "\u88DD\u6F62\u8A2D\u8A08"];
  function selectedCaseTags(c) {
    if (Array.isArray(c.tags)) return CASE_TAGS.filter(function(t) {
      return c.tags.includes(t);
    });
    var old = String(c.type || "").split(/[、,，\/|]/);
    return CASE_TAGS.filter(function(t) {
      return old.includes(t);
    });
  }
  function renderCaseTags(c) {
    var tags = selectedCaseTags(c);
    return tags.length ? tags.map(function(t) {
      return '<span class="case-tag" data-case-tag="' + esc(t) + '">' + esc(t) + "</span>";
    }).join("") : '<span class="case-tag unset">\u672A\u5206\u985E</span>';
  }
  function tagPicker(v) {
    var selected = selectedCaseTags(v);
    return '<fieldset class="p2-wide case-tag-field"><legend>\u6848\u4EF6\u985E\u5225\uFF08\u53EF\u8907\u9078\uFF09</legend><div class="case-tag-options">' + CASE_TAGS.map(function(t) {
      return '<label class="case-tag-choice"><input type="checkbox" name="caseTags" value="' + esc(t) + '"' + (selected.includes(t) ? " checked" : "") + "><span>" + esc(t) + "</span></label>";
    }).join("") + "</div>" + (v.legacyType ? '<p class="p2-sub" style="margin-top:9px">\u539F\u5206\u985E\uFF1A' + esc(v.legacyType) + "\uFF08\u4FDD\u7559\u820A\u7D00\u9304\uFF0C\u8ACB\u4F9D\u9700\u6C42\u9078\u64C7\u6A19\u7C64\uFF09</p>" : "") + "</fieldset>";
  }
  function caseDue(c) {
    if (c.amount == null) return 0;
    return (c.depositPaid ? 0 : Number(c.deposit) || 0) + (c.balancePaid ? 0 : Number(c.balance) || 0);
  }
  function caseReceived(c) {
    if (c.amount == null) return 0;
    return (c.depositPaid ? Number(c.deposit) || 0 : 0) + (c.balancePaid ? Number(c.balance) || 0 : 0);
  }
  function saveCases() {
    try {
      window.leyanCloudStore.setItem(CASEKEY, JSON.stringify(CASES));
    } catch (e) {
      notify("\u700F\u89BD\u5668\u7121\u6CD5\u5132\u5B58\u6848\u4EF6\uFF0C\u8B8A\u66F4\u53EA\u4FDD\u7559\u81F3\u91CD\u65B0\u6574\u7406\u524D\u3002");
    }
  }
  function initCases() {
    try {
      var list = JSON.parse(window.leyanCloudStore.getItem(CASEKEY));
      if (Array.isArray(list) && list.every(function(c) {
        return c && typeof c.id === "string" && /^[A-Za-z0-9_-]+$/.test(c.id) && typeof c.client === "string" && STAGES.includes(c.status) && (c.amount == null || Number.isSafeInteger(c.amount) && c.amount >= 0) && Number.isSafeInteger(c.deposit) && c.deposit >= 0 && (c.balance == null || Number.isSafeInteger(c.balance) && c.balance >= 0);
      })) CASES = list;
    } catch (e) {
    }
    CASES.forEach(function(c) {
      c.statusIdx = STAGES.indexOf(c.status);
      var tags = selectedCaseTags(c);
      if (!Array.isArray(c.tags) && !tags.length && c.type && !["\u4E00\u822C\u6848\u4EF6", "\u672A\u5206\u985E"].includes(c.type)) c.legacyType = c.type;
      c.tags = tags;
    });
  }
  function caseEditor(id) {
    var c = id ? CASES.find(function(x) {
      return x.id === id;
    }) : null;
    if (id && !c) return;
    var old = document.getElementById("case-dialog");
    if (old) old.remove();
    var dialog = document.createElement("dialog");
    dialog.id = "case-dialog";
    dialog.className = "p2-dialog";
    dialog.setAttribute("aria-label", c ? "\u7DE8\u8F2F\u6848\u4EF6" : "\u65B0\u589E\u6848\u4EF6");
    var v = c || { client: "", type: "", status: "\u6D3D\u8AC7", amount: null, deposit: null, balance: null, depositPaid: false, balancePaid: false, note: "" };
    dialog.innerHTML = "<h2>" + (c ? "\u7DE8\u8F2F\u6848\u4EF6 \xB7 " + esc(c.id) : "\u65B0\u589E\u6848\u4EF6") + '</h2><p class="p2-sub" style="margin:10px 0 18px">\u4FEE\u6539\u6848\u4EF6\u9032\u5EA6\u53CA\u6536\u6B3E\u8CC7\u6599\uFF0C\u5132\u5B58\u5F8C\u540C\u6B65\u66F4\u65B0\u5217\u8868\u8207\u5100\u8868\u677F\u3002</p><form id="case-form"><div class="p2-form"><label class="p2-wide">\u5BA2\u6236\uFF0F\u6848\u4EF6\u540D\u7A31 *<input name="caseClient" required maxlength="100" value="' + esc(v.client) + '"></label>' + tagPicker(v) + '<label>\u76EE\u524D\u72C0\u614B *<select name="caseStage">' + opts(STAGES, v.status) + '</select></label><label>\u7E3D\u91D1\u984D\uFF08NT$\uFF09<input name="caseAmount" type="number" min="0" max="999999999999" step="1" placeholder="\u91D1\u984D\u672A\u5B9A\u53EF\u7559\u7A7A" value="' + (v.amount == null ? "" : v.amount) + '"></label><label>\u8A02\u91D1\uFF08NT$\uFF09<input name="caseDeposit" type="number" min="0" max="999999999999" step="1" value="' + (v.deposit == null ? "" : v.deposit) + '"></label><label>\u5C3E\u6B3E\uFF08NT$\uFF09<input name="caseBalance" type="number" min="0" max="999999999999" step="1" value="' + (v.balance == null ? "" : v.balance) + '"></label><label>\u8A02\u91D1\u72C0\u614B<select name="depositState">' + opts(["\u5F85\u6536\u6B3E", "\u5DF2\u6536\u6B3E"], v.depositPaid ? "\u5DF2\u6536\u6B3E" : "\u5F85\u6536\u6B3E") + '</select></label><label>\u5C3E\u6B3E\u72C0\u614B<select name="balanceState">' + opts(["\u5F85\u6536\u6B3E", "\u5DF2\u6536\u6B3E"], v.balancePaid ? "\u5DF2\u6536\u6B3E" : "\u5F85\u6536\u6B3E") + '</select></label><label class="p2-wide">\u5099\u8A3B<textarea name="caseNote" rows="3" maxlength="2000">' + esc(v.note) + '</textarea></label></div><p class="p2-sub" style="margin-top:12px">\u8A02\u91D1\u4E0D\u9650\u5B9A\u6BD4\u4F8B\u3002\u8ABF\u6574\u7E3D\u984D\u6216\u8A02\u91D1\u6642\u6703\u91CD\u7B97\u5C3E\u6B3E\uFF1B\u4E5F\u53EF\u81EA\u884C\u4FEE\u6539\uFF0C\u5132\u5B58\u6642\u6703\u6AA2\u67E5\u300C\u8A02\u91D1\uFF0B\u5C3E\u6B3E\uFF1D\u7E3D\u91D1\u984D\u300D\u3002\u91D1\u984D\u4EE5\u65B0\u53F0\u5E63\u6574\u6578\u5143\u8A08\u3002</p><div id="case-summary" class="p2-note" style="margin-top:12px"></div><p id="case-error" role="alert" style="color:#b91c1c;margin-top:12px"></p><div class="p2-actions"><button class="p2-btn" type="submit">\u5132\u5B58\u6848\u4EF6</button><button class="p2-btn secondary" type="button" id="case-cancel">\u53D6\u6D88</button></div><p class="p2-sub" style="margin-top:12px">\u6848\u4EF6\u8CC7\u6599\u4F9D\u767B\u5165\u5E33\u865F\u5132\u5B58\u81F3\u96F2\u7AEF\u3002</p></form>';
    document.body.appendChild(dialog);
    var f = dialog.querySelector("form"), error = dialog.querySelector("#case-error");
    function numbers() {
      return { amount: f.elements.caseAmount.value === "" ? null : Number(f.elements.caseAmount.value), deposit: Number(f.elements.caseDeposit.value || 0), balance: f.elements.caseBalance.value === "" ? null : Number(f.elements.caseBalance.value), depositPaid: f.elements.depositState.value === "\u5DF2\u6536\u6B3E", balancePaid: f.elements.balanceState.value === "\u5DF2\u6536\u6B3E" };
    }
    function summary() {
      var n = numbers();
      error.textContent = "";
      if (n.amount == null) {
        dialog.querySelector("#case-summary").textContent = "\u7E3D\u91D1\u984D\u5C1A\u672A\u78BA\u5B9A\uFF0C\u5F85\u78BA\u8A8D\u5F8C\u53EF\u518D\u6B21\u7DE8\u8F2F\u3002";
        return;
      }
      var balance = n.balance == null ? n.amount - n.deposit : n.balance;
      var money = { amount: n.amount, deposit: n.deposit, balance, depositPaid: n.depositPaid, balancePaid: n.balancePaid };
      dialog.querySelector("#case-summary").textContent = n.deposit + balance !== n.amount ? "\u91D1\u984D\u4E0D\u4E00\u81F4\uFF1A\u8ACB\u78BA\u8A8D\u8A02\u91D1\u8207\u5C3E\u6B3E\u5408\u8A08\u3002" : "\u5DF2\u6536\u6B3E " + fmt(caseReceived(money)) + " \uFF0F \u5F85\u6536\u6B3E " + fmt(caseDue(money));
    }
    function recalc() {
      var n = numbers();
      if (n.amount != null && n.amount >= n.deposit) f.elements.caseBalance.value = String(n.amount - n.deposit);
      summary();
    }
    f.elements.caseAmount.oninput = recalc;
    f.elements.caseDeposit.oninput = recalc;
    f.elements.caseBalance.oninput = summary;
    f.elements.depositState.onchange = summary;
    f.elements.balanceState.onchange = summary;
    dialog.querySelector("#case-cancel").onclick = function() {
      dialog.close();
    };
    f.onsubmit = function(e) {
      e.preventDefault();
      var n = numbers(), client = f.elements.caseClient.value.trim();
      if (!client) {
        error.textContent = "\u8ACB\u8F38\u5165\u5BA2\u6236\uFF0F\u6848\u4EF6\u540D\u7A31\u3002";
        return;
      }
      if (n.amount == null) {
        if (n.deposit > 0 || (n.balance || 0) > 0 || n.depositPaid || n.balancePaid) {
          error.textContent = "\u8ACB\u5148\u586B\u5BEB\u7E3D\u91D1\u984D\uFF0C\u624D\u80FD\u8A2D\u5B9A\u6B3E\u9805\u6216\u5DF2\u6536\u6B3E\u72C0\u614B\u3002";
          return;
        }
        n.deposit = 0;
        n.balance = null;
      } else {
        if (n.balance == null) n.balance = n.amount - n.deposit;
        if (![n.amount, n.deposit, n.balance].every(function(x) {
          return Number.isSafeInteger(x) && x >= 0 && x <= 999999999999;
        })) {
          error.textContent = "\u91D1\u984D\u8ACB\u586B\u5BEB\u6709\u6548\u7684\u975E\u8CA0\u6574\u6578\u3002";
          return;
        }
        if (n.deposit + n.balance !== n.amount) {
          error.textContent = "\u8A02\u91D1\u52A0\u5C3E\u6B3E\u5FC5\u9808\u7B49\u65BC\u7E3D\u91D1\u984D\uFF0C\u8ACB\u8ABF\u6574\u5F8C\u518D\u5132\u5B58\u3002";
          return;
        }
      }
      var status = f.elements.caseStage.value, record = c || { id: "C" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase(), contact: "", phone: "", address: "", start: null, end: null, history: [] };
      var prior = c ? { tags: selectedCaseTags(c).slice(), status: c.status, amount: c.amount, deposit: c.deposit, balance: c.balance, depositPaid: c.depositPaid, balancePaid: c.balancePaid } : null;
      Object.assign(record, n, { client, tags: Array.from(new FormData(f).getAll("caseTags")).filter(function(t) {
        return CASE_TAGS.includes(t);
      }), type: Array.from(new FormData(f).getAll("caseTags")).filter(function(t) {
        return CASE_TAGS.includes(t);
      }).join("\u3001") || "\u672A\u5206\u985E", note: f.elements.caseNote.value.trim(), status, statusIdx: STAGES.indexOf(status), updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
      record.history = record.history || [];
      record.history.push({ at: record.updatedAt, text: c ? "\u66F4\u65B0\u6848\u4EF6\u72C0\u614B\uFF0F\u91D1\u984D\uFF0F\u6536\u6B3E\u8CC7\u6599" : "\u5EFA\u7ACB\u6848\u4EF6", before: prior });
      if (!c) CASES.unshift(record);
      saveCases();
      dialog.close();
      go("cases");
      FILTER = "all";
      SEL = record.id;
      renderCases();
      notify("\u6848\u4EF6\u5DF2\u66F4\u65B0\uFF0C\u6B63\u5728\u540C\u6B65\u96F2\u7AEF\u3002");
    };
    summary();
    dialog.showModal();
  }
  document.addEventListener("click", function(e) {
    var add = e.target.closest("[data-case-new]");
    if (add) {
      caseEditor();
      return;
    }
    var edit = e.target.closest("[data-case-edit]");
    if (edit) caseEditor(edit.dataset.caseEdit);
  });
  initCases();
  initJobs();
  loadLine(true);
  document.getElementById("todayDate").textContent = (/* @__PURE__ */ new Date()).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric", weekday: "short" });
  go("dashboard");
})();
