import { extend } from 'vee-validate'
import { required, email, confirmed, numeric } from 'vee-validate/dist/rules'

extend('numeric', {
  ...numeric,
  message: 'This field should only have numbers.',
})

extend('required', {
  ...required,
  message: 'This field is required.',
})

extend('email', {
  ...email,
  message: 'Invalid email.',
})

extend('confirmed', {
  ...confirmed,
  message: 'Confirmation does not match.',
})
