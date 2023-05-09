import * as yup from 'yup';

import i18n from 'src/i18n';

const { t } = i18n;

export const registerValidationSchema = yup.object().shape({
  email: yup.string().email(t('views.entry.errors.emailValid')).required(t('views.entry.errors.emptyField')),
  password: yup
    .string()
    .required(t('views.entry.errors.emptyField'))
    .min(6, t('views.entry.errors.atLeast6Char')),
  passwordConfirmation: yup
    .string()
    .required(t('views.entry.errors.emptyField'))
    .oneOf([yup.ref('password')], t('views.entry.errors.identicalPassword')),
});

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email(t('views.entry.errors.emailValid')).required(t('views.entry.errors.emptyField')),
  password: yup
    .string()
    .required(t('views.entry.errors.emptyField'))
    .min(6, t('views.entry.errors.atLeast6Char')),
});
