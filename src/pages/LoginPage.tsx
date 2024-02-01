import Button from '../components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TLoginSchema, LoginSchema } from '../validation/schemas';
import Input from '../components/Input';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import GreetingHeader from '../components/GreetingHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../api/user';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  // changed to const convention like in RegistrationForm so function submitHandler could be deleted
  async function onSubmit(loginData: TLoginSchema) {
      const { data } = await loginUser(loginData)
      if(data.user){
      console.log("User Data", data.user); // handle the response data
      toast.success(
        <span>
          Login successful! <br />
          Welcome to CineScape!
        </span>,
        {
          position: 'bottom-center',
          onClose: () => navigate('/home'),
          autoClose: 4000,
        });
      }
  };

  return (
    <div className="flex flex-col h-full">
      <ToastContainer />
      <GreetingHeader
        title="Welcome to Cine-Scape"
        description="You need to log in to be able to make reservations and add movies to your watchlist."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col justify-between"
      >
        <div className="text-white-dimmed flex flex-col gap-3">
          <Input
            id="email"
            placeholder="Your Email"
            autoComplete="email"
            type="email"
            error={errors.email}
            {...register('email')}
            icon={<MdOutlineEmail className="h-6 w-6" />}
          />
          <Input
            id="password"
            placeholder="Your Password"
            autoComplete="current-password"
            type="password"
            error={errors.password}
            {...register('password')}
            icon={<RiLockPasswordLine className="h-6 w-6" />}
          />
          <div className="flex gap-2 justify-end text-sm text-medium">
            <span>Don't have an account yet?</span>
            <Link
              to={'/register'}
              className="cursor-pointer underline text-primary"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
        <Button type="submit" size="sm">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
