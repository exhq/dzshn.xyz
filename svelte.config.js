import adapter from "@sveltejs/adapter-static";
import path from "path";

export default {
    kit: {
        adapter: adapter(),
        prerender: {
            default: true,
        },
        vite: {
            build: {
                rollupOptions: {
                    plugins: [
                        {
                            // 🥰
                            resolveImportMeta(property, { moduleId }) {
                                if (property === "url") {
                                    return `new URL('${path.relative(
                                        process.cwd(),
                                        moduleId
                                    )}', document.baseURI).href`;
                                }
                                return null;
                            },
                        },
                    ],
                },
            },
        },
    },
};
