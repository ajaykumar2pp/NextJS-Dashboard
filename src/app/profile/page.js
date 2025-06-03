import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export default function Home() {
  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('image', values.image);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('User created successfully!');
        formik.resetForm();
        setPreview(null);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md space-y-4 w-96"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-xl font-bold text-center">Upload Form</h1>

        <input
          name="name"
          placeholder="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full border p-2 rounded"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full border p-2 rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            formik.setFieldValue('image', e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
          className="w-full border p-2 rounded"
        />
        {formik.touched.image && formik.errors.image && (
          <p className="text-red-500 text-sm">{formik.errors.image}</p>
        )}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
