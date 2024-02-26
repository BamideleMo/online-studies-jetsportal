import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";

import Header from "../components/Header";
import StartCaptureReceiptForm from "../components/StartCaptureReceiptForm";
import StartQueryReceiptForm from "../components/StartQueryReceiptForm";

const schema = z.object({
  ledger_number: z.string().length(11, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

const fetchStats = async () => {
  const navigate = useNavigate();
  if (
    localStorage.getItem("jetsUser") &&
    JSON.parse(localStorage.getItem("jetsUser")).role === "admin"
  ) {
    const response = await fetch(
      VITE_API_URL +
        "/api/user/" +
        JSON.parse(localStorage.getItem("jetsUser")).custom_id,
      {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jetsUser")).token
          }`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const result = await response.json();
    console.log(result.response);
    if (result.response === "Expired token") {
      localStorage.removeItem("jetsUser");
      navigate("/", { replace: true });
    }
  } else {
    navigate("/", { replace: true });
  }
};

export default function CaptureQueryReceipt() {
  const navigate = useNavigate();

  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  createEffect(async () => {
    if (localStorage.getItem("jetsUser")) {
      const response = await fetch(
        VITE_API_URL +
          "/api/user/" +
          JSON.parse(localStorage.getItem("jetsUser")).custom_id,
        {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jetsUser")).token
            }`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.response === "Expired token") {
        localStorage.removeItem("jetsUser");
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  });

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <MetaProvider>
      <Title>
        Capture/Query Receipt - ECWA Theological Seminary, Jos (JETS)
      </Title>
      <Meta
        name="description"
        content="Capture Receipt on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Header />
        <div class="mt-8 w-11/12 mx-auto space-y-4">
          <h2 class="text-lg font-semibold text-center border-b border-red-600">
            Capture/Query Receipt
          </h2>
          <div class="bg-yellow-100 rounded-md border border-yellow-200  p-1 space-y-0.5">
            <b class="block">Instruction:</b>
            <p>
              Capture receipt issued to student so that the money paid can
              reflect on the student's portal wallet. Enter the student's ledger
              number and click on 'Capture'
            </p>
            <p class="border-t border-blue-900">
              To check if a receipt has been captured and for which student,
              query the receipt by entering the receipt number and clicking on
              'Query'.
            </p>
          </div>
          <div class="border border-gray-600 shadow-md rounded p-1 lg:p-4">
            <div class="grid grid-cols-1 sm:grid-cols-2">
              <div class="border-b sm:border-b-0 sm:border-r border-black">
                <table cellPadding={0} cellSpacing={0} class="w-full">
                  <thead>
                    <tr class="border-b border-bottom">
                      <th class="p-4 text-left">Capture Receipt:</th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr>
                      <td class="p-4 ">
                        <StartCaptureReceiptForm />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table cellPadding={0} cellSpacing={0} class="w-full">
                  <thead>
                    <tr class="border-b border-bottom">
                      <th class="p-4 text-left">Query Receipt:</th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr>
                      <td class="p-4 ">
                        <StartQueryReceiptForm />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MetaProvider>
  );
}
