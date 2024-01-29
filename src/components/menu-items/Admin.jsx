import { A } from "@solidjs/router";
import ChevronRight from "../icons/ChevronRight";
import { Show } from "solid-js";

export default function Admin() {
  return (
    <ul class="w-11/12 mx-auto mt-2 text-blue-800">
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname ===
            "assistant bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname ===
            "registrar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "dean"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/dashboard"
            class="flex justify-between hover:text-black"
          >
            <span>Dashboard</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      {/* <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "assistant bursar"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/all-portal-wallets"
            class="flex justify-between hover:text-black"
          >
            <span>All Portal Wallet Bals.</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "assistant bursar"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/all-accommodation-wallets"
            class="flex justify-between hover:text-black"
          >
            <span>All Accommodation Wallet Bals.</span>
            <ChevronRight />
          </A>
        </li>
      </Show> */}
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "dean"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/awaiting-approval-period"
            class="flex justify-between hover:text-black"
          >
            <span>Awaiting Approval</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname ===
            "assistant bursar"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/capture-query-receipt"
            class="flex justify-between hover:text-black"
          >
            <span>Capture/Query Receipt</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname ===
            "registrar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "dean"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/manage-semester-registration"
            class="flex justify-between hover:text-black"
          >
            <span>Manage Registration Period</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname ===
            "registrar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "dean"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/manage-semester-registration"
            class="flex justify-between hover:text-black"
          >
            <span>Manage Downloads</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/manage-admin-charges"
            class="flex justify-between hover:text-black"
          >
            <span>Manage Admin Charges</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/manage-departmental-charges"
            class="flex justify-between hover:text-black"
          >
            <span>Manage Departmental Charges</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "dean"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/manage-courses"
            class="flex justify-between hover:text-black"
          >
            <span>Manage Courses</span>
            <ChevronRight />
          </A>
        </li>
        <li class="border-b border-black py-3">
          <A
            href="/admin/assign-courses-period"
            class="flex justify-between hover:text-black"
          >
            <span>Assign Courses</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
      <Show
        when={
          JSON.parse(localStorage.getItem("jetsUser")).surname === "ict" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname ===
            "registrar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname ===
            "assistant bursar" ||
          JSON.parse(localStorage.getItem("jetsUser")).surname === "dean"
        }
      >
        <li class="border-b border-black py-3">
          <A
            href="/admin/enrollment-statistics-period"
            class="flex justify-between hover:text-black"
          >
            <span>Enrollment Statistics</span>
            <ChevronRight />
          </A>
        </li>
        <li class="border-b border-black py-3">
          <A
            href="/admin/registration-log-period"
            class="flex justify-between hover:text-black"
          >
            <span>Registration Log</span>
            <ChevronRight />
          </A>
        </li>
        <li class="border-b border-black py-3">
          <A
            href="/admin/add-drop-log-period"
            class="flex justify-between hover:text-black"
          >
            <span>Add/Drop Log</span>
            <ChevronRight />
          </A>
        </li>
        <li class="border-b border-black py-3">
          <A
            href="/admin/change-password"
            class="flex justify-between hover:text-black"
          >
            <span>Change Password</span>
            <ChevronRight />
          </A>
        </li>
      </Show>
    </ul>
  );
}
