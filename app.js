// app-entry.generated.mjs
var css = document.createElement("link");
css.rel = "stylesheet";
css.href = "app.css?v=396f5a55de";
document.head.appendChild(css);
document.body.innerHTML = '\n<aside class="sidebar" id="sidebar">\n  <div class="sb-logo">\n    <div class="sb-dots"><div class="sb-dot" style="background:#f59e0b"></div><div class="sb-dot" style="background:#3b82f6"></div></div>\n    <div class="sb-brand">\u6A02\u884D <small>\u5317\u5340\u5DE5\u4F5C\u7BA1\u7406</small></div>\n  </div>\n  <nav>\n    <div class="nav-item" data-page="dashboard"><span class="nav-icon">\u{1F4CA}</span> \u5100\u8868\u677F</div>\n    <div class="nav-item" data-page="cases"><span class="nav-icon">\u{1F4C1}</span> \u696D\u52D9\u6848\u4EF6</div>\n    <div class="nav-item" data-page="dispatch"><span class="nav-icon">\u{1F527}</span> \u5831\u4FEE\u6D3E\u5DE5</div>\n    <div class="nav-item" data-page="calendar"><span class="nav-icon">\u{1F4C5}</span> \u884C\u4E8B\u66C6</div>\n    <div class="nav-item" data-page="line"><span class="nav-icon">\u{1F4AC}</span> LINE \u8A2D\u5B9A<span class="line-badge" id="line-nav-badge" hidden></span></div>\n    <div class="nav-item" data-page="settings"><span class="nav-icon">\u2699\uFE0F</span> \u7BA1\u7406\u8CC7\u6599</div>\n  </nav>\n  <div class="sb-footer"><div>\u4E92\u52D5\u539F\u578B \xB7 \u7B2C\u4E8C\u968E\u6BB5</div><div style="color:#3b82f6;margin-top:2px">v2.0 \xB7 \u672C\u6A5F\u793A\u7BC4</div></div>\n</aside>\n<div class="overlay" id="overlay"></div>\n<div class="app">\n  <header class="topbar">\n    <button class="menu-btn" id="menuBtn">\u2630</button>\n    <div class="page-title" id="pageTitle">\u5100\u8868\u677F</div>\n    <div style="display:flex;align-items:center;gap:10px;margin-left:auto">\n      <span class="date-chip" id="todayDate"></span>\n      <span class="user-pill">\u5317\u5340\u7D93\u7406</span>\n    </div>\n  </header>\n  <div style="padding:10px 24px;background:#fff7ed;color:#9a3412;font-size:13px">\u5DE5\u4F5C\u7BA1\u7406\uFF5C\u8CC7\u6599\u4F9D\u767B\u5165\u5E33\u865F\u4FDD\u5B58\u5728\u96F2\u7AEF\uFF1B\u672A\u4E32\u63A5Google\u884C\u4E8B\u66C6\u3002LINE\u901A\u77E5\u8ACB\u65BC\u300CLINE \u8A2D\u5B9A\u300D\u7D81\u5B9A\u3002</div><div class="content" id="content"></div>\n</div>\n';
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
    document.querySelectorAll(".nav-item").forEach(function(el) {
      el.classList.toggle("active", el.dataset.page === page);
    });
    var t = { dashboard: "\u5100\u8868\u677F", cases: "\u696D\u52D9\u6848\u4EF6", dispatch: "\u5831\u4FEE\u6D3E\u5DE5", calendar: "\u884C\u4E8B\u66C6", line: "LINE \u8A2D\u5B9A", settings: "\u7BA1\u7406\u8CC7\u6599" };
    document.getElementById("pageTitle").textContent = t[page] || page;
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
    render();
    window.scrollTo(0, 0);
  }
  function renderDashboard() {
    var today = localDate(/* @__PURE__ */ new Date());
    var td = DISPATCH.filter(function(d) {
      return d.date === today;
    });
    var active = CASES.filter(function(c) {
      return c.status !== "\u7D50\u6848";
    }).length;
    var pendPay = CASES.filter(function(c) {
      return caseDue(c) > 0;
    });
    var pendAmt = pendPay.reduce(function(s, c) {
      return s + caseDue(c);
    }, 0);
    var closed = CASES.filter(function(c) {
      return c.status === "\u7D50\u6848";
    }).length;
    var stats = "<div class=stats-row><div class=stat-card><div class=stat-top><div><div class=stat-num>" + td.length + "</div><div class=stat-label>\u4ECA\u65E5\u6D3E\u5DE5</div><div class=stat-sub>\u96D9\u5317 " + td.filter(function(d) {
      return d.region === "\u96D9\u5317";
    }).length + " \xB7 \u6843\u7AF9 " + td.filter(function(d) {
      return d.region === "\u6843\u7AF9";
    }).length + "</div></div><div class=stat-icon style=background:#eff6ff>\u{1F527}</div></div></div><div class=stat-card><div class=stat-top><div><div class=stat-num>" + active + "</div><div class=stat-label>\u9032\u884C\u4E2D\u6848\u4EF6</div><div class=stat-sub>\u65BD\u5DE5\u4E2D " + CASES.filter(function(c) {
      return c.status === "\u65BD\u5DE5";
    }).length + " \xB7 \u9A57\u6536 " + CASES.filter(function(c) {
      return c.status === "\u9A57\u6536";
    }).length + "</div></div><div class=stat-icon style=background:#f5f3ff>\u{1F4C1}</div></div></div><div class=stat-card><div class=stat-top><div><div class=stat-num style=font-size:17px>" + fmt(pendAmt) + "</div><div class=stat-label>\u5F85\u6536\u6B3E\u5408\u8A08</div><div class=stat-sub>" + pendPay.length + " \u4EF6\u5F85\u6536\u6B3E\uFF08\u542B\u8A02\u91D1\uFF0F\u5C3E\u6B3E\uFF09</div></div><div class=stat-icon style=background:#fffbeb>\u{1F4B0}</div></div></div><div class=stat-card><div class=stat-top><div><div class=stat-num>" + closed + "</div><div class=stat-label>\u7D2F\u8A08\u7D50\u6848</div><div class=stat-sub>\u53F0\u5317 \xB7 \u65B0\u5317 \xB7 \u6843\u7AF9</div></div><div class=stat-icon style=background:#f0fdf4>\u2705</div></div></div></div>";
    var dr = td.map(function(d) {
      return "<tr><td><strong>" + esc(d.client) + "</strong><div style=font-size:11px;color:#94a3b8>" + esc((d.address || "").substring(0, 18)) + "</div></td><td><span class=badge style=background:#f1f5f9;color:#334155>" + d.region + "</span></td><td>" + d.category + "</td><td><strong>" + esc(d.engineer) + "</strong></td><td>" + dbadge(d.status) + "</td></tr>";
    }).join("");
    if (!dr) dr = "<tr><td colspan=5 style=text-align:center;color:#94a3b8;padding:24px>\u4ECA\u65E5\u7121\u6D3E\u5DE5\u8A18\u9304</td></tr>";
    var tbl = "<div class=card><div class=section-hd style=padding:14px_18px_0><span class=section-title>\u4ECA\u65E5\u6D3E\u5DE5</span><button class=btn-sm data-nav=dispatch>\u67E5\u770B\u5168\u90E8 \u2192</button></div><div class=table-wrap><table><thead><tr><th>\u5BA2\u6236</th><th>\u5730\u5340</th><th>\u985E\u5225</th><th>\u5DE5\u7A0B\u5E2B</th><th>\u72C0\u614B</th></tr></thead><tbody>" + dr + "</tbody></table></div></div>";
    var todos = CASES.filter(function(c) {
      return caseDue(c) > 0 || c.status !== "\u7D50\u6848";
    }).slice(0, 4).map(function(c) {
      return { dot: (STATUS_MAP[c.status] || {}).color || "#64748b", txt: c.client + " \u2014 " + c.status, sub: c.amount == null ? "\u7E3D\u91D1\u984D\u672A\u5B9A" : caseDue(c) > 0 ? "\u5F85\u6536\u6B3E " + fmt(caseDue(c)) : "\u76EE\u524D\u7121\u5F85\u6536\u6B3E" };
    });
    var todoHtml = todos.map(function(t) {
      return "<div class=todo-item><div class=todo-dot style=background:" + t.dot + "></div><div><div class=todo-txt>" + esc(t.txt) + "</div><div class=todo-sub>" + esc(t.sub) + "</div></div></div>";
    }).join("");
    var todoCard = "<div class=card><div class=section-hd style=padding:14px_18px_0><span class=section-title>\u5F85\u8FA6\u63D0\u9192</span></div>" + todoHtml + "</div>";
    var recent = CASES.filter(function(c) {
      return c.status !== "\u7D50\u6848";
    }).slice(0, 5);
    var ri = recent.map(function(c) {
      return "<div class=case-card data-case=" + esc(c.id) + "><div class=case-info><div class=case-name>" + esc(c.client) + "</div><div class=case-sub>" + renderCaseTags(c) + "</div>" + sbar(c.statusIdx) + "</div><div class=case-right><div>" + badge(c.status) + "</div><div class=case-amt style=margin-top:4px>" + (c.amount != null ? "NT$" + (c.amount / 1e4).toFixed(0) + "\u842C" : "\u2014") + "</div></div></div>";
    }).join("");
    var caseCard = "<div class=card><div class=section-hd style=padding:14px_18px_0><span class=section-title>\u6848\u4EF6\u9032\u5EA6</span><button class=btn-sm data-nav=cases>\u67E5\u770B\u5168\u90E8 \u2192</button></div><div class=case-list style=margin-top:8px>" + ri + "</div></div>";
    document.getElementById("content").innerHTML = stats + "<div class=dash-grid>" + tbl + todoCard + "</div>" + caseCard;
  }
  function renderCases() {
    var fl = ["all", "\u6D3D\u8AC7", "\u5831\u50F9", "\u7C3D\u7D04", "\u6536\u8A02\u91D1", "\u65BD\u5DE5", "\u9A57\u6536", "\u6536\u5C3E\u6B3E", "\u7D50\u6848"];
    var tabs = fl.map(function(f) {
      var cnt = f === "all" ? CASES.length : CASES.filter(function(c) {
        return c.status === f;
      }).length;
      var lbl = f === "all" ? "\u5168\u90E8 (" + cnt + ")" : f + (cnt ? " (" + cnt + ")" : "");
      return "<div class='filter-tab" + (FILTER === f ? " active" : "") + "' data-filter=" + f + ">" + lbl + "</div>";
    }).join("");
    var filtered = FILTER === "all" ? CASES : CASES.filter(function(c) {
      return c.status === FILTER;
    });
    var items = filtered.map(function(c) {
      return "<div class='case-card" + (SEL === c.id ? " selected" : "") + "' data-case=" + esc(c.id) + "><div class=case-num>" + esc(c.id) + "</div><div class=case-info><div class=case-name>" + esc(c.client) + "</div><div class=case-sub>" + renderCaseTags(c) + " \xB7 " + esc(c.contact) + "</div>" + sbar(c.statusIdx) + "</div><div class=case-right><div>" + badge(c.status) + "</div><div class=case-amt style=margin-top:5px>" + fmt(c.amount) + "</div><div class=case-date>" + fmtD(c.start) + "</div></div></div>";
    }).join("");
    if (!items) items = "<div style=padding:40px;text-align:center;color:#94a3b8>\u6B64\u72C0\u614B\u7121\u6848\u4EF6</div>";
    var detail = SEL ? renderDetail(CASES.find(function(c) {
      return c.id === SEL;
    })) : "";
    document.getElementById("content").innerHTML = "<div class=section-hd style=margin-bottom:12px><span class=section-title>\u696D\u52D9\u6848\u4EF6</span><button class=btn-primary data-case-new>\uFF0B \u65B0\u589E\u6848\u4EF6</button></div><div class=filter-tabs>" + tabs + "</div><div class=card style=overflow:visible><div class=case-list>" + items + "</div></div>" + detail;
    if (SEL) {
      var el = document.querySelector(".detail-panel");
      if (el) setTimeout(function() {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }
  function renderDetail(c) {
    if (!c) return "";
    var tl = STAGES.map(function(s, i) {
      var dc = i < c.statusIdx ? "done" : i === c.statusIdx ? "current" : "";
      var ln = i < 7 ? "<div class='stage-line" + (i < c.statusIdx ? " done" : "") + "'></div>" : "";
      return "<div class=stage-step><div class=stage-step-line><div class='stage-circle " + dc + "'>" + (i < c.statusIdx ? "\u2713" : i + 1) + "</div>" + ln + "</div><div class='stage-lbl " + dc + "'>" + s + "</div></div>";
    }).join("");
    return "<div class=detail-panel><div class=detail-header><div><div class=detail-title>" + esc(c.client) + "</div><div class=detail-id>" + esc(c.id) + " \xB7 " + renderCaseTags(c) + "</div></div><div style=display:flex;gap:8px;align-items:center>" + badge(c.status) + "<button class=btn-sm data-case-edit=" + esc(c.id) + ">\u7DE8\u8F2F\u6848\u4EF6</button><button class=close-btn data-close-detail=1>\u2715</button></div></div><div class=stage-timeline>" + tl + "</div><div class=detail-grid><div class=info-item><label>\u806F\u7D61\u4EBA</label><span>" + esc(c.contact) + "</span></div><div class=info-item><label>\u96FB\u8A71</label><span>" + esc(c.phone) + "</span></div><div class=info-item><label>\u5730\u5740</label><span>" + esc(c.address) + "</span></div><div class=info-item><label>\u65BD\u5DE5\u671F\u9593</label><span>" + fmtD(c.start) + " \u2014 " + fmtD(c.end) + "</span></div></div><div class=payment-row><div class='pay-box " + (c.depositPaid ? "paid" : "pending") + "'><div class=pay-label>\u8A02\u91D1</div><div class=pay-amount>" + fmt(c.deposit) + "</div><div class=pay-status style=color:" + (c.depositPaid ? "#10b981" : "#d97706") + ">" + (c.depositPaid ? "\u2713 \u5DF2\u5165\u5E33" : "\u23F3 \u5F85\u5165\u5E33") + "</div></div><div class='pay-box " + (c.balancePaid ? "paid" : "pending") + "'><div class=pay-label>\u5C3E\u6B3E</div><div class=pay-amount>" + fmt(c.balance) + "</div><div class=pay-status style=color:" + (c.balancePaid ? "#10b981" : "#d97706") + ">" + (c.balancePaid ? "\u2713 \u5DF2\u5165\u5E33" : "\u23F3 \u5F85\u5165\u5E33") + "</div></div><div class=pay-box><div class=pay-label>\u5408\u7D04\u7E3D\u984D</div><div class=pay-amount>" + fmt(c.amount) + "</div><div class=pay-status style=color:#64748b>\u542B\u5DE5\u6599\u5168\u984D</div></div></div><div class=note-box style=margin-bottom:14px>\u5DF2\u6536\u6B3E\uFF1A" + fmt(c.amount == null ? null : caseReceived(c)) + "\u3000\u5F85\u6536\u6B3E\uFF1A" + fmt(c.amount == null ? null : caseDue(c)) + (c.status === "\u7D50\u6848" && caseDue(c) > 0 ? "\u3000\uFF08\u6848\u4EF6\u5DF2\u7D50\u6848\uFF0C\u4ECD\u6709\u6B3E\u9805\u5F85\u6536\uFF09" : "") + "</div><div class=pay-label style=margin-bottom:6px>\u5099\u6CE8</div><div class=note-box>" + esc(c.note) + "</div></div>";
  }
  function ph(icon, name, desc) {
    document.getElementById("content").innerHTML = "<div class=placeholder><div class=placeholder-icon>" + icon + "</div><h3>" + name + " \u2014 \u5EFA\u7F6E\u4E2D</h3><p>" + desc + "</p></div>";
  }
  function render() {
    if (PAGE === "dashboard") renderDashboard();
    else if (PAGE === "cases") renderCases();
    else if (PAGE === "dispatch") renderDispatch();
    else if (PAGE === "calendar") renderSchedule();
    else if (PAGE === "line") renderLine();
    else if (PAGE === "settings") ph("\u2699\uFE0F", "\u7BA1\u7406\u8CC7\u6599", "\u5DE5\u7A0B\u5E2B\u8207\u5BA2\u6236\u8CC7\u6599\u7DAD\u8B77\u4ECB\u9762\u5C1A\u672A\u5EFA\u7F6E\uFF1B\u76EE\u524D\u63A1\u7528\u793A\u7BC4\u5C0D\u61C9\u8868\u3002");
  }
  var P2KEY = "leyan-dispatch-demo-v2", JOBS = [], DSEL = null, SEARCH = "", RF = "\u5168\u90E8", SF = "\u5168\u90E8", CALREG = "\u5168\u90E8";
  var ENGINEERS = { "\u96D9\u5317|\u5F31\u96FB\u7DAD\u8B77": "\u6731\u79B9\u52F3", "\u96D9\u5317|\u786C\u9AD4\u7DAD\u8B77": "\u8D99\u842C\u5EAD", "\u6843\u7AF9|\u5F31\u96FB\u7DAD\u8B77": "\u8521\u93AE\u5B87", "\u6843\u7AF9|\u786C\u9AD4\u7DAD\u8B77": "\u9EC3\u667A\u7FA4" };
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
    JOBS.forEach(function(j) {
      var name = ENGINEERS[j.region + "|" + j.category];
      if (name) j.engineer = name;
      delete j.contact;
      delete j.phone;
      delete j.address;
    });
    persist();
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
    }).join("") + '</div><div class="p2-note">\u793A\u7BC4\u898F\u5247\uFF1A\u5831\u4FEE\u8D77\u7B97 72 \u5C0F\u6642\u5167\u5B8C\u6210\u3001\u9031\u516D\u4E0D\u6392\u5DE5\u3001\u53EA\u4F7F\u7528\u81EA\u6709\u5DE5\u7A0B\u5E2B\u3002\u9031\u65E5\u66AB\u5141\u8A31\uFF08\u5F85\u78BA\u8A8D\uFF09\u3002\u5DE5\u4F5C\u6642\u6BB5\u66AB\u8A2D 09:00\u201318:00\uFF1B\u4EA4\u901A\u7DE9\u885D\u9810\u8A2D 30 \u5206\u9418\u3002\u7A7A\u6A94\u50C5\u4F9D\u76EE\u524D\u5E33\u865F\u5DE5\u55AE\u8A08\u7B97\uFF0C\u672A\u8B80\u53D6 Google \u884C\u4E8B\u66C6\u3002</div><div class="p2-filters"><input aria-label="\u641C\u5C0B\u5DE5\u55AE" id="p2-search" placeholder="\u641C\u5C0B\u5BA2\u6236\u3001\u5DE5\u55AE\u6216\u554F\u984C" value="' + esc(SEARCH) + '"><select id="p2-region" aria-label="\u5730\u5340">' + opts(["\u5168\u90E8", "\u96D9\u5317", "\u6843\u7AF9"], RF) + '</select><select id="p2-status" aria-label="\u5DE5\u55AE\u72C0\u614B">' + opts(["\u5168\u90E8", "\u5F85\u6D3E\u5DE5", "\u5DF2\u6D3E\u5DE5", "\u9032\u884C\u4E2D", "\u5F85\u6599", "\u5F85\u518D\u8A2A", "\u5DF2\u5B8C\u6210", "\u5DF2\u53D6\u6D88"], SF) + '</select><button class="p2-btn secondary" data-p2="calendar">\u67E5\u770B\u6392\u7A0B</button></div><div class="card p2-table"><table><thead><tr><th>\u5DE5\u55AE\uFF0F\u5BA2\u6236</th><th>\u5340\u57DF\uFF0F\u985E\u5225</th><th>\u5DE5\u7A0B\u5E2B</th><th>\u9810\u5B9A\u5230\u5834</th><th>\u72C0\u614B</th></tr></thead><tbody>' + shown.map(function(j) {
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
    return '<section class="card p2-panel" id="p2-detail"><div class="p2-head"><h3>' + esc(j.id) + " \xB7 " + esc(j.client) + '</h3><button data-p2="close">\u95DC\u9589\u8A73\u60C5 \u2715</button></div><p>' + esc(j.note) + '</p><p style="margin-top:12px">\u5831\u4FEE\uFF1A' + stamp(j.received) + "\u3000\u671F\u9650\uFF1A" + stamp(new Date(new Date(j.received).getTime() + 72 * 36e5)) + '</p><p class="p2-sub">\u5DE5\u6642 ' + j.hours + " \u5C0F\u6642\uFF0F\u4EA4\u901A\u7DE9\u885D " + j.buffer + " \u5206\u9418\uFF5C" + esc(j.engineer) + '</p><div class="p2-actions">' + (!terminal ? '<button class="p2-btn" data-action="slots">' + (j.start ? "\u91CD\u65B0\u6392\u7A0B" : "\u67E5\u8A62\u7A7A\u6A94\uFF0F\u6D3E\u5DE5") + "</button>" : "") + (j.status === "\u5DF2\u6D3E\u5DE5" && j.start && !j.departedAt ? '<button class="p2-btn" data-action="depart">\u5DE5\u7A0B\u5E2B\u51FA\u767C</button>' : "") + (j.status === "\u5DF2\u6D3E\u5DE5" ? '<button class="p2-btn secondary" data-action="start">\u958B\u59CB\u8655\u7406</button>' : "") + (j.status === "\u9032\u884C\u4E2D" ? '<button class="p2-btn secondary" data-action="wait">\u6A19\u8A18\u5F85\u6599</button><button class="p2-btn" data-action="complete">\u78BA\u8A8D\u5B8C\u6210</button>' : "") + (["\u9032\u884C\u4E2D", "\u5F85\u6599"].includes(j.status) ? '<button class="p2-btn secondary" data-action="revisit">\u5EFA\u7ACB\u518D\u8A2A\u55AE</button>' : "") + (!terminal ? '<button class="p2-btn secondary" data-action="cancel">\u53D6\u6D88\u5DE5\u55AE</button>' : "") + (j.start && j.status !== "\u5DF2\u53D6\u6D88" ? '<button class="p2-btn secondary" data-job-calendar="' + esc(j.id) + '">\u5728\u6708\u66C6\u67E5\u770B</button>' : "") + '</div><div id="p2-slotbox"></div><h4 style="margin-top:20px">\u8655\u7406\u7D00\u9304</h4>' + (j.history || []).map(function(h) {
      return '<div class="p2-history">' + stamp(h.at) + "\u3000" + esc(h.text) + "</div>";
    }).join("") + '<p class="p2-sub">\u78BA\u8A8D\u3001\u6539\u671F\u3001\u53D6\u6D88\u3001\u51FA\u767C\u8207\u5B8C\u5DE5\u5728\u96F2\u7AEF\u5132\u5B58\u6210\u529F\u5F8C\uFF0C\u6703\u4EE5 LINE \u901A\u77E5\u5DF2\u7D81\u5B9A\u7684\u5DE5\u7A0B\u5E2B\uFF0F\u5BA2\u6236\uFF1B\u901A\u77E5\u5931\u6557\u4E0D\u5F71\u97FF\u5DE5\u55AE\u3002</p></section>';
  }
  function slots(j) {
    var received = new Date(j.received), deadline = new Date(received.getTime() + 72 * 36e5), now = /* @__PURE__ */ new Date();
    var result = [];
    for (var day = 0; day < 5; day++) {
      var base = new Date(now);
      base.setDate(base.getDate() + day);
      if (base.getDay() === 6) continue;
      for (var hour = 9; hour <= 17; hour++) {
        var a = new Date(base);
        a.setHours(hour, 0, 0, 0);
        var end = new Date(a.getTime() + j.hours * 36e5);
        if (a < now || a < received || end > deadline || end.getHours() > 18 || end.getHours() === 18 && end.getMinutes() > 0) continue;
        var conflict = JOBS.some(function(k) {
          if (k.id === j.id || k.engineer !== j.engineer || !k.start || ["\u5DF2\u53D6\u6D88", "\u5DF2\u5B8C\u6210", "\u5F85\u518D\u8A2A"].includes(k.status)) return false;
          var pad = Math.max(Number(j.buffer), Number(k.buffer) || 0) * 6e4;
          return a.getTime() < new Date(k.end).getTime() + pad && end.getTime() + pad > new Date(k.start).getTime();
        });
        if (!conflict) result.push({ start: a.toISOString(), end: end.toISOString() });
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
    }).join("") + '</div><button class="p2-btn" style="margin-top:12px" data-action="assign">\u78BA\u8A8D\u6D3E\u5DE5\uFF08\u8B8A\u66F4\u5F85\u540C\u6B65\uFF09</button>' : '<div class="p2-note" style="margin-top:12px">\u4E09\u65E5\u5167\u6C92\u6709\u7B26\u5408\u689D\u4EF6\u7684\u7A7A\u6A94\u3002\u8ACB\u8207\u5BA2\u6236\u5354\u8ABF\u4E26\u8A18\u9304\uFF0C\u4E0D\u6703\u81EA\u52D5\u8D85\u671F\u6D3E\u5DE5\u3002</div><button class="p2-btn secondary" data-action="coordinate">\u8A18\u9304\u5354\u8ABF\u7D50\u679C</button>';
  }
  var CUSTOMER_SEEDS = DISPATCH.map(function(j) {
    return { client: j.client, region: j.region };
  });
  function normClient(t) {
    return String(t || "").toLowerCase().replace(/\s+/g, "").replace(/臺/g, "\u53F0");
  }
  function regionFromText(t) {
    var n = normClient(t), north = /台北|新北|雙北|板橋|三重|汐止|信義|大安|松山|士林|北投|中和|永和|新莊|土城|淡水|蘆洲/.test(n), south = /桃園|新竹|桃竹|中壢|竹北|八德|龜山|蘆竹|竹東|平鎮|楊梅|湖口|新豐/.test(n);
    return north === south ? "" : north ? "\u96D9\u5317" : "\u6843\u7AF9";
  }
  function inferDispatch(client, problem, parent) {
    var found = CUSTOMER_SEEDS.concat(CASES, JOBS).filter(function(j) {
      return normClient(j.client) === normClient(client);
    });
    var regions = Array.from(new Set(found.map(function(j) {
      return j.region || regionFromText(j.client);
    }).filter(Boolean)));
    var region = "", why = "";
    if (regions.length === 1) {
      region = regions[0];
      why = "\u7B26\u5408\u73FE\u6709\u5BA2\u6236\u7D00\u9304";
    } else if (regions.length > 1) {
      why = "\u540C\u540D\u5BA2\u6236\u6709\u591A\u500B\u5730\u5340\uFF0C\u8ACB\u78BA\u8A8D\u5206\u5E97";
    } else {
      region = regionFromText(client);
      why = region ? "\u4F9D\u5BA2\u6236\u540D\u7A31\u4E2D\u7684\u5730\u540D\u5224\u5B9A" : "\u5BA2\u6236\u7D00\u9304\u8207\u540D\u7A31\u672A\u63D0\u4F9B\u660E\u78BA\u5730\u5340";
    }
    var weak = problem.match(/弱電|監視|攝影機|攝像|網路|網絡|網線|交換器|路由器|wifi|wi-fi|廣播|門禁|電話|音響|對講|讀卡|刷卡|伺服器|網際網路/gi) || [], hard = problem.match(/硬體|冷氣|空調|電梯|消防|水電|漏水|水管|馬桶|照明|燈具|燈泡|插座|配電|電源|鐵門|捲門|天花板|牆面|門鎖|排水|電箱/gi) || [];
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
      dialog.innerHTML = "<h2>" + (parent ? "\u5EFA\u7ACB\u518D\u8A2A\u55AE" : "\u65B0\u589E\u6D3E\u5DE5") + "</h2>" + (prefill && prefill.source ? '<div class="p2-note" style="margin-top:12px">\u4F86\u6E90\uFF1A' + esc(prefill.source) + "\u3002\u8ACB\u78BA\u8A8D\u6216\u586B\u5165\u5BA2\u6236\u540D\u7A31\uFF1B\u5EFA\u7ACB\u5F8C\u6B64 LINE \u5E33\u865F\u6703\u7D81\u5B9A\u5230\u8A72\u5BA2\u6236\u3002</div>" : "") + '<p class="p2-sub" style="margin:10px 0 20px">\u53EA\u9700\u586B\u5BEB\u5BA2\u6236\u8207\u554F\u984C\uFF0C\u7CFB\u7D71\u6703\u5EFA\u8B70\u5730\u5340\u3001\u985E\u5225\u3001\u5DE5\u7A0B\u5E2B\u8207\u53EF\u7528\u6642\u6BB5\u3002\u78BA\u8A8D\u524D\u4E0D\u6703\u5EFA\u7ACB\u6D3E\u5DE5\u3002</p><form id="auto-input"><div class="p2-form"><label class="p2-wide">\u5BA2\u6236 *<input name="client" required maxlength="80" list="auto-customers" autocomplete="off" placeholder="\u4F8B\u5982\uFF1A\u53F0\u5317\u4FE1\u7FA9\u7259\u91AB\u8A3A\u6240" value="' + esc(client || "") + '"><datalist id="auto-customers">' + Array.from(new Set(CUSTOMER_SEEDS.concat(CASES, JOBS).map(function(j) {
        return j.client;
      }))).map(function(c) {
        return '<option value="' + esc(c) + '"></option>';
      }).join("") + '</datalist></label><label class="p2-wide">\u554F\u984C *<textarea name="note" required rows="4" maxlength="1000" placeholder="\u4F8B\u5982\uFF1A\u76E3\u8996\u5668\u6C92\u6709\u756B\u9762">' + esc(note || "") + '</textarea></label></div><div class="p2-actions"><button class="p2-btn" type="submit">\u81EA\u52D5\u5224\u5B9A\u8207\u5B89\u6392 \u2192</button><button class="p2-btn secondary" type="button" data-p2="dialog-close">\u53D6\u6D88</button></div><p class="p2-sub" style="margin-top:15px">\u76EE\u524D\u4F9D\u793A\u7BC4\u5BA2\u6236\u7D00\u9304\u8207\u554F\u984C\u95DC\u9375\u5B57\u5224\u5B9A\uFF1B\u4E0D\u78BA\u5B9A\u6642\u7531\u4F60\u78BA\u8A8D\uFF0C\u4E0D\u6703\u81EA\u52D5\u731C\u6E2C\u3002\u8ACB\u52FF\u586B\u5165\u771F\u5BE6\u500B\u8CC7\u3002</p></form>';
      dialog.querySelector("form").onsubmit = function(e) {
        e.preventDefault();
        var f = e.target, client2 = f.elements.client.value.trim(), note2 = f.elements.note.value.trim();
        if (!client2 || !note2) {
          notify("\u8ACB\u586B\u5BEB\u5BA2\u6236\u8207\u554F\u984C\u3002");
          return;
        }
        var inference = inferDispatch(client2, note2, parent);
        draft = { id: "DRAFT", client: client2, note: note2, region: inference.region, category: inference.category, received: (/* @__PURE__ */ new Date()).toISOString(), hours: parent ? parent.hours : 2, buffer: parent ? parent.buffer : 30, start: null, end: null };
        review(inference);
      };
    }
    function review(inference) {
      dialog.innerHTML = '<h2>\u78BA\u8A8D\u6D3E\u5DE5\u5EFA\u8B70</h2><p class="p2-sub" style="margin:10px 0 18px">\u78BA\u8A8D\u5F8C\u624D\u6703\u5EFA\u7ACB\u5DE5\u55AE\uFF0C\u4E26\u653E\u5230\u884C\u4E8B\u66C6\u3002</p><div class="p2-note"><b>' + esc(draft.client) + "</b><br>" + esc(draft.note) + '</div><form id="auto-review"><div class="p2-form"><label>\u5730\u5340' + (!draft.region ? " \xB7 \u9700\u4F60\u78BA\u8A8D" : " \xB7 \u5DF2\u5224\u5B9A") + '<select name="region" id="auto-region" required><option value="">\u8ACB\u78BA\u8A8D\u5730\u5340</option>' + opts(["\u96D9\u5317", "\u6843\u7AF9"], draft.region) + '</select><span class="p2-sub">' + esc(inference.regionReason) + "</span></label><label>\u985E\u5225" + (!draft.category ? " \xB7 \u9700\u4F60\u78BA\u8A8D" : " \xB7 \u5DF2\u5224\u5B9A") + '<select name="category" id="auto-category" required><option value="">\u8ACB\u78BA\u8A8D\u985E\u5225</option>' + opts(["\u5F31\u96FB\u7DAD\u8B77", "\u786C\u9AD4\u7DAD\u8B77"], draft.category) + '</select><span class="p2-sub">' + esc(inference.categoryReason) + '</span></label></div><div id="auto-proposal" style="margin-top:16px"></div><div class="p2-actions"><button id="auto-confirm" class="p2-btn" type="submit">\u78BA\u8A8D\u6D3E\u5DE5\u4E26\u52A0\u5165\u6708\u66C6</button><button type="button" class="p2-btn secondary" id="auto-back">\u8FD4\u56DE\u4FEE\u6539</button><button class="p2-btn secondary" type="button" data-p2="dialog-close">\u53D6\u6D88</button></div><p class="p2-sub" style="margin-top:14px">\u6CBF\u7528\u898F\u5247\uFF1A72 \u5C0F\u6642\u5167\u3001\u9031\u516D\u4E0D\u6392\u3002\u9810\u4F30\u5DE5\u6642 ' + draft.hours + " \u5C0F\u6642\uFF0C\u4EA4\u901A\u7DE9\u885D " + draft.buffer + " \u5206\u9418\uFF1B\u50C5\u6AA2\u67E5\u672C\u9801\u5DF2\u5B89\u6392\u5DE5\u55AE\uFF0C\u4E0D\u8B80\u5BEB Google \u884C\u4E8B\u66C6\uFF1B\u78BA\u8A8D\u5F8C\u4EE5 LINE \u901A\u77E5\u5DF2\u7D81\u5B9A\u7684\u5DE5\u7A0B\u5E2B\u8207\u5BA2\u6236\u3002</p></form>";
      var f = dialog.querySelector("form");
      f.elements.region.value = draft.region;
      f.elements.category.value = draft.category;
      function update() {
        draft.region = f.elements.region.value;
        draft.category = f.elements.category.value;
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
        draft.engineer = ENGINEERS[draft.region + "|" + draft.category];
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
        }), j = { id: "D" + Date.now().toString(36).toUpperCase(), client: draft.client, note: draft.note, region: draft.region, category: draft.category, engineer: draft.engineer, received: draft.received, hours: draft.hours, buffer: draft.buffer, start: slot ? slot.start : null, end: slot ? slot.end : null, date: slot ? localDate(new Date(slot.start)) : "", status: slot ? "\u5DF2\u6D3E\u5DE5" : "\u5F85\u6D3E\u5DE5", urgent: false, history: [] };
        if (parent) {
          j.parent = parent.id;
          parent.status = "\u5F85\u518D\u8A2A";
          history(parent, "\u5EFA\u7ACB\u518D\u8A2A\u55AE " + j.id);
        }
        history(j, "\u5BA2\u6236\u8207\u554F\u984C\u81EA\u52D5\u5224\u5B9A\u5F8C\u7531\u4F7F\u7528\u8005\u78BA\u8A8D\uFF1A" + j.region + "\uFF0F" + j.category + "\uFF0F" + j.engineer);
        if (parent) history(j, "\u7531 " + parent.id + " \u5EFA\u7ACB\u518D\u8A2A\u5831\u4FEE");
        if (slot) history(j, "\u78BA\u8A8D\u6D3E\u5DE5 " + stamp(j.start) + "\uFF0C" + j.engineer);
        else history(j, "\u4E09\u65E5\u5167\u7121\u5408\u9069\u7A7A\u6A94\uFF0C\u5F85\u8207\u5BA2\u6236\u5354\u8ABF");
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
        box.innerHTML = '<div class="p2-note">\u8CC7\u6599\u4E0D\u8DB3\uFF0C\u8ACB\u5148\u78BA\u8A8D\u4E0A\u65B9\u5730\u5340\uFF0F\u985E\u5225\uFF0C\u7CFB\u7D71\u624D\u80FD\u5B89\u6392\u5C0D\u61C9\u5DE5\u7A0B\u5E2B\u3002</div>';
        button.disabled = true;
        return;
      }
      draft.engineer = ENGINEERS[draft.region + "|" + draft.category];
      var list = slots(draft);
      box.innerHTML = '<div class="p2-stat"><span>\u5EFA\u8B70\u5DE5\u7A0B\u5E2B</span><b style="font-size:22px;margin-top:5px">' + esc(draft.engineer) + "</b><span>" + esc(draft.region) + "\uFF0F" + esc(draft.category) + "</span></div>" + (list.length ? '<label style="display:block;font-size:12px;font-weight:600;margin-top:16px">\u5EFA\u8B70\u5230\u5834\u6642\u6BB5\uFF08\u9810\u9078\u6700\u65E9\u7A7A\u6A94\uFF09<select id="auto-slot" style="display:block;width:100%;padding:12px;margin-top:7px;border:1px solid #cbd5e1;border-radius:6px;background:white;font:inherit">' + list.map(function(k) {
        return '<option value="' + k.start + '">' + stamp(k.start) + "\u2013" + hm(k.end) + "</option>";
      }).join("") + "</select></label>" : '<div class="p2-note" style="margin-top:14px">\u4E09\u65E5\u5167\u7121\u7B26\u5408\u898F\u5247\u7684\u7A7A\u6A94\uFF0C\u7121\u6CD5\u81EA\u52D5\u5B89\u6392\u3002\u53EF\u78BA\u8A8D\u5EFA\u7ACB\u5F85\u5354\u8ABF\u5DE5\u55AE\uFF0C\u4E0D\u6703\u8D85\u671F\u6392\u5DE5\uFF0C\u4E5F\u4E0D\u6703\u5360\u7528\u6708\u66C6\u3002</div>');
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
    return Object.keys(ENGINEERS).map(function(k) {
      var p = k.split("|");
      return { role: "engineer", ref: ENGINEERS[k], label: p[0] + p[1].replace("\u7DAD\u8B77", "") + " " + ENGINEERS[k] };
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
      newDialog(null, { client: cus ? cus.ref_name : "", note: String(m.text || "").slice(0, 1e3), source: "LINE \u5831\u4FEE\uFF08" + (m.display_name || "LINE \u4F7F\u7528\u8005") + "\uFF09", onCreated: function(j, ev) {
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
    document.getElementById("content").innerHTML = '<div class="p2-head"><div><h2>\u6D3E\u5DE5\u884C\u4E8B\u66C6</h2><p class="p2-sub">\u78BA\u8A8D\u6D3E\u5DE5\u5F8C\u81EA\u52D5\u986F\u793A\uFF0C\u672A\u5B89\u6392\u7684\u65E5\u671F\u7559\u767D\u3002\u9EDE\u65E5\u671F\u770B\u7576\u65E5\u660E\u7D30\uFF0C\u9EDE\u6D3E\u5DE5\u958B\u555F\u5DE5\u55AE\u3002</p></div><button class="p2-btn" data-p2="dispatch">\u5B89\u6392\u6D3E\u5DE5 \u2192</button></div><div class="cal-controls"><h3 class="cal-heading">' + year + " \u5E74 " + (month + 1) + ' \u6708</h3><button data-cal-move="-1" aria-label="\u4E0A\u500B\u6708">\u2039</button><button data-cal-today>\u4ECA\u5929</button><button data-cal-move="1" aria-label="\u4E0B\u500B\u6708">\u203A</button><select id="p2-calreg" aria-label="\u6392\u7A0B\u5730\u5340">' + opts(["\u5168\u90E8", "\u96D9\u5317", "\u6843\u7AF9"], CALREG) + '</select><select id="cal-engineer" aria-label="\u6392\u7A0B\u5DE5\u7A0B\u5E2B">' + opts(["\u5168\u90E8"].concat(Object.values(ENGINEERS)), CALENGINEER) + '</select></div><div class="cal-shell"><div class="cal-week">' + ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"].map(function(d) {
      return "<span>" + d + "</span>";
    }).join("") + '</div><div class="cal-grid">' + cells + '</div></div><div class="cal-legend"><span><i></i>\u96D9\u5317</span><span><i class="peach"></i>\u6843\u7AF9</span><span>\u7070\u8272\uFF1A\u5DF2\u5B8C\u6210</span><span>\u672C\u6708 ' + visibleCount + ' \u4EF6</span><span>\u9031\u516D\u4E0D\u5B89\u6392\u6D3E\u5DE5</span></div><section class="card cal-selected"><h3>' + esc(CALDAY.replace(/-/g, " / ")) + " \xB7 " + selected.length + " \u4EF6\u6D3E\u5DE5</h3>" + (selected.length ? selected.map(function(j) {
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
