"use client";

import { Segment } from "@/components/surfaces/Segment";
import { validateUsername } from "@/utils/validation";
import { Banner } from "baseui/banner";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import React from "react";
import { DeleteAlt } from "@/components/icons";
import { FileUploader } from "baseui/file-uploader";
import { HeadingMedium, LabelMedium } from "baseui/typography";
import { useStyletron } from "@/styles";
import { Button } from "baseui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormValues {
  username: string;
  avatar: File | string | null;
}

type FormErrors = { [Key in keyof FormValues]: string | null };

function ProfileClientPage() {
  const [css] = useStyletron();
  const router = useRouter();
  const user = { email: "leo@mail.com", username: "Leo", avatar: "" };

  const usernameRef = React.useRef<HTMLInputElement>(null);

  const [values, setValues] = React.useState<FormValues>({
    username: user.username,
    avatar: user.avatar,
  });

  const [errors, setErrors] = React.useState<FormErrors>({
    username: null,
    avatar: null,
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

  async function onSave() {
    setHasSubmitted(true);
    setSubmitError(null);
    const errors = validate(values);
    setErrors(errors);
    if (errors.username) usernameRef.current?.focus();

    try {
      setIsSubmitting(true);
      await new Promise((r, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.2) r("");
          else reject("");
        }, 1500)
      );
    } catch (error) {
      setSubmitError("Algo deu errado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onReset() {
    setValues((v) => ({ ...v, username: user.username, avatar: user.avatar }));
    usernameRef.current?.focus();
  }

  const hasValidationErrors = Object.values(errors).some(Boolean);
  const disableSaveButton =
    hasSubmitted && (isSubmitting || hasValidationErrors);

  const hasUploaded =
    typeof values.avatar !== "string" && values.avatar !== null;

  return (
    <Segment as={"main"}>
      <HeadingMedium className={css({ marginBottom: "1em" })}>
        Perfil
      </HeadingMedium>

      <Segment>
        <FormControl label="E-mail">
          <Input value={user.email} name="email" disabled />
        </FormControl>

        <FormControl label="Nome" error={errors.username}>
          <Input
            value={values.username}
            autoFocus
            inputRef={usernameRef}
            name="username"
            onChange={onChange}
            error={Boolean(errors.username)}
          />
        </FormControl>

        <Segment
          className={css({
            textAlign: "center",
            margin: "2em 0",
          })}
        >
          <LabelMedium className={css({ marginBottom: "1em" })}>
            Avatar
          </LabelMedium>
          <FileUploader
            accept="image/png, image/gif, image/jpeg"
            multiple={false}
            onDrop={(acceptedFiles, rejectedFiles) => {
              if (rejectedFiles.length > 0) {
                return setErrors((e) => ({ ...e, avatar: "Arquivo inválido" }));
              }

              const file = acceptedFiles[0];
              setValues((v) => ({ ...v, avatar: file }));
            }}
            errorMessage={errors.avatar || undefined}
            onRetry={() => setErrors((e) => ({ ...e, avatar: null }))}
            overrides={{
              ButtonComponent: (props) => {
                return (
                  <div className={css({ padding: "1em" })}>
                    <Button {...props}>
                      {hasUploaded ? "Editar" : "Upload"}
                    </Button>

                    {hasUploaded && (
                      <Button
                        {...props}
                        onClick={() =>
                          setValues((v) => ({ ...v, avatar: null }))
                        }
                        className={css({ marginLeft: "0.5em" })}
                      >
                        Resetar
                      </Button>
                    )}
                  </div>
                );
              },
              ContentMessage: {
                component: () => {
                  if (user.avatar || hasUploaded) {
                    return (
                      <div className={css({ width: "100%", height: "100%" })}>
                        <Image
                          src={
                            user.avatar ||
                            URL.createObjectURL(values.avatar as File)
                          }
                          width={250}
                          height={250}
                          alt="User Avatar"
                          className={css({ height: "100%" })}
                        />
                      </div>
                    );
                  }
                  return null;
                },
              },
            }}
          />
        </Segment>

        <div className={css({ display: "flex" })}>
          <Button
            isLoading={isSubmitting}
            disabled={disableSaveButton}
            onClick={onSave}
            kind="primary"
            size="compact"
            className={css({ marginRight: "1em" })}
          >
            Salvar
          </Button>

          <Button
            kind="secondary"
            size="compact"
            className={css({ marginRight: "1em" })}
            onClick={onReset}
          >
            Resetar
          </Button>

          <Button
            kind="tertiary"
            size="compact"
            className={css({ marginRight: "1em" })}
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </div>

        {submitError && (
          <Banner
            title="Erro"
            kind={"negative"}
            hierarchy={"high"}
            artwork={{
              icon: ({ size }) => (
                <DeleteAlt size={size} aria-label="icon label" />
              ),
              type: "badge",
            }}
          >
            {submitError}
          </Banner>
        )}
      </Segment>
    </Segment>
  );
}

function validate(values: FormValues) {
  const errors: FormErrors = { username: null, avatar: null };

  const usernameError = validateUsername(values.username);
  if (usernameError) errors.username = usernameError;

  return errors;
}

export { ProfileClientPage };
