export function FieldMessage({
  id,
  error,
  helperText,
}: {
  id?: string;
  error?: string;
  helperText?: string;
}) {
  if (error) {
    return (
      <p id={id} className="text-sm leading-5 text-destructive">
        {error}
      </p>
    );
  }

  if (helperText) {
    return (
      <p id={id} className="text-sm leading-5">
        {helperText}
      </p>
    );
  }

  return null;
}
