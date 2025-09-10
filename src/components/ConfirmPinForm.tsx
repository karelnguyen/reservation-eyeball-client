import { useActionState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { type ConfirmState, confirmPinAction } from '../api/confirmPin';

export default function ConfirmPinForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState<ConfirmState, FormData>(
    confirmPinAction(onSuccess),
    { ok: null, message: '' }
  );

  return (
    <form action={formAction} className="flex items-end gap-2">
      <div className="grid gap-1 w-48">
        <label className="text-sm" htmlFor="pin">
          Confirm PIN
        </label>
        <Input
          id="pin"
          name="pin"
          placeholder="Enter PIN"
          autoComplete="one-time-code"
        />
      </div>
      <div>
        <Button disabled={pending} variant="outline" type="submit">
          {pending ? 'Checking…' : 'Confirm'}
        </Button>
        {state.message && (
          <span
            className={
              'text-sm ml-2 ' +
              (state.ok === true
                ? 'text-emerald-600'
                : state.ok === false
                ? 'text-rose-600'
                : 'text-slate-500')
            }
          >
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
