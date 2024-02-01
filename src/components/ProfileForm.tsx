import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, TRegisterSchema } from '../validation/schemas';
import {
  ProfileSchema,
  profileSchema,
} from '../../server/schema/profileSchema';

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

type ProfileProps = {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
};

function ProfileForm({ initialData, onSubmit }: ProfileProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const onSubmitHandler = (data: FormData) => {
    onSubmit(data);
  };

  useEffect(() => {
    // Change user data, if initialData is changed
    setValue('firstName', initialData.firstName);
    setValue('lastName', initialData.lastName);
    setValue('email', initialData.email);
  }, [initialData, setValue]);

  return (
    <div className="flex flex-col h-full">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col flex-grow gap-5 justify-between mb-[55px]"
      >
        <div className="flex flex-col gap-5">
          <Input
            id="firstName"
            placeholder="First Name"
            autoComplete="given-name"
            type="text"
            error={errors.firstName}
            {...register('firstName')}
          />
          <Input
            id="lastName"
            placeholder="Last Name"
            autoComplete="family-name"
            type="text"
            error={errors.lastName}
            {...register('lastName')}
          />
          <Input
            id="email"
            placeholder="Your Email"
            autoComplete="email"
            type="email"
            error={errors.email}
            {...register('email')}
          />
        </div>
        <div className="flex gap-5">
          <Button variant="secondary" size="sm">
            Change Password?
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
