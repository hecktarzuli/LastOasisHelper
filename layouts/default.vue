<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          nuxt
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        :v-if="loggedIn"
        color="success"
        @click="$auth.loginWith('discord')"
      >
        Login
      </v-btn>
      <p>
        {{ username }}
      </p>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-map',
          title: 'Map',
          to: '/map'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Last Oasis Helper',
      username: '',
      loggedIn: false
    }
  },
  beforeMount() {
    if (typeof window.localStorage.getItem('username') === 'string') {
      this.username = window.localStorage.getItem('username')
    }
    if (typeof window.localStorage.getItem('access_token') === 'string') {
      this.loggedIn = true
    }
  }
}
</script>
