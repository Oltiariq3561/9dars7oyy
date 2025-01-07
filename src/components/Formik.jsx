import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';

const SignupForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Ism 3 harfdan kam bo\'lmasligi kerak')
      .required('Ismni kiriting'),
    email: Yup.string()
      .email('To\'g\'ri email manzili kiriting')
      .required('Emailni kiriting'),
    password: Yup.string()
      .min(8, 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak')
      .matches(/[0-9]/, 'Parolda raqam bo\'lishi kerak')
      .matches(/[a-zA-Z]/, 'Parolda harf bo\'lishi kerak')
      .matches(/[@$!%*?&]/, 'Parolda maxsus belgi bo\'lishi kerak')
      .required('Parolni kiriting'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Parollar mos kelishi kerak')
      .required('Parolni tasdiqlang'),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '50px auto', padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '8px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        2-vazifa Ro'yxatdan O'tish
      </Typography>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box sx={{ marginBottom: '20px' }}>
            <Field
              name="name"
              as={TextField}
              fullWidth
              label="Ism"
              variant="outlined"
              helperText={<ErrorMessage name="name" />}
              error={Boolean(<ErrorMessage name="name" />)}
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Field
              name="email"
              as={TextField}
              fullWidth
              label="Email"
              variant="outlined"
              helperText={<ErrorMessage name="email" />}
              error={Boolean(<ErrorMessage name="email" />)}
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Field
              name="password"
              as={TextField}
              fullWidth
              label="Parol"
              type="password"
              variant="outlined"
              helperText={<ErrorMessage name="password" />}
              error={Boolean(<ErrorMessage name="password" />)}
            />
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Field
              name="confirmPassword"
              as={TextField}
              fullWidth
              label="Parolni tasdiqlash"
              type="password"
              variant="outlined"
              helperText={<ErrorMessage name="confirmPassword" />}
              error={Boolean(<ErrorMessage name="confirmPassword" />)}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '10px' }}
          >
            Ro'yxatdan O'tish
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default SignupForm;
