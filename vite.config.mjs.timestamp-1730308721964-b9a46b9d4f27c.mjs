// vite.config.mjs
import { defineConfig } from "file:///Users/bamidele/Desktop/Projects/solidjs/os-jets/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///Users/bamidele/Desktop/Projects/solidjs/os-jets/node_modules/vite-plugin-solid/dist/esm/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin()
  ],
  server: {
    port: 3e3
  },
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2JhbWlkZWxlL0Rlc2t0b3AvUHJvamVjdHMvc29saWRqcy9vcy1qZXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYmFtaWRlbGUvRGVza3RvcC9Qcm9qZWN0cy9zb2xpZGpzL29zLWpldHMvdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9iYW1pZGVsZS9EZXNrdG9wL1Byb2plY3RzL3NvbGlkanMvb3MtamV0cy92aXRlLmNvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCc7XG4vLyBpbXBvcnQgZGV2dG9vbHMgZnJvbSAnc29saWQtZGV2dG9vbHMvdml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICAvKiBcbiAgICBVbmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIGVuYWJsZSBzb2xpZC1kZXZ0b29scy5cbiAgICBGb3IgbW9yZSBpbmZvIHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhldGFybmF2L3NvbGlkLWRldnRvb2xzL3RyZWUvbWFpbi9wYWNrYWdlcy9leHRlbnNpb24jcmVhZG1lXG4gICAgKi9cbiAgICAvLyBkZXZ0b29scygpLFxuICAgIHNvbGlkUGx1Z2luKCksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVSxTQUFTLG9CQUFvQjtBQUNqVyxPQUFPLGlCQUFpQjtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTVAsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
