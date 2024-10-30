import { A } from "@solidjs/router";
import Header from "../components/Header";
import ChevronRight from "../components/icons/ChevronRight";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function Home() {
  const navigate = useNavigate();

  createEffect(() => {
    if (localStorage.getItem("jetsUser")) {
      if (JSON.parse(localStorage.getItem("jetsUser")).role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (
        JSON.parse(localStorage.getItem("jetsUser")).role === "faculty"
      ) {
        navigate("/faculty/profile", { replace: true });
      } else {
        navigate("/student/downloads", { replace: true });
      }
    }
  });

  return (
    <MetaProvider>
      <Title>
        Online Students Portal - ECWA Theological Seminary, Jos (JETS)
      </Title>
      <Meta
        name="description"
        content="Welcome to the Online Students Portal of ECWA Theological Seminary, Jos (JETS)"
      />
      <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 text-sm">
        <div class="h-screen">
          <Header />
          <div class="mt-8 w-11/12 mx-auto space-y-4">
            <h2 class="text-lg font-semibold text-center border-b border-red-600">
              Online Students Portal Access
            </h2>
            <div class="bg-yellow-200 rounded-md border border-yellow-300 p-2 space-y-1">
              <b class="block">Instruction:</b>
              <p>
                This portal is for Online students. For on-campus students
                portal visit: www.portal.jets.edu.ng
              </p>
            </div>
            <div class="pt-8 space-y-4 drop-shadow-lg">
              <A
                href="/student/login"
                class="blue-btn hover:opacity-60 flex justify-between p-4"
              >
                <span>Online Student Access</span>
                <ChevronRight />
              </A>
              <A
                href="/student/create-profile"
                class="blue-btn hover:opacity-60 flex justify-between p-4"
              >
                <span>Create Online Student Profile</span>
                <ChevronRight />
              </A>
              <A
                href="/faculty/login"
                class="blue-btn hover:opacity-60 flex justify-between p-4"
              >
                <span>Facilitators Access</span>
                <ChevronRight />
              </A>
              <A
                href="/admin/login"
                class="blue-btn hover:opacity-60 flex justify-between p-4"
              >
                <span>Admin Access</span>
                <ChevronRight />
              </A>
            </div>
            <div class="w-full bg rounded-lg sm:hidden">
              <div class="h-40">&nbsp;</div>
            </div>
          </div>
        </div>
        <div class="hidden bg sm:block lg:col-span-2 lg:grid lg:grid-cols-3">
          &nbsp;
        </div>
      </div>
    </MetaProvider>
  );
}
