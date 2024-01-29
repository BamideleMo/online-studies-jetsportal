import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { A, useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";

import Header from "../components/Header";
import Loading from "../components/Loading";

export default function ProfileFaculty() {
  const VITE_API_URL = import.meta.env["VITE_API_URL"];
  const [loading, setLoading] = createSignal(true);
  const [user, setUser] = createSignal();

  createEffect(async () => {
    const navigate = useNavigate();
    if (localStorage.getItem("jetsUser")) {
      fetch(
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
      )
        .then((response) => {
          return response.json();
        })
        .then((data1) => {
          if (data1.response === "Expired token") {
            localStorage.removeItem("jetsUser");
            navigate("/", { replace: true });
          }
          setUser(data1.response);
        })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/", { replace: true });
    }
  });

  const getOptPassport = (val) => {
    if (val) {
      var pass1 = val.substring(0, 49);
      var pass2 = val.substring(48);
      var passport = pass1 + "c_scale,w_500/f_auto" + pass2;
      return passport;
    } else {
      return "wait";
    }
  };

  return (
    <MetaProvider>
      <Title>Faculty Profile - ECWA Theological Seminary, Jos (JETS)</Title>
      <Meta
        name="description"
        content="Faculty Profile on ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="text-sm">
        <Header />
        <Show when={!loading()} fallback={<Loading />}>
          <div class="mt-8 mb-20 w-11/12 mx-auto space-y-4">
            <h2 class="text-lg font-semibold text-center border-b border-red-600">
              Faculty Profile
            </h2>
            <div class="bg-yellow-100 rounded-md border border-yellow-200  p-1 space-y-0.5">
              <b class="block">Instruction:</b>
              <p>Below is your profile as seen by students.</p>
            </div>
            <div class="border border-gray-600 shadow-md rounded p-1 lg:p-4">
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                <div class="col-span-2 sm:col-span-1 sm:row-span-3 text-center space-y-2">
                  <div class="block mx-auto max-w-36 max-h-36 overflow-hidden rounded">
                    <img
                      src={getOptPassport(user().passport_url)}
                      class="mx-auto w-full"
                    />
                  </div>
                  <div>
                    [
                    <A href="#" class="text-sm text-red-600">
                      Change Passport
                    </A>
                    ]
                  </div>
                </div>
                <div>
                  <b>Phone Number:</b>
                  <br />
                  {user().phone_number}
                </div>
                <div>
                  <b>Surname:</b>
                  <br />
                  <span class="uppercase">{user().surname}</span>
                </div>
                <div>
                  <b>First name:</b>
                  <br />
                  {user().first_name}
                </div>
                <div>
                  <b>Other names:</b>
                  <br />
                  {user().other_names}
                </div>
                <div>
                  <b>Gender:</b>
                  <br />
                  {user().gender}
                </div>
                <div>
                  <b>Email:</b>
                  <br />
                  {student().email.toLowerCase()}
                </div>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </MetaProvider>
  );
}
