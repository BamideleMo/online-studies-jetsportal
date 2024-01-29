import { A } from "@solidjs/router";
import ChevronRight from "../icons/ChevronRight";

export default function Student() {
  return (
    <ul class="w-11/12 mx-auto mt-2 text-blue-800">
      <li class="border-b border-black py-3">
        <A
          href="/student/profile"
          class="flex justify-between hover:text-black"
        >
          <span>My Profile</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A
          href="/student/portal-wallet"
          class="flex justify-between hover:text-black"
        >
          <span>Portal Wallet</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A
          href="/student/accommodation-wallet"
          class="flex justify-between hover:text-black"
        >
          <span>Accommodation Wallet</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A
          href="/student/semester-registration"
          class="flex justify-between hover:text-black"
        >
          <span>Semester Registration</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A
          href="/student/semester-add-drop"
          class="flex justify-between hover:text-black"
        >
          <span>Semester Add/Drop</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A href="#" class="flex justify-between hover:text-black">
          <span>Request Accommodation</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A
          href="/student/downloads"
          class="flex justify-between hover:text-black"
        >
          <span>Downloads</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A
          href="/student/print-outs"
          class="flex justify-between hover:text-black"
        >
          <span>Print Outs</span>
          <ChevronRight />
        </A>
      </li>
      <li class="border-b border-black py-3">
        <A
          href="/student/change-password"
          class="flex justify-between hover:text-black"
        >
          <span>Change Password</span>
          <ChevronRight />
        </A>
      </li>
    </ul>
  );
}
