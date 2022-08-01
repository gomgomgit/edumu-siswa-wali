<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Sign In to Metronic</h1>
        <!--end::Title-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">Kode Sekolah</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="kode"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="kode" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">Username</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="username"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="username" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6 mb-0"
            >Password</label
          >
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> Continue </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
import axios from "axios";
import QueryString from "qs";
import { useToast } from "vue-toast-notification";
import md5 from 'md5'

const store = useStore();
const router = useRouter();

const submitButton = ref();

//Create form validation object
const login = Yup.object().shape({
  kode: Yup.string().required().label("Kode"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().min(4).required().label("Password"),
});

//Form submit function
const onSubmitLogin = async (values) => {
  // Clear existing errors
  store.dispatch(Actions.LOGOUT);

  axios.post('https://apisekolah.edumu.id/v3prod/sekolah', QueryString.stringify({code: values.kode}))
    .then(res => {
      if (res.data.status) {
        postLogin(values, res.data.data.sekolahs[0])
      } else {
        useToast().error(res.data.text)
      }
    })
    .catch(err => {
      console.log(err)
      useToast().error(err.message)
    })
};

function postLogin(data, sekolah) {
  const formData = {
    username: data.username,
    password: md5(md5(data.password)),
  }
  axios.post('https://apiedumu.edumu.id/demo/apischool/siswawali/user/login', QueryString.stringify(formData))
  .then(res => {
    if (res.data.status) {
      store.dispatch(Actions.LOGIN, {...res.data.data.users[0], ...sekolah})
      
      console.log(res.data.data.users[0])
      
      Swal.fire({
      text: "You have successfully logged in!",
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      customClass: {
        confirmButton: "btn fw-bold btn-light-primary",
      },
      }).then(function () {
        router.push({ name: "dashboard" });
      });
        
    } else {
      useToast().error(res.data.text)
    }
  }).catch(err => {
    console.log(err)
    useToast().error(err.message)
  })
}
</script>
