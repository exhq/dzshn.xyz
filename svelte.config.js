import adapter from "@sveltejs/adapter-static";

export default {
    kit: {
        adapter: adapter(),
        prerender: {
            default: true,
        },
    },
};