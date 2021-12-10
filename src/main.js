import { createApp }                                 from 'vue'
import App                                           from './App.vue'
import router                                        from './router'
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client/core'
import { createdApolloProvider }                     from '@vue/apollo-option'
import {setContext}                                  from 'apollo-link-context'

// link appi-gateway
const httpLink = createHttpLink({
    uri:'https://api-gateway-wheels.herokuapp.com/'
})
const authLink = setContext((_,{header})=>{
    return {
        header:{
            ...header,
            "Authorization":localStorage.getItem("token") || ""
        }
    }
});

const apolloClient = new ApolloClient({
    link : authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const apolloProvider = new createdApolloProvider({
    defaultClient: apolloClient
})

createApp(App).use(router).use(apolloProvider).mount('#app')
