import { jsx, jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
function Router() {
  return /* @__PURE__ */ jsxs(Switch, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", component: Home }),
    /* @__PURE__ */ jsx(Route, { path: "/404", component: NotFound }),
    /* @__PURE__ */ jsx(Route, { component: NotFound })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(
    ThemeProvider,
    {
      defaultTheme: "light",
      children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
        /* @__PURE__ */ jsx(Toaster, {}),
        /* @__PURE__ */ jsx(Router, {})
      ] })
    }
  ) });
}
var App_default = App;
export {
  App_default as default
};
