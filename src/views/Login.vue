<template>
  <div class="login">
    <h2>Login</h2>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="error" v-if="error.data && error.data.message">{{ error.data.message }}</div>
      <div class="email">
        <label for="email" class="label">Username</label>
        <br />
        <input
          type="text"
          v-model="email"
          name="email"
          class="input"
          :class="{ 'error': error.data && error.data.errors.email }"
          placeholder="Email"
        />
        <P class="error-message" v-if="error.data && error.data.errors.email">{{ error.data.errors.email[0] }}</P>
      </div>
      <div class="password">
        <label for="password" class="label">Password</label>
        <br />
        <input
          type="password"
          v-model="password"
          name="password"
          class="input"
          :class="{ 'error': error.data && error.data.errors.password }"
          placeholder="Password"
        />
        <p v-if="error.data && error.data.errors.password" class="error-message">{{ error.data.errors.password[0] }}</p>
      </div>
      <div class="submit">
        <button class="submit-button">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      submitted: false,
      error: '',
      errorMessage: '',
      emailError: '',
      passwordError: ''
    }
  },
  methods: {
    handleSubmit () {
      const { email, password } = this
      this.error = ''
      this.emailError = ''
      this.passwordError = ''
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/jobs'))
        .catch(err => {
          this.error = err.response
        })
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form {
    width: 300px;
    .email,
    .password {
      margin-bottom: 2px;
      text-align: left;
      .label {
        text-align: left;
        font-size: .75rem;
        margin-left: 20px;
      }
      .input {
        box-sizing: border-box;
        width: 100%;
        height: 25px;
        font-size: .9rem;
        line-height: 25px;
        padding: 0 20px;
        outline: 0;
        margin: 0;
        &.error {
          color: red;
          border: 1px solid red;
        }
      }
      .error-message {
        color: red;
        font-size: .75rem;
        margin: 0 0 10px;
      }
    }
    > .error {
      color: red;
      font-size: .75rem;
      margin-bottom: 10px;
    }
    .submit {
      &-button {
        width: 100%;
        height: 24px;
        margin-top: 20px;
      }
    }
  }
}
</style>
