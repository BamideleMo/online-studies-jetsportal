import { A } from "@solidjs/router";
import { Show, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import logo from "../assets/logo.png";

import NotLoggedIn from "./menu-items/NotLoggedIn";
import Student from "./menu-items/Student";
import Admin from "./menu-items/Admin";
import Faculty from "./menu-items/Faculty";

export default function Header() {
  const [showMenu, setShowMenu] = createSignal(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu());
  };

  const logOut = () => {
    localStorage.removeItem("jetsUser");
    navigate("/", { replace: true });
  };
  createEffect(() => {
    const now = new Date();
    if (
      JSON.parse(localStorage.getItem("jetsUser")) &&
      !JSON.parse(localStorage.getItem("jetsUser")).expiry
    ) {
      localStorage.removeItem("jetsUser");
      navigate("/");
    }
    if (
      localStorage.getItem("jetsUser") &&
      now.getTime() > JSON.parse(localStorage.getItem("jetsUser")).expiry
    ) {
      localStorage.removeItem("jetsUser");
      navigate("/");
    }
  });

  return (
    <>
      <Show when={showMenu()}>
        <div class="absolute top-0 bottom-0 left-0 bg-black bg-opacity-90 h-screen w-screen flex">
          <div class="grow">&nbsp;</div>
          <div class="w-80 sm:w-2/3 lg:w-1/3 bg-white">
            <div class="shadow-md py-3">
              <div class="w-11/12 mx-auto flex justify-between">
                <span>&nbsp;</span>
                <svg
                  onClick={() => {
                    toggleMenu();
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  class="w-14 h-14 -mr-3 cursor-pointer hover:text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div>
              <Show when={!localStorage.getItem("jetsUser")}>
                <NotLoggedIn />
              </Show>
              <Show
                when={
                  localStorage.getItem("jetsUser") &&
                  JSON.parse(localStorage.getItem("jetsUser")).role ===
                    "student"
                }
              >
                <Student />
              </Show>
              <Show
                when={
                  localStorage.getItem("jetsUser") &&
                  JSON.parse(localStorage.getItem("jetsUser")).role === "admin"
                }
              >
                <Admin />
              </Show>
              <Show
                when={
                  localStorage.getItem("jetsUser") &&
                  JSON.parse(localStorage.getItem("jetsUser")).role ===
                    "faculty"
                }
              >
                <Faculty />
              </Show>
            </div>
          </div>
        </div>
      </Show>
      <header class="shadow-md py-3">
        <div class="w-11/12 mx-auto flex justify-between">
          <div class="w-16">
            <A href="/">
              <img src={logo} class="max-h-16" />
            </A>
          </div>
          <div class="pt-3 sm:pt-4 text-center text-xs">
            <Show when={localStorage.getItem("jetsUser")}>
              Hello,{" "}
              <b class="uppercase">
                {JSON.parse(localStorage.getItem("jetsUser")).surname}
              </b>
              <br class="" />[{" "}
              <span
                onClick={() => {
                  logOut();
                }}
                class="text-red-600 hover:opacity-60 cursor-pointer"
              >
                Log out
              </span>{" "}
              ]
            </Show>
          </div>
          <div class="w-14 p-1">
            <svg
              onClick={() => {
                toggleMenu();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              class="w-14 h-14 border-r border-black cursor-pointer hover:text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </div>
        </div>
      </header>
    </>
  );
}
