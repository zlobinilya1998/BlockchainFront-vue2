import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#21325E',
                secondary: '#3E497A',
                accent: '#F1D00A',
                error: '#b71c1c',
            },
        },
    },
});
