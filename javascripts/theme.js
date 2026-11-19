(() => {
  const searchRoot = document.querySelector("[data-search]");
  const searchInput = document.getElementById("mkdocs-search-query");
  const openSearch = () => {
    if (!searchRoot) return;
    searchRoot.hidden = false;
    searchInput?.focus();
  };
  const closeSearch = () => {
    if (!searchRoot) return;
    searchRoot.hidden = true;
  };

  document.querySelectorAll("[data-search-open]").forEach((button) => {
    button.addEventListener("click", openSearch);
  });
  searchRoot?.addEventListener("click", (event) => {
    if (event.target === searchRoot) closeSearch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSearch();
    if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const tag = event.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      event.preventDefault();
      openSearch();
    }
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(value);
        const previous = button.textContent;
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = previous;
        }, 1200);
      } catch {
        const previous = button.textContent;
        button.textContent = "Copy failed";
        setTimeout(() => {
          button.textContent = previous;
        }, 1200);
      }
    });
  });

  document.querySelectorAll(".prose pre").forEach((pre) => {
    if (pre.querySelector(".copy-code")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      const text = pre.innerText.replace(/\nCopy$/, "\n").trimEnd();
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
        button.dataset.copied = "true";
        setTimeout(() => {
          button.textContent = "Copy";
          delete button.dataset.copied;
        }, 1200);
      } catch {
        const previous = button.textContent;
        button.textContent = "Copy failed";
        setTimeout(() => {
          button.textContent = previous;
        }, 1200);
      }
    });
    pre.appendChild(button);
  });

  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll(":scope [role='tab']")];
    const panels = [...root.querySelectorAll(":scope [role='tabpanel']")];
    const show = (id, { focus = false } = {}) => {
      tabs.forEach((tab) => {
        const on = tab.getAttribute("data-tab") === id;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
        if (on && focus) tab.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute("data-panel") !== id;
      });
    };
    const selected = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
    if (selected) show(selected.getAttribute("data-tab") || "");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => show(tab.getAttribute("data-tab") || ""));
      tab.addEventListener("keydown", (event) => {
        const next =
          event.key === "ArrowRight" || event.key === "ArrowDown" ? tabs[(index + 1) % tabs.length] :
          event.key === "ArrowLeft" || event.key === "ArrowUp" ? tabs[(index - 1 + tabs.length) % tabs.length] :
          event.key === "Home" ? tabs[0] :
          event.key === "End" ? tabs[tabs.length - 1] :
          null;
        if (!next) return;
        event.preventDefault();
        show(next.getAttribute("data-tab") || "", { focus: true });
      });
    });
  });

  const toggle = document.querySelector("[data-nav-toggle]");
  const navBody = document.querySelector("[data-nav-body]");
  toggle?.addEventListener("click", () => {
    const open = navBody?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  const links = [...document.querySelectorAll(".home-toc a[href^='#'], .doc-toc a[href^='#']")];
  if (links.length) {
    const targets = links
      .map((link) => {
        const id = decodeURIComponent(link.hash.slice(1));
        return id ? document.getElementById(id) : null;
      })
      .filter(Boolean);
    const bar = document.querySelector(".bar");
    const homeToc = document.querySelector(".home-toc");
    const apply = (current) => {
      links.forEach((link) => {
        const on = Boolean(current) && decodeURIComponent(link.hash.slice(1)) === current.id;
        link.classList.toggle("is-current", on);
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };
    const mark = () => {
      const probe = ((homeToc || bar)?.getBoundingClientRect().bottom || 96) + 120;
      let current = null;
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= probe) current = target;
      }
      const hashed = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (hashed && targets.includes(hashed)) {
        const top = hashed.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.55 && top > probe - 220) current = hashed;
      }
      apply(current);
    };
    links.forEach((link) => {
      link.addEventListener("click", () => {
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (target) apply(target);
      });
    });
    document.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("hashchange", mark);
    window.addEventListener("load", mark);
    mark();
  }
})();
