import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
import directives from '@/directives';
import router from './router/router';
import Vintersection from './directives/Vintersection';

const app = createApp(App);

components.forEach((component) =>{
 app.component(component.name, component)
})

directives.forEach((directive) =>{
    app.directive(directive.name, directive)
   })
// app.directive('intersection', Vintersection) импорт одной дерективы

app
.use(router)
.mount('#app');
