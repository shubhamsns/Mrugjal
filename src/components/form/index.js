import * as React from 'react';
import { Controller, get } from 'react-hook-form';

function Form({ children, control, errors, onSubmit = () => {}, ...rest }) {
  return (
    <form noValidate onSubmit={onSubmit} {...rest}>
      {React.Children.map(children, (child) => {
        const { name } = child.props;

        /* if there is not `name` prop return as it is */
        if (!name) return child;

        // if there is `name` prop then add control, error props
        const error = get(errors, name, null);
        return React.createElement(child.type, {
          ...{
            ...child.props,
            control,
            key: name,
            error: error && { content: error?.message },
          },
        });
      })}
    </form>
  );
}

function Input({ control, name, label, error, required, ...rest }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, value }) => (
        <>
          {label && (
            <label
              className={`text-lg font-medium ${
                error ? 'text-red-primary' : 'text-gray-base '
              }`}
              htmlFor={name}
            >
              {label}
            </label>
          )}
          <input
            id={name}
            className={`text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border rounded mb-2
            ${error ? 'border-red-primary' : 'border-gray-primary'}
            `}
            onChange={({ target }) => onChange(target.value)}
            value={value}
            {...rest}
          />
          {error && (
            <p className="mb-3 -mt-1 pl-1 text-xs text-red-primary">
              {error.content}
            </p>
          )}
        </>
      )}
    />
  );
}

export { Form, Input };
