const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/kelas",
        component: Kelas,
    },
    {
        path: "/kelas/:id",
        component: detailKelas,
    },
    {
        path: "*",
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});
