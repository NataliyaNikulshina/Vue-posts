import Main from '@/pages/Main.vue';
import PostPage from '@/pages/PostPage.vue';
import About from '@/pages/About.vue';
import OnePostPage from '@/pages/OnePostPage.vue';
import PostPageWithVuex from '@/pages/PostPageWithVuex.vue';
import PostPageComposition from '@/pages/PostPageComposition.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes =[
    {
        path:'/',
        component: Main
    },
    {
        path:'/posts',
        component: PostPage
    },
    {
        path:'/store',
        component: PostPageWithVuex
    },
    {
        path:'/composition',
        component: PostPageComposition
    },
    {
        path:'/about',
        component: About
    },
    {
        path:'/posts/:id',
        component: OnePostPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;