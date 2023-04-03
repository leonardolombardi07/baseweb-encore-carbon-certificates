"use client";

import React from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Segment } from "@/components/surfaces/Segment";
import { useStyletron } from "@/styles";
import { Button } from "baseui/button";
import { ARTWORK_TYPE, Banner, HIERARCHY, KIND } from "baseui/banner";
import { DeleteAlt } from "baseui/icon";
import Image from "next/image";
import Logo from "../../../../public/images/Logo.png";
import { ParagraphMedium } from "baseui/typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/validation";

interface FormValues {
  email: string;
  password: string;
}

type FormErrors = { [Key in keyof FormValues]: FormValues[Key] | null };

function ClientSignInPage() {
  const [css] = useStyletron();
  const router = useRouter();

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [values, setValues] = React.useState<FormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({
    email: null,
    password: null,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);

    if (hasSubmitted) {
      setErrors(validate(updatedValues));
    }
  }

  async function onSubmit() {
    setHasSubmitted(true);
    setSubmitError(null);
    const errors = validate(values);
    setErrors(errors);
    if (errors.email) return emailRef.current?.focus();
    if (errors.password) return passwordRef.current?.focus();

    try {
      setIsSubmitting(true);
      await new Promise((r, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.2) r("");
          else reject("");
        }, 1500)
      );
      router.replace("/");
    } catch (error) {
      setSubmitError("Algo deu errado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasValidationErrors = Object.values(errors).some(Boolean);
  const disableSubmit = hasSubmitted && (isSubmitting || hasValidationErrors);

  return (
    <Segment
      className={css({
        minWidth: "450px",
        margin: "auto",
      })}
    >
      <Image
        src={Logo}
        width={200}
        alt="encore logo"
        priority
        className={css({
          display: "block",
          margin: "1em auto 2em",
        })}
      />
      <FormControl label="E-mail" error={errors.email}>
        <Input
          autoFocus
          inputRef={emailRef}
          name="email"
          onChange={onChange}
          error={Boolean(errors.email)}
          onKeyDown={(event) => {
            if (event.key === "Enter") passwordRef.current?.focus();
          }}
        />
      </FormControl>

      <FormControl label="Senha" error={errors.password}>
        <Input
          type="password"
          inputRef={passwordRef}
          name="password"
          onChange={onChange}
          error={Boolean(errors.password)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSubmit();
          }}
        />
      </FormControl>

      <Button
        isLoading={isSubmitting}
        disabled={disableSubmit}
        onClick={onSubmit}
        className={css({
          width: "100%",
          marginTop: "1em",
        })}
      >
        Entrar
      </Button>

      {submitError && (
        <Banner
          title="Erro"
          kind={KIND.negative}
          hierarchy={HIERARCHY.high}
          artwork={{
            icon: ({ size }) => (
              <DeleteAlt size={size} aria-label="icon label" />
            ),
            type: ARTWORK_TYPE.badge,
          }}
        >
          {submitError}
        </Banner>
      )}

      <ParagraphMedium
        className={css({ textAlign: "center", marginTop: "1em" })}
      >
        Já tem uma conta? <Link href={"/signup"}>Cadastre-se</Link>
      </ParagraphMedium>
    </Segment>
  );
}

function validate(values: FormValues) {
  const errors: FormErrors = { email: null, password: null };

  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }
  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export { ClientSignInPage };
