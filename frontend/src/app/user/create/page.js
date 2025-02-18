'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { USER_STATUS } from '@/constants/constsnt';
import { createUser, getUserById, updateUser } from '@/app/user/apiCalls';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Yup from 'yup';
import { useFormik } from 'formik';

const getValidationSchema = (isEditMode) => Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: isEditMode ? Yup.string() : Yup.string().email('Invalid email address').required('Email is required'),
  status: Yup.string().required('Status is required'),
});

const UserForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      status: USER_STATUS.ACTIVE,
    },
    validationSchema: getValidationSchema(Boolean(userId)),
    onSubmit: async (values) => {
      try {
        if (userId) {
          const updateData = {
            first_name: values.firstName,
            last_name: values.lastName,
            status: values.status,
          };
          await updateUser(userId, updateData);
          router.push('/user/all');
        } else {
          const createData = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            status: values.status,
          };
          await createUser(createData);
          router.push('/user/all');
        }
      } catch (error) {
        console.error('Operation failed:', error);
      }
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          if (userData) {
            formik.setValues({
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              email: userData.email || '',
              status: userData.status || USER_STATUS.ACTIVE,
            });
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userId ? 'Edit User' : 'Create New User'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {userId ? 'Update user information' : 'Add a new user to the system'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={formik.handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter first name"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-sm text-red-600">{formik.errors.firstName}</div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter last name"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-sm text-red-600">{formik.errors.lastName}</div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={Boolean(userId)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter email address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-600">{formik.errors.email}</div>
              )}
            </div>

            {/* Status Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Status
                </label>
                <Select
                  defaultValue={formik.values.status}
                  value={formik.values.status}
                  onValueChange={(value) => formik.setFieldValue('status', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {formik.values.status}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(USER_STATUS).map(status => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <div className="text-sm text-red-600">{formik.errors.status}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={!formik.isValid}
                className="w-full md:w-auto"
              >
                {userId ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
