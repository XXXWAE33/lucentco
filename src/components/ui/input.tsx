"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared field styling.
 *
 * `text-base` (16px) is NOT a stylistic choice — iOS Safari zooms the viewport
 * when a focused input's font-size is below 16px, which on a form like ours
 * looks like the page has broken. Never lower it.
 *
 * Radius is 8px per the design system (inputs are the one square-ish surface).
 * Error state is driven off `aria-invalid` so the visual and the accessible
 * state can never disagree — there is no separate `error` class to forget.
 */
const fieldBase =
  "w-full rounded-input border border-border bg-background px-4 text-base text-foreground " +
  "placeholder:text-ink-400 transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-accent/20 " +
  "disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-500 " +
  "aria-[invalid=true]:border-error aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-error/30";

type FieldWrapperProps = {
  /** Required — every input gets a real, associated <label>. */
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
};

/** Label + control + hint/error, wired together with the right ARIA. */
function Field({
  label,
  id,
  required,
  error,
  hint,
  className,
  children,
}: FieldWrapperProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      {children}

      {/* Hint is suppressed while an error shows — two messages is noise. */}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs text-error"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** `aria-describedby` must point at whichever message is actually rendered. */
function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "id"
> & {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function Input({
  label,
  id,
  error,
  hint,
  required,
  wrapperClassName,
  ...props
}: InputProps) {
  return (
    <Field
      label={label}
      id={id}
      required={required}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <input
        id={id}
        required={required}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(fieldBase, "h-12")}
        {...props}
      />
    </Field>
  );
}

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className" | "id"
> & {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function Textarea({
  label,
  id,
  error,
  hint,
  required,
  rows = 4,
  wrapperClassName,
  ...props
}: TextareaProps) {
  return (
    <Field
      label={label}
      id={id}
      required={required}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(fieldBase, "py-3")}
        {...props}
      />
    </Field>
  );
}

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "className" | "id"
> & {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function Select({
  label,
  id,
  error,
  hint,
  required,
  children,
  wrapperClassName,
  ...props
}: SelectProps) {
  return (
    <Field
      label={label}
      id={id}
      required={required}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <select
        id={id}
        required={required}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(fieldBase, "h-12")}
        {...props}
      >
        {children}
      </select>
    </Field>
  );
}
