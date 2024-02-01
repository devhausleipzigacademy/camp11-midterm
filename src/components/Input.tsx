import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';
import { FieldError } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends InputProps {
  id: string;
  icon?: React.ReactElement;
  error?: FieldError | undefined; // extended with "string"
  isRounded?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, isRounded, icon, error, ...props }: Props, ref) => {
    return (
      <>
        <div
          className={cn(
            'gap-2  py-3 rounded-lg bg-white-heavy',
            isRounded && 'rounded-full',
            Boolean(error) && 'ring ring-error'
          )}
        >
          <label htmlFor={id} className="flex items-center gap-5">
            <div className="text-white-dimmed pl-5">{icon}</div>
            <input
              id={id}
              ref={ref}
              {...props}
              className="bg-white-heavy placeholder-white-dimmed text-white size-full text-sm outline-none"
            />
          </label>
        </div>
        {Boolean(error) && (
          <p className="text-error text-sm text-medium mb-1">
            {error?.message}
          </p>
        )}
      </>
    );
  }
);

export default Input;
