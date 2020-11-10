<template>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
  <button @click="redirectToTeams">Go to Teams</button>
  <button @click="formSaved">Save Form</button>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      isFormSaved: false
    }
  },
  inject: ['users'],
  methods: {
    redirectToTeams() {
      this.$router.push('/teams');
    },
    formSaved() {
      this.isFormSaved = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('component level beforeRouteEnter');
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('component level beforeRouteLeave');
    if (this.isFormSaved) {
      next();
    } else {
      const userConfirmation = confirm("Are you sure you want to leave this page? You got unsaved changes.");
      next(userConfirmation);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>