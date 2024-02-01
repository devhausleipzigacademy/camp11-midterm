import GreetingHeader from '../components/GreetingHeader';
import Button from '../components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TRegisterSchema, RegisterSchema } from '../validation/schemas';
import Input from '../components/Input';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../api/user';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields },
  } = useForm<TRegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });

  // if the passwordRepeat has been touched and password is changed, re-evaluate passwordRepeat validity (took me hours to come up with this tiny bit of code...)

  useEffect(() => {
    if (touchedFields.passwordRepeat) {
      trigger('passwordRepeat');
    }
  }, [watch('password')]);

  const navigate = useNavigate();

  // handle submit
  async function onSubmit(userData: TRegisterSchema) {
   
    const {data} = await registerUser(userData)
    if(data.user){
      navigate('/');
       toast.success('Success Notification !', {
         position: 'top-right',
       });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ToastContainer />
      <GreetingHeader
        title="Join Cine-Scape Today!"
        description="Register now to enjoy all our services, including making reservations and adding movies to your watchlist."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col justify-between"
      >
        <div className="text-white-dimmed flex flex-col gap-3">
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
          <Input
            id="password"
            placeholder="Your Password"
            autoComplete="new-password"
            type="password"
            error={errors.password}
            {...register('password')}
          />
          <Input
            id="passwordRepeat"
            placeholder="Your Password"
            autoComplete="new-password"
            type="password"
            error={errors.passwordRepeat}
            {...register('passwordRepeat')}
          />
        </div>
        <Button type="submit" size="sm">
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
