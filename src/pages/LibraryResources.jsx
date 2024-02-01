import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { A, useNavigate } from "@solidjs/router";

import Header from "../components/Header";
import { createSignal, createResource } from "solid-js";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

const navigate = useNavigate();

export default function LibraryResources() {
    const fetchPeriods = async () => {
    
      if (
        localStorage.getItem("jetsUser") &&
        JSON.parse(localStorage.getItem("jetsUser")).role === "admin"
      ) {
        try {
          const res = await fetch(VITE_API_URL + "/api/view-periods", {
            mode: "cors",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jetsUser")).token
              }`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            method: "GET",
          });
          const result = await res.json();
          return result.response;
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate("/", { replace: true });
      }
    };
  const [resources] = createResource(fetchResources);

  return (
    <MetaProvider>
      <Title>Library Resources - ECWA Theological Seminary, Jos (JETS)</Title>
      <Meta
        name="description"
        content="Library Resources on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Header />
        <div class="mt-8 w-11/12 mx-auto space-y-4">
          <h2 class="text-lg font-semibold text-center border-b border-red-600">
            Library Resources
          </h2>
          <div class="bg-yellow-100 rounded-md border border-yellow-200  p-1 space-y-0.5">
            <b class="block">Instruction:</b>
            <p>Below are some resources provided by JETS library. If you have questions or need further help please contact a library staff.</p>
          </div>
          <div class="border border-gray-600 shadow-md rounded p-2 lg:p-4">
            <table
              cellPadding={0}
              cellSpacing={0}
              class="w-full my-4 border border-black"
            >
              <thead class="bg-blue-950 text-white border-b border-black">
                <tr>
                  <td class="p-4 border-r border-black">#.</td>
                  <td class="p-4 border-r border-black">Sem.</td>
                  <td class="p-4 border-r border-black">Session</td>
                  <td class="p-4">View</td>
                </tr>
              </thead>
              <tbody>
                <Show
                  when={resources.loading}
                  fallback={
                    <Show
                      when={resources().length > 0}
                      fallback={
                        <tr>
                          <td colSpan={5} class="p-4 text-center">
                            No record found.
                          </td>
                        </tr>
                      }
                    >
                      <For each={resources()}>
                        {(period, i) => (
                          <tr class="even:bg-gray-200 odd:bg-white even:border-y border-black">
                            <td class="p-4 border-r border-black font-semibold">
                              {i() + 1}.
                            </td>
                            <td class="p-4 border-r border-black uppercase">
                              {period.semester}
                            </td>
                            <td class="p-4 border-r border-black">
                              {period.session}
                            </td>
                            <td class="p-4">
                              <A
                                href={
                                  "/admin/registration-log/" + period.period_id
                                }
                                class="green-btn p-3 border border-black text-center hover:opacity-60"
                              >
                                Proceed
                              </A>
                            </td>
                          </tr>
                        )}
                      </For>
                    </Show>
                  }
                >
                  <tr>
                    <td colSpan={5} class="p-1 text-center">
                      Fetching.. .
                    </td>
                  </tr>
                </Show>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MetaProvider>
  );
}
