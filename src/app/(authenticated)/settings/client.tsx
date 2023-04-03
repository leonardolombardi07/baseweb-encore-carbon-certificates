"use client";

import { Segment } from "@/components/surfaces/Segment";
import { Banner } from "baseui/banner";
import React from "react";
import { DeleteAlt } from "@/components/icons";
import { HeadingMedium, LabelMedium } from "baseui/typography";
import { useStyletron } from "@/styles";
import { Button } from "baseui/button";
import { useRouter } from "next/navigation";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { useThemeState } from "@/state/theme";

interface FormValues {
  theme: "light" | "dark";
}

type FormErrors = { [Key in keyof FormValues]: string | null };

function SettingsClientPage() {
  const [css] = useStyletron();
  const router = useRouter();
  const {
    state: { theme },
    actions: { setThemeValue },
  } = useThemeState();

  const [values, setValues] = React.useState<FormValues>({
    theme,
  });

  const [errors, setErrors] = React.useState<FormErrors>({
    theme: null,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  async function onSave() {
    setHasSubmitted(true);
    setSubmitError(null);
    const errors = validate(values);
    setErrors(errors);

    try {
      setIsSubmitting(true);
      await new Promise((r, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.2) r("");
          else reject("");
        }, 1500)
      );
      setThemeValue(values.theme);
    } catch (error) {
      setSubmitError("Algo deu errado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasValidationErrors = Object.values(errors).some(Boolean);
  const disableSaveButton =
    hasSubmitted && (isSubmitting || hasValidationErrors);

  return (
    <Segment>
      <HeadingMedium className={css({ marginBottom: "1em" })}>
        Perfil
      </HeadingMedium>

      <Segment>
        <Segment>
          <LabelMedium className={css({ marginBottom: "1em" })}>
            Tema
          </LabelMedium>

          <RadioGroup
            value={values.theme}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                theme: e.target.value as "light" | "dark",
              }))
            }
            name="number"
            align={ALIGN.vertical}
          >
            <Radio value="light">Light</Radio>

            <Radio value="dark">Dark</Radio>
          </RadioGroup>
        </Segment>

        <div className={css({ display: "flex", marginTop: "2em" })}>
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
  const errors: FormErrors = { theme: null };

  return errors;
}

export { SettingsClientPage };
