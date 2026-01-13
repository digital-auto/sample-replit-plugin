"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // index.ts
  var ReactDOM = __toESM(__require("react-dom/client"), 1);
  var React2 = __toESM(__require("react"), 1);

  // Page.tsx
  var import_jsx_runtime = __require("react/jsx-runtime");
  var React = globalThis.React;
  var styles = {
    container: {
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "var(--muted, #f5f7fa)",
      padding: "24px",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: "border-box",
      color: "var(--foreground, #1f2937)"
    },
    wrapper: {
      maxWidth: "900px",
      margin: "0 auto"
    },
    header: {
      marginBottom: "24px"
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "var(--primary, #1a1a2e)",
      margin: "0 0 8px 0"
    },
    subtitle: {
      fontSize: "14px",
      color: "var(--muted-foreground, #6b7280)",
      margin: 0
    },
    card: {
      backgroundColor: "var(--background, #ffffff)",
      borderRadius: "var(--radius, 8px)",
      border: "1px solid var(--border, #e5e7eb)",
      padding: "20px",
      marginBottom: "20px"
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "var(--foreground, #374151)",
      margin: "0 0 16px 0",
      paddingBottom: "12px",
      borderBottom: "1px solid var(--border, #e5e7eb)"
    },
    fieldGroup: {
      marginBottom: "16px"
    },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: "600",
      color: "var(--muted-foreground, #6b7280)",
      marginBottom: "4px",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    value: {
      fontSize: "14px",
      color: "var(--foreground, #1f2937)",
      margin: 0
    },
    codeBlock: {
      backgroundColor: "var(--primary, #1e1e2e)",
      color: "var(--primary-foreground, #cdd6f4)",
      padding: "16px",
      borderRadius: "var(--radius, 6px)",
      fontSize: "13px",
      fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
      overflow: "auto",
      maxHeight: "300px",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word"
    },
    customerJourneyBlock: {
      backgroundColor: "var(--muted, #f9fafb)",
      padding: "16px",
      borderRadius: "var(--radius, 6px)",
      fontSize: "14px",
      lineHeight: "1.6",
      color: "var(--foreground, #374151)",
      whiteSpace: "pre-wrap"
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      fontSize: "14px",
      border: "1px solid var(--input, #d1d5db)",
      borderRadius: "var(--radius, 6px)",
      boxSizing: "border-box",
      outline: "none",
      backgroundColor: "var(--background, #ffffff)",
      color: "var(--foreground, #1f2937)"
    },
    button: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      color: "var(--primary-foreground, #ffffff)",
      backgroundColor: "var(--primary, #3b82f6)",
      border: "none",
      borderRadius: "var(--radius, 6px)",
      cursor: "pointer",
      marginTop: "12px"
    },
    buttonDisabled: {
      backgroundColor: "var(--muted-foreground, #9ca3af)",
      cursor: "not-allowed"
    },
    successMessage: {
      backgroundColor: "var(--secondary, #d1fae5)",
      color: "var(--secondary-foreground, #065f46)",
      padding: "12px 16px",
      borderRadius: "var(--radius, 6px)",
      fontSize: "14px",
      marginTop: "12px"
    },
    errorMessage: {
      backgroundColor: "var(--destructive, #fee2e2)",
      color: "var(--primary-foreground, #991b1b)",
      padding: "12px 16px",
      borderRadius: "var(--radius, 6px)",
      fontSize: "14px",
      marginTop: "12px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px"
    },
    badge: {
      display: "inline-block",
      padding: "4px 10px",
      fontSize: "12px",
      fontWeight: "500",
      borderRadius: "20px",
      backgroundColor: "var(--muted, #e0e7ff)",
      color: "var(--primary, #3730a3)"
    },
    apiSection: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-end",
      flexWrap: "wrap"
    }
  };
  function Page({ data, config, api }) {
    const [prototypeName, setPrototypeName] = React.useState("");
    const [isSaving, setIsSaving] = React.useState(false);
    const [message, setMessage] = React.useState(null);
    const prototype = data?.prototype;
    const model = data?.model;
    React.useEffect(() => {
      if (prototype?.name) {
        setPrototypeName(prototype.name);
      }
    }, [prototype?.name]);
    const handleUpdateName = async () => {
      if (!api?.updatePrototype) {
        setMessage({ type: "error", text: "updatePrototype API is not available" });
        return;
      }
      if (!prototypeName.trim()) {
        setMessage({ type: "error", text: "Please enter a valid name" });
        return;
      }
      setIsSaving(true);
      setMessage(null);
      try {
        await api.updatePrototype({ name: prototypeName });
        setMessage({ type: "success", text: "Prototype name updated successfully!" });
      } catch (error) {
        setMessage({ type: "error", text: error?.message || "Failed to update prototype name" });
      } finally {
        setIsSaving(false);
      }
    };
    const formatCustomerJourney = (journey) => {
      if (!journey) return "No customer journey defined";
      return journey.trim();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.container, "data-testid": "plugin-page", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.wrapper, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { style: styles.header, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { style: styles.title, "data-testid": "text-page-title", children: "digital.auto Plugin Demo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: styles.subtitle, children: "Demonstrating how plugins can interact with the digital.auto platform" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: styles.cardTitle, children: "Reading Prototype & Model Data" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { ...styles.value, marginBottom: "16px", color: "var(--muted-foreground, #6b7280)" }, children: "This section demonstrates how plugins can read data from the current prototype and model." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { style: { ...styles.cardTitle, fontSize: "14px", marginTop: "16px", paddingBottom: "8px", borderBottom: "none", marginBottom: "8px" }, children: "Prototype Information" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.grid, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.fieldGroup, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: "Prototype Name" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: styles.value, "data-testid": "text-prototype-name", children: prototype?.name || "N/A" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.fieldGroup, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: "State" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, "data-testid": "text-prototype-state", children: prototype?.state || "N/A" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.fieldGroup, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: "Language" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: styles.value, "data-testid": "text-prototype-language", children: prototype?.language || "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { style: { ...styles.cardTitle, fontSize: "14px", marginTop: "20px", paddingBottom: "8px", borderBottom: "none", marginBottom: "8px" }, children: "Model Information" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.grid, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.fieldGroup, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: "Model Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: styles.value, "data-testid": "text-model-name", children: model?.name || prototype?.model_id?.name || "N/A" })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: styles.cardTitle, children: "Customer Journey" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.customerJourneyBlock, "data-testid": "text-customer-journey", children: formatCustomerJourney(prototype?.customer_journey) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: styles.cardTitle, children: "Prototype Code" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { style: styles.codeBlock, "data-testid": "text-prototype-code", children: prototype?.code || "# No code available" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: styles.cardTitle, children: "Writing Data Back" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { ...styles.value, marginBottom: "16px", color: "var(--muted-foreground, #6b7280)" }, children: "This section demonstrates how plugins can update data back to the platform using the Plugin API." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.apiSection, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, minWidth: "200px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: "New Prototype Name" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "text",
                value: prototypeName,
                onChange: (e) => setPrototypeName(e.target.value),
                placeholder: "Enter new prototype name...",
                style: styles.input,
                "data-testid": "input-prototype-name"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              onClick: handleUpdateName,
              disabled: isSaving || !api?.updatePrototype,
              style: {
                ...styles.button,
                ...isSaving || !api?.updatePrototype ? styles.buttonDisabled : {}
              },
              "data-testid": "button-update-prototype",
              children: isSaving ? "Updating..." : "Update Name"
            }
          )
        ] }),
        !api?.updatePrototype && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { fontSize: "12px", color: "var(--muted-foreground, #9ca3af)", marginTop: "8px" }, children: "Note: updatePrototype API is not available in this context" }),
        message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: message.type === "success" ? styles.successMessage : styles.errorMessage,
            "data-testid": `text-message-${message.type}`,
            children: message.text
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: styles.cardTitle, children: "Available APIs" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { ...styles.value, marginBottom: "12px", color: "var(--muted-foreground, #6b7280)" }, children: "The following API methods are available to this plugin:" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" }, children: [
          api?.updateModel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "updateModel" }),
          api?.updatePrototype && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "updatePrototype" }),
          api?.getComputedAPIs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "getComputedAPIs" }),
          api?.getApiDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "getApiDetail" }),
          api?.listVSSVersions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "listVSSVersions" }),
          api?.getRuntimeApiValues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "getRuntimeApiValues" }),
          api?.setRuntimeApiValues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "setRuntimeApiValues" }),
          api?.createWishlistApi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "createWishlistApi" }),
          !api && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.badge, backgroundColor: "var(--destructive, #fef3c7)", color: "var(--primary-foreground, #92400e)" }, children: "No API provided" })
        ] })
      ] })
    ] }) });
  }

  // index.ts
  var components = { Page };
  function mount(el, props) {
    const root = ReactDOM.createRoot(el);
    root.render(React2.createElement(Page, props || {}));
    el.__aw_root = root;
  }
  function unmount(el) {
    const r = el.__aw_root;
    if (r && r.unmount) r.unmount();
    delete el.__aw_root;
  }
  if (typeof window !== "undefined") {
    window.DAPlugins = window.DAPlugins || {};
    window.DAPlugins["page-plugin"] = { components, mount, unmount };
  }
})();
//# sourceMappingURL=index.js.map
