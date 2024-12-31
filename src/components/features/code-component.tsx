'use client'
import type { CodeFieldClient, CodeFieldClientProps } from 'payload'
import { CodeField, useFormFields } from '@payloadcms/ui'
import React, { useMemo } from 'react'
import { languages, languageKeyToMonacoLanguageMap, Ilanguage } from './languages'


const Code: React.FC<CodeFieldClientProps> = ({
  autoComplete,
  field,
  forceRender,
  path,
  permissions,
  readOnly,
  renderedBlocks,
  schemaPath,
  validate,
}) => {
  const languageField = useFormFields(([fields]) => fields['language'])
  const language: string =
    (languageField?.value as string) || (languageField.initialValue as string) || 'typescript'
  const label = languages[language as Ilanguage]
  const props: CodeFieldClient = useMemo<CodeFieldClient>(
    () => ({
      ...field,
      type: 'code',
      admin: {
        ...field.admin,
        label,
        language: languageKeyToMonacoLanguageMap[language as Ilanguage] || language,
      },
    }),
    [field, language, label],
  )
  const key = `${field.name}-${language}-${label}`
  return (
    <CodeField
      autoComplete={autoComplete}
      field={props}
      forceRender={forceRender}
      key={key}
      path={path}
      permissions={permissions}
      readOnly={readOnly}
      renderedBlocks={renderedBlocks}
      schemaPath={schemaPath}
      validate={validate}
    />
  )
}

export default Code